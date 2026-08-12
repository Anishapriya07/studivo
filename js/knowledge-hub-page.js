/* ==========================================
   STUDIVO KNOWLEDGE HUB PAGE CONTROLLER
   Curated Starter Collection, Search, Category Filters, Sort Engine, Featured Book,
   Reading Dashboard, Admin Book Management, Student Contribution System & LocalStorage
   ==========================================
   OFFLINE STUDENT CONTRIBUTIONS NOTE:
   This is an offline feature. Books added by one student are stored only in that student's browser
   using localStorage and are not shared with other users because the project does not use a backend or APIs.
   ========================================== */

const KNOWLEDGE_CUSTOM_BOOKS_KEY = 'studivo_custom_books_v1';
const KNOWLEDGE_STUDENT_CONTRIBUTIONS_KEY = 'studivo_student_contributions_v1';
const KNOWLEDGE_BOOKMARKS_KEY = 'studivo_book_bookmarks_v1';
const KNOWLEDGE_STATUSES_KEY = 'studivo_book_statuses_v1';
const KNOWLEDGE_READ_SUMMARIES_KEY = 'studivo_read_summaries_v1';
const GAMIFICATION_STORAGE_KEY = 'studivo_gamification_hub_v1';

const defaultBooksData = [
  /* --- 1. PRODUCTIVITY --- */
  {
    id: 'book-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Productivity',
    readTime: '12 min read',
    readTimeNum: 12,
    difficulty: 'Beginner',
    difficultyNum: 1,
    rating: '4.9 / 5',
    ratingNum: 4.9,
    coverGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    icon: '⚡',
    description: 'An easy & proven way to build good habits & break bad ones through tiny 1% daily improvements.',
    recommendationReason: 'Essential reading for any student wanting to build effortless study systems and eliminate procrastination permanently.',
    overview: 'Atomic Habits provides a practical framework for improving every day. James Clear reveals how tiny changes can grow into life-altering results by focusing on systems rather than goal outcomes.',
    summary5Min: 'Habits are the compound interest of self-improvement. Getting 1% better every day results in being 37 times better by year-end. Real change comes from identity shift rather than willpower. Focus on the 4 Laws of Behavior Change: Make it Obvious, Make it Attractive, Make it Easy, and Make it Satisfying.',
    keyTakeaways: [
      'Focus on systems and daily habits rather than rigid destination goals.',
      'Identity-based habits: Change your beliefs about yourself first, then let habits follow.',
      'Habit Stacking: Pair a new desired habit with an already established routine.',
      'The Environment is the invisible hand: Design your space so good habit cues are obvious.',
      'The 2-Minute Rule: Downscale new habits so they take two minutes or less to start.'
    ],
    whoShouldRead: 'Students struggling with procrastination, exam prep routines, or building consistent daily focus habits.',
    skillsLearned: ['Habit Stacking', 'Environment Design', 'Procrastination Elimination', 'Systems Thinking'],
    favoriteQuote: '"You do not rise to the level of your goals. You fall to the level of your systems."',
    realLifeApplications: [
      'After finishing dinner, immediately review 5 flashcards before opening social media.',
      'Place your textbook and notebook open on your desk before going to sleep.'
    ],
    similarBookIds: ['book-2', 'book-5', 'book-4']
  },
  {
    id: 'book-2',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    readTime: '15 min read',
    readTimeNum: 15,
    difficulty: 'Intermediate',
    difficultyNum: 2,
    rating: '4.9 / 5',
    ratingNum: 4.9,
    coverGradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    icon: '🧠',
    description: 'Rules for focused success in a distracted world to master cognitively demanding tasks.',
    overview: 'Deep Work is the ability to focus without distraction on a cognitively demanding task. It is a superpower in our increasingly distracted, ping-driven economy.',
    summary5Min: 'Network tools have pushed our work toward shallow work (fragmented emails and social checks). Deep work is rare, highly valuable, and deeply satisfying. To master complex skills rapidly, you must concentrate intensely without interruption for 60-90 minute blocks.',
    keyTakeaways: [
      'High-Quality Work Produced = (Time Spent) x (Intensity of Focus).',
      'Shallow work feels busy but creates zero long-term value or competitive edge.',
      'Embrace boredom: train your mind to tolerate lack of stimulation without grabbing your phone.',
      'Drain the shallows: schedule every minute of your day into intentional focus blocks.',
      'Shutdown complete: enforce a strict daily shutdown ritual to let your brain recharge.'
    ],
    whoShouldRead: 'Students preparing for intense exams, writing research papers, or tackling complex programming projects.',
    skillsLearned: ['Deep Focus Scheduling', 'Context Switching Reduction', 'Time-Blocking', 'Cognitive Stamina'],
    favoriteQuote: '"If you don’t produce, you won’t thrive—no matter how skilled or talented you are."',
    realLifeApplications: [
      'Put your phone in Do Not Disturb mode in another room during 90-minute study blocks.',
      'Plan your study schedule the night before using time-blocking.'
    ],
    similarBookIds: ['book-1', 'book-5', 'book-7']
  },

  /* --- 2. PERSONAL FINANCE --- */
  {
    id: 'book-3',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Personal Finance',
    readTime: '14 min read',
    readTimeNum: 14,
    difficulty: 'Beginner',
    difficultyNum: 1,
    rating: '4.9 / 5',
    ratingNum: 4.9,
    coverGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    icon: '💰',
    description: 'Timeless lessons on wealth, greed, and happiness exploring how behavior shapes financial success.',
    overview: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave. Financial success is a soft skill, where how you behave is more important than how smart you are.',
    summary5Min: 'Money decisions are rarely made on spreadsheets; they are made at dinner tables where personal history, ego, and pride collide. Warren Buffett’s skill is investing, but his secret is TIME. True wealth is what you don’t see—the unspent income, saved allowance, and freedom over your schedule.',
    keyTakeaways: [
      'Compounding is the single most powerful force in financial growth; time matters more than raw return.',
      'Getting wealthy is very different from STAYING wealthy; staying wealthy requires frugality and paranoia.',
      'Freedom and control over your daily schedule is the highest dividend money pays.',
      'Save money without a specific goal; saving builds room for unexpected life events.',
      'Avoid luxury lifestyle inflation when your student income or allowance increases.'
    ],
    whoShouldRead: 'College students managing pocket money, building initial savings, or learning personal financial discipline.',
    skillsLearned: ['Compound Interest Thinking', 'Behavioral Control', 'Emergency Fund Management', 'Wealth Preservation'],
    favoriteQuote: '"Spending money to show people how much money you have is the fastest way to have less money."',
    realLifeApplications: [
      'Set up an automatic $20 monthly transfer into an untouched emergency savings goal.',
      'Avoid buying luxury items immediately after earning side-hustle cash bonuses.'
    ],
    similarBookIds: ['book-4', 'book-10', 'book-1']
  },
  {
    id: 'book-4',
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    category: 'Personal Finance',
    readTime: '16 min read',
    readTimeNum: 16,
    difficulty: 'Beginner',
    difficultyNum: 1,
    rating: '4.7 / 5',
    ratingNum: 4.7,
    coverGradient: 'linear-gradient(135deg, #F2994A 0%, #EB5757 100%)',
    icon: '🏦',
    description: 'What the rich teach their kids about money that the poor and middle class do not.',
    overview: 'Robert Kiyosaki contrasts the financial philosophies of his two fathers—one highly educated but poor, the other a high school dropout but wealthy entrepreneur.',
    summary5Min: 'The middle class works for money; the rich have money work for them. Understand the difference between assets (putting money IN your pocket) and liabilities (taking money OUT of your pocket). Financial literacy is the key to building passive income streams.',
    keyTakeaways: [
      'An asset puts money in your pocket; a liability takes money out of your pocket.',
      'Work to learn, not to earn: acquire diverse skills in sales, accounting, and investing.',
      'Pay yourself first by allocating savings before paying discretionary expenses.',
      'Mind your own business: build assets while keeping your day job or university studies.',
      'Overcome fear, cynicism, and bad habits through continuous self-education.'
    ],
    whoShouldRead: 'Students wanting to understand financial independence, cash flow, assets vs liabilities, and investing basics.',
    skillsLearned: ['Asset vs Liability Mindset', 'Cash Flow Literacy', 'Financial Independence Planning', 'Passive Income Basics'],
    favoriteQuote: '"It’s not how much money you make. It’s how much money you keep."',
    realLifeApplications: [
      'Categorize all your student expenditures as either assets (courses, books) or liabilities.',
      'Invest time learning basic investing concepts instead of spending all allowance.'
    ],
    similarBookIds: ['book-3', 'book-10', 'book-11']
  },

  /* --- 3. CAREER --- */
  {
    id: 'book-5',
    title: "So Good They Can't Ignore You",
    author: 'Cal Newport',
    category: 'Career',
    readTime: '15 min read',
    readTimeNum: 15,
    difficulty: 'Intermediate',
    difficultyNum: 2,
    rating: '4.8 / 5',
    ratingNum: 4.8,
    coverGradient: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
    icon: '🎯',
    description: 'Why skills trump passion in the quest for work you love.',
    overview: 'Cal Newport debunks the "passion hypothesis" and argues that rare and valuable skills (career capital) are the true key to securing autonomy, mastery, and mission in your career.',
    summary5Min: 'Matching your job to a pre-existing passion is bad advice for most people. Passion comes AFTER you develop skill mastery. Adopt the Craftsman Mindset: focus relentlessly on what value you can offer the world rather than what the world can offer you.',
    keyTakeaways: [
      'Adopt the Craftsman Mindset instead of the Passion Mindset.',
      'Career Capital: Build rare and valuable skills that give you leverage in the job market.',
      'Deliberate Practice: Push beyond your comfort zone with immediate feedback to build elite skills.',
      'Control & Autonomy: Gain control over your work only after accumulating sufficient career capital.',
      'Find a Mission: A meaningful career mission requires high capital first.'
    ],
    whoShouldRead: 'Undergrads unsure about their major or career path, looking to build real competitive career leverage.',
    skillsLearned: ['Craftsman Mindset', 'Deliberate Skill Practice', 'Career Capital Accumulation', 'Strategic Autonomy'],
    favoriteQuote: '"Stop focusing on what the world can offer you and start focusing on what you can offer the world."',
    realLifeApplications: [
      'Pick 1 hard technical skill (e.g. React or Python) and practice it deliberately for 30 days.',
      'Build a public portfolio demonstrating rare project accomplishments.'
    ],
    similarBookIds: ['book-2', 'book-6', 'book-8']
  },
  {
    id: 'book-6',
    title: 'The Defining Decade',
    author: 'Meg Jay',
    category: 'Career',
    readTime: '16 min read',
    readTimeNum: 16,
    difficulty: 'Beginner',
    difficultyNum: 1,
    rating: '4.8 / 5',
    ratingNum: 4.8,
    coverGradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
    icon: '⏳',
    description: 'Why your twenties matter—and how to make the most of them now.',
    overview: 'Clinical psychologist Meg Jay demonstrates that 80% of life’s most defining moments happen by age 35, urging twenty-somethings to take proactive ownership of their career and personal decisions.',
    summary5Min: 'Your twenties are not a throwaway decade or extended adolescence. They are the transformative foundation for your career, relationships, and identity. Build identity capital, leverage weak ties for career opportunities, and make intentional choices.',
    keyTakeaways: [
      'Identity Capital: Accumulate achievements, skills, and experiences that add value to who you are.',
      'Weak Ties: The best job opportunities come from loose acquaintances outside your immediate circle.',
      'Unthought Known: Be honest with yourself about what you really want in life.',
      'Present Bias: Don’t delay important career decisions assuming your 30s will fix everything.',
      'Customized Timeline: Take control of your career and relationship decisions intentionally.'
    ],
    whoShouldRead: 'Students and young adults in their 20s seeking clarity, career direction, and purposeful momentum.',
    skillsLearned: ['Identity Capital Building', 'Networking Weak Ties', 'Intentional Career Planning', 'Long-Term Decision Making'],
    favoriteQuote: '"Thirty is not the new twenty. Claim your adulthood now."',
    realLifeApplications: [
      'Reach out to acquaintances outside your close friend circle for career advice.',
      'List 3 identity capital items you want to build before graduation.'
    ],
    similarBookIds: ['book-5', 'book-1', 'book-9']
  },

  /* --- 4. PROGRAMMING --- */
  {
    id: 'book-7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    readTime: '18 min read',
    readTimeNum: 18,
    difficulty: 'Intermediate',
    difficultyNum: 2,
    rating: '4.8 / 5',
    ratingNum: 4.8,
    coverGradient: 'linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)',
    icon: '💻',
    description: 'A handbook of agile software craftsmanship for writing readable, maintainable code.',
    overview: 'Clean Code teaches developers how to write code that human beings can read and maintain effortlessly. It covers principles, heuristics, and real-world refactoring case studies.',
    summary5Min: 'Even bad code can function, but if code isn’t clean, it can bring a development team to its knees. Clean code is simple, direct, and reads like well-written prose. Keep functions small, limit arguments, remove redundant comments, and enforce strict unit test coverage.',
    keyTakeaways: [
      'Use intention-revealing, pronounceable variable and function names.',
      'Functions should do ONE thing, do it well, and do it only.',
      'Comments do not make up for bad code; rewrite obscure code instead of commenting it.',
      'The Boy Scout Rule: Always leave the code cleaner than you found it.',
      'Unit Tests must be Fast, Independent, Repeatable, Self-validating, and Timely (F.I.R.S.T).'
    ],
    whoShouldRead: 'Computer Science students, aspiring software engineers, and hackathon developers building long-term codebases.',
    skillsLearned: ['Refactoring & Code Craftsmanship', 'Single-Responsibility Function Design', 'Unit Testing Principles (F.I.R.S.T)', 'Exception Management'],
    favoriteQuote: '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."',
    realLifeApplications: [
      'Refactor long functions into 5-line single-purpose helper methods in your next project.',
      'Name variables using descriptive nouns instead of single-letter shortcuts like `x` or `data`.'
    ],
    similarBookIds: ['book-8', 'book-2', 'book-10']
  },
  {
    id: 'book-8',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    category: 'Programming',
    readTime: '20 min read',
    readTimeNum: 20,
    difficulty: 'Intermediate',
    difficultyNum: 2,
    rating: '4.9 / 5',
    ratingNum: 4.9,
    coverGradient: 'linear-gradient(135deg, #6C63FF 0%, #3F3D56 100%)',
    icon: '🛠️',
    description: 'Your journey to mastery in software development and pragmatic problem solving.',
    overview: 'The Pragmatic Programmer cuts through the increasing specialization of modern software development to examine core principles for producing flexible, resilient code.',
    summary5Min: 'Software development is a craft. A pragmatic programmer takes ownership of their career, avoids broken window code rot, masters text automation tools, and uses DRY (Don’t Repeat Yourself) design principles to write decoupled software.',
    keyTakeaways: [
      'DRY (Don’t Repeat Yourself): Every piece of knowledge must have a single, unambiguous representation.',
      'Orthogonality: Design decoupled components so changes in one module don’t break others.',
      'Tracer Bullets: Build end-to-end skeleton architecture early to get fast user feedback.',
      'Broken Window Theory: Fix bad designs, wrong decisions, or poor code immediately.',
      'Invest in your Knowledge Portfolio: Learn one new programming language every year.'
    ],
    whoShouldRead: 'Software engineering students, open-source contributors, and developers seeking software architecture wisdom.',
    skillsLearned: ['DRY Architecture Design', 'Orthogonal System Decoupling', 'Tracer Bullet Prototyping', 'Knowledge Portfolio Management'],
    favoriteQuote: '"Care about your craft. Why spend your life developing software unless you care about doing it well?"',
    realLifeApplications: [
      'Eliminate duplicated logic across your project by writing reusable helper modules.',
      'Learn a new tool or command line productivity shortcut every week.'
    ],
    similarBookIds: ['book-7', 'book-5', 'book-2']
  },

  /* --- 5. COMMUNICATION --- */
  {
    id: 'book-9',
    title: 'How to Win Friends & Influence People',
    author: 'Dale Carnegie',
    category: 'Communication',
    readTime: '16 min read',
    readTimeNum: 16,
    difficulty: 'Beginner',
    difficultyNum: 1,
    rating: '4.8 / 5',
    ratingNum: 4.8,
    coverGradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
    icon: '🗣️',
    description: 'The classic guide to improving interpersonal relationships, empathy, and leadership.',
    overview: 'Dale Carnegie’s timeless principles teach how to build genuine relationships, handle interpersonal conflicts peacefully, and lead others effectively.',
    summary5Min: 'People desire to feel important and appreciated. You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you. Always listen, praise publicly, and avoid hostile arguments.',
    keyTakeaways: [
      'Don’t criticize, condemn, or complain; seek empathetic understanding instead.',
      'Give honest, sincere appreciation rather than empty flattery.',
      'Become genuinely interested in other people.',
      'Remember that a person’s name is to that person the sweetest sound in any language.',
      'The only way to get the best of an argument is to avoid it.'
    ],
    whoShouldRead: 'Students looking to improve team collaboration, networking skills, interview rapport, and student leadership.',
    skillsLearned: ['Active Empathic Listening', 'Interpersonal Relationship Building', 'Conflict Resolution', 'Persuasive Leadership'],
    favoriteQuote: '"You can make more friends in two months by becoming interested in other people than in two years by trying to get people interested in you."',
    realLifeApplications: [
      'Remember and use group project teammates’ names when giving positive feedback.',
      'Ask open-ended questions about others’ interests during networking events.'
    ],
    similarBookIds: ['book-6', 'book-1', 'book-5']
  },

  /* --- 6. ENTREPRENEURSHIP --- */
  {
    id: 'book-10',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    category: 'Entrepreneurship',
    readTime: '16 min read',
    readTimeNum: 16,
    difficulty: 'Intermediate',
    difficultyNum: 2,
    rating: '4.7 / 5',
    ratingNum: 4.7,
    coverGradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
    icon: '🚀',
    description: 'How today’s entrepreneurs use continuous innovation to create radically successful businesses.',
    overview: 'The Lean Startup methodology provides a scientific approach to creating and managing startups, getting products into customers’ hands faster through rapid iteration.',
    summary5Min: 'Most startups fail not because they can’t build a product, but because they build something nobody wants. The core mechanism is the Build-Measure-Learn feedback loop. Launch a Minimum Viable Product (MVP) rapidly, collect validated learning, and decide whether to pivot or persevere.',
    keyTakeaways: [
      'Build-Measure-Learn loop is the primary engine of startup progress.',
      'Minimum Viable Product (MVP): The simplest version of a product that allows you to collect maximum validated feedback.',
      'Validated Learning: Measure actual customer behavior rather than vanity metrics.',
      'Pivot or Persevere: Be disciplined about changing strategy when hypotheses fail.',
      'Innovation Accounting: Track actionable metrics rather than superficial vanity numbers.'
    ],
    whoShouldRead: 'Aspiring student founders, hackathon participants, product managers, and software builders.',
    skillsLearned: ['MVP Product Prototyping', 'Validated Learning Metrics', 'Hypothesis Testing', 'Strategic Pivoting'],
    favoriteQuote: '"The only way to win is to learn faster than anyone else."',
    realLifeApplications: [
      'Build a simple single-page prototype for your hackathon idea before coding a complex backend.',
      'Interview 5 real users before writing a single line of feature code.'
    ],
    similarBookIds: ['book-11', 'book-3', 'book-7']
  },
  {
    id: 'book-11',
    title: 'Zero to One',
    author: 'Peter Thiel',
    category: 'Entrepreneurship',
    readTime: '15 min read',
    readTimeNum: 15,
    difficulty: 'Intermediate',
    difficultyNum: 2,
    rating: '4.8 / 5',
    ratingNum: 4.8,
    coverGradient: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
    icon: '💡',
    description: 'Notes on startups, or how to build the future by going from 0 to 1.',
    overview: 'PayPal co-founder Peter Thiel shows how true innovation comes from creating something entirely new (0 to 1) rather than copying existing models (1 to n).',
    summary5Min: 'Doing what we already know how to do takes the world from 1 to n. But every time we create something new, we go from 0 to 1. Monopolies drive progress because they can invest in long-term R&D. Find a secret truth about the world that others disagree with you on.',
    keyTakeaways: [
      'Zero to One means creating brand new technology rather than incremental copying.',
      'Monopoly Power is good: Sustainable monopolies create long-term value, unlike brutal competition.',
      'The Contrarian Question: "What important truth do very few people agree with you on?"',
      'Start small and monopolize a small niche before scaling into adjacent markets.',
      'Sales matter as much as product: Distribution is key to startup survival.'
    ],
    whoShouldRead: 'Student innovators, tech visionaries, venture capital enthusiasts, and future startup founders.',
    skillsLearned: ['Contrarian Thinking', 'Niche Market Monopolization', 'Product Distribution Strategy', '0 to 1 Innovation'],
    favoriteQuote: '"Brilliant thinking is rare, but courage is in even shorter supply than genius."',
    realLifeApplications: [
      'Focus your student project on solving a very specific problem for a small group of users first.',
      'Question conventional assumptions when coming up with new product ideas.'
    ],
    similarBookIds: ['book-10', 'book-4', 'book-8']
  }
];

class KnowledgeHubPage {
  constructor() {
    this.curatedBooks = this.loadCuratedBooks();
    this.studentBooks = this.loadStudentContributions();
    this.searchQuery = '';
    this.activeCategory = 'All';
    this.activeStatusFilter = 'All Books';
    this.sortOption = 'rating';
    
    this.bookmarkedIds = this.loadBookmarks();
    this.bookStatuses = this.loadStatuses();
    this.readSummaryIds = this.loadReadSummaries();
  }

  get books() {
    return [...this.studentBooks, ...this.curatedBooks];
  }

  loadCuratedBooks() {
    let custom = [];
    try {
      const saved = localStorage.getItem(KNOWLEDGE_CUSTOM_BOOKS_KEY);
      if (saved) {
         custom = JSON.parse(saved);
      }
    } catch (e) {}
    
    // Concatenate admin-added custom books with the built-in defaults
    return [...custom, ...JSON.parse(JSON.stringify(defaultBooksData))];
  }

  loadStudentContributions() {
    try {
      const saved = localStorage.getItem(KNOWLEDGE_STUDENT_CONTRIBUTIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  }

  saveStudentContributions() {
    try {
      localStorage.setItem(KNOWLEDGE_STUDENT_CONTRIBUTIONS_KEY, JSON.stringify(this.studentBooks));
    } catch (e) {}
  }

  loadBookmarks() {
    try {
      const saved = localStorage.getItem(KNOWLEDGE_BOOKMARKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['book-1', 'book-4', 'book-7'];
  }

  saveBookmarks() {
    try {
      localStorage.setItem(KNOWLEDGE_BOOKMARKS_KEY, JSON.stringify(this.bookmarkedIds));
    } catch (e) {}
  }

  loadStatuses() {
    try {
      const saved = localStorage.getItem(KNOWLEDGE_STATUSES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      'book-1': 'Completed',
      'book-4': 'Reading',
      'book-3': 'Want to Read'
    };
  }

  saveStatuses() {
    try {
      localStorage.setItem(KNOWLEDGE_STATUSES_KEY, JSON.stringify(this.bookStatuses));
    } catch (e) {}
  }

  loadReadSummaries() {
    try {
      const saved = localStorage.getItem(KNOWLEDGE_READ_SUMMARIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['book-1'];
  }

  saveReadSummaries() {
    try {
      localStorage.setItem(KNOWLEDGE_READ_SUMMARIES_KEY, JSON.stringify(this.readSummaryIds));
    } catch (e) {}
  }

  awardGamificationXP(xpAmount, message, badgeCheck = true) {
    try {
      let gState;
      const saved = localStorage.getItem(GAMIFICATION_STORAGE_KEY);
      if (saved) {
        gState = JSON.parse(saved);
      } else {
        gState = {
          user: { name: 'Alex Rivers (You)', level: 3, xp: 450, maxXp: 800, streak: 5 },
          unlockedBadges: ['ach_1', 'ach_5', 'ach_8', 'ach_10', 'ach_14'],
          timeline: []
        };
      }

      gState.user.xp += xpAmount;
      this.showToastNotification(`+${xpAmount} XP Earned! ${message}`);

      if (gState.user.xp >= gState.user.maxXp) {
        gState.user.level += 1;
        gState.user.xp = gState.user.xp - gState.user.maxXp;
        gState.user.maxXp = Math.round(gState.user.maxXp * 1.3);
        this.showToastNotification(`🎉 LEVEL UP! Reached Level ${gState.user.level}!`);
      }

      if (badgeCheck) {
        if (this.studentBooks.length >= 1 && !gState.unlockedBadges.includes('ach_kn_4')) {
          gState.unlockedBadges.push('ach_kn_4');
          gState.user.xp += 100;
          this.showToastNotification('🏆 UNLOCKED BADGE: 📚 Knowledge Contributor (+100 XP)!');
        }

        const reviewCount = this.studentBooks.filter(b => b.personalReview && b.personalReview.length > 5).length;
        if (reviewCount >= 2 && !gState.unlockedBadges.includes('ach_kn_5')) {
          gState.unlockedBadges.push('ach_kn_5');
          gState.user.xp += 75;
          this.showToastNotification('🏆 UNLOCKED BADGE: ✍️ Student Reviewer (+75 XP)!');
        }

        if (this.studentBooks.length >= 3 && !gState.unlockedBadges.includes('ach_kn_6')) {
          gState.unlockedBadges.push('ach_kn_6');
          gState.user.xp += 150;
          this.showToastNotification('🏆 UNLOCKED BADGE: 🌟 Community Learner (+150 XP)!');
        }
      }

      localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(gState));
    } catch (e) {
      console.warn('Failed to update gamification state', e);
    }
  }

  showToastNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'glass-panel';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 3000;
      padding: 12px 20px;
      background: rgba(16, 185, 129, 0.95);
      color: white;
      font-weight: bold;
      font-size: 0.85rem;
      border-radius: 14px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    toast.innerHTML = `<span>✨</span><span>${msg}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  init() {
    this.renderAdminBanner();
    this.setupEventListeners();
    this.renderFeaturedBook();
    this.renderReadingProgress();
    this.renderStatusFilterTabs();
    this.renderCategoryFilters();

    setTimeout(() => {
      this.renderBooks();
    }, 120);
  }

  renderAdminBanner() {
    const container = document.getElementById('admin-control-banner');
    if (!container) return;

    if (window.authEngine && window.authEngine.isAdmin()) {
      container.style.display = 'block';
      container.innerHTML = `
        <div class="glass-panel" style="padding: var(--space-4) var(--space-6); border-radius: 18px; border-color: var(--brand-accent); background: rgba(236, 72, 153, 0.1); margin-bottom: var(--space-6); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span style="font-size: 1.6rem;">👨‍💼</span>
            <div>
              <h3 style="font-size: var(--text-base); color: var(--brand-accent);">Admin Control Panel Active</h3>
              <p style="font-size: var(--text-xs); color: var(--text-muted);">Manage platform library books & curated content.</p>
            </div>
          </div>
          <button class="btn btn-accent btn-sm" onclick="knowledgeHubPage.openAddBookModal()">
            ➕ Add Curated Book (Admin)
          </button>
        </div>
      `;
    } else {
      container.style.display = 'none';
    }
  }

  setupEventListeners() {
    const searchInput = document.getElementById('knowledge-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderBooks();
      });
    }

    const sortSelect = document.getElementById('knowledge-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortOption = e.target.value;
        this.renderBooks();
      });
    }
  }

  renderFeaturedBook() {
    const container = document.getElementById('featured-book-spotlight');
    if (!container) return;

    const featured = this.curatedBooks.find(b => b.id === 'book-1') || this.curatedBooks[0];

    container.innerHTML = `
      <div class="glass-panel" style="padding: var(--space-8); border-radius: 24px; background: linear-gradient(135deg, rgba(255, 107, 107, 0.12) 0%, rgba(108, 99, 255, 0.12) 100%); border: 1px solid var(--glass-border-glow); position: relative; overflow: hidden;">
        <span class="badge badge-accent" style="position: absolute; top: 24px; right: 24px; font-size: 0.75rem; padding: 6px 14px;">⭐ Book of the Week</span>
        
        <div style="display: flex; gap: var(--space-8); align-items: center; flex-wrap: wrap;">
          <div style="width: 150px; height: 200px; border-radius: 18px; background: ${featured.coverGradient}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 12px; flex-shrink: 0; box-shadow: var(--shadow-lg);">
            <span style="font-size: 3.5rem;">${featured.icon}</span>
            <h4 style="font-size: var(--text-sm); font-weight: 800; margin-top: 6px;">${featured.title}</h4>
            <span style="font-size: 0.7rem; opacity: 0.9;">${featured.author}</span>
          </div>

          <div style="flex: 1; min-width: 280px;">
            <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-2); flex-wrap: wrap;">
              <span class="badge badge-primary">${featured.category}</span>
              <span class="badge badge-ghost">⏱️ ${featured.readTime}</span>
              <span class="badge badge-warning">⭐ Rating: ${featured.rating}</span>
            </div>

            <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; margin-bottom: 6px;">${featured.title}</h2>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-4);">By <strong>${featured.author}</strong></p>

            <div style="background: var(--glass-surface-2); padding: var(--space-4); border-radius: 16px; border: 1px solid var(--glass-border); margin-bottom: var(--space-5);">
              <h4 style="font-size: var(--text-xs); text-transform: uppercase; color: var(--brand-primary); letter-spacing: 1px; margin-bottom: 4px;">💡 Why We Recommend It</h4>
              <p style="font-size: var(--text-sm); color: var(--text-main); line-height: 1.5;">${featured.recommendationReason}</p>
            </div>

            <button class="btn btn-primary btn-lg" style="border-radius: 14px;" onclick="knowledgeHubPage.openSummaryModal('${featured.id}')">
              📖 Read 5-Minute Summary (+20 XP) ▶
            </button>
          </div>
        </div>
      </div>
    `;
  }

  toggleBookmark(bookId, e) {
    if (e) e.stopPropagation();
    const idx = this.bookmarkedIds.indexOf(bookId);
    if (idx > -1) {
      this.bookmarkedIds.splice(idx, 1);
    } else {
      this.bookmarkedIds.push(bookId);
      this.awardGamificationXP(10, 'Bookmarked a book!');
    }
    this.saveBookmarks();
    this.renderReadingProgress();
    this.renderStatusFilterTabs();
    this.renderBooks();
  }

  setBookStatus(bookId, status) {
    const prevStatus = this.bookStatuses[bookId];

    if (status === 'None') {
      delete this.bookStatuses[bookId];
    } else {
      this.bookStatuses[bookId] = status;
    }
    this.saveStatuses();

    if (status === 'Completed' && prevStatus !== 'Completed') {
      this.awardGamificationXP(100, 'Completed a Book!');
    }

    this.renderReadingProgress();
    this.renderStatusFilterTabs();
    this.renderBooks();
  }

  setStatusFilter(filterName) {
    this.activeStatusFilter = filterName;
    this.renderStatusFilterTabs();
    this.renderBooks();
  }

  setCategory(category) {
    this.activeCategory = category;
    this.renderCategoryFilters();
    this.renderBooks();
  }

  renderReadingProgress() {
    const container = document.getElementById('reading-progress-banner');
    if (!container) return;

    const totalBooks = this.books.length;
    const completedCount = Object.values(this.bookStatuses).filter(s => s === 'Completed').length;
    const readingCount = Object.values(this.bookStatuses).filter(s => s === 'Reading').length;
    const wantToReadCount = Object.values(this.bookStatuses).filter(s => s === 'Want to Read').length;
    const bookmarkedCount = this.bookmarkedIds.length;

    const categoryCounts = {};
    const countCategory = (cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    };

    this.bookmarkedIds.forEach(id => {
      const b = this.books.find(x => x.id === id);
      if (b) countCategory(b.category);
    });

    Object.keys(this.bookStatuses).forEach(id => {
      const b = this.books.find(x => x.id === id);
      if (b) countCategory(b.category);
    });

    let favCategory = 'Productivity';
    let maxCatCount = 0;
    Object.keys(categoryCounts).forEach(cat => {
      if (categoryCounts[cat] > maxCatCount) {
        maxCatCount = categoryCounts[cat];
        favCategory = cat;
      }
    });

    const pct = totalBooks > 0 ? Math.round((completedCount / totalBooks) * 100) : 0;

    container.innerHTML = `
      <div class="glass-panel" style="padding: var(--space-6); border-radius: 20px; background: linear-gradient(135deg, rgba(108, 99, 255, 0.14), rgba(236, 72, 153, 0.08)); border-color: var(--glass-border-glow);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-4);">
          <div>
            <span class="badge badge-accent" style="margin-bottom: var(--space-2);">Reading Dashboard</span>
            <h2 style="font-size: var(--text-2xl); font-weight: 800;">Library Learning Progress</h2>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">
              ${completedCount} of ${totalBooks} books completed (${pct}% goal achieved) • Top Focus: <strong style="color: var(--brand-primary);">${favCategory}</strong>
            </p>
          </div>

          <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
            <div class="glass-card" style="padding: 10px 16px; text-align: center; min-width: 100px; border-radius: 16px;">
              <span style="font-size: 1.4rem;">❤️</span>
              <h4 style="font-size: var(--text-sm);">${bookmarkedCount}</h4>
              <span style="font-size: 0.65rem; color: var(--text-dim);">Bookmarked</span>
            </div>

            <div class="glass-card" style="padding: 10px 16px; text-align: center; min-width: 100px; border-radius: 16px;">
              <span style="font-size: 1.4rem;">📖</span>
              <h4 style="font-size: var(--text-sm);">${readingCount}</h4>
              <span style="font-size: 0.65rem; color: var(--text-dim);">In Progress</span>
            </div>

            <div class="glass-card" style="padding: 10px 16px; text-align: center; min-width: 100px; border-radius: 16px;">
              <span style="font-size: 1.4rem;">🔖</span>
              <h4 style="font-size: var(--text-sm);">${wantToReadCount}</h4>
              <span style="font-size: 0.65rem; color: var(--text-dim);">Want to Read</span>
            </div>

            <div class="glass-card" style="padding: 10px 16px; text-align: center; min-width: 100px; border-radius: 16px; border-color: var(--status-success);">
              <span style="font-size: 1.4rem;">✅</span>
              <h4 style="font-size: var(--text-sm); color: var(--status-success);">${completedCount}</h4>
              <span style="font-size: 0.65rem; color: var(--text-dim);">Completed</span>
            </div>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.08); height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: var(--gradient-primary); border-radius: 5px; transition: width 0.5s ease;"></div>
        </div>
      </div>
    `;
  }

  renderStatusFilterTabs() {
    const container = document.getElementById('status-filters-container');
    if (!container) return;

    const filters = [
      { name: 'All Books', icon: '📚' },
      { name: 'Bookmarked', icon: '❤️' },
      { name: 'Reading', icon: '📖' },
      { name: 'Want to Read', icon: '🔖' },
      { name: 'Completed', icon: '✅' }
    ];

    container.innerHTML = filters.map(f => {
      const isActive = f.name === this.activeStatusFilter;
      return `
        <button class="filter-pill-tab ${isActive ? 'active' : ''}" onclick="knowledgeHubPage.setStatusFilter('${f.name}')">
          <span>${f.icon}</span> ${f.name}
        </button>
      `;
    }).join('');
  }

  renderCategoryFilters() {
    const container = document.getElementById('category-filters-container');
    if (!container) return;

    const categories = ['All', 'Productivity', 'Personal Finance', 'Career', 'Programming', 'Communication', 'Psychology', 'Entrepreneurship', 'Wellness', 'Other'];

    container.innerHTML = categories.map(cat => {
      const isActive = cat === this.activeCategory;
      return `
        <button class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}" onclick="knowledgeHubPage.setCategory('${cat}')" style="border-radius: var(--radius-full);">
          ${cat}
        </button>
      `;
    }).join('');
  }

  getFilteredBooks(bookList) {
    let result = bookList.filter(b => {
      const matchesCategory = this.activeCategory === 'All' || b.category === this.activeCategory;

      const matchesSearch = !this.searchQuery || 
        b.title.toLowerCase().includes(this.searchQuery) ||
        b.author.toLowerCase().includes(this.searchQuery) ||
        b.category.toLowerCase().includes(this.searchQuery);

      let matchesStatus = true;
      if (this.activeStatusFilter === 'Bookmarked') {
        matchesStatus = this.bookmarkedIds.includes(b.id);
      } else if (this.activeStatusFilter === 'Reading') {
        matchesStatus = this.bookStatuses[b.id] === 'Reading';
      } else if (this.activeStatusFilter === 'Want to Read') {
        matchesStatus = this.bookStatuses[b.id] === 'Want to Read';
      } else if (this.activeStatusFilter === 'Completed') {
        matchesStatus = this.bookStatuses[b.id] === 'Completed';
      }

      return matchesCategory && matchesSearch && matchesStatus;
    });

    if (this.sortOption === 'rating') {
      result.sort((a, b) => b.ratingNum - a.ratingNum);
    } else if (this.sortOption === 'time-short') {
      result.sort((a, b) => a.readTimeNum - b.readTimeNum);
    } else if (this.sortOption === 'time-long') {
      result.sort((a, b) => b.readTimeNum - a.readTimeNum);
    } else if (this.sortOption === 'difficulty') {
      result.sort((a, b) => a.difficultyNum - b.difficultyNum);
    } else if (this.sortOption === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }

  renderBookCardHtml(b) {
    const isBookmarked = this.bookmarkedIds.includes(b.id);
    const status = this.bookStatuses[b.id] || 'None';
    const isAdmin = window.authEngine && window.authEngine.isAdmin();
    const isStudentOwnBook = b.isStudentContribution === true;

    // Cover Image rendering (Upload image DataURL or Gradient artwork)
    const coverHtml = b.coverImageDataUrl ? `
      <div class="book-cover-wrapper" style="background: url('${b.coverImageDataUrl}') center/cover no-repeat;">
        <div style="background: rgba(0,0,0,0.4); width: 100%; height: 100%; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px;">
          <h4 style="font-size: var(--text-base); color: white; font-weight: 800; line-height: 1.2;">${b.title}</h4>
          <span style="font-size: 0.75rem; color: #E2E8F0; margin-top: 2px;">${b.author}</span>
        </div>
      </div>
    ` : `
      <div class="book-cover-wrapper" style="background: ${b.coverGradient || 'linear-gradient(135deg, #6C63FF 0%, #EC4899 100%)'};">
        <span class="book-icon-emoji">${b.icon || '📚'}</span>
        <h4 style="font-size: var(--text-base); color: white; font-weight: 800; line-height: 1.2;">${b.title}</h4>
        <span style="font-size: 0.75rem; opacity: 0.9; margin-top: 2px;">${b.author}</span>
      </div>
    `;

    return `
      <div class="book-card reveal-on-scroll" style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        
        <button onclick="knowledgeHubPage.toggleBookmark('${b.id}', event)" aria-label="Bookmark Book" style="position: absolute; top: 20px; right: 20px; z-index: 5; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.2); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; cursor: pointer; backdrop-filter: blur(8px);" title="Bookmark (+10 XP)">
          ${isBookmarked ? '❤️' : '🤍'}
        </button>

        <div>
          ${coverHtml}

          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-3);">
            <span class="badge badge-primary">${b.category}</span>
            <span class="badge badge-ghost">${b.readTime}</span>
            <span class="badge badge-warning">⭐ ${b.rating}</span>
            ${isStudentOwnBook ? `<span class="badge badge-accent">Added by You</span>` : ''}
          </div>

          <h3 style="font-size: var(--text-lg); font-weight: 800; margin-bottom: 4px;">${b.title}</h3>
          <p style="font-size: var(--text-xs); color: var(--text-dim); margin-bottom: var(--space-3);">By ${b.author} • <span style="color: var(--brand-cyan); font-weight: bold;">${b.difficulty}</span></p>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-4); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">${b.description}</p>
        </div>

        <div>
          <!-- Admin Edit/Delete OR Student Own Book Edit/Delete -->
          ${(isAdmin || isStudentOwnBook) ? `
            <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-3);">
              <button class="btn btn-ghost btn-sm" style="flex: 1; border-color: var(--brand-primary); color: var(--brand-primary);" onclick="knowledgeHubPage.openStudentContributionModal('${b.id}')">
                ✏️ Edit
              </button>
              <button class="btn btn-ghost btn-sm" style="flex: 1; border-color: var(--status-danger); color: var(--status-danger);" onclick="knowledgeHubPage.deleteStudentBook('${b.id}')">
                🗑️ Delete
              </button>
            </div>
          ` : ''}

          <div style="margin-bottom: var(--space-3);">
            <select class="input-control" style="font-size: var(--text-xs); font-weight: bold; padding: 8px 12px; border-radius: 12px;" onchange="knowledgeHubPage.setBookStatus('${b.id}', this.value)">
              <option value="None" ${status === 'None' ? 'selected' : ''}>Status: Not Started</option>
              <option value="Want to Read" ${status === 'Want to Read' ? 'selected' : ''}>🔖 Want to Read</option>
              <option value="Reading" ${status === 'Reading' ? 'selected' : ''}>📖 Currently Reading</option>
              <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>✅ Completed (+100 XP)</option>
            </select>
          </div>

          <button class="btn btn-secondary btn-sm" style="width: 100%; border-radius: 12px;" onclick="knowledgeHubPage.openSummaryModal('${b.id}')">
            📖 Read Summary (+20 XP)
          </button>
        </div>

      </div>
    `;
  }

  renderBooks() {
    const studentContainer = document.getElementById('student-contributions-grid');
    const studentSectionWrapper = document.getElementById('student-contributions-section');
    const curatedContainer = document.getElementById('curated-grid-container');

    const filteredStudentBooks = this.getFilteredBooks(this.studentBooks);
    const filteredCuratedBooks = this.getFilteredBooks(this.curatedBooks);

    // Render "My Contributions" Section
    if (studentContainer && studentSectionWrapper) {
      if (this.studentBooks.length > 0) {
        studentSectionWrapper.style.display = 'block';
        if (filteredStudentBooks.length === 0) {
          studentContainer.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: var(--text-sm);">No student contributions match current filters.</p>`;
        } else {
          studentContainer.innerHTML = filteredStudentBooks.map(b => this.renderBookCardHtml(b)).join('');
        }
      } else {
        studentSectionWrapper.style.display = 'none';
      }
    }

    // Render Platform Curated Collection Grid
    if (curatedContainer) {
      if (filteredCuratedBooks.length === 0) {
        curatedContainer.innerHTML = `
          <div class="glass-panel" style="grid-column: 1 / -1; padding: var(--space-8); text-align: center; border-radius: 20px;">
            <span style="font-size: 3rem;">🔍</span>
            <h3 style="margin-top: var(--space-3);">No curated books found in this view</h3>
            <p style="color: var(--text-muted);">Try selecting a different filter tab or clearing your search.</p>
          </div>
        `;
      } else {
        curatedContainer.innerHTML = filteredCuratedBooks.map(b => this.renderBookCardHtml(b)).join('');
      }
    }

    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  }

  /* --- STUDENT CONTRIBUTION MODAL & SAVE SYSTEM --- */
  openStudentContributionModal() {
    const modalOverlay = document.getElementById('book-summary-modal');
    const modalContent = document.getElementById('book-summary-modal-content');
    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); padding-bottom: var(--space-3); border-bottom: 1px solid var(--glass-border);">
        <div>
          <span class="badge badge-accent" style="margin-bottom: 4px;">Student Contribution</span>
          <h2 class="gradient-text-accent" style="font-size: var(--text-xl); font-weight: 800;">
            ➕ Add Book
          </h2>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="knowledgeHubPage.closeSummaryModal()">✕</button>
      </div>

      <form onsubmit="knowledgeHubPage.handleStudentFormSubmit(event)" style="max-height: 65vh; overflow-y: auto; padding-right: 8px;">
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-3); margin-bottom: var(--space-3);">
          <div class="form-group">
            <label class="form-label">📖 Book Title *</label>
            <input type="text" class="input-control" id="st-title" required placeholder="e.g. Master Your Mindset">
          </div>

          <div class="form-group">
            <label class="form-label">✍️ Author Name *</label>
            <input type="text" class="input-control" id="st-author" required placeholder="e.g. Carol Dweck">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">🏷️ Category *</label>
          <select class="input-control" id="st-category">
            <option value="Productivity">Productivity</option>
            <option value="Career">Career</option>
            <option value="Programming">Programming</option>
            <option value="Personal Finance">Personal Finance</option>
            <option value="Wellness">Wellness</option>
            <option value="Communication">Communication</option>
            <option value="Psychology">Psychology</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">📄 Short Summary *</label>
          <textarea class="input-control" id="st-summary" rows="3" required placeholder="Write a short summary..."></textarea>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">💡 Key Ideas / Notes *</label>
          <textarea class="input-control" id="st-takeaways" rows="3" required placeholder="List your key ideas and notes here..."></textarea>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-4);">
          <label class="form-label">📝 Optional Personal Review</label>
          <textarea class="input-control" id="st-review" rows="2" placeholder="Write your personal review and why this book helped you grow..."></textarea>
        </div>

        <div style="display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-4);">
          <button type="button" class="btn btn-ghost" onclick="knowledgeHubPage.closeSummaryModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-lg" style="border-radius: 14px;">
            Submit Book for Approval 🚀
          </button>
        </div>

      </form>
    `;

    modalOverlay.classList.add('active');
  }

  handleStudentFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('st-title').value;
    const author = document.getElementById('st-author').value;
    const category = document.getElementById('st-category').value;
    const summary = document.getElementById('st-summary').value;
    const notes = document.getElementById('st-takeaways').value;
    const review = document.getElementById('st-review').value;

    const bookData = {
      id: 'student-book-' + Date.now(),
      title,
      author,
      category,
      summary,
      notes,
      personalReview: review,
      status: 'Pending Approval',
      submittedBy: window.authEngine ? window.authEngine.getUsername() : 'Student',
      dateSubmitted: new Date().toISOString()
    };

    try {
      let pendingBooks = [];
      const saved = localStorage.getItem('studivo_pending_books_v1');
      if (saved) pendingBooks = JSON.parse(saved);
      pendingBooks.unshift(bookData);
      localStorage.setItem('studivo_pending_books_v1', JSON.stringify(pendingBooks));
    } catch (err) {}

    this.closeSummaryModal();
    this.showToastNotification(`Book "${title}" submitted and is Pending Approval.`);
  }

  openRequestBookModal() {
    const modalOverlay = document.getElementById('book-summary-modal');
    const modalContent = document.getElementById('book-summary-modal-content');
    if (!modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); padding-bottom: var(--space-3); border-bottom: 1px solid var(--glass-border);">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 4px;">Library Request</span>
          <h2 class="gradient-text" style="font-size: var(--text-xl); font-weight: 800;">
            ➕ Request a Book
          </h2>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="knowledgeHubPage.closeSummaryModal()">✕</button>
      </div>

      <form onsubmit="knowledgeHubPage.handleRequestFormSubmit(event)" style="max-height: 65vh; overflow-y: auto; padding-right: 8px;">
        
        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">📖 Requested Book Title *</label>
          <input type="text" class="input-control" id="req-title" required placeholder="e.g. The Lean Startup">
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">✍️ Author Name (Optional)</label>
          <input type="text" class="input-control" id="req-author" placeholder="e.g. Eric Ries">
        </div>

        <div class="form-group" style="margin-bottom: var(--space-4);">
          <label class="form-label">💡 Reason / Why you want this book *</label>
          <textarea class="input-control" id="req-reason" rows="3" required placeholder="Why should this book be added to the Knowledge Hub?"></textarea>
        </div>

        <div style="display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-4);">
          <button type="button" class="btn btn-ghost" onclick="knowledgeHubPage.closeSummaryModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-lg" style="border-radius: 14px;">
            Submit Request 🚀
          </button>
        </div>

      </form>
    `;

    modalOverlay.classList.add('active');
  }

  handleRequestFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('req-title').value;
    const author = document.getElementById('req-author').value;
    const reason = document.getElementById('req-reason').value;

    const requestData = {
      id: 'book-request-' + Date.now(),
      title,
      author,
      reason,
      status: 'Pending',
      requestedBy: window.authEngine ? window.authEngine.getUsername() : 'Student',
      dateRequested: new Date().toISOString()
    };

    try {
      let requests = [];
      const saved = localStorage.getItem('studivo_book_requests_v1');
      if (saved) requests = JSON.parse(saved);
      requests.unshift(requestData);
      localStorage.setItem('studivo_book_requests_v1', JSON.stringify(requests));
    } catch (err) {}

    this.closeSummaryModal();
    this.showToastNotification(`Request for "${title}" submitted and is Pending.`);
  }

  deleteBook(bookId) {
    // Admin delete for curated collection
    const book = this.curatedBooks.find(b => b.id === bookId);
    if (!book) return;

    if (confirm(`Are you sure you want to delete "${book.title}" from Knowledge Hub?`)) {
      this.curatedBooks = this.curatedBooks.filter(b => b.id !== bookId);
      try {
        localStorage.setItem(KNOWLEDGE_CUSTOM_BOOKS_KEY, JSON.stringify(this.curatedBooks));
      } catch (e) {}
      this.showToastNotification(`Deleted "${book.title}".`);
      this.renderReadingProgress();
      this.renderBooks();
    }
  }

  openAddBookModal() {
    this.openBookFormModal(null);
  }

  openBookFormModal(bookToEdit = null) {
    // Admin form for curated books
    const isEdit = !!bookToEdit;
    const modalOverlay = document.getElementById('book-summary-modal');
    const modalContent = document.getElementById('book-summary-modal-content');
    if (!modalOverlay || !modalContent) return;

    const b = bookToEdit || {
      id: 'book-' + Date.now(),
      title: '',
      author: '',
      category: 'Productivity',
      readTime: '15 min read',
      readTimeNum: 15,
      difficulty: 'Beginner',
      difficultyNum: 1,
      rating: '4.8 / 5',
      ratingNum: 4.8,
      coverGradient: 'linear-gradient(135deg, #6C63FF 0%, #EC4899 100%)',
      icon: '📚',
      description: '',
      recommendationReason: 'Highly recommended for students looking to grow their skills.',
      overview: '',
      summary5Min: '',
      keyTakeaways: ['Key Insight 1', 'Key Insight 2', 'Key Insight 3'],
      whoShouldRead: 'Students and self-learners.',
      skillsLearned: ['Skill 1', 'Skill 2'],
      favoriteQuote: '"Learning is a lifelong journey."',
      realLifeApplications: ['Application step 1', 'Application step 2']
    };

    modalContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); padding-bottom: var(--space-3); border-bottom: 1px solid var(--glass-border);">
        <h2 class="gradient-text-accent" style="font-size: var(--text-xl); font-weight: 800;">
          ${isEdit ? '✏️ Edit Book Details (Admin)' : '➕ Add New Book to Knowledge Hub (Admin)'}
        </h2>
        <button class="btn btn-ghost btn-sm" onclick="knowledgeHubPage.closeSummaryModal()">✕</button>
      </div>

      <form onsubmit="knowledgeHubPage.handleBookFormSubmit(event, '${b.id}', ${isEdit})" style="max-height: 65vh; overflow-y: auto; padding-right: 8px;">
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-3); margin-bottom: var(--space-3);">
          <div class="form-group">
            <label class="form-label">Book Title</label>
            <input type="text" class="input-control" id="form-title" value="${b.title}" required placeholder="e.g. Mastermind">
          </div>

          <div class="form-group">
            <label class="form-label">Cover Icon Emoji</label>
            <input type="text" class="input-control" id="form-icon" value="${b.icon}" required placeholder="⚡, 🚀, 💻">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-3);">
          <div class="form-group">
            <label class="form-label">Author Name</label>
            <input type="text" class="input-control" id="form-author" value="${b.author}" required placeholder="Author Name">
          </div>

          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="input-control" id="form-category">
              <option value="Productivity" ${b.category === 'Productivity' ? 'selected' : ''}>Productivity</option>
              <option value="Personal Finance" ${b.category === 'Personal Finance' ? 'selected' : ''}>Personal Finance</option>
              <option value="Career" ${b.category === 'Career' ? 'selected' : ''}>Career</option>
              <option value="Programming" ${b.category === 'Programming' ? 'selected' : ''}>Programming</option>
              <option value="Communication" ${b.category === 'Communication' ? 'selected' : ''}>Communication</option>
              <option value="Entrepreneurship" ${b.category === 'Entrepreneurship' ? 'selected' : ''}>Entrepreneurship</option>
              <option value="Self Growth" ${b.category === 'Self Growth' ? 'selected' : ''}>Self Growth</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-3);">
          <div class="form-group">
            <label class="form-label">Reading Time</label>
            <input type="text" class="input-control" id="form-readtime" value="${b.readTime}" required placeholder="15 min read">
          </div>

          <div class="form-group">
            <label class="form-label">Difficulty</label>
            <select class="input-control" id="form-difficulty">
              <option value="Beginner" ${b.difficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
              <option value="Intermediate" ${b.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="Advanced" ${b.difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Rating</label>
            <input type="text" class="input-control" id="form-rating" value="${b.rating}" required placeholder="4.8 / 5">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">One-Line Description</label>
          <input type="text" class="input-control" id="form-description" value="${b.description}" required placeholder="Short summary description">
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">📖 Overview</label>
          <textarea class="input-control" id="form-overview" rows="3" required placeholder="Detailed overview thesis...">${b.overview}</textarea>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">📝 5-Minute Executive Summary</label>
          <textarea class="input-control" id="form-summary" rows="3" required placeholder="5-minute executive summary...">${b.summary5Min}</textarea>
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">🎯 Target Reader / Best For</label>
          <input type="text" class="input-control" id="form-whoshouldread" value="${b.whoShouldRead}" required placeholder="Who should read this book?">
        </div>

        <div class="form-group" style="margin-bottom: var(--space-3);">
          <label class="form-label">⭐ Favorite Quote</label>
          <input type="text" class="input-control" id="form-quote" value="${b.favoriteQuote}" required placeholder="Favorite quote from the book">
        </div>

        <div style="display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-4);">
          <button type="button" class="btn btn-ghost" onclick="knowledgeHubPage.closeSummaryModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">
            ${isEdit ? 'Save Book Changes 💾' : 'Publish Book to Library 🚀'}
          </button>
        </div>

      </form>
    `;

    modalOverlay.classList.add('active');
  }

  handleBookFormSubmit(e, bookId, isEdit) {
    e.preventDefault();
    const title = document.getElementById('form-title').value;
    const icon = document.getElementById('form-icon').value || '📚';
    const author = document.getElementById('form-author').value;
    const category = document.getElementById('form-category').value;
    const readTime = document.getElementById('form-readtime').value;
    const difficulty = document.getElementById('form-difficulty').value;
    const rating = document.getElementById('form-rating').value;
    const description = document.getElementById('form-description').value;
    const overview = document.getElementById('form-overview').value;
    const summary5Min = document.getElementById('form-summary').value;
    const whoShouldRead = document.getElementById('form-whoshouldread').value;
    const favoriteQuote = document.getElementById('form-quote').value;

    const readTimeNum = parseInt(readTime) || 15;
    const ratingNum = parseFloat(rating) || 4.8;
    const difficultyNum = difficulty === 'Beginner' ? 1 : difficulty === 'Intermediate' ? 2 : 3;

    if (isEdit) {
      const idx = this.curatedBooks.findIndex(b => b.id === bookId);
      if (idx > -1) {
        this.curatedBooks[idx] = {
          ...this.curatedBooks[idx],
          title, icon, author, category, readTime, readTimeNum,
          difficulty, difficultyNum, rating, ratingNum,
          description, overview, summary5Min, whoShouldRead, favoriteQuote
        };
      }
    } else {
      const newBook = {
        id: bookId,
        title, icon, author, category, readTime, readTimeNum,
        difficulty, difficultyNum, rating, ratingNum,
        coverGradient: 'linear-gradient(135deg, #6C63FF 0%, #EC4899 100%)',
        description,
        recommendationReason: 'Admin recommended addition for student excellence.',
        overview, summary5Min,
        keyTakeaways: ['Focus on skill building', 'Apply continuous learning', 'Build identity capital'],
        whoShouldRead,
        skillsLearned: ['Critical Thinking', 'Self Improvement'],
        favoriteQuote,
        realLifeApplications: ['Review key takeaways weekly', 'Apply learnings to personal projects'],
        similarBookIds: ['book-1', 'book-2']
      };
      this.curatedBooks.unshift(newBook);
    }

    try {
      localStorage.setItem(KNOWLEDGE_CUSTOM_BOOKS_KEY, JSON.stringify(this.curatedBooks));
    } catch (e) {}

    this.closeSummaryModal();
    this.showToastNotification(isEdit ? `Updated "${title}".` : `Published "${title}" to Knowledge Hub!`);
    this.renderReadingProgress();
    this.renderBooks();
  }

  openSummaryModal(bookId) {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    if (!this.readSummaryIds.includes(book.id)) {
      this.readSummaryIds.push(book.id);
      this.saveReadSummaries();
      this.awardGamificationXP(20, 'Read a Book Summary!');
    }

    const modalOverlay = document.getElementById('book-summary-modal');
    const modalContent = document.getElementById('book-summary-modal-content');
    if (!modalOverlay || !modalContent) return;

    const status = this.bookStatuses[book.id] || 'None';

    const similarBooks = (book.similarBookIds || ['book-1', 'book-2'])
      .map(id => this.books.find(x => x.id === id))
      .filter(Boolean);

    modalContent.innerHTML = `
      <div style="display: flex; gap: var(--space-5); align-items: center; margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--glass-border); flex-wrap: wrap;">
        
        <div style="width: 110px; height: 140px; border-radius: 16px; background: ${book.coverImageDataUrl ? `url('${book.coverImageDataUrl}') center/cover` : book.coverGradient}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 10px; flex-shrink: 0; box-shadow: var(--shadow-md);">
          ${book.coverImageDataUrl ? '' : `<span style="font-size: 2.6rem;">${book.icon || '📚'}</span>`}
          <span style="font-size: 0.65rem; font-weight: bold; margin-top: 4px; background: rgba(0,0,0,0.5); padding: 2px 6px; border-radius: 6px;">${book.title}</span>
        </div>

        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 6px;">${book.category}</span>
              ${book.isStudentContribution ? `<span class="badge badge-accent" style="margin-bottom: 6px;">Added by You</span>` : ''}
              <h2 style="font-size: var(--text-2xl); font-weight: 800;">${book.title}</h2>
              <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">By <strong>${book.author}</strong></p>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="knowledgeHubPage.closeSummaryModal()" style="font-size: 1.3rem; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">✕</button>
          </div>

          <div style="display: flex; gap: var(--space-2); margin-top: var(--space-3); flex-wrap: wrap;">
            <span class="badge badge-ghost">⏱️ ${book.readTime}</span>
            <span class="badge badge-accent">📊 Level: ${book.difficulty}</span>
            <span class="badge badge-warning">⭐ Rating: ${book.rating}</span>
          </div>
        </div>
      </div>

      <div style="max-height: 58vh; overflow-y: auto; padding-right: var(--space-2); display: flex; flex-direction: column; gap: var(--space-6);">
        
        ${book.personalReview ? `
          <div class="glass-card" style="border-radius: 16px; border-left: 4px solid var(--brand-primary); background: rgba(108, 99, 255, 0.08);">
            <h3 style="color: var(--brand-primary); margin-bottom: var(--space-2); display: flex; align-items: center; gap: 8px;">📝 Student Personal Review</h3>
            <p style="font-size: var(--text-sm); color: var(--text-main); line-height: 1.6; font-style: italic;">"${book.personalReview}"</p>
          </div>
        ` : ''}

        <div class="glass-card" style="border-radius: 16px;">
          <h3 style="color: var(--brand-primary); margin-bottom: var(--space-2); display: flex; align-items: center; gap: 8px;">📖 1. Overview</h3>
          <p style="font-size: var(--text-sm); color: var(--text-main); line-height: 1.6;">${book.overview}</p>
        </div>

        <div class="glass-card" style="border-radius: 16px;">
          <h3 style="color: var(--brand-secondary); margin-bottom: var(--space-2); display: flex; align-items: center; gap: 8px;">📝 2. 5-Minute Executive Summary</h3>
          <p style="font-size: var(--text-sm); color: var(--text-main); line-height: 1.6;">${book.summary5Min}</p>
        </div>

        <div class="glass-card" style="border-radius: 16px;">
          <h3 style="color: var(--brand-cyan); margin-bottom: var(--space-3); display: flex; align-items: center; gap: 8px;">💡 3. Top Key Takeaways</h3>
          <ol style="padding-left: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2);">
            ${book.keyTakeaways.map(t => `<li style="font-size: var(--text-sm); color: var(--text-main); line-height: 1.5;">${t}</li>`).join('')}
          </ol>
        </div>

        <div class="glass-card" style="border-radius: 16px;">
          <h3 style="color: var(--status-warning); margin-bottom: var(--space-2); display: flex; align-items: center; gap: 8px;">🎯 4. Best For / Target Reader</h3>
          <p style="font-size: var(--text-sm); color: var(--text-main); line-height: 1.6;">${book.whoShouldRead}</p>
        </div>

        <div class="glass-card" style="border-radius: 16px;">
          <h3 style="color: var(--status-success); margin-bottom: var(--space-3); display: flex; align-items: center; gap: 8px;">🧠 5. Skills You'll Learn</h3>
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${book.skillsLearned.map(s => `<span class="badge badge-success" style="padding: 6px 12px; font-size: var(--text-xs);">${s}</span>`).join('')}
          </div>
        </div>

        ${book.favoriteQuote ? `
          <div class="glass-card" style="border-radius: 16px; border-left: 4px solid var(--brand-accent); background: rgba(236, 72, 153, 0.08);">
            <h3 style="color: var(--brand-accent); margin-bottom: var(--space-2); display: flex; align-items: center; gap: 8px;">⭐ 6. Favorite Quote</h3>
            <blockquote style="font-size: var(--text-base); font-style: italic; color: var(--text-main); font-weight: 600;">"${book.favoriteQuote}"</blockquote>
            <span style="font-size: 0.75rem; color: var(--brand-accent); display: block; margin-top: 4px;">— ${book.author}</span>
          </div>
        ` : ''}

        <div class="glass-card" style="border-radius: 16px;">
          <h3 style="color: var(--brand-secondary); margin-bottom: var(--space-3); display: flex; align-items: center; gap: 8px;">📚 8. Similar Recommended Books</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-3);">
            ${similarBooks.map(sb => `
              <div class="glass-card" style="padding: var(--space-3); border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;" onclick="knowledgeHubPage.openSummaryModal('${sb.id}')">
                <div style="width: 38px; height: 48px; border-radius: 8px; background: ${sb.coverGradient}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; flex-shrink: 0;">
                  ${sb.icon || '📚'}
                </div>
                <div>
                  <h4 style="font-size: var(--text-xs); font-weight: bold;">${sb.title}</h4>
                  <span style="font-size: 0.65rem; color: var(--text-muted);">${sb.author}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <div style="display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-6); padding-top: var(--space-4); border-top: 1px solid var(--glass-border);">
        <button class="btn btn-ghost" onclick="knowledgeHubPage.closeSummaryModal()">Close Reader</button>
        <button class="btn btn-primary" onclick="knowledgeHubPage.setBookStatus('${book.id}', 'Completed'); knowledgeHubPage.closeSummaryModal();">
          ${status === 'Completed' ? 'Completed ✓' : 'Mark as Completed (+100 XP)'}
        </button>
      </div>
    `;

    modalOverlay.classList.add('active');
  }

  closeSummaryModal() {
    const modalOverlay = document.getElementById('book-summary-modal');
    if (modalOverlay) modalOverlay.classList.remove('active');
  }
}

let knowledgeHubPage;
document.addEventListener('DOMContentLoaded', () => {
  knowledgeHubPage = new KnowledgeHubPage();
  knowledgeHubPage.init();
});
