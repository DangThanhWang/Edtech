// client/src/components/study-sets/MediaUpload.jsx
import React, { useState, useRef } from 'react';
import { useToast } from '../../context/ToastContext';
import studySetService from '../../services/studySetService';
import LoadingSpinner from '../common/LoadingSpinner';

const MediaUpload = ({ type, onUpload, currentUrl, onRemove }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const fileInputRef = useRef(null);
  const { showError, showSuccess } = useToast();

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const isImage = type === 'image' && file.type.startsWith('image/');
    const isAudio = type === 'audio' && file.type.startsWith('audio/');

    if (!isImage && !isAudio) {
      showError(`Vui lòng chọn file ${type === 'image' ? 'ảnh' : 'âm thanh'} hợp lệ`);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showError('File quá lớn. Kích thước tối đa là 10MB');
      return;
    }

    setIsUploading(true);

    try {
      const response = await studySetService.uploadFile(file);
      const fileUrl = response.data.url;
      
      setPreview(fileUrl);
      onUpload(fileUrl);
      showSuccess(`Upload ${type === 'image' ? 'ảnh' : 'âm thanh'} thành công!`);
    } catch (error) {
      console.error('Upload error:', error);
      showError('Upload thất bại. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="media-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept={type === 'image' ? 'image/*' : 'audio/*'}
        onChange={handleFileSelect}
        className="media-upload__input"
        disabled={isUploading}
      />
      
      <div className="media-upload__area">
        {isUploading ? (
          <div className="media-upload__loading">
            <LoadingSpinner size="medium" />
            <span>Đang upload...</span>
          </div>
        ) : preview ? (
          <div className="media-upload__preview">
            {type === 'image' ? (
              <img src={preview} alt="Preview" className="media-upload__image" />
            ) : (
              <audio controls className="media-upload__audio">
                <source src={preview} />
                Trình duyệt không hỗ trợ phát âm thanh
              </audio>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="media-upload__remove"
            >
              ✕
            </button>
          </div>
        ) : (
          <div 
            className="media-upload__placeholder"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="media-upload__icon">
              {type === 'image' ? '🖼️' : '🎵'}
            </div>
            <span>
              {type === 'image' ? 'Thêm ảnh' : 'Thêm âm thanh'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
