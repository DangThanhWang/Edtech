// client/src/components/study/StudyResults.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/components/study/study-results.css';

const StudyResults = ({ session, onRestart, onViewStudySet, onGoBack }) => {
  const { stats } = session;
  const totalAnswered = stats.correctAnswers + stats.incorrectAnswers;
  const accuracyPercentage = totalAnswered > 0 ? Math.round((stats.correctAnswers / totalAnswered) * 100) : 0;
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (accuracyPercentage >= 90) return { text: "Xuất sắc! 🌟", color: "success" };
    if (accuracyPercentage >= 70) return { text: "Tốt lắm! 👍", color: "good" };
    if (accuracyPercentage >= 50) return { text: "Cần cải thiện 📈", color: "average" };
    return { text: "Cần ôn tập thêm 📚", color: "needs-work" };
  };

  const performance = getPerformanceMessage();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="study-results"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="study-results__container">
        <motion.div className="study-results__header" variants={itemVariants}>
          <div className="study-results__icon">🎉</div>
          <h1 className="study-results__title">Hoàn thành phiên học!</h1>
          <p className={`study-results__performance study-results__performance--${performance.color}`}>
            {performance.text}
          </p>
        </motion.div>

        <motion.div className="study-results__stats" variants={itemVariants}>
          <div className="study-results__stat-card">
            <div className="study-results__stat-icon">📊</div>
            <div className="study-results__stat-content">
              <div className="study-results__stat-number">{accuracyPercentage}%</div>
              <div className="study-results__stat-label">Độ chính xác</div>
            </div>
          </div>

          <div className="study-results__stat-card">
            <div className="study-results__stat-icon">✅</div>
            <div className="study-results__stat-content">
              <div className="study-results__stat-number">{stats.correctAnswers}</div>
              <div className="study-results__stat-label">Câu đúng</div>
            </div>
          </div>

          <div className="study-results__stat-card">
            <div className="study-results__stat-icon">❌</div>
            <div className="study-results__stat-content">
              <div className="study-results__stat-number">{stats.incorrectAnswers}</div>
              <div className="study-results__stat-label">Câu sai</div>
            </div>
          </div>

          <div className="study-results__stat-card">
            <div className="study-results__stat-icon">⏱️</div>
            <div className="study-results__stat-content">
              <div className="study-results__stat-number">{formatTime(stats.totalTimeSpent)}</div>
              <div className="study-results__stat-label">Thời gian</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="study-results__details" variants={itemVariants}>
          <h3>Chi tiết phiên học</h3>
          <div className="study-results__detail-grid">
            <div className="study-results__detail">
              <span className="study-results__detail-label">Tổng số thẻ:</span>
              <span className="study-results__detail-value">{session.totalCards}</span>
            </div>
            <div className="study-results__detail">
              <span className="study-results__detail-label">Thẻ đã học:</span>
              <span className="study-results__detail-value">{session.cardsStudied}</span>
            </div>
            <div className="study-results__detail">
              <span className="study-results__detail-label">Thẻ bỏ qua:</span>
              <span className="study-results__detail-value">{stats.skippedAnswers}</span>
            </div>
            <div className="study-results__detail">
              <span className="study-results__detail-label">Trung bình/thẻ:</span>
              <span className="study-results__detail-value">{formatTime(Math.round(stats.averageTimePerCard))}</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="study-results__actions" variants={itemVariants}>
          <button 
            onClick={onRestart}
            className="btn btn--primary btn--large"
          >
            🔄 Học lại
          </button>
          
          <button 
            onClick={onViewStudySet}
            className="btn btn--outline btn--large"
          >
            📚 Xem học phần
          </button>
          
          <button 
            onClick={onGoBack}
            className="btn btn--outline btn--large"
          >
            ← Quay lại
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudyResults;