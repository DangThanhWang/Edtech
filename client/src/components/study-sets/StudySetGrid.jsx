// client/src/components/study-sets/StudySetGrid.jsx
import React from 'react';
import StudySetCard from './StudySetCard';
import LoadingSpinner from '../common/LoadingSpinner';

const StudySetGrid = ({ 
  studySets, 
  isLoading, 
  onEdit, 
  onDelete, 
  onDuplicate,
  emptyMessage = 'Chưa có học phần nào'
}) => {
  if (isLoading) {
    return (
      <div className="study-set-grid__loading">
        <LoadingSpinner size="large" />
        <p>Đang tải học phần...</p>
      </div>
    );
  }

  if (!studySets || studySets.length === 0) {
    return (
      <div className="study-set-grid__empty">
        <div className="study-set-grid__empty-icon">📚</div>
        <h3>{emptyMessage}</h3>
        <p>Bắt đầu tạo học phần đầu tiên của bạn!</p>
      </div>
    );
  }
  console.log('🔥 StudySets rendered:', studySets);

  return (
    <div className="study-set-grid">
      {studySets.map(studySet => (
        <StudySetCard
          key={studySet._id}
          studySet={studySet}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          showActions={true}
          isOwner={true}
        />
      ))}
    </div>
  );
};

export default StudySetGrid;