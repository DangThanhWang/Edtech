// client/src/components/home/StudySetCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const StudySetCard = ({ studySet }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Link 
      to={`/study-set/${studySet.id}`} 
      className="study-set-card-link"
    >
      <div 
        ref={cardRef} 
        className={`study-set-card ${isVisible ? 'study-set-card--visible' : ''}`}
      >
        {studySet.image && (
          <div className="study-set-card__image">
            <img src={studySet.image} alt={studySet.title} />
          </div>
        )}
        <div className="study-set-card__content">
          <h3 className="study-set-card__title">{studySet.title}</h3>
          <p className="study-set-card__meta">
            bởi {studySet.author} • {studySet.cardCount} thẻ
          </p>
          <div className="study-set-card__stats">
            <span className="study-set-card__rating">
              ⭐ {studySet.rating} ({formatNumber(studySet.reviewCount)})
            </span>
            <span className="study-set-card__students">
              📚 {formatNumber(studySet.studentCount)} học viên
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudySetCard;