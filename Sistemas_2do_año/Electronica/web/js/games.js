/* ============================================================
   JUEGOS DE APRENDIZAJE — ELECTRÓNICA
   1) Resolvé con Ohm        6) Conectá (magnitud ↔ unidad)
   2) Verdadero o Falso      7) Ahorcado eléctrico
   3) Clasificá el componente 8) Ordená resistencias
   4) Código de colores      9) Cazá el error
   5) Memotest
   Cada juego guarda su mejor marca en localStorage.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- utilidades ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function render(el) { if (window.MathJaxRender) window.MathJaxRender(el); }
  function fmtEng(x, unit) {
    if (x === 0) return "0 " + unit;
    const pre = [{ f: 1e6, s: "M" }, { f: 1e3, s: "k" }, { f: 1, s: "" }, { f: 1e-3, s: "m" }, { f: 1e-6, s: "µ" }];
    let ch = pre[2], abs = Math.abs(x);
    for (const p of pre) { if (abs >= p.f) { ch = p; break; } }
    const v = x / ch.f, r = Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2);
    return parseFloat(r) + " " + ch.s + unit;
  }

  /* ---------------- timers (se limpian al navegar) ---------------- */
  let intervals = [], timeouts = [];
  function every(fn, ms) { const id = setInterval(fn, ms); intervals.push(id); return id; }
  function stopAll() { intervals.forEach(clearInterval); timeouts.forEach(clearTimeout); intervals = []; timeouts = []; }

  /* ---------------- mejores marcas ---------------- */
  const GKEY = "estudioElec.games.v1";
  function loadG() { try { return JSON.parse(localStorage.getItem(GKEY)) || {}; } catch { return {}; } }
  function saveG(o) { try { localStorage.setItem(GKEY, JSON.stringify(o)); } catch { } }
  function getBest(id) { return loadG()[id]; }
  function setBest(id, val) { const o = loadG(); o[id] = val; saveG(o); }

  /* ---------------- helpers de UI ---------------- */
  function shell(container, hudHTML) {
    container.innerHTML = `<div class="game"><div class="game-hud">${hudHTML}</div><div class="game-body" id="gbody"></div></div>`;
    return container.querySelector("#gbody");
  }
  function hudItem(label, id, val) { return `<div class="game-hud__item"><span class="game-hud__label">${label}</span><span class="game-hud__val" id="${id}">${val}</span></div>`; }
  function resultScreen(container, title, statsHTML, bestHTML) {
    container.innerHTML = `<div class="card center game-result">
        <div class="game-result__title">${title}</div>
        <div class="game-result__stats">${statsHTML}</div>
        ${bestHTML ? `<div class="game-result__best">${bestHTML}</div>` : ""}
        <div class="btn-row" style="justify-content:center;margin-top:6px">
          <button class="btn btn--primary" id="g-replay">Jugar de nuevo</button>
          <a class="btn" href="#/games">Otros juegos</a>
        </div></div>`;
    render(container);
    return container.querySelector("#g-replay");
  }
  function lives(n) { return "●●●".slice(0, n).padEnd(3, "○"); }

  /* ============================================================
     1) RESOLVÉ CON OHM
     ============================================================ */
  function ohmrace(container) {
    function makeQ() {
      const unknown = pick(["I", "V", "R"]);
      const R = pick([2, 3, 4, 5, 6, 8, 10, 12, 20, 25, 50, 100]);
      const I = pick([0.5, 1, 1.5, 2, 3, 4, 5]);
      const V = +(I * R).toFixed(2);
      let ask, ans, unit, given;
      if (unknown === "I") { ask = "Hallá la corriente I"; given = `V = ${V} V , R = ${R} Ω`; ans = V / R; unit = "A"; }
      else if (unknown === "V") { ask = "Hallá el voltaje V"; given = `I = ${I} A , R = ${R} Ω`; ans = I * R; unit = "V"; }
      else { ask = "Hallá la resistencia R"; given = `V = ${V} V , I = ${I} A`; ans = V / I; unit = "Ω"; }
      ans = +ans.toFixed(2);
      const opts = new Set([ans]);
      while (opts.size < 4) {
        const f = pick([0.5, 2, ans + R, ans + I, ans * 1.5, ans - 1, ans + 2]);
        const cand = +(typeof f === "number" && f !== ans ? f : ans + rnd(1, 5)).toFixed(2);
        if (cand > 0 && cand !== ans) opts.add(cand);
      }
      return { ask, given, ans, unit, opts: shuffle([...opts]) };
    }
    function start() {
      const TOTAL = 10; let i = 0, score = 0, lives_ = 3, answered = false;
      const body = shell(container, hudItem("Puntaje", "g-score", "0") + hudItem("Vidas", "g-lives", lives(3)) + hudItem("N°", "g-i", "1/" + TOTAL));
      function paint() {
        if (i >= TOTAL || lives_ <= 0) return finish();
        answered = false; const q = makeQ();
        container.querySelector("#g-i").textContent = (i + 1) + "/" + TOTAL;
        body.innerHTML = `<p class="game-ask">${q.ask}</p>
          <div class="big-q">${q.ask.replace('Hallá ', '')}<small>${q.given}</small></div>
          <div class="opt-grid" id="g-opts">${q.opts.map(o => `<button class="btn" data-v="${o}">${o} ${q.unit}</button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        container.querySelector("#g-opts").addEventListener("click", e => {
          const b = e.target.closest("button"); if (!b || answered) return; answered = true;
          const v = parseFloat(b.dataset.v), ok = Math.abs(v - q.ans) < 1e-6;
          container.querySelectorAll("#g-opts button").forEach(x => {
            x.disabled = true;
            if (Math.abs(parseFloat(x.dataset.v) - q.ans) < 1e-6) x.classList.add("correct");
            else if (x === b) x.classList.add("wrong");
          });
          if (ok) { score++; container.querySelector("#g-score").textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "¡Correcto!"; }
          else { lives_--; container.querySelector("#g-lives").textContent = lives(lives_); fb.className = "game-feedback no show"; fb.innerHTML = `Era <strong>${q.ans} ${q.unit}</strong>.`; }
          timeouts.push(setTimeout(() => { i++; paint(); }, 950));
        });
      }
      function finish() {
        const prev = getBest("ohmrace") || 0; const best = Math.max(prev, score);
        setBest("ohmrace", best);
        const r = resultScreen(container, "¡Terminaste!", `Acertaste <strong>${score}</strong> de ${TOTAL}.`, `Mejor marca: ${best} aciertos`);
        r.addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     2) VERDADERO O FALSO
     ============================================================ */
  const VOF = [
    { s: "En un circuito en serie la corriente es la misma en todos los elementos.", v: true },
    { s: "En paralelo, la resistencia equivalente es mayor que la rama más grande.", v: false },
    { s: "La potencia se calcula como P = V·I.", v: true },
    { s: "Un capacitor cargado, en CD, se comporta como cortocircuito.", v: false },
    { s: "La reactancia inductiva aumenta con la frecuencia.", v: true },
    { s: "El valor rms de una senoide es V_m·√2.", v: false },
    { s: "En el divisor de tensión, la mayor resistencia tiene la mayor caída.", v: true },
    { s: "La conductancia se mide en siemens.", v: true },
    { s: "Para apagar una fuente de voltaje se la deja en circuito abierto.", v: false },
    { s: "En máxima transferencia de potencia, R_L = R_Th.", v: true },
    { s: "Un inductor se opone a los cambios de voltaje.", v: false },
    { s: "La constante de tiempo de un RC es τ = R·C.", v: true },
    { s: "Los capacitores en paralelo se suman.", v: true },
    { s: "El multiplicador del color rojo es ×1000.", v: false },
    { s: "La ley de corrientes de Kirchhoff dice que ∑V = 0 en una malla.", v: false },
    { s: "En resonancia X_L = X_C y la impedancia es mínima (igual a R).", v: true },
    { s: "1 hp equivale a 746 W.", v: true },
    { s: "Dos resistencias iguales en paralelo dan la mitad de su valor.", v: true },
    { s: "El factor de potencia es FP = sen θ.", v: false },
    { s: "Un inductor almacena energía en un campo magnético.", v: true },
  ];
  function vof(container) {
    function start() {
      const deck = shuffle(VOF); let i = 0, score = 0, time = 40, answered = false;
      const body = shell(container, hudItem("Puntaje", "g-score", "0") + hudItem("Tiempo", "g-time", "40") + `<div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Restante</span><div class="game-timer"><span id="g-bar"></span></div></div>`);
      const tick = every(() => { time--; container.querySelector("#g-time").textContent = time; container.querySelector("#g-bar").style.width = (time / 40 * 100) + "%"; if (time <= 0) finish(); }, 1000);
      function paint() {
        if (i >= deck.length) { i = 0; }
        answered = false; const q = deck[i];
        body.innerHTML = `<p class="game-ask">¿Verdadero o Falso?</p>
          <div class="vof-statement">${q.s}</div>
          <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-v="1">Verdadero</button><button class="btn vof-btn vof-btn--f" data-v="0">Falso</button></div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        body.querySelectorAll(".vof-btn").forEach(b => b.addEventListener("click", () => {
          if (answered) return; answered = true;
          const said = b.dataset.v === "1", ok = said === q.v;
          if (ok) { score++; container.querySelector("#g-score").textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "¡Bien!"; }
          else { fb.className = "game-feedback no show"; fb.innerHTML = `Era <strong>${q.v ? "Verdadero" : "Falso"}</strong>.`; }
          timeouts.push(setTimeout(() => { i++; paint(); }, 700));
        }));
      }
      function finish() {
        stopAll(); const prev = getBest("vof") || 0; const best = Math.max(prev, score); setBest("vof", best);
        const r = resultScreen(container, "¡Se acabó el tiempo!", `Acertaste <strong>${score}</strong> afirmaciones.`, `Mejor marca: ${best} aciertos`);
        r.addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     3) CLASIFICÁ EL COMPONENTE
     ============================================================ */
  const CATS = [
    { k: "R", sym: "Ω", name: "Resistor" },
    { k: "C", sym: "C", name: "Capacitor" },
    { k: "L", sym: "L", name: "Inductor" },
    { k: "F", sym: "E", name: "Fuente" },
    { k: "D", sym: "▷", name: "Diodo" },
  ];
  const COMPS = [
    { d: "Se opone al paso de la corriente y disipa calor (Ω).", k: "R" },
    { d: "Se mide en faradios y almacena campo eléctrico.", k: "C" },
    { d: "Bobina que almacena energía en un campo magnético (henrios).", k: "L" },
    { d: "Entrega energía: voltaje o corriente al circuito.", k: "F" },
    { d: "Deja pasar la corriente en un solo sentido.", k: "D" },
    { d: "Su valor se lee con bandas de colores.", k: "R" },
    { d: "Se opone a los cambios de corriente (v = L·di/dt).", k: "L" },
    { d: "En CD estacionaria actúa como circuito abierto.", k: "C" },
    { d: "Tiene polos + y − y mantiene una tensión fija.", k: "F" },
    { d: "Tiene ánodo y cátodo; se usa para rectificar.", k: "D" },
    { d: "Reactancia X_C = 1/(2πfC).", k: "C" },
    { d: "Reactancia X_L = 2πfL.", k: "L" },
    { d: "Convierte energía eléctrica en calor o luz por su resistencia.", k: "R" },
    { d: "Una batería o pila es un ejemplo de este componente.", k: "F" },
  ];
  function classify(container) {
    function start() {
      const deck = shuffle(COMPS); let i = 0, score = 0, lives_ = 3, answered = false;
      const body = shell(container, hudItem("Puntaje", "g-score", "0") + hudItem("Vidas", "g-lives", lives(3)) + hudItem("N°", "g-i", "1/" + deck.length));
      function paint() {
        if (i >= deck.length || lives_ <= 0) return finish();
        answered = false; const it = deck[i];
        container.querySelector("#g-i").textContent = (i + 1) + "/" + deck.length;
        body.innerHTML = `<p class="game-ask">¿Qué componente se describe?</p>
          <div class="classify-item">${it.d}</div>
          <div class="classify-sets" id="g-sets">${CATS.map(s => `<button class="classify-set" data-k="${s.k}"><span class="classify-set__sym">${s.sym}</span><span class="classify-set__name">${s.name}</span></button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        container.querySelector("#g-sets").addEventListener("click", e => {
          const b = e.target.closest(".classify-set"); if (!b || answered) return; answered = true;
          const k = b.dataset.k;
          container.querySelectorAll(".classify-set").forEach(x => { x.disabled = true; if (x.dataset.k === it.k) x.classList.add("correct"); else if (x.dataset.k === k) x.classList.add("wrong"); });
          const name = CATS.find(c => c.k === it.k).name;
          if (k === it.k) { score++; container.querySelector("#g-score").textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "¡Correcto!"; }
          else { lives_--; container.querySelector("#g-lives").textContent = lives(lives_); fb.className = "game-feedback no show"; fb.innerHTML = `Era <strong>${name}</strong>.`; }
          timeouts.push(setTimeout(() => { i++; paint(); }, 850));
        });
      }
      function finish() {
        const prev = getBest("classify") || 0; const best = Math.max(prev, score); setBest("classify", best);
        const r = resultScreen(container, "¡Terminaste!", `Acertaste <strong>${score}</strong> de ${deck.length}.`, `Mejor marca: ${best} aciertos`);
        r.addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     4) CÓDIGO DE COLORES
     ============================================================ */
  const CC = [
    { n: "Negro", c: "#222", d: 0 }, { n: "Marrón", c: "#7c4a25", d: 1 }, { n: "Rojo", c: "#d33", d: 2 },
    { n: "Naranja", c: "#e8841a", d: 3 }, { n: "Amarillo", c: "#f2c200", d: 4 }, { n: "Verde", c: "#1faa4f", d: 5 },
    { n: "Azul", c: "#2b6fd6", d: 6 }, { n: "Violeta", c: "#8a4fc4", d: 7 }, { n: "Gris", c: "#888", d: 8 }, { n: "Blanco", c: "#eee", d: 9 },
  ];
  function colorcode(container) {
    function makeQ() {
      const d1 = rnd(1, 9), d2 = rnd(0, 9), m = rnd(0, 5); // multiplicador 10^0..10^5
      const val = (d1 * 10 + d2) * Math.pow(10, m);
      const opts = new Set([val]);
      while (opts.size < 4) {
        const variant = pick([
          (d1 * 10 + d2) * Math.pow(10, Math.max(0, m + pick([-1, 1, 2]))),
          ((d1 * 10 + d2) + pick([-1, 1, 10, -10])) * Math.pow(10, m),
          (d2 * 10 + d1) * Math.pow(10, m),
        ]);
        if (variant > 0 && variant !== val) opts.add(variant);
      }
      return { d1, d2, m, val, opts: shuffle([...opts]) };
    }
    function start() {
      const TOTAL = 10; let i = 0, score = 0, lives_ = 3, answered = false;
      const body = shell(container, hudItem("Puntaje", "g-score", "0") + hudItem("Vidas", "g-lives", lives(3)) + hudItem("N°", "g-i", "1/" + TOTAL));
      function paint() {
        if (i >= TOTAL || lives_ <= 0) return finish();
        answered = false; const q = makeQ();
        const mult = CC[q.m];
        container.querySelector("#g-i").textContent = (i + 1) + "/" + TOTAL;
        body.innerHTML = `<p class="game-ask">¿Qué resistencia indican estas bandas?</p>
          <div class="resistor"><div class="resistor__wire"></div>
            <div class="resistor__body">
              <span class="resistor__band" style="background:${CC[q.d1].c}"></span>
              <span class="resistor__band" style="background:${CC[q.d2].c}"></span>
              <span class="resistor__band" style="background:${CC[q.m].c}"></span>
              <span class="resistor__band" style="margin-left:auto;background:#caa33a"></span>
            </div></div>
          <p class="center muted" style="font-size:13px">${CC[q.d1].n} · ${CC[q.d2].n} · ${CC[q.m].n} (×10<sup>${q.m}</sup>) · Oro</p>
          <div class="opt-grid" id="g-opts">${q.opts.map(o => `<button class="btn" data-v="${o}">${fmtEng(o, "Ω")}</button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        container.querySelector("#g-opts").addEventListener("click", e => {
          const b = e.target.closest("button"); if (!b || answered) return; answered = true;
          const v = parseFloat(b.dataset.v), ok = v === q.val;
          container.querySelectorAll("#g-opts button").forEach(x => { x.disabled = true; if (parseFloat(x.dataset.v) === q.val) x.classList.add("correct"); else if (x === b) x.classList.add("wrong"); });
          if (ok) { score++; container.querySelector("#g-score").textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "¡Correcto!"; }
          else { lives_--; container.querySelector("#g-lives").textContent = lives(lives_); fb.className = "game-feedback no show"; fb.innerHTML = `Era <strong>${fmtEng(q.val, "Ω")}</strong>.`; }
          timeouts.push(setTimeout(() => { i++; paint(); }, 950));
        });
      }
      function finish() {
        const prev = getBest("colorcode") || 0; const best = Math.max(prev, score); setBest("colorcode", best);
        const r = resultScreen(container, "¡Terminaste!", `Acertaste <strong>${score}</strong> de ${TOTAL}.`, `Mejor marca: ${best} aciertos`);
        r.addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     5) MEMOTEST
     ============================================================ */
  const PAIRS = [
    ["Voltaje", "voltio (V)"], ["Corriente", "amperio (A)"], ["Resistencia", "ohmio (Ω)"],
    ["Capacitancia", "faradio (F)"], ["Inductancia", "henrio (H)"], ["Potencia", "watt (W)"],
    ["Frecuencia", "hertz (Hz)"], ["Conductancia", "siemens (S)"],
  ];
  function memo(container) {
    function start() {
      const sel = shuffle(PAIRS).slice(0, 6);
      let cards = [];
      sel.forEach((p, idx) => { cards.push({ id: idx, t: p[0] }); cards.push({ id: idx, t: p[1] }); });
      cards = shuffle(cards);
      let flipped = [], matched = 0, moves = 0, lock = false;
      const body = shell(container, hudItem("Movimientos", "g-moves", "0") + hudItem("Pares", "g-pairs", "0/6"));
      body.innerHTML = `<div class="memo-grid" id="g-grid">${cards.map((c, i) =>
        `<button class="memo-card" data-i="${i}"><span class="memo-card__face memo-card__cover">?</span><span class="memo-card__face memo-card__content">${c.t}</span></button>`).join("")}</div>`;
      body.querySelectorAll(".memo-card").forEach(card => card.addEventListener("click", () => {
        if (lock) return; const i = +card.dataset.i;
        if (card.classList.contains("is-flipped") || card.classList.contains("is-matched")) return;
        card.classList.add("is-flipped"); flipped.push({ i, card, id: cards[i].id });
        if (flipped.length === 2) {
          moves++; container.querySelector("#g-moves").textContent = moves; lock = true;
          const [a, b] = flipped;
          if (a.id === b.id) {
            timeouts.push(setTimeout(() => { a.card.classList.add("is-matched"); b.card.classList.add("is-matched"); matched++; container.querySelector("#g-pairs").textContent = matched + "/6"; flipped = []; lock = false; if (matched === 6) finish(moves); }, 450));
          } else {
            timeouts.push(setTimeout(() => { a.card.classList.remove("is-flipped"); b.card.classList.remove("is-flipped"); flipped = []; lock = false; }, 800));
          }
        }
      }));
      function finish(mv) {
        const prev = getBest("memo"); const best = (!prev || mv < prev.moves) ? { moves: mv } : prev; setBest("memo", best);
        const r = resultScreen(container, "¡Completaste el memotest!", `Lo resolviste en <strong>${mv}</strong> movimientos.`, `Mejor marca: ${best.moves} movimientos`);
        r.addEventListener("click", start);
      }
    }
    start();
  }

  /* ============================================================
     6) CONECTÁ (magnitud ↔ unidad)
     ============================================================ */
  function connect(container) {
    function start() {
      const sel = shuffle(PAIRS).slice(0, 5);
      const left = sel.map((p, i) => ({ id: i, t: p[0] }));
      const right = shuffle(sel.map((p, i) => ({ id: i, t: p[1] })));
      let selLeft = null, matched = 0, mistakes = 0;
      const body = shell(container, hudItem("Pares", "g-pairs", "0/5") + hudItem("Errores", "g-mis", "0"));
      body.innerHTML = `<p class="game-ask">Tocá una magnitud y luego su unidad.</p>
        <div class="connect-cols">
          <div class="connect-col" id="g-left">${left.map(x => `<button class="connect-item" data-id="${x.id}">${x.t}</button>`).join("")}</div>
          <div class="connect-col" id="g-right">${right.map(x => `<button class="connect-item" data-id="${x.id}">${x.t}</button>`).join("")}</div>
        </div>`;
      function clearSel() { body.querySelectorAll(".connect-item.sel").forEach(x => x.classList.remove("sel")); }
      body.querySelectorAll("#g-left .connect-item").forEach(b => b.addEventListener("click", () => { if (b.classList.contains("matched")) return; clearSel(); b.classList.add("sel"); selLeft = b; }));
      body.querySelectorAll("#g-right .connect-item").forEach(b => b.addEventListener("click", () => {
        if (b.classList.contains("matched") || !selLeft) return;
        if (b.dataset.id === selLeft.dataset.id) {
          b.classList.add("matched"); selLeft.classList.add("matched"); selLeft.classList.remove("sel"); selLeft = null;
          matched++; container.querySelector("#g-pairs").textContent = matched + "/5";
          if (matched === 5) finish();
        } else {
          mistakes++; container.querySelector("#g-mis").textContent = mistakes;
          b.classList.add("bad"); const bad = b; timeouts.push(setTimeout(() => bad.classList.remove("bad"), 500)); clearSel(); selLeft = null;
        }
      }));
      function finish() {
        const prev = getBest("connect"); const best = (!prev || mistakes < prev.mistakes) ? { mistakes } : prev; setBest("connect", best);
        const r = resultScreen(container, "¡Conectaste todo!", `Cometiste <strong>${mistakes}</strong> errores.`, `Mejor marca: ${best.mistakes} errores`);
        r.addEventListener("click", start);
      }
    }
    start();
  }

  /* ============================================================
     7) AHORCADO ELÉCTRICO
     ============================================================ */
  const WORDS = [
    { w: "RESISTENCIA", h: "Oposición al paso de la corriente (Ω)." },
    { w: "VOLTAJE", h: "Energía por unidad de carga, en voltios." },
    { w: "CORRIENTE", h: "Flujo de carga por unidad de tiempo." },
    { w: "CAPACITOR", h: "Almacena energía en un campo eléctrico." },
    { w: "INDUCTOR", h: "Bobina que almacena energía magnética." },
    { w: "KIRCHHOFF", h: "Sus leyes rigen mallas y nodos." },
    { w: "THEVENIN", h: "Equivalente: fuente en serie con R." },
    { w: "IMPEDANCIA", h: "Oposición total en CA (compleja)." },
    { w: "REACTANCIA", h: "Oposición de L o C en CA." },
    { w: "POTENCIA", h: "Energía por unidad de tiempo, en watts." },
    { w: "FRECUENCIA", h: "Ciclos por segundo, en hertz." },
    { w: "CONDUCTANCIA", h: "Inversa de la resistencia, en siemens." },
  ];
  function hangman(container) {
    const ABC = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    function start() {
      const deck = shuffle(WORDS); let idx = 0, solved = 0;
      function round() {
        if (idx >= deck.length) return finish();
        const { w, h } = deck[idx]; let misses = 0, found = new Set(), done = false;
        const body = shell(container, hudItem("Resueltas", "g-solved", String(solved)) + hudItem("Errores", "g-miss", "0/6") + hudItem("Palabra", "g-idx", (idx + 1) + "/" + deck.length));
        function draw() {
          const parts = [
            '<line x1="10" y1="98" x2="70" y2="98"/>', '<line x1="30" y1="98" x2="30" y2="8"/>',
            '<line x1="30" y1="8" x2="72" y2="8"/>', '<line x1="72" y1="8" x2="72" y2="22"/>',
            '<circle cx="72" cy="30" r="8"/>', '<line x1="72" y1="38" x2="72" y2="64"/>',
          ];
          return `<svg class="hang-svg" viewBox="0 0 100 102" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${parts.slice(0, Math.min(misses + 2, parts.length)).join("")}</svg>`;
        }
        function paintWord() { return w.split("").map(ch => `<span class="hang-letter">${found.has(ch) ? ch : ""}</span>`).join(""); }
        function paint() {
          body.innerHTML = `<div class="hang-top">${draw()}<div class="hang-hint"><strong>Pista:</strong> ${h}</div></div>
            <div class="hang-word" id="g-word">${paintWord()}</div>
            <div class="hang-keys" id="g-keys">${ABC.map(l => `<button class="hang-key" data-l="${l}">${l}</button>`).join("")}</div>
            <div class="game-feedback" id="g-fb"></div>`;
          body.querySelectorAll(".hang-key").forEach(k => k.addEventListener("click", () => {
            if (done) return; const l = k.dataset.l; k.disabled = true;
            if (w.includes(l)) { found.add(l); k.classList.add("hit"); container.querySelector("#g-word").innerHTML = paintWord();
              if (w.split("").every(c => found.has(c))) { done = true; solved++; container.querySelector("#g-solved").textContent = solved; win(); } }
            else { misses++; k.classList.add("miss"); container.querySelector("#g-miss").textContent = misses + "/6"; container.querySelector(".hang-svg").outerHTML = draw(); if (misses >= 6) { done = true; lose(); } }
          }));
        }
        function win() { const fb = container.querySelector("#g-fb"); fb.className = "game-feedback ok show"; fb.innerHTML = `¡Correcto! <button class="btn btn--primary" id="g-next" style="margin-left:8px">Siguiente →</button>`; container.querySelector("#g-next").addEventListener("click", () => { idx++; round(); }); }
        function lose() { const fb = container.querySelector("#g-fb"); fb.className = "game-feedback no show"; fb.innerHTML = `Era <strong>${w}</strong>. <button class="btn" id="g-next" style="margin-left:8px">Siguiente →</button>`; container.querySelector("#g-word").innerHTML = w.split("").map(c => `<span class="hang-letter">${c}</span>`).join(""); container.querySelector("#g-next").addEventListener("click", () => { idx++; round(); }); }
        paint();
      }
      function finish() {
        const prev = getBest("hangman") || 0; const best = Math.max(prev, solved); setBest("hangman", best);
        const r = resultScreen(container, "¡Fin del juego!", `Adivinaste <strong>${solved}</strong> de ${deck.length} palabras.`, `Mejor marca: ${best} palabras`);
        r.addEventListener("click", start);
      }
      round();
    }
    start();
  }

  /* ============================================================
     8) ORDENÁ RESISTENCIAS (de menor a mayor)
     ============================================================ */
  function chain(container) {
    function start() {
      const base = [
        { t: "47 Ω", v: 47 }, { t: "100 Ω", v: 100 }, { t: "1 kΩ", v: 1000 },
        { t: "4,7 kΩ", v: 4700 }, { t: "10 kΩ", v: 10000 }, { t: "100 kΩ", v: 100000 },
        { t: "1 MΩ", v: 1e6 }, { t: "2,2 MΩ", v: 2.2e6 }, { t: "220 Ω", v: 220 }, { t: "33 kΩ", v: 33000 },
      ];
      const chosen = shuffle(base).slice(0, 5);
      const sorted = chosen.slice().sort((a, b) => a.v - b.v);
      let placed = [], pool = shuffle(chosen.slice());
      const body = shell(container, hudItem("Ubicadas", "g-ok", "0/5") + hudItem("Errores", "g-mis", "0"));
      let mistakes = 0;
      function paint() {
        body.innerHTML = `<p class="game-ask">Tocá las resistencias de <strong>menor a mayor</strong>.</p>
          <div class="chain-slots">${sorted.map((_, i) => `<div class="chain-slot${placed[i] ? " filled" : ""}">${placed[i] ? placed[i].t : "?"}</div>${i < sorted.length - 1 ? '<span class="chain-arrow">&lt;</span>' : ""}`).join("")}</div>
          <div class="chain-pool" id="g-pool">${pool.map((p, i) => `<button class="chain-chip" data-i="${i}">${p.t}</button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>`;
        body.querySelectorAll(".chain-chip").forEach(c => c.addEventListener("click", () => {
          const i = +c.dataset.i, item = pool[i], next = placed.length;
          if (item.v === sorted[next].v) {
            placed.push(item); pool.splice(i, 1); container.querySelector("#g-ok").textContent = placed.length + "/5";
            if (placed.length === sorted.length) finish(); else paint();
          } else { mistakes++; container.querySelector("#g-mis").textContent = mistakes; c.classList.add("shake"); const cc = c; timeouts.push(setTimeout(() => cc.classList.remove("shake"), 450)); }
        }));
      }
      function finish() {
        const prev = getBest("chain"); const best = (!prev || mistakes < prev.mistakes) ? { mistakes } : prev; setBest("chain", best);
        const r = resultScreen(container, "¡Ordenadas!", `Cometiste <strong>${mistakes}</strong> errores.`, `Mejor marca: ${best.mistakes} errores`);
        r.addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     9) CAZÁ EL ERROR
     ============================================================ */
  const STEPS = [
    { s: "V = 10 V, R = 5 Ω ⟹ I = V/R = 2 A", ok: true },
    { s: "R₁ = 2 Ω, R₂ = 3 Ω en serie ⟹ R_T = 1,2 Ω", ok: false, why: "En serie se SUMAN: R_T = 5 Ω." },
    { s: "R₁ = 6 Ω, R₂ = 3 Ω en paralelo ⟹ R_T = 2 Ω", ok: true },
    { s: "I = 3 A, R = 4 Ω ⟹ P = I²R = 36 W", ok: true },
    { s: "Dos R de 10 Ω en paralelo ⟹ R_T = 20 Ω", ok: false, why: "Iguales en paralelo: R/N = 5 Ω." },
    { s: "V_m = 100 V ⟹ V_rms = 70,7 V", ok: true },
    { s: "Capacitores en serie ⟹ C_T = C₁ + C₂", ok: false, why: "En serie los capacitores se suman INVERSOS: 1/C_T = 1/C₁+1/C₂." },
    { s: "X_L = 2πfL, con f = 50 Hz y L = 0,1 H ⟹ X_L ≈ 31,4 Ω", ok: true },
    { s: "Para máxima potencia ⟹ R_L = 2·R_Th", ok: false, why: "Es R_L = R_Th." },
    { s: "E = 12 V, R_T = 4 Ω ⟹ I = 3 A", ok: true },
    { s: "Divisor: E=20V, R₁=R₂=10Ω ⟹ V₂ = 5 V", ok: false, why: "V₂ = E·R₂/R_T = 20·10/20 = 10 V." },
    { s: "Energía del capacitor ⟹ W = ½CV²", ok: true },
  ];
  function spot(container) {
    function start() {
      const deck = shuffle(STEPS); let i = 0, score = 0, lives_ = 3, answered = false;
      const body = shell(container, hudItem("Puntaje", "g-score", "0") + hudItem("Vidas", "g-lives", lives(3)) + hudItem("N°", "g-i", "1/" + deck.length));
      function paint() {
        if (i >= deck.length || lives_ <= 0) return finish();
        answered = false; const q = deck[i];
        container.querySelector("#g-i").textContent = (i + 1) + "/" + deck.length;
        body.innerHTML = `<p class="game-ask">¿El paso está bien resuelto?</p>
          <div class="vof-statement" style="font-size:18px">${q.s}</div>
          <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-v="1">Correcto</button><button class="btn vof-btn vof-btn--f" data-v="0">Tiene error</button></div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        body.querySelectorAll(".vof-btn").forEach(b => b.addEventListener("click", () => {
          if (answered) return; answered = true;
          const said = b.dataset.v === "1", ok = said === q.ok;
          if (ok) { score++; container.querySelector("#g-score").textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = q.ok ? "¡Bien, estaba correcto!" : "¡Bien! " + (q.why || ""); }
          else { lives_--; container.querySelector("#g-lives").textContent = lives(lives_); fb.className = "game-feedback no show"; fb.innerHTML = q.ok ? "En realidad estaba <strong>correcto</strong>." : "Había un error. " + (q.why || ""); }
          timeouts.push(setTimeout(() => { i++; paint(); }, 1200));
        }));
      }
      function finish() {
        const prev = getBest("spot") || 0; const best = Math.max(prev, score); setBest("spot", best);
        const r = resultScreen(container, "¡Terminaste!", `Acertaste <strong>${score}</strong> de ${deck.length}.`, `Mejor marca: ${best} aciertos`);
        r.addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ---------------- export ---------------- */
  window.Games = { ohmrace, vof, classify, colorcode, memo, connect, hangman, chain, spot, stopAll, getBest };
})();
