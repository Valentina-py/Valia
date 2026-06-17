/* ============================================================
   APP — router, navegación, progreso, quiz, flashcards,
   laboratorios, práctica, búsqueda y tema.  (Estudio Redes)
   ============================================================ */
(function () {
  "use strict";
  const DATA = window.APP_DATA;
  const UNITS = DATA.units;
  const PRACTICE = DATA.practica || [];
  const LABS = DATA.labs || [];
  const DECKS = Object.values(DATA.decks || {});
  const $ = sel => document.querySelector(sel);

  /* ---------------- Iconos (SVG de línea, sin emojis) ---------------- */
  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    net: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.8 7.6 11 15.6M16.2 7.6 13 15.6M8.4 6h7.2"/>',
    app: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M9.5 6.5h.01"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    binary: '<rect x="4" y="3.5" width="6" height="7" rx="1"/><rect x="14" y="13.5" width="6" height="7" rx="1"/><path d="M7 13.5v7M17 3.5v7"/>',
    lab: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M6.5 8.5l2.2 2.2-2.2 2.2M12 13h4"/>',
    play: '<path d="M7 5v14l11-7z"/>',
    build: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><path d="M11 7h4a2 2 0 0 1 2 2v4"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M5 5H3v2a3 3 0 0 0 3 3M19 5h2v2a3 3 0 0 1-3 3"/>',
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
    chev: '<path d="m9 6 6 6-6 6"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    transport: '<path d="M4 9h16l-4-4M20 15H4l4 4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18"/>',
    link: '<rect x="2.5" y="9" width="8.5" height="6" rx="3"/><rect x="13" y="9" width="8.5" height="6" rx="3"/><path d="M9 12h6"/>',
    game: '<rect x="2" y="7" width="20" height="10" rx="4"/><path d="M7 11v2M6 12h2M15.5 11.5h.01M18 13.5h.01"/>',
  };
  function icon(name, cls) {
    return `<svg class="ic ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }
  const TOOL_ICON = { subredes: "net", retardos: "clock", capas: "layers" };
  const TOOLS = [
    ["subredes", "Calculadora de subredes", "Calculá red, broadcast, rango de hosts y cantidad a partir de una IP y su máscara."],
    ["retardos", "Retardos y throughput", "Retardo de transmisión, propagación, total y cuello de botella."],
    ["capas", "Protocolos por capa", "Juego: ubicá cada protocolo en su capa del modelo TCP/IP."],
  ];
  const GAME_ICON = { subneteo: "globe", puertos: "app", tcpudp: "transport", claseip: "net", privada: "shield", secuencia: "list", siglas: "cards" };
  const GAMES = [
    ["subneteo", "Subneteo exprés", "Te damos una IP y máscara: calculá red, broadcast y hosts. Con autocorrección."],
    ["puertos", "Puerto ↔ servicio", "Adiviná qué puerto usa cada protocolo (HTTP, DNS, SMTP…)."],
    ["tcpudp", "TCP o UDP", "Decidí si cada escenario usa TCP o UDP."],
    ["claseip", "Clase de IP", "Clasificá direcciones en A, B, C, D o E."],
    ["privada", "Pública o privada", "Decidí si una IP es pública o privada."],
    ["secuencia", "Ordená la secuencia", "Poné en orden el handshake, el encapsulamiento, DHCP y ARP."],
    ["siglas", "Memotest de siglas", "Emparejá cada sigla de redes con su significado."],
  ];
  function badge(glyph, big) { return `<span class="ubadge${big ? " ubadge--lg" : ""}">${glyph}</span>`; }

  /* ---------------- (sin KaTeX en Redes) ---------------- */
  window.MathJaxRender = function () { /* no-op: el contenido de Redes es HTML plano */ };

  /* ---------------- Progreso (localStorage) ---------------- */
  const STORE_KEY = "estudioRedes.progress.v1";
  function loadProgress() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } }
  function saveProgress(p) { localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
  let progress = loadProgress();
  progress.read = progress.read || {};
  progress.quiz = progress.quiz || {};
  progress.labs = progress.labs || {};
  progress.labSim = progress.labSim || {};
  progress.build = progress.build || {};
  progress.game = progress.game || {};       // mejor puntaje del juego "protocolos por capa"
  progress.games = progress.games || {};     // mejores estrellas (0-3) de la sección Juegos
  progress.cards = progress.cards || {};     // mazos repasados por completo
  progress.practice = progress.practice || {}; // sets de ejercicios completados
  progress.exam = progress.exam || null;     // mejor resultado del simulacro de parcial
  let examTimer = null;                       // intervalo del cronómetro del simulacro
  function starsStr(n) { return "★".repeat(n) + "☆".repeat(3 - n); }

  /* ---------------- PUNTOS / XP (derivado del progreso) ----------------
     El XP es una función pura del progreso: total = suma de los mejores
     esfuerzos por actividad. Listo para una futura tabla de posiciones (Tops). */
  const CAPAS_TOTAL = 16; // protocolos del juego "Protocolos por capa"
  function pointsBreakdown() {
    const cat = {
      teoria:     UNITS.reduce((s, u) => s + (progress.read[u.id] ? 15 : 0), 0),
      quiz:       UNITS.reduce((s, u) => { const q = progress.quiz[u.id]; return s + (q ? q.best * 8 : 0); }, 0),
      labs:       Object.values(progress.labSim).reduce((s, st) => s + (st || 0) * 25, 0),
      simulador:  Object.values(progress.build).filter(Boolean).length * 60,
      juego:      (progress.game.capas || 0) * 5,
      juegos:     Object.values(progress.games).reduce((s, v) => s + (v || 0), 0) * 10,
      flashcards: Object.values(progress.cards).filter(Boolean).length * 10,
      practica:   Object.values(progress.practice).filter(Boolean).length * 15,
    };
    cat.total = Object.values(cat).reduce((a, b) => a + b, 0);
    return cat;
  }
  function maxPoints() {
    const quizMax = UNITS.reduce((s, u) => s + u.quiz.length * 8, 0);
    return {
      teoria: UNITS.length * 15, quiz: quizMax,
      labs: (Object.keys(window.LAB_SIM || {}).length) * 3 * 25,
      simulador: 2 * 60, juego: CAPAS_TOTAL * 5,
      juegos: GAMES.length * 3 * 10,
      flashcards: DECKS.length * 10, practica: PRACTICE.length * 15,
    };
  }
  function awardGame(id, score) {
    if ((progress.game[id] || 0) < score) { progress.game[id] = score; saveProgress(progress); }
  }

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
  function labsDone() { return Object.values(progress.labs).filter(Boolean).length; }
  function labsTotal() { return LABS.reduce((s, l) => s + l.activities.length, 0); }

  function refreshProgressUI() {
    const g = globalPct();
    $("#globalProgressBar").style.width = g + "%";
    $("#globalProgressPct").textContent = g + "%";
    const xp = $("#xpBadge");
    if (xp) xp.innerHTML = `${icon("trophy")} ${pointsBreakdown().total} <small>XP</small>`;
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
    UNITS.forEach((u, i) => html += navItem(`#/unit/${u.id}`, badge(u.glyph), `${i + 1}. ${u.title}`, u.id));
    html += `<div class="nav__group-title">Herramientas</div>`;
    TOOLS.forEach(([id, t]) => html += navItem(`#/tool/${id}`, icon(TOOL_ICON[id]), t, null));
    html += `<div class="nav__group-title">Packet Tracer</div>`;
    LABS.forEach(l => html += navItem(`#/labs/${l.id}`, icon("lab"), l.title.replace(/^Laboratorio /, "Lab "), null));
    html += navItem("#/play", icon("play"), "Modo interactivo", null);
    html += navItem("#/build", icon("build"), "Simulador de red", null);
    html += `<div class="nav__group-title">Práctica</div>`;
    html += navItem("#/games", icon("game"), "Juegos", null);
    html += navItem("#/practica", icon("practice"), "Ejercicios", null);
    html += navItem("#/cards", icon("cards"), "Flashcards", null);
    html += navItem("#/quiz", icon("quiz"), "Autoevaluación", null);
    html += navItem("#/exam", icon("trophy"), "Simulacro de parcial", null);
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
    const root = parts[0] || "", id = parts[1] || "";
    $("#content").scrollTop = 0; window.scrollTo(0, 0);
    if (window.Games && window.Games.stopAll) window.Games.stopAll();
    if (examTimer) { clearInterval(examTimer); examTimer = null; }

    let crumb = "Inicio";
    if (root === "") renderHome();
    else if (root === "unit") { crumb = unitById(id)?.title || "Unidad"; renderUnit(id); }
    else if (root === "tool") { crumb = "Herramienta"; renderToolPage(id); }
    else if (root === "labs" && id) { crumb = "Packet Tracer"; renderLab(id); }
    else if (root === "labs") { crumb = "Packet Tracer"; renderLabsMenu(); }
    else if (root === "play" && id) { crumb = "Modo interactivo"; renderPlay(id); }
    else if (root === "play") { crumb = "Modo interactivo"; renderPlayMenu(); }
    else if (root === "build" && id) { crumb = "Simulador de red"; renderBuild(id); }
    else if (root === "build") { crumb = "Simulador de red"; renderBuildMenu(); }
    else if (root === "quiz" && id) { crumb = "Autoevaluación"; renderQuiz(id); }
    else if (root === "quiz") { crumb = "Autoevaluación"; renderQuizMenu(); }
    else if (root === "games" && id) { crumb = "Juegos"; renderGame(id); }
    else if (root === "games") { crumb = "Juegos"; renderGamesMenu(); }
    else if (root === "exam") { crumb = "Simulacro de parcial"; renderExam(); }
    else if (root === "cards" && id) { crumb = "Flashcards"; renderCards(id); }
    else if (root === "cards") { crumb = "Flashcards"; renderCardsMenu(); }
    else if (root === "practica" && id) { crumb = "Ejercicios"; renderPractice(id); }
    else if (root === "practica") { crumb = "Ejercicios"; renderPracticeMenu(); }
    else if (root === "progress") { crumb = "Mi progreso"; renderProgress(); }
    else renderHome();

    $("#breadcrumbs").textContent = crumb;
    setActiveNav("#/" + (root + (id && ["unit", "tool", "labs"].includes(root) ? "/" + id : "")).replace(/\/$/, ""));
    if (root === "play") setActiveNav("#/play");
    if (root === "build") setActiveNav("#/build");
    if (root === "games") setActiveNav("#/games");
    if (root === "exam") setActiveNav("#/exam");
    if (root === "") setActiveNav("#/");
    refreshProgressUI();
    closeSidebar();
  }
  const unitById = id => UNITS.find(u => u.id === id);
  const practiceById = id => PRACTICE.find(t => t.id === id);
  const labById = id => LABS.find(l => l.id === id);
  const deckById = id => DECKS.find(d => d.id === id);

  /* ---------------- Vistas ---------------- */
  function mount(html) { const c = $("#content"); c.innerHTML = `<div class="fade-in">${html}</div>`; return c; }

  function renderHome() {
    const cards = UNITS.map((u, i) => `
      <a class="unit-card" href="#/unit/${u.id}">
        <div class="unit-card__head">${badge(u.glyph, true)}<span class="unit-card__num">Unidad ${i + 1}</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">${u.desc}</div>
        <div class="unit-card__bar"><span style="width:${unitPct(u.id)}%"></span></div>
      </a>`).join("");

    mount(`
      <h1 class="page-title">Plataforma de estudio de Redes</h1>
      <p class="page-sub">Redes Informáticas y Comunicación · Teoría, herramientas, laboratorios de Packet Tracer y autoevaluación.</p>

      <div class="stat-row">
        <div class="stat"><div class="stat__num">${UNITS.length}</div><div class="stat__label">Unidades</div></div>
        <div class="stat"><div class="stat__num">${TOOLS.length}</div><div class="stat__label">Herramientas</div></div>
        <div class="stat"><div class="stat__num">${labsTotal()}</div><div class="stat__label">Labs (PT)</div></div>
        <div class="stat"><div class="stat__num">${globalPct()}%</div><div class="stat__label">Progreso</div></div>
      </div>

      <h2>Unidades</h2>
      <div class="unit-grid">${cards}</div>

      <h2>Herramientas interactivas</h2>
      <div class="tool-grid">
        ${TOOLS.map(([id, t, d]) => `<a class="tool-card" href="#/tool/${id}">
          <span class="tool-card__ic">${icon(TOOL_ICON[id])}</span>
          <div><div class="tool-card__title">${t}</div><div class="unit-card__desc">${d}</div></div></a>`).join("")}
      </div>

      <h2>Laboratorios · Cisco Packet Tracer</h2>
      <div class="unit-grid">
        ${LABS.map(l => `<a class="unit-card" href="#/labs/${l.id}">
          <div class="unit-card__head">${badge(l.glyph, true)}<span class="unit-card__num">${l.activities.length} actividades</span></div>
          <div class="unit-card__title">${l.title}</div>
          <div class="unit-card__desc">${l.desc}</div></a>`).join("")}
      </div>
      <a class="play-cta" href="#/play">
        <span class="play-cta__ic">${icon("play")}</span>
        <span class="play-cta__t"><strong>Modo interactivo · jugá los labs</strong><div>Decisiones, configurar IPs y terminal simulada, con estrellas.</div></span>
        <span class="play-cta__go">Jugar →</span>
      </a>
      <a class="play-cta" href="#/build">
        <span class="play-cta__ic">${icon("build")}</span>
        <span class="play-cta__t"><strong>Simulador de red · armá la topología</strong><div>Agregá equipos, conectalos con el cable correcto, poné IPs y hacé ping.</div></span>
        <span class="play-cta__go">Armar →</span>
      </a>

      <h2>Juegos</h2>
      <div class="tool-grid">
        ${GAMES.slice(0, 4).map(([id, t, d]) => `<a class="tool-card" href="#/games/${id}">
          <span class="tool-card__ic">${icon(GAME_ICON[id] || "game")}</span>
          <div><div class="tool-card__title">${t}</div><div class="unit-card__desc">${d}</div></div></a>`).join("")}
      </div>
      <div class="btn-row" style="margin-top:12px">
        <a class="btn" href="#/games">${icon("game")} Ver todos los juegos</a>
      </div>

      <h2>Para practicar</h2>
      <div class="btn-row">
        <a class="btn btn--primary" href="#/exam">${icon("trophy")} Simulacro de parcial</a>
        <a class="btn" href="#/practica">${icon("practice")} Ejercicios</a>
        <a class="btn" href="#/cards">${icon("cards")} Flashcards</a>
        <a class="btn" href="#/quiz">${icon("quiz")} Autoevaluación</a>
        <a class="btn" href="#/progress">${icon("progress")} Mi progreso</a>
      </div>
    `);
  }

  function renderUnit(id) {
    const u = unitById(id);
    if (!u) return renderHome();
    const idx = UNITS.indexOf(u), prev = UNITS[idx - 1], next = UNITS[idx + 1];
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
        </div>
      </div>

      <div class="pager">
        ${prev ? `<a href="#/unit/${prev.id}"><small>← Anterior</small>${prev.title}</a>` : `<span></span>`}
        ${next ? `<a class="next" href="#/unit/${next.id}"><small>Siguiente →</small>${next.title}</a>` : `<span></span>`}
      </div>`);
    $("#markRead").addEventListener("click", () => {
      progress.read[u.id] = !progress.read[u.id]; saveProgress(progress); router();
    });
  }

  function renderToolPage(id) {
    const meta = TOOLS.find(t => t[0] === id);
    if (!meta || !window.Tools[id]) return renderHome();
    const c = mount(`<h1 class="page-title">${icon(TOOL_ICON[id], "ic--title")} ${meta[1]}</h1><p class="page-sub">${meta[2]}</p><div id="toolMount"></div>`);
    window.Tools[id](c.querySelector("#toolMount"), {
      onScore: (score) => { awardGame(id, score); refreshProgressUI(); }
    });
  }

  /* ---------------- LABORATORIOS (Packet Tracer) ---------------- */
  function renderLabsMenu() {
    mount(`
      <h1 class="page-title">${icon("lab", "ic--title")} Laboratorios · Cisco Packet Tracer</h1>
      <p class="page-sub">Guías paso a paso de cada práctica. Marcá las actividades a medida que las completás.</p>
      <div class="unit-grid">
        ${LABS.map(l => {
          const total = l.activities.length;
          const done = l.activities.filter((_, i) => progress.labs[`${l.id}.${i}`]).length;
          const pct = Math.round(done / total * 100);
          const stars = progress.labSim[l.id] || 0;
          return `<a class="unit-card" href="#/labs/${l.id}">
            <div class="unit-card__head">${badge(l.glyph, true)}<span class="unit-card__num">${total} actividades</span></div>
            <div class="unit-card__title">${l.title}</div>
            <div class="unit-card__desc">${l.desc}</div>
            <div class="unit-card__bar"><span style="width:${pct}%"></span></div>
            <div class="unit-card__foot"><span>${done}/${total} hechas</span><span class="stars">${stars ? starsStr(stars) : ""}</span></div>
          </a>`;
        }).join("")}
      </div>`);
  }

  function renderLab(id) {
    const lab = labById(id);
    if (!lab) return renderLabsMenu();
    const total = lab.activities.length;
    const doneCount = lab.activities.filter((_, i) => progress.labs[`${lab.id}.${i}`]).length;
    const pct = Math.round(doneCount / total * 100);

    const acts = lab.activities.map((a, i) => {
      const key = `${lab.id}.${i}`;
      const done = !!progress.labs[key];
      const obj = a.objetivos && a.objetivos.length
        ? `<div class="lab-block lab-block--goal"><div class="lab-block__h">${icon("target")} Objetivos</div><ul>${a.objetivos.map(o => `<li>${o}</li>`).join("")}</ul></div>` : "";
      const topo = a.topologia
        ? `<div class="lab-block lab-block--topo"><div class="lab-block__h">${icon("net")} Topología</div><div>${a.topologia}</div></div>` : "";
      const pasos = `<div class="lab-block__h lab-block__h--steps">${icon("list")} Paso a paso</div><ol class="lab-steps">${a.pasos.map(p => `<li>${p}</li>`).join("")}</ol>`;
      const notas = a.notas ? `<div class="lab-note">${icon("info")}<span><strong>Nota:</strong> ${a.notas}</span></div>` : "";
      return `<div class="lab-act${done ? " done" : ""}${i === 0 ? " open" : ""}">
        <button class="lab-act__head" data-toggle="${i}">
          <span class="lab-act__n">${done ? icon("check") : i + 1}</span>
          <span class="lab-act__title">${a.name}</span>
          <span class="lab-act__chev">${icon("chev")}</span>
        </button>
        <div class="lab-act__body" ${i === 0 ? "" : "hidden"}>
          ${obj}${topo}${pasos}${notas}
          <div class="btn-row" style="margin-bottom:0">
            <button class="btn ${done ? "btn--done" : "btn--primary"}" data-done="${key}">
              ${done ? icon("check") + " Hecha" : "Marcar como hecha"}
            </button>
          </div>
        </div>
      </div>`;
    }).join("");

    const stars = (progress.labSim[lab.id]) || 0;
    const playCta = window.LAB_SIM && window.LAB_SIM[lab.id] ? `
      <a class="play-cta" href="#/play/${lab.id}">
        <span class="play-cta__ic">${icon("play")}</span>
        <span class="play-cta__t"><strong>Modo interactivo · jugá el lab</strong>
          <div>Armá la red, configurá IPs y escribí comandos en una terminal. ${stars ? `Tu récord: ${starsStr(stars)}` : "Sin estrellas todavía"}</div></span>
        <span class="play-cta__go">Jugar →</span>
      </a>` : "";

    const c = mount(`
      <div class="chip">${icon("lab")} Packet Tracer</div>
      <h1 class="page-title" style="margin-top:10px">${lab.title}</h1>
      <p class="page-sub">${lab.intro}</p>

      <div class="lab-progress">
        <div class="progress-bar"><span style="width:${pct}%"></span></div>
        <span class="lab-progress__txt">${doneCount}/${total} hechas</span>
        <button class="btn btn--ghost" id="labExpand">Desplegar todo</button>
      </div>

      ${playCta}
      <div class="lab-acts">${acts}</div>
      <div class="pager"><span></span>
        <a class="next" href="#/labs"><small>Otros labs →</small>Volver a la lista</a></div>`);

    c.querySelectorAll("[data-toggle]").forEach(btn => btn.addEventListener("click", () => {
      const box = btn.closest(".lab-act"), body = box.querySelector(".lab-act__body");
      const open = body.hidden; body.hidden = !open; box.classList.toggle("open", open);
    }));
    let expanded = false;
    $("#labExpand").addEventListener("click", () => {
      expanded = !expanded;
      c.querySelectorAll(".lab-act").forEach(box => { box.querySelector(".lab-act__body").hidden = !expanded; box.classList.toggle("open", expanded); });
      $("#labExpand").textContent = expanded ? "Plegar todo" : "Desplegar todo";
    });
    c.querySelectorAll("[data-done]").forEach(btn => btn.addEventListener("click", () => {
      const k = btn.dataset.done; progress.labs[k] = !progress.labs[k]; saveProgress(progress); router();
    }));
  }

  /* ---------------- MODO INTERACTIVO (jugar) ---------------- */
  function renderPlayMenu() {
    const SIM = window.LAB_SIM || {};
    const items = LABS.filter(l => SIM[l.id]).map(l => {
      const stars = progress.labSim[l.id] || 0;
      return `<a class="unit-card" href="#/play/${l.id}">
        <div class="unit-card__head">${badge(l.glyph, true)}<span class="unit-card__num">${SIM[l.id].challenges.length} desafíos</span></div>
        <div class="unit-card__title">${SIM[l.id].title}</div>
        <div class="unit-card__desc">${SIM[l.id].sub}</div>
        <div class="muted" style="margin-top:12px;font-size:15px;letter-spacing:2px;color:var(--warn)">${stars ? starsStr(stars) : "<span style='color:var(--muted);letter-spacing:normal;font-size:12.5px'>Sin jugar</span>"}</div>
      </a>`;
    }).join("");
    mount(`
      <h1 class="page-title">${icon("play", "ic--title")} Modo interactivo</h1>
      <p class="page-sub">Aprendé los laboratorios <strong>jugando</strong>: tomá decisiones, configurá IPs, escribí comandos y ordená los protocolos. Ganás estrellas según los aciertos.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderPlay(id) {
    if (!window.LabSim || !window.LAB_SIM || !window.LAB_SIM[id]) return renderPlayMenu();
    const c = mount(`<div id="simRoot"></div>`);
    window.LabSim.start(c.querySelector("#simRoot"), id, {
      icon,
      onFinish: (stars) => { if (stars > (progress.labSim[id] || 0)) { progress.labSim[id] = stars; saveProgress(progress); } refreshProgressUI(); }
    });
  }

  /* ---------------- SIMULADOR DE RED (armar topología) ---------------- */
  function renderBuildMenu() {
    const MIS = window.NET_MISSIONS || {};
    const order = ["m1", "m2", "sandbox"];
    const items = order.filter(k => MIS[k]).map(k => {
      const done = progress.build[k];
      return `<a class="unit-card" href="#/build/${k}">
        <div class="unit-card__head">${badge(k === "sandbox" ? "∞" : k.replace("m", ""), true)}
          <span class="unit-card__num">${MIS[k].need.free ? "libre" : "misión"}</span></div>
        <div class="unit-card__title">${MIS[k].title}</div>
        <div class="unit-card__desc">${MIS[k].brief.replace(/<[^>]+>/g, "")}</div>
        ${done ? `<div class="muted" style="margin-top:10px;color:var(--ok);font-size:13px">✓ Cumplida</div>` : ""}
      </a>`;
    }).join("");
    mount(`
      <h1 class="page-title">${icon("build", "ic--title")} Simulador de red</h1>
      <p class="page-sub">Armá la topología vos: agregá dispositivos, conectalos con el <strong>cable correcto</strong>, configurá las IPs y probá <strong>ping</strong>. Lo más parecido a Packet Tracer dentro de la web.</p>
      <div class="unit-grid">${items}</div>
      <div class="callout tip">
        <strong class="callout__tag">Cómo se usa</strong>
        Tocá un dispositivo de la paleta para agregarlo · modo <strong>Conectar</strong> para unir dos equipos (te pregunta el cable) · tocá un equipo para ponerle IP · usá <strong>Enviar ping</strong> para probar. Los objetivos se tildan solos.
      </div>`);
  }

  function renderBuild(id) {
    if (!window.NetSim || !window.NET_MISSIONS || !window.NET_MISSIONS[id]) return renderBuildMenu();
    const c = mount(`<div id="netRoot"></div>`);
    window.NetSim.start(c.querySelector("#netRoot"), id, {
      icon,
      onFinish: () => { if (!progress.build[id]) { progress.build[id] = true; saveProgress(progress); } refreshProgressUI(); }
    });
  }

  /* ---------------- PRÁCTICA ---------------- */
  function renderPracticeMenu() {
    if (!PRACTICE.length) return renderHome();
    const items = PRACTICE.map(t => `
      <a class="unit-card" href="#/practica/${t.id}">
        <div class="unit-card__head">${badge(t.glyph, true)}<span class="unit-card__num">${t.exercises.length} ejercicios</span></div>
        <div class="unit-card__title">${t.title}</div>
        <div class="unit-card__desc">${t.desc}</div></a>`).join("");
    mount(`
      <h1 class="page-title">${icon("practice", "ic--title")} Ejercicios</h1>
      <p class="page-sub">Intentá resolverlos antes de revelar la solución paso a paso.</p>
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
        <button class="btn" id="toggleAll">Mostrar todas las soluciones</button>
      </div>
      <div class="exercise-list">${exs}</div>
      <div class="pager"><span></span><a class="next" href="#/practica"><small>Otros →</small>Volver a la lista</a></div>`);

    let allShown = false;
    const opened = new Set();
    function markPracticeDone() { if (!progress.practice[id]) { progress.practice[id] = true; saveProgress(progress); refreshProgressUI(); } }
    c.querySelectorAll(".exercise__toggle").forEach(b => b.addEventListener("click", () => {
      const sol = c.querySelector(`#sol-${b.dataset.i}`), open = sol.hidden;
      sol.hidden = !open; b.textContent = open ? "Ocultar solución" : "Ver solución"; b.classList.toggle("is-open", open);
      if (open) { opened.add(b.dataset.i); if (opened.size >= tp.exercises.length) markPracticeDone(); }
    }));
    $("#toggleAll").addEventListener("click", () => {
      allShown = !allShown;
      c.querySelectorAll(".exercise__sol").forEach(s => s.hidden = !allShown);
      c.querySelectorAll(".exercise__toggle").forEach(b => { b.textContent = allShown ? "Ocultar solución" : "Ver solución"; b.classList.toggle("is-open", allShown); });
      $("#toggleAll").textContent = allShown ? "Ocultar todas las soluciones" : "Mostrar todas las soluciones";
      if (allShown) markPracticeDone();
    });
  }

  /* ---------------- QUIZ ---------------- */
  function renderQuizMenu() {
    const items = UNITS.map(u => {
      const q = progress.quiz[u.id];
      return `<a class="unit-card" href="#/quiz/${u.id}">
        <div class="unit-card__head">${badge(u.glyph, true)}<span class="unit-card__num">${u.quiz.length} preguntas</span></div>
        <div class="unit-card__title">${u.title}</div>
        <div class="unit-card__desc">${q ? `Mejor: ${q.best}/${q.total}` : "Sin intentos"}</div></a>`;
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
      const opts = q.opts.map((o, k) => `<button class="quiz-opt" data-k="${k}">
        <span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("");
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
        answered = true; const k = +b.dataset.k, correct = q.a;
        optsEl.querySelectorAll(".quiz-opt").forEach((el, idx) => {
          el.disabled = true;
          if (idx === correct) el.classList.add("correct");
          else if (idx === k) el.classList.add("wrong");
        });
        if (k === correct) { score++; fb.className = "quiz-feedback ok show"; fb.innerHTML = `${icon("check")} <strong>¡Correcto!</strong> ${q.exp || ""}`; }
        else { fb.className = "quiz-feedback no show"; fb.innerHTML = `${icon("cross")} <strong>Incorrecto.</strong> ${q.exp || ""}`; }
        nav.innerHTML = `<button class="btn btn--primary" id="qNext">${i < pack.questions.length - 1 ? "Siguiente →" : "Ver resultado →"}</button>`;
        nav.querySelector("#qNext").addEventListener("click", () => {
          if (i < pack.questions.length - 1) { i++; answered = false; paint(); } else finish();
        });
      });
    }
    function finish() {
      const total = pack.questions.length, pct = Math.round((score / total) * 100);
      if (pack.unit !== "all") {
        const prev = progress.quiz[pack.unit];
        if (!prev || score > prev.best) progress.quiz[pack.unit] = { best: score, total };
        saveProgress(progress);
      }
      const msg = pct >= 80 ? "¡Excelente dominio!" : pct >= 50 ? "Bien, pero repasá lo que falló." : "A repasar la teoría.";
      mount(`
        <h1 class="page-title">Resultado</h1>
        <div class="card center">
          <div class="quiz-score-ring">${score}/${total}</div>
          <div class="progress-bar" style="max-width:320px;margin:16px auto"><span style="width:${pct}%"></span></div>
          <p class="lead">${pct}% · ${msg}</p>
          <p class="muted" style="margin-top:-6px">${icon("trophy")} Llevás <strong>${pointsBreakdown().total} XP</strong> en total</p>
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

  /* ---------------- JUEGOS ---------------- */
  function gameStars(id) { return progress.games[id] || 0; }
  function starsMini(n) { return `<span class="stars-mini">${"★".repeat(n)}${"☆".repeat(3 - n)}</span>`; }
  function renderGamesMenu() {
    const items = GAMES.map(([id, t, d]) => `
      <a class="tool-card" href="#/games/${id}">
        <span class="tool-card__ic">${icon(GAME_ICON[id] || "game")}</span>
        <div><div class="tool-card__title">${t} ${gameStars(id) ? starsMini(gameStars(id)) : ""}</div>
        <div class="unit-card__desc">${d}</div></div></a>`).join("");
    mount(`
      <h1 class="page-title">${icon("game", "ic--title")} Juegos</h1>
      <p class="page-sub">Practicá jugando: cada juego te da hasta ★★★ y suma XP. Ideal para fijar conceptos.</p>
      <div class="tool-grid">${items}</div>
      <div class="callout tip">
        <strong class="callout__tag">También es un juego</strong>
        Probá <a href="#/tool/capas">Protocolos por capa</a>: ubicá cada protocolo en su capa del modelo TCP/IP.
      </div>`);
  }
  function renderGame(id) {
    const meta = GAMES.find(g => g[0] === id);
    if (!meta || !window.Games[id]) return renderGamesMenu();
    const c = mount(`
      <div class="chip">${icon(GAME_ICON[id] || "game")} Juego</div>
      <h1 class="page-title" style="margin:10px 0 4px">${meta[1]}</h1>
      <p class="page-sub">${meta[2]}</p>
      <div id="gameMount"></div>`);
    window.Games[id](c.querySelector("#gameMount"), {
      onFinish: (st) => {
        if ((progress.games[id] || 0) < st) { progress.games[id] = st; saveProgress(progress); }
        refreshProgressUI();
      }
    });
  }

  /* ---------------- SIMULACRO DE PARCIAL (cronometrado) ---------------- */
  function renderExam() {
    const pool = [];
    UNITS.forEach(u => u.quiz.forEach(q => pool.push({ ...q, _u: u.title })));
    const N = Math.min(15, pool.length);
    const questions = shuffle(pool).slice(0, N);
    const DURATION = 12 * 60;
    let remaining = DURATION, submitted = false;
    const answers = new Array(N).fill(-1);

    const qHtml = questions.map((q, qi) => `
      <div class="card exam-q">
        <div class="exam-q__head"><span class="exam-q__n">${qi + 1}</span><span class="muted">${q._u}</span></div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">${q.opts.map((o, k) => `<button class="quiz-opt" data-qi="${qi}" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("")}</div>
      </div>`).join("");

    const c = mount(`
      <div class="exam-bar">
        <div><h1 class="page-title" style="margin:0">${icon("trophy", "ic--title")} Simulacro de parcial</h1>
        <p class="page-sub" style="margin:2px 0 0">${N} preguntas de todas las unidades · 12 minutos</p></div>
        <div class="exam-timer" id="exTimer">12:00</div>
      </div>
      <div id="exForm">${qHtml}
        <div class="card center">
          <p class="muted" id="exCount">0 de ${N} respondidas</p>
          <button class="btn btn--primary" id="exSubmit">Entregar examen</button>
        </div></div>`);

    const form = c.querySelector("#exForm");
    form.addEventListener("click", (e) => {
      const b = e.target.closest(".quiz-opt"); if (!b || submitted) return;
      const qi = +b.dataset.qi, k = +b.dataset.k; answers[qi] = k;
      form.querySelectorAll(`.quiz-opt[data-qi="${qi}"]`).forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
      c.querySelector("#exCount").textContent = `${answers.filter(a => a >= 0).length} de ${N} respondidas`;
    });
    c.querySelector("#exSubmit").addEventListener("click", finish);

    examTimer = setInterval(() => {
      remaining--;
      const t = $("#exTimer");
      if (t) {
        const m = Math.floor(remaining / 60), s = remaining % 60;
        t.textContent = `${m}:${String(s).padStart(2, "0")}`;
        if (remaining <= 60) t.classList.add("danger");
      }
      if (remaining <= 0) finish();
    }, 1000);

    function finish() {
      if (submitted) return; submitted = true;
      if (examTimer) { clearInterval(examTimer); examTimer = null; }
      let score = 0;
      questions.forEach((q, qi) => { if (answers[qi] === q.a) score++; });
      const pct = Math.round(score / N * 100);
      const nota = Math.round(score / N * 100) / 10;       // sobre 10, un decimal
      const notaStr = nota.toFixed(1).replace(".", ",");
      const usados = DURATION - Math.max(0, remaining);
      const mm = Math.floor(usados / 60), ss = usados % 60;
      if (!progress.exam || score > progress.exam.best) { progress.exam = { best: score, total: N }; saveProgress(progress); }
      const msg = pct >= 80 ? "¡Aprobado con holgura!" : pct >= 60 ? "Aprobado, repasá lo que falló." : "A reforzar: volvé a la teoría.";

      const review = questions.map((q, qi) => {
        const ok = answers[qi] === q.a, blank = answers[qi] < 0;
        return `<div class="card exam-q ${ok ? "exam-q--ok" : "exam-q--no"}">
          <div class="exam-q__head"><span class="exam-q__n">${qi + 1}</span>
          <span class="muted">${q._u}</span>
          <span style="margin-left:auto">${ok ? "✓ Correcta" : blank ? "— Sin responder" : "✗ Incorrecta"}</span></div>
          <div class="quiz-question">${q.q}</div>
          <div class="quiz-options">${q.opts.map((o, k) => {
            let cls = ""; if (k === q.a) cls = "correct"; else if (k === answers[qi]) cls = "wrong";
            return `<button class="quiz-opt ${cls}" disabled><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`;
          }).join("")}</div>
          ${q.exp ? `<div class="quiz-feedback ${ok ? "ok" : "no"} show">${q.exp}</div>` : ""}</div>`;
      }).join("");

      mount(`
        <h1 class="page-title">Resultado del simulacro</h1>
        <div class="card center" style="margin-bottom:18px">
          <div class="quiz-score-ring">${notaStr}</div>
          <p class="lead">Nota: <strong>${notaStr}</strong> / 10 · ${score}/${N} correctas (${pct}%)</p>
          <p class="muted">Tiempo usado: ${mm}:${String(ss).padStart(2, "0")} · ${msg}</p>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary" id="exRetry">${icon("refresh")} Otro simulacro</button>
            <a class="btn" href="#/quiz">Quizzes por unidad</a>
            <a class="btn" href="#/">Inicio</a>
          </div>
        </div>
        <h2>Revisión</h2>
        ${review}`);
      $("#exRetry").addEventListener("click", renderExam);
      refreshProgressUI();
    }
  }

  /* ---------------- FLASHCARDS (mazos) ---------------- */
  function renderCardsMenu() {
    const items = DECKS.map(d => `
      <a class="unit-card" href="#/cards/${d.id}">
        <div class="unit-card__head">${badge(d.short ? d.short.charAt(0) : "★", true)}<span class="unit-card__num">${d.cards.length} tarjetas</span></div>
        <div class="unit-card__title">${d.short || d.title}</div>
        <div class="unit-card__desc">Repaso rápido: tocá la tarjeta para ver la respuesta.</div></a>`).join("");
    mount(`
      <h1 class="page-title">${icon("cards", "ic--title")} Flashcards</h1>
      <p class="page-sub">Tocá la tarjeta para girarla. Ideal para repaso rápido antes del parcial.</p>
      <div class="unit-grid">${items}</div>`);
  }

  function renderCards(id) {
    const d = deckById(id);
    if (!d) return renderCardsMenu();
    let i = 0; const seen = new Set();
    function markSeen() {
      seen.add(i);
      if (seen.size >= d.cards.length && !progress.cards[id]) { progress.cards[id] = true; saveProgress(progress); refreshProgressUI(); }
    }
    function paint() {
      markSeen();
      const card = d.cards[i];
      const c = mount(`
        <div class="chip">${badge(d.short ? d.short.charAt(0) : "★")} ${d.short || d.title}</div>
        <h1 class="page-title" style="margin:10px 0 4px">Flashcards</h1>
        <p class="page-sub">Tarjeta ${i + 1} de ${d.cards.length}</p>
        <div class="flashcard" id="fc">
          <div class="flashcard__inner">
            <div class="flashcard__face flashcard__face--front">
              ${card.tag ? `<span class="flashcard__tag">${card.tag}</span>` : ""}
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
          <a class="btn btn--ghost" href="#/cards">Todos los mazos</a>
          <button class="btn" id="fcNext">Siguiente →</button>
        </div>`);
      const fc = c.querySelector("#fc");
      fc.addEventListener("click", () => fc.classList.toggle("flipped"));
      c.querySelector("#fcPrev").addEventListener("click", () => { i = (i - 1 + d.cards.length) % d.cards.length; paint(); });
      c.querySelector("#fcNext").addEventListener("click", () => { i = (i + 1) % d.cards.length; paint(); });
    }
    paint();
  }

  /* ---------------- PROGRESO ---------------- */
  function renderProgress() {
    const rows = UNITS.map((u, i) => {
      const pct = unitPct(u.id), q = progress.quiz[u.id];
      return `<div class="card" style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          ${badge(u.glyph)}<strong>${i + 1}. ${u.title}</strong><span class="chip" style="margin-left:auto">${pct}%</span>
        </div>
        <div class="progress-bar"><span style="width:${pct}%"></span></div>
        <div class="muted" style="font-size:12.5px;margin-top:8px">
          ${progress.read[u.id] ? "Teoría leída" : "Teoría pendiente"} ·
          ${q ? `Quiz: ${q.best}/${q.total}` : "Quiz sin intentos"}
        </div></div>`;
    }).join("");

    const pts = pointsBreakdown(), mx = maxPoints();
    const CATS = [["teoria", "Teoría leída"], ["quiz", "Autoevaluación"], ["labs", "Labs jugados"], ["simulador", "Simulador"], ["juego", "Protocolos por capa"], ["juegos", "Juegos"], ["flashcards", "Flashcards"], ["practica", "Práctica"]];
    const xpRows = CATS.map(([k, l]) => {
      const v = pts[k] || 0, m = mx[k] || 0, pct = m ? Math.round(v / m * 100) : 0;
      return `<div class="xp-row"><span class="xp-lbl">${l}</span><div class="progress-bar"><span style="width:${pct}%"></span></div><span class="xp-val">${v}</span></div>`;
    }).join("");

    mount(`
      <h1 class="page-title">${icon("progress", "ic--title")} Mi progreso</h1>
      <p class="page-sub">Ganás <strong>XP</strong> con todo lo que hacés. Tu avance se guarda en este dispositivo (localStorage).</p>

      <div class="card center" style="margin-bottom:18px">
        <div class="xp-total">${pts.total} <span style="font-size:20px">XP</span></div>
        <p class="muted">Puntos acumulados</p>
        <div style="text-align:left;max-width:440px;margin:14px auto 0">${xpRows}</div>
        <div class="xp-soon">${icon("trophy")} <strong>Tabla de posiciones (Tops):</strong> próximamente vas a poder competir con tu puntaje.</div>
      </div>

      <div class="stat-row">
        <div class="stat"><div class="stat__num">${globalPct()}%</div><div class="stat__label">Teoría + quiz</div></div>
        <div class="stat"><div class="stat__num">${labsDone()}/${labsTotal()}</div><div class="stat__label">Labs hechos</div></div>
        <div class="stat"><div class="stat__num">${Object.values(progress.build).filter(Boolean).length}/2</div><div class="stat__label">Misiones</div></div>
      </div>
      ${rows}
      <div class="btn-row">
        <button class="btn" id="resetProg">${icon("trash")} Reiniciar progreso</button>
      </div>`);
    $("#resetProg").addEventListener("click", () => {
      if (confirm("¿Seguro que querés borrar todo tu progreso?")) {
        progress = { read: {}, quiz: {}, labs: {}, labSim: {}, build: {}, game: {}, games: {}, cards: {}, practice: {}, exam: null }; saveProgress(progress); router();
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
    TOOLS.forEach(([id, t]) => idx.push({ title: t, sub: "Herramienta", href: `#/tool/${id}`, hay: t.toLowerCase() }));
    LABS.forEach(l => {
      idx.push({ title: l.title, sub: "Packet Tracer", href: `#/labs/${l.id}`, hay: (l.title + " " + l.desc).toLowerCase() });
      l.activities.forEach(a => idx.push({ title: a.name, sub: l.title, href: `#/labs/${l.id}`, hay: a.name.toLowerCase() }));
    });
    PRACTICE.forEach(t => idx.push({ title: t.title, sub: "Práctica", href: `#/practica/${t.id}`, hay: (t.title + " " + t.desc).toLowerCase() }));
    DECKS.forEach(d => idx.push({ title: d.short || d.title, sub: "Flashcards", href: `#/cards/${d.id}`, hay: (d.short + " " + d.title).toLowerCase() }));
    GAMES.forEach(([id, t, d]) => idx.push({ title: t, sub: "Juego", href: `#/games/${id}`, hay: (t + " " + d).toLowerCase() }));
    idx.push({ title: "Juegos", sub: "Práctica", href: "#/games", hay: "juegos jugar minijuegos" });
    idx.push({ title: "Simulacro de parcial", sub: "Práctica", href: "#/exam", hay: "simulacro parcial examen cronometrado nota" });
    idx.push({ title: "Autoevaluación", sub: "Práctica", href: "#/quiz", hay: "quiz autoevaluacion examen" });
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
      box.innerHTML = hits.length
        ? hits.map(hh => `<div class="search__item" data-href="${hh.href}">${hh.title}<small>${hh.sub}</small></div>`).join("")
        : `<div class="search__item">Sin resultados</div>`;
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
    const saved = localStorage.getItem("estudioRedes.theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.body.dataset.theme = theme;
    const tgl = $("#themeToggle");
    tgl.innerHTML = theme === "dark" ? icon("sun") : icon("moon");
    tgl.addEventListener("click", () => {
      const t = document.body.dataset.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = t; localStorage.setItem("estudioRedes.theme", t);
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
    buildNav(); initTheme(); initSidebar(); initSearch();
    window.addEventListener("hashchange", router);
    router();
    if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
