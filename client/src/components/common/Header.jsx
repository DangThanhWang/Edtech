// client/src/components/common/Header.jsx (Updated with auth)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          StudyCards
        </Link>
        
        <ul className="header__links">
          <li><Link to="/" className="header__link">Trang chủ</Link></li>
          <li><Link to="/browse" className="header__link">Khám phá</Link></li>
          {isAuthenticated && (
            <li><Link to="/create" className="header__link">Tạo bộ thẻ</Link></li>
          )}
          <li><Link to="/about" className="header__link">Giới thiệu</Link></li>
        </ul>
        
        <div className="header__auth">
          {isAuthenticated ? (
            <div className="header__user">
              <Link to="/dashboard" className="header__user-link">
                <div className="header__user-avatar">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <span className="header__user-name">
                  {user?.firstName}
                </span>
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn--outline btn--small"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn--outline btn--small">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn--primary btn--small">
                Đăng ký
              </Link>
            </>
          )}
        </div>

        <button 
          className="header__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <Link to="/" className="header__mobile-link" onClick={() => setMobileMenuOpen(false)}>
            Trang chủ
          </Link>
          <Link to="/browse" className="header__mobile-link" onClick={() => setMobileMenuOpen(false)}>
            Khám phá
          </Link>
          {isAuthenticated && (
            <Link to="/create" className="header__mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Tạo bộ thẻ
            </Link>
          )}
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="header__mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="header__mobile-link header__mobile-link--button"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Đăng nhập
              </Link>
              <Link to="/register" className="header__mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Đăng ký
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
