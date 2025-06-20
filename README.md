# 🎓 EnglishCards - Web App Concept & Complete Project Tree

## 🎯 **Web App Concept: "EnglishCards"**
**Tagline**: "Master English with Smart Flashcards - From Zero to Fluent"

**Target**: Học sinh, sinh viên, người đi làm muốn cải thiện tiếng Anh

---

## 🌟 **Core Features Overview**

### 🏠 **Homepage Features:**
- **Level Assessment Test**: Quick test xác định trình độ
- **Learning Path Suggestions**: IELTS, TOEIC, Business, Travel
- **Live Stats**: "2M+ words learned today"
- **Success Stories**: User testimonials với progress charts

### 🎯 **Main App Features:**
- **Smart Flashcards**: Spaced repetition algorithm
- **Multiple Study Modes**: Flashcard, Quiz, Match, Type, Listen
- **Progress Tracking**: Detailed analytics và achievements
- **Word Collections**: Pre-made sets (IELTS, TOEIC, Business, etc.)
- **Personal Dictionary**: Save words from articles, videos
- **Study Streaks**: Daily learning goals và motivation
- **Pronunciation Practice**: Speech recognition scoring
- **Community Features**: Share decks, compete với friends

---

## 📂 **Complete Project Tree**

```
englishcards/
├── client/                          # Frontend (React)
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   ├── sounds/                  # Audio files
│   │   │   ├── correct.mp3
│   │   │   ├── wrong.mp3
│   │   │   ├── card-flip.mp3
│   │   │   └── level-up.mp3
│   │   └── images/
│   │       ├── achievements/        # Badge images
│   │       ├── flags/              # Country flags
│   │       └── illustrations/       # Learning illustrations
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── CountdownTimer.jsx
│   │   │   │   └── AudioPlayer.jsx
│   │   │   │
│   │   │   ├── ui/                  # Basic UI components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   ├── Tooltip.jsx
│   │   │   │   ├── Switch.jsx
│   │   │   │   └── Slider.jsx
│   │   │   │
│   │   │   ├── auth/                # Authentication (existing)
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   ├── ResetPasswordForm.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── forms/               # Form components
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── FormError.jsx
│   │   │   │   ├── FormGroup.jsx
│   │   │   │   ├── ValidationMessage.jsx
│   │   │   │   └── FormWizard.jsx
│   │   │   │
│   │   │   ├── home/                # Homepage components
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── LevelTestSection.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   ├── PathsSection.jsx     # Learning paths
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   ├── StatsSection.jsx     # Live statistics
│   │   │   │   └── CTASection.jsx
│   │   │   │
│   │   │   ├── onboarding/          # NEW: User onboarding
│   │   │   │   ├── WelcomeStep.jsx
│   │   │   │   ├── LevelTestStep.jsx    # Placement test
│   │   │   │   ├── GoalSelectionStep.jsx # Learning goals
│   │   │   │   ├── InterestsStep.jsx    # Topics of interest
│   │   │   │   ├── ScheduleStep.jsx     # Study schedule
│   │   │   │   └── FirstDeckStep.jsx    # Create first deck
│   │   │   │
│   │   │   ├── dashboard/           # NEW: Main dashboard
│   │   │   │   ├── DashboardHome.jsx    # Overview
│   │   │   │   ├── TodayProgress.jsx    # Daily progress
│   │   │   │   ├── StreakCounter.jsx    # Learning streak
│   │   │   │   ├── QuickActions.jsx     # Quick study buttons
│   │   │   │   ├── RecentActivity.jsx   # Recent learning
│   │   │   │   ├── Achievements.jsx     # Badges earned
│   │   │   │   ├── StudyReminder.jsx    # Daily reminders
│   │   │   │   └── WeeklyGoals.jsx      # Weekly targets
│   │   │   │
│   │   │   ├── flashcards/          # NEW: Flashcard system
│   │   │   │   ├── FlashcardViewer.jsx  # Main study interface
│   │   │   │   ├── CardFront.jsx        # Word/question side
│   │   │   │   ├── CardBack.jsx         # Answer/definition side
│   │   │   │   ├── CardControls.jsx     # Navigation buttons
│   │   │   │   ├── DifficultyRating.jsx # Easy/Medium/Hard
│   │   │   │   ├── ProgressTracker.jsx  # Cards progress
│   │   │   │   ├── StudySession.jsx     # Session management
│   │   │   │   └── SessionResults.jsx   # End session summary
│   │   │   │
│   │   │   ├── study-modes/         # NEW: Different study modes
│   │   │   │   ├── ClassicMode.jsx      # Traditional flashcards
│   │   │   │   ├── QuizMode.jsx         # Multiple choice
│   │   │   │   ├── MatchMode.jsx        # Match word-definition
│   │   │   │   ├── TypeMode.jsx         # Type the word
│   │   │   │   ├── ListenMode.jsx       # Listen & repeat
│   │   │   │   ├── SpeedMode.jsx        # Fast recognition
│   │   │   │   └── ReviewMode.jsx       # Spaced repetition
│   │   │   │
│   │   │   ├── decks/               # NEW: Deck management
│   │   │   │   ├── DeckLibrary.jsx      # All decks view
│   │   │   │   ├── DeckCard.jsx         # Individual deck preview
│   │   │   │   ├── DeckDetails.jsx      # Deck information
│   │   │   │   ├── DeckEditor.jsx       # Create/edit decks
│   │   │   │   ├── CardEditor.jsx       # Add/edit cards
│   │   │   │   ├── BulkImport.jsx       # Import from CSV/Excel
│   │   │   │   ├── DeckSettings.jsx     # Deck configuration
│   │   │   │   └── SharedDecks.jsx      # Community decks
│   │   │   │
│   │   │   ├── vocabulary/          # NEW: Vocabulary features
│   │   │   │   ├── WordBrowser.jsx      # Browse all words
│   │   │   │   ├── WordDetails.jsx      # Word info popup
│   │   │   │   ├── WordLists.jsx        # Categorized lists
│   │   │   │   ├── PersonalDict.jsx     # User's saved words
│   │   │   │   ├── WordOfDay.jsx        # Daily word feature
│   │   │   │   ├── Etymology.jsx        # Word origins
│   │   │   │   └── Pronunciation.jsx    # Audio pronunciation
│   │   │   │
│   │   │   ├── learning-paths/      # NEW: Structured learning
│   │   │   │   ├── PathBrowser.jsx      # Available paths
│   │   │   │   ├── IELTSPath.jsx        # IELTS preparation
│   │   │   │   ├── TOEICPath.jsx        # TOEIC preparation
│   │   │   │   ├── BusinessPath.jsx     # Business English
│   │   │   │   ├── TravelPath.jsx       # Travel English
│   │   │   │   ├── AcademicPath.jsx     # Academic writing
│   │   │   │   └── ConversationPath.jsx # Daily conversation
│   │   │   │
│   │   │   ├── progress/            # NEW: Progress tracking
│   │   │   │   ├── ProgressDashboard.jsx # Main analytics
│   │   │   │   ├── LearningStats.jsx    # Detailed statistics
│   │   │   │   ├── PerformanceChart.jsx # Progress graphs
│   │   │   │   ├── StreakHistory.jsx    # Streak tracking
│   │   │   │   ├── WeakWords.jsx        # Difficult words
│   │   │   │   ├── MasteredWords.jsx    # Learned words
│   │   │   │   └── GoalsTracker.jsx     # Goal progress
│   │   │   │
│   │   │   ├── pronunciation/       # NEW: Speech features
│   │   │   │   ├── SpeechRecorder.jsx   # Record pronunciation
│   │   │   │   ├── SpeechAnalyzer.jsx   # AI speech analysis
│   │   │   │   ├── AccentTrainer.jsx    # Accent practice
│   │   │   │   ├── PhoneticDisplay.jsx  # IPA phonetics
│   │   │   │   └── SpeechComparison.jsx # Compare with native
│   │   │   │
│   │   │   ├── games/               # NEW: Gamification
│   │   │   │   ├── WordGameHub.jsx      # Game selection
│   │   │   │   ├── SpeedChallenge.jsx   # Timed challenges
│   │   │   │   ├── WordBattle.jsx       # PvP word duels
│   │   │   │   ├── MemoryGame.jsx       # Memory matching
│   │   │   │   ├── WordSnake.jsx        # Word formation game
│   │   │   │   └── DailyChallenge.jsx   # Daily challenges
│   │   │   │
│   │   │   ├── social/              # NEW: Community features
│   │   │   │   ├── Leaderboard.jsx      # Rankings
│   │   │   │   ├── StudyGroups.jsx      # Study groups
│   │   │   │   ├── Friends.jsx          # Friend system
│   │   │   │   ├── ShareDeck.jsx        # Share functionality
│   │   │   │   ├── Comments.jsx         # Deck comments
│   │   │   │   └── Achievements.jsx     # Public achievements
│   │   │   │
│   │   │   ├── tests/               # NEW: Assessment system
│   │   │   │   ├── LevelTest.jsx        # Placement test
│   │   │   │   ├── MockTest.jsx         # Practice exams
│   │   │   │   ├── QuickQuiz.jsx        # Short quizzes
│   │   │   │   ├── ProgressTest.jsx     # Progress assessment
│   │   │   │   └── CertificateTest.jsx  # Certification exams
│   │   │   │
│   │   │   ├── settings/            # User preferences
│   │   │   │   ├── ProfileSettings.jsx  # User profile
│   │   │   │   ├── StudySettings.jsx    # Learning preferences
│   │   │   │   ├── NotificationSettings.jsx # Notifications
│   │   │   │   ├── AudioSettings.jsx    # Sound preferences
│   │   │   │   ├── PrivacySettings.jsx  # Privacy controls
│   │   │   │   └── SubscriptionSettings.jsx # Premium settings
│   │   │   │
│   │   │   └── charts/              # Data visualization
│   │   │       ├── ProgressChart.jsx
│   │   │       ├── StreakChart.jsx
│   │   │       ├── AccuracyChart.jsx
│   │   │       ├── TimeChart.jsx
│   │   │       └── ComparisonChart.jsx
│   │   │
│   │   ├── pages/                   # Main pages
│   │   │   ├── HomePage.jsx         # Landing page
│   │   │   ├── LoginPage.jsx        # Authentication
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── OnboardingPage.jsx   # NEW: User onboarding
│   │   │   ├── DashboardPage.jsx    # NEW: Main dashboard
│   │   │   ├── StudyPage.jsx        # NEW: Study session
│   │   │   ├── DecksPage.jsx        # NEW: Deck management
│   │   │   ├── ProgressPage.jsx     # NEW: Analytics
│   │   │   ├── CommunityPage.jsx    # NEW: Social features
│   │   │   ├── GamesPage.jsx        # NEW: Learning games
│   │   │   ├── TestsPage.jsx        # NEW: Assessments
│   │   │   ├── ProfilePage.jsx      # User profile
│   │   │   ├── SettingsPage.jsx     # Settings
│   │   │   ├── PremiumPage.jsx      # NEW: Subscription
│   │   │   ├── HelpPage.jsx         # Help & tutorials
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── layouts/                 # Layout components
│   │   │   ├── MainLayout.jsx       # Main app layout
│   │   │   ├── AuthLayout.jsx       # Auth pages layout
│   │   │   ├── StudyLayout.jsx      # NEW: Study session layout
│   │   │   ├── DashboardLayout.jsx  # NEW: Dashboard layout
│   │   │   └── OnboardingLayout.jsx # NEW: Onboarding layout
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js           # Authentication
│   │   │   ├── useStudySession.js   # NEW: Study session state
│   │   │   ├── useSpacedRepetition.js # NEW: SR algorithm
│   │   │   ├── useProgress.js       # NEW: Progress tracking
│   │   │   ├── useSpeechRecognition.js # NEW: Speech API
│   │   │   ├── useAudioPlayer.js    # NEW: Audio controls
│   │   │   ├── useTimer.js          # NEW: Session timing
│   │   │   ├── useStreak.js         # NEW: Streak tracking
│   │   │   ├── useLocalStorage.js   # Local storage
│   │   │   ├── useDebounce.js       # Debouncing
│   │   │   └── useKeyboard.js       # NEW: Keyboard shortcuts
│   │   │
│   │   ├── context/                 # React Context
│   │   │   ├── AuthContext.js       # Authentication state
│   │   │   ├── StudyContext.js      # NEW: Study session state
│   │   │   ├── ProgressContext.js   # NEW: Progress tracking
│   │   │   ├── ThemeContext.js      # Theme management
│   │   │   ├── AudioContext.js      # NEW: Audio controls
│   │   │   └── NotificationContext.js # Notifications
│   │   │
│   │   ├── services/                # API services
│   │   │   ├── api.js               # Base API config
│   │   │   ├── authService.js       # Authentication
│   │   │   ├── deckService.js       # NEW: Deck management
│   │   │   ├── cardService.js       # NEW: Card operations
│   │   │   ├── studyService.js      # NEW: Study sessions
│   │   │   ├── progressService.js   # NEW: Progress tracking
│   │   │   ├── speechService.js     # NEW: Speech recognition
│   │   │   ├── gameService.js       # NEW: Game features
│   │   │   ├── socialService.js     # NEW: Social features
│   │   │   └── subscriptionService.js # NEW: Premium features
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── constants.js         # App constants
│   │   │   ├── helpers.js           # General helpers
│   │   │   ├── validation.js        # Form validation
│   │   │   ├── formatters.js        # Data formatting
│   │   │   ├── spacedRepetition.js  # NEW: SR algorithm
│   │   │   ├── audioUtils.js        # NEW: Audio utilities
│   │   │   ├── speechUtils.js       # NEW: Speech processing
│   │   │   ├── gameLogic.js         # NEW: Game mechanics
│   │   │   ├── levelCalculator.js   # NEW: Level progression
│   │   │   ├── streakCalculator.js  # NEW: Streak logic
│   │   │   └── exportUtils.js       # NEW: Data export
│   │   │
│   │   ├── lib/                     # Third-party configs
│   │   │   ├── axios.js
│   │   │   ├── router.js
│   │   │   ├── speechRecognition.js # NEW: Speech API config
│   │   │   └── audioContext.js      # NEW: Web Audio API
│   │   │
│   │   ├── assets/                  # Static assets
│   │   │   ├── images/
│   │   │   │   ├── logos/
│   │   │   │   ├── illustrations/
│   │   │   │   ├── flags/           # NEW: Country flags
│   │   │   │   ├── achievements/    # NEW: Badge icons
│   │   │   │   └── learning-paths/  # NEW: Path illustrations
│   │   │   ├── audio/               # NEW: Audio files
│   │   │   │   ├── pronunciations/  # Word pronunciations
│   │   │   │   ├── effects/         # Sound effects
│   │   │   │   └── background/      # Background music
│   │   │   ├── fonts/
│   │   │   └── icons/
│   │   │
│   │   ├── styles/                  # CSS/SCSS files
│   │   │   ├── globals.css          # Global styles
│   │   │   ├── variables.css        # CSS variables
│   │   │   ├── animations.css       # NEW: Card animations
│   │   │   ├── components/          # Component styles
│   │   │   │   ├── buttons.css
│   │   │   │   ├── cards.css        # NEW: Flashcard styles
│   │   │   │   ├── forms.css
│   │   │   │   ├── modals.css
│   │   │   │   ├── progress.css     # NEW: Progress bars
│   │   │   │   ├── games.css        # NEW: Game styles
│   │   │   │   └── charts.css       # NEW: Chart styles
│   │   │   ├── pages/               # Page styles
│   │   │   │   ├── home.css
│   │   │   │   ├── dashboard.css    # NEW: Dashboard styles
│   │   │   │   ├── study.css        # NEW: Study session styles
│   │   │   │   ├── onboarding.css   # NEW: Onboarding styles
│   │   │   │   └── games.css        # NEW: Games styles
│   │   │   └── themes/              # Theme files
│   │   │       ├── light.css
│   │   │       ├── dark.css
│   │   │       └── colorblind.css   # NEW: Accessibility
│   │   │
│   │   ├── data/                    # NEW: Static data files
│   │   │   ├── wordLists/           # Pre-made word lists
│   │   │   │   ├── ielts-bands.json
│   │   │   │   ├── toeic-levels.json
│   │   │   │   ├── business-english.json
│   │   │   │   ├── travel-english.json
│   │   │   │   └── common-words.json
│   │   │   ├── achievements.json    # Achievement definitions
│   │   │   ├── learning-paths.json  # Learning path configs
│   │   │   └── difficulty-levels.json # Difficulty settings
│   │   │
│   │   ├── App.jsx                  # Main App component
│   │   ├── App.css                  # App styles
│   │   ├── index.js                 # Entry point
│   │   └── setupTests.js            # Test setup
│   │
│   ├── package.json
│   └── package-lock.json
│
├── server/                          # Backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/             # Route handlers
│   │   │   ├── authController.js    # Authentication (existing)
│   │   │   ├── userController.js    # User management
│   │   │   ├── deckController.js    # NEW: Deck CRUD
│   │   │   ├── cardController.js    # NEW: Card CRUD
│   │   │   ├── studyController.js   # NEW: Study sessions
│   │   │   ├── progressController.js # NEW: Progress tracking
│   │   │   ├── gameController.js    # NEW: Game features
│   │   │   ├── socialController.js  # NEW: Social features
│   │   │   ├── testController.js    # NEW: Assessment system
│   │   │   ├── speechController.js  # NEW: Speech analysis
│   │   │   └── subscriptionController.js # NEW: Premium features
│   │   │
│   │   ├── models/                  # Database models
│   │   │   ├── User.js              # User model (existing + extended)
│   │   │   ├── Deck.js              # NEW: Flashcard deck
│   │   │   ├── Card.js              # NEW: Individual flashcard
│   │   │   ├── StudySession.js      # NEW: Study session data
│   │   │   ├── Progress.js          # NEW: Learning progress
│   │   │   ├── Achievement.js       # NEW: User achievements
│   │   │   ├── Streak.js            # NEW: Learning streaks
│   │   │   ├── Game.js              # NEW: Game sessions
│   │   │   ├── Review.js            # NEW: Spaced repetition
│   │   │   ├── Test.js              # NEW: Assessment results
│   │   │   ├── Subscription.js      # NEW: Premium subscriptions
│   │   │   ├── Community.js         # NEW: Social interactions
│   │   │   └── Analytics.js         # NEW: Usage analytics
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.js              # Authentication routes
│   │   │   ├── users.js             # User routes
│   │   │   ├── decks.js             # NEW: Deck routes
│   │   │   ├── cards.js             # NEW: Card routes
│   │   │   ├── study.js             # NEW: Study routes
│   │   │   ├── progress.js          # NEW: Progress routes
│   │   │   ├── games.js             # NEW: Game routes
│   │   │   ├── social.js            # NEW: Social routes
│   │   │   ├── tests.js             # NEW: Test routes
│   │   │   ├── speech.js            # NEW: Speech routes
│   │   │   ├── analytics.js         # NEW: Analytics routes
│   │   │   └── subscriptions.js     # NEW: Premium routes
│   │   │
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.js              # JWT authentication
│   │   │   ├── validation.js        # Request validation
│   │   │   ├── errorHandler.js      # Error handling
│   │   │   ├── rateLimiter.js       # Rate limiting
│   │   │   ├── premium.js           # NEW: Premium feature check
│   │   │   ├── analytics.js         # NEW: Usage tracking
│   │   │   └── fileUpload.js        # NEW: File upload handling
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── emailService.js      # Email service (existing)
│   │   │   ├── spacedRepetitionService.js # NEW: SR algorithm
│   │   │   ├── progressService.js   # NEW: Progress calculation
│   │   │   ├── achievementService.js # NEW: Achievement logic
│   │   │   ├── gameService.js       # NEW: Game logic
│   │   │   ├── speechService.js     # NEW: Speech processing
│   │   │   ├── analyticsService.js  # NEW: Data analytics
│   │   │   ├── recommendationService.js # NEW: AI recommendations
│   │   │   └── subscriptionService.js # NEW: Payment processing
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── database.js          # Database connection
│   │   │   ├── tokenGenerator.js    # JWT utilities
│   │   │   ├── emailTemplates.js    # Email templates
│   │   │   ├── validators.js        # Data validation
│   │   │   ├── helpers.js           # General helpers
│   │   │   ├── constants.js         # Server constants
│   │   │   ├── logger.js            # Logging utilities
│   │   │   ├── spacedRepetition.js  # NEW: SR algorithms
│   │   │   ├── levelCalculator.js   # NEW: Level progression
│   │   │   ├── speechProcessor.js   # NEW: Speech analysis
│   │   │   └── dataProcessor.js     # NEW: Data processing
│   │   │
│   │   ├── config/                  # Configuration files
│   │   │   ├── database.js          # Database config
│   │   │   ├── jwt.js               # JWT config
│   │   │   ├── email.js             # Email config
│   │   │   ├── speech.js            # NEW: Speech API config
│   │   │   ├── payment.js           # NEW: Payment config
│   │   │   ├── redis.js             # NEW: Redis config
│   │   │   └── environment.js       # Environment variables
│   │   │
│   │   ├── seeders/                 # Database seeders
│   │   │   ├── userSeeder.js
│   │   │   ├── deckSeeder.js        # NEW: Pre-made decks
│   │   │   ├── cardSeeder.js        # NEW: Sample cards
│   │   │   ├── achievementSeeder.js # NEW: Achievement definitions
│   │   │   └── pathSeeder.js        # NEW: Learning paths
│   │   │
│   │   ├── jobs/                    # NEW: Background jobs
│   │   │   ├── dailyReminders.js    # Daily study reminders
│   │   │   ├── progressCalculation.js # Progress updates
│   │   │   ├── streakUpdates.js     # Streak calculations
│   │   │   ├── achievementCheck.js  # Achievement unlocks
│   │   │   └── dataBackup.js        # Data backup jobs
│   │   │
│   │   └── app.js                   # Express app configuration
│   │
│   ├── uploads/                     # File uploads
│   │   ├── audio/                   # NEW: Audio pronunciations
│   │   ├── images/                  # Card images
│   │   ├── decks/                   # NEW: Deck imports
│   │   └── temp/                    # Temporary files
│   │
│   ├── logs/                        # Application logs
│   │   ├── error.log
│   │   ├── access.log
│   │   ├── study.log                # NEW: Study activity logs
│   │   └── analytics.log            # NEW: Analytics logs
│   │
│   ├── tests/                       # Backend tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── helpers/
│   │
│   ├── index.js                     # Server entry point
│   ├── package.json
│   └── package-lock.json
│
├── shared/                          # Shared utilities
│   ├── constants/
│   │   ├── studyModes.js
│   │   ├── cardTypes.js
│   │   ├── userRoles.js
│   │   ├── achievements.js          # NEW: Achievement definitions
│   │   ├── learningPaths.js         # NEW: Learning path constants
│   │   └── gameTypes.js             # NEW: Game type definitions
│   │
│   ├── validators/
│   │   ├── authValidation.js
│   │   ├── deckValidation.js        # NEW: Deck validation
│   │   ├── cardValidation.js        # NEW: Card validation
│   │   ├── studyValidation.js       # NEW: Study session validation
│   │   └── gameValidation.js        # NEW: Game validation
│   │
│   ├── types/
│   │   ├── user.js
│   │   ├── deck.js                  # NEW: Deck type definitions
│   │   ├── card.js                  # NEW: Card type definitions
│   │   ├── study.js                 # NEW: Study type definitions
│   │   └── game.js                  # NEW: Game type definitions
│   │
│   └── algorithms/                  # NEW: Shared algorithms
│       ├── spacedRepetition.js      # Spaced repetition logic
│       ├── levelProgression.js      # Level calculation
│       ├── difficultyAdjustment.js  # Dynamic difficulty
│       └── recommendationEngine.js  # Content recommendations
│
├── docs/                           # Project documentation
│   ├── API.md                      # API documentation
│   ├── SETUP.md                    # Setup instructions
│   ├── DEPLOYMENT.md               # Deployment guide
│   ├── FEATURES.md                 # Features documentation
│   ├── GAME_DESIGN.md              # NEW: Game mechanics
│   ├── LEARNING_ALGORITHM.md       # NEW: Learning algorithms
│   └── USER_GUIDE.md               # NEW: User manual
│
├── scripts/                        # Build and deployment scripts
│   ├── build.sh                    # Build script
│   ├── deploy.sh                   # Deployment script
│   ├── seed.js                     # Database seeding
│   ├── backup.sh                   # Database backup
│   ├── generateDecks.js            # NEW: Generate sample decks
│   └── migrateData.js              # NEW: Data migration
│
├── .env.example                    # Environment variables template
├── .env.local.example              # Local environment template
├── .gitignore                      # Git ignore rules
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── docker-compose.yml              # Docker configuration
├── Dockerfile                      # Docker image definition
├── package.json                    # Root package.json
├── README.md                       # Project README
└── CHANGELOG.md                    # Project changelog
```

---

## 🎯 **Key New Features to Build**

### 🃏 **1. Smart Flashcard System:**
- **Spaced Repetition Algorithm**: Scientific learning intervals
- **Difficulty Auto-adjustment**: Based on user performance
- **Visual Learning**: Images, GIFs for better memory
- **Audio Pronunciation**: Native speaker recordings
- **Progress Tracking**: Detailed learning analytics

### 🎮 **2. Gamification Elements:**
- **Study Streaks**: Daily learning motivation
- **Achievement Badges**: Unlock rewards for milestones
- **Leaderboards**: Compete with friends
- **Daily Challenges**: Fresh content every day
- **Level Progression**: RPG-style advancement

### 📚 **3. Pre-made Content Library:**
- **IELTS Vocabulary**: Band 6-9 essential words
- **TOEIC Preparation**: Business English focus
- **Travel English**: Practical travel phrases
- **Academic Writing**: University-level vocabulary
- **Business Communication**: Professional language

### 🗣️ **4. Pronunciation Features:**
- **Speech Recognition**: AI-powered pronunciation scoring
- **Accent Training**: American vs British pronunciation
- **Phonetic Display**: IPA symbols for accurate learning
- **Record & Compare**: User voice vs native speaker

### 📊 **5. Progress Analytics:**
- **Learning Curves**: Visual progress tracking
- **Weakness Detection**: Identify difficult words/topics
- **Time Optimization**: Best study times for user
- **Goal Setting**: IELTS/TOEIC score targets

### 👥 **6. Social Learning:**
- **Study Groups**: Collaborative learning
- **Deck Sharing**: Community-created content
- **Friend Challenges**: Competitive learning
- **Discussion Forums**: Q&A and tips

---

## 🚀 **Development Phases**

### **Phase 1 - Core Foundation** (4-6 weeks):
- [x] Authentication system (already done)
- [ ] Basic flashcard viewer
- [ ] Deck management (CRUD)
- [ ] Simple spaced repetition
- [ ] User dashboard

### **Phase 2 - Enhanced Learning** (4-6 weeks):
- [ ] Multiple study modes
- [ ] Progress tracking & analytics
- [ ] Achievement system
- [ ] Audio pronunciation
- [ ] Pre-made deck library

### **Phase 3 - Social & Gamification** (4-6 weeks):
- [ ] Study streaks & motivation
- [ ] Social features & sharing
- [ ] Learning games
- [ ] Community decks
- [ ] Mobile responsive optimization

### **Phase 4 - Advanced Features** (4-6 weeks):
- [ ] Speech recognition
- [ ] AI recommendations
- [ ] Advanced analytics
- [ ] Premium subscription
- [ ] Learning path system

---

## 💡 **Technical Highlights**

### **Frontend Technologies:**
- **React 18**: Latest features với Suspense
- **React Router v6**: Client-side routing
- **Context API**: State management
- **Web Speech API**: Browser speech recognition
- **Web Audio API**: Audio playback control
- **LocalStorage**: Offline capability
- **Service Workers**: PWA features

### **Backend Technologies:**
- **Node.js + Express**: RESTful API
- **MongoDB**: Flexible document database
- **JWT**: Secure authentication
- **Bull Queue**: Background job processing
- **Redis**: Caching và session storage
- **Nodemailer**: Email notifications
- **Multer**: File upload handling

### **Key Algorithms:**
- **Spaced Repetition**: SM-2 algorithm for optimal review timing
- **Difficulty Adjustment**: Dynamic content difficulty based on performance
- **Progress Calculation**: XP và level progression system
- **Recommendation Engine**: AI-powered content suggestions

---

## 🎯 **Success Metrics**

### **User Engagement:**
- Daily active users (DAU)
- Average session duration
- Cards studied per session
- Streak completion rate

### **Learning Effectiveness:**
- Word retention rate (30/90 days)
- Level progression speed
- Test score improvements
- Goal achievement rate

### **Business Metrics:**
- User acquisition cost
- Premium conversion rate
- Monthly recurring revenue
- User lifetime value

**🎓 This comprehensive web app will be the ultimate English learning platform with flashcards at its core!**