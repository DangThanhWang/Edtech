// client/src/components/home/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="cta">
      <div className="cta__container">
        <div className="cta__content">
          <h2 className="cta__title">
            Bắt đầu hành trình học tập của bạn ngay hôm nay
          </h2>
          <p className="cta__description">
            Tham gia cộng đồng hơn 1 triệu học viên đang học tập hiệu quả với StudyCards
          </p>
          <div className="cta__buttons">
            <Link to="/register" className="btn btn--large btn--white">
              Đăng ký miễn phí
            </Link>
            <Link to="/browse" className="btn btn--large btn--outline-white">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
