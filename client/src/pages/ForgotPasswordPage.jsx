// client/src/pages/ForgotPasswordPage.jsx
import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import '../styles/pages/auth.css';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <div className="auth-page">
        <div className="auth-page__content">
          <div className="auth-page__header">
            <h1 className="auth-page__title">Quên mật khẩu?</h1>
            <p className="auth-page__subtitle">
              Nhập email của bạn để nhận link reset mật khẩu
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;