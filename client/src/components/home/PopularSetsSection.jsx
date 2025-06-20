// client/src/components/home/PopularSetsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import StudySetCard from './StudySetCard';

const PopularSetsSection = () => {
  // In a real app, this would come from an API
  const popularSets = [
    {
      id: 1,
      title: "Từ vựng tiếng Anh cơ bản",
      author: "Nguyễn Văn A",
      cardCount: 500,
      rating: 4.8,
      reviewCount: 1200,
      studentCount: 15000,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Toán học lớp 10",
      author: "Trần Thị B",
      cardCount: 300,
      rating: 4.9,
      reviewCount: 800,
      studentCount: 8000,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Lịch sử Việt Nam",
      author: "Lê Văn C",
      cardCount: 250,
      rating: 4.7,
      reviewCount: 600,
      studentCount: 5000,
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Sinh học 12",
      author: "Phạm Thị D",
      cardCount: 400,
      rating: 4.6,
      reviewCount: 450,
      studentCount: 3000,
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "TOEIC Vocabulary",
      author: "Hoàng Văn E",
      cardCount: 600,
      rating: 4.9,
      reviewCount: 2000,
      studentCount: 20000,
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Hóa học đại cương",
      author: "Ngô Thị F",
      cardCount: 350,
      rating: 4.5,
      reviewCount: 300,
      studentCount: 2000,
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <section className="popular-sets">
      <div className="popular-sets__container">
        <h2 className="popular-sets__title">Bộ thẻ phổ biến</h2>
        <div className="popular-sets__grid">
          {popularSets.map(set => (
            <StudySetCard key={set.id} studySet={set} />
          ))}
        </div>
        <div className="popular-sets__actions">
          <Link to="/browse" className="btn btn--secondary btn--large">
            Xem tất cả bộ thẻ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularSetsSection;