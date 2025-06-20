// client/src/layouts/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/auth-layout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__background"></div>
      
      <header className="auth-layout__header">
        <Link to="/" className="auth-layout__logo">
          StudyCards
        </Link>
      </header>

      <main className="auth-layout__main">
        <div className="auth-layout__container">
          <div className="auth-layout__card">
            {children}
          </div>
          
          <div className="auth-layout__illustration">
            <div className="auth-layout__illustration-content">
              <h2>Học tập thông minh</h2>
              <p>Khám phá phương pháp học tập hiệu quả với flashcards và AI</p>
              <div className="auth-layout__features">
                <div className="auth-layout__feature">
                  <span className="auth-layout__feature-icon">🎯</span>
                  <span>Học tập cá nhân hóa</span>
                </div>
                <div className="auth-layout__feature">
                  <span className="auth-layout__feature-icon">📊</span>
                  <span>Theo dõi tiến độ</span>
                </div>
                <div className="auth-layout__feature">
                  <span className="auth-layout__feature-icon">🌟</span>
                  <span>Cộng đồng học tập</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;