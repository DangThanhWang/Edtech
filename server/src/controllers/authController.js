// server/src/controllers/authController.js (Updated - Remove email verification)
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');

const authController = {
  // Register new user (Simplified - No email verification)
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors: errors.array()
        });
      }

      const { firstName, lastName, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
      }

      // Create new user (no email verification needed)
      const user = new User({
        firstName,
        lastName,
        email,
        password
        // REMOVED: isEmailVerified: false
      });

      await user.save();

      // Generate auth token immediately
      const authToken = user.generateAuthToken();

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      // Remove sensitive data from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        success: true,
        message: 'Đăng ký thành công!', // Simplified message
        data: {
          user: userResponse,
          token: authToken
        }
      });

    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng ký',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // REMOVED: verifyEmail method
  // REMOVED: resendVerificationEmail method

  // Login user (unchanged)
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = user.generateAuthToken();

      user.lastLoginAt = new Date();
      await user.save();

      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          user: userResponse,
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      
      if (error.message.includes('Email không tồn tại') || 
          error.message.includes('Mật khẩu không chính xác')) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không chính xác'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng nhập',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get current user (unchanged)
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .populate('studySets', 'title description cardCount')
        .populate('favoriteStudySets', 'title description cardCount creator');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Người dùng không tồn tại'
        });
      }

      res.json({
        success: true,
        data: user
      });

    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin người dùng',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Other methods remain the same (logout, forgotPassword, resetPassword, refreshToken)
  logout: async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'Đăng xuất thành công'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng xuất',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng với email này'
        });
      }

      const resetToken = user.generatePasswordResetToken();
      await user.save();

      try {
        const emailResult = await emailService.sendPasswordResetEmail(user, resetToken);
        
        res.json({
          success: true,
          message: 'Link reset mật khẩu đã được gửi qua email',
          emailPreview: emailResult.previewUrl
        });
      } catch (emailError) {
        console.error('Password reset email failed:', emailError);
        res.status(500).json({
          success: false,
          message: 'Không thể gửi email reset mật khẩu. Vui lòng thử lại sau.'
        });
      }

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xử lý quên mật khẩu',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn'
        });
      }

      const user = await User.findOne({
        _id: decoded.id,
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn'
        });
      }

      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'Mật khẩu đã được cập nhật thành công'
      });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi reset mật khẩu',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Người dùng không tồn tại'
        });
      }

      const token = user.generateAuthToken();

      res.json({
        success: true,
        message: 'Token đã được làm mới',
        data: {
          token
        }
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi làm mới token',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = authController;