// client/src/components/auth/ResetPasswordForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../forms/FormField';
import LoadingSpinner from '../common/LoadingSpinner';
import authService from '../../services/authService';
import '../../styles/components/forms.css';

const ResetPasswordForm = ({ token }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    if (!token) {
      newErrors.token = 'Token không hợp lệ';
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
      await authService.resetPassword(token, formData.password);
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-form">
        <div className="message message--success">
          Mật khẩu đã được cập nhật thành công! Đang chuyển hướng đến trang đăng nhập...
        </div>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.submit && (
        <div className="form-error form-error--global">
          {errors.submit}
        </div>
      )}

      {errors.token && (
        <div className="form-error form-error--global">
          {errors.token}
        </div>
      )}

      <FormField
        label="Mật khẩu mới"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Nhập mật khẩu mới"
        required
      />

      <FormField
        label="Xác nhận mật khẩu"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Nhập lại mật khẩu mới"
        required
      />

      <button 
        type="submit" 
        className="btn btn--primary btn--large auth-form__submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Cập nhật mật khẩu'}
      </button>

      <div className="auth-form__footer">
        <p>
          <Link to="/login" className="auth-form__link">
            ← Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
