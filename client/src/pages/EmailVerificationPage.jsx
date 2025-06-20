// client/src/pages/EmailVerificationPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import authService from '../services/authService';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token xác thực không hợp lệ');
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Email đã được xác thực thành công!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Xác thực email thất bại');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <AuthLayout>
      <div className="auth-page">
        <div className="auth-page__content">
          <div className="auth-page__header">
            <h1 className="auth-page__title">Xác thực Email</h1>
          </div>
          
          <div className="email-verification-status">
            {status === 'verifying' && (
              <>
                <LoadingSpinner size="large" />
                <p>Đang xác thực email của bạn...</p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <div className="verification-icon verification-icon--success">✅</div>
                <h2>Xác thực thành công!</h2>
                <p>{message}</p>
                <p>Đang chuyển hướng đến trang đăng nhập...</p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <div className="verification-icon verification-icon--error">❌</div>
                <h2>Xác thực thất bại</h2>
                <p>{message}</p>
                <div className="verification-actions">
                  <Link to="/login" className="btn btn--primary">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn btn--outline">
                    Đăng ký lại
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmailVerificationPage;