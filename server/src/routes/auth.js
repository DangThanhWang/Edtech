// server/src/routes/auth.js (Updated with email verification routes)
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules (same as before)
const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Tên phải có từ 1-50 ký tự'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Họ phải có từ 1-50 ký tự'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .notEmpty()
    .withMessage('Mật khẩu là bắt buộc')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email không hợp lệ')
];

const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token là bắt buộc'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const verifyEmailValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token xác thực là bắt buộc')
];

// Routes
router.post('/register', rateLimit.auth, registerValidation, authController.register);
router.post('/login', rateLimit.auth, loginValidation, authController.login);
router.post('/logout', auth, authController.logout);
router.get('/me', auth, authController.getCurrentUser);

// Email verification routes
router.post('/verify-email', verifyEmailValidation, authController.verifyEmail);
router.post('/resend-verification', auth, rateLimit.forgotPassword, authController.resendVerificationEmail);

// Password reset routes
router.post('/forgot-password', rateLimit.forgotPassword, forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

// Token refresh
router.post('/refresh', auth, authController.refreshToken);

module.exports = router;