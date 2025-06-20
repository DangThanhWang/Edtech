// client/src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../forms/FormField';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/components/forms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { register } = useAuth();
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Tên là bắt buộc';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Họ là bắt buộc';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản sử dụng';
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
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: error.message || 'Đăng ký thất bại. Vui lòng thử lại.'
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

      <div className="form-row">
        <FormField
          label="Tên"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Tên của bạn"
          required
        />

        <FormField
          label="Họ"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Họ của bạn"
          required
        />
      </div>

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
        placeholder="Tạo mật khẩu"
        required
      />

      <FormField
        label="Xác nhận mật khẩu"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Nhập lại mật khẩu"
        required
      />

      <div className="form-checkbox">
        <label className="form-checkbox__label">
          <input
            type="checkbox"
            className="form-checkbox__input"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <span className="form-checkbox__checkmark"></span>
          <span className="form-checkbox__text">
            Tôi đồng ý với{' '}
            <Link to="/terms" className="auth-form__link">
              Điều khoản sử dụng
            </Link>
            {' '}và{' '}
            <Link to="/privacy" className="auth-form__link">
              Chính sách bảo mật
            </Link>
          </span>
        </label>
        {errors.terms && (
          <div className="form-error">{errors.terms}</div>
        )}
      </div>

      <button 
        type="submit" 
        className="btn btn--primary btn--large auth-form__submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Tạo tài khoản'}
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
          Đã có tài khoản?{' '}
          <Link to="/login" className="auth-form__link">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;