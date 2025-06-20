// server/src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const rateLimiters = {
  // General auth rate limiting
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
      success: false,
      message: 'Quá nhiều lần thử. Vui lòng thử lại sau 15 phút'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
  }),

  // Forgot password rate limiting
  forgotPassword: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts per hour
    message: {
      success: false,
      message: 'Quá nhiều yêu cầu reset mật khẩu. Vui lòng thử lại sau 1 giờ'
    },
    standardHeaders: true,
    legacyHeaders: false
  }),

  // General API rate limiting
  api: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: {
      success: false,
      message: 'Quá nhiều yêu cầu từ IP này'
    },
    standardHeaders: true,
    legacyHeaders: false
  })
};

module.exports = rateLimiters;