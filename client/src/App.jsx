// client/src/App.jsx (Final version)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
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
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Coming soon routes */}
            <Route path="/browse" element={
              <MainLayout>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h1>Trang Khám phá</h1>
                  <p>Chức năng đang phát triển...</p>
                </div>
              </MainLayout>
            } />
            
            <Route path="/create" element={
              <ProtectedRoute>
                <MainLayout>
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Tạo bộ thẻ mới</h1>
                    <p>Chức năng đang phát triển...</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Error routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* 404 route */}
            <Route path="*" element={
              <MainLayout>
                <div style={{ 
                  padding: '4rem 2rem', 
                  textAlign: 'center',
                  minHeight: '60vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', color: '#0118D8' }}>404</h1>
                  <h2 style={{ margin: '0 0 1rem 0' }}>Trang không tồn tại</h2>
                  <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
                    Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="/" className="btn btn--primary">Về trang chủ</a>
                    <a href="/browse" className="btn btn--outline">Khám phá</a>
                  </div>
                </div>
              </MainLayout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;