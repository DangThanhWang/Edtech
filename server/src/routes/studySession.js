// server/src/routes/studySession.js
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const studySessionController = require('../controllers/studySessionController');

const router = express.Router();

// Validation middleware
const startSessionValidation = [
  body('sessionType')
    .optional()
    .isIn(['flashcard', 'test', 'match', 'write'])
    .withMessage('Loại phiên học không hợp lệ'),
  body('settings.showImages')
    .optional()
    .isBoolean()
    .withMessage('Cài đặt hiển thị ảnh phải là boolean'),
  body('settings.playAudio')
    .optional()
    .isBoolean()
    .withMessage('Cài đặt phát âm thanh phải là boolean'),
  body('settings.autoFlip')
    .optional()
    .isBoolean()
    .withMessage('Cài đặt tự động lật thẻ phải là boolean'),
  body('settings.shuffleCards')
    .optional()
    .isBoolean()
    .withMessage('Cài đặt xáo trộn thẻ phải là boolean')
];

const answerCardValidation = [
  body('cardId')
    .notEmpty()
    .withMessage('ID thẻ là bắt buộc'),
  body('result')
    .isIn(['correct', 'incorrect', 'skipped'])
    .withMessage('Kết quả phải là correct, incorrect hoặc skipped'),
  body('timeSpent')
    .optional()
    .isNumeric()
    .withMessage('Thời gian phải là số')
];

const pauseSessionValidation = [
  body('action')
    .isIn(['pause', 'resume'])
    .withMessage('Hành động phải là pause hoặc resume')
];

// Routes
router.post('/start/:studySetId', auth, startSessionValidation, studySessionController.startSession);
router.get('/history', auth, studySessionController.getStudyHistory);
router.get('/:sessionId', auth, studySessionController.getSession);
router.put('/:sessionId/answer', auth, answerCardValidation, studySessionController.answerCard);
router.put('/:sessionId/complete', auth, studySessionController.completeSession);
router.put('/:sessionId/pause', auth, pauseSessionValidation, studySessionController.pauseSession);

module.exports = router;