// server/src/middleware/emailVerification.js (Optional middleware to check email verification)
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  // Skip email verification check for certain routes
  const skipRoutes = [
    '/auth/verify-email',
    '/auth/resend-verification',
    '/auth/me',
    '/auth/logout'
  ];

  if (skipRoutes.includes(req.path)) {
    return next();
  }

  // Check if email is verified (you can query database here if needed)
  // For now, we'll just continue as this middleware is optional
  next();
};

module.exports = requireEmailVerification;