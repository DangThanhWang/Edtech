// client/src/services/api.js (Updated with debug)
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
console.log('🌐 API Base URL:', API_BASE_URL); // DEBUG

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('📤 API Request:', config.method.toUpperCase(), config.url); // DEBUG
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token attached:', token.substring(0, 20) + '...'); // DEBUG
    } else {
      console.log('❌ No token for request'); // DEBUG
    }
    
    return config;
  },
  (error) => {
    console.log('❌ Request interceptor error:', error); // DEBUG
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url); // DEBUG
    return response;
  },
  (error) => {
    console.log('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message
    }); // DEBUG
    
    if (error.response?.status === 401) {
      console.log('🚨 401 Unauthorized - removing token and redirecting'); // DEBUG
      localStorage.removeItem('token');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
