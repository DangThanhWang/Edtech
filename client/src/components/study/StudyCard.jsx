// client/src/components/study/StudyCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/study/study-card.css';

const StudyCard = ({ 
  card, 
  isFlipped, 
  onFlip, 
  onAnswer, 
  showControls = true,
  autoFlip = false,
  showImages = true,
  playAudio = true,
  isAnswered = false 
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto flip after 3 seconds if enabled
    if (autoFlip && !isFlipped && !isAnswered) {
      const timer = setTimeout(() => {
        onFlip();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [autoFlip, isFlipped, onFlip, isAnswered]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyPress = (e) => {
      if (isAnswered) return;
      
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          onFlip();
          break;
        case '1':
          if (isFlipped && showControls) {
            e.preventDefault();
            onAnswer('incorrect');
          }
          break;
        case '2':
          if (isFlipped && showControls) {
            e.preventDefault();
            onAnswer('correct');
          }
          break;
        case '3':
          if (showControls) {
            e.preventDefault();
            onAnswer('skipped');
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, onFlip, onAnswer, showControls, isAnswered]);

  const handleAudioPlay = () => {
    if (audioRef.current && playAudio) {
      setIsAudioPlaying(true);
      audioRef.current.play()
        .then(() => {
          console.log('Audio playing');
        })
        .catch(error => {
          console.error('Audio play error:', error);
          setIsAudioPlaying(false);
        });
    }
  };

  const handleAudioEnd = () => {
    setIsAudioPlaying(false);
  };

  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3, duration: 0.3 }
    }
  };

  return (
    <div className="study-card-container">
      <motion.div 
        className={`study-card ${isAnswered ? 'study-card--answered' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
        animate={isFlipped ? 'back' : 'front'}
        variants={cardVariants}
        onClick={!isAnswered ? onFlip : undefined}
      >
        {/* Front Side - Term */}
        <motion.div 
          className="study-card__side study-card__front"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="study-card__content">
            <div className="study-card__label">Thuật ngữ</div>
            
            <motion.div 
              className="study-card__text"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {card.term}
            </motion.div>

            {card.image && showImages && (
              <motion.div 
                className="study-card__media"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <img 
                  src={card.image} 
                  alt={card.term}
                  className="study-card__image"
                  loading="lazy"
                />
              </motion.div>
            )}

            <div className="study-card__hint">
              {isAnswered ? '✅ Đã trả lời' : 'Nhấn để xem định nghĩa'}
            </div>
          </div>
        </motion.div>

        {/* Back Side - Definition */}
        <motion.div 
          className="study-card__side study-card__back"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="study-card__content">
            <div className="study-card__label">Định nghĩa</div>
            
            <motion.div 
              className="study-card__text"
              variants={contentVariants}
              initial="hidden"
              animate={isFlipped ? "visible" : "hidden"}
            >
              {card.definition}
            </motion.div>

            {card.audio && playAudio && (
              <motion.div 
                className="study-card__media"
                variants={contentVariants}
                initial="hidden"
                animate={isFlipped ? "visible" : "hidden"}
              >
                <button 
                  className={`study-card__audio-btn ${isAudioPlaying ? 'playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAudioPlay();
                  }}
                  disabled={isAudioPlaying}
                >
                  {isAudioPlaying ? '🔊 Đang phát...' : '🔊 Phát âm thanh'}
                </button>
                
                <audio 
                  ref={audioRef}
                  onEnded={handleAudioEnd}
                  preload="metadata"
                >
                  <source src={card.audio} />
                  Trình duyệt không hỗ trợ phát âm thanh
                </audio>
              </motion.div>
            )}

            <div className="study-card__hint">
              {isAnswered ? '✅ Đã trả lời' : 'Bạn có biết thuật ngữ này không?'}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Answer Controls */}
      <AnimatePresence>
        {showControls && isFlipped && !isAnswered && (
          <motion.div 
            className="study-card__controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="study-card__btn study-card__btn--incorrect"
              onClick={() => onAnswer('incorrect')}
            >
              <span className="study-card__btn-icon">❌</span>
              <span className="study-card__btn-text">Không biết</span>
              <span className="study-card__btn-shortcut">(1)</span>
            </button>
            
            <button 
              className="study-card__btn study-card__btn--correct"
              onClick={() => onAnswer('correct')}
            >
              <span className="study-card__btn-icon">✅</span>
              <span className="study-card__btn-text">Đã biết</span>
              <span className="study-card__btn-shortcut">(2)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      {showControls && !isAnswered && (
        <motion.button 
          className="study-card__skip"
          onClick={() => onAnswer('skipped')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Bỏ qua (3)
        </motion.button>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="study-card__shortcuts">
        <div className="study-card__shortcut">Space: Lật thẻ</div>
        <div className="study-card__shortcut">1: Không biết • 2: Đã biết • 3: Bỏ qua</div>
      </div>
    </div>
  );
};

export default StudyCard;