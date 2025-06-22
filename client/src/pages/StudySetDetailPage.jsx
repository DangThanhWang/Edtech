// client/src/pages/StudySetDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studySetService from '../services/studySetService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const StudySetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studySet, setStudySet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <LoadingSpinner size="large" color="primary" />;
  }

  if (error) {
    return <div className="study-set-error">{error}</div>;
  }

  if (!studySet) {
    return <div className="study-set-error">Không có dữ liệu học phần</div>;
  }

  return (
    <div className="study-set-detail">
      <div className="study-set-detail__header">
        <h1>{studySet.title}</h1>
        <p className="description">{studySet.description || 'Không có mô tả'}</p>
        <p className="meta">
          Số thẻ: {studySet.cards?.length || 0} | Quyền riêng tư: {studySet.privacy || 'public'}
        </p>
      </div>

      <div className="study-set-detail__cards">
        {studySet.cards?.length > 0 ? (
          studySet.cards.map((card, index) => (
            <div key={index} className="card-item">
              <div className="term">{card.term}</div>
              <div className="definition">{card.definition}</div>
            </div>
          ))
        ) : (
          <p>Chưa có thẻ nào trong học phần này.</p>
        )}
      </div>
    </div>
  );
};

export default StudySetDetailPage;
