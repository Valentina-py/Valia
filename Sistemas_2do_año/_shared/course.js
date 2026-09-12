(function () {
  "use strict";

  const DATA = window.COURSE_DATA;
  if (!DATA) throw new Error("Falta COURSE_DATA");

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const storeKey = `valia.${DATA.slug}.progress.v1`;
  const themeKey = "valia.course.theme";

  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    practice: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    cards: '<rect x="3" y="7" width="14" height="13" rx="2"/><path d="M7 4h14v13"/>',
    quiz: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 11 2.5 2.5L15 9"/>',
    tool: '<path d="M14 7a4 4 0 0 1-5 5L5 16v3h3l4-4a4 4 0 0 1 5-5l-3-3z"/>',
    sources: '<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    moon: '<path d="M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/>',
    reset: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };

  function icon(name, extra = "") {
    return `<svg class="ic ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.book}</svg>`;
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
  }

  function loadProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(storeKey)) || {};
      value.read = value.read || {};
      value.quiz = value.quiz || {};
      return value;
    } catch {
      return { read: {}, quiz: {} };
    }
  }

  let progress = loadProgress();
  const saveProgress = () => localStorage.setItem(storeKey, JSON.stringify(progress));
  const unitById = (id) => DATA.units.find((unit) => unit.id === id);
  const practiceById = (id) => (DATA.practices || []).find((practice) => practice.id === id);

  function unitPercent(id) {
    let value = progress.read[id] ? 50 : 0;
    const quiz = progress.quiz[id];
    if (quiz && quiz.total) value += Math.round((quiz.best / quiz.total) * 50);
    return Math.min(100, value);
  }

  function globalPercent() {
    if (!DATA.units.length) return 0;
    return Math.round(DATA.units.reduce((sum, unit) => sum + unitPercent(unit.id), 0) / DATA.units.length);
  }

  function navItem(href, label, iconName, unitId) {
    return `<a class="nav__item" href="${href}" ${unitId ? `data-unit="${unitId}"` : ""}>
      <span class="nav__icon">${icon(iconName)}</span>
      <span>${label}</span><span class="nav__check">${icon("check")}</span>
    </a>`;
  }

  function buildNav() {
    let html = '<div class="nav__label">General</div>';
    html += navItem("#/", "Inicio", "home");
    html += navItem("#/progress", "Mi progreso", "progress");
    html += '<div class="nav__label">Unidades</div>';
    DATA.units.forEach((unit, index) => {
      html += navItem(`#/unit/${unit.id}`, `${index + 1}. ${unit.title}`, "book", unit.id);
    });
    if ((DATA.practices || []).length) {
      html += '<div class="nav__label">Práctica</div>';
      html += navItem("#/practice", "Trabajos prácticos", "practice");
      html += navItem("#/cards", "Flashcards", "cards");
      html += navItem("#/quiz", "Autoevaluación", "quiz");
    }
    if (window.COURSE_TOOL) {
      html += '<div class="nav__label">Interactivo</div>';
      html += navItem("#/tool", window.COURSE_TOOL.title, "tool");
    }
    html += '<div class="nav__label">Fuentes</div>';
    html += navItem("#/sources", "Material incorporado", "sources");
    $("#mainNav").innerHTML = html;
  }

  function refreshProgress() {
    const value = globalPercent();
    $("#globalProgressBar").style.width = `${value}%`;
    $("#globalProgressPct").textContent = `${value}%`;
    $$(".nav__item[data-unit]").forEach((item) => item.classList.toggle("done", unitPercent(item.dataset.unit) === 100));
  }

  function setActive(href) {
    $$(".nav__item").forEach((item) => item.classList.toggle("active", item.getAttribute("href") === href));
  }

  function mount(html) {
    const content = $("#content");
    content.innerHTML = `<div class="fade-in">${html}</div>`;
    window.scrollTo(0, 0);
    return content;
  }

  function renderHome() {
    const cards = DATA.units.map((unit, index) => `
      <a class="unit-card" href="#/unit/${unit.id}">
        <div class="unit-card__top"><span class="unit-card__glyph">${unit.glyph || index + 1}</span><span class="unit-card__n">Unidad ${index + 1}</span></div>
        <h3>${unit.title}</h3><p>${unit.desc}</p>
        <div class="progress-bar"><span style="width:${unitPercent(unit.id)}%"></span></div>
      </a>`).join("");
    const exerciseCount = (DATA.practices || []).reduce((sum, practice) => sum + practice.exercises.length, 0);
    const quizCount = DATA.units.reduce((sum, unit) => sum + (unit.quiz || []).length, 0);
    const action = window.COURSE_TOOL
      ? `<a class="btn" href="#/tool">${icon("tool")} ${window.COURSE_TOOL.title}</a>`
      : "";
    mount(`
      <section class="hero">
        <div class="eyebrow">${DATA.kicker || "Valía · Segundo año"}</div>
        <h1 class="page-title">${DATA.title}</h1>
        <p class="page-sub">${DATA.subtitle}</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="#/unit/${DATA.units[0].id}">Empezar a estudiar ${icon("arrow")}</a>
          <a class="btn" href="#/practice">${icon("practice")} Ver prácticas</a>
          ${action}
        </div>
        <div class="hero__meta"><span class="chip">Actualizado ${DATA.updated}</span><span class="chip">${(DATA.sources || []).length} fuentes incorporadas</span></div>
      </section>
      <div class="stat-row">
        <div class="stat"><strong>${DATA.units.length}</strong><span>Unidades</span></div>
        <div class="stat"><strong>${exerciseCount}</strong><span>Actividades guiadas</span></div>
        <div class="stat"><strong>${quizCount}</strong><span>Preguntas de repaso</span></div>
        <div class="stat"><strong>${globalPercent()}%</strong><span>Progreso</span></div>
      </div>
      ${DATA.coverage ? `<div class="callout"><strong>Cobertura actual.</strong> ${DATA.coverage}</div>` : ""}
      <h2>Recorrido de estudio</h2>
      <div class="grid">${cards}</div>
      <h2>Repasar y practicar</h2>
      <div class="btn-row">
        <a class="btn btn--primary" href="#/practice">${icon("practice")} Trabajos prácticos</a>
        <a class="btn" href="#/cards">${icon("cards")} Flashcards</a>
        <a class="btn" href="#/quiz">${icon("quiz")} Autoevaluación</a>
        <a class="btn" href="#/sources">${icon("sources")} Fuentes</a>
      </div>`);
  }

  function renderUnit(id) {
    const unit = unitById(id);
    if (!unit) return renderHome();
    const index = DATA.units.indexOf(unit);
    const previous = DATA.units[index - 1];
    const next = DATA.units[index + 1];
    const related = (DATA.practices || []).find((practice) => practice.unit === unit.id);
    const content = mount(`
      <span class="chip">${unit.glyph || index + 1} · Unidad ${index + 1}</span>
      <h1 class="page-title">${unit.title}</h1>
      <p class="page-sub">${unit.desc}</p>
      <article class="card">${unit.html}</article>
      <div class="btn-row">
        <button class="btn ${progress.read[unit.id] ? "btn--primary" : ""}" id="markRead">${icon("check")} ${progress.read[unit.id] ? "Unidad estudiada" : "Marcar como estudiada"}</button>
        <a class="btn" href="#/quiz/${unit.id}">${icon("quiz")} Quiz</a>
        <a class="btn" href="#/cards/${unit.id}">${icon("cards")} Flashcards</a>
        ${related ? `<a class="btn" href="#/practice/${related.id}">${icon("practice")} Práctica relacionada</a>` : ""}
      </div>
      <nav class="pager">
        ${previous ? `<a href="#/unit/${previous.id}"><small>Anterior</small>${previous.title}</a>` : "<span></span>"}
        ${next ? `<a href="#/unit/${next.id}"><small>Siguiente</small>${next.title}</a>` : "<span></span>"}
      </nav>`);
    $("#markRead", content).addEventListener("click", () => {
      progress.read[unit.id] = !progress.read[unit.id];
      saveProgress();
      renderUnit(unit.id);
      refreshProgress();
    });
  }

  function renderPracticeMenu() {
    const practices = DATA.practices || [];
    if (!practices.length) return renderHome();
    mount(`
      <span class="eyebrow">Material de la cátedra</span>
      <h1 class="page-title">Trabajos prácticos</h1>
      <p class="page-sub">Consignas organizadas para estudiar y resolver. Las orientaciones se revelan cuando las necesitás.</p>
      <div class="grid">${practices.map((practice) => `
        <a class="practice-card" href="#/practice/${practice.id}"><span class="chip">${practice.exercises.length} actividades</span><h3>${practice.title}</h3><p>${practice.desc}</p></a>`).join("")}</div>`);
  }

  function renderPractice(id) {
    const practice = practiceById(id);
    if (!practice) return renderPracticeMenu();
    const exercises = practice.exercises.map((exercise, index) => `
      <section class="exercise">
        <div class="exercise__head"><span class="exercise__n">${index + 1}</span><div class="exercise__q">${exercise.q}</div></div>
        <button class="btn btn--ghost solution-toggle" data-index="${index}">Ver orientación</button>
        <div class="exercise__solution" id="solution-${index}" hidden>${exercise.sol}</div>
      </section>`).join("");
    const content = mount(`
      <span class="chip">${icon("practice")} Práctica</span>
      <h1 class="page-title">${practice.title}</h1><p class="page-sub">${practice.desc}</p>
      <div class="btn-row"><button class="btn" id="toggleAll">Mostrar todas las orientaciones</button>${practice.unit ? `<a class="btn" href="#/unit/${practice.unit}">${icon("book")} Repasar teoría</a>` : ""}</div>
      <div>${exercises}</div>`);
    let allOpen = false;
    $$(".solution-toggle", content).forEach((button) => button.addEventListener("click", () => {
      const solution = $(`#solution-${button.dataset.index}`, content);
      solution.hidden = !solution.hidden;
      button.textContent = solution.hidden ? "Ver orientación" : "Ocultar orientación";
    }));
    $("#toggleAll", content).addEventListener("click", () => {
      allOpen = !allOpen;
      $$(".exercise__solution", content).forEach((solution) => { solution.hidden = !allOpen; });
      $$(".solution-toggle", content).forEach((button) => { button.textContent = allOpen ? "Ocultar orientación" : "Ver orientación"; });
      $("#toggleAll", content).textContent = allOpen ? "Ocultar todas las orientaciones" : "Mostrar todas las orientaciones";
    });
  }

  function quizPack(id) {
    if (id === "all") {
      const all = DATA.units.flatMap((unit) => (unit.quiz || []).map((question) => ({ ...question, unit: unit.id })));
      return { title: "Autoevaluación general", unit: "all", questions: shuffle(all).slice(0, Math.min(15, all.length)) };
    }
    const unit = unitById(id);
    return unit ? { title: unit.title, unit: unit.id, questions: (unit.quiz || []).map((question) => ({ ...question })) } : null;
  }

  function renderQuizMenu() {
    mount(`
      <span class="eyebrow">Comprobá lo aprendido</span><h1 class="page-title">Autoevaluación</h1>
      <p class="page-sub">Elegí una unidad o combiná preguntas de todo el recorrido.</p>
      <div class="grid">${DATA.units.map((unit) => {
        const score = progress.quiz[unit.id];
        return `<a class="unit-card" href="#/quiz/${unit.id}"><span class="chip">${(unit.quiz || []).length} preguntas</span><h3>${unit.title}</h3><p>${score ? `Mejor resultado: ${score.best}/${score.total}` : "Sin intentos todavía"}</p></a>`;
      }).join("")}</div>
      <div class="btn-row"><a class="btn btn--primary" href="#/quiz/all">Quiz general</a></div>`);
  }

  function renderQuiz(id) {
    const pack = quizPack(id);
    if (!pack || !pack.questions.length) return renderQuizMenu();
    let index = 0;
    let score = 0;
    function paint() {
      const question = pack.questions[index];
      const content = mount(`
        <span class="chip">${icon("quiz")} ${pack.title}</span>
        <h1 class="page-title">Pregunta ${index + 1} de ${pack.questions.length}</h1>
        <div class="card quiz-shell">
          <div class="quiz-question">${question.q}</div>
          <div class="quiz-options">${question.opts.map((option, optionIndex) => `<button class="quiz-option" data-index="${optionIndex}"><span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span><span>${option}</span></button>`).join("")}</div>
          <div class="quiz-feedback" id="quizFeedback"></div>
          <div class="btn-row" id="quizActions"></div>
        </div>`);
      $$(".quiz-option", content).forEach((button) => button.addEventListener("click", () => {
        const selected = Number(button.dataset.index);
        const correct = question.a;
        $$(".quiz-option", content).forEach((item) => {
          item.disabled = true;
          const value = Number(item.dataset.index);
          if (value === correct) item.classList.add("correct");
          else if (value === selected) item.classList.add("wrong");
        });
        if (selected === correct) score += 1;
        $("#quizFeedback", content).innerHTML = `<strong>${selected === correct ? "Correcto." : "A revisar."}</strong> ${question.exp || ""}`;
        $("#quizActions", content).innerHTML = `<button class="btn btn--primary" id="nextQuestion">${index + 1 < pack.questions.length ? "Siguiente" : "Ver resultado"} ${icon("arrow")}</button>`;
        $("#nextQuestion", content).addEventListener("click", () => {
          index += 1;
          if (index < pack.questions.length) paint(); else finish();
        });
      }));
    }
    function finish() {
      if (pack.unit !== "all") {
        const previous = progress.quiz[pack.unit];
        if (!previous || score > previous.best) progress.quiz[pack.unit] = { best: score, total: pack.questions.length };
        saveProgress();
      }
      const percent = Math.round((score / pack.questions.length) * 100);
      const content = mount(`<h1 class="page-title">Resultado</h1><div class="card center"><div class="score">${score}/${pack.questions.length}</div><p class="lead">${percent}% · ${percent >= 80 ? "Buen dominio del tema." : percent >= 55 ? "Vas bien; conviene repasar los puntos dudosos." : "Volvé a la teoría y probá otra vez."}</p><div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="retry">${icon("reset")} Reintentar</button><a class="btn" href="#/quiz">Otras unidades</a></div></div>`);
      $("#retry", content).addEventListener("click", () => renderQuiz(id));
      refreshProgress();
    }
    paint();
  }

  function renderCardsMenu() {
    mount(`<span class="eyebrow">Repaso rápido</span><h1 class="page-title">Flashcards</h1><p class="page-sub">Elegí una unidad y tocá cada tarjeta para revelar la respuesta.</p><div class="grid">${DATA.units.map((unit) => `<a class="unit-card" href="#/cards/${unit.id}"><span class="chip">${(unit.cards || []).length} tarjetas</span><h3>${unit.title}</h3><p>${unit.desc}</p></a>`).join("")}</div>`);
  }

  function renderCards(id) {
    const unit = unitById(id);
    if (!unit || !(unit.cards || []).length) return renderCardsMenu();
    let index = 0;
    function paint() {
      const card = unit.cards[index];
      const content = mount(`
        <span class="chip">${unit.title}</span><h1 class="page-title">Flashcards</h1><p class="page-sub">Tarjeta ${index + 1} de ${unit.cards.length}</p>
        <div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Mostrar respuesta"><div class="flashcard__inner"><div class="flashcard__face"><div><div class="flashcard__main">${card.q}</div><div class="flashcard__hint">Tocá para ver la respuesta</div></div></div><div class="flashcard__face flashcard__face--back"><div><div class="flashcard__main">${card.a}</div><div class="flashcard__hint">Tocá para volver</div></div></div></div></div>
        <div class="btn-row" style="justify-content:space-between"><button class="btn" id="previousCard">Anterior</button><a class="btn btn--ghost" href="#/cards">Todas</a><button class="btn" id="nextCard">Siguiente</button></div>`);
      const flashcard = $("#flashcard", content);
      const flip = () => flashcard.classList.toggle("flipped");
      flashcard.addEventListener("click", flip);
      flashcard.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); flip(); } });
      $("#previousCard", content).addEventListener("click", () => { index = (index - 1 + unit.cards.length) % unit.cards.length; paint(); });
      $("#nextCard", content).addEventListener("click", () => { index = (index + 1) % unit.cards.length; paint(); });
    }
    paint();
  }

  function renderTool() {
    if (!window.COURSE_TOOL) return renderHome();
    const content = mount(`<span class="chip">${icon("tool")} Herramienta</span><h1 class="page-title">${window.COURSE_TOOL.title}</h1><p class="page-sub">${window.COURSE_TOOL.desc}</p><div class="card" id="toolMount"></div>`);
    window.COURSE_TOOL.mount($("#toolMount", content), { escapeHtml });
  }

  function renderSources() {
    mount(`<span class="eyebrow">Trazabilidad del contenido</span><h1 class="page-title">Material incorporado</h1><p class="page-sub">La web resume y organiza estos archivos de la cátedra. Los documentos originales permanecen fuera del sitio público.</p>${DATA.coverage ? `<div class="callout"><strong>Alcance.</strong> ${DATA.coverage}</div>` : ""}<ul class="source-list">${(DATA.sources || []).map((source) => `<li><strong>${source.title}</strong>${source.note ? `<small>${source.note}</small>` : ""}</li>`).join("")}</ul>`);
  }

  function renderProgress() {
    mount(`<span class="eyebrow">Guardado en este dispositivo</span><h1 class="page-title">Mi progreso</h1><p class="page-sub">Se completa al marcar la teoría y mejorar el resultado del quiz de cada unidad.</p><div class="card center"><div class="score">${globalPercent()}%</div><p class="muted">Progreso general</p></div><h2>Por unidad</h2>${DATA.units.map((unit, index) => { const score = progress.quiz[unit.id]; return `<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px"><span class="unit-card__glyph">${unit.glyph || index + 1}</span><strong>${unit.title}</strong><span class="chip" style="margin-left:auto">${unitPercent(unit.id)}%</span></div><div class="progress-bar" style="margin-top:14px"><span style="width:${unitPercent(unit.id)}%"></span></div><p class="muted" style="margin-bottom:0;font-size:.82rem">${progress.read[unit.id] ? "Teoría estudiada" : "Teoría pendiente"} · ${score ? `Quiz ${score.best}/${score.total}` : "Quiz sin intentos"}</p></div>`; }).join("")}<div class="btn-row"><button class="btn" id="resetProgress">${icon("reset")} Reiniciar progreso</button></div>`);
    $("#resetProgress").addEventListener("click", () => {
      if (!confirm("¿Querés borrar el progreso de esta materia?")) return;
      progress = { read: {}, quiz: {} };
      saveProgress();
      renderProgress();
      refreshProgress();
    });
  }

  function router() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/");
    const root = parts[0];
    const id = parts[1];
    let crumb = "Inicio";
    if (!root) renderHome();
    else if (root === "unit") { crumb = unitById(id)?.title || "Unidad"; renderUnit(id); }
    else if (root === "practice" && id) { crumb = "Trabajo práctico"; renderPractice(id); }
    else if (root === "practice") { crumb = "Trabajos prácticos"; renderPracticeMenu(); }
    else if (root === "quiz" && id) { crumb = "Autoevaluación"; renderQuiz(id); }
    else if (root === "quiz") { crumb = "Autoevaluación"; renderQuizMenu(); }
    else if (root === "cards" && id) { crumb = "Flashcards"; renderCards(id); }
    else if (root === "cards") { crumb = "Flashcards"; renderCardsMenu(); }
    else if (root === "tool") { crumb = window.COURSE_TOOL?.title || "Herramienta"; renderTool(); }
    else if (root === "sources") { crumb = "Material incorporado"; renderSources(); }
    else if (root === "progress") { crumb = "Mi progreso"; renderProgress(); }
    else renderHome();
    $("#breadcrumbs").textContent = crumb;
    if (root === "unit") setActive(`#/unit/${id}`);
    else if (["practice", "quiz", "cards", "tool", "sources", "progress"].includes(root)) setActive(`#/${root}`);
    else setActive("#/");
    refreshProgress();
    closeSidebar();
  }

  function shuffle(values) {
    const result = values.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  }

  function initSearch() {
    const index = [];
    DATA.units.forEach((unit, number) => {
      index.push({ label: `${number + 1}. ${unit.title}`, sub: "Unidad", href: `#/unit/${unit.id}`, haystack: `${unit.title} ${unit.desc}`.toLowerCase() });
      const temp = document.createElement("div");
      temp.innerHTML = unit.html;
      $$("h2,h3", temp).forEach((heading) => index.push({ label: heading.textContent.trim(), sub: unit.title, href: `#/unit/${unit.id}`, haystack: heading.textContent.toLowerCase() }));
    });
    (DATA.practices || []).forEach((practice) => index.push({ label: practice.title, sub: "Práctica", href: `#/practice/${practice.id}`, haystack: `${practice.title} ${practice.desc}`.toLowerCase() }));
    const input = $("#searchInput");
    const results = $("#searchResults");
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      if (!query) { results.classList.remove("open"); return; }
      const hits = index.filter((item) => item.haystack.includes(query)).slice(0, 8);
      results.innerHTML = hits.length ? hits.map((item) => `<a class="search__item" href="${item.href}">${escapeHtml(item.label)}<small>${escapeHtml(item.sub)}</small></a>`).join("") : '<span class="search__item">Sin resultados</span>';
      results.classList.add("open");
    });
    results.addEventListener("click", () => { input.value = ""; results.classList.remove("open"); });
    document.addEventListener("click", (event) => { if (!event.target.closest(".sidebar__search")) results.classList.remove("open"); });
  }

  function openSidebar() { $("#sidebar").classList.add("open"); $("#sidebarOverlay").classList.add("show"); }
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#sidebarOverlay").classList.remove("show"); }

  function initTheme() {
    const saved = localStorage.getItem(themeKey);
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    const button = $("#themeToggle");
    const paint = () => { button.innerHTML = icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon"); };
    paint();
    button.addEventListener("click", () => {
      document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(themeKey, document.documentElement.dataset.theme);
      paint();
    });
  }

  function init() {
    document.documentElement.style.setProperty("--accent", DATA.accent || "#8b5cf6");
    document.documentElement.style.setProperty("--accent-2", DATA.accent2 || "#06b6d4");
    $("#courseName").textContent = DATA.shortTitle || DATA.title;
    $("#courseMeta").textContent = DATA.meta || "Segundo año · 2026";
    $("#brandMark").textContent = DATA.mark || "V";
    $("#footerText").textContent = `${DATA.title} · Valía · Actualizado ${DATA.updated}`;
    buildNav();
    initSearch();
    initTheme();
    $("#menuToggle").addEventListener("click", openSidebar);
    $("#sidebarClose").addEventListener("click", closeSidebar);
    $("#sidebarOverlay").addEventListener("click", closeSidebar);
    window.addEventListener("hashchange", router);
    router();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
