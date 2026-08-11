/* ==========================================
   STUDIVO STORAGE - LocalStorage Persistence & Seed Data
   ========================================== */

const STORAGE_KEY = 'studivo_app_state_v1';

const defaultState = {
  user: {
    name: 'Alex Rivers',
    avatar: 'AR',
    title: 'Computer Science Undergrad',
    level: 3,
    xp: 450,
    maxXp: 800,
    coins: 280,
    streak: 5,
    lastCheckin: new Date().toISOString().split('T')[0]
  },
  career: {
    kanban: [
      { id: 'job-1', company: 'Stripe', role: 'Software Engineer Intern', stage: 'interview', salary: '$55/hr', date: '2026-08-05' },
      { id: 'job-2', company: 'Google', role: 'STEP Intern 2027', stage: 'applied', salary: '$50/hr', date: '2026-08-08' },
      { id: 'job-3', company: 'Figma', role: 'Frontend Engineer Co-op', stage: 'saved', salary: '$48/hr', date: '2026-08-10' },
      { id: 'job-4', company: 'Vercel', role: 'Developer Relations Intern', stage: 'offer', salary: '$52/hr', date: '2026-08-02' }
    ],
    skills: [
      { id: 'sk-1', name: 'Data Structures & Algorithms', level: 4, progress: 75, category: 'Coding' },
      { id: 'sk-2', name: 'System Design Fundamentals', level: 2, progress: 40, category: 'Coding' },
      { id: 'sk-3', name: 'Technical Interviewing', level: 3, progress: 60, category: 'Career' },
      { id: 'sk-4', name: 'Financial Literacy', level: 5, progress: 90, category: 'Personal' }
    ],
    flashcards: [
      { id: 'fc-1', question: 'What is the time complexity of QuickSort in average vs worst case?', answer: 'Average case: O(N log N). Worst case: O(N²) when pivot selection is poor.', topic: 'DSA', confidence: 'mastered' },
      { id: 'fc-2', question: 'What is the difference between Process and Thread?', answer: 'A Process is an independent execution unit with its own memory space. A Thread is a lightweight subset of a process sharing memory.', topic: 'OS', confidence: 'practice' },
      { id: 'fc-3', question: 'Explain the STAR method for Behavioral Interviews.', answer: 'Situation, Task, Action, Result. Clearly structure past engineering accomplishments.', topic: 'Behavioral', confidence: 'mastered' }
    ]
  },
  wellness: {
    moods: [
      { id: 'm-1', date: '2026-08-09', mood: '🔥', note: 'Crushed coding practice and solved 3 hard problems!', gratitude: 'Grateful for study group buddies' },
      { id: 'm-2', date: '2026-08-10', mood: '😌', note: 'Relaxed evening breathing session after exams', gratitude: 'Fresh air and healthy meals' },
      { id: 'm-3', date: '2026-08-11', mood: '⚡', note: 'Super productive hackathon building session!', gratitude: 'Awesome developer tools' }
    ],
    pomodoroCount: 12
  },
  finance: {
    monthlyBudget: 1200,
    expenses: [
      { id: 'exp-1', title: 'Textbooks & Software', amount: 85.00, category: 'Education', date: '2026-08-02' },
      { id: 'exp-2', title: 'Campus Coffee & Snacks', amount: 24.50, category: 'Food', date: '2026-08-05' },
      { id: 'exp-3', title: 'Subway Pass', amount: 45.00, category: 'Transport', date: '2026-08-07' },
      { id: 'exp-4', title: 'Gym Membership', amount: 30.00, category: 'Wellness', date: '2026-08-10' }
    ],
    savingsGoals: [
      { id: 'sg-1', title: 'MacBook Pro Fund', target: 2000, current: 1450, icon: '💻' },
      { id: 'sg-2', title: 'Hackathon Trip', target: 500, current: 380, icon: '🚀' }
    ]
  },
  gamification: {
    quests: [
      { id: 'q-1', title: 'Daily Wellness Check-in', desc: 'Log your mood & gratitude today', xp: 50, coins: 25, completed: true },
      { id: 'q-2', title: 'Focus Master', desc: 'Complete 1 Pomodoro session (25m)', xp: 75, coins: 40, completed: false },
      { id: 'q-3', title: 'Career Builder', desc: 'Update or move a job application', xp: 60, coins: 30, completed: false },
      { id: 'q-4', title: 'Financial Mindset', desc: 'Log a new expense or budget update', xp: 40, coins: 20, completed: true }
    ],
    rewardsStore: [
      { id: 'r-1', title: 'Cyberpunk Dark Theme', cost: 150, type: 'Theme', icon: '🎨', unlocked: true },
      { id: 'r-2', title: 'Grandmaster Badge', cost: 300, type: 'Badge', icon: '👑', unlocked: false },
      { id: 'r-3', title: 'Zen Soundpack', cost: 200, type: 'Audio', icon: '🎧', unlocked: true },
      { id: 'r-4', title: 'Neon Aura Effect', cost: 500, type: 'Visual', icon: '✨', unlocked: false }
    ]
  }
};

class StudivoStorage {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting to default seed data.', e);
    }
    this.saveState(defaultState);
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState(stateToSave) {
    const data = stateToSave || this.state;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  get() {
    return this.state;
  }

  update(pathStr, value) {
    const keys = pathStr.split('.');
    let current = this.state;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    this.saveState();
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.saveState();
    return this.state;
  }
}

const store = new StudivoStorage();
