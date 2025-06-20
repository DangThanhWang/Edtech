// client/src/components/auth/EmailVerificationBanner.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/components/email-verification.css';

const EmailVerificationBanner = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  if (!user || user.isEmailVerified || !isVisible) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await authService.resendVerificationEmail();
      setMessage('Email xác thực đã được gửi lại!');
    } catch (error) {
      setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className="email-verification-banner">
      <div className="email-verification-banner__content">
        <div className="email-verification-banner__icon">📧</div>
        <div className="email-verification-banner__text">
          <h4>Xác thực email của bạn</h4>
          <p>Chúng tôi đã gửi email xác thực đến {user.email}. Vui lòng kiểm tra và xác thực để sử dụng đầy đủ tính năng.</p>
          {message && <p className="email-verification-banner__message">{message}</p>}
        </div>
        <div className="email-verification-banner__actions">
          <button 
            onClick={handleResendVerification}
            className="btn btn--outline btn--small"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="small" /> : 'Gửi lại'}
          </button>
          <button 
            onClick={handleDismiss}
            className="email-verification-banner__close"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;