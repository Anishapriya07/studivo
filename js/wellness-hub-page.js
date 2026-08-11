/* ==========================================
   STUDIVO WELLNESS HUB PAGE CONTROLLER
   Mood Tracker, Journal, Habit Tracker, Water Counter, CSS Breathing & LocalStorage
   ========================================== */

const WELLNESS_STORAGE_KEY = 'studivo_wellness_hub_v1';

const defaultWellnessState = {
  selectedMood: '😌',
  moodScore: 80,
  journalEntries: [
    { id: 'j-1', date: '2026-08-10', mood: '😌', note: 'Had a super productive focus session today.', gratitude: 'Grateful for good coffee and quiet study spaces.' },
    { id: 'j-2', date: '2026-08-11', mood: '🔥', note: 'Felt super energized coding my hackathon project!', gratitude: 'Grateful for supportive dev friends.' }
  ],
  habits: [
    { id: 'h-1', title: 'Sleep 8 Hours', done: true },
    { id: 'h-2', title: '30 Min Morning Exercise', done: true },
    { id: 'h-3', title: '10 Min Mindfulness Meditation', done: false },
    { id: 'h-4', title: 'Read 15 Pages of a Book', done: true },
    { id: 'h-5', title: 'No Screens 30 Min Before Bed', done: false }
  ],
  waterGlasses: 5, // out of 8 (2000ml)
  motivationIdx: 0
};

const motivationQuotes = [
  { quote: "Small daily habits lead to extraordinary long-term transformations.", author: "James Clear" },
  { quote: "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.", author: "Anonymous" },
  { quote: "Focus on progress, not perfection.", author: "Bill Phillips" },
  { quote: "Take care of your mind, and your mind will take care of your goals.", author: "Studivo Wellness" }
];

class WellnessHubPage {
  constructor() {
    this.state = this.loadState();
    this.isBreathingActive = false;
  }

  loadState() {
    try {
      const saved = localStorage.getItem(WELLNESS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load wellness state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultWellnessState));
  }

  saveState() {
    try {
      localStorage.setItem(WELLNESS_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save wellness state', e);
    }
  }

  init() {
    this.renderMotivation();
    this.renderMoodTracker();
    this.renderWaterTracker();
    this.renderHabits();
    this.renderJournal();
    this.renderWeeklyProgress();
  }

  /* --- 1. Daily Motivation Card --- */
  renderMotivation() {
    const quoteEl = document.getElementById('motivation-quote-text');
    const authorEl = document.getElementById('motivation-author-text');
    const item = motivationQuotes[this.state.motivationIdx % motivationQuotes.length];

    if (quoteEl) quoteEl.textContent = `"${item.quote}"`;
    if (authorEl) authorEl.textContent = `— ${item.author}`;
  }

  nextMotivation() {
    this.state.motivationIdx = (this.state.motivationIdx + 1) % motivationQuotes.length;
    this.saveState();
    this.renderMotivation();
  }

  /* --- 2. Animated Mood Tracker --- */
  renderMoodTracker() {
    const moods = [
      { emoji: '🔥', label: 'Amazing', score: 100 },
      { emoji: '😌', label: 'Relaxed', score: 85 },
      { emoji: '⚡', label: 'Energized', score: 90 },
      { emoji: '😐', label: 'Neutral', score: 60 },
      { emoji: '🌧️', label: 'Stressed', score: 40 }
    ];

    const container = document.getElementById('mood-selector-grid');
    if (!container) return;

    container.innerHTML = moods.map(m => {
      const isSelected = this.state.selectedMood === m.emoji;
      return `
        <div class="glass-card mood-card-item ${isSelected ? 'selected' : ''}" 
             onclick="wellnessHubPage.selectMood('${m.emoji}', ${m.score})">
          <span class="animated-mood-emoji">${m.emoji}</span>
          <span style="font-size: var(--text-xs); font-weight: bold; margin-top: 4px;">${m.label}</span>
        </div>
      `;
    }).join('');
  }

  selectMood(emoji, score) {
    this.state.selectedMood = emoji;
    this.state.moodScore = score;
    this.saveState();
    this.renderMoodTracker();
    this.renderWeeklyProgress();
  }

  /* --- 3. Water Intake Tracker --- */
  renderWaterTracker() {
    const count = this.state.waterGlasses || 0;
    const totalMl = count * 250;
    const targetMl = 2000;
    const pct = Math.min(100, Math.round((totalMl / targetMl) * 100));

    const mlTextEl = document.getElementById('water-ml-text');
    const pctTextEl = document.getElementById('water-pct-text');
    const progressEl = document.getElementById('water-progress-bar');
    const gridContainer = document.getElementById('water-glasses-grid');

    if (mlTextEl) mlTextEl.textContent = `${totalMl} / ${targetMl} ml`;
    if (pctTextEl) pctTextEl.textContent = `${pct}% of daily target`;
    if (progressEl) progressEl.style.width = `${pct}%`;

    if (gridContainer) {
      let glassesHtml = '';
      for (let i = 1; i <= 8; i++) {
        const isFilled = i <= count;
        glassesHtml += `
          <div class="water-glass-icon ${isFilled ? 'filled' : ''}" onclick="wellnessHubPage.toggleGlass(${i})">
            💧
          </div>
        `;
      }
      gridContainer.innerHTML = glassesHtml;
    }
  }

  toggleGlass(idx) {
    if (this.state.waterGlasses === idx) {
      this.state.waterGlasses = idx - 1;
    } else {
      this.state.waterGlasses = idx;
    }
    this.saveState();
    this.renderWaterTracker();
    this.renderWeeklyProgress();
  }

  resetWater() {
    this.state.waterGlasses = 0;
    this.saveState();
    this.renderWaterTracker();
    this.renderWeeklyProgress();
  }

  /* --- 4. Habit Tracker Checklist --- */
  renderHabits() {
    const container = document.getElementById('habits-list-container');
    if (!container) return;

    const habits = this.state.habits;
    container.innerHTML = habits.map(h => `
      <label class="glass-card" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; padding: var(--space-4);">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <input type="checkbox" ${h.done ? 'checked' : ''} onchange="wellnessHubPage.toggleHabit('${h.id}')" style="width: 20px; height: 20px; accent-color: var(--brand-accent);">
          <span style="font-size: var(--text-sm); font-weight: 600; ${h.done ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${h.title}</span>
        </div>
        <span class="badge ${h.done ? 'badge-success' : 'badge-primary'}">${h.done ? 'Completed ✓' : 'Pending'}</span>
      </label>
    `).join('');
  }

  toggleHabit(habitId) {
    const h = this.state.habits.find(item => item.id === habitId);
    if (h) {
      h.done = !h.done;
      this.saveState();
      this.renderHabits();
      this.renderWeeklyProgress();
    }
  }

  addCustomHabit(title) {
    if (!title.trim()) return;
    this.state.habits.push({
      id: `h-${Date.now()}`,
      title: title.trim(),
      done: false
    });
    this.saveState();
    this.renderHabits();
    this.renderWeeklyProgress();
  }

  /* --- 5. Daily Journal --- */
  saveJournalEntry(note, gratitude) {
    if (!note.trim() && !gratitude.trim()) return;

    const entry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      mood: this.state.selectedMood,
      note: note.trim() || 'Reflection recorded',
      gratitude: gratitude.trim() || 'Grateful for peace of mind'
    };

    this.state.journalEntries.unshift(entry);
    this.saveState();
    this.renderJournal();
    this.renderWeeklyProgress();

    // Clear inputs
    const noteEl = document.getElementById('journal-note-input');
    const gratEl = document.getElementById('journal-gratitude-input');
    if (noteEl) noteEl.value = '';
    if (gratEl) gratEl.value = '';
  }

  renderJournal() {
    const container = document.getElementById('journal-history-container');
    if (!container) return;

    const entries = this.state.journalEntries;
    if (entries.length === 0) {
      container.innerHTML = `<div class="text-muted" style="text-align:center; padding: var(--space-4);">No journal entries logged yet.</div>`;
      return;
    }

    container.innerHTML = entries.map(e => `
      <div class="glass-card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <span style="font-size: 1.5rem;">${e.mood}</span>
            <h4 style="font-size: var(--text-sm);">${e.note}</h4>
          </div>
          <span style="font-size: 0.7rem; color: var(--text-dim);">${e.date}</span>
        </div>
        <p style="font-size: var(--text-xs); color: var(--brand-accent);">✨ ${e.gratitude}</p>
      </div>
    `).join('');
  }

  /* --- 6. Pure CSS Breathing Visualizer --- */
  toggleCSSBreathing() {
    const orb = document.getElementById('css-breathing-orb');
    const btn = document.getElementById('css-breathing-btn');
    const phaseText = document.getElementById('css-breathing-phase');

    if (this.isBreathingActive) {
      this.isBreathingActive = false;
      if (orb) orb.classList.remove('active-breathing-css');
      if (btn) btn.textContent = 'Start CSS Breathing ▶';
      if (phaseText) phaseText.textContent = 'Paused';
    } else {
      this.isBreathingActive = true;
      if (orb) orb.classList.add('active-breathing-css');
      if (btn) btn.textContent = 'Pause Exercise ⏹';
      if (phaseText) phaseText.textContent = 'Follow the circle rhythm...';
    }
  }

  /* --- 7. Weekly Wellness Progress Calculator --- */
  renderWeeklyProgress() {
    const moodScore = this.state.moodScore || 70;
    const waterScore = Math.min(100, Math.round(((this.state.waterGlasses || 0) / 8) * 100));
    
    const totalHabits = this.state.habits.length || 1;
    const doneHabits = this.state.habits.filter(h => h.done).length;
    const habitScore = Math.round((doneHabits / totalHabits) * 100);

    const overallScore = Math.round((moodScore * 0.35) + (waterScore * 0.30) + (habitScore * 0.35));

    const scoreEl = document.getElementById('weekly-progress-score');
    const ringEl = document.getElementById('weekly-progress-ring');
    const habitSummaryEl = document.getElementById('weekly-habit-summary');

    if (scoreEl) scoreEl.textContent = `${overallScore}%`;
    if (ringEl) {
      const perimeter = 314;
      const offset = perimeter * (1 - overallScore / 100);
      ringEl.style.strokeDashoffset = offset;
    }
    if (habitSummaryEl) habitSummaryEl.textContent = `${doneHabits} of ${totalHabits} daily habits completed`;
  }
}

let wellnessHubPage;
document.addEventListener('DOMContentLoaded', () => {
  wellnessHubPage = new WellnessHubPage();
  wellnessHubPage.init();

  // Scroll reveal observer
  const elements = document.querySelectorAll('.glass-panel, .glass-card, .mood-card-item');
  elements.forEach(el => el.classList.add('reveal-on-scroll'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
});
