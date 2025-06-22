// client/src/components/study-sets/CreateStudySetForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import FormField from '../forms/FormField';
import CardEditor from './CardEditor';
import LoadingSpinner from '../common/LoadingSpinner';
import studySetService from '../../services/studySetService';

const CreateStudySetForm = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    privacy: 'public',
    category: 'other',
    tags: []
  });
  
  const [cards, setCards] = useState([
    { term: '', definition: '', image: null, audio: null },
    { term: '', definition: '', image: null, audio: null }
  ]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTagsChange = (value) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleCardUpdate = (index, cardData) => {
    setCards(prev => {
      const newCards = [...prev];
      newCards[index] = cardData;
      return newCards;
    });
  };

  const handleCardDelete = (index) => {
    if (cards.length <= 2) {
      showError('Học phần phải có ít nhất 2 thẻ');
      return;
    }
    
    setCards(prev => prev.filter((_, i) => i !== index));
    
    // Adjust expanded card index
    if (expandedCard >= index && expandedCard > 0) {
      setExpandedCard(prev => prev - 1);
    }
  };

  const handleAddCard = () => {
    setCards(prev => [
      ...prev,
      { term: '', definition: '', image: null, audio: null }
    ]);
    setExpandedCard(cards.length);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }

    // Validate cards
    let hasValidCard = false;
    cards.forEach((card, index) => {
      if (card.term.trim() && card.definition.trim()) {
        hasValidCard = true;
      }
    });

    if (!hasValidCard) {
      newErrors.cards = 'Phải có ít nhất 1 thẻ với đầy đủ thuật ngữ và định nghĩa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty cards
      const validCards = cards.filter(card => 
        card.term.trim() && card.definition.trim()
      );

      const studySetData = {
        ...formData,
        cards: validCards
      };

      const response = await studySetService.createStudySet(studySetData);
      
      showSuccess('Tạo học phần thành công!');
      navigate(`/study-set/${response.data.data._id}`);
      
    } catch (error) {
      console.error('Create study set error:', error);
      showError(error.response?.data?.message || 'Có lỗi xảy ra khi tạo học phần');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="create-study-set-form" onSubmit={handleSubmit}>
      {/* Basic Information */}
      <div className="create-study-set-form__section">
        <h2 className="create-study-set-form__section-title">Thông tin cơ bản</h2>
        
        <FormField
          label="Tiêu đề học phần"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={errors.title}
          placeholder="Ví dụ: Từ vựng tiếng Anh cơ bản"
          required
        />

        <FormField
          label="Mô tả"
          type="textarea"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Mô tả ngắn về nội dung học phần..."
          rows={3}
        />

        <div className="form-row">
          <FormField
            label="Danh mục"
            type="select"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value="other">Khác</option>
            <option value="language">Ngôn ngữ</option>
            <option value="science">Khoa học</option>
            <option value="history">Lịch sử</option>
            <option value="math">Toán học</option>
          </FormField>

          <FormField
            label="Quyền riêng tư"
            type="select"
            value={formData.privacy}
            onChange={(e) => handleInputChange('privacy', e.target.value)}
          >
            <option value="public">Công khai</option>
            <option value="private">Riêng tư</option>
          </FormField>
        </div>

        <FormField
          label="Tags (phân cách bằng dấu phẩy)"
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="ielts, vocabulary, beginner"
        />
      </div>

      {/* Cards Section */}
      <div className="create-study-set-form__section">
        <div className="create-study-set-form__cards-header">
          <h2 className="create-study-set-form__section-title">
            Thẻ học tập ({cards.length})
          </h2>
          <button
            type="button"
            onClick={handleAddCard}
            className="btn btn--outline btn--small"
          >
            + Thêm thẻ
          </button>
        </div>

        {errors.cards && (
          <div className="form-error form-error--global">
            {errors.cards}
          </div>
        )}

        <div className="create-study-set-form__cards">
          {cards.map((card, index) => (
            <CardEditor
              key={index}
              card={card}
              index={index}
              onUpdate={handleCardUpdate}
              onDelete={handleCardDelete}
              isExpanded={expandedCard === index}
              onToggleExpand={() => setExpandedCard(
                expandedCard === index ? -1 : index
              )}
            />
          ))}
        </div>
      </div>

      {/* Submit Actions */}
      <div className="create-study-set-form__actions">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="btn btn--outline btn--large"
          disabled={isLoading}
        >
          Hủy
        </button>
        <button
          type="submit"
          className="btn btn--primary btn--large"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="small" /> : 'Tạo học phần'}
        </button>
      </div>
    </form>
  );
};

export default CreateStudySetForm;