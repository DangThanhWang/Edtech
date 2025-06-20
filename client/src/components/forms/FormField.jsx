// client/src/components/forms/FormField.jsx
import React, { useState } from 'react';

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </label>
      
      <div className={`form-field__wrapper ${isFocused ? 'form-field__wrapper--focused' : ''} ${error ? 'form-field__wrapper--error' : ''}`}>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="form-field__input"
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="form-field__toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      
      {error && (
        <div className="form-field__error">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;