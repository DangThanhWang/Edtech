// client/src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">StudyCards</h3>
            <p className="footer__description">
              Nền tảng học tập thông minh giúp bạn học tập hiệu quả hơn với 
              flashcards và nhiều công cụ học tập khác.
            </p>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">Sản phẩm</h3>
            <ul className="footer__list">
              <li><Link to="/flashcards" className="footer__link">Flashcards</Link></li>
              <li><Link to="/study-modes" className="footer__link">Chế độ học</Link></li>
              <li><Link to="/test" className="footer__link">Kiểm tra</Link></li>
              <li><Link to="/mobile" className="footer__link">Ứng dụng mobile</Link></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">Hỗ trợ</h3>
            <ul className="footer__list">
              <li><Link to="/help" className="footer__link">Trung tâm trợ giúp</Link></li>
              <li><Link to="/contact" className="footer__link">Liên hệ</Link></li>
              <li><Link to="/faq" className="footer__link">FAQ</Link></li>
              <li><Link to="/report" className="footer__link">Báo cáo lỗi</Link></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">Cộng đồng</h3>
            <ul className="footer__list">
              <li><a href="/blog" className="footer__link">Blog</a></li>
              <li><a href="#" className="footer__link" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="#" className="footer__link" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" className="footer__link" target="_blank" rel="noopener noreferrer">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {currentYear} StudyCards. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;