// client/src/pages/UnauthorizedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const UnauthorizedPage = () => {
  return (
    <MainLayout>
      <div className="error-page">
        <div className="error-page__content">
          <h1 className="error-page__title">403</h1>
          <h2 className="error-page__subtitle">Không có quyền truy cập</h2>
          <p className="error-page__description">
            Bạn không có quyền truy cập vào trang này.
          </p>
          <div className="error-page__actions">
            <Link to="/" className="btn btn--primary">
              Về trang chủ
            </Link>
            <Link to="/dashboard" className="btn btn--outline">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UnauthorizedPage;