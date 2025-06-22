// client/src/pages/CreateStudySetPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import CreateStudySetForm from '../components/study-sets/CreateStudySetForm';
import '../styles/pages/create-study-set.css';

const CreateStudySetPage = () => {
  const { user } = useAuth();

  return (
    <div className="create-study-set-page">
      <div className="create-study-set-page__container">
        <div className="create-study-set-page__header">
          <h1 className="create-study-set-page__title">Tạo học phần mới</h1>
          <p className="create-study-set-page__subtitle">
            Tạo bộ thẻ học tập của riêng bạn với từ vựng, hình ảnh và âm thanh
          </p>
        </div>

        <CreateStudySetForm />
      </div>
    </div>
  );
};

export default CreateStudySetPage;