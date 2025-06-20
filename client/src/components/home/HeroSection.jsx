// client/src/components/home/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Học tập thông minh với Flashcards
          </h1>
          <p className="hero__description">
            Tạo, chia sẻ và học tập với hàng triệu bộ thẻ học được tạo bởi 
            học sinh và giáo viên trên toàn thế giới
          </p>
          <div className="hero__buttons">
            <Link to="/browse" className="btn btn--large btn--white">
              Bắt đầu học
            </Link>
            <Link to="/create" className="btn btn--large btn--outline-white">
              Tạo bộ thẻ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
