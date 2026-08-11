/* ==========================================
   STUDIVO CAREER HUB PAGE CONTROLLER
   Interactive Roadmaps, Skill Checklists, Resume/Portfolio Tracker & LocalStorage
   ========================================== */

const CAREER_STORAGE_KEY = 'studivo_career_roadmaps_v1';

// Career Roadmaps Data Definition
const careerRoadmaps = {
  web_dev: {
    id: 'web_dev',
    title: 'Web Developer',
    icon: '🌐',
    salary: '$85,000 - $140,000 / yr',
    demand: 'High Demand 🔥',
    desc: 'Master full-stack web applications, modern APIs, frontend responsiveness, and cloud deployment.',
    color: '#6366F1',
    timeline: [
      { phase: 'Phase 1 (Month 1-2)', title: 'Foundations & Semantic HTML/CSS', desc: 'Master Flexbox, Grid, CSS Variables, Responsive Layouts, and basic DOM JS.' },
      { phase: 'Phase 2 (Month 3-4)', title: 'Modern JavaScript & Async APIs', desc: 'Deep dive into ES6+, Promises, Async/Await, Fetch API, and LocalStorage architecture.' },
      { phase: 'Phase 3 (Month 5)', title: 'Frontend Frameworks & Build Tools', desc: 'State management, component architecture, Vite, and Git workflow.' },
      { phase: 'Phase 4 (Month 6)', title: 'Full-Stack Integration & Deployment', desc: 'Node.js/Express basics, REST APIs, database queries, and Vercel/Netlify hosting.' }
    ],
    skills: [
      { id: 'wd_sk1', name: 'HTML5 Semantic Markup & SEO Best Practices' },
      { id: 'wd_sk2', name: 'CSS3 Flexbox, Grid, & CSS Variables' },
      { id: 'wd_sk3', name: 'Vanilla JavaScript DOM Manipulation & ES6+' },
      { id: 'wd_sk4', name: 'Asynchronous JS, Promises & Fetch API' },
      { id: 'wd_sk5', name: 'State Management & LocalStorage Persistence' },
      { id: 'wd_sk6', name: 'Git & GitHub Version Control Workflows' }
    ],
    resumeChecklist: [
      { id: 'wd_res1', name: 'Include live demo URLs for top 3 projects' },
      { id: 'wd_res2', name: 'Quantify impact (e.g. "Improved page load time by 40%")' },
      { id: 'wd_res3', name: 'Highlight clean Git commit history & GitHub link' }
    ],
    portfolioChecklist: [
      { id: 'wd_port1', name: 'Responsive E-Commerce / SaaS Landing Page' },
      { id: 'wd_port2', name: 'Interactive Productivity Dashboard with LocalStorage' },
      { id: 'wd_port3', name: 'Full-Stack Web App with REST API Integration' }
    ],
    projects: [
      { name: 'Studivo Productivity Suite', diff: 'Intermediate', desc: 'Build a gamified student dashboard using native Vanilla Web APIs.' },
      { name: 'Real-time Weather & Air Quality Hub', diff: 'Beginner', desc: 'Fetch third-party API data and render SVG charts.' },
      { name: 'Collaborative Task Kanban Board', diff: 'Advanced', desc: 'Drag-and-drop Kanban board with persistent user state.' }
    ],
    interviewQA: [
      { q: 'Explain Event Delegation in JavaScript.', a: 'Event delegation uses event bubbling to handle events at a higher level in the DOM rather than binding handlers to multiple child elements.' },
      { q: 'What is the difference between localStorage, sessionStorage, and Cookies?', a: 'LocalStorage persists until cleared; SessionStorage lasts for the tab session; Cookies travel with every HTTP request and have expiration dates.' },
      { q: 'How does the CSS Box Model work?', a: 'The CSS Box Model comprises Content, Padding, Border, and Margin. box-sizing: border-box includes padding and border within the element total width.' }
    ]
  },

  ui_ux: {
    id: 'ui_ux',
    title: 'UI/UX Designer',
    icon: '🎨',
    salary: '$80,000 - $135,000 / yr',
    demand: 'Very High 🔥',
    desc: 'Craft intuitive user interfaces, design systems, wireframes, high-fidelity prototypes, and user research.',
    color: '#EC4899',
    timeline: [
      { phase: 'Phase 1 (Month 1-2)', title: 'Design Principles & Typography', desc: 'Color theory, visual hierarchy, grid systems, and typography scales.' },
      { phase: 'Phase 2 (Month 3-4)', title: 'Figma & Interactive Prototyping', desc: 'Components, Auto Layout, variants, dynamic micro-interactions, and design systems.' },
      { phase: 'Phase 3 (Month 5)', title: 'User Research & Wireframing', desc: 'User personas, journey mapping, usability testing, and wireframe iterations.' },
      { phase: 'Phase 4 (Month 6)', title: 'Portfolio Case Studies & Handoff', desc: 'Structuring detailed case studies and developer handoff documentation.' }
    ],
    skills: [
      { id: 'ux_sk1', name: 'Figma Auto Layout, Variants & Design Tokens' },
      { id: 'ux_sk2', name: 'User Journey Mapping & Persona Creation' },
      { id: 'ux_sk3', name: 'High-Fidelity Interactive Prototyping' },
      { id: 'ux_sk4', name: 'Accessibility (WCAG 2.1) & Color Contrast Standards' },
      { id: 'ux_sk5', name: 'Usability Testing & Iterative Design Refinement' }
    ],
    resumeChecklist: [
      { id: 'ux_res1', name: 'Link to published Behance or Figma portfolio site' },
      { id: 'ux_res2', name: 'Highlight design process and user testing results' }
    ],
    portfolioChecklist: [
      { id: 'ux_port1', name: 'Mobile Banking / Finance App Redesign Case Study' },
      { id: 'ux_port2', name: 'Complete Multi-Tier Design System Specification' }
    ],
    projects: [
      { name: 'Student Wellness App Redesign', diff: 'Intermediate', desc: 'Redesign a mental wellness mobile app focusing on dark-mode glassmorphism.' },
      { name: 'E-Commerce Handoff & UI Kit', diff: 'Advanced', desc: 'Create a full component UI kit with accessible contrast tokens.' }
    ],
    interviewQA: [
      { q: 'How do you handle developer handoff?', a: 'By organizing clear Figma components, defining design tokens for spacing/color, and writing precise specification notes.' },
      { q: 'What is the difference between UX and UI?', a: 'UX focuses on user journey, usability, and problem-solving. UI focuses on visual aesthetics, typography, color, and polish.' }
    ]
  },

  data_analyst: {
    id: 'data_analyst',
    title: 'Data Analyst',
    icon: '📊',
    salary: '$75,000 - $125,000 / yr',
    demand: 'High Demand 🔥',
    desc: 'Transform raw data into strategic insights using SQL, Python, Pandas, Tableau, and visual charts.',
    color: '#10B981',
    timeline: [
      { phase: 'Phase 1 (Month 1-2)', title: 'Excel & Advanced SQL Queries', desc: 'JOINs, CTEs, window functions, aggregation, and data cleaning.' },
      { phase: 'Phase 2 (Month 3-4)', title: 'Python for Data Analysis', desc: 'Pandas, NumPy, Matplotlib, and data wrangling techniques.' },
      { phase: 'Phase 3 (Month 5)', title: 'Data Visualization & Tableau/PowerBI', desc: 'Building dynamic dashboards and executive KPI summaries.' },
      { phase: 'Phase 4 (Month 6)', title: 'Statistical Modeling & Reporting', desc: 'Hypothesis testing, regression models, and presenting actionable insights.' }
    ],
    skills: [
      { id: 'da_sk1', name: 'Advanced SQL (Window functions, CTEs, Joins)' },
      { id: 'da_sk2', name: 'Python Data Libraries (Pandas, NumPy)' },
      { id: 'da_sk3', name: 'Data Visualization (Matplotlib, Seaborn, Tableau)' },
      { id: 'da_sk4', name: 'Data Cleaning & Handling Missing Values' },
      { id: 'da_sk5', name: 'Statistical Analysis & A/B Testing Fundamentals' }
    ],
    resumeChecklist: [
      { id: 'da_res1', name: 'Include links to GitHub data analysis notebooks' },
      { id: 'da_res2', name: 'Show business value (e.g. "Identified $50k cost savings")' }
    ],
    portfolioChecklist: [
      { id: 'da_port1', name: 'Global Tech Salary Analysis & Visual Dashboard' },
      { id: 'da_port2', name: 'Customer Churn Prediction Notebook' }
    ],
    projects: [
      { name: 'Student Academic Performance Analysis', diff: 'Beginner', desc: 'Analyze test scores and attendance using Pandas and SQL.' },
      { name: 'E-Commerce Sales Insights Dashboard', diff: 'Intermediate', desc: 'Build an interactive SQL & Tableau reporting dashboard.' }
    ],
    interviewQA: [
      { q: 'What is the difference between WHERE and HAVING in SQL?', a: 'WHERE filters rows before aggregation occurs; HAVING filters aggregated group results after GROUP BY.' },
      { q: 'How do you handle missing values in a dataset?', a: 'Options include removing incomplete rows, imputing values using mean/median/mode, or using model-based imputation.' }
    ]
  },

  software_engineer: {
    id: 'software_engineer',
    title: 'Software Engineer',
    icon: '💻',
    salary: '$95,000 - $160,000 / yr',
    demand: 'Extremely High 🔥',
    desc: 'Architect scalable backend systems, master Data Structures & Algorithms, OOP, and distributed systems.',
    color: '#8B5CF6',
    timeline: [
      { phase: 'Phase 1 (Month 1-2)', title: 'Data Structures & Algorithms Mastery', desc: 'Arrays, HashTables, Trees, Graphs, Sorting, and Big-O Time Complexity.' },
      { phase: 'Phase 2 (Month 3-4)', title: 'Object-Oriented & System Design', desc: 'SOLID principles, design patterns, microservices vs monoliths.' },
      { phase: 'Phase 3 (Month 5)', title: 'Database Design & API Architecture', desc: 'PostgreSQL, Redis caching, RESTful API design, and authentication.' },
      { phase: 'Phase 4 (Month 6)', title: 'Testing, CI/CD & Deployment', desc: 'Unit testing, Docker containers, CI/CD pipelines, and cloud hosting.' }
    ],
    skills: [
      { id: 'se_sk1', name: 'Data Structures & Algorithms (LeetCode Medium/Hard)' },
      { id: 'se_sk2', name: 'Object-Oriented Programming (OOP) & SOLID Principles' },
      { id: 'se_sk3', name: 'Relational & NoSQL Databases (PostgreSQL, Redis)' },
      { id: 'se_sk4', name: 'REST & GraphQL API Architecture' },
      { id: 'se_sk5', name: 'Docker Containerization & CI/CD Fundamentals' }
    ],
    resumeChecklist: [
      { id: 'se_res1', name: 'Highlight production system metrics and throughput' },
      { id: 'se_res2', name: 'Include LeetCode / Competitive Programming profile' }
    ],
    portfolioChecklist: [
      { id: 'se_port1', name: 'Distributed Caching System Engine' },
      { id: 'se_port2', name: 'Scalable Microservice Backend with Auth' }
    ],
    projects: [
      { name: 'High-Throughput URL Shortener', diff: 'Intermediate', desc: 'Build a scalable shortener service with Redis caching.' },
      { name: 'Real-Time Messaging Engine', diff: 'Advanced', desc: 'Implement WebSocket servers with pub/sub architecture.' }
    ],
    interviewQA: [
      { q: 'Explain the difference between SQL and NoSQL databases.', a: 'SQL databases are relational, structured, and use fixed schemas. NoSQL databases are non-relational, document/key-value based, and horizontally scalable.' },
      { q: 'What is a Race Condition and how do you prevent it?', a: 'A race condition occurs when concurrent threads access shared data simultaneously. Prevent it using locks, mutexes, or atomic transactions.' }
    ]
  },

  cybersecurity: {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    icon: '🛡️',
    salary: '$90,000 - $150,000 / yr',
    demand: 'Critical Demand 🔥',
    desc: 'Protect network infrastructure, conduct vulnerability penetration testing, incident response, and ethical hacking.',
    color: '#06B6D4',
    timeline: [
      { phase: 'Phase 1 (Month 1-2)', title: 'Networking Fundamentals & Protocols', desc: 'TCP/IP, OSI model, DNS, Wireshark packet analysis, and firewalls.' },
      { phase: 'Phase 2 (Month 3-4)', title: 'Linux System Administration & Scripting', desc: 'Linux CLI, Bash scripting, Python automation, and permission security.' },
      { phase: 'Phase 3 (Month 5)', title: 'Ethical Hacking & Vulnerability Scans', desc: 'Nmap, Metasploit, OWASP Top 10 web security, and penetration testing.' },
      { phase: 'Phase 4 (Month 6)', title: 'SIEM, Incident Response & Certifications', desc: 'Splunk, Security+, CEH exam prep, and threat analysis.' }
    ],
    skills: [
      { id: 'cs_sk1', name: 'TCP/IP Networking & Wireshark Packet Analysis' },
      { id: 'cs_sk2', name: 'Linux System Security & Bash/Python Automation' },
      { id: 'cs_sk3', name: 'OWASP Top 10 Web Vulnerabilities (SQLi, XSS, CSRF)' },
      { id: 'cs_sk4', name: 'SIEM Tools (Splunk, Elastic SIEM) & Log Monitoring' },
      { id: 'cs_sk5', name: 'Penetration Testing Tools (Nmap, Metasploit, Burp Suite)' }
    ],
    resumeChecklist: [
      { id: 'cs_res1', name: 'List certifications (CompTIA Security+, CEH, EJPT)' },
      { id: 'cs_res2', name: 'Include TryHackMe / HackTheBox ranks' }
    ],
    portfolioChecklist: [
      { id: 'cs_port1', name: 'Vulnerability Audit & Mitigation Report' },
      { id: 'cs_port2', name: 'Automated Port Scanner & Vulnerability Script' }
    ],
    projects: [
      { name: 'Network Traffic Anomaly Detector', diff: 'Intermediate', desc: 'Use Python to inspect PCAP files and flag suspicious IPs.' },
      { name: 'OWASP Security Lab Setup', diff: 'Advanced', desc: 'Deploy a intentionally vulnerable web app and document exploits.' }
    ],
    interviewQA: [
      { q: 'What is the difference between Symmetric and Asymmetric Encryption?', a: 'Symmetric encryption uses a single secret key for encryption and decryption. Asymmetric uses a public key to encrypt and a private key to decrypt.' },
      { q: 'Explain how a SQL Injection attack works.', a: 'SQL Injection occurs when unsanitized user input is directly concatenated into a SQL query, allowing attackers to execute malicious database commands.' }
    ]
  }
};

class CareerHubPage {
  constructor() {
    this.state = this.loadState();
    this.activeCareerId = 'web_dev';
  }

  loadState() {
    try {
      const saved = localStorage.getItem(CAREER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read career state from localStorage', e);
    }
    return {}; // Object mapping item IDs to boolean true/false
  }

  saveState() {
    try {
      localStorage.setItem(CAREER_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save career state', e);
    }
  }

  init() {
    this.renderCards();
    this.renderActiveRoadmap();
  }

  renderCards() {
    const container = document.getElementById('career-cards-grid');
    if (!container) return;

    const ids = Object.keys(careerRoadmaps);
    container.innerHTML = ids.map(id => {
      const road = careerRoadmaps[id];
      const pct = this.calculateRoadmapProgress(id);
      const isActive = this.activeCareerId === id;

      return `
        <div class="glass-panel glass-panel-interactive career-explorer-card ${isActive ? 'active' : ''}" 
             onclick="careerHubPage.selectCareer('${id}')"
             style="${isActive ? `border-color: ${road.color}; box-shadow: 0 0 25px ${road.color}40;` : ''}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3);">
            <div class="career-card-icon" style="background: ${road.color}20; color: ${road.color};">${road.icon}</div>
            <span class="badge badge-primary" style="font-size: 0.65rem;">${road.demand}</span>
          </div>
          <h3 style="font-size: var(--text-xl); margin-bottom: 4px;">${road.title}</h3>
          <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-4);">${road.desc}</p>
          
          <div style="font-size: var(--text-xs); font-weight: bold; color: ${road.color}; margin-bottom: var(--space-2);">
            💵 ${road.salary}
          </div>

          <!-- Mini Progress Bar -->
          <div style="margin-top: var(--space-3);">
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; margin-bottom: 4px;">
              <span class="text-muted">Roadmap Mastery</span>
              <span style="font-weight: bold; color: var(--text-main);">${pct}%</span>
            </div>
            <div style="background: rgba(255,255,255,0.06); height: 6px; border-radius: 3px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: ${road.color}; transition: width 0.5s ease;"></div>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: var(--space-4);">Explore Roadmap →</button>
        </div>
      `;
    }).join('');
  }

  selectCareer(id) {
    this.activeCareerId = id;
    this.renderCards();
    this.renderActiveRoadmap();

    // Scroll to roadmap section smoothly
    const roadmapEl = document.getElementById('roadmap-detail-section');
    if (roadmapEl) {
      roadmapEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  calculateRoadmapProgress(id) {
    const road = careerRoadmaps[id];
    if (!road) return 0;

    const allItems = [
      ...road.skills.map(s => s.id),
      ...road.resumeChecklist.map(r => r.id),
      ...road.portfolioChecklist.map(p => p.id)
    ];

    if (allItems.length === 0) return 0;
    const completedCount = allItems.filter(itemId => !!this.state[itemId]).length;
    return Math.round((completedCount / allItems.length) * 100);
  }

  renderActiveRoadmap() {
    const road = careerRoadmaps[this.activeCareerId];
    const container = document.getElementById('roadmap-detail-section');
    if (!container || !road) return;

    const pct = this.calculateRoadmapProgress(this.activeCareerId);

    container.innerHTML = `
      <div class="glass-panel" style="padding: var(--space-8); position: relative; overflow: hidden;">
        
        <!-- Header Banner -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div style="width: 64px; height: 64px; border-radius: var(--radius-lg); background: ${road.color}25; border: 1px solid ${road.color}50; color: ${road.color}; display: flex; align-items: center; justify-content: center; font-size: 2.2rem;">
              ${road.icon}
            </div>
            <div>
              <span class="badge badge-accent">${road.demand}</span>
              <h2 style="font-size: var(--text-3xl); margin-top: 4px;">${road.title} Roadmap</h2>
              <p style="font-size: var(--text-sm); color: var(--text-muted);">${road.desc}</p>
            </div>
          </div>

          <!-- Master Progress Circle / Widget -->
          <div class="glass-card" style="text-align: center; min-width: 200px; border-color: ${road.color}40;">
            <span style="font-size: var(--text-xs); color: var(--text-muted);">Overall Roadmap Progress</span>
            <h1 style="color: ${road.color}; font-size: var(--text-4xl); margin: 4px 0;">${pct}%</h1>
            <div style="background: rgba(255,255,255,0.06); height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: ${road.color}; transition: width 0.6s ease;"></div>
            </div>
          </div>
        </div>

        <!-- 1. Learning Timeline -->
        <div style="margin-bottom: var(--space-8);">
          <h3 style="margin-bottom: var(--space-4);">📅 Learning Timeline & Milestones</h3>
          <div class="grid-2">
            ${road.timeline.map((item, idx) => `
              <div class="glass-card" style="border-left: 4px solid ${road.color};">
                <span class="badge badge-primary" style="font-size: 0.65rem;">${item.phase}</span>
                <h4 style="font-size: var(--text-base); margin: var(--space-2) 0 var(--space-1);">${item.title}</h4>
                <p style="font-size: var(--text-xs); color: var(--text-muted);">${item.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Skill & Portfolio Checklists Grid -->
        <div class="grid-2" style="margin-bottom: var(--space-8);">
          
          <!-- Skill Checklist -->
          <div>
            <h3 style="margin-bottom: var(--space-4);">✅ Essential Skill Checklist</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${road.skills.map(sk => {
                const checked = !!this.state[sk.id];
                return `
                  <label class="glass-card" style="display: flex; align-items: center; gap: var(--space-3); cursor: pointer; padding: var(--space-3) var(--space-4); user-select: none;">
                    <input type="checkbox" ${checked ? 'checked' : ''} onchange="careerHubPage.toggleItem('${sk.id}')" style="width: 18px; height: 18px; accent-color: ${road.color};">
                    <span style="font-size: var(--text-sm); ${checked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${sk.name}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Resume & Portfolio Checklist -->
          <div>
            <h3 style="margin-bottom: var(--space-4);">📄 Resume & Portfolio Readiness</h3>
            <h4 style="font-size: var(--text-xs); text-transform: uppercase; color: var(--text-muted); margin-bottom: var(--space-2);">Resume Essentials</h4>
            <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4);">
              ${road.resumeChecklist.map(r => {
                const checked = !!this.state[r.id];
                return `
                  <label class="glass-card" style="display: flex; align-items: center; gap: var(--space-3); cursor: pointer; padding: var(--space-3) var(--space-4); user-select: none;">
                    <input type="checkbox" ${checked ? 'checked' : ''} onchange="careerHubPage.toggleItem('${r.id}')" style="width: 18px; height: 18px; accent-color: ${road.color};">
                    <span style="font-size: var(--text-sm); ${checked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${r.name}</span>
                  </label>
                `;
              }).join('')}
            </div>

            <h4 style="font-size: var(--text-xs); text-transform: uppercase; color: var(--text-muted); margin-bottom: var(--space-2);">Portfolio Showcase</h4>
            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${road.portfolioChecklist.map(p => {
                const checked = !!this.state[p.id];
                return `
                  <label class="glass-card" style="display: flex; align-items: center; gap: var(--space-3); cursor: pointer; padding: var(--space-3) var(--space-4); user-select: none;">
                    <input type="checkbox" ${checked ? 'checked' : ''} onchange="careerHubPage.toggleItem('${p.id}')" style="width: 18px; height: 18px; accent-color: ${road.color};">
                    <span style="font-size: var(--text-sm); ${checked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${p.name}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

        </div>

        <!-- 3. Recommended Project Ideas -->
        <div style="margin-bottom: var(--space-8);">
          <h3 style="margin-bottom: var(--space-4);">🚀 High-Impact Portfolio Project Ideas</h3>
          <div class="grid-3">
            ${road.projects.map(pj => `
              <div class="glass-card">
                <span class="badge ${pj.diff === 'Advanced' ? 'badge-accent' : pj.diff === 'Intermediate' ? 'badge-primary' : 'badge-success'}">${pj.diff}</span>
                <h4 style="font-size: var(--text-base); margin: var(--space-2) 0 var(--space-1);">${pj.name}</h4>
                <p style="font-size: var(--text-xs); color: var(--text-muted);">${pj.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Top Interview Questions & Model Answers -->
        <div>
          <h3 style="margin-bottom: var(--space-4);">💡 Interview Questions & Answers</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${road.interviewQA.map(qa => `
              <details class="glass-card" style="cursor: pointer;">
                <summary style="font-weight: bold; font-size: var(--text-sm); color: var(--text-main); padding: 4px 0;">
                  ❓ ${qa.q}
                </summary>
                <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-3); padding-top: var(--space-2); border-top: 1px solid var(--glass-border);">
                  <strong>Answer Strategy:</strong> ${qa.a}
                </p>
              </details>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  toggleItem(itemId) {
    this.state[itemId] = !this.state[itemId];
    this.saveState();
    this.renderCards();
    this.renderActiveRoadmap();
  }
}

let careerHubPage;
document.addEventListener('DOMContentLoaded', () => {
  careerHubPage = new CareerHubPage();
  careerHubPage.init();
  
  // Scroll reveal observer
  const elements = document.querySelectorAll('.career-explorer-card, .glass-panel, .glass-card');
  elements.forEach(el => el.classList.add('reveal-on-scroll'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
});
