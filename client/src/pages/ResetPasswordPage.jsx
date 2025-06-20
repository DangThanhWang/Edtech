// client/src/pages/ResetPasswordPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import '../styles/pages/auth.css';

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <AuthLayout>
      <div className="auth-page">
        <div className="auth-page__content">
          <div className="auth-page__header">
            <h1 className="auth-page__title">Đặt lại mật khẩu</h1>
            <p className="auth-page__subtitle">
              Nhập mật khẩu mới cho tài khoản của bạn
            </p>
          </div>
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;