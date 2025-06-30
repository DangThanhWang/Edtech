// server/src/routes/studySet.js (Updated with browse route)
const express = require('express');
const { body } = require('express-validator');
const studySetController = require('../controllers/studySetController');
const auth = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const path = require('path');

const router = express.Router();

// Validation rules
const createStudySetValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Tiêu đề phải có từ 1-200 ký tự'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Mô tả không được quá 1000 ký tự'),
  body('cards')
    .isArray({ min: 1 })
    .withMessage('Phải có ít nhất 1 thẻ'),
  body('cards.*.term')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Thuật ngữ phải có từ 1-500 ký tự'),
  body('cards.*.definition')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Định nghĩa phải có từ 1-2000 ký tự'),
  body('privacy')
    .optional()
    .isIn(['public', 'private'])
    .withMessage('Quyền riêng tư phải là public hoặc private'),
  body('category')
    .optional()
    .isIn(['language', 'science', 'history', 'math', 'other'])
    .withMessage('Danh mục không hợp lệ')
];

// File upload route
router.post('/upload', auth, upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không có file được upload'
      });
    }

    const fileUrl = `/uploads/${req.file.mimetype.startsWith('image/') ? 'images' : 'audio'}/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Upload file thành công',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi upload file'
    });
  }
});

// Browse public study sets (NEW ROUTE - place before parameterized routes)
router.get('/browse', studySetController.getBrowseStudySets);

// Study set CRUD routes
router.post('/', auth, createStudySetValidation, studySetController.createStudySet);
router.get('/my-sets', auth, studySetController.getUserStudySets);
router.get('/stats', auth, studySetController.getStudySetStats);
router.get('/:id', auth, studySetController.getStudySetById);
router.put('/:id', auth, createStudySetValidation, studySetController.updateStudySet);
router.delete('/:id', auth, studySetController.deleteStudySet);
router.post('/:id/duplicate', auth, studySetController.duplicateStudySet);

// Serve uploaded files
router.get('/files/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', type, filename);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'File không tồn tại'
      });
    }
  });
});

module.exports = router;