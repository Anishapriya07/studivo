/* ==========================================
   STUDIVO CAREER HUB
   Kanban Application Tracker, Skill Matrix & Flashcards
   ========================================== */

class CareerHub {
  constructor(storage, gamificationEngine) {
    this.store = storage;
    this.gamification = gamificationEngine;
    this.currentFlashcardIdx = 0;
  }

  init() {
    this.renderKanban();
    this.renderSkills();
    this.renderFlashcard();
  }

  /* --- 1. Job/Internship Kanban Tracker --- */
  renderKanban() {
    const kanbanData = this.store.get().career.kanban;
    const stages = ['saved', 'applied', 'interview', 'offer'];
    
    stages.forEach(stage => {
      const colEl = document.getElementById(`kanban-col-${stage}`);
      const countEl = document.getElementById(`kanban-count-${stage}`);
      if (!colEl) return;

      const stageCards = kanbanData.filter(item => item.stage === stage);
      if (countEl) countEl.textContent = stageCards.length;

      colEl.innerHTML = stageCards.map(item => `
        <div class="kanban-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="job-company">${item.company}</span>
            <button class="btn btn-ghost btn-sm" onclick="careerHub.deleteJob('${item.id}')" title="Delete">✕</button>
          </div>
          <div class="job-title">${item.role}</div>
          <div class="badge badge-primary" style="font-size: 0.7rem; margin-top: 4px;">${item.salary}</div>
          <div class="job-meta">
            <span>📅 ${item.date}</span>
            <select class="input-control" style="padding: 2px 6px; font-size: 0.7rem; width: auto;" onchange="careerHub.moveJob('${item.id}', this.value)">
              <option value="saved" ${item.stage === 'saved' ? 'selected' : ''}>Saved</option>
              <option value="applied" ${item.stage === 'applied' ? 'selected' : ''}>Applied</option>
              <option value="interview" ${item.stage === 'interview' ? 'selected' : ''}>Interview</option>
              <option value="offer" ${item.stage === 'offer' ? 'selected' : ''}>Offer 🎉</option>
            </select>
          </div>
        </div>
      `).join('');
    });
  }

  addJob(company, role, stage, salary) {
    const kanbanData = this.store.get().career.kanban;
    const newJob = {
      id: `job-${Date.now()}`,
      company,
      role,
      stage,
      salary: salary || 'N/A',
      date: new Date().toISOString().split('T')[0]
    };

    kanbanData.push(newJob);
    this.store.saveState();
    this.renderKanban();
    this.gamification.addXP(25, 'Added New Application');
    showToast(`Added ${role} at ${company}!`, 'success');
  }

  moveJob(jobId, newStage) {
    const kanbanData = this.store.get().career.kanban;
    const job = kanbanData.find(j => j.id === jobId);
    if (job) {
      job.stage = newStage;
      this.store.saveState();
      this.renderKanban();
      this.gamification.addXP(15, 'Updated Application Pipeline');
      
      // Auto trigger quest check
      const quest = this.store.get().gamification.quests.find(q => q.id === 'q-3');
      if (quest && !quest.completed) {
        this.gamification.completeQuest('q-3');
      }
    }
  }

  deleteJob(jobId) {
    const careerState = this.store.get().career;
    careerState.kanban = careerState.kanban.filter(j => j.id !== jobId);
    this.store.saveState();
    this.renderKanban();
    showToast('Application deleted', 'info');
  }

  /* --- 2. Skill Matrix --- */
  renderSkills() {
    const container = document.getElementById('skills-list-container');
    if (!container) return;

    const skills = this.store.get().career.skills;
    container.innerHTML = skills.map(sk => `
      <div class="glass-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
          <div>
            <h4 style="font-size: var(--text-base);">${sk.name}</h4>
            <span class="badge badge-primary" style="font-size: 0.65rem;">${sk.category}</span>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-accent">Lvl ${sk.level}</span>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden; margin: var(--space-3) 0;">
          <div style="width: ${sk.progress}%; height: 100%; background: var(--gradient-primary); border-radius: 4px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2);">
          <span style="font-size: var(--text-xs); color: var(--text-muted);">${sk.progress}% Mastery</span>
          <button class="btn btn-sm btn-secondary" onclick="careerHub.practiceSkill('${sk.id}')">Practice (+20 XP)</button>
        </div>
      </div>
    `).join('');
  }

  practiceSkill(skillId) {
    const skills = this.store.get().career.skills;
    const sk = skills.find(s => s.id === skillId);
    if (sk) {
      sk.progress += 15;
      if (sk.progress >= 100) {
        sk.level += 1;
        sk.progress = sk.progress - 100;
        showToast(`Level Up! ${sk.name} is now Level ${sk.level}! 🎉`, 'success');
      }
      this.store.saveState();
      this.renderSkills();
      this.gamification.addXP(20, `Practiced ${sk.name}`);
    }
  }

  addSkill(name, category) {
    const skills = this.store.get().career.skills;
    skills.push({
      id: `sk-${Date.now()}`,
      name,
      category,
      level: 1,
      progress: 10
    });
    this.store.saveState();
    this.renderSkills();
    this.gamification.addXP(30, 'Added New Skill Goal');
    showToast(`Added ${name} to Skill Matrix!`, 'success');
  }

  /* --- 3. Interview Flashcards --- */
  renderFlashcard() {
    const flashcards = this.store.get().career.flashcards;
    const cardContainer = document.getElementById('flashcard-element');
    const qEl = document.getElementById('flashcard-question');
    const aEl = document.getElementById('flashcard-answer');
    const topicEl = document.getElementById('flashcard-topic');
    const countEl = document.getElementById('flashcard-counter');

    if (!cardContainer || flashcards.length === 0) return;

    // Reset flip state
    cardContainer.classList.remove('flipped');

    const card = flashcards[this.currentFlashcardIdx];
    if (qEl) qEl.textContent = card.question;
    if (aEl) aEl.textContent = card.answer;
    if (topicEl) topicEl.textContent = `${card.topic} • ${card.confidence.toUpperCase()}`;
    if (countEl) countEl.textContent = `Card ${this.currentFlashcardIdx + 1} of ${flashcards.length}`;
  }

  toggleFlashcardFlip() {
    const cardContainer = document.getElementById('flashcard-element');
    if (cardContainer) {
      cardContainer.classList.toggle('flipped');
    }
  }

  nextFlashcard() {
    const flashcards = this.store.get().career.flashcards;
    this.currentFlashcardIdx = (this.currentFlashcardIdx + 1) % flashcards.length;
    this.renderFlashcard();
  }

  prevFlashcard() {
    const flashcards = this.store.get().career.flashcards;
    this.currentFlashcardIdx = (this.currentFlashcardIdx - 1 + flashcards.length) % flashcards.length;
    this.renderFlashcard();
  }

  markFlashcard(confidence) {
    const flashcards = this.store.get().career.flashcards;
    const card = flashcards[this.currentFlashcardIdx];
    if (card) {
      card.confidence = confidence;
      this.store.saveState();
      this.gamification.addXP(10, 'Reviewed Flashcard');
      this.nextFlashcard();
    }
  }
}

const careerHub = new CareerHub(store, gamification);
