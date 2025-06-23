// server/src/controllers/studySessionController.js
const StudySession = require('../models/StudySession');
const StudySet = require('../models/StudySet');
const User = require('../models/User');

const studySessionController = {
  // Start new study session
  startSession: async (req, res) => {
    try {
      const { studySetId } = req.params;
      const { sessionType = 'flashcard', settings = {} } = req.body;

      console.log('🎯 Starting study session:', { studySetId, sessionType, userId: req.user.id });

      // Get study set
      const studySet = await StudySet.findById(studySetId);
      if (!studySet) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy học phần'
        });
      }

      // Check access permissions
      if (studySet.privacy === 'private' && studySet.creator.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập học phần này'
        });
      }

      // Check if study set has cards
      if (!studySet.cards || studySet.cards.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Học phần không có thẻ nào để học'
        });
      }

      // Create new study session
      const session = new StudySession({
        user: req.user.id,
        studySet: studySetId,
        sessionType,
        totalCards: studySet.cards.length,
        settings: {
          showImages: settings.showImages !== false,
          playAudio: settings.playAudio !== false,
          autoFlip: settings.autoFlip || false,
          shuffleCards: settings.shuffleCards || false
        }
      });

      await session.save();

      // Populate study set info
      await session.populate('studySet', 'title description cards');

      // Shuffle cards if requested
      let cards = [...session.studySet.cards];
      if (session.settings.shuffleCards) {
        cards = cards.sort(() => Math.random() - 0.5);
      }

      console.log('✅ Study session created:', session._id);

      res.status(201).json({
        success: true,
        message: 'Bắt đầu phiên học thành công!',
        data: {
          session: {
            ...session.toObject(),
            studySet: {
              ...session.studySet.toObject(),
              cards
            }
          }
        }
      });

    } catch (error) {
      console.error('❌ Start session error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi bắt đầu phiên học'
      });
    }
  },

  // Get active session
  getSession: async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await StudySession.findById(sessionId)
        .populate('studySet', 'title description cards')
        .populate('user', 'firstName lastName');

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phiên học'
        });
      }

      // Check ownership
      if (session.user._id.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập phiên học này'
        });
      }

      res.json({
        success: true,
        data: session
      });

    } catch (error) {
      console.error('❌ Get session error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin phiên học'
      });
    }
  },

  // Answer a card
  answerCard: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { cardId, result, timeSpent = 0 } = req.body;

      console.log('📝 Answering card:', { sessionId, cardId, result, timeSpent });

      if (!['correct', 'incorrect', 'skipped'].includes(result)) {
        return res.status(400).json({
          success: false,
          message: 'Kết quả không hợp lệ'
        });
      }

      const session = await StudySession.findById(sessionId)
        .populate('studySet', 'cards');

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phiên học'
        });
      }

      if (session.user.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập phiên học này'
        });
      }

      if (session.status !== 'active') {
        return res.status(400).json({
          success: false,
          message: 'Phiên học đã kết thúc'
        });
      }

      // Find the card
      const card = session.studySet.cards.id(cardId);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thẻ học'
        });
      }

      // Check if card already answered
      const existingResult = session.cardResults.find(r => r.cardId.toString() === cardId);
      if (existingResult) {
        return res.status(400).json({
          success: false,
          message: 'Thẻ này đã được trả lời'
        });
      }

      // Add card result
      const cardResult = {
        cardId: cardId,
        term: card.term,
        definition: card.definition,
        result: result,
        timeSpent: Math.max(0, timeSpent),
        answeredAt: new Date()
      };

      session.addCardResult(cardResult);

      // Move to next card
      session.currentCardIndex = Math.min(session.currentCardIndex + 1, session.totalCards - 1);

      await session.save();

      console.log('✅ Card answered, session updated');

      res.json({
        success: true,
        message: 'Đã ghi nhận câu trả lời',
        data: {
          session: {
            _id: session._id,
            currentCardIndex: session.currentCardIndex,
            cardsStudied: session.cardsStudied,
            completionPercentage: session.completionPercentage,
            stats: session.stats
          },
          nextCard: session.currentCardIndex < session.totalCards - 1
        }
      });

    } catch (error) {
      console.error('❌ Answer card error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi ghi nhận câu trả lời'
      });
    }
  },

  // Complete session
  completeSession: async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await StudySession.findById(sessionId)
        .populate('studySet', 'title description');

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phiên học'
        });
      }

      if (session.user.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập phiên học này'
        });
      }

      if (session.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Phiên học đã được hoàn thành'
        });
      }

      // Complete the session
      session.completeSession();
      await session.save();

      // Update user's study stats
      await User.findByIdAndUpdate(req.user.id, {
        $inc: {
          'stats.totalStudySessions': 1,
          'stats.totalCardsStudied': session.cardsStudied,
          'stats.totalStudyTime': session.stats.totalTimeSpent
        },
        lastStudyAt: new Date()
      });

      console.log('🎉 Study session completed:', session._id);

      res.json({
        success: true,
        message: 'Hoàn thành phiên học thành công!',
        data: {
          session: {
            _id: session._id,
            completionPercentage: session.completionPercentage,
            accuracyPercentage: session.accuracyPercentage,
            stats: session.stats,
            totalTimeSpent: session.stats.totalTimeSpent,
            cardsStudied: session.cardsStudied,
            totalCards: session.totalCards,
            completedAt: session.completedAt
          }
        }
      });

    } catch (error) {
      console.error('❌ Complete session error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi hoàn thành phiên học'
      });
    }
  },

  // Get user's study history
  getStudyHistory: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const sessions = await StudySession.find({ 
        user: req.user.id,
        status: 'completed'
      })
        .populate('studySet', 'title description category')
        .sort({ completedAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await StudySession.countDocuments({ 
        user: req.user.id,
        status: 'completed'
      });

      res.json({
        success: true,
        data: {
          sessions,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total,
            limit
          }
        }
      });

    } catch (error) {
      console.error('❌ Get study history error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy lịch sử học tập'
      });
    }
  },

  // Pause/Resume session
  pauseSession: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { action } = req.body; // 'pause' or 'resume'

      const session = await StudySession.findById(sessionId);

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phiên học'
        });
      }

      if (session.user.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập phiên học này'
        });
      }

      if (action === 'pause' && session.status === 'active') {
        session.status = 'paused';
      } else if (action === 'resume' && session.status === 'paused') {
        session.status = 'active';
      } else {
        return res.status(400).json({
          success: false,
          message: 'Hành động không hợp lệ'
        });
      }

      await session.save();

      res.json({
        success: true,
        message: action === 'pause' ? 'Đã tạm dừng phiên học' : 'Đã tiếp tục phiên học',
        data: {
          status: session.status
        }
      });

    } catch (error) {
      console.error('❌ Pause/Resume session error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi thay đổi trạng thái phiên học'
      });
    }
  }
};

module.exports = studySessionController;