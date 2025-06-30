// client/src/components/study-sets/StudySetCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const StudySetCard = ({ 
  studySet, 
  onEdit, 
  onDelete, 
  onDuplicate,
  showActions = true,
  isOwner = true 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDuplicate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onDuplicate(studySet._id);
      showSuccess('Sao chép học phần thành công!');
    } catch (error) {
      showError('Không thể sao chép học phần');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(studySet);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Bạn có chắc chắn muốn xóa học phần "${studySet.title}"?`)) {
      onDelete(studySet._id);
    }
  };

  return (
    <div className="study-set-card">
      <Link to={`/study-set/${studySet._id}`} className="study-set-card__link">
        <div className="study-set-card__header">
          <div className="study-set-card__title-section">
            <h3 className="study-set-card__title">{studySet.title}</h3>
            <div className="study-set-card__meta">
              <span className="study-set-card__count">
                <strong>{studySet.cards?.length || studySet.stats?.totalCards || 0}</strong> thẻ
              </span>
              <span className="study-set-card__privacy">
                {studySet.privacy === 'private' ? '🔒' : '🌐'}
              </span>
              <span className="study-set-card__category">
                {getCategoryIcon(studySet.category)} {getCategoryName(studySet.category)}
              </span>
            </div>
          </div>
        </div>
        
        <p className="study-set-card__description">
          {studySet.description
            ? (studySet.description.length > 100
              ? `${studySet.description.substring(0, 100)}...`
              : studySet.description)
            : 'Không có mô tả'}
        </p>
        
        <div className="study-set-card__footer">
          <div className="study-set-card__dates">
            <div className="study-set-card__created">
              Tạo: {formatDate(studySet.createdAt)}
            </div>
            {studySet.updatedAt !== studySet.createdAt && (
              <div className="study-set-card__updated">
                Sửa: {formatDate(studySet.updatedAt)}
              </div>
            )}
          </div>
        </div>
        
        {Array.isArray(studySet.tags) && studySet.tags.length > 0 && (
          <div className="study-set-card__tags">
            {studySet.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="study-set-card__tag">{tag}</span>
            ))}
            {studySet.tags.length > 3 && (
              <span className="study-set-card__tag study-set-card__tag--more">
                +{studySet.tags.length - 3}
              </span>
            )}
          </div>
        )}

      </Link>

      {/* <div className="study-set-card__study-actions">
        <Link 
          to={`/study/${studySet._id}`}
          className="btn btn--primary btn--small study-set-card__study-btn"
          onClick={(e) => e.stopPropagation()}
        >
          📚 Học ngay
        </Link>
      </div> */}
      
      {showActions && (
        <div className="study-set-card__actions">
          <button
            onClick={handleDuplicate}
            className="study-set-card__action study-set-card__action--duplicate"
            title="Sao chép"
            disabled={isLoading}
          >
            📋
          </button>
          {isOwner && (
            <>
              <button
                onClick={handleEdit}
                className="study-set-card__action study-set-card__action--edit"
                title="Chỉnh sửa"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                className="study-set-card__action study-set-card__action--delete"
                title="Xóa"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Helper functions
const getCategoryIcon = (category) => {
  const icons = {
    language: '🌍',
    science: '🔬',
    history: '📜',
    math: '📐',
    other: '📚'
  };
  return icons[category] || icons.other;
};

const getCategoryName = (category) => {
  const names = {
    language: 'Ngôn ngữ',
    science: 'Khoa học',
    history: 'Lịch sử',
    math: 'Toán học',
    other: 'Khác'
  };
  return names[category] || names.other;
};

export default StudySetCard;