// client/src/pages/DashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/pages/dashboard.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__container">
        <div className="dashboard-page__header">
          <h1 className="dashboard-page__title">
            Chào mừng, {user?.firstName}! 👋
          </h1>
          <p className="dashboard-page__subtitle">
            Sẵn sàng để bắt đầu học tập hôm nay?
          </p>
        </div>

        <div className="dashboard-page__stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-card__icon">📚</div>
            <div className="dashboard-stat-card__content">
              <h3>Bộ thẻ của tôi</h3>
              <p className="dashboard-stat-card__number">0</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-card__icon">🎯</div>
            <div className="dashboard-stat-card__content">
              <h3>Đã học hôm nay</h3>
              <p className="dashboard-stat-card__number">0</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-card__icon">🔥</div>
            <div className="dashboard-stat-card__content">
              <h3>Streak hiện tại</h3>
              <p className="dashboard-stat-card__number">0 ngày</p>
            </div>
          </div>
        </div>

        <div className="dashboard-page__actions">
          <Link to="/create" className="btn btn--primary btn--large">
            Tạo bộ thẻ mới
          </Link>
          <Link to="/browse" className="btn btn--outline btn--large">
            Khám phá bộ thẻ
          </Link>
        </div>

        <div className="dashboard-page__user-info">
          <h2>Thông tin tài khoản</h2>
          <div className="user-info-card">
            <div className="user-info-card__avatar">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="user-info-card__details">
              <h3>{user?.fullName || `${user?.firstName} ${user?.lastName}`}</h3>
              <p>{user?.email}</p>
              <p>Tham gia: {new Date(user?.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn--outline btn--small"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;