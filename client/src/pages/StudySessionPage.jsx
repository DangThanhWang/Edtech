// client/src/pages/StudySessionPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import StudyCard from '../components/study/StudyCard';
import StudyProgress from '../components/study/StudyProgress';
import StudySettings from '../components/study/StudySettings';
import StudyResults from '../components/study/StudyResults';
import LoadingSpinner from '../components/common/LoadingSpinner';
import studySessionService from '../services/studySessionService';
import '../styles/pages/study-session.css';

const StudySessionPage = () => {
  const { studySetId } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useToast();
  
  // Session state
  const [session, setSession] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Study settings
  const [settings, setSettings] = useState({
    showImages: true,
    playAudio: true,
    autoFlip: false,
    shuffleCards: false
  });
  
  // Time tracking
  const [cardStartTime, setCardStartTime] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const answeredCards = useRef(new Set());

  // Initialize study session
  useEffect(() => {
    if (studySetId) {
      initializeSession();
    }
  }, [studySetId]);

  // Start timer when card changes
  useEffect(() => {
    if (currentCard && !answeredCards.current.has(currentCard._id)) {
      setCardStartTime(Date.now());
    }
  }, [currentCard]);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      
      const response = await studySessionService.startSession(studySetId, {
        sessionType: 'flashcard',
        settings
      });
      
      const sessionData = response.data.data.session;
      setSession(sessionData);
      setSessionStartTime(Date.now());
      
      // Set first card
      if (sessionData.studySet.cards.length > 0) {
        setCurrentCard(sessionData.studySet.cards[0]);
      } else {
        showError('Học phần không có thẻ nào để học');
        navigate(-1);
        return;
      }
      
      console.log('📚 Study session initialized:', sessionData._id);
      
    } catch (error) {
      console.error('❌ Initialize session error:', error);
      showError(error.response?.data?.message || 'Không thể bắt đầu phiên học');
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlip = () => {
    if (answeredCards.current.has(currentCard._id)) return;
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = async (result) => {
    if (!currentCard || !session || isAnswering) return;
    if (answeredCards.current.has(currentCard._id)) return;

    try {
      setIsAnswering(true);
      
      const timeSpent = cardStartTime ? Math.floor((Date.now() - cardStartTime) / 1000) : 0;
      
      console.log('📝 Answering card:', {
        cardId: currentCard._id,
        result,
        timeSpent
      });

      const response = await studySessionService.answerCard(session._id, {
        cardId: currentCard._id,
        result,
        timeSpent
      });

      // Mark card as answered
      answeredCards.current.add(currentCard._id);
      
      // Update session stats
      const updatedSession = response.data.data.session;
      setSession(prev => ({
        ...prev,
        ...updatedSession
      }));

      // Show feedback
      const feedbackMessages = {
        correct: '✅ Tuyệt vời!',
        incorrect: '❌ Cần ôn tập thêm',
        skipped: '⏭️ Đã bỏ qua'
      };
      
      showSuccess(feedbackMessages[result]);

      // Move to next card after delay
      setTimeout(() => {
        moveToNextCard();
      }, 1000);

    } catch (error) {
      console.error('❌ Answer card error:', error);
      showError('Có lỗi khi ghi nhận câu trả lời');
    } finally {
      setIsAnswering(false);
    }
  };

  const moveToNextCard = () => {
    if (!session || !session.studySet.cards) return;

    const currentIndex = session.studySet.cards.findIndex(card => card._id === currentCard._id);
    const nextIndex = currentIndex + 1;

    if (nextIndex < session.studySet.cards.length) {
      // Move to next card
      setCurrentCard(session.studySet.cards[nextIndex]);
      setIsFlipped(false);
      setCardStartTime(Date.now());
    } else {
      // Complete session
      completeSession();
    }
  };

  const completeSession = async () => {
    try {
      setIsLoading(true);
      
      const response = await studySessionService.completeSession(session._id);
      const completedSession = response.data.data.session;
      
      setSession(prev => ({
        ...prev,
        ...completedSession,
        status: 'completed'
      }));
      
      setShowResults(true);
      showSuccess('🎉 Hoàn thành phiên học!');
      
    } catch (error) {
      console.error('❌ Complete session error:', error);
      showError('Có lỗi khi hoàn thành phiên học');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseResume = async () => {
    try {
      const action = isPaused ? 'resume' : 'pause';
      
      await studySessionService.pauseSession(session._id, action);
      setIsPaused(!isPaused);
      
      if (action === 'pause') {
        showWarning('⏸️ Phiên học đã tạm dừng');
      } else {
        showSuccess('▶️ Tiếp tục phiên học');
        setCardStartTime(Date.now()); // Reset timer
      }
      
    } catch (error) {
      console.error('❌ Pause/Resume error:', error);
      showError('Có lỗi khi thay đổi trạng thái phiên học');
    }
  };

  const handleGoBack = () => {
    if (session && answeredCards.current.size > 0) {
      const shouldLeave = window.confirm(
        'Bạn có chắc chắn muốn thoát? Tiến độ hiện tại sẽ được lưu.'
      );
      if (!shouldLeave) return;
    }
    
    navigate(-1);
  };

  const handleRestartSession = () => {
    const shouldRestart = window.confirm(
      'Bạn có chắc chắn muốn bắt đầu lại? Tiến độ hiện tại sẽ bị mất.'
    );
    
    if (shouldRestart) {
      // Reset state
      answeredCards.current.clear();
      setIsFlipped(false);
      setShowResults(false);
      setIsPaused(false);
      
      // Restart session
      initializeSession();
    }
  };

  const handleViewStudySet = () => {
    navigate(`/study-set/${studySetId}`);
  };

  // Loading state
  if (isLoading && !session) {
    return (
      <div className="study-session-loading">
        <LoadingSpinner size="large" />
        <p>Đang chuẩn bị phiên học...</p>
      </div>
    );
  }

  // Error state
  if (!session) {
    return (
      <div className="study-session-error">
        <h2>Không thể tải phiên học</h2>
        <button onClick={() => navigate(-1)} className="btn btn--primary">
          Quay lại
        </button>
      </div>
    );
  }

  // Results state
  if (showResults) {
    return (
      <StudyResults
        session={session}
        onRestart={handleRestartSession}
        onViewStudySet={handleViewStudySet}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <div className="study-session-page">
      {/* Header */}
      <div className="study-session-header">
        <div className="study-session-info">
          <button 
            onClick={handleGoBack}
            className="study-session-back"
          >
            ← Quay lại
          </button>
          
          <div className="study-session-title">
            <h1>{session.studySet.title}</h1>
            <p>Chế độ: Flashcard</p>
          </div>
        </div>

        <div className="study-session-controls">
          <button 
            onClick={() => setShowSettings(true)}
            className="btn btn--outline btn--small"
          >
            ⚙️ Cài đặt
          </button>
          
          <button 
            onClick={handlePauseResume}
            className={`btn btn--small ${isPaused ? 'btn--primary' : 'btn--outline'}`}
          >
            {isPaused ? '▶️ Tiếp tục' : '⏸️ Tạm dừng'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <StudyProgress 
        session={session}
        currentCardIndex={session.studySet.cards.findIndex(card => card._id === currentCard._id)}
        totalCards={session.studySet.cards.length}
        answeredCount={answeredCards.current.size}
      />

      {/* Study Card */}
      {currentCard && !isPaused && (
        <div className="study-session-content">
          <StudyCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onAnswer={handleAnswer}
            showControls={true}
            autoFlip={settings.autoFlip}
            showImages={settings.showImages}
            playAudio={settings.playAudio}
            isAnswered={answeredCards.current.has(currentCard._id)}
          />
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="study-session-pause">
          <div className="study-session-pause-content">
            <h2>⏸️ Phiên học đã tạm dừng</h2>
            <p>Nhấn "Tiếp tục" để tiếp tục học</p>
            <button 
              onClick={handlePauseResume}
              className="btn btn--primary btn--large"
            >
              ▶️ Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="study-session-loading-overlay">
          <LoadingSpinner size="large" />
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <StudySettings
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default StudySessionPage;