// CrescentSphere landing interactions — final integrated build.
// Legacy navbar, mega-menu, workflow/admin/shared-layer controllers were removed
// because those surfaces no longer exist in the eight-screen experience.
const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = () => reducedMotionQuery?.matches ?? false;

// Prototype-only actions never lead to dead links.
const prototypeToast = document.querySelector('[data-prototype-toast]');
let toastTimer = null;
const showPrototypeToast = (action) => {
  if (!prototypeToast) return;
  window.clearTimeout(toastTimer);
  prototypeToast.textContent = `${action} is a prototype action. Connect this control to your production account flow.`;
  prototypeToast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => prototypeToast.classList.remove('is-visible'), 3200);
};
document.querySelectorAll('[data-prototype-action]').forEach((control) => {
  control.addEventListener('click', () => showPrototypeToast(control.dataset.prototypeAction || 'This action'));
});

document.querySelector('[data-back-to-top]')?.addEventListener('click', () => {
  document.getElementById('top')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
});

const stageProducts = [...document.querySelectorAll('[data-stage-product]')];
const stageLabel = document.querySelector('[data-stage-label]');
const stageEvent = document.querySelector('[data-stage-event]');

const activateStageProduct = (product) => {
  if (!product) return;
  stageProducts.forEach((item) => item.classList.toggle('is-active', item === product));
  if (stageLabel) stageLabel.textContent = product.dataset.label || '';
  if (stageEvent) stageEvent.textContent = product.dataset.event || '';
};

stageProducts.forEach((product) => {
  product.addEventListener('mouseenter', () => activateStageProduct(product));
  product.addEventListener('focus', () => activateStageProduct(product));
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

// Horizontal journey is now owned by React: src/features/journey/useJourneyNavigation.js

// Upgrade 8 — CS Docs module preview.
(() => {
  const root = document.querySelector('.docs-product-ui');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-docs-view]')];
  const panels = [...root.querySelectorAll('[data-docs-panel]')];
  const title = root.querySelector('[data-docs-title]');
  const create = root.querySelector('[data-docs-create]');
  const labels = {
    invoices: { title: 'Invoices', action: '+ New invoice' },
    payroll: { title: 'Payroll', action: '+ New payroll' },
    inventory: { title: 'Inventory', action: '+ New item' }
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const next = tab.dataset.docsView;
      tabs.forEach((item) => item.classList.toggle('is-active', item === tab));
      panels.forEach((panel) => {
        const active = panel.dataset.docsPanel === next;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
      if (title) title.textContent = labels[next]?.title || next;
      if (create) create.textContent = labels[next]?.action || '+ Create';
    });
  });
})();

// Upgrade 9 — CS Connect standalone messenger preview.
(() => {
  const root = document.querySelector('[data-connect-preview]');
  if (!root) return;

  const conversations = [...root.querySelectorAll('[data-connect-target]')];
  const threads = [...root.querySelectorAll('[data-connect-thread]')];
  const filterButtons = [...root.querySelectorAll('[data-connect-filter]')];
  const groups = [...root.querySelectorAll('[data-connect-group]')];
  const search = root.querySelector('.csc-search input');
  const title = root.querySelector('[data-connect-title]');
  const subtitle = root.querySelector('[data-connect-subtitle]');
  const headIcon = root.querySelector('[data-connect-head-icon]');
  const detailTitle = root.querySelector('[data-connect-detail-title]');
  const detailSubtitle = root.querySelector('[data-connect-detail-subtitle]');
  const detailIcon = root.querySelector('[data-connect-detail-icon]');
  const input = root.querySelector('[data-connect-input]');
  const composer = root.querySelector('[data-connect-composer]');
  const threadWrap = root.querySelector('.csc-thread-wrap');

  const conversationMeta = {
    general: { title: 'general', subtitle: '12 members · Group conversation', detail: '12 members', icon: '#', placeholder: 'Message #general' },
    launch: { title: 'launch', subtitle: '8 members · Group conversation', detail: '8 members', icon: '#', placeholder: 'Message #launch' },
    operations: { title: 'operations', subtitle: '6 members · Group conversation', detail: '6 members', icon: '#', placeholder: 'Message #operations' },
    aisha: { title: 'Aisha Khan', subtitle: 'Online · Direct message', detail: 'Direct message · Online', icon: 'AK', placeholder: 'Message Aisha Khan' },
    omar: { title: 'Omar Reed', subtitle: 'Direct message', detail: 'Direct message', icon: 'OR', placeholder: 'Message Omar Reed' }
  };

  const activateConversation = (target) => {
    const trigger = conversations.find((item) => item.dataset.connectTarget === target);
    const meta = conversationMeta[target];
    if (!trigger || !meta) return;

    conversations.forEach((item) => item.classList.toggle('is-active', item === trigger));
    threads.forEach((thread) => { thread.hidden = thread.dataset.connectThread !== target; });

    if (title) title.textContent = meta.title;
    if (subtitle) subtitle.textContent = meta.subtitle;
    if (headIcon) headIcon.textContent = meta.icon;
    if (detailTitle) detailTitle.textContent = meta.title;
    if (detailSubtitle) detailSubtitle.textContent = meta.detail;
    if (detailIcon) detailIcon.textContent = meta.icon;
    if (input) input.placeholder = meta.placeholder;

    if (threadWrap) requestAnimationFrame(() => { threadWrap.scrollTop = threadWrap.scrollHeight; });
  };

  conversations.forEach((conversation) => {
    conversation.addEventListener('click', () => activateConversation(conversation.dataset.connectTarget));
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.connectFilter || 'all';
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      groups.forEach((group) => {
        group.hidden = filter !== 'all' && group.dataset.connectGroup !== filter;
      });
    });
  });

  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    conversations.forEach((conversation) => {
      conversation.hidden = Boolean(query) && !conversation.textContent.toLowerCase().includes(query);
    });
  });

  composer?.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input?.value.trim();
    if (!value) return;
    const activeThread = threads.find((thread) => !thread.hidden);
    if (!activeThread) return;

    const article = document.createElement('article');
    article.className = 'csc-message csc-own is-new-message';

    const avatar = document.createElement('i');
    avatar.className = 'csc-person-avatar csc-dark';
    avatar.textContent = 'YK';

    const body = document.createElement('div');
    const meta = document.createElement('div');
    meta.className = 'csc-message-meta';
    const name = document.createElement('b');
    name.textContent = 'You';
    const time = document.createElement('time');
    time.textContent = 'Now';
    meta.append(name, time);

    const message = document.createElement('p');
    message.textContent = value;
    body.append(meta, message);
    article.append(avatar, body);
    activeThread.append(article);
    input.value = '';
    requestAnimationFrame(() => { if (threadWrap) threadWrap.scrollTop = threadWrap.scrollHeight; });
  });
})();

// Upgrade 10 — CS Notes standalone secure-note preview.
(() => {
  const root = document.querySelector('[data-notes-preview]');
  if (!root) return;

  const noteButtons = [...root.querySelectorAll('[data-notes-target]')];
  const folderButtons = [...root.querySelectorAll('[data-notes-folder]')];
  const search = root.querySelector('[data-notes-search]');
  const listTitle = root.querySelector('[data-notes-list-title]');
  const empty = root.querySelector('[data-notes-empty]');
  const newButton = root.querySelector('[data-notes-new]');
  const pinButton = root.querySelector('[data-notes-pin]');
  const documentNode = root.querySelector('[data-notes-document]');

  const fields = {
    folderLabel: root.querySelector('[data-notes-folder-label]'),
    shortTitle: root.querySelector('[data-notes-short-title]'),
    kicker: root.querySelector('[data-notes-kicker]'),
    date: root.querySelector('[data-notes-date]'),
    title: root.querySelector('[data-notes-title]'),
    lead: root.querySelector('[data-notes-lead]'),
    body: root.querySelector('[data-notes-body]'),
    sideFolder: root.querySelector('[data-notes-side-folder]'),
    created: root.querySelector('[data-notes-created]'),
    words: root.querySelector('[data-notes-words]'),
    tags: root.querySelector('[data-notes-tags]')
  };

  const notes = {
    launch: {
      folder: 'Projects', shortTitle: 'Website launch', kicker: 'PROJECT NOTE', date: 'Edited today · 10:24',
      title: 'Website launch checklist', lead: 'Everything that still needs a final look before the site goes live.',
      created: 'Sep 28', words: '74', pinned: true, tags: ['launch', 'checklist'],
      body: `<p>The final launch pass should stay focused on the details that affect visitors first.</p><h5>Before publishing</h5><label class="csn-check is-done"><i>✓</i><span>Review final page copy</span></label><label class="csn-check is-done"><i>✓</i><span>Check navigation on mobile</span></label><label class="csn-check"><i></i><span>Confirm contact form destination</span></label><label class="csn-check"><i></i><span>Run one final accessibility pass</span></label><div class="csn-callout"><span>REMEMBER</span><p>Keep the launch window quiet. Make non-essential improvements after the first production check.</p></div>`
    },
    meeting: {
      folder: 'Projects', shortTitle: 'Meeting follow-up', kicker: 'MEETING NOTE', date: 'Edited yesterday · 16:42',
      title: 'Meeting follow-up', lead: 'The decisions that were made, what still needs an answer, and the next actions.',
      created: 'Oct 4', words: '58', pinned: false, tags: ['meeting', 'actions'],
      body: `<p>The planning call ended with three decisions worth keeping visible this week.</p><h5>Next actions</h5><label class="csn-check is-done"><i>✓</i><span>Update the launch copy</span></label><label class="csn-check"><i></i><span>Confirm the final review time</span></label><label class="csn-check"><i></i><span>Collect open questions before Thursday</span></label><div class="csn-callout"><span>DECISION</span><p>Keep the first release small and move optional improvements into the next review.</p></div>`
    },
    renewals: {
      folder: 'Reference', shortTitle: 'Renewal dates', kicker: 'REFERENCE NOTE', date: 'Edited Oct 2 · 09:10',
      title: 'Renewal dates', lead: 'A simple reference for annual services and the dates that need attention.',
      created: 'Aug 12', words: '46', pinned: true, tags: ['reference', 'renewals'],
      body: `<p>Review recurring services before their renewal windows instead of waiting for a last-minute reminder.</p><h5>Upcoming</h5><label class="csn-check"><i></i><span>Domain renewal — November</span></label><label class="csn-check"><i></i><span>Design software — December</span></label><label class="csn-check"><i></i><span>Hosting review — January</span></label><div class="csn-callout"><span>NOTE</span><p>Confirm whether each service is still needed before renewing it for another year.</p></div>`
    },
    ideas: {
      folder: 'Personal', shortTitle: 'Ideas', kicker: 'PERSONAL NOTE', date: 'Edited Sep 29 · 21:06',
      title: 'Ideas worth revisiting', lead: 'Small thoughts that are not urgent, but are useful enough to keep.',
      created: 'Sep 18', words: '39', pinned: false, tags: ['ideas', 'later'],
      body: `<p>Keep this list short. If an idea still feels useful after a few weeks, turn it into something more concrete.</p><h5>Parking lot</h5><label class="csn-check"><i></i><span>Try a simpler onboarding flow</span></label><label class="csn-check"><i></i><span>Explore a calmer dashboard layout</span></label><label class="csn-check"><i></i><span>Collect better empty-state examples</span></label>`
    },
    travel: {
      folder: 'Personal', shortTitle: 'Travel checklist', kicker: 'PERSONAL NOTE', date: 'Edited Sep 27 · 18:31',
      title: 'Travel checklist', lead: 'A compact checklist for documents, essentials, and last-minute confirmations.',
      created: 'Sep 20', words: '52', pinned: true, tags: ['travel', 'checklist'],
      body: `<p>Keep the essentials in one place so the final check takes a few minutes instead of an hour.</p><h5>Before leaving</h5><label class="csn-check is-done"><i>✓</i><span>Confirm booking details</span></label><label class="csn-check"><i></i><span>Pack travel documents</span></label><label class="csn-check"><i></i><span>Charge primary devices</span></label><label class="csn-check"><i></i><span>Check the morning schedule</span></label>`
    }
  };

  let activeFolder = 'all';
  let activeKey = 'launch';

  const setText = (node, value) => { if (node) node.textContent = value; };

  const renderTags = (tags = []) => {
    if (!fields.tags) return;
    fields.tags.replaceChildren(...tags.map((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      return span;
    }));
  };

  const bindChecklist = () => {
    fields.body?.querySelectorAll('.csn-check').forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('is-done');
        const icon = item.querySelector('i');
        if (icon) icon.textContent = item.classList.contains('is-done') ? '✓' : '';
      });
    });
  };

  const openNote = (key) => {
    const note = notes[key];
    if (!note) return;
    activeKey = key;
    noteButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.notesTarget === key));
    setText(fields.folderLabel, note.folder);
    setText(fields.shortTitle, note.shortTitle);
    setText(fields.kicker, note.kicker);
    setText(fields.date, note.date);
    setText(fields.title, note.title);
    setText(fields.lead, note.lead);
    setText(fields.sideFolder, note.folder);
    setText(fields.created, note.created);
    setText(fields.words, note.words);
    if (fields.body) fields.body.innerHTML = note.body;
    renderTags(note.tags);
    pinButton?.classList.toggle('is-active', note.pinned);
    bindChecklist();
    root.querySelector('.csn-editor-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterNotes = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visibleCount = 0;
    noteButtons.forEach((button) => {
      const categories = (button.dataset.notesCategory || '').split(/\s+/);
      const folderMatch = activeFolder === 'all' || categories.includes(activeFolder);
      const queryMatch = !query || button.textContent.toLowerCase().includes(query);
      const visible = folderMatch && queryMatch;
      button.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (empty) empty.hidden = visibleCount > 0;
  };

  noteButtons.forEach((button) => {
    button.addEventListener('click', () => openNote(button.dataset.notesTarget));
  });

  folderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFolder = button.dataset.notesFolder || 'all';
      folderButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      setText(listTitle, button.querySelector('span')?.textContent || 'Notes');
      filterNotes();
      const firstVisible = noteButtons.find((item) => !item.hidden);
      if (firstVisible && activeFolder !== 'archive') openNote(firstVisible.dataset.notesTarget);
    });
  });

  search?.addEventListener('input', filterNotes);

  newButton?.addEventListener('click', () => {
    activeKey = '';
    noteButtons.forEach((button) => button.classList.remove('is-active'));
    setText(fields.folderLabel, 'Notes');
    setText(fields.shortTitle, 'Untitled');
    setText(fields.kicker, 'NEW NOTE');
    setText(fields.date, 'Created just now');
    setText(fields.title, 'Untitled note');
    setText(fields.lead, 'Start with the detail you want to remember.');
    setText(fields.sideFolder, 'Unfiled');
    setText(fields.created, 'Today');
    setText(fields.words, '0');
    if (fields.body) fields.body.innerHTML = `<p class="csn-empty-editor">This is a prototype note. In the product, you would start typing here.</p>`;
    renderTags([]);
    pinButton?.classList.remove('is-active');
  });

  pinButton?.addEventListener('click', () => {
    pinButton.classList.toggle('is-active');
    if (activeKey && notes[activeKey]) notes[activeKey].pinned = pinButton.classList.contains('is-active');
  });

  documentNode?.addEventListener('dblclick', () => {
    documentNode.classList.add('is-reading-focus');
    window.setTimeout(() => documentNode.classList.remove('is-reading-focus'), 550);
  });

  bindChecklist();
})();

// Upgrade 07 — CS KeyLang standalone typing + English/Arabic practice preview.
(() => {
  const root = document.querySelector('[data-keylang-preview]');
  if (!root) return;

  const modeButtons = [...root.querySelectorAll('[data-keylang-mode]')];
  const modeLinks = [...root.querySelectorAll('[data-keylang-mode-link]')];
  const views = [...root.querySelectorAll('[data-keylang-view]')];
  const typingLangButtons = [...root.querySelectorAll('[data-keylang-typing-lang]')];
  const durationButtons = [...root.querySelectorAll('.kl-test-options button')];
  const rangeButtons = [...root.querySelectorAll('.kl-range button')];
  const topicButtons = [...root.querySelectorAll('.kl-topic-list button')];

  const prompt = root.querySelector('[data-keylang-prompt]');
  const input = root.querySelector('[data-keylang-input]');
  const testCard = root.querySelector('[data-keylang-test-card]');
  const title = root.querySelector('[data-keylang-test-title]');
  const wpm = root.querySelector('[data-keylang-wpm]');
  const accuracy = root.querySelector('[data-keylang-accuracy]');
  const time = root.querySelector('[data-keylang-time]');
  const progress = root.querySelector('[data-keylang-progress]');
  const progressLabel = root.querySelector('[data-keylang-progress-label]');
  const startButton = root.querySelector('[data-keylang-start]');
  const resetButton = root.querySelector('[data-keylang-reset]');

  const typingSamples = {
    en: {
      label: 'English · Everyday words',
      html: '<span class="is-complete">Clear communication starts with confident typing.</span> <mark>Practice</mark> <span>at a steady pace and focus on accuracy before speed.</span>',
      text: 'Clear communication starts with confident typing. Practice at a steady pace and focus on accuracy before speed.',
      placeholder: 'Start typing…',
      dir: 'ltr'
    },
    ar: {
      label: 'العربية · كتابة يومية',
      html: '<span class="is-complete">تبدأ الكتابة الواضحة بالتركيز والدقة.</span> <mark>تدرّب</mark> <span>بإيقاع ثابت وحافظ على الدقة قبل زيادة السرعة.</span>',
      text: 'تبدأ الكتابة الواضحة بالتركيز والدقة. تدرّب بإيقاع ثابت وحافظ على الدقة قبل زيادة السرعة.',
      placeholder: 'ابدأ الكتابة…',
      dir: 'rtl'
    }
  };

  let typingLang = 'en';
  let duration = 60;
  let remaining = 34;
  let timerId = null;
  let startedAt = null;

  const pad = (value) => String(Math.max(0, value)).padStart(2, '0');
  const formatTime = (seconds) => `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;

  const switchMode = (mode) => {
    modeButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.keylangMode === mode));
    views.forEach((view) => {
      const active = view.dataset.keylangView === mode;
      view.hidden = !active;
      view.classList.toggle('is-active', active);
    });
  };

  modeButtons.forEach((button) => button.addEventListener('click', () => switchMode(button.dataset.keylangMode)));
  modeLinks.forEach((button) => button.addEventListener('click', () => switchMode(button.dataset.keylangModeLink)));

  const stopTimer = () => {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
    testCard?.classList.remove('is-running');
    if (startButton) startButton.textContent = 'Start test';
  };

  const resetTest = ({ keepPreview = false } = {}) => {
    stopTimer();
    startedAt = null;
    remaining = keepPreview ? Math.round(duration * .57) : duration;
    if (input) input.value = '';
    if (wpm) wpm.textContent = keepPreview ? (typingLang === 'en' ? '47' : '38') : '0';
    if (accuracy) accuracy.textContent = keepPreview ? '96%' : '100%';
    if (time) time.textContent = formatTime(remaining);
    if (progress) progress.style.width = `${((duration - remaining) / duration) * 100}%`;
    if (progressLabel) progressLabel.textContent = `${duration - remaining} / ${duration} sec`;
  };

  const setTypingLanguage = (lang) => {
    typingLang = lang;
    const sample = typingSamples[lang];
    typingLangButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.keylangTypingLang === lang));
    if (title) title.textContent = sample.label;
    if (prompt) {
      prompt.innerHTML = sample.html;
      prompt.dir = sample.dir;
    }
    if (input) {
      input.placeholder = sample.placeholder;
      input.dir = sample.dir;
    }
    resetTest({ keepPreview: true });
  };

  typingLangButtons.forEach((button) => button.addEventListener('click', () => setTypingLanguage(button.dataset.keylangTypingLang)));

  durationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      durationButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      const value = button.textContent.includes('2') ? 120 : parseInt(button.textContent, 10) || 60;
      duration = value;
      resetTest();
    });
  });

  const updateTypingMetrics = () => {
    if (!input) return;
    const typed = input.value;
    const target = typingSamples[typingLang].text;
    const elapsed = startedAt ? Math.max(1, (Date.now() - startedAt) / 1000) : Math.max(1, duration - remaining);
    let matches = 0;
    for (let i = 0; i < typed.length; i += 1) if (typed[i] === target[i]) matches += 1;
    const acc = typed.length ? Math.round((matches / typed.length) * 100) : 100;
    const words = typed.trim() ? typed.trim().split(/\s+/).length : 0;
    const speed = Math.max(0, Math.round(words / (elapsed / 60)));
    if (accuracy) accuracy.textContent = `${Math.min(100, acc)}%`;
    if (wpm) wpm.textContent = String(Math.min(speed, 180));
  };

  const tick = () => {
    remaining -= 1;
    if (time) time.textContent = formatTime(remaining);
    if (progress) progress.style.width = `${((duration - remaining) / duration) * 100}%`;
    if (progressLabel) progressLabel.textContent = `${duration - remaining} / ${duration} sec`;
    updateTypingMetrics();
    if (remaining <= 0) {
      stopTimer();
      if (startButton) startButton.textContent = 'Test complete';
      input?.blur();
    }
  };

  startButton?.addEventListener('click', () => {
    if (timerId) {
      stopTimer();
      startButton.textContent = 'Resume test';
      return;
    }
    if (remaining <= 0 || !startedAt) {
      remaining = duration;
      startedAt = Date.now();
      if (input) input.value = '';
    } else {
      startedAt = Date.now() - ((duration - remaining) * 1000);
    }
    testCard?.classList.add('is-running');
    startButton.textContent = 'Pause';
    input?.focus();
    timerId = window.setInterval(tick, 1000);
  });

  resetButton?.addEventListener('click', () => resetTest());
  input?.addEventListener('input', () => {
    if (!startedAt) {
      startedAt = Date.now();
      remaining = duration;
      testCard?.classList.add('is-running');
      if (startButton) startButton.textContent = 'Pause';
      timerId = window.setInterval(tick, 1000);
    }
    updateTypingMetrics();
  });

  const directionButtons = [...root.querySelectorAll('[data-keylang-direction]')];
  const sourceLabel = root.querySelector('[data-keylang-source-label]');
  const sourceText = root.querySelector('[data-keylang-source]');
  const targetLabel = root.querySelector('[data-keylang-target-label]');
  const targetText = root.querySelector('[data-keylang-target]');
  const targetWrap = root.querySelector('[data-keylang-target-wrap]');
  const revealButton = root.querySelector('[data-keylang-reveal]');
  const phraseCount = root.querySelector('[data-keylang-phrase-count]');
  const nextPhrase = root.querySelector('[data-keylang-next-phrase]');
  const repeatPhrase = root.querySelector('[data-keylang-repeat]');

  const phrases = [
    { en: 'Could you send me the details?', ar: 'هل يمكنك إرسال التفاصيل لي؟' },
    { en: 'I will check and get back to you.', ar: 'سأتحقق من الأمر وأعود إليك.' },
    { en: 'What time works best for you?', ar: 'ما الوقت الأنسب لك؟' },
    { en: 'Thank you. I understand the next step.', ar: 'شكرًا لك. فهمت الخطوة التالية.' },
    { en: 'Please let me know if anything changes.', ar: 'يرجى إخباري إذا تغير أي شيء.' }
  ];
  let phraseIndex = 0;
  let direction = 'en-ar';

  const renderPhrase = ({ hide = true } = {}) => {
    const phrase = phrases[phraseIndex];
    const sourceIsEnglish = direction === 'en-ar';
    if (sourceLabel) sourceLabel.textContent = sourceIsEnglish ? 'ENGLISH' : 'العربية';
    if (targetLabel) targetLabel.textContent = sourceIsEnglish ? 'العربية' : 'ENGLISH';
    if (sourceText) {
      sourceText.textContent = sourceIsEnglish ? phrase.en : phrase.ar;
      sourceText.dir = sourceIsEnglish ? 'ltr' : 'rtl';
    }
    if (targetText) {
      targetText.textContent = sourceIsEnglish ? phrase.ar : phrase.en;
      targetText.dir = sourceIsEnglish ? 'rtl' : 'ltr';
    }
    if (phraseCount) phraseCount.textContent = `${12 + phraseIndex} of 20`;
    targetWrap?.classList.toggle('is-hidden', hide);
    if (revealButton) revealButton.textContent = hide ? 'Reveal answer' : 'Hide answer';
  };

  directionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      direction = button.dataset.keylangDirection;
      directionButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      renderPhrase();
    });
  });

  revealButton?.addEventListener('click', () => {
    const hidden = targetWrap?.classList.toggle('is-hidden');
    revealButton.textContent = hidden ? 'Reveal answer' : 'Hide answer';
  });
  nextPhrase?.addEventListener('click', () => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    renderPhrase();
  });
  repeatPhrase?.addEventListener('click', () => renderPhrase());

  rangeButtons.forEach((button) => button.addEventListener('click', () => rangeButtons.forEach((item) => item.classList.toggle('is-active', item === button))));
  topicButtons.forEach((button) => button.addEventListener('click', () => topicButtons.forEach((item) => item.classList.toggle('is-active', item === button))));

  renderPhrase();
})();

// Service Upgrade 09 — production accessibility and interaction polish.
(() => {
  const syncPressedGroup = (buttons) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.classList.contains('is-active'))));
  };

  const pressedGroups = [
    [...document.querySelectorAll('[data-docs-view]')],
    [...document.querySelectorAll('[data-connect-filter]')],
    [...document.querySelectorAll('[data-notes-folder]')],
    [...document.querySelectorAll('[data-keylang-mode]')],
    [...document.querySelectorAll('[data-keylang-typing-lang]')],
    [...document.querySelectorAll('.kl-test-options button')],
    [...document.querySelectorAll('[data-keylang-direction]')],
    [...document.querySelectorAll('.kl-range button')],
    [...document.querySelectorAll('.kl-topic-list button')]
  ].filter((group) => group.length);

  const syncAllPressed = () => pressedGroups.forEach(syncPressedGroup);
  syncAllPressed();
  document.addEventListener('click', () => requestAnimationFrame(syncAllPressed));

  // Keep preview tab panels exposed correctly to assistive technology.
  const docsPanels = [...document.querySelectorAll('[data-docs-panel]')];
  const docsButtons = [...document.querySelectorAll('[data-docs-view]')];
  docsButtons.forEach((button) => button.setAttribute('role', 'tab'));
  docsButtons[0]?.parentElement?.setAttribute('role', 'tablist');
  docsPanels.forEach((panel, index) => {
    const id = `docs-preview-${panel.dataset.docsPanel || index}`;
    panel.id ||= id;
    panel.setAttribute('role', 'tabpanel');
    const button = docsButtons.find((item) => item.dataset.docsView === panel.dataset.docsPanel);
    if (button) {
      button.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', button.id ||= `docs-tab-${panel.dataset.docsPanel}`);
    }
  });

  const keylangViews = [...document.querySelectorAll('[data-keylang-view]')];
  const keylangTabs = [...document.querySelectorAll('[data-keylang-mode]')];
  keylangTabs.forEach((tab) => tab.setAttribute('role', 'tab'));
  keylangTabs[0]?.parentElement?.setAttribute('role', 'tablist');
  keylangViews.forEach((view, index) => {
    const id = `keylang-preview-${view.dataset.keylangView || index}`;
    view.id ||= id;
    view.setAttribute('role', 'tabpanel');
    const tab = keylangTabs.find((item) => item.dataset.keylangMode === view.dataset.keylangView);
    if (tab) {
      tab.setAttribute('aria-controls', view.id);
      view.setAttribute('aria-labelledby', tab.id ||= `keylang-tab-${view.dataset.keylangView}`);
    }
  });

  const syncPanels = () => {
    docsPanels.forEach((panel) => panel.setAttribute('aria-hidden', String(panel.hidden)));
    docsButtons.forEach((button) => button.setAttribute('aria-selected', String(button.classList.contains('is-active'))));
    keylangViews.forEach((view) => view.setAttribute('aria-hidden', String(view.hidden)));
    keylangTabs.forEach((tab) => tab.setAttribute('aria-selected', String(tab.classList.contains('is-active'))));
  };
  syncPanels();
  document.addEventListener('click', () => requestAnimationFrame(syncPanels));

  // The overview highlights one product at a time; expose that state without
  // suggesting technical integration between products.
  const stageItems = [...document.querySelectorAll('[data-stage-product]')];
  const syncStage = () => stageItems.forEach((item) => item.setAttribute('aria-current', item.classList.contains('is-active') ? 'true' : 'false'));
  syncStage();
  stageItems.forEach((item) => {
    item.addEventListener('mouseenter', () => requestAnimationFrame(syncStage));
    item.addEventListener('focus', () => requestAnimationFrame(syncStage));
  });

  // Pinning a note is a toggle, not a one-off command.
  const notesPin = document.querySelector('[data-notes-pin]');
  const syncPin = () => notesPin?.setAttribute('aria-pressed', String(notesPin.classList.contains('is-active')));
  syncPin();
  notesPin?.addEventListener('click', () => requestAnimationFrame(syncPin));

  // The visible Mailer API example is genuinely useful in the prototype: copy
  // it when possible, while retaining a clear fallback status message.
  const copyButton = [...document.querySelectorAll('[data-prototype-action]')]
    .find((button) => button.dataset.prototypeAction === 'Copy CS Mailer API example');
  const code = document.querySelector('.mailer-code-card pre code');
  copyButton?.addEventListener('click', async () => {
    const value = code?.textContent?.trim();
    if (!value) return;
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        copied = true;
      }
    } catch (_) {}
    const toast = document.querySelector('[data-prototype-toast]');
    if (toast) {
      toast.textContent = copied ? 'API example copied to the clipboard.' : 'Select the code sample to copy it.';
      toast.classList.add('is-visible');
      window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
    }
  });

  // Reflect Arabic/LTR direction changes to language metadata as phrases switch.
  const sourceText = document.querySelector('[data-keylang-source]');
  const targetText = document.querySelector('[data-keylang-target]');
  const syncLanguageDirection = () => {
    [sourceText, targetText].forEach((node) => {
      if (!node) return;
      const isArabic = node.dir === 'rtl';
      node.lang = isArabic ? 'ar' : 'en';
    });
  };
  syncLanguageDirection();
  document.querySelectorAll('[data-keylang-direction], [data-keylang-next-phrase]').forEach((control) => {
    control.addEventListener('click', () => requestAnimationFrame(syncLanguageDirection));
  });
})();
