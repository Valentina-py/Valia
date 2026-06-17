/* ============================================================
   APP — router, navegación, progreso, quiz, flashcards, práctica, búsqueda
   Inglés para el Turismo I
   ============================================================ */
(function () {
  "use strict";
  const DATA = window.APP_DATA;
  const UNITS = DATA.units;
  const PRACTICE = DATA.practica || [];
  const $ = sel => document.querySelector(sel);

  /* ---------------- Iconos (SVG de línea, sin emojis) ---------------- */
  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    cards: '<rect x="3" y="7" width="14" height="13" rx="2"/><path d="M7 4h14v13"/>',
    quiz: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 11 2.5 2.5L15 9"/>',
    practice: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M19 17H6a2 2 0 0 0-2 2"/>',
    tool: '<path d="M14 7a4 4 0 0 1-5 5L5 16v3h3l4-4a4 4 0 0 1 5-5l-3-3z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    moon: '<path d="M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    cross: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    /* iconos de unidad */
    greet: '<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.5 8.5 0 0 1-3.9-.9L3 20l1.5-5.6A8.4 8.4 0 1 1 21 11.5z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    bag: '<path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    family: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 6a3 3 0 0 1 0 6M20.5 20a5.5 5.5 0 0 0-3.7-5.2"/>',
    coffee: '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 2v2M11 2v2M14 2v2"/>',
    work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
    ticket: '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M15 6v12"/>',
    star: '<path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.6 1-6L3.3 9.4l6-.9z"/>',
    action: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    bed: '<path d="M3 7v13M3 12h18v8M21 20v-8a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11.5" r="1.5"/>',
    /* iconos de herramientas */
    verbs: '<path d="M4 7V5h16v2M9 20h6M12 5v15"/>',
    numbers: '<path d="M9 4 7 20M17 4l-2 16M5 9h15M4 15h15"/>',
    phrases: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    vocab: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M19 17H6a2 2 0 0 0-2 2"/>',
    /* juegos y examen */
    games: '<rect x="2" y="7" width="20" height="10" rx="5"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/>',
    exam: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="m9.5 13 1.8 1.8L15 11"/>',
    medal: '<circle cx="12" cy="15" r="6"/><path d="m9 4 3 6 3-6M8.5 11 6 4M15.5 11 18 4"/>',
    /* utilidades / interacción */
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    shuffle: '<path d="M18 4l3 3-3 3M21 7H8a4 4 0 0 0-4 4M18 20l3-3-3-3M21 17H8a4 4 0 0 1-4-4"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    flag: '<path d="M4 21V4M4 4h13l-2 4 2 4H4"/>',
  };
  const UNIT_COLORS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444", "#10b981", "#ec4899", "#f97316", "#06b6d4", "#6366f1"];
  function uColor(id) { const i = UNITS.findIndex(u => u.id === id); return i >= 0 ? UNIT_COLORS[i % UNIT_COLORS.length] : UNIT_COLORS[0]; }
  function icon(name, cls) {
    return `<svg class="ic ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }
  const TOOL_ICON = { verbs: "verbs", numbers: "numbers", phrases: "phrases", vocab: "vocab" };
  // badge con el icono temático de la unidad
  function badge(iconName, big) { return `<span class="ubadge${big ? " ubadge--lg" : ""}">${icon(iconName)}</span>`; }

  /* ---------------- Render de contenido (sin matemática) ---------------- */
  window.MathJaxRender = function () { /* no-op: el contenido es texto, no fórmulas */ };

  /* ---------------- Progreso (localStorage) ---------------- */
  const STORE_KEY = "estudioIng.progress.v1";
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  }
  function saveProgress(p) { localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
  let progress = loadProgress();
  progress.read = progress.read || {};
  progress.quiz = progress.quiz || {};
  progress.exam = progress.exam || {};

  function unitPct(uid) {
    let done = 0;
    if (progress.read[uid]) done += 50;
    const q = progress.quiz[uid];
    if (q && q.total) done += Math.round((q.best / q.total) * 50);
    return Math.min(100, done);
  }
  function globalPct() {
    const sum = UNITS.reduce((s, u) => s + unitPct(u.id), 0);
    return Math.round(sum / UNITS.length);
  }
  function refreshProgressUI() {
    const g = globalPct();
    $("#globalProgressBar").style.width = g + "%";
    $("#globalProgressPct").textContent = g + "%";
    document.querySelectorAll(".nav__item[data-unit]").forEach(el => {
      const uid = el.dataset.unit;
      el.classList.toggle("completed", unitPct(uid) >= 100);
    });
  }

  /* ---------------- Navegación lateral ---------------- */
  function buildNav() {
    const nav = $("#mainNav");
    let html = `<div class="nav__group-title">General</div>`;
    html += navItem("#/", icon("home"), "Inicio", null);
    html += navItem("#/progress", icon("progress"), "Mi progreso", null);
    html += `<div class="nav__group-title">Unidades</div>`;
    UNITS.forEach((u, i) => {
      html += navItem(`#/unit/${u.id}`, badge(u.icon), `${i + 1}. ${u.title}`, u.id);
    });
    html += `<div class="nav__group-title">Herramientas</div>`;
    html += navItem("#/tool/verbs", icon("verbs"), "Conjugador de verbos", null);
    html += navItem("#/tool/numbers", icon("numbers"), "Números y la hora", null);
    html += navItem("#/tool/phrases", icon("phrases"), "Frases para turismo", null);
    html += navItem("#/tool/vocab", icon("vocab"), "Vocabulario por temas", null);
    html += `<div class="nav__group-title">Práctica</div>`;
    html += navItem("#/practica", icon("practice"), "Ejercicios", null);
    html += navItem("#/cards", icon("cards"), "Flashcards", null);
    html += navItem("#/quiz", icon("quiz"), "Autoevaluación", null);
    html += `<div class="nav__group-title">Juegos y examen</div>`;
    html += navItem("#/games", icon("games"), "Juegos", null);
    html += navItem("#/exam", icon("exam"), "Examen (Unidades 1–4)", null);
    nav.innerHTML = html;
  }
  function navItem(href, ic, label, unit) {
    return `<a class="nav__item" href="${href}" ${unit ? `data-unit="${unit}"` : ""}>
      <span class="nav__ic">${ic}</span><span class="nav__label">${label}</span>
      <span class="nav__check">${icon("check")}</span></a>`;
  }
  function setActiveNav(hash) {
    document.querySelectorAll(".nav__item").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === hash);
    });
  }

  /* ---------------- Router ---------------- */
  let examTimer = null;
  let routeCleanup = [];
  function onLeave(fn) { routeCleanup.push(fn); }
  function stopTimers() {
    if (examTimer) { clearInterval(examTimer); examTimer = null; }
    if (window.Games && window.Games._stop) window.Games._stop();
    routeCleanup.forEach(fn => { try { fn(); } catch (e) {} });
    routeCleanup = [];
  }

  function router() {
    stopTimers();
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/");
    const root = parts[0] || "";
    const id = parts[1] || "";
    const content = $("#content");
    content.scrollTop = 0;
    window.scrollTo(0, 0);

    let crumb = "Inicio";
    if (root === "") renderHome();
    else if (root === "unit") { crumb = unitById(id)?.title || "Unidad"; renderUnit(id); }
    else if (root === "tool") { crumb = "Herramienta"; renderToolPage(id); }
    else if (root === "quiz" && id) { crumb = "Autoevaluación"; renderQuiz(id); }
    else if (root === "quiz") { crumb = "Autoevaluación"; renderQuizMenu(); }
    else if (root === "cards" && id) { crumb = "Flashcards"; renderCards(id); }
    else if (root === "cards") { crumb = "Flashcards"; renderCardsMenu(); }
    else if (root === "practica" && id) { crumb = "Ejercicios"; renderPractice(id); }
    else if (root === "practica") { crumb = "Ejercicios"; renderPracticeMenu(); }
    else if (root === "games" && id) { crumb = "Juegos"; renderGame(id); }
    else if (root === "games") { crumb = "Juegos"; renderGamesMenu(); }
    else if (root === "exam") { crumb = "Examen"; renderExam(); }
    else if (root === "progress") { crumb = "Mi progreso"; renderProgress(); }
    else renderHome();

    $("#breadcrumbs").textContent = crumb;
    setActiveNav(hash.split("/").slice(0, 2).join("/"));
    if (root === "unit") setActiveNav(`#/unit/${id}`);
    refreshProgressUI();
    closeSidebar();
  }

  const unitById = id => UNITS.find(u => u.id === id);
  const practiceById = id => PRACTICE.find(t => t.id === id);

  /* ---------------- Anillo de progreso (SVG) ---------------- */
  function progressRing(pct, size) {
    size = size || 130; const sw = 12; const r = (size - sw) / 2; const c = 2 * Math.PI * r;
    const off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${pct}%">
      <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient></defs>
      <circle class="ring__bg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${sw}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#ringGrad)" stroke-width="${sw}"
        stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
        transform="rotate(-90 ${size/2} ${size/2})"/>
      <text class="ring__txt" x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${Math.round(size*0.24)}">${pct}%</text>
    </svg>`;
  }

  /* ---------------- Vistas ---------------- */
  function mount(html) {
    const c = $("#content");
    c.innerHTML = `<div class="fade-in">${html}</div>`;
    return c;
  }

  function renderHome() {
    const cards = UNITS.map((u, i) => `
      <a class="unit-card" href="#/unit/${u.id}" style="--u:${uColor(u.id)}">
        <div class="unit-card__head">
          ${badge(u.icon, true)}
          <span class="unit-card__num">Unidad ${i + 1}</span>
        </div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">${u.desc}</div>
        <div class="unit-card__bar"><span style="width:${unitPct(u.id)}%"></span></div>
      </a>`).join("");

    const totalEx = PRACTICE.reduce((s, t) => s + t.exercises.length, 0);
    const firstUnit = UNITS[0] ? `#/unit/${UNITS[0].id}` : "#/";

    mount(`
      <section class="hero">
        <div class="hero__motif">${icon("globe")}</div>
        <span class="hero__badge">English for Tourism · Nivel A1</span>
        <h1>Inglés para el Turismo I</h1>
        <p>Gramática, vocabulario, frases útiles, juegos y autoevaluación, con foco en situaciones reales de turismo. ¡Aprendé a tu ritmo!</p>
        <div class="hero__cta">
          <a class="btn btn--light" href="${firstUnit}">${icon("play")} Empezar a estudiar</a>
          <a class="btn" href="#/games">${icon("games")} Jugar</a>
          <a class="btn" href="#/exam">${icon("exam")} Rendir examen</a>
        </div>
      </section>

      <div class="stat-row">
        <div class="stat"><div class="stat__num">${UNITS.length}</div><div class="stat__label">Unidades</div></div>
        <div class="stat"><div class="stat__num">4</div><div class="stat__label">Herramientas</div></div>
        <div class="stat"><div class="stat__num">6</div><div class="stat__label">Juegos</div></div>
        <div class="stat"><div class="stat__num">${totalEx}</div><div class="stat__label">Ejercicios</div></div>
        <div class="stat"><div class="stat__num">${globalPct()}%</div><div class="stat__label">Progreso</div></div>
      </div>

      <h2>Unidades</h2>
      <div class="unit-grid">${cards}</div>

      <h2>Herramientas interactivas</h2>
      <div class="tool-grid">
        ${toolCard("#/tool/verbs","verbs","Conjugador de verbos","Conjugá to be, present simple, present continuous y can en afirmativo, negativo y pregunta.")}
        ${toolCard("#/tool/numbers","numbers","Números y la hora","Pasá números a palabras y aprendé a decir la hora con un reloj interactivo.")}
        ${toolCard("#/tool/phrases","phrases","Frases para turismo","Frasebook por situación: aeropuerto, hotel, restaurante, direcciones y más.")}
        ${toolCard("#/tool/vocab","vocab","Vocabulario por temas","Entrená vocabulario clave con tarjetas: países, trabajos, comida, ropa…")}
      </div>

      <h2>Para practicar</h2>
      <div class="btn-row">
        <a class="btn btn--primary" href="#/practica">${icon("practice")} Ejercicios</a>
        <a class="btn" href="#/cards">${icon("cards")} Flashcards</a>
        <a class="btn" href="#/quiz">${icon("quiz")} Autoevaluación</a>
        <a class="btn" href="#/progress">${icon("progress")} Mi progreso</a>
      </div>

      <h2>Juegos</h2>
      <div class="tool-grid">
        ${toolCard("#/games/memory","games","Memotest","Emparejá palabras en inglés con su traducción.")}
        ${toolCard("#/games/speed","games","Contrarreloj","Respondé contra reloj en 60 segundos.")}
        ${toolCard("#/games/sentence","games","Ordená la oración","Armá oraciones colocando las palabras en orden.")}
        ${toolCard("#/games/hangman","games","Ahorcado","Adiviná la palabra letra por letra.")}
        ${toolCard("#/games/oddone","games","¿Cuál sobra?","Encontrá la palabra que no pertenece.")}
        ${toolCard("#/games/truefalse","games","Verdadero o Falso","Decidí si la afirmación es correcta.")}
      </div>

      <h2>Examen</h2>
      <div class="card">
        <p class="mt-0">Un examen integrador con preguntas de las <strong>Unidades 1 a 4</strong> (verbo <em>be</em>, nacionalidades, <em>a/an</em> y plurales, posesivos y adjetivos), con tiempo y nota final sobre 10.</p>
        <div class="btn-row" style="margin-bottom:0">
          <a class="btn btn--primary" href="#/exam">${icon("exam")} Rendir examen (Unidades 1–4)</a>
          <a class="btn" href="#/games">${icon("games")} Ver todos los juegos</a>
        </div>
      </div>
    `);
  }
  function toolCard(href, ic, title, desc) {
    return `<a class="tool-card" href="${href}">
      <span class="tool-card__ic">${icon(ic)}</span>
      <div><div class="tool-card__title">${title}</div>
      <div class="unit-card__desc">${desc}</div></div></a>`;
  }

  function renderUnit(id) {
    const u = unitById(id);
    if (!u) return renderHome();
    const idx = UNITS.indexOf(u);
    const prev = UNITS[idx - 1], next = UNITS[idx + 1];
    const tp = PRACTICE.find(t => t.unit === u.id);

    mount(`
      <section class="unit-hero" style="--u:${uColor(u.id)}">
        <div class="unit-hero__motif">${icon(u.icon)}</div>
        <div class="unit-hero__tag">${badge(u.icon)} Unidad ${idx + 1}</div>
        <h1>${u.title}</h1>
        <p>${u.desc}</p>
      </section>
      ${u.html}

      <div class="card center">
        <h3 class="mt-0">¿Lista con la teoría?</h3>
        <div class="btn-row" style="justify-content:center">
          <button class="btn ${progress.read[u.id] ? "" : "btn--primary"}" id="markRead">
            ${progress.read[u.id] ? icon("check") + " Marcada como leída" : "Marcar como leída"}
          </button>
          ${u.tool ? `<a class="btn" href="#/tool/${u.tool}">${icon("tool")} Herramienta</a>` : ""}
          <a class="btn" href="#/quiz/${u.id}">${icon("quiz")} Quiz</a>
          <a class="btn" href="#/cards/${u.id}">${icon("cards")} Flashcards</a>
          ${tp ? `<a class="btn" href="#/practica/${tp.id}">${icon("practice")} Ejercicios</a>` : ""}
        </div>
      </div>

      <div class="pager">
        ${prev ? `<a href="#/unit/${prev.id}"><small>← Anterior</small>${prev.title}</a>` : `<span></span>`}
        ${next ? `<a class="next" href="#/unit/${next.id}"><small>Siguiente →</small>${next.title}</a>` : `<span></span>`}
      </div>
    `);

    const btn = $("#markRead");
    btn.addEventListener("click", () => {
      progress.read[u.id] = !progress.read[u.id];
      saveProgress(progress);
      router();
    });
  }

  function renderToolPage(id) {
    const titles = {
      verbs: ["Conjugador de verbos", "Elegí el tiempo verbal, el sujeto y el verbo: obtené las formas afirmativa, negativa e interrogativa."],
      numbers: ["Números y la hora", "Pasá cualquier número a palabras en inglés y aprendé a decir la hora con un reloj interactivo."],
      phrases: ["Frases para turismo", "Un frasebook por situación: saludos, aeropuerto, hotel, restaurante, direcciones, compras y emergencias."],
      vocab: ["Vocabulario por temas", "Entrená el vocabulario clave con tarjetas: países, trabajos, comida, familia, ropa y hotel."],
    };
    const t = titles[id];
    if (!t || !window.Tools[id]) return renderHome();
    const c = mount(`<h1 class="page-title">${icon(TOOL_ICON[id], "ic--title")} ${t[0]}</h1><p class="page-sub">${t[1]}</p><div id="toolMount"></div>`);
    window.Tools[id](c.querySelector("#toolMount"));
  }

  /* ---------------- PRÁCTICA ---------------- */
  function renderPracticeMenu() {
    if (!PRACTICE.length) return renderHome();
    const items = PRACTICE.map(t => `
      <a class="unit-card" href="#/practica/${t.id}" style="--u:${uColor(t.unit)}">
        <div class="unit-card__head">
          ${badge(t.icon, true)}
          <span class="unit-card__num">${t.exercises.length} ejercicios</span>
        </div>
        <div class="unit-card__title">${t.title}</div>
        <div class="unit-card__desc">${t.desc}</div>
      </a>`).join("");
    mount(`
      <h1 class="page-title">${icon("practice","ic--title")} Ejercicios de práctica</h1>
      <p class="page-sub">Ejercicios de cada unidad con la respuesta revelable. Intentá resolverlos antes de ver la solución.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderPractice(id) {
    const tp = practiceById(id);
    if (!tp) return renderPracticeMenu();
    const unit = unitById(tp.unit);
    const exs = tp.exercises.map((e, i) => `
      <div class="exercise">
        <div class="exercise__head">
          <span class="exercise__n">${i + 1}</span>
          <div class="exercise__q">${e.q}</div>
        </div>
        <button class="exercise__toggle btn btn--ghost" data-i="${i}">Ver solución</button>
        <div class="exercise__sol" id="sol-${i}" hidden>${e.sol}</div>
      </div>`).join("");

    const c = mount(`
      <div class="chip">${badge(tp.icon)} Práctica</div>
      <h1 class="page-title" style="margin-top:10px">${tp.title}</h1>
      <p class="page-sub">${tp.desc}</p>
      <div class="btn-row">
        ${unit ? `<a class="btn" href="#/unit/${unit.id}">${icon("book")} Repasar teoría</a>` : ""}
        <button class="btn" id="toggleAll">Mostrar todas las soluciones</button>
      </div>
      <div class="exercise-list">${exs}</div>
      <div class="pager"><span></span>
        <a class="next" href="#/practica"><small>Más práctica →</small>Volver a la lista</a>
      </div>
    `);

    let allShown = false;
    c.querySelectorAll(".exercise__toggle").forEach(b => {
      b.addEventListener("click", () => {
        const sol = c.querySelector(`#sol-${b.dataset.i}`);
        const open = sol.hidden;
        sol.hidden = !open;
        b.textContent = open ? "Ocultar solución" : "Ver solución";
        b.classList.toggle("is-open", open);
      });
    });
    $("#toggleAll").addEventListener("click", () => {
      allShown = !allShown;
      c.querySelectorAll(".exercise__sol").forEach(s => s.hidden = !allShown);
      c.querySelectorAll(".exercise__toggle").forEach(b => {
        b.textContent = allShown ? "Ocultar solución" : "Ver solución";
        b.classList.toggle("is-open", allShown);
      });
      $("#toggleAll").textContent = allShown ? "Ocultar todas las soluciones" : "Mostrar todas las soluciones";
    });
  }

  /* ---------------- QUIZ ---------------- */
  function renderQuizMenu() {
    const items = UNITS.map((u, i) => {
      const q = progress.quiz[u.id];
      const score = q ? `Mejor: ${q.best}/${q.total}` : "Sin intentos";
      return `<a class="unit-card" href="#/quiz/${u.id}" style="--u:${uColor(u.id)}">
        <div class="unit-card__head">${badge(u.icon, true)}<span class="unit-card__num">${u.quiz.length} preguntas</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">${score}</div></a>`;
    }).join("");
    mount(`
      <h1 class="page-title">${icon("quiz","ic--title")} Autoevaluación</h1>
      <p class="page-sub">Elegí una unidad y poné a prueba lo que estudiaste.</p>
      <div class="unit-grid">${items}</div>
      <div class="card center">
        <h3 class="mt-0">Modo examen</h3>
        <p class="muted">Mezcla preguntas de todas las unidades.</p>
        <a class="btn btn--primary" href="#/quiz/all">Quiz general</a>
      </div>`);
  }

  function getQuizQuestions(id) {
    if (id === "all") {
      let all = [];
      UNITS.forEach(u => u.quiz.forEach(q => all.push({ ...q, _u: u.id })));
      return { title: "Quiz general", questions: shuffle(all).slice(0, 15), unit: "all" };
    }
    const u = unitById(id);
    if (!u) return null;
    return { title: u.title, questions: u.quiz.map(q => ({ ...q })), unit: u.id };
  }

  function renderQuiz(id) {
    const pack = getQuizQuestions(id);
    if (!pack) return renderHome();
    let i = 0, score = 0, answered = false;

    function onKey(e) {
      if (e.key >= "1" && e.key <= "9") { const opts = document.querySelectorAll("#qOpts .quiz-opt"); const el = opts[+e.key - 1]; if (el) el.click(); }
      else if (e.key === "Enter") { const nx = document.querySelector("#qNext"); if (nx) nx.click(); }
    }
    document.addEventListener("keydown", onKey);
    onLeave(() => document.removeEventListener("keydown", onKey));

    function paint() {
      const q = pack.questions[i];
      const opts = q.opts.map((o, k) => `
        <button class="quiz-opt" data-k="${k}">
          <span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span>
        </button>`).join("");
      const c = mount(`
        <div class="chip">${icon("quiz")} ${pack.title}</div>
        <h1 class="page-title" style="margin:10px 0 4px">Pregunta ${i + 1} de ${pack.questions.length}</h1>
        <div class="quiz-progress">Puntaje: ${score} · <span class="muted">tip: respondé con las teclas 1–4</span></div>
        <div class="card">
          <div class="quiz-question">${q.q}</div>
          <div class="quiz-options" id="qOpts">${opts}</div>
          <div class="quiz-feedback" id="qFb"></div>
          <div class="btn-row" id="qNav" style="margin-top:18px"></div>
        </div>`);

      const optsEl = c.querySelector("#qOpts");
      const fb = c.querySelector("#qFb");
      const nav = c.querySelector("#qNav");

      optsEl.addEventListener("click", e => {
        const b = e.target.closest(".quiz-opt"); if (!b || answered) return;
        answered = true;
        const k = +b.dataset.k;
        const correct = q.a;
        optsEl.querySelectorAll(".quiz-opt").forEach((el, idx) => {
          el.disabled = true;
          if (idx === correct) el.classList.add("correct");
          else if (idx === k) el.classList.add("wrong");
        });
        if (k === correct) { score++; fb.className = "quiz-feedback ok show"; fb.innerHTML = `${icon("check")} <strong>¡Correcto!</strong> ${q.exp || ""}`; }
        else { fb.className = "quiz-feedback no show"; fb.innerHTML = `${icon("cross")} <strong>Incorrecto.</strong> ${q.exp || ""}`; }
        nav.innerHTML = i < pack.questions.length - 1
          ? `<button class="btn btn--primary" id="qNext">Siguiente →</button>`
          : `<button class="btn btn--primary" id="qNext">Ver resultado →</button>`;
        nav.querySelector("#qNext").addEventListener("click", () => {
          if (i < pack.questions.length - 1) { i++; answered = false; paint(); }
          else finish();
        });
      });
    }

    function finish() {
      const total = pack.questions.length;
      const pct = Math.round((score / total) * 100);
      if (pack.unit !== "all") {
        const prev = progress.quiz[pack.unit];
        if (!prev || score > prev.best) progress.quiz[pack.unit] = { best: score, total };
        saveProgress(progress);
      }
      let msg = pct >= 80 ? "¡Excellent! Excelente dominio." : pct >= 50 ? "Good! Pero repasá lo que falló." : "A repasar la teoría." ;
      mount(`
        <h1 class="page-title">Resultado</h1>
        <div class="card center">
          <div class="quiz-score-ring">${score}/${total}</div>
          <div class="progress-bar" style="max-width:320px;margin:16px auto"><span style="width:${pct}%"></span></div>
          <p class="lead">${pct}% · ${msg}</p>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary" id="retry">${icon("refresh")} Reintentar</button>
            <a class="btn" href="#/quiz">Otras unidades</a>
            <a class="btn" href="#/">Inicio</a>
          </div>
        </div>`);
      $("#retry").addEventListener("click", () => { i = 0; score = 0; answered = false; paint(); });
      refreshProgressUI();
    }

    paint();
  }

  /* ---------------- FLASHCARDS ---------------- */
  function renderCardsMenu() {
    const items = UNITS.map((u, i) => `
      <a class="unit-card" href="#/cards/${u.id}" style="--u:${uColor(u.id)}">
        <div class="unit-card__head">${badge(u.icon, true)}<span class="unit-card__num">${u.cards.length} tarjetas</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">Repaso rápido de gramática y vocabulario.</div></a>`).join("");
    mount(`
      <h1 class="page-title">${icon("cards","ic--title")} Flashcards</h1>
      <p class="page-sub">Tocá la tarjeta para ver la respuesta. Ideal para repaso rápido.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderCards(id) {
    const u = unitById(id);
    if (!u) return renderHome();
    let order = u.cards.map((_, k) => k), pos = 0;
    function go(d) { pos = (pos + d + u.cards.length) % u.cards.length; paint(); }
    function flip() { const fc = $("#fc"); if (fc) fc.classList.toggle("flipped"); }

    function paint() {
      const card = u.cards[order[pos]];
      const c = mount(`
        <div class="chip" style="--u:${uColor(u.id)};background:color-mix(in srgb,var(--u) 15%,var(--surface));color:var(--u)">${badge(u.icon)} ${u.title}</div>
        <h1 class="page-title" style="margin:10px 0 4px">Flashcards</h1>
        <p class="page-sub">Tarjeta ${pos + 1} de ${u.cards.length} · tocá la tarjeta o usá la barra espaciadora</p>
        <div class="flashcard" id="fc">
          <div class="flashcard__inner">
            <div class="flashcard__face flashcard__face--front">
              <div class="flashcard__q">${card.q}</div>
              <div class="flashcard__hint">Tocá para ver la respuesta</div>
            </div>
            <div class="flashcard__face flashcard__face--back">
              <div class="flashcard__a">${card.a}</div>
              <div class="flashcard__hint">Tocá para volver</div>
            </div>
          </div>
        </div>
        <div class="btn-row" style="justify-content:space-between">
          <button class="btn" id="fcPrev">← Anterior</button>
          <button class="btn" id="fcShuffle">${icon("shuffle")} Mezclar</button>
          <button class="btn" id="fcNext">Siguiente →</button>
        </div>
        <div class="btn-row" style="justify-content:center">
          <a class="btn btn--ghost" href="#/cards">${icon("cards")} Todas las unidades</a>
          <a class="btn btn--ghost" href="#/quiz/${u.id}">${icon("quiz")} Hacer el quiz</a>
        </div>`);
      const fc = c.querySelector("#fc");
      fc.addEventListener("click", () => fc.classList.toggle("flipped"));
      c.querySelector("#fcPrev").addEventListener("click", () => go(-1));
      c.querySelector("#fcNext").addEventListener("click", () => go(1));
      c.querySelector("#fcShuffle").addEventListener("click", () => { order = shuffle(order); pos = 0; paint(); });
    }

    function onKey(e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    }
    document.addEventListener("keydown", onKey);
    onLeave(() => document.removeEventListener("keydown", onKey));
    paint();
  }

  /* ---------------- PROGRESO ---------------- */
  function renderProgress() {
    const rows = UNITS.map((u, i) => {
      const pct = unitPct(u.id);
      const q = progress.quiz[u.id];
      return `
        <a class="card" href="#/unit/${u.id}" style="--u:${uColor(u.id)};margin-bottom:14px;display:block;color:inherit">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            ${badge(u.icon)}
            <strong>${i + 1}. ${u.title}</strong>
            <span class="chip" style="margin-left:auto;background:color-mix(in srgb,var(--u) 16%,var(--surface));color:var(--u)">${pct}%</span>
          </div>
          <div class="progress-bar"><span style="width:${pct}%;background:linear-gradient(90deg,var(--u),color-mix(in srgb,var(--u) 45%,var(--accent-2)))"></span></div>
          <div class="muted" style="font-size:12.5px;margin-top:8px">
            ${progress.read[u.id] ? "Teoría leída ✓" : "Teoría pendiente"} ·
            ${q ? `Quiz: ${q.best}/${q.total}` : "Quiz sin intentos"}
          </div>
        </a>`;
    }).join("");

    mount(`
      <h1 class="page-title">${icon("progress","ic--title")} Mi progreso</h1>
      <p class="page-sub">Tu avance se guarda en este dispositivo (localStorage).</p>
      <div class="card center" style="margin-bottom:20px">
        ${progressRing(globalPct(), 140)}
        <p class="muted" style="margin-top:6px">Progreso general</p>
        <p class="muted" style="font-size:13px">${progress.exam && progress.exam.best != null ? `Examen (U1–4) · mejor nota: <strong>${progress.exam.best}/10</strong>` : "Examen (U1–4): sin intentos"}</p>
      </div>
      ${rows}
      <div class="btn-row">
        <a class="btn" href="#/exam">${icon("exam")} Rendir examen</a>
        <button class="btn" id="resetProg">${icon("trash")} Reiniciar progreso</button>
      </div>`);

    $("#resetProg").addEventListener("click", () => {
      dialog({
        icon: "trash",
        danger: true,
        title: "¿Borrar todo tu progreso?",
        message: "Se eliminarán las unidades leídas, los puntajes de los quiz y la nota del examen. Esta acción no se puede deshacer.",
        confirmText: "Borrar todo",
        cancelText: "Cancelar",
      }).then(ok => {
        if (!ok) return;
        progress = { read: {}, quiz: {}, exam: {} };
        saveProgress(progress);
        router();
      });
    });
  }

  /* ---------------- JUEGOS ---------------- */
  const GAMES = [
    { id: "memory", title: "Memotest", desc: "Emparejá cada palabra en inglés con su traducción al español." },
    { id: "speed", title: "Contrarreloj", desc: "Respondé la mayor cantidad de preguntas en 60 segundos." },
    { id: "sentence", title: "Ordená la oración", desc: "Armá la oración correcta colocando las palabras en orden." },
    { id: "hangman", title: "Ahorcado", desc: "Adiviná la palabra letra por letra antes de quedarte sin vidas." },
    { id: "oddone", title: "¿Cuál sobra?", desc: "Encontrá la palabra que no pertenece al grupo." },
    { id: "truefalse", title: "Verdadero o Falso", desc: "Decidí si la afirmación de gramática o vocabulario es correcta." },
  ];

  function renderGamesMenu() {
    const gColors = ["#0ea5e9", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#ec4899"];
    const items = GAMES.map((g, i) => `
      <a class="unit-card" href="#/games/${g.id}" style="--u:${gColors[i % gColors.length]}">
        <div class="unit-card__head">${badge("games", true)}<span class="unit-card__num">Juego</span></div>
        <div class="unit-card__title">${g.title}</div>
        <div class="unit-card__desc">${g.desc}</div>
      </a>`).join("");
    mount(`
      <h1 class="page-title">${icon("games","ic--title")} Juegos</h1>
      <p class="page-sub">Aprendé jugando: memoria, velocidad, orden de palabras y deletreo.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderGame(id) {
    const g = GAMES.find(x => x.id === id);
    if (!g || !window.Games || !window.Games[id]) return renderGamesMenu();
    const c = mount(`
      <div class="chip">${icon("games")} Juego</div>
      <h1 class="page-title" style="margin-top:10px">${g.title}</h1>
      <p class="page-sub">${g.desc}</p>
      <div id="gameMount"></div>
      <div class="pager"><span></span>
        <a class="next" href="#/games"><small>Más juegos →</small>Volver a la lista</a>
      </div>`);
    window.Games[id](c.querySelector("#gameMount"));
  }

  /* ---------------- EXAMEN (Unidades 1–4) ---------------- */
  function renderExam() {
    let bank = [];
    UNITS.slice(0, 4).forEach(u => u.quiz.forEach(q => bank.push({ ...q })));
    const questions = shuffle(bank).slice(0, Math.min(20, bank.length));
    const answers = {};
    let submitted = false;
    const TIME = 15 * 60;
    let left = TIME;

    const qHtml = (q, i) => `
      <div class="card exam-q" data-q="${i}">
        <div class="exam-num">Pregunta ${i + 1} de ${questions.length}</div>
        <div class="quiz-question" style="font-size:16px">${q.q}</div>
        <div class="quiz-options">
          ${q.opts.map((o, k) => `<button class="quiz-opt" data-q="${i}" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("")}
        </div>
      </div>`;

    const best = progress.exam && progress.exam.best;
    const c = mount(`
      <div class="chip">${icon("exam")} Examen</div>
      <h1 class="page-title" style="margin-top:10px">Examen · Unidades 1–4</h1>
      <p class="page-sub">${questions.length} preguntas de las primeras 4 unidades. Tenés 15 minutos.${best != null ? ` Tu mejor nota: <strong>${best}/10</strong>.` : ""}</p>
      <div class="game-bar" style="position:sticky;top:var(--header-h);z-index:5;background:var(--bg);padding:10px 0">
        <span class="game-stat timer" id="exTimer">⏱ <b>15:00</b></span>
        <button class="btn btn--primary" id="exSubmit">${icon("check")} Entregar examen</button>
      </div>
      <div id="exTop"></div>
      <div id="exList">${questions.map((q, i) => qHtml(q, i)).join("")}</div>
      <div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="exSubmit2">${icon("check")} Entregar examen</button></div>
    `);

    const list = c.querySelector("#exList");
    list.addEventListener("click", e => {
      if (submitted) return;
      const b = e.target.closest(".quiz-opt"); if (!b) return;
      const qi = +b.dataset.q;
      answers[qi] = +b.dataset.k;
      list.querySelectorAll(`.quiz-opt[data-q="${qi}"]`).forEach(el => el.classList.toggle("selected", el === b));
    });

    const fmt = s => { const m = Math.floor(s / 60), ss = s % 60; return m + ":" + (ss < 10 ? "0" : "") + ss; };
    const elTimer = c.querySelector("#exTimer");
    function tick() { left--; elTimer.innerHTML = `⏱ <b>${fmt(left)}</b>`; elTimer.classList.toggle("low", left <= 60); if (left <= 0) submit(); }
    examTimer = setInterval(tick, 1000);

    function submit() {
      if (submitted) return; submitted = true;
      if (examTimer) { clearInterval(examTimer); examTimer = null; }
      let score = 0;
      questions.forEach((q, i) => {
        const sel = answers[i];
        const opts = list.querySelectorAll(`.quiz-opt[data-q="${i}"]`);
        opts.forEach((el, k) => {
          el.disabled = true; el.classList.remove("selected");
          if (k === q.a) el.classList.add("correct");
          else if (k === sel) el.classList.add("wrong");
        });
        const ok = sel === q.a; if (ok) score++;
        const card = list.querySelector(`.exam-q[data-q="${i}"]`);
        const fb = document.createElement("div");
        fb.className = "quiz-feedback " + (ok ? "ok" : "no") + " show";
        fb.innerHTML = (ok ? icon("check") + " <strong>Correcto.</strong> " : icon("cross") + " <strong>" + (sel == null ? "Sin responder." : "Incorrecto.") + "</strong> ") + (q.exp || "");
        card.appendChild(fb);
      });
      const grade = Math.round(score / questions.length * 10);
      const pct = Math.round(score / questions.length * 100);
      if (!progress.exam || grade > (progress.exam.best || 0)) { progress.exam = { best: grade, score, total: questions.length }; saveProgress(progress); }
      const passed = pct >= 60;
      c.querySelector("#exTop").innerHTML = `
        <div class="card center">
          <div class="quiz-score-ring">${grade}/10</div>
          <div class="progress-bar" style="max-width:320px;margin:14px auto"><span style="width:${pct}%"></span></div>
          <p class="lead">${score}/${questions.length} correctas · ${pct}% · ${passed ? "¡Aprobado!" : "Seguí practicando."}</p>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary" id="exRetry">${icon("refresh")} Nuevo examen</button>
            <a class="btn" href="#/quiz">Autoevaluación por unidad</a>
            <a class="btn" href="#/">Inicio</a>
          </div>
        </div>`;
      elTimer.innerHTML = "Entregado";
      c.querySelector("#exRetry").addEventListener("click", renderExam);
      c.querySelector("#exTop").scrollIntoView({ behavior: "smooth", block: "start" });
      refreshProgressUI();
    }

    function askSubmit() {
      if (submitted) return;
      const unanswered = questions.length - Object.keys(answers).length;
      dialog({
        icon: "exam",
        title: "¿Entregar el examen?",
        message: (unanswered > 0 ? `Te ${unanswered === 1 ? "queda" : "quedan"} <strong>${unanswered}</strong> pregunta${unanswered === 1 ? "" : "s"} sin responder. ` : "") + "Vas a ver tu nota y la corrección. No podrás cambiar las respuestas.",
        confirmText: "Entregar",
        cancelText: "Seguir resolviendo",
      }).then(ok => { if (ok) submit(); });
    }
    c.querySelector("#exSubmit").addEventListener("click", askSubmit);
    c.querySelector("#exSubmit2").addEventListener("click", askSubmit);
  }

  /* ---------------- BÚSQUEDA ---------------- */
  function buildSearchIndex() {
    const idx = [];
    UNITS.forEach((u, i) => {
      idx.push({ title: `${i + 1}. ${u.title}`, sub: "Unidad · teoría", href: `#/unit/${u.id}`, hay: (u.title + " " + u.desc).toLowerCase() });
      const tmp = document.createElement("div"); tmp.innerHTML = u.html;
      tmp.querySelectorAll("h2,h3").forEach(h => {
        idx.push({ title: h.textContent.trim(), sub: u.title, href: `#/unit/${u.id}`, hay: h.textContent.toLowerCase() });
      });
    });
    PRACTICE.forEach(t => idx.push({ title: t.title, sub: "Práctica · ejercicios", href: `#/practica/${t.id}`, hay: (t.title + " " + t.desc).toLowerCase() }));
    [["Conjugador de verbos","Herramienta","#/tool/verbs"],
     ["Números y la hora","Herramienta","#/tool/numbers"],
     ["Frases para turismo","Herramienta","#/tool/phrases"],
     ["Vocabulario por temas","Herramienta","#/tool/vocab"],
     ["Memotest","Juego","#/games/memory"],
     ["Contrarreloj","Juego","#/games/speed"],
     ["Ordená la oración","Juego","#/games/sentence"],
     ["Ahorcado","Juego","#/games/hangman"],
     ["¿Cuál sobra?","Juego","#/games/oddone"],
     ["Verdadero o Falso","Juego","#/games/truefalse"],
     ["Juegos","Juegos","#/games"],
     ["Examen Unidades 1–4","Examen","#/exam"],
     ["Ejercicios","Práctica","#/practica"],
     ["Autoevaluación","Práctica","#/quiz"],
     ["Flashcards","Práctica","#/cards"]].forEach(([t,s,h]) =>
       idx.push({ title: t, sub: s, href: h, hay: t.toLowerCase() }));
    return idx;
  }
  let SEARCH_INDEX = [];

  function initSearch() {
    SEARCH_INDEX = buildSearchIndex();
    const input = $("#searchInput");
    const box = $("#searchResults");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { box.classList.remove("open"); return; }
      const hits = SEARCH_INDEX.filter(x => x.hay.includes(q)).slice(0, 8);
      if (!hits.length) { box.innerHTML = `<div class="search__item">Sin resultados</div>`; box.classList.add("open"); return; }
      box.innerHTML = hits.map(h => `<div class="search__item" data-href="${h.href}">${h.title}<small>${h.sub}</small></div>`).join("");
      box.classList.add("open");
    });
    box.addEventListener("click", e => {
      const it = e.target.closest(".search__item"); if (!it || !it.dataset.href) return;
      location.hash = it.dataset.href; input.value = ""; box.classList.remove("open");
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".sidebar__search")) box.classList.remove("open");
    });
  }

  /* ---------------- Tema ---------------- */
  function initTheme() {
    const saved = localStorage.getItem("estudioIng.theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.body.dataset.theme = theme;
    const tgl = $("#themeToggle");
    tgl.innerHTML = theme === "dark" ? icon("sun") : icon("moon");
    tgl.addEventListener("click", () => {
      const t = document.body.dataset.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = t;
      localStorage.setItem("estudioIng.theme", t);
      tgl.innerHTML = t === "dark" ? icon("sun") : icon("moon");
    });
  }

  /* ---------------- Sidebar móvil ---------------- */
  function openSidebar() { $("#sidebar").classList.add("open"); $("#sidebarOverlay").classList.add("show"); }
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#sidebarOverlay").classList.remove("show"); }
  function initSidebar() {
    $("#menuToggle").addEventListener("click", openSidebar);
    $("#sidebarClose").addEventListener("click", closeSidebar);
    $("#sidebarOverlay").addEventListener("click", closeSidebar);
  }

  /* ---------------- Utils ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* Diálogo modal con estilo propio (reemplaza confirm/alert). Devuelve Promise<boolean>. */
  function dialog(opts) {
    const o = opts || {};
    const confirmText = o.confirmText || "Aceptar";
    const cancelText = o.cancelText || "Cancelar";
    const variant = o.danger ? "danger" : (o.ok ? "ok" : "");
    return new Promise(resolve => {
      const ov = document.createElement("div");
      ov.className = "modal-overlay";
      ov.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-label="${(o.title || "").replace(/"/g, "&quot;")}">
          ${o.icon ? `<div class="modal__icon ${variant}">${icon(o.icon)}</div>` : ""}
          <div class="modal__title">${o.title || ""}</div>
          ${o.message ? `<div class="modal__msg">${o.message}</div>` : ""}
          <div class="modal__actions">
            ${o.confirmOnly ? "" : `<button class="btn" data-act="cancel">${cancelText}</button>`}
            <button class="btn ${o.danger ? "btn--danger" : "btn--primary"}" data-act="ok">${confirmText}</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
      (window.requestAnimationFrame || window.setTimeout)(() => ov.classList.add("show"));

      let done = false;
      function close(val) {
        if (done) return; done = true;
        document.removeEventListener("keydown", onKey);
        ov.classList.remove("show");
        setTimeout(() => ov.remove(), 200);
        resolve(val);
      }
      function onKey(e) {
        if (e.key === "Escape") close(false);
        else if (e.key === "Enter") close(true);
      }
      ov.addEventListener("click", e => {
        if (e.target === ov) return close(false);
        const b = e.target.closest("[data-act]");
        if (b) close(b.dataset.act === "ok");
      });
      document.addEventListener("keydown", onKey);
      const okBtn = ov.querySelector('[data-act="ok"]');
      if (okBtn && okBtn.focus) okBtn.focus();
    });
  }

  /* ---------------- Extras (botón subir) ---------------- */
  function initExtras() {
    // Botón flotante "subir"
    const fab = document.createElement("button");
    fab.className = "fab-top"; fab.title = "Subir"; fab.setAttribute("aria-label", "Volver arriba");
    fab.innerHTML = icon("up");
    document.body.appendChild(fab);
    fab.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => { fab.classList.toggle("show", window.scrollY > 420); }, { passive: true });
  }

  /* ---------------- Init ---------------- */
  function init() {
    $("#brandLogo").innerHTML = icon("globe");
    buildNav();
    initTheme();
    initSidebar();
    initSearch();
    initExtras();
    window.addEventListener("hashchange", router);
    router();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
