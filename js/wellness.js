/* ==========================================
   STUDIVO WELLNESS SANCTUARY
   Web Audio Synthesizer, Pomodoro Timer, 4-7-8 Breathing & Mood Journal
   ========================================== */

class WellnessSanctuary {
  constructor(storage, gamificationEngine) {
    this.store = storage;
    this.gamification = gamificationEngine;
    
    // Pomodoro Timer State
    this.timerSeconds = 25 * 60;
    this.totalSeconds = 25 * 60;
    this.timerInterval = null;
    this.isRunning = false;

    // Web Audio Synthesizer State
    this.audioCtx = null;
    this.currentSoundNode = null;
    this.isAmbientPlaying = false;
    this.activeAmbientSound = null;

    // Breathing Controller State
    this.breathingInterval = null;
    this.isBreathingActive = false;
  }

  init() {
    this.renderMoodGrid();
    this.renderMoodHistory();
    this.updateTimerDisplay();
  }

  /* --- 1. Web Audio Synthesizer (Zero External Assets) --- */
  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleAmbient(soundType) {
    this.initAudioContext();

    if (this.isAmbientPlaying && this.activeAmbientSound === soundType) {
      this.stopAmbient();
      return;
    }

    this.stopAmbient();
    this.activeAmbientSound = soundType;
    this.isAmbientPlaying = true;

    // Highlight UI button
    document.querySelectorAll('.ambient-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`ambient-${soundType}`);
    if (btn) btn.classList.add('active');

    // Create synthesized audio graph based on type
    if (soundType === 'rain') {
      this.createRainSynth();
    } else if (soundType === 'waves') {
      this.createOceanWavesSynth();
    } else if (soundType === 'synth') {
      this.createDeepAmbientSynth();
    } else if (soundType === 'forest') {
      this.createForestWindSynth();
    }

    showToast(`Playing synthesized ${soundType} ambient audio 🎧`, 'info');
  }

  stopAmbient() {
    if (this.currentSoundNode) {
      try {
        this.currentSoundNode.stop();
        this.currentSoundNode.disconnect();
      } catch (e) {}
      this.currentSoundNode = null;
    }
    this.isAmbientPlaying = false;
    this.activeAmbientSound = null;
    document.querySelectorAll('.ambient-btn').forEach(btn => btn.classList.remove('active'));
  }

  createNoiseBuffer() {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  createRainSynth() {
    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = this.createNoiseBuffer();
    whiteNoise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    whiteNoise.start();
    this.currentSoundNode = whiteNoise;
  }

  createOceanWavesSynth() {
    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = this.createNoiseBuffer();
    whiteNoise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.audioCtx.currentTime);

    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.1, this.audioCtx.currentTime); // 10s wave cycle

    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(300, this.audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    whiteNoise.start();
    lfo.start();
    this.currentSoundNode = whiteNoise;
  }

  createDeepAmbientSynth() {
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, this.audioCtx.currentTime); // A2 chord
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(164.81, this.audioCtx.currentTime); // E3

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc1.start();
    osc2.start();
    this.currentSoundNode = osc1;
  }

  createForestWindSynth() {
    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = this.createNoiseBuffer();
    whiteNoise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3, this.audioCtx.currentTime);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    whiteNoise.start();
    this.currentSoundNode = whiteNoise;
  }

  playCompletionBeep() {
    this.initAudioContext();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.2);
  }

  /* --- 2. Focus Pomodoro Timer --- */
  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    const playBtn = document.getElementById('timer-play-btn');
    if (playBtn) playBtn.textContent = 'Pause ⏸';

    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.updateTimerDisplay();
      } else {
        this.onTimerComplete();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    const playBtn = document.getElementById('timer-play-btn');
    if (playBtn) playBtn.textContent = 'Start Focus ▶';
  }

  resetTimer(minutes = 25) {
    this.pauseTimer();
    this.totalSeconds = minutes * 60;
    this.timerSeconds = this.totalSeconds;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const timeEl = document.getElementById('timer-time-display');
    if (timeEl) timeEl.textContent = timeStr;

    const progressCircle = document.getElementById('timer-progress-ring');
    if (progressCircle) {
      const perimeter = 690;
      const progressRatio = this.timerSeconds / this.totalSeconds;
      const offset = perimeter * (1 - progressRatio);
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  onTimerComplete() {
    this.pauseTimer();
    this.playCompletionBeep();
    this.gamification.addXP(75, 'Completed Pomodoro Session');

    const state = this.store.get();
    state.wellness.pomodoroCount = (state.wellness.pomodoroCount || 0) + 1;
    this.store.saveState();

    // Check quest q-2
    const quest = state.gamification.quests.find(q => q.id === 'q-2');
    if (quest && !quest.completed) {
      this.gamification.completeQuest('q-2');
    }

    showToast('Pomodoro Complete! Take a 5 min break 🧘', 'success');
  }

  /* --- 3. 4-7-8 Breathing Visualizer --- */
  startBreathingExercise() {
    const orb = document.getElementById('breathing-orb-element');
    const phaseText = document.getElementById('breathing-phase-text');
    const startBtn = document.getElementById('breathing-start-btn');

    if (this.isBreathingActive) {
      this.stopBreathingExercise();
      return;
    }

    this.isBreathingActive = true;
    if (startBtn) startBtn.textContent = 'Stop Exercise ⏹';

    let step = 0; // 0: Inhale, 1: Hold, 2: Exhale
    const runCycle = () => {
      if (!this.isBreathingActive) return;

      if (step === 0) {
        if (phaseText) phaseText.textContent = 'Inhale deeply... (4s)';
        if (orb) orb.style.transform = 'scale(1.4)';
        setTimeout(() => { step = 1; runCycle(); }, 4000);
      } else if (step === 1) {
        if (phaseText) phaseText.textContent = 'Hold your breath... (7s)';
        setTimeout(() => { step = 2; runCycle(); }, 7000);
      } else if (step === 2) {
        if (phaseText) phaseText.textContent = 'Exhale completely... (8s)';
        if (orb) orb.style.transform = 'scale(1)';
        setTimeout(() => { 
          step = 0; 
          this.gamification.addXP(15, 'Breathing Cycle Completed');
          runCycle(); 
        }, 8000);
      }
    };

    runCycle();
  }

  stopBreathingExercise() {
    this.isBreathingActive = false;
    const orb = document.getElementById('breathing-orb-element');
    const phaseText = document.getElementById('breathing-phase-text');
    const startBtn = document.getElementById('breathing-start-btn');

    if (orb) orb.style.transform = 'scale(1)';
    if (phaseText) phaseText.textContent = 'Ready to begin';
    if (startBtn) startBtn.textContent = 'Start 4-7-8 Breathing ▶';
  }

  /* --- 4. Mood Tracker & Journal --- */
  renderMoodGrid() {
    const options = [
      { emoji: '🔥', label: 'Amazing' },
      { emoji: '😌', label: 'Relaxed' },
      { emoji: '⚡', label: 'Focused' },
      { emoji: '😐', label: 'Neutral' },
      { emoji: '🌧️', label: 'Stressed' }
    ];

    const container = document.getElementById('mood-options-container');
    if (!container) return;

    container.innerHTML = options.map(opt => `
      <div class="mood-option" onclick="wellnessSanctuary.selectMood('${opt.emoji}', this)">
        <span>${opt.emoji}</span>
        <span style="font-size: var(--text-xs); color: var(--text-muted);">${opt.label}</span>
      </div>
    `).join('');
  }

  selectMood(emoji, el) {
    document.querySelectorAll('.mood-option').forEach(item => item.classList.remove('selected'));
    el.classList.add('selected');
    this.selectedMoodEmoji = emoji;
  }

  saveMoodEntry(note, gratitude) {
    if (!this.selectedMoodEmoji) {
      showToast('Please select a mood emoji first!', 'warning');
      return;
    }

    const state = this.store.get();
    const newEntry = {
      id: `m-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      mood: this.selectedMoodEmoji,
      note: note || 'Reflected on today',
      gratitude: gratitude || 'Grateful for learning something new'
    };

    state.wellness.moods.unshift(newEntry);
    this.store.saveState();
    this.renderMoodHistory();
    this.gamification.addXP(50, 'Daily Mood Check-in');

    // Complete q-1 quest
    const quest = state.gamification.quests.find(q => q.id === 'q-1');
    if (quest && !quest.completed) {
      this.gamification.completeQuest('q-1');
    }

    showToast('Mood logged to wellness journal! 💚', 'success');
  }

  renderMoodHistory() {
    const container = document.getElementById('mood-history-container');
    if (!container) return;

    const moods = this.store.get().wellness.moods;
    container.innerHTML = moods.map(m => `
      <div class="glass-card" style="margin-bottom: var(--space-3);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span style="font-size: 1.8rem;">${m.mood}</span>
            <div>
              <h4 style="font-size: var(--text-sm);">${m.note}</h4>
              <p style="font-size: var(--text-xs); color: var(--text-muted);">✨ ${m.gratitude}</p>
            </div>
          </div>
          <span style="font-size: var(--text-xs); color: var(--text-dim);">${m.date}</span>
        </div>
      </div>
    `).join('');
  }
}

const wellnessSanctuary = new WellnessSanctuary(store, gamification);
