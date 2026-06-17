/* ============================================================
   JUEGOS DE APRENDIZAJE — Algoritmos y Estructuras de Datos
   clasifica · vof · memo · recorridos · primos · zn · secuencia · hangman
   ============================================================ */
(function () {
  "use strict";
  const Games = (window.Games = window.Games || {});

  /* ---------- utilidades ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function render(el) { if (window.MathJaxRender) window.MathJaxRender(el); }

  let intervals = [], timeouts = [];
  function every(fn, ms) { const id = setInterval(fn, ms); intervals.push(id); return id; }
  function after(fn, ms) { const id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function stopAll() { intervals.forEach(clearInterval); timeouts.forEach(clearTimeout); intervals = []; timeouts = []; }
  Games.stopAll = stopAll;

  const GKEY = "estudioAlgos.games.v1";
  function loadG() { try { return JSON.parse(localStorage.getItem(GKEY)) || {}; } catch { return {}; } }
  function saveG(o) { try { localStorage.setItem(GKEY, JSON.stringify(o)); } catch { } }
  Games.getBest = id => loadG()[id];
  function setBest(id, val) { const o = loadG(); o[id] = val; saveG(o); }
  function recordHigh(id, score) { const b = loadG()[id]; if (b == null || (typeof b === "number" && score > b) || (b && b.score != null && score > b.score)) setBest(id, score); }
  function recordLow(id, moves) { const b = loadG()[id]; if (b == null || (b.moves != null && moves < b.moves)) setBest(id, { moves }); }

  function shell(container, hud) {
    container.innerHTML = `<div class="game"><div class="game-hud">${hud}</div><div class="game-body" id="gbody"></div></div>`;
    return container.querySelector("#gbody");
  }
  function hudItem(label, id, val) { return `<div class="game-hud__item"><span class="game-hud__label">${label}</span><span class="game-hud__val" id="${id}">${val}</span></div>`; }
  function resultScreen(container, title, stats, best) {
    container.innerHTML = `<div class="card center game-result">
        <div class="game-result__title">${title}</div>
        <div class="game-result__stats">${stats}</div>
        ${best ? `<div class="game-result__best">${best}</div>` : ""}
        <div class="btn-row" style="justify-content:center;margin-top:6px">
          <button class="btn btn--primary" id="g-replay">Jugar de nuevo</button>
          <a class="btn" href="#/games">Otros juegos</a>
        </div></div>`;
    render(container);
    return container.querySelector("#g-replay");
  }

  /* mini-árbol SVG para el juego de recorridos */
  function drawMiniTree(root) {
    let idx = 0; const pos = new Map(); let maxD = 0;
    (function rec(n, d) { if (!n) return; rec(n.l, d + 1); pos.set(n, { i: idx++, d }); maxD = Math.max(maxD, d); rec(n.r, d + 1); })(root, 0);
    const count = idx, Wd = Math.max(280, count * 50), levelH = 56, top = 24, Ht = top + maxD * levelH + 30, stepX = Wd / count;
    const xy = n => ({ x: (pos.get(n).i + 0.5) * stepX, y: top + pos.get(n).d * levelH });
    let lines = "", circles = "";
    (function rec(n) { if (!n) return; const p = xy(n);[n.l, n.r].forEach(c => { if (c) { const q = xy(c); lines += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" class="gedge"/>`; } }); rec(n.l); rec(n.r); })(root);
    (function rec(n) { if (!n) return; const p = xy(n); circles += `<circle cx="${p.x}" cy="${p.y}" r="15" class="gnode"/><text x="${p.x}" y="${p.y}" class="gnode-label">${n.v}</text>`; rec(n.l); rec(n.r); })(root);
    return `<div class="viz-stage" style="margin:0 0 14px"><svg class="viz-svg" viewBox="0 0 ${Wd} ${Ht}">${lines}${circles}</svg></div>`;
  }

  /* ============================================================
     Motor genérico de opción múltiple (con vidas o tiempo)
     ============================================================ */
  function mcEngine(container, opts) {
    // opts: { make() -> {q, options:[...], correctIndex, why}, total, time, onEnd }
    let score = 0, i = 0, lives = opts.lives || 0, answered = false;
    let timeLeft = opts.time || 0;
    const body = shell(container,
      hudItem("Puntaje", "g-score", "0") +
      (opts.lives ? hudItem("Vidas", "g-lives", "●".repeat(lives)) : "") +
      (opts.time ? `<div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="g-bar"></span></div></div>` : hudItem("N°", "g-n", "1")));
    const elScore = container.querySelector("#g-score");
    const elLives = container.querySelector("#g-lives");
    const elN = container.querySelector("#g-n");
    const elBar = container.querySelector("#g-bar");

    if (opts.time) {
      every(() => { timeLeft--; if (elBar) elBar.style.width = (timeLeft / opts.time * 100) + "%"; if (timeLeft <= 0) end(); }, 1000);
    }
    function paint() {
      answered = false;
      const it = opts.make();
      paint.cur = it;
      if (elN) elN.textContent = (i + 1) + (opts.total ? "/" + opts.total : "");
      body.innerHTML = `<p class="game-ask">${opts.ask || ""}</p>
        <div class="game-prompt">${it.q}</div>
        <div class="opt-grid" id="g-opts">${it.options.map((o, k) => `<button class="btn opt-btn" data-k="${k}">${o}</button>`).join("")}</div>
        <div class="game-feedback" id="g-fb"></div>`;
      render(body);
      const fb = body.querySelector("#g-fb");
      body.querySelector("#g-opts").addEventListener("click", e => {
        const b = e.target.closest(".opt-btn"); if (!b || answered) return;
        answered = true;
        const k = +b.dataset.k;
        body.querySelectorAll(".opt-btn").forEach((el, idx) => { el.disabled = true; if (idx === it.correctIndex) el.classList.add("correct"); else if (idx === k) el.classList.add("wrong"); });
        if (k === it.correctIndex) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "¡Correcto! " + (it.why || ""); }
        else {
          fb.className = "game-feedback no show"; fb.innerHTML = "Incorrecto. " + (it.why || "");
          if (opts.lives) { lives--; elLives.textContent = "●".repeat(lives) || "—"; if (lives <= 0) return after(end, 900); }
        }
        render(fb);
        after(() => { i++; if (opts.total && i >= opts.total) end(); else paint(); }, 850);
      });
    }
    function end() {
      stopAll();
      recordHigh(opts.id, score);
      const best = Games.getBest(opts.id);
      resultScreen(container, opts.title || "¡Fin!", `Acertaste <span class="game-result__big">${score}</span> ${opts.total ? "de " + opts.total : ""}`,
        `Mejor marca: ${typeof best === "number" ? best : score} aciertos`)
        .addEventListener("click", () => start());
    }
    function start() { score = 0; i = 0; lives = opts.lives || 0; timeLeft = opts.time || 0; if (elScore) elScore.textContent = "0"; paint(); }
    start();
  }

  /* ============================================================
     1) CLASIFICÁ EL CONCEPTO
     ============================================================ */
  const CATS = ["Estructura", "Grafos", "Árboles", "Teoría de Nros"];
  const TERMS = [
    ["Cola FIFO", 0], ["Pila LIFO", 0], ["Lista doble enlazada", 0], ["Cola de prioridad", 0], ["Cola circular", 0],
    ["Matriz de adyacencia", 1], ["Dijkstra", 1], ["Camino de Euler", 1], ["Árbol cubridor (Prim)", 1], ["DFS / BFS", 1], ["Grado de un nodo", 1],
    ["Recorrido inorden", 2], ["Rotación AVL", 2], ["Sucesor inorden", 2], ["Nodo-3 (árbol 2-3)", 2], ["Factor de equilibrio", 2],
    ["Criba de Eratóstenes", 3], ["Identidad de Bézout", 3], ["Congruencia mod n", 3], ["Algoritmo de Euclides", 3], ["Ecuación diofántica", 3],
  ];
  Games.clasifica = function (container) {
    function make() {
      const [term, cat] = TERMS[Math.floor(Math.random() * TERMS.length)];
      return { q: term, options: CATS, correctIndex: cat, why: `Pertenece a «${CATS[cat]}».` };
    }
    mcEngine(container, { id: "clasifica", make, lives: 3, ask: "¿A qué tema pertenece este concepto?", title: "Clasificá el concepto" });
  };

  /* ============================================================
     2) VERDADERO O FALSO (contrarreloj)
     ============================================================ */
  const VOF = [
    ["Una cola es una estructura FIFO.", true],
    ["En una pila el primero en entrar es el primero en salir.", false],
    ["El recorrido inorden de un ABB da los valores ordenados.", true],
    ["Dijkstra sirve para hallar el árbol cubridor mínimo.", false],
    ["Un grafo tiene ciclo de Euler si todos sus nodos tienen grado par.", true],
    ["El algoritmo de Floyd halla el camino mínimo desde un solo origen.", false],
    ["BFS usa una cola; DFS usa la pila de recursión.", true],
    ["El resto entero de −23 ÷ 2 es −1.", false],
    ["Un número primo tiene exactamente 4 divisores enteros.", true],
    ["mcd(a,b) se calcula con el algoritmo de Euclides.", true],
    ["Todo elemento de Zₙ tiene inverso multiplicativo.", false],
    ["a·x ≡ b (mod n) tiene solución si y solo si mcd(a,n) divide a b.", true],
    ["Un árbol AVL puede degenerar en una lista.", false],
    ["En un árbol 2-3 todas las hojas están al mismo nivel.", true],
    ["La matriz de adyacencia de un grafo no dirigido es simétrica.", true],
    ["Prim es un algoritmo de programación dinámica.", false],
    ["El test de primalidad eficiente prueba divisores hasta √p.", true],
    ["La cantidad de nodos de grado impar puede ser exactamente 1.", false],
  ];
  Games.vof = function (container) {
    let score = 0, timeLeft = 45, answered = false, deck = shuffle(VOF);
    const body = shell(container, hudItem("Puntaje", "g-score", "0") + `<div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="g-bar"></span></div></div>`);
    const elScore = container.querySelector("#g-score"), elBar = container.querySelector("#g-bar");
    every(() => { timeLeft--; elBar.style.width = (timeLeft / 45 * 100) + "%"; if (timeLeft <= 0) end(); }, 1000);
    function paint() {
      answered = false;
      if (!deck.length) deck = shuffle(VOF);
      const [text, val] = deck.pop();
      body.innerHTML = `<div class="game-prompt" style="font-size:20px">${text}</div>
        <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-v="1">Verdadero</button><button class="btn vof-btn vof-btn--f" data-v="0">Falso</button></div>
        <div class="game-feedback" id="g-fb"></div>`;
      const fb = body.querySelector("#g-fb");
      body.querySelectorAll(".vof-btn").forEach(b => b.addEventListener("click", () => {
        if (answered) return; answered = true;
        const ans = b.dataset.v === "1";
        if (ans === val) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Correcto!"; }
        else { fb.className = "game-feedback no show"; fb.textContent = "Era " + (val ? "Verdadero" : "Falso") + "."; }
        after(paint, 650);
      }));
    }
    function end() { stopAll(); recordHigh("vof", score); resultScreen(container, "¡Se acabó el tiempo!", `Acertaste <span class="game-result__big">${score}</span>`, `Mejor: ${Games.getBest("vof")} aciertos`).addEventListener("click", () => Games.vof(container)); }
    paint();
  };

  /* ============================================================
     3) MEMOTEST (término ↔ definición)
     ============================================================ */
  const PAIRS = [
    ["FIFO", "Cola"], ["LIFO", "Pila"], ["DFS", "Profundidad"], ["BFS", "Anchura"],
    ["Euclides", "MCD"], ["AVL", "Balanceado"], ["Bézout", "s·a+t·b"], ["Floyd", "Todos los pares"],
  ];
  Games.memo = function (container) {
    const chosen = shuffle(PAIRS).slice(0, 6);
    let deck = [];
    chosen.forEach((p, i) => { deck.push({ pair: i, t: p[0] }); deck.push({ pair: i, t: p[1] }); });
    deck = shuffle(deck);
    let flipped = [], matched = 0, moves = 0, lock = false;
    const body = shell(container, hudItem("Pares", "g-m", "0/6") + hudItem("Movidas", "g-mv", "0"));
    const elM = container.querySelector("#g-m"), elMv = container.querySelector("#g-mv");
    body.innerHTML = `<div class="memo-grid" id="g-grid">${deck.map((c, k) => `
      <button class="memo-card" data-k="${k}"><span class="memo-card__face memo-card__cover">?</span><span class="memo-card__face memo-card__content">${c.t}</span></button>`).join("")}</div>`;
    body.querySelector("#g-grid").addEventListener("click", e => {
      const card = e.target.closest(".memo-card"); if (!card || lock) return;
      const k = +card.dataset.k;
      if (card.classList.contains("is-matched") || card.classList.contains("is-flipped")) return;
      card.classList.add("is-flipped"); flipped.push(k);
      if (flipped.length === 2) {
        moves++; elMv.textContent = moves; lock = true;
        const [a, b] = flipped;
        if (deck[a].pair === deck[b].pair) {
          after(() => { body.querySelectorAll(`[data-k="${a}"],[data-k="${b}"]`).forEach(el => el.classList.add("is-matched")); matched++; elM.textContent = matched + "/6"; flipped = []; lock = false; if (matched === 6) win(); }, 380);
        } else {
          after(() => { body.querySelectorAll(`[data-k="${a}"],[data-k="${b}"]`).forEach(el => el.classList.remove("is-flipped")); flipped = []; lock = false; }, 720);
        }
      }
    });
    function win() { recordLow("memo", moves); const b = Games.getBest("memo"); resultScreen(container, "¡Completado!", `Lo resolviste en <span class="game-result__big">${moves}</span> movidas`, `Mejor: ${b && b.moves != null ? b.moves : moves} movidas`).addEventListener("click", () => Games.memo(container)); }
  };

  /* ============================================================
     4) ADIVINÁ EL RECORRIDO
     ============================================================ */
  function buildBST(vals) { let root = null; const ins = (n, v) => { if (!n) return { v, l: null, r: null }; if (v < n.v) n.l = ins(n.l, v); else if (v > n.v) n.r = ins(n.r, v); return n; }; vals.forEach(v => root = ins(root, v)); return root; }
  function travel(n, type, acc) { if (!n) return; if (type === "pre") acc.push(n.v); travel(n.l, type, acc); if (type === "in") acc.push(n.v); travel(n.r, type, acc); if (type === "post") acc.push(n.v); }
  Games.recorridos = function (container) {
    function make() {
      const k = 4 + Math.floor(Math.random() * 3);
      const set = new Set(); while (set.size < k) set.add(2 + Math.floor(Math.random() * 80));
      const root = buildBST([...set]);
      const types = [["pre", "preorden"], ["in", "inorden"], ["post", "postorden"]];
      const [tt, tn] = types[Math.floor(Math.random() * 3)];
      const correct = []; travel(root, tt, correct);
      const opts = new Set([correct.join(" ")]);
      ["pre", "in", "post"].forEach(t => { if (t !== tt) { const a = []; travel(root, t, a); opts.add(a.join(" ")); } });
      while (opts.size < 4) opts.add(shuffle(correct).join(" "));
      const options = shuffle([...opts]).slice(0, 4);
      if (!options.includes(correct.join(" "))) options[0] = correct.join(" ");
      return { tree: root, ask: `¿Cuál es el recorrido <strong>${tn}</strong> de este árbol?`, options, correctIndex: options.indexOf(correct.join(" ")), tn };
    }
    let score = 0, i = 0, answered = false;
    const body = shell(container, hudItem("Puntaje", "g-score", "0") + hudItem("N°", "g-n", "1/10"));
    const elScore = container.querySelector("#g-score"), elN = container.querySelector("#g-n");
    function paint() {
      answered = false; const it = make(); elN.textContent = (i + 1) + "/10";
      body.innerHTML = `<p class="game-ask">${it.ask}</p>${drawMiniTree(it.tree)}
        <div class="quiz-options" id="g-opts">${it.options.map((o, k) => `<button class="btn quiz-opt" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span style="font-family:var(--mono)">${o}</span></button>`).join("")}</div>
        <div class="game-feedback" id="g-fb"></div>`;
      const fb = body.querySelector("#g-fb");
      body.querySelector("#g-opts").addEventListener("click", e => {
        const b = e.target.closest(".quiz-opt"); if (!b || answered) return; answered = true;
        const k = +b.dataset.k;
        body.querySelectorAll(".quiz-opt").forEach((el, idx) => { el.disabled = true; if (idx === it.correctIndex) el.classList.add("correct"); else if (idx === k) el.classList.add("wrong"); });
        if (k === it.correctIndex) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Correcto!"; }
        else { fb.className = "game-feedback no show"; fb.textContent = "El " + it.tn + " correcto está resaltado en verde."; }
        after(() => { i++; if (i >= 10) end(); else paint(); }, 1100);
      });
    }
    function end() { recordHigh("recorridos", score); resultScreen(container, "¡Fin!", `Acertaste <span class="game-result__big">${score}</span> de 10`, `Mejor: ${Games.getBest("recorridos")} aciertos`).addEventListener("click", () => Games.recorridos(container)); }
    paint();
  };

  /* ============================================================
     5) ¿ES PRIMO? (contrarreloj)
     ============================================================ */
  function isPrime(n) { if (n < 2) return false; if (n < 4) return true; if (n % 2 === 0) return false; for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return false; return true; }
  Games.primos = function (container) {
    let score = 0, timeLeft = 60, answered = false;
    const body = shell(container, hudItem("Puntaje", "g-score", "0") + `<div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="g-bar"></span></div></div>`);
    const elScore = container.querySelector("#g-score"), elBar = container.querySelector("#g-bar");
    every(() => { timeLeft--; elBar.style.width = (timeLeft / 60 * 100) + "%"; if (timeLeft <= 0) end(); }, 1000);
    function paint() {
      answered = false;
      const useprime = Math.random() < 0.5;
      let n;
      if (useprime) { const ps = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]; n = ps[Math.floor(Math.random() * ps.length)]; }
      else { do { n = 4 + Math.floor(Math.random() * 96); } while (isPrime(n)); }
      body.innerHTML = `<p class="game-ask">¿El número es primo o compuesto?</p>
        <div class="game-prompt" style="font-size:40px">${n}</div>
        <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-p="1">Primo</button><button class="btn vof-btn vof-btn--f" data-p="0">Compuesto</button></div>
        <div class="game-feedback" id="g-fb"></div>`;
      const fb = body.querySelector("#g-fb"), prime = isPrime(n);
      body.querySelectorAll(".vof-btn").forEach(b => b.addEventListener("click", () => {
        if (answered) return; answered = true;
        const ans = b.dataset.p === "1";
        if (ans === prime) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Correcto!"; }
        else { fb.className = "game-feedback no show"; fb.innerHTML = `${n} es ${prime ? "primo" : "compuesto"}.`; }
        after(paint, 550);
      }));
    }
    function end() { stopAll(); recordHigh("primos", score); resultScreen(container, "¡Se acabó el tiempo!", `Acertaste <span class="game-result__big">${score}</span>`, `Mejor: ${Games.getBest("primos")} aciertos`).addEventListener("click", () => Games.primos(container)); }
    paint();
  };

  /* ============================================================
     6) OPERÁ EN Zₙ (contrarreloj)
     ============================================================ */
  Games.zn = function (container) {
    function make() {
      const n = [4, 5, 6, 7][Math.floor(Math.random() * 4)];
      const a = Math.floor(Math.random() * n), b = Math.floor(Math.random() * n);
      const op = Math.random() < 0.5 ? "+" : "×";
      const res = op === "+" ? (a + b) % n : (a * b) % n;
      const opts = new Set([res]); while (opts.size < 4) opts.add(Math.floor(Math.random() * n));
      const options = shuffle([...opts]).map(String);
      return { q: `${a} ${op}<sub>${n}</sub> ${b}`, options, correctIndex: options.indexOf(String(res)), why: `= resto(${a}${op === "+" ? "+" : "·"}${b}, ${n}) = ${res}.` };
    }
    mcEngine(container, { id: "zn", make, time: 50, total: 999, ask: "Resolvé la operación en Zₙ:", title: "Operá en Zₙ" });
  };

  /* ============================================================
     7) ORDENÁ LOS PASOS
     ============================================================ */
  const SEQS = [
    { title: "Recorrido en anchura (BFS)", steps: ["Meter el nodo inicial en la cola", "Sacar un nodo de la cola", "Visitar / mostrar ese nodo", "Encolar sus vecinos no visitados", "Repetir hasta que la cola esté vacía"] },
    { title: "Algoritmo de Dijkstra", steps: ["Poner d(origen)=0 y C={origen}", "Buscar la arista {p,q} con p∈C, q∉C de menor d(p)+c", "Fijar d(q) y agregar q a C", "Guardar el predecesor de q", "Repetir hasta llegar al destino"] },
    { title: "Eliminar un nodo con 2 hijos (ABB)", steps: ["Buscar el nodo a eliminar", "Hallar su sucesor inorden (menor del subárbol derecho)", "Copiar el valor del sucesor en el nodo", "Eliminar el nodo sucesor (que tiene 0 o 1 hijo)"] },
    { title: "Algoritmo de Euclides (mcd)", steps: ["Calcular r = resto(a, b)", "Si r = 0, el mcd es b", "Si no, reemplazar a←b, b←r", "Repetir con los nuevos valores"] },
  ];
  Games.secuencia = function (container) {
    let round = 0, score = 0;
    function paint() {
      const sq = SEQS[round % SEQS.length];
      const correct = sq.steps;
      const pool = shuffle(correct.map((s, i) => ({ s, i })));
      let placed = [];
      const body = shell(container, hudItem("Puntaje", "g-score", String(score)) + hudItem("Ronda", "g-r", `${round + 1}/${SEQS.length}`));
      body.innerHTML = `<p class="game-ask"><strong>${sq.title}</strong> — tocá los pasos en el orden correcto.</p>
        <div class="seq-slots" id="g-slots">${correct.map((_, i) => `<div class="seq-slot" data-pos="${i}">${i + 1}</div>`).join("")}</div>
        <div class="seq-pool" id="g-pool">${pool.map(p => `<button class="btn seq-chip" data-i="${p.i}">${p.s}</button>`).join("")}</div>
        <div class="game-feedback" id="g-fb"></div>`;
      const slots = body.querySelector("#g-slots"), fb = body.querySelector("#g-fb");
      body.querySelector("#g-pool").addEventListener("click", e => {
        const chip = e.target.closest(".seq-chip"); if (!chip || chip.disabled) return;
        const expected = placed.length;
        if (+chip.dataset.i === expected) {
          chip.disabled = true; chip.classList.add("matched"); chip.style.opacity = ".5";
          const slot = slots.querySelector(`[data-pos="${expected}"]`); slot.classList.add("filled"); slot.textContent = chip.textContent;
          placed.push(expected);
          if (placed.length === correct.length) { score++; container.querySelector("#g-score").textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Secuencia correcta!"; after(next, 900); }
        } else { chip.classList.add("shake"); after(() => chip.classList.remove("shake"), 400); fb.className = "game-feedback no show"; fb.textContent = "Ese no es el siguiente paso."; }
      });
      function next() { round++; if (round >= SEQS.length) end(); else paint(); }
    }
    function end() { recordHigh("secuencia", score); resultScreen(container, "¡Completaste las secuencias!", `Acertaste <span class="game-result__big">${score}</span> de ${SEQS.length}`, `Mejor: ${Games.getBest("secuencia")} aciertos`).addEventListener("click", () => { round = 0; score = 0; paint(); }); }
    paint();
  };

  /* ============================================================
     8) AHORCADO (vocabulario)
     ============================================================ */
  const WORDS = [
    ["GRAFO", "Conjunto de nodos unidos por aristas"],
    ["ARISTA", "Conexión entre dos nodos de un grafo"],
    ["VERTICE", "Otro nombre para un nodo del grafo"],
    ["DIJKSTRA", "Algoritmo voraz de camino mínimo desde un origen"],
    ["EULER", "Recorrido que usa cada arista exactamente una vez"],
    ["COLA", "Estructura FIFO: se mete por el final, se saca por el frente"],
    ["PILA", "Estructura LIFO"],
    ["INORDEN", "Recorrido que en un ABB sale ordenado"],
    ["ROTACION", "Operación que reequilibra un árbol AVL"],
    ["PRIMO", "Número con exactamente cuatro divisores enteros"],
    ["EUCLIDES", "Algoritmo del máximo común divisor"],
    ["BEZOUT", "Identidad s·a + t·b = mcd(a,b)"],
    ["MODULAR", "Aritmética de los restos al dividir por n"],
    ["RECURSION", "Definir la solución en términos de casos más chicos"],
  ];
  Games.hangman = function (container) {
    let solved = 0;
    function paint() {
      const [word, hint] = WORDS[Math.floor(Math.random() * WORDS.length)];
      const guessed = new Set(); let wrong = 0; const MAX = 6;
      const body = shell(container, hudItem("Resueltas", "g-s", String(solved)) + hudItem("Errores", "g-e", `0/${MAX}`));
      function draw() {
        const parts = [
          `<line x1="10" y1="100" x2="80" y2="100"/><line x1="30" y1="100" x2="30" y2="12"/><line x1="30" y1="12" x2="70" y2="12"/><line x1="70" y1="12" x2="70" y2="24"/>`,
          `<circle cx="70" cy="32" r="8"/>`, `<line x1="70" y1="40" x2="70" y2="66"/>`,
          `<line x1="70" y1="48" x2="58" y2="58"/>`, `<line x1="70" y1="48" x2="82" y2="58"/>`,
          `<line x1="70" y1="66" x2="58" y2="82"/>`, `<line x1="70" y1="66" x2="82" y2="82"/>`,
        ];
        return `<svg class="hang-svg" viewBox="0 0 100 110" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">${parts.slice(0, 1 + wrong).join("")}</svg>`;
      }
      function render2() {
        const won = [...word].every(c => guessed.has(c));
        const lost = wrong >= MAX;
        body.innerHTML = `<div class="hang-top">${draw()}<div class="hang-hint"><strong>Pista:</strong> ${hint}</div></div>
          <div class="hang-word">${[...word].map(c => `<div class="hang-letter">${guessed.has(c) || lost ? c : ""}</div>`).join("")}</div>
          <div class="hang-keys" id="g-keys">${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => `<button class="hang-key ${guessed.has(l) ? (word.includes(l) ? "hit" : "miss") : ""}" data-l="${l}" ${guessed.has(l) || won || lost ? "disabled" : ""}>${l}</button>`).join("")}</div>
          <div class="game-feedback ${won ? "ok show" : lost ? "no show" : ""}">${won ? "¡Adivinaste! 🎉" : lost ? `Perdiste. Era <strong>${word}</strong>.` : ""}</div>
          ${won || lost ? `<div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="g-next">${won ? "Siguiente palabra" : "Reintentar"}</button></div>` : ""}`;
        container.querySelector("#g-e").textContent = `${wrong}/${MAX}`;
        if (won || lost) {
          if (won) { solved++; recordHigh("hangman", solved); }
          body.querySelector("#g-next").addEventListener("click", () => { if (won) paint(); else { solved = 0; paint(); } });
          return;
        }
        body.querySelector("#g-keys").addEventListener("click", e => {
          const b = e.target.closest(".hang-key"); if (!b || b.disabled) return;
          const l = b.dataset.l; guessed.add(l); if (!word.includes(l)) wrong++; render2();
        });
      }
      render2();
    }
    paint();
  };

})();
