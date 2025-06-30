// client/src/pages/StudySetDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import studySetService from '../services/studySetService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const StudySetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [studySet, setStudySet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDuplicating, setIsDuplicating] = useState(false);

  useEffect(() => {
    const fetchStudySet = async () => {
      try {
        setIsLoading(true);
        const response = await studySetService.getStudySetById(id);
        setStudySet(response.data.data);
      } catch (err) {
        console.error('❌ Failed to fetch study set:', err);
        setError('Không tìm thấy học phần');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudySet();
  }, [id]);

  const handleStartStudy = () => {
    navigate(`/study/${id}`);
  };

  const handleDuplicate = async () => {
    try {
      setIsDuplicating(true);
      const response = await studySetService.duplicateStudySet(id);
      const newStudySet = response.data.data;
      
      showSuccess('Sao chép học phần thành công!');
      navigate(`/study-set/${newStudySet._id}`);
      
    } catch (error) {
      console.error('❌ Duplicate error:', error);
      showError('Không thể sao chép học phần');
    } finally {
      setIsDuplicating(false);
    }
  };

  const handleEdit = () => {
    navigate(`/study-set/${id}/edit`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  if (isLoading) {
    return (
      <div className="study-set-detail-loading">
        <LoadingSpinner size="large" />
        <p>Đang tải học phần...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="study-set-detail-error">
        <div className="study-set-detail-error__content">
          <h2>❌ Có lỗi xảy ra</h2>
          <p>{error}</p>
          <div className="study-set-detail-error__actions">
            <button onClick={() => navigate(-1)} className="btn btn--primary">
              Quay lại
            </button>
            <Link to="/browse" className="btn btn--outline">
              Khám phá học phần khác
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!studySet) {
    return (
      <div className="study-set-detail-error">
        <div className="study-set-detail-error__content">
          <h2>📚 Không tìm thấy học phần</h2>
          <p>Học phần này có thể đã bị xóa hoặc bạn không có quyền truy cập.</p>
          <div className="study-set-detail-error__actions">
            <button onClick={() => navigate(-1)} className="btn btn--primary">
              Quay lại
            </button>
            <Link to="/browse" className="btn btn--outline">
              Khám phá học phần khác
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user && studySet.creator && studySet.creator._id === user._id;

  return (
    <div className="study-set-detail-page">
      <div className="study-set-detail-page__container">
        {/* Back Navigation */}
        <div className="study-set-detail-page__navigation">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Quay lại
          </button>
        </div>

        {/* Header */}
        <div className="study-set-detail-page__header">
          <div className="study-set-detail-page__header-content">
            <div className="study-set-detail-page__title-section">
              <h1 className="study-set-detail-page__title">{studySet.title}</h1>
              
              <div className="study-set-detail-page__meta">
                <div className="meta-item">
                  <span className="meta-icon">📚</span>
                  <span>{studySet.cards?.length || 0} thẻ</span>
                </div>
                
                <div className="meta-item">
                  <span className="meta-icon">
                    {getCategoryIcon(studySet.category)}
                  </span>
                  <span>{getCategoryName(studySet.category)}</span>
                </div>
                
                <div className="meta-item">
                  <span className="meta-icon">
                    {studySet.privacy === 'private' ? '🔒' : '🌐'}
                  </span>
                  <span>{studySet.privacy === 'private' ? 'Riêng tư' : 'Công khai'}</span>
                </div>
                
                {studySet.creator && (
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span>
                      {studySet.creator.firstName} {studySet.creator.lastName}
                    </span>
                  </div>
                )}
                
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Tạo: {formatDate(studySet.createdAt)}</span>
                </div>
              </div>

              {studySet.description && (
                <div className="study-set-detail-page__description">
                  {studySet.description}
                </div>
              )}

              {studySet.tags && studySet.tags.length > 0 && (
                <div className="study-set-detail-page__tags">
                  {studySet.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="study-set-detail-page__actions">
              <button 
                onClick={handleStartStudy}
                className="btn btn--primary btn--large study-btn"
              >
                🚀 Bắt đầu học
              </button>
              
              <button 
                onClick={handleDuplicate}
                disabled={isDuplicating}
                className="btn btn--outline"
              >
                {isDuplicating ? <LoadingSpinner size="small" /> : '📋 Sao chép'}
              </button>
              
              {isOwner && (
                <button 
                  onClick={handleEdit}
                  className="btn btn--outline"
                >
                  ✏️ Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cards Preview */}
        <div className="study-set-detail-page__content">
          <div className="study-set-detail-page__cards-header">
            <h2>Danh sách thẻ học ({studySet.cards?.length || 0})</h2>
            {studySet.cards?.length > 0 && (
              <p className="cards-description">
                Xem trước nội dung các thẻ trong học phần này
              </p>
            )}
          </div>

          <div className="study-set-detail-page__cards">
            {studySet.cards?.length > 0 ? (
              studySet.cards.map((card, index) => (
                <div key={index} className="card-preview">
                  <div className="card-preview__number">
                    {index + 1}
                  </div>
                  
                  <div className="card-preview__content">
                    <div className="card-preview__side">
                      <div className="card-preview__label">Thuật ngữ</div>
                      <div className="card-preview__text">
                        {card.term}
                      </div>
                      {card.image && (
                        <div className="card-preview__media">
                          <img 
                            src={card.image} 
                            alt={card.term}
                            className="card-preview__image"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="card-preview__divider"></div>
                    
                    <div className="card-preview__side">
                      <div className="card-preview__label">Định nghĩa</div>
                      <div className="card-preview__text">
                        {card.definition}
                      </div>
                      {card.audio && (
                        <div className="card-preview__media">
                          <audio controls className="card-preview__audio">
                            <source src={card.audio} />
                            Trình duyệt không hỗ trợ phát âm thanh
                          </audio>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="study-set-detail-page__empty">
                <div className="empty-state">
                  <div className="empty-state__icon">📝</div>
                  <h3>Chưa có thẻ nào</h3>
                  <p>Học phần này chưa có thẻ học nào.</p>
                  {isOwner && (
                    <button 
                      onClick={handleEdit}
                      className="btn btn--primary"
                    >
                      Thêm thẻ học
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Study Actions */}
        {studySet.cards?.length > 0 && (
          <div className="study-set-detail-page__study-section">
            <div className="study-section">
              <h3>Sẵn sàng để học?</h3>
              <p>Bắt đầu học với {studySet.cards.length} thẻ trong học phần này</p>
              
              <div className="study-modes">
                <button 
                  onClick={handleStartStudy}
                  className="study-mode-btn study-mode-btn--primary"
                >
                  <div className="study-mode-btn__icon">🔄</div>
                  <div className="study-mode-btn__content">
                    <div className="study-mode-btn__title">Flashcards</div>
                    <div className="study-mode-btn__description">
                      Học với thẻ lật truyền thống
                    </div>
                  </div>
                </button>
                
                <div className="study-mode-btn study-mode-btn--disabled">
                  <div className="study-mode-btn__icon">📝</div>
                  <div className="study-mode-btn__content">
                    <div className="study-mode-btn__title">Kiểm tra</div>
                    <div className="study-mode-btn__description">
                      Sắp ra mắt
                    </div>
                  </div>
                </div>
                
                <div className="study-mode-btn study-mode-btn--disabled">
                  <div className="study-mode-btn__icon">🎯</div>
                  <div className="study-mode-btn__content">
                    <div className="study-mode-btn__title">Ghép thẻ</div>
                    <div className="study-mode-btn__description">
                      Sắp ra mắt
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySetDetailPage;