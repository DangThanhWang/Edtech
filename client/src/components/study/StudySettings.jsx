// client/src/components/study/StudySettings.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/study/study-settings.css';

const StudySettings = ({ settings, onSettingsChange, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings = {
      showImages: true,
      playAudio: true,
      autoFlip: false,
      shuffleCards: false
    };
    setLocalSettings(defaultSettings);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="study-settings-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="study-settings-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="study-settings-header">
            <h2>⚙️ Cài đặt học tập</h2>
            <button 
              onClick={onClose}
              className="study-settings-close"
            >
              ✕
            </button>
          </div>

          <div className="study-settings-content">
            <div className="study-settings-section">
              <h3>Hiển thị nội dung</h3>
              
              <div className="study-settings-option">
                <label className="study-settings-label">
                  <input
                    type="checkbox"
                    checked={localSettings.showImages}
                    onChange={(e) => handleChange('showImages', e.target.checked)}
                  />
                  <span className="study-settings-checkmark"></span>
                  <span className="study-settings-text">
                    <strong>Hiển thị hình ảnh</strong>
                    <small>Hiển thị hình ảnh trong thẻ học (nếu có)</small>
                  </span>
                </label>
              </div>

              <div className="study-settings-option">
                <label className="study-settings-label">
                  <input
                    type="checkbox"
                    checked={localSettings.playAudio}
                    onChange={(e) => handleChange('playAudio', e.target.checked)}
                  />
                  <span className="study-settings-checkmark"></span>
                  <span className="study-settings-text">
                    <strong>Phát âm thanh</strong>
                    <small>Cho phép phát âm thanh trong thẻ học</small>
                  </span>
                </label>
              </div>
            </div>

            <div className="study-settings-section">
              <h3>Hành vi học tập</h3>
              
              <div className="study-settings-option">
                <label className="study-settings-label">
                  <input
                    type="checkbox"
                    checked={localSettings.autoFlip}
                    onChange={(e) => handleChange('autoFlip', e.target.checked)}
                  />
                  <span className="study-settings-checkmark"></span>
                  <span className="study-settings-text">
                    <strong>Tự động lật thẻ</strong>
                    <small>Tự động lật thẻ sau 3 giây</small>
                  </span>
                </label>
              </div>

              <div className="study-settings-option">
                <label className="study-settings-label">
                  <input
                    type="checkbox"
                    checked={localSettings.shuffleCards}
                    onChange={(e) => handleChange('shuffleCards', e.target.checked)}
                  />
                  <span className="study-settings-checkmark"></span>
                  <span className="study-settings-text">
                    <strong>Xáo trộn thẻ</strong>
                    <small>Hiển thị thẻ theo thứ tự ngẫu nhiên</small>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="study-settings-actions">
            <button 
              onClick={handleReset}
              className="btn btn--outline"
            >
              Đặt lại mặc định
            </button>
            
            <div className="study-settings-main-actions">
              <button 
                onClick={onClose}
                className="btn btn--outline"
              >
                Hủy
              </button>
              
              <button 
                onClick={handleSave}
                className="btn btn--primary"
              >
                Lưu cài đặt
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StudySettings;