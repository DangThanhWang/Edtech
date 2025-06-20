// client/src/pages/LoginPage.jsx
import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import '../styles/pages/auth.css';

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="auth-page">
        <div className="auth-page__content">
          <div className="auth-page__header">
            <h1 className="auth-page__title">Chào mừng trở lại</h1>
            <p className="auth-page__subtitle">
              Đăng nhập để tiếp tục hành trình học tập của bạn
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
