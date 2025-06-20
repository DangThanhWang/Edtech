// client/src/components/auth/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../forms/FormField';
import LoadingSpinner from '../common/LoadingSpinner';
import authService from '../../services/authService';
import '../../styles/components/forms.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email là bắt buộc');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-form">
        <div className="message message--success">
          Email reset mật khẩu đã được gửi! Kiểm tra hộp thư của bạn.
        </div>
        <div className="auth-form__footer">
          <p>
            <Link to="/login" className="auth-form__link">
              ← Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && (
        <div className="form-error form-error--global">
          {error}
        </div>
      )}

      <FormField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        required
      />

      <button 
        type="submit" 
        className="btn btn--primary btn--large auth-form__submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Gửi link reset'}
      </button>

      <div className="auth-form__footer">
        <p>
          Nhớ mật khẩu?{' '}
          <Link to="/login" className="auth-form__link">
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;