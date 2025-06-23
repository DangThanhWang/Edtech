// client/src/components/study/StudyProgress.jsx
import React from 'react';
import '../../styles/components/study/study-progress.css';

const StudyProgress = ({ session, currentCardIndex, totalCards, answeredCount }) => {
  const progressPercentage = totalCards > 0 ? (answeredCount / totalCards) * 100 : 0;
  const currentProgress = totalCards > 0 ? ((currentCardIndex + 1) / totalCards) * 100 : 0;

  return (
    <div className="study-progress">
      <div className="study-progress__stats">
        <div className="study-progress__stat">
          <span className="study-progress__number">{answeredCount}</span>
          <span className="study-progress__label">Đã học</span>
        </div>
        
        <div className="study-progress__stat">
          <span className="study-progress__number">{totalCards - answeredCount}</span>
          <span className="study-progress__label">Còn lại</span>
        </div>
        
        <div className="study-progress__stat">
          <span className="study-progress__number">{session?.stats?.correctAnswers || 0}</span>
          <span className="study-progress__label">Đúng</span>
        </div>
        
        <div className="study-progress__stat">
          <span className="study-progress__number">{Math.round(progressPercentage)}%</span>
          <span className="study-progress__label">Hoàn thành</span>
        </div>
      </div>

      <div className="study-progress__bar">
        <div className="study-progress__track">
          <div 
            className="study-progress__fill"
            style={{ width: `${progressPercentage}%` }}
          />
          <div 
            className="study-progress__current"
            style={{ left: `${currentProgress}%` }}
          />
        </div>
        
        <div className="study-progress__text">
          Thẻ {currentCardIndex + 1} / {totalCards}
        </div>
      </div>
    </div>
  );
};

export default StudyProgress;