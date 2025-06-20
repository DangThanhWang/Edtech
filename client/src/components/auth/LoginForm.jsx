// client/src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../forms/FormField';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/components/forms.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: error.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.submit && (
        <div className="form-error form-error--global">
          {errors.submit}
        </div>
      )}

      <FormField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Nhập email của bạn"
        required
      />

      <FormField
        label="Mật khẩu"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Nhập mật khẩu"
        required
      />

      <div className="auth-form__forgot">
        <Link to="/forgot-password" className="auth-form__forgot-link">
          Quên mật khẩu?
        </Link>
      </div>

      <button 
        type="submit" 
        className="btn btn--primary btn--large auth-form__submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Đăng nhập'}
      </button>

      <div className="auth-form__divider">
        <span>hoặc</span>
      </div>

      <button type="button" className="btn btn--outline btn--large auth-form__social">
        <span className="auth-form__social-icon">🔍</span>
        Tiếp tục với Google
      </button>

      <div className="auth-form__footer">
        <p>
          Chưa có tài khoản?{' '}
          <Link to="/register" className="auth-form__link">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;