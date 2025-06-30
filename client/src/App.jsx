// client/src/App.jsx (Updated - với About page mới)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CreateStudySetPage from './pages/CreateStudySetPage';
import MySetsPage from './pages/MySetsPage';
import StudySetDetailPage from './pages/StudySetDetailPage';
import StudySessionPage from './pages/StudySessionPage';
import AboutPage from './pages/AboutPage';
import BrowsePage from './pages/BrowsePage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from "./components/common/ScrollToTop";

// Styles
import './App.css';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              } />
              
              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Browse route - Updated to use BrowsePage */}
              <Route path="/browse" element={
                <MainLayout>
                  <BrowsePage />
                </MainLayout>
              } />

              <Route path="/create-set" element={
                <ProtectedRoute>
                  <MainLayout>
                    <CreateStudySetPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/study/:studySetId" element={
                <ProtectedRoute>
                  <StudySessionPage />
                </ProtectedRoute>
              } />

              <Route path="/study-set/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <StudySetDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/my-sets" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MySetsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ComingSoonPage 
                      title="Hồ sơ cá nhân" 
                      description="Quản lý thông tin cá nhân và theo dõi tiến độ học tập"
                      icon="👤"
                    />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ComingSoonPage 
                      title="Cài đặt" 
                      description="Tùy chỉnh trải nghiệm học tập của bạn"
                      icon="⚙️"
                    />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Static pages - Sử dụng AboutPage mới */}
              <Route path="/about" element={
                <MainLayout>
                  <AboutPage />
                </MainLayout>
              } />

              <Route path="/terms" element={
                <MainLayout>
                  <TermsPage />
                </MainLayout>
              } />

              <Route path="/privacy" element={
                <MainLayout>
                  <PrivacyPage />
                </MainLayout>
              } />
              
              {/* Error routes */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* 404 route */}
              <Route path="*" element={
                <MainLayout>
                  <NotFoundPage />
                </MainLayout>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

// Coming Soon Page Component
const ComingSoonPage = ({ title, description, icon }) => (
  <div className="coming-soon-page">
    <div className="coming-soon-page__container">
      <div className="coming-soon-page__content">
        <div className="coming-soon-page__icon">{icon}</div>
        <h1 className="coming-soon-page__title">{title}</h1>
        <p className="coming-soon-page__description">{description}</p>
        <div className="coming-soon-page__status">
          <div className="status-indicator status-indicator--pending">
            Đang phát triển
          </div>
        </div>
        <div className="coming-soon-page__actions">
          <a href="/" className="btn btn--primary">Về trang chủ</a>
          <a href="/dashboard" className="btn btn--outline">Dashboard</a>
        </div>
      </div>
    </div>
  </div>
);

// Terms Page Component
const TermsPage = () => (
  <div className="static-page">
    <div className="static-page__container">
      <div className="static-page__header">
        <h1>Điều khoản sử dụng</h1>
        <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
      </div>
      <div className="static-page__content">
        <section>
          <h2>1. Chấp nhận điều khoản</h2>
          <p>Bằng việc sử dụng StudyCards, bạn đồng ý tuân thủ các điều khoản và điều kiện này.</p>
        </section>
        <section>
          <h2>2. Sử dụng dịch vụ</h2>
          <p>Bạn có thể sử dụng StudyCards cho mục đích học tập cá nhân và phi thương mại.</p>
        </section>
        <section>
          <h2>3. Trách nhiệm người dùng</h2>
          <ul>
            <li>Không chia sẻ nội dung có bản quyền</li>
            <li>Không sử dụng cho mục đích bất hợp pháp</li>
            <li>Tôn trọng cộng đồng học tập</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

// Privacy Page Component
const PrivacyPage = () => (
  <div className="static-page">
    <div className="static-page__container">
      <div className="static-page__header">
        <h1>Chính sách bảo mật</h1>
        <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
      </div>
      <div className="static-page__content">
        <section>
          <h2>Thông tin chúng tôi thu thập</h2>
          <ul>
            <li>Thông tin tài khoản (email, tên)</li>
            <li>Dữ liệu học tập và tiến độ</li>
            <li>Thông tin kỹ thuật cơ bản</li>
          </ul>
        </section>
        <section>
          <h2>Cách chúng tôi sử dụng thông tin</h2>
          <ul>
            <li>Cung cấp và cải thiện dịch vụ</li>
            <li>Cá nhân hóa trải nghiệm học tập</li>
            <li>Gửi thông báo quan trọng</li>
          </ul>
        </section>
        <section>
          <h2>Bảo mật thông tin</h2>
          <p>Chúng tôi sử dụng các biện pháp bảo mật hiện đại để bảo vệ dữ liệu của bạn.</p>
        </section>
      </div>
    </div>
  </div>
);

// 404 Not Found Page Component
const NotFoundPage = () => (
  <div className="error-page">
    <div className="error-page__content">
      <h1 className="error-page__title">404</h1>
      <h2 className="error-page__subtitle">Trang không tồn tại</h2>
      <p className="error-page__description">
        Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <div className="error-page__actions">
        <Link to="/" className="btn btn--primary">Về trang chủ</Link>
        <Link to="/browse" className="btn btn--outline">Khám phá</Link>
      </div>
    </div>
  </div>
);

export default App;