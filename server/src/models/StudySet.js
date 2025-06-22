// server/src/models/StudySet.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  term: {
    type: String,
    required: [true, 'Thuật ngữ là bắt buộc'],
    trim: true,
    maxlength: [500, 'Thuật ngữ không được quá 500 ký tự']
  },
  definition: {
    type: String,
    required: [true, 'Định nghĩa là bắt buộc'],
    trim: true,
    maxlength: [2000, 'Định nghĩa không được quá 2000 ký tự']
  },
  image: {
    type: String, // URL to image
    default: null
  },
  audio: {
    type: String, // URL to audio file
    default: null
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const studySetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tiêu đề là bắt buộc'],
    trim: true,
    maxlength: [200, 'Tiêu đề không được quá 200 ký tự']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Mô tả không được quá 1000 ký tự'],
    default: ''
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cards: [cardSchema],
  privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  category: {
    type: String,
    enum: ['language', 'science', 'history', 'math', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  stats: {
    totalCards: {
      type: Number,
      default: 0
    },
    studyCount: {
      type: Number,
      default: 0
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for card count
studySetSchema.virtual('cardCount').get(function() {
  return this.cards ? this.cards.length : 0;
});

// Update totalCards before saving
studySetSchema.pre('save', function(next) {
  this.stats.totalCards = this.cards.length;
  next();
});

// Index for search
studySetSchema.index({ title: 'text', description: 'text' });
studySetSchema.index({ creator: 1, privacy: 1 });
studySetSchema.index({ createdAt: -1 });

module.exports = mongoose.model('StudySet', studySetSchema);