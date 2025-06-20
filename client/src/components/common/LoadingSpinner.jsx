// client/src/components/common/LoadingSpinner.jsx
import React from 'react';
import '../../styles/components/loading.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} loading-spinner--${color}`}>
      <div className="loading-spinner__circle"></div>
    </div>
  );
};

export default LoadingSpinner;