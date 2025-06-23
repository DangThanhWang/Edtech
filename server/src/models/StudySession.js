// server/src/models/StudySession.js
const mongoose = require('mongoose');

const cardResultSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  },
  result: {
    type: String,
    enum: ['correct', 'incorrect', 'skipped'],
    required: true
  },
  timeSpent: {
    type: Number, // seconds
    default: 0
  },
  attempts: {
    type: Number,
    default: 1
  },
  answeredAt: {
    type: Date,
    default: Date.now
  }
});

const studySessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studySet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudySet',
    required: true
  },
  sessionType: {
    type: String,
    enum: ['flashcard', 'test', 'match', 'write'],
    default: 'flashcard'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  currentCardIndex: {
    type: Number,
    default: 0
  },
  totalCards: {
    type: Number,
    required: true
  },
  cardsStudied: {
    type: Number,
    default: 0
  },
  cardResults: [cardResultSchema],
  settings: {
    showImages: {
      type: Boolean,
      default: true
    },
    playAudio: {
      type: Boolean,
      default: true
    },
    autoFlip: {
      type: Boolean,
      default: false
    },
    shuffleCards: {
      type: Boolean,
      default: false
    }
  },
  stats: {
    correctAnswers: {
      type: Number,
      default: 0
    },
    incorrectAnswers: {
      type: Number,
      default: 0
    },
    skippedAnswers: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number, // seconds
      default: 0
    },
    averageTimePerCard: {
      type: Number,
      default: 0
    }
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for completion percentage
studySessionSchema.virtual('completionPercentage').get(function() {
  if (this.totalCards === 0) return 0;
  return Math.round((this.cardsStudied / this.totalCards) * 100);
});

// Virtual for accuracy percentage
studySessionSchema.virtual('accuracyPercentage').get(function() {
  const totalAnswered = this.stats.correctAnswers + this.stats.incorrectAnswers;
  if (totalAnswered === 0) return 0;
  return Math.round((this.stats.correctAnswers / totalAnswered) * 100);
});

// Method to add card result
studySessionSchema.methods.addCardResult = function(cardResult) {
  this.cardResults.push(cardResult);
  this.cardsStudied = this.cardResults.length;
  
  // Update stats
  switch (cardResult.result) {
    case 'correct':
      this.stats.correctAnswers++;
      break;
    case 'incorrect':
      this.stats.incorrectAnswers++;
      break;
    case 'skipped':
      this.stats.skippedAnswers++;
      break;
  }
  
  this.stats.totalTimeSpent += cardResult.timeSpent;
  this.stats.averageTimePerCard = this.stats.totalTimeSpent / this.cardsStudied;
};

// Method to complete session
studySessionSchema.methods.completeSession = function() {
  this.status = 'completed';
  this.endTime = new Date();
  this.completedAt = new Date();
};

// Index for performance
studySessionSchema.index({ user: 1, createdAt: -1 });
studySessionSchema.index({ studySet: 1, user: 1 });
studySessionSchema.index({ status: 1 });

module.exports = mongoose.model('StudySession', studySessionSchema);