// Core Application Logic for Tu Tuong Ho Chi Minh Multiple Choice Quiz App
// Relies on data.js for questions database

const MEME_RESOURCES = {
  file1: [
    './final/file 1/f1 (2).jpg',
    './final/file 1/f1 (3).jpg',
    './final/file 1/f1 (4).jpg',
    './final/file 1/f1 (5).jpg',
    './final/file 1/f1 (6).jpg',
    './final/file 1/f1.jpg'
  ],
  file2: [
    './final/file 2/f2 (2).jpg',
    './final/file 2/f2 (3).jpg',
    './final/file 2/f2 (4).jpg',
    './final/file 2/f2 (5).jpg',
    './final/file 2/f2 (6).jpg',
    './final/file 2/f2 (7).jpg',
    './final/file 2/f2 (8).jpg',
    './final/file 2/f2 (9).jpg',
    './final/file 2/f2 (10).jpg',
    './final/file 2/f2.jpg'
  ],
  file3: [
    './final/file 3/f3 (2).jpg',
    './final/file 3/f3 (3).jpg',
    './final/file 3/f3 (4).jpg',
    './final/file 3/f3 (5).jpg',
    './final/file 3/f3.jpg'
  ],
  file4: [
    './final/file 4/f4 (2).jpg',
    './final/file 4/f4 (3).jpg',
    './final/file 4/f4 (4).jpg',
    './final/file 4/f4 (5).jpg',
    './final/file 4/f4.jpg'
  ],
  file5: [
    './final/file 5/f5 (2).jpg',
    './final/file 5/f5 (3).jpg',
    './final/file 5/f5 (4).jpg',
    './final/file 5/f5 (5).jpg',
    './final/file 5/f5.jpg'
  ],
  file6: [
    './final/file 6/f6 (2).jpg',
    './final/file 6/f6 (3).jpg',
    './final/file 6/f6 (4).jpg',
    './final/file 6/f6 (5).jpg',
    './final/file 6/f6 (6).jpg',
    './final/file 6/f6 (7).jpg',
    './final/file 6/f6 (8).jpg',
    './final/file 6/f6.jpg'
  ],
  videos: [
    './final/video/1.mp4',
    './final/video/2.mp4',
    './final/video/3.mp4',
    './final/video/4.mp4',
    './final/video/5.mp4',
    './final/video/6.mp4',
    './final/video/7.mp4',
    './final/video/8.mp4'
  ]
};

const MASCOT_QUOTES = [
  'Đoàn kết, đoàn kết, đại đoàn kết! Không chịu ôn thi thì lấy đâu ra điểm A sen ơi!',
  'Học Tư tưởng Hồ Chí Minh để thành sinh viên gương mẫu, mai sau cống hiến cho đất nước!',
  'Đoàn kết là sức mạnh, nhưng vào phòng thi là phải tự lực cánh sinh đó nha!',
  'Mẫu số chung là yêu nước, còn mẫu số của sen là qua môn điểm cao!',
  'Lợi ích cá nhân là ngủ nướng, lợi ích tập thể là qua môn. Nhớ kết hợp hài hòa nha sen!',
  'Trẫm giao nhiệm vụ: Đánh trúng 20/20 câu mới được thưởng pate!',
  'Khác biệt ➔ Tôn trọng ➔ Tìm điểm chung ➔ Đồng thuận ➔ Hợp tác ➔ Điểm A!',
  'Hiệp thương dân chủ nha sen, bàn bạc công khai, học kỹ từng câu chớ có học tủ!',
  'Hạt nhân của đại đoàn kết là sự thống nhất trong Đảng, hạt nhân qua môn là sự chăm chỉ!',
  'Kế thừa kinh nghiệm thế hệ đi trước, phát huy sức sáng tạo của sinh viên Gen Z nào!'
];

// Sound Synthesizer with Web Audio API (Zero external assets needed)
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Cheerful chime arpeggio: C5 -> E5 -> G5 -> C6
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.36);
      });
    } catch (e) {
      console.warn("Sound error:", e);
    }
  }

  playWrong() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft low tone buzz
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {
      console.warn("Sound error:", e);
    }
  }

  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // Ignore click error
    }
  }
}

class QuizApp {
  constructor() {
    this.currentChapter = null;
    this.questions = [];
    this.currentIndex = 0;
    this.score = { correct: 0, total: 0 };
    this.userAnswers = []; // History for review modal
    this.isAnswered = false;
    this.streakDung = 0;
    this.streakSai = 0;
    this.theme = localStorage.getItem('tthcm_theme') || 'light';
    this.visualTheme = localStorage.getItem('tthcm_visual_theme') || 'default';
    this._memeGeneration = 0; // Guards against stale image callbacks
    this._lastEnterTime = 0;
    this.sound = new SoundManager();

    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);
    // Apply saved visual theme on startup (default = no data-visual attr)
    if (this.visualTheme === 'heritage') {
      document.documentElement.setAttribute('data-visual', 'heritage');
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.cacheDom();
      this.bindEvents();
      this.renderDashboard();
      this.updateThemeToggleUI();
      this.updateVisualSwitcherUI();
      this.preloadAllMemeImages();
      this.checkFullscreenMode();
      // Default screen state: dashboard/home
      document.body.classList.add('screen-home');

      // Check query params for dev/test mode
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === 'test_results') {
        this.setVisualTheme('heritage');
        document.body.classList.add('presentation-mode');
        this.startQuiz(1);
        this.showResults();
      }
    });
  }

  preloadAllMemeImages() {
    const allLists = [
      ...MEME_RESOURCES.file1,
      ...MEME_RESOURCES.file2,
      ...MEME_RESOURCES.file3,
      ...MEME_RESOURCES.file4,
      ...MEME_RESOURCES.file5,
      ...MEME_RESOURCES.file6
    ];
    allLists.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  updateUserRank() {
    let totalProgress = 0;
    chaptersData.forEach(ch => {
      const progress = parseInt(localStorage.getItem(`tthcm_progress_ch_${ch.id}`)) || parseInt(localStorage.getItem('tthcm_progress_ch_3')) || 0;
      totalProgress += progress;
    });

    const averageProgress = Math.round(totalProgress / chaptersData.length);
    let rankName = '';
    let rankIcon = '';

    if (averageProgress >= 0 && averageProgress <= 25) {
      rankName = 'Mèo học việc';
      rankIcon = '🐾';
    } else if (averageProgress >= 26 && averageProgress <= 60) {
      rankName = 'Đoàn viên gương mẫu';
      rankIcon = '🎖️';
    } else if (averageProgress >= 61 && averageProgress <= 85) {
      rankName = 'Cán bộ nguồn Mèo';
      rankIcon = '🚩';
    } else {
      rankName = 'Thủ khoa Tư Tưởng Mèo';
      rankIcon = '⭐';
    }

    const rankTag = document.getElementById('user-rank');
    if (rankTag) {
      rankTag.innerHTML = `<span class="mr-1">${rankIcon}</span> <span>${rankName}</span> <span class="ml-1 text-[10px] opacity-75">(${averageProgress}%)</span>`;
    }
  }

  showMascotGreeting() {
    const speechSpan = document.getElementById('mascot-speech');
    if (speechSpan) {
      const randomIndex = Math.floor(Math.random() * MASCOT_QUOTES.length);
      speechSpan.textContent = MASCOT_QUOTES[randomIndex];
    }
  }

  cacheDom() {
    this.dashboardView = document.getElementById('dashboard-view');
    this.quizView = document.getElementById('quiz-view');
    this.chapterGrid = document.getElementById('chapter-grid');

    // Quiz View Elements
    this.chapterTitleHeader = document.getElementById('quiz-chapter-title');
    this.backBtn = document.getElementById('btn-back');
    this.progressText = document.getElementById('quiz-progress-text');
    this.progressBarFill = document.getElementById('quiz-progress-fill');

    // Question Card Elements
    this.questionCard = document.getElementById('question-card');
    this.questionBadge = document.getElementById('question-badge');
    this.questionText = document.getElementById('question-text');
    this.optionsContainer = document.getElementById('options-container');
    this.quizFeedback = document.getElementById('quiz-feedback');
    this.feedbackHeader = document.getElementById('feedback-header');
    this.quizExplanationText = document.getElementById('quiz-explanation-text');
    this.btnNextQuestion = document.getElementById('btn-next-question');

    // Theme Toggle
    this.themeToggle = document.getElementById('theme-toggle');

    // Results
    this.resultsCard = document.getElementById('results-card');
    this.resultsPercentage = document.getElementById('results-percentage');
    this.resultsScore = document.getElementById('results-score');
    this.btnRestart = document.getElementById('btn-restart');
    this.btnReviewAnswers = document.getElementById('btn-review-answers');
    this.reviewContainer = document.getElementById('review-container');
    this.reviewList = document.getElementById('review-list');
    this.btnCloseReview = document.getElementById('btn-close-review');

    // Meme Card Elements
    this.memeCard = document.getElementById('quiz-meme-card');
    this.memeImage = document.getElementById('meme-image');
    this.memeStreakBadge = document.getElementById('meme-streak-badge');
    this.memeMessage = document.getElementById('meme-message');
    this.memeNextBtn = document.getElementById('btn-meme-next');

    // Video End Card Elements
    this.videoPlayer = document.getElementById('end-video-player');

    // Heritage Inline Feedback Strip Elements
    this.heritageFeedbackStrip = document.getElementById('heritage-feedback-strip');
    this.heritageMemeImg = document.getElementById('heritage-meme-img');
    this.heritageStripStatus = document.getElementById('heritage-strip-status');
    this.heritageStripStreak = document.getElementById('heritage-strip-streak');
    this.heritageStripMessage = document.getElementById('heritage-strip-message');
    this.heritageStripExpText = document.getElementById('heritage-strip-exp-text');
    this.btnHeritageNext = document.getElementById('btn-heritage-next');
  }

  bindEvents() {
    this.backBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.showDashboard();
    });

    this.btnNextQuestion.addEventListener('click', () => {
      this.sound.playClick();
      this.nextQuestion();
    });

    this.memeNextBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.nextQuestion();
    });

    if (this.btnHeritageNext) {
      this.btnHeritageNext.addEventListener('click', () => {
        this.sound.playClick();
        this.nextQuestion();
      });
    }

    this.btnRestart.addEventListener('click', () => {
      this.sound.playClick();
      this.startQuiz(this.currentChapter.id);
    });

    this.btnReviewAnswers.addEventListener('click', () => {
      this.sound.playClick();
      this.toggleReviewAnswers();
    });

    this.btnCloseReview.addEventListener('click', () => {
      this.sound.playClick();
      this.reviewContainer.classList.add('hidden');
    });

    this.themeToggle.addEventListener('click', () => {
      this.sound.playClick();
      this.toggleTheme();
    });

    // Visual Switcher toggle
    const vsSwitcherBtn = document.getElementById('visual-switcher-btn');
    const vsDropdown = document.getElementById('visual-switcher-dropdown');
    if (vsSwitcherBtn && vsDropdown) {
      vsSwitcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.playClick();
        vsDropdown.classList.toggle('open');
      });
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!document.getElementById('visual-switcher').contains(e.target)) {
          vsDropdown.classList.remove('open');
        }
      });
    }

    // Keyboard navigation: 1-4, A-D for options; Enter/Space for next
    document.addEventListener('keydown', (e) => {
      if (this.quizView.classList.contains('hidden')) return;

      const key = e.key.toUpperCase();

      // Enter or Space key to advance to next question if answered
      if (e.key === 'Enter' || e.key === ' ') {
        if (this.isAnswered && !this.questionCard.classList.contains('hidden')) {
          e.preventDefault();
          const now = Date.now();
          if (now - this._lastEnterTime < 350) return;
          this._lastEnterTime = now;
          this.nextQuestion();
          return;
        }
      }

      // 1, 2, 3, 4 or A, B, C, D to select options
      if (!this.isAnswered && !this.questionCard.classList.contains('hidden')) {
        let selectedKey = null;
        if (key === '1' || key === 'A') selectedKey = 'A';
        else if (key === '2' || key === 'B') selectedKey = 'B';
        else if (key === '3' || key === 'C') selectedKey = 'C';
        else if (key === '4' || key === 'D') selectedKey = 'D';

        if (selectedKey) {
          e.preventDefault();
          this.selectOption(selectedKey);
        }
      }
    });

    // Fullscreen / F11 Presentation Mode Detection
    window.addEventListener('resize', () => this.checkFullscreenMode());
    document.addEventListener('fullscreenchange', () => this.checkFullscreenMode());
    document.addEventListener('webkitfullscreenchange', () => this.checkFullscreenMode());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F11') {
        setTimeout(() => this.checkFullscreenMode(), 120);
        setTimeout(() => this.checkFullscreenMode(), 350);
      }
    });
  }

  checkFullscreenMode() {
    // 1. Standard Fullscreen API
    const isFullscreenApi = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    // 2. CSS Media Display Mode Fullscreen
    const isMediaFullscreen = !!(window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches);

    // 3. Screen size match check:
    // F11 fullscreen matches screen.width and screen.height within 4px tolerance
    // A regular maximized window has titlebar + tabs + taskbar, so height difference is >= 60px
    const widthDiff = Math.abs(window.innerWidth - screen.width);
    const heightDiff = Math.abs(window.innerHeight - screen.height);
    const isScreenSizeMatch = widthDiff <= 4 && heightDiff <= 4;

    const isFullscreen = isFullscreenApi || isMediaFullscreen || isScreenSizeMatch;

    if (isFullscreen) {
      document.body.classList.add('presentation-mode');
    } else {
      document.body.classList.remove('presentation-mode');
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('tthcm_theme', this.theme);
    this.updateThemeToggleUI();
  }

  updateThemeToggleUI() {
    if (!this.themeToggle) return;
    if (this.theme === 'dark') {
      this.themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828-9.9a5 5 0 117.07 7.07l-2.828-2.828z" />
        </svg>
      `;
    } else {
      this.themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  }

  // ---- Visual Theme Management ----

  setVisualTheme(themeName) {
    this.sound.playClick();
    this.visualTheme = themeName;
    localStorage.setItem('tthcm_visual_theme', themeName);

    if (themeName === 'heritage') {
      document.documentElement.setAttribute('data-visual', 'heritage');
    } else {
      document.documentElement.removeAttribute('data-visual');
    }

    this.updateVisualSwitcherUI();

    // Close the dropdown after selection
    const vsDropdown = document.getElementById('visual-switcher-dropdown');
    if (vsDropdown) vsDropdown.classList.remove('open');
  }

  updateVisualSwitcherUI() {
    const themes = ['default', 'heritage'];
    themes.forEach(t => {
      const option = document.getElementById(`vs-option-${t}`);
      const check = document.getElementById(`vs-check-${t}`);
      if (!option || !check) return;

      if (this.visualTheme === t) {
        option.classList.add('active');
        check.style.display = 'block';
      } else {
        option.classList.remove('active');
        check.style.display = 'none';
      }
    });
  }

  renderDashboard() {
    this.updateUserRank();
    this.showMascotGreeting();
    this.chapterGrid.innerHTML = '';

    const icons = {
      theory: `<svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
      practice: `<svg class="w-8 h-8 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
      exam: `<svg class="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 0 013.138 3.138 3.42 0 00.806 1.946 3.42 0 010 4.438 3.42 0 00-.806 1.946 3.42 0 01-3.138 3.138 3.42 0 00-1.946.806 3.42 0 01-4.438 0 3.42 0 00-1.946-.806 3.42 0 01-3.138-3.138 3.42 0 00-.806-1.946 3.42 0 010-4.438 3.42 0 00.806-1.946 3.42 0 013.138-3.138z" /></svg>`
    };

    chaptersData.forEach((chapter) => {
      const savedProgress = localStorage.getItem(`tthcm_progress_ch_${chapter.id}`) || localStorage.getItem('tthcm_progress_ch_3') || 0;

      const card = document.createElement('div');
      card.className = 'card-chapter bg-[var(--bg-card)] rounded-2xl p-6 flex flex-col justify-between cursor-pointer';
      card.setAttribute('role', 'button');
      card.setAttribute('id', `chapter-card-${chapter.id}`);
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl">
              ${icons[chapter.iconType] || icons.theory}
            </div>
            <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">${chapter.questions.length} CÂU HỎI</span>
          </div>
          <h3 class="text-lg font-bold mb-2 line-clamp-2 text-[var(--text-main)] transition-colors hover:text-[var(--accent)]">
            ${chapter.title}
          </h3>
          <p class="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
            ${chapter.subtitle}
          </p>
        </div>
        <div>
          <div class="flex justify-between items-center mb-1.5 text-xs">
            <span class="text-[var(--text-muted)] font-medium">Tiến độ tốt nhất</span>
            <span class="font-bold text-[var(--accent)]">${savedProgress}%</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 progress-container-cat">
            <div class="bg-[var(--accent)] h-2 rounded-full transition-all duration-500 relative progress-bar-cat" style="width: ${savedProgress}%">
              <span class="cat-head-icon">🐱</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.sound.playClick();
        this.startQuiz(chapter.id);
      });
      this.chapterGrid.appendChild(card);
    });
  }

  showDashboard() {
    this.currentChapter = null;
    this.quizView.classList.add('hidden');
    this.dashboardView.classList.remove('hidden');
    // Screen state classes for CSS scoping (Heritage theme background)
    document.body.classList.add('screen-home');
    document.body.classList.remove('screen-quiz');
    document.body.classList.remove('screen-results');
    this.renderDashboard();
  }

  startQuiz(chapterId) {
    this.currentChapter = chaptersData.find(c => c.id === chapterId);
    if (!this.currentChapter) return;

    this.streakDung = 0;
    this.streakSai = 0;
    this.userAnswers = [];
    this.hideMeme();

    this.dashboardView.classList.add('hidden');
    this.quizView.classList.remove('hidden');
    this.resultsCard.classList.add('hidden');
    this.questionCard.classList.remove('hidden');
    this.reviewContainer.classList.add('hidden');
    // Screen state classes for CSS scoping (Heritage theme background)
    document.body.classList.remove('screen-home');
    document.body.classList.add('screen-quiz');
    document.body.classList.remove('screen-results');

    this.chapterTitleHeader.textContent = this.currentChapter.title;

    // Copy questions list
    this.questions = [...this.currentChapter.questions];
    this.currentIndex = 0;
    this.score = { correct: 0, total: this.questions.length };

    this.loadQuestion();
  }

  loadQuestion() {
    this.isAnswered = false;
    this.updateProgress();

    if (this.currentIndex >= this.questions.length) {
      this.showResults();
      return;
    }

    const currentQ = this.questions[this.currentIndex];

    // Clean animations
    this.questionCard.classList.remove('animate-success-glow', 'animate-shake');
    this.quizFeedback.classList.add('hidden');
    this.btnNextQuestion.classList.add('hidden');
    if (this.heritageFeedbackStrip) {
      this.heritageFeedbackStrip.classList.add('hidden');
    }
    if (this.heritageMemeImg) {
      this.heritageMemeImg.removeAttribute('src');
    }
    if (this.quizView) {
      this.quizView.classList.remove('has-feedback');
    }

    // Render question
    this.questionBadge.textContent = `Câu ${this.currentIndex + 1} / ${this.questions.length}`;
    this.questionText.textContent = currentQ.question;

    // Render options
    this.optionsContainer.innerHTML = '';
    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn group';
      btn.setAttribute('data-key', opt.key);

      btn.innerHTML = `
        <span class="option-badge">${opt.key}</span>
        <span class="flex-1 text-[var(--text-main)] group-hover:text-[var(--accent)] font-medium leading-relaxed">${opt.text}</span>
      `;

      btn.addEventListener('click', () => {
        if (!this.isAnswered) {
          this.selectOption(opt.key);
        }
      });

      this.optionsContainer.appendChild(btn);
    });
  }

  updateProgress() {
    const total = this.questions.length;
    const current = Math.min(this.currentIndex + 1, total);

    this.progressText.textContent = `Câu hỏi ${current} / ${total}`;
    const percentage = ((current - 1) / total) * 100;
    this.progressBarFill.style.width = `${percentage}%`;
  }

  selectOption(selectedKey) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedKey === currentQ.correct;

    // Record user answer for review
    this.userAnswers.push({
      question: currentQ,
      selectedKey: selectedKey,
      isCorrect: isCorrect
    });

    // Disable all option buttons and apply visual state
    const optionButtons = this.optionsContainer.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
      btn.disabled = true;
      const key = btn.getAttribute('data-key');

      if (key === selectedKey) {
        if (isCorrect) {
          btn.classList.add('selected-correct');
        } else {
          btn.classList.add('selected-wrong');
        }
      }

      // Reveal correct option if user selected wrong
      if (!isCorrect && key === currentQ.correct) {
        btn.classList.add('reveal-correct');
      }
    });

    // Update Score & Streaks
    if (isCorrect) {
      this.score.correct++;
      this.streakDung++;
      this.streakSai = 0;
      this.sound.playCorrect();
      this.questionCard.classList.add('animate-success-glow');

      this.feedbackHeader.className = 'flex items-center space-x-2 font-bold text-base mb-2 text-[var(--success)]';
      this.feedbackHeader.innerHTML = `
        <svg class="w-5 h-5 text-[var(--success)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Chính xác! (Chuỗi đúng: ${this.streakDung} 🔥)</span>
      `;
    } else {
      this.streakSai++;
      this.streakDung = 0;
      this.sound.playWrong();
      this.questionCard.classList.add('animate-shake');

      this.feedbackHeader.className = 'flex items-center space-x-2 font-bold text-base mb-2 text-[var(--error)]';
      this.feedbackHeader.innerHTML = `
        <svg class="w-5 h-5 text-[var(--error)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Chưa chính xác! (Đáp án đúng là: ${currentQ.correct})</span>
      `;
    }

    // Display Explanation
    this.quizExplanationText.textContent = currentQ.explanation;
    this.quizFeedback.classList.remove('hidden');
    this.btnNextQuestion.classList.remove('hidden');

    // Trigger Meme Popup
    const memeUrl = this.getMemeImage(isCorrect);
    this.showMeme(memeUrl, isCorrect);

    // The inline result strip belongs exclusively to the Heritage theme.
    // Keeping it hidden in the default theme prevents the wide three-column
    // strip from being squeezed inside the quiz card in F11 mode.
    if (this.visualTheme === 'heritage' && this.heritageFeedbackStrip) {
      if (isCorrect) {
        this.heritageStripStatus.innerHTML = `<span class="heritage-status-icon">✓</span> Chính xác!`;
        this.heritageStripStatus.className = "heritage-strip-status is-correct";
        this.heritageStripStreak.textContent = `Streak: ${this.streakDung} 🔥`;
        this.heritageStripStreak.className = "heritage-strip-streak is-correct";

        const positiveMessages = [
          "Quá xuất sắc! Đúng chuẩn sinh viên gương mẫu! 🚀",
          "Tuyệt vời ông mặt trời! Giữ vững chuỗi đúng nhé! ☀️",
          "Bác Hồ khen sen giỏi tư tưởng! 🤓",
          "Không thể cản bước! 10 điểm trong tầm tay! 💪"
        ];
        this.heritageStripMessage.textContent = positiveMessages[Math.min(this.streakDung - 1, positiveMessages.length - 1)];
      } else {
        this.heritageStripStatus.innerHTML = `<span class="heritage-status-icon">✕</span> Chưa chính xác`;
        this.heritageStripStatus.className = "heritage-strip-status is-wrong";
        this.heritageStripStreak.textContent = `Streak: ${this.streakSai}`;
        this.heritageStripStreak.className = "heritage-strip-streak is-wrong";

        const negativeMessages = [
          "Đừng nản chí sen ơi, xem giải thích rồi gỡ lại nào! 💪",
          "Sai một ly đi một dặm, câu sau cố lên nha! ❤️",
          "Mèo con rớt nước mắt rồi, tập trung ôn bài nào! 😿",
          "Đọc kỹ lại câu hỏi ở câu tiếp theo nhé! 🧠"
        ];
        this.heritageStripMessage.textContent = negativeMessages[Math.min(this.streakSai - 1, negativeMessages.length - 1)];
      }

      if (this.heritageStripExpText) {
        this.heritageStripExpText.textContent = currentQ.explanation;
      }
      if (this.heritageMemeImg && memeUrl) {
        this.heritageMemeImg.src = memeUrl;
      }

      this.heritageFeedbackStrip.classList.remove('hidden');

      if (this.quizView) {
        this.quizView.classList.add('has-feedback');
      }

      // Smooth subtle scroll to ensure strip is visible without hiding question
      setTimeout(() => {
        if (this.heritageFeedbackStrip && !this.heritageFeedbackStrip.classList.contains('hidden')) {
          this.heritageFeedbackStrip.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 60);
    }
  }

  nextQuestion() {
    this.hideMeme();
    this.currentIndex++;
    this.loadQuestion();
  }

  showResults() {
    this.hideMeme();
    document.body.classList.add('screen-results');
    this.questionCard.classList.add('hidden');
    this.resultsCard.classList.remove('hidden');

    const totalCount = this.questions.length;
    const percentage = Math.round((this.score.correct / totalCount) * 100);

    this.resultsPercentage.textContent = `${percentage}%`;
    this.resultsScore.textContent = `Bạn đã trả lời đúng ${this.score.correct} / ${totalCount} câu hỏi trắc nghiệm.`;

    // Save best score to LocalStorage
    const previousBest = parseInt(localStorage.getItem(`tthcm_progress_ch_${this.currentChapter.id}`)) || 0;
    if (percentage > previousBest) {
      localStorage.setItem(`tthcm_progress_ch_${this.currentChapter.id}`, percentage);
    }

    this.updateUserRank();

    // Update progress bar to 100% complete
    if (this.progressBarFill) {
      this.progressBarFill.style.width = '100%';
    }

    // Play random celebration video
    const videos = MEME_RESOURCES.videos;
    if (videos.length > 0) {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      this.videoPlayer.onloadedmetadata = () => {
        if (this.videoPlayer.videoWidth && this.videoPlayer.videoHeight) {
          this.videoPlayer.style.aspectRatio = `${this.videoPlayer.videoWidth} / ${this.videoPlayer.videoHeight}`;
        }
      };
      this.videoPlayer.src = randomVideo;
      this.videoPlayer.load();
      this.videoPlayer.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }

    // Confetti celebration
    this.triggerConfetti();
  }

  toggleReviewAnswers() {
    if (!this.reviewContainer.classList.contains('hidden')) {
      this.reviewContainer.classList.add('hidden');
      return;
    }

    this.reviewList.innerHTML = '';
    this.userAnswers.forEach((ans, idx) => {
      const item = document.createElement('div');
      item.className = `p-4 rounded-xl border ${ans.isCorrect ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20'}`;

      const statusBadge = ans.isCorrect
        ? `<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">Đúng</span>`
        : `<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300">Sai</span>`;

      item.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-extrabold text-[var(--text-muted)]">CÂU ${idx + 1}</span>
          ${statusBadge}
        </div>
        <p class="font-bold text-sm text-[var(--text-main)] mb-3">${ans.question.question}</p>
        <div class="text-xs space-y-1 text-[var(--text-muted)] mb-3">
          <p>Lựa chọn của bạn: <strong class="${ans.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${ans.selectedKey}</strong></p>
          <p>Đáp án chính xác: <strong class="text-emerald-600 dark:text-emerald-400">${ans.question.correct}</strong></p>
        </div>
        <div class="text-xs p-2.5 rounded-lg bg-white dark:bg-slate-900/90 border border-[var(--border)] leading-relaxed">
          <span class="font-bold text-[var(--accent)]">Giải thích:</span> ${ans.question.explanation}
        </div>
      `;
      this.reviewList.appendChild(item);
    });

    this.reviewContainer.classList.remove('hidden');
    this.reviewContainer.scrollIntoView({ behavior: 'smooth' });
  }

  getMemeImage(isCorrect) {
    let list = [];
    if (isCorrect) {
      if (this.streakDung === 1) {
        list = MEME_RESOURCES.file4;
      } else if (this.streakDung === 2) {
        list = MEME_RESOURCES.file5;
      } else if (this.streakDung === 3) {
        list = MEME_RESOURCES.file6;
      } else {
        list = [...MEME_RESOURCES.file4, ...MEME_RESOURCES.file5, ...MEME_RESOURCES.file6];
      }
    } else {
      if (this.streakSai === 1) {
        list = MEME_RESOURCES.file1;
      } else if (this.streakSai === 2) {
        list = MEME_RESOURCES.file2;
      } else if (this.streakSai === 3) {
        list = MEME_RESOURCES.file3;
      } else {
        list = [...MEME_RESOURCES.file1, ...MEME_RESOURCES.file2, ...MEME_RESOURCES.file3];
      }
    }

    if (list.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  showMeme(imageUrl, isCorrect) {
    if (!imageUrl) return;
    const gen = ++this._memeGeneration;

    if (isCorrect) {
      this.memeStreakBadge.textContent = `Streak: ${this.streakDung} 🔥`;
      this.memeStreakBadge.className = "mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400";

      const positiveMessages = [
        "Quá xuất sắc! Đúng chuẩn sinh viên gương mẫu! 🚀",
        "Tuyệt vời ông mặt trời! Giữ vững chuỗi đúng nhé! ☀️",
        "Bác Hồ khen sen giỏi tư tưởng! 🤓",
        "Không thể cản bước! 10 điểm trong tầm tay! 💪"
      ];
      this.memeMessage.textContent = positiveMessages[Math.min(this.streakDung - 1, positiveMessages.length - 1)];
    } else {
      this.memeStreakBadge.textContent = `Streak sai: ${this.streakSai} 😿`;
      this.memeStreakBadge.className = "mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400";

      const negativeMessages = [
        "Đừng nản chí sen ơi, xem giải thích rồi gỡ lại nào! 💪",
        "Sai một ly đi một dặm, câu sau cố lên nha! ❤️",
        "Mèo con rớt nước mắt rồi, tập trung ôn bài nào! 😿",
        "Đọc kỹ lại câu hỏi ở câu tiếp theo nhé! 🧠"
      ];
      this.memeMessage.textContent = negativeMessages[Math.min(this.streakSai - 1, negativeMessages.length - 1)];
    }

    const preloader = new Image();
    preloader.src = imageUrl;

    const revealWhenReady = () => {
      if (gen !== this._memeGeneration) return;
      this.memeImage.src = imageUrl;
      this.memeImage.style.opacity = '1';

      if (this.memeCard) {
        this.memeCard.classList.remove('hidden');
        this.memeCard.classList.remove('animate-spring-bounce');
        void this.memeCard.offsetWidth;
        this.memeCard.classList.add('animate-spring-bounce');
      }
    };

    if (typeof preloader.decode === 'function') {
      preloader.decode().then(revealWhenReady).catch(revealWhenReady);
    } else {
      preloader.onload = revealWhenReady;
      preloader.onerror = revealWhenReady;
    }
  }

  hideMeme() {
    this._memeGeneration++;
    if (this.memeCard) {
      this.memeCard.classList.add('hidden');
      this.memeCard.classList.remove('animate-spring-bounce');
      this.memeImage.style.opacity = '0';
      this.memeImage.removeAttribute('src');
    }
    if (this.heritageFeedbackStrip) {
      this.heritageFeedbackStrip.classList.add('hidden');
    }
    if (this.quizView) {
      this.quizView.classList.remove('has-feedback');
    }
  }

  triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const duration = 2500;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99 };
      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 25 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }
}

// Instantiate the application
const app = new QuizApp();
