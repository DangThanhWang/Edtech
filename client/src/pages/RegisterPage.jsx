// client/src/pages/RegisterPage.jsx
import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import '../styles/pages/auth.css';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <div className="auth-page">
        <div className="auth-page__content">
          <div className="auth-page__header">
            <h1 className="auth-page__title">Tạo tài khoản mới</h1>
            <p className="auth-page__subtitle">
              Tham gia cộng đồng học tập thông minh cùng StudyCards
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;