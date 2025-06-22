// client/src/components/study-sets/CardEditor.jsx
import React, { useState, useEffect } from 'react';
import FormField from '../forms/FormField';
import MediaUpload from './MediaUpload';

const CardEditor = ({ card, index, onUpdate, onDelete, isExpanded, onToggleExpand }) => {
  const [cardData, setCardData] = useState({
    term: '',
    definition: '',
    image: null,
    audio: null,
    ...card
  });

  useEffect(() => {
    onUpdate(index, cardData);
  }, [cardData]);

  const handleInputChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMediaUpload = (type, url) => {
    setCardData(prev => ({
      ...prev,
      [type]: url
    }));
  };

  const handleMediaRemove = (type) => {
    setCardData(prev => ({
      ...prev,
      [type]: null
    }));
  };

  return (
    <div className={`card-editor ${isExpanded ? 'card-editor--expanded' : ''}`}>
      <div className="card-editor__header" onClick={onToggleExpand}>
        <div className="card-editor__info">
          <span className="card-editor__number">{index + 1}</span>
          <div className="card-editor__preview">
            <span className="card-editor__term">
              {cardData.term || 'Thuật ngữ'}
            </span>
            <span className="card-editor__definition">
              {cardData.definition || 'Định nghĩa'}
            </span>
          </div>
        </div>
        <div className="card-editor__actions">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
            className="btn btn--outline btn--small card-editor__delete"
          >
            Xóa
          </button>
          <span className="card-editor__toggle">
            {isExpanded ? '−' : '+'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="card-editor__content">
          <div className="card-editor__fields">
            <div className="card-editor__field">
              <FormField
                label="Thuật ngữ"
                type="text"
                value={cardData.term}
                onChange={(e) => handleInputChange('term', e.target.value)}
                placeholder="Nhập thuật ngữ..."
                required
              />
              <MediaUpload
                type="image"
                currentUrl={cardData.image}
                onUpload={(url) => handleMediaUpload('image', url)}
                onRemove={() => handleMediaRemove('image')}
              />
            </div>

            <div className="card-editor__field">
              <FormField
                label="Định nghĩa"
                type="textarea"
                value={cardData.definition}
                onChange={(e) => handleInputChange('definition', e.target.value)}
                placeholder="Nhập định nghĩa..."
                required
              />
              <MediaUpload
                type="audio"
                currentUrl={cardData.audio}
                onUpload={(url) => handleMediaUpload('audio', url)}
                onRemove={() => handleMediaRemove('audio')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardEditor;
