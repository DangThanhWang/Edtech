// client/src/components/auth/ProtectedRoute.jsx (Updated with debug)
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute Check:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    pathname: location.pathname,
    requiredRole
  }); // DEBUG

  if (isLoading) {
    console.log('⏳ Still loading auth state...'); // DEBUG
    return (
      <div className="protected-route-loading">
        <LoadingSpinner size="large" color="primary" />
        <p>Đang xác thực...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🚨 Not authenticated - redirecting to login'); // DEBUG
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirement
  if (requiredRole && user?.role !== requiredRole) {
    console.log('🚨 Insufficient role - redirecting to unauthorized'); // DEBUG
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('✅ Access granted'); // DEBUG
  return children;
};

export default ProtectedRoute;
