/* ============================================================
   APP — router, navegación, progreso, quiz, flashcards, práctica, búsqueda
   Estudio Programación 1 (Lenguaje C)
   ============================================================ */
(function () {
  "use strict";
  const DATA = window.APP_DATA;
  const UNITS = DATA.units;
  const PRACTICE = DATA.practica || [];
  const GAMES = [
    { id: "output", icon: "terminal", title: "Adiviná la salida", desc: "Predecí qué imprime cada printf." },
    { id: "trace", icon: "activity", title: "¿Cuánto vale?", desc: "Seguí el código y calculá el valor final de la variable." },
    { id: "memo", icon: "cards", title: "Memotest de funciones", desc: "Emparejá cada función con lo que hace." },
    { id: "types", icon: "tag", title: "Clasificá el tipo", desc: "¿El literal es int, float, char o cadena?" },
    { id: "format", icon: "percent", title: "Elegí el formato", desc: "¿%i, %f, %c o %s? El especificador correcto." },
    { id: "order", icon: "sort", title: "Ordená el código", desc: "Arrastrá las líneas para armar el programa." },
    { id: "bug", icon: "bug", title: "Cazá el error", desc: "Decidí si el código está bien o tiene un error." },
    { id: "hangman", icon: "letters", title: "Ahorcado", desc: "Adiviná la palabra del vocabulario de programación." },
    { id: "connect", icon: "link", title: "Conectá", desc: "Uní cada expresión con su valor." },
    { id: "ascii", icon: "hash", title: "Adiviná el ASCII", desc: "Elegí el código ASCII de cada carácter." },
    { id: "truefalse", icon: "check", title: "Verdadero o Falso", desc: "Decidí V o F sobre conceptos, contrarreloj." },
  ];
  const gameById = id => GAMES.find(g => g.id === id);
  const $ = sel => document.querySelector(sel);

  /* ---------------- Iconos (SVG de línea) ---------------- */
  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    translate: '<path d="M4 5h7M8 4v2c0 3-2 5-5 6.5"/><path d="M5 9c1.5 2.5 4 3.8 7 4.5"/><path d="m12.5 20 4-9 4 9M14 17h5"/>',
    hash: '<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/>',
    binary: '<rect x="3.5" y="4" width="6" height="16" rx="3"/><path d="M15 4h2v16M14 20h5"/>',
    brackets: '<path d="M8 4H5v16h3M16 4h3v16h-3"/>',
    tag: '<path d="M3 11V5a2 2 0 0 1 2-2h6l9 9-8 8z"/><circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
    activity: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
    bug: '<path d="M9 7a3 3 0 0 1 6 0M5 11h14M6 11v4a6 6 0 0 0 12 0v-4M12 13v7M3 9l3 1.2M3 17l3-1.2M21 9l-3 1.2M21 17l-3-1.2"/>',
    sort: '<path d="M7 4v16M7 4 4 7M7 4l3 3"/><path d="M17 20V4M17 20l-3-3M17 20l3-3"/>',
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
    games: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M6.5 11v3M5 12.5h3"/><circle cx="16" cy="11.5" r="1.1"/><circle cx="18.5" cy="14" r="1.1"/>',
    letters: '<path d="M4 7V5h16v2M9 5v14M7 19h4"/>',
    link: '<path d="M9 12h6"/><path d="M10 8H7a4 4 0 0 0 0 8h3"/><path d="M14 8h3a4 4 0 0 1 0 8h-3"/>',
  };
  function icon(name, cls) {
    return `<svg class="ic ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }
  const TOOLS = [
    { id: "consola", icon: "terminal", title: "Consola de C", desc: "Escribí y ejecutá programas en C, con paso a paso." },
    { id: "pseint", icon: "translate", title: "De PSeInt a C", desc: "Compará el pseudocódigo con su equivalente en C." },
    { id: "ascii", icon: "hash", title: "Tabla ASCII", desc: "El código numérico de cada carácter." },
    { id: "bases", icon: "binary", title: "Conversor de bases", desc: "Decimal, binario, octal y hexadecimal." },
    { id: "vectores", icon: "brackets", title: "Simulador de vectores", desc: "Visualizá cómo se carga y recorre un arreglo." },
    { id: "tipos", icon: "tag", title: "Explorador de tipos", desc: "¿Qué tipo contiene este valor? Bytes y formato." },
  ];
  const toolById = id => TOOLS.find(t => t.id === id);
  function badge(glyph, big) { return `<span class="ubadge${big ? " ubadge--lg" : ""}">${glyph}</span>`; }

  /* ---------------- Resaltado de código ---------------- */
  function highlightCode(root) {
    root.querySelectorAll("pre.code").forEach(p => {
      if (!p.dataset.hl) { p.innerHTML = window.CEngine.highlight(p.textContent); p.dataset.hl = "1"; }
    });
  }

  /* ---------------- Progreso (localStorage) ---------------- */
  const STORE_KEY = "estudioProg.progress.v1";
  function loadProgress() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } }
  function saveProgress(p) { localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
  let progress = loadProgress();
  progress.read = progress.read || {};
  progress.quiz = progress.quiz || {};

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
      el.classList.toggle("completed", unitPct(el.dataset.unit) >= 100);
    });
  }

  /* ---------------- Navegación lateral ---------------- */
  function buildNav() {
    const nav = $("#mainNav");
    let html = `<div class="nav__group-title">General</div>`;
    html += navItem("#/", icon("home"), "Inicio", null);
    html += navItem("#/progress", icon("progress"), "Mi progreso", null);
    html += `<div class="nav__group-title">Unidades</div>`;
    UNITS.forEach((u, i) => { html += navItem(`#/unit/${u.id}`, badge(u.glyph), `${i + 1}. ${u.title}`, u.id); });
    html += `<div class="nav__group-title">Herramientas</div>`;
    TOOLS.forEach(t => { html += navItem(`#/tool/${t.id}`, icon(t.icon), t.title, null); });
    html += `<div class="nav__group-title">Práctica</div>`;
    html += navItem("#/practica", icon("practice"), "Ejercicios (TP)", null);
    html += navItem("#/cards", icon("cards"), "Flashcards", null);
    html += navItem("#/quiz", icon("quiz"), "Autoevaluación", null);
    html += `<div class="nav__group-title">Juegos</div>`;
    html += navItem("#/games", icon("games"), `Todos los juegos (${GAMES.length})`, null);
    nav.innerHTML = html;
  }
  function navItem(href, ic, label, unit) {
    return `<a class="nav__item" href="${href}" ${unit ? `data-unit="${unit}"` : ""}>
      <span class="nav__ic">${ic}</span><span class="nav__label">${label}</span>
      <span class="nav__check">${icon("check")}</span></a>`;
  }
  function setActiveNav(hash) {
    document.querySelectorAll(".nav__item").forEach(a => a.classList.toggle("active", a.getAttribute("href") === hash));
  }

  /* ---------------- Router ---------------- */
  function router() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/");
    const root = parts[0] || "";
    const id = parts[1] || "";
    const content = $("#content");
    content.scrollTop = 0; window.scrollTo(0, 0);
    if (window.Games && window.Games.stopAll) window.Games.stopAll();
    if (window.Tools && window.Tools.stopAll) window.Tools.stopAll();

    let crumb = "Inicio";
    if (root === "") renderHome();
    else if (root === "unit") { crumb = unitById(id)?.title || "Unidad"; renderUnit(id); }
    else if (root === "tool") { crumb = "Herramienta"; renderToolPage(id); }
    else if (root === "games" && id) { crumb = "Juegos"; renderGame(id); }
    else if (root === "games") { crumb = "Juegos"; renderGamesMenu(); }
    else if (root === "quiz" && id) { crumb = "Autoevaluación"; renderQuiz(id); }
    else if (root === "quiz") { crumb = "Autoevaluación"; renderQuizMenu(); }
    else if (root === "cards" && id) { crumb = "Flashcards"; renderCards(id); }
    else if (root === "cards") { crumb = "Flashcards"; renderCardsMenu(); }
    else if (root === "practica" && id) { crumb = "Ejercicios"; renderPractice(id); }
    else if (root === "practica") { crumb = "Ejercicios"; renderPracticeMenu(); }
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

  /* ---------------- Vistas ---------------- */
  function mount(html) {
    const c = $("#content");
    c.innerHTML = `<div class="fade-in">${html}</div>`;
    highlightCode(c);
    return c;
  }

  function renderHome() {
    const cards = UNITS.map((u, i) => `
      <a class="unit-card" href="#/unit/${u.id}">
        <div class="unit-card__head">${badge(u.glyph, true)}<span class="unit-card__num">Unidad ${i + 1}</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">${u.desc}</div>
        <div class="unit-card__bar"><span style="width:${unitPct(u.id)}%"></span></div>
      </a>`).join("");
    const totalEx = PRACTICE.reduce((s, t) => s + t.exercises.length, 0);

    mount(`
      <h1 class="page-title">Plataforma de estudio de Programación 1</h1>
      <p class="page-sub">Introducción al lenguaje C · Teoría, una consola interactiva, práctica guiada, juegos y autoevaluación.</p>

      <div class="stat-row">
        <div class="stat"><div class="stat__num">${UNITS.length}</div><div class="stat__label">Unidades</div></div>
        <div class="stat"><div class="stat__num">${TOOLS.length}</div><div class="stat__label">Herramientas</div></div>
        <div class="stat"><div class="stat__num">${GAMES.length}</div><div class="stat__label">Juegos</div></div>
        <div class="stat"><div class="stat__num">${totalEx}</div><div class="stat__label">Ejercicios TP</div></div>
        <div class="stat"><div class="stat__num">${globalPct()}%</div><div class="stat__label">Progreso</div></div>
      </div>

      <div class="card" style="background:linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, var(--surface)), var(--surface))">
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <span class="tool-card__ic" style="width:48px;height:48px">${icon("terminal")}</span>
          <div style="flex:1;min-width:200px">
            <div style="font-weight:700;font-size:16px">Consola de C interactiva</div>
            <div class="unit-card__desc">Escribí programas en C y ejecutalos acá mismo, con salida y modo paso a paso.</div>
          </div>
          <a class="btn btn--primary" href="#/tool/consola">▶ Abrir consola</a>
        </div>
      </div>

      <h2>Unidades</h2>
      <div class="unit-grid">${cards}</div>

      <h2>Herramientas interactivas</h2>
      <div class="tool-grid">
        ${TOOLS.map(t => toolCard(`#/tool/${t.id}`, t.icon, t.title, t.desc)).join("")}
      </div>

      <h2>Para practicar</h2>
      <div class="btn-row">
        <a class="btn btn--primary" href="#/practica">${icon("practice")} Ejercicios de los TP</a>
        <a class="btn" href="#/cards">${icon("cards")} Flashcards</a>
        <a class="btn" href="#/quiz">${icon("quiz")} Autoevaluación</a>
        <a class="btn" href="#/progress">${icon("progress")} Mi progreso</a>
      </div>

      <h2>Juegos de aprendizaje</h2>
      <div class="tool-grid">
        ${GAMES.map(g => `<a class="tool-card" href="#/games/${g.id}">
          <span class="tool-card__ic">${icon(g.icon)}</span>
          <div><div class="tool-card__title">${g.title}</div>
          <div class="unit-card__desc">${g.desc}</div></div></a>`).join("")}
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
      <div class="chip">${badge(u.glyph)} Unidad ${idx + 1}</div>
      <h1 class="page-title" style="margin-top:10px">${u.title}</h1>
      <p class="page-sub">${u.desc}</p>
      ${u.html}

      <div class="card center">
        <h3 class="mt-0">¿Listo con la teoría?</h3>
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

    $("#markRead").addEventListener("click", () => {
      progress.read[u.id] = !progress.read[u.id];
      saveProgress(progress);
      router();
    });
  }

  function renderToolPage(id) {
    const t = toolById(id);
    if (!t || !window.Tools[id]) return renderHome();
    const c = mount(`<h1 class="page-title">${icon(t.icon, "ic--title")} ${t.title}</h1><p class="page-sub">${t.desc}</p><div id="toolMount"></div>`);
    window.Tools[id](c.querySelector("#toolMount"));
    highlightCode(c);
  }

  /* ---------------- JUEGOS ---------------- */
  function gameBestText(id) {
    const b = window.Games && window.Games.getBest ? window.Games.getBest(id) : null;
    if (b == null) return "Sin jugar todavía";
    if (typeof b === "number") return `Mejor: ${b} ${id === "hangman" ? "palabras" : id === "order" ? "programas" : "aciertos"}`;
    if (b.moves != null) return `Mejor: ${b.moves} movimientos`;
    return "Jugado";
  }
  function renderGamesMenu() {
    const items = GAMES.map(g => `
      <a class="unit-card" href="#/games/${g.id}">
        <div class="unit-card__head"><span class="tool-card__ic">${icon(g.icon)}</span><span class="unit-card__num">${gameBestText(g.id)}</span></div>
        <div class="unit-card__title">${g.title}</div>
        <div class="unit-card__desc">${g.desc}</div>
      </a>`).join("");
    mount(`
      <h1 class="page-title">${icon("games", "ic--title")} Juegos de aprendizaje</h1>
      <p class="page-sub">Aprendé jugando: predecí salidas, cazá errores y ejercitá la memoria. Tu mejor marca se guarda en este dispositivo.</p>
      <div class="unit-grid">${items}</div>`);
  }
  function renderGame(id) {
    const g = gameById(id);
    if (!g || !window.Games || !window.Games[id]) return renderGamesMenu();
    const c = mount(`
      <div class="chip">${icon("games")} Juego</div>
      <h1 class="page-title" style="margin-top:10px">${icon(g.icon, "ic--title")} ${g.title}</h1>
      <p class="page-sub">${g.desc}</p>
      <div id="gameMount"></div>
      <div class="pager"><span></span><a class="next" href="#/games"><small>Más juegos →</small>Volver a la lista</a></div>`);
    window.Games[id](c.querySelector("#gameMount"));
  }

  /* ---------------- PRÁCTICA (TP) ---------------- */
  function renderPracticeMenu() {
    if (!PRACTICE.length) return renderHome();
    const items = PRACTICE.map(t => `
      <a class="unit-card" href="#/practica/${t.id}">
        <div class="unit-card__head">${badge(t.glyph, true)}<span class="unit-card__num">${t.exercises.length} ejercicios</span></div>
        <div class="unit-card__title">${t.title}</div>
        <div class="unit-card__desc">${t.desc}</div>
      </a>`).join("");
    mount(`
      <h1 class="page-title">${icon("practice", "ic--title")} Ejercicios de los Trabajos Prácticos</h1>
      <p class="page-sub">Ejercicios reales de cada TP con su solución en C (¡copiala a la consola para probarla!). Intentá resolverlos antes de revelar la respuesta.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderPractice(id) {
    const tp = practiceById(id);
    if (!tp) return renderPracticeMenu();
    const unit = unitById(tp.unit);
    const exs = tp.exercises.map((e, i) => `
      <div class="exercise">
        <div class="exercise__head"><span class="exercise__n">${i + 1}</span><div class="exercise__q">${e.q}</div></div>
        <button class="exercise__toggle btn btn--ghost" data-i="${i}">Ver solución</button>
        <div class="exercise__sol" id="sol-${i}" hidden>${e.sol}</div>
      </div>`).join("");

    const c = mount(`
      <div class="chip">${badge(tp.glyph)} Práctica</div>
      <h1 class="page-title" style="margin-top:10px">${tp.title}</h1>
      <p class="page-sub">${tp.desc}</p>
      <div class="btn-row">
        ${unit ? `<a class="btn" href="#/unit/${unit.id}">${icon("book")} Repasar teoría</a>` : ""}
        <a class="btn" href="#/tool/consola">${icon("terminal")} Abrir consola</a>
        <button class="btn" id="toggleAll">Mostrar todas las soluciones</button>
      </div>
      <div class="exercise-list">${exs}</div>
      <div class="pager"><span></span><a class="next" href="#/practica"><small>Otros TP →</small>Volver a la lista</a></div>
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
      c.querySelectorAll(".exercise__toggle").forEach(b => { b.textContent = allShown ? "Ocultar solución" : "Ver solución"; b.classList.toggle("is-open", allShown); });
      $("#toggleAll").textContent = allShown ? "Ocultar todas las soluciones" : "Mostrar todas las soluciones";
    });
  }

  /* ---------------- QUIZ ---------------- */
  function renderQuizMenu() {
    const items = UNITS.map((u) => {
      const q = progress.quiz[u.id];
      const score = q ? `Mejor: ${q.best}/${q.total}` : "Sin intentos";
      return `<a class="unit-card" href="#/quiz/${u.id}">
        <div class="unit-card__head">${badge(u.glyph, true)}<span class="unit-card__num">${u.quiz.length} preguntas</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">${score}</div></a>`;
    }).join("");
    mount(`
      <h1 class="page-title">${icon("quiz", "ic--title")} Autoevaluación</h1>
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
      return { title: "Quiz general", questions: shuffle(all).slice(0, 12), unit: "all" };
    }
    const u = unitById(id);
    if (!u) return null;
    return { title: u.title, questions: u.quiz.map(q => ({ ...q })), unit: u.id };
  }

  function renderQuiz(id) {
    const pack = getQuizQuestions(id);
    if (!pack) return renderHome();
    let i = 0, score = 0, answered = false;

    function paint() {
      const q = pack.questions[i];
      const opts = q.opts.map((o, k) => `
        <button class="quiz-opt" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("");
      const c = mount(`
        <div class="chip">${icon("quiz")} ${pack.title}</div>
        <h1 class="page-title" style="margin:10px 0 4px">Pregunta ${i + 1} de ${pack.questions.length}</h1>
        <div class="quiz-progress">Puntaje: ${score}</div>
        <div class="card">
          <div class="quiz-question">${q.q}</div>
          <div class="quiz-options" id="qOpts">${opts}</div>
          <div class="quiz-feedback" id="qFb"></div>
          <div class="btn-row" id="qNav" style="margin-top:18px"></div>
        </div>`);

      const optsEl = c.querySelector("#qOpts"), fb = c.querySelector("#qFb"), nav = c.querySelector("#qNav");
      optsEl.addEventListener("click", e => {
        const b = e.target.closest(".quiz-opt"); if (!b || answered) return;
        answered = true;
        const k = +b.dataset.k, correct = q.a;
        optsEl.querySelectorAll(".quiz-opt").forEach((el, idx) => {
          el.disabled = true;
          if (idx === correct) el.classList.add("correct");
          else if (idx === k) el.classList.add("wrong");
        });
        if (k === correct) { score++; fb.className = "quiz-feedback ok show"; fb.innerHTML = `${icon("check")} <strong>¡Correcto!</strong> ${q.exp || ""}`; }
        else { fb.className = "quiz-feedback no show"; fb.innerHTML = `${icon("cross")} <strong>Incorrecto.</strong> ${q.exp || ""}`; }
        highlightCode(fb);
        nav.innerHTML = i < pack.questions.length - 1
          ? `<button class="btn btn--primary" id="qNext">Siguiente →</button>`
          : `<button class="btn btn--primary" id="qNext">Ver resultado →</button>`;
        nav.querySelector("#qNext").addEventListener("click", () => { if (i < pack.questions.length - 1) { i++; answered = false; paint(); } else finish(); });
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
      let msg = pct >= 80 ? "¡Excelente dominio!" : pct >= 50 ? "Bien, pero repasá lo que falló." : "A repasar la teoría.";
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
    const items = UNITS.map((u) => `
      <a class="unit-card" href="#/cards/${u.id}">
        <div class="unit-card__head">${badge(u.glyph, true)}<span class="unit-card__num">${u.cards.length} tarjetas</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">Repaso rápido de definiciones y sintaxis.</div></a>`).join("");
    mount(`
      <h1 class="page-title">${icon("cards", "ic--title")} Flashcards</h1>
      <p class="page-sub">Tocá la tarjeta para ver la respuesta. Ideal para repaso rápido.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderCards(id) {
    const u = unitById(id);
    if (!u) return renderHome();
    let i = 0;
    function paint() {
      const card = u.cards[i];
      const c = mount(`
        <div class="chip">${badge(u.glyph)} ${u.title}</div>
        <h1 class="page-title" style="margin:10px 0 4px">Flashcards</h1>
        <p class="page-sub">Tarjeta ${i + 1} de ${u.cards.length}</p>
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
          <a class="btn btn--ghost" href="#/cards">Todas las unidades</a>
          <button class="btn" id="fcNext">Siguiente →</button>
        </div>`);
      const fc = c.querySelector("#fc");
      fc.addEventListener("click", () => fc.classList.toggle("flipped"));
      c.querySelector("#fcPrev").addEventListener("click", () => { i = (i - 1 + u.cards.length) % u.cards.length; paint(); });
      c.querySelector("#fcNext").addEventListener("click", () => { i = (i + 1) % u.cards.length; paint(); });
    }
    paint();
  }

  /* ---------------- PROGRESO ---------------- */
  function renderProgress() {
    const rows = UNITS.map((u, i) => {
      const pct = unitPct(u.id);
      const q = progress.quiz[u.id];
      return `
        <div class="card" style="margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            ${badge(u.glyph)}<strong>${i + 1}. ${u.title}</strong>
            <span class="chip" style="margin-left:auto">${pct}%</span>
          </div>
          <div class="progress-bar"><span style="width:${pct}%"></span></div>
          <div class="muted" style="font-size:12.5px;margin-top:8px">
            ${progress.read[u.id] ? "Teoría leída" : "Teoría pendiente"} ·
            ${q ? `Quiz: ${q.best}/${q.total}` : "Quiz sin intentos"}
          </div>
        </div>`;
    }).join("");

    mount(`
      <h1 class="page-title">${icon("progress", "ic--title")} Mi progreso</h1>
      <p class="page-sub">Tu avance se guarda en este dispositivo (localStorage).</p>
      <div class="card center" style="margin-bottom:20px">
        <div class="quiz-score-ring">${globalPct()}%</div>
        <p class="muted">Progreso general</p>
      </div>
      ${rows}
      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">${icon("games", "ic--title")}<strong>Juegos · mejores marcas</strong></div>
        <div class="game-best-grid">
          ${GAMES.map(g => `<div class="game-best">
            <span class="game-best__ic">${icon(g.icon)}</span>
            <div><div class="game-best__title">${g.title}</div>
            <div class="muted" style="font-size:12.5px">${gameBestText(g.id)}</div></div>
          </div>`).join("")}
        </div>
      </div>
      <div class="btn-row"><button class="btn" id="resetProg">${icon("trash")} Reiniciar progreso</button></div>`);

    $("#resetProg").addEventListener("click", () => {
      if (confirm("¿Seguro que querés borrar todo tu progreso?")) {
        progress = { read: {}, quiz: {} };
        saveProgress(progress);
        router();
      }
    });
  }

  /* ---------------- BÚSQUEDA ---------------- */
  function buildSearchIndex() {
    const idx = [];
    UNITS.forEach((u, i) => {
      idx.push({ title: `${i + 1}. ${u.title}`, sub: "Unidad · teoría", href: `#/unit/${u.id}`, hay: (u.title + " " + u.desc).toLowerCase() });
      const tmp = document.createElement("div"); tmp.innerHTML = u.html;
      tmp.querySelectorAll("h2,h3").forEach(hh => idx.push({ title: hh.textContent.trim(), sub: u.title, href: `#/unit/${u.id}`, hay: hh.textContent.toLowerCase() }));
    });
    PRACTICE.forEach(t => idx.push({ title: t.title, sub: "Práctica · ejercicios", href: `#/practica/${t.id}`, hay: (t.title + " " + t.desc).toLowerCase() }));
    GAMES.forEach(g => idx.push({ title: g.title, sub: "Juego", href: `#/games/${g.id}`, hay: (g.title + " " + g.desc).toLowerCase() }));
    TOOLS.forEach(t => idx.push({ title: t.title, sub: "Herramienta", href: `#/tool/${t.id}`, hay: (t.title + " " + t.desc).toLowerCase() }));
    [["Ejercicios de los TP", "Práctica", "#/practica"], ["Autoevaluación", "Práctica", "#/quiz"], ["Flashcards", "Práctica", "#/cards"], ["Juegos de aprendizaje", "Sección", "#/games"]]
      .forEach(([t, s, hh]) => idx.push({ title: t, sub: s, href: hh, hay: t.toLowerCase() }));
    return idx;
  }
  let SEARCH_INDEX = [];
  function initSearch() {
    SEARCH_INDEX = buildSearchIndex();
    const input = $("#searchInput"), box = $("#searchResults");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { box.classList.remove("open"); return; }
      const hits = SEARCH_INDEX.filter(x => x.hay.includes(q)).slice(0, 8);
      box.innerHTML = hits.length ? hits.map(hi => `<div class="search__item" data-href="${hi.href}">${hi.title}<small>${hi.sub}</small></div>`).join("") : `<div class="search__item">Sin resultados</div>`;
      box.classList.add("open");
    });
    box.addEventListener("click", e => {
      const it = e.target.closest(".search__item"); if (!it || !it.dataset.href) return;
      location.hash = it.dataset.href; input.value = ""; box.classList.remove("open");
    });
    document.addEventListener("click", e => { if (!e.target.closest(".sidebar__search")) box.classList.remove("open"); });
  }

  /* ---------------- Tema ---------------- */
  function initTheme() {
    const saved = localStorage.getItem("estudioProg.theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.body.dataset.theme = theme;
    const tgl = $("#themeToggle");
    tgl.innerHTML = theme === "dark" ? icon("sun") : icon("moon");
    tgl.addEventListener("click", () => {
      const t = document.body.dataset.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = t;
      localStorage.setItem("estudioProg.theme", t);
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

  /* ---------------- Init ---------------- */
  function init() {
    buildNav();
    initTheme();
    initSidebar();
    initSearch();
    window.addEventListener("hashchange", router);
    router();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
