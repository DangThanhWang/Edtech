// server/src/controllers/authController.js (Updated with email verification)
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');

const authController = {
  // Register new user (Updated)
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

      // Create new user
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        isEmailVerified: false
      });

      // Generate email verification token
      const verificationToken = user.generateEmailVerificationToken();
      await user.save();

      // Send verification email
      try {
        const emailResult = await emailService.sendVerificationEmail(user, verificationToken);
        
        // Generate auth token (user can use app but with limited features)
        const authToken = user.generateAuthToken();

        // Update last login
        user.lastLoginAt = new Date();
        await user.save();

        // Remove sensitive data from response
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.emailVerificationToken;

        res.status(201).json({
          success: true,
          message: 'Đăng ký thành công! Kiểm tra email để xác thực tài khoản.',
          data: {
            user: userResponse,
            token: authToken,
            emailSent: true,
            emailPreview: emailResult.previewUrl // Only in development
          }
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        
        // Even if email fails, registration is successful
        const authToken = user.generateAuthToken();
        user.lastLoginAt = new Date();
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.emailVerificationToken;

        res.status(201).json({
          success: true,
          message: 'Đăng ký thành công! Tuy nhiên không thể gửi email xác thực.',
          data: {
            user: userResponse,
            token: authToken,
            emailSent: false
          }
        });
      }
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng ký',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Verify email
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token xác thực là bắt buộc'
        });
      }

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn'
        });
      }

      // Find user with matching token
      const user = await User.findOne({
        _id: decoded.id,
        emailVerificationToken: token
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã được sử dụng'
        });
      }

      // Mark email as verified
      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'Email đã được xác thực thành công!'
      });

    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xác thực email',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Resend verification email
  resendVerificationEmail: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Người dùng không tồn tại'
        });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được xác thực'
        });
      }

      // Generate new verification token
      const verificationToken = user.generateEmailVerificationToken();
      await user.save();

      // Send verification email
      try {
        const emailResult = await emailService.sendVerificationEmail(user, verificationToken);
        
        res.json({
          success: true,
          message: 'Email xác thực đã được gửi lại!',
          emailPreview: emailResult.previewUrl // Only in development
        });
      } catch (emailError) {
        console.error('Resend verification email failed:', emailError);
        res.status(500).json({
          success: false,
          message: 'Không thể gửi email xác thực. Vui lòng thử lại sau.'
        });
      }

    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gửi lại email xác thực',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Forgot password (Updated with email service)
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

      // Generate reset token
      const resetToken = user.generatePasswordResetToken();
      await user.save();

      // Send password reset email
      try {
        const emailResult = await emailService.sendPasswordResetEmail(user, resetToken);
        
        res.json({
          success: true,
          message: 'Link reset mật khẩu đã được gửi qua email',
          emailPreview: emailResult.previewUrl // Only in development
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

  // Login user (unchanged - already implemented)
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

  // Other methods remain the same...
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
