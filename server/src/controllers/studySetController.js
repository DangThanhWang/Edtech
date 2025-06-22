// server/src/controllers/studySetController.js (Updated with advanced features)
const StudySet = require('../models/StudySet');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const studySetController = {
  // Get user's study sets with sorting and filtering (Enhanced)
  getUserStudySets: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      // Sorting options
      const sortBy = req.query.sortBy || 'createdAt'; // createdAt, title, cardCount, updatedAt
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1; // desc by default
      
      // Search and filtering
      const search = req.query.search || '';
      const category = req.query.category || '';
      const privacy = req.query.privacy || '';

      console.log('📊 Get user study sets query:', {
        userId: req.user.id,
        sortBy,
        sortOrder,
        search,
        category,
        privacy,
        page,
        limit
      }); // DEBUG

      // Build query
      let query = { creator: req.user.id };

      // Add search filter
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      // Add category filter
      if (category) {
        query.category = category;
      }

      // Add privacy filter
      if (privacy) {
        query.privacy = privacy;
      }

      // Build sort object
      let sortObj = {};
      if (sortBy === 'cardCount') {
        sortObj['stats.totalCards'] = sortOrder;
      } else {
        sortObj[sortBy] = sortOrder;
      }

      // Add secondary sort by createdAt if primary sort is not createdAt
      if (sortBy !== 'createdAt') {
        sortObj.createdAt = -1;
      }

      console.log('🔍 Final query:', query); // DEBUG
      console.log('📈 Sort object:', sortObj); // DEBUG

      // Execute query
      const studySets = await StudySet.find(query)
        .populate('creator', 'firstName lastName avatar')
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(); // Use lean() for better performance

      const total = await StudySet.countDocuments(query);

      // Get category counts for filter UI
      const categoryStats = await StudySet.aggregate([
        { $match: { creator: req.user.id } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Get privacy stats
      const privacyStats = await StudySet.aggregate([
        { $match: { creator: req.user.id } },
        { $group: { _id: '$privacy', count: { $sum: 1 } } }
      ]);

      console.log('✅ Found study sets:', {
        count: studySets.length,
        total,
        categoryStats,
        privacyStats
      }); // DEBUG

      res.json({
        success: true,
        data: {
          studySets,
          pagination: {
            current: page,
            pages: Math.ceil(total / limit),
            total,
            limit
          },
          filters: {
            categoryStats,
            privacyStats
          },
          query: {
            sortBy,
            sortOrder: sortOrder === 1 ? 'asc' : 'desc',
            search,
            category,
            privacy
          }
        }
      });

    } catch (error) {
      console.error('❌ Get user study sets error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách học phần',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Duplicate study set
  duplicateStudySet: async (req, res) => {
    try {
      const { id } = req.params;
      
      console.log('📋 Duplicating study set:', id, 'by user:', req.user.id); // DEBUG

      const originalStudySet = await StudySet.findById(id);

      if (!originalStudySet) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy học phần'
        });
      }

      // Check if user owns the study set or if it's public
      if (originalStudySet.creator.toString() !== req.user.id && originalStudySet.privacy === 'private') {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền sao chép học phần này'
        });
      }

      // Create duplicate
      const duplicateData = {
        title: `${originalStudySet.title} (Copy)`,
        description: originalStudySet.description,
        creator: req.user.id, // Set current user as creator
        cards: originalStudySet.cards.map(card => ({
          term: card.term,
          definition: card.definition,
          image: card.image,
          audio: card.audio,
          order: card.order
        })),
        privacy: 'private', // Default to private for duplicates
        category: originalStudySet.category,
        tags: [...originalStudySet.tags] // Copy tags
      };

      const duplicatedStudySet = new StudySet(duplicateData);
      await duplicatedStudySet.save();

      // Add to user's study sets
      await User.findByIdAndUpdate(req.user.id, {
        $push: { studySets: duplicatedStudySet._id }
      });

      // Populate creator info
      await duplicatedStudySet.populate('creator', 'firstName lastName avatar');

      console.log('✅ Study set duplicated:', duplicatedStudySet._id); // DEBUG

      res.status(201).json({
        success: true,
        message: 'Sao chép học phần thành công!',
        data: duplicatedStudySet
      });

    } catch (error) {
      console.error('❌ Duplicate study set error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi sao chép học phần',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get study set statistics
  getStudySetStats: async (req, res) => {
    try {
      const userId = req.user.id;

      console.log('📊 Getting stats for user:', userId); // DEBUG

      const stats = await StudySet.aggregate([
        { $match: { creator: userId } },
        {
          $group: {
            _id: null,
            totalSets: { $sum: 1 },
            totalCards: { $sum: '$stats.totalCards' },
            publicSets: {
              $sum: { $cond: [{ $eq: ['$privacy', 'public'] }, 1, 0] }
            },
            privateSets: {
              $sum: { $cond: [{ $eq: ['$privacy', 'private'] }, 1, 0] }
            },
            categories: { $push: '$category' },
            avgCardsPerSet: { $avg: '$stats.totalCards' }
          }
        }
      ]);

      // Get category breakdown
      const categoryBreakdown = await StudySet.aggregate([
        { $match: { creator: userId } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Get recent activity (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentSets = await StudySet.countDocuments({
        creator: userId,
        createdAt: { $gte: sevenDaysAgo }
      });

      const result = {
        overview: stats[0] || {
          totalSets: 0,
          totalCards: 0,
          publicSets: 0,
          privateSets: 0,
          avgCardsPerSet: 0
        },
        categoryBreakdown,
        recentActivity: {
          newSetsThisWeek: recentSets
        }
      };

      console.log('✅ User stats:', result); // DEBUG

      res.json({
        success: true,
        data: result
      });

    } catch (error) {
      console.error('❌ Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thống kê'
      });
    }
  },

  // Existing methods (createStudySet, getStudySetById, updateStudySet, deleteStudySet)
  // ... (keep all existing methods from previous implementation)

  createStudySet: async (req, res) => {
    try {
      console.log('📥 Create StudySet Request:', req.body);
      console.log('👤 User:', req.user);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('❌ Validation errors:', errors.array());
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors: errors.array()
        });
      }

      const { title, description, cards, privacy, category, tags } = req.body;

      if (!cards || cards.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Học phần phải có ít nhất 1 thẻ'
        });
      }

      console.log('📝 Creating StudySet with data:', {
        title,
        description,
        cardsCount: cards.length,
        privacy,
        category,
        tags,
        creator: req.user.id
      });

      const studySet = new StudySet({
        title,
        description,
        creator: req.user.id,
        cards: cards.map((card, index) => ({
          ...card,
          order: index
        })),
        privacy: privacy || 'public',
        category: category || 'other',
        tags: tags || []
      });

      const savedStudySet = await studySet.save();
      console.log('✅ StudySet saved with ID:', savedStudySet._id);

      await User.findByIdAndUpdate(req.user.id, {
        $push: { studySets: savedStudySet._id }
      });

      await savedStudySet.populate('creator', 'firstName lastName avatar');

      console.log('📤 Sending response with studySet:', {
        id: savedStudySet._id,
        title: savedStudySet.title,
        cardCount: savedStudySet.cards.length
      });

      res.status(201).json({
        success: true,
        message: 'Tạo học phần thành công!',
        data: savedStudySet
      });

    } catch (error) {
      console.error('❌ Create study set error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo học phần',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  getStudySetById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const studySet = await StudySet.findById(id)
        .populate('creator', 'firstName lastName avatar');

      if (!studySet) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy học phần'
        });
      }

      console.log('👤 User ID:', req.user.id);
      console.log('📚 StudySet Creator ID:', studySet.creator._id.toString());
      console.log('🔒 Privacy:', studySet.privacy);


      if (studySet.privacy === 'private' && 
          studySet.creator._id.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập học phần này'
        });
      }

      res.json({
        success: true,
        data: studySet
      });

    } catch (error) {
      console.error('Get study set error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin học phần'
      });
    }
  },

  updateStudySet: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, cards, privacy, category, tags } = req.body;

      const studySet = await StudySet.findById(id);

      if (!studySet) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy học phần'
        });
      }

      if (studySet.creator.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền chỉnh sửa học phần này'
        });
      }

      if (title) studySet.title = title;
      if (description !== undefined) studySet.description = description;
      if (cards) {
        studySet.cards = cards.map((card, index) => ({
          ...card,
          order: index
        }));
      }
      if (privacy) studySet.privacy = privacy;
      if (category) studySet.category = category;
      if (tags) studySet.tags = tags;

      await studySet.save();
      await studySet.populate('creator', 'firstName lastName avatar');

      res.json({
        success: true,
        message: 'Cập nhật học phần thành công!',
        data: studySet
      });

    } catch (error) {
      console.error('Update study set error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật học phần'
      });
    }
  },

  deleteStudySet: async (req, res) => {
    try {
      const { id } = req.params;

      const studySet = await StudySet.findById(id);

      if (!studySet) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy học phần'
        });
      }

      if (studySet.creator.toString() !== req.user.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền xóa học phần này'
        });
      }

      await StudySet.findByIdAndDelete(id);

      await User.findByIdAndUpdate(req.user.id, {
        $pull: { studySets: id }
      });

      res.json({
        success: true,
        message: 'Xóa học phần thành công!'
      });

    } catch (error) {
      console.error('Delete study set error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa học phần'
      });
    }
  }
};

module.exports = studySetController;