/* ============================================================
   JUEGOS DE APRENDIZAJE — Sistemas de Computación
   1) classify  — Clasificá el concepto
   2) vof       — Verdadero o Falso (contrarreloj)
   3) memo      — Memotest de siglas
   4) bits      — Conversión binaria (contrarreloj)
   5) gates     — Compuertas lógicas
   6) order     — Ordená la secuencia
   7) hangman   — Ahorcado técnico
   8) connect   — Conectá término ↔ definición
   Cada juego guarda su mejor marca en localStorage (estudioSC.games.v1).
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- utilidades ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  let intervals = [], timeouts = [];
  function every(fn, ms) { const id = setInterval(fn, ms); intervals.push(id); return id; }
  function after(fn, ms) { const id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function stopAll() { intervals.forEach(clearInterval); timeouts.forEach(clearTimeout); intervals = []; timeouts = []; }

  const GKEY = "estudioSC.games.v1";
  function loadG() { try { return JSON.parse(localStorage.getItem(GKEY)) || {}; } catch { return {}; } }
  function saveG(o) { try { localStorage.setItem(GKEY, JSON.stringify(o)); } catch { } }
  function getBest(id) { const v = loadG()[id]; return v == null ? null : v; }
  function setBest(id, val) { const o = loadG(); o[id] = val; saveG(o); }

  function shell(container, hudHTML) {
    container.innerHTML = `<div class="game"><div class="game-hud">${hudHTML}</div><div class="game-body" id="gbody"></div></div>`;
    return container.querySelector("#gbody");
  }
  function resultScreen(container, title, statsHTML, bestHTML) {
    container.innerHTML = `<div class="card center game-result">
      <div class="game-result__title">${title}</div>
      <div class="game-result__stats">${statsHTML}</div>
      ${bestHTML ? `<div class="game-result__best">${bestHTML}</div>` : ""}
      <div class="btn-row" style="justify-content:center;margin-top:6px">
        <button class="btn btn--primary" id="g-replay">Jugar de nuevo</button>
        <a class="btn" href="#/games">Otros juegos</a>
      </div></div>`;
    return container.querySelector("#g-replay");
  }

  /* ============================================================
     1) CLASIFICÁ EL CONCEPTO — ¿a qué área temática pertenece?
     ============================================================ */
  const AREAS = [
    { k: "datos", name: "Representación de datos" },
    { k: "circ", name: "Circuitos digitales" },
    { k: "cpu", name: "CPU / Organización" },
    { k: "so", name: "Sistemas operativos" },
    { k: "libre", name: "Software libre" },
  ];
  const CONCEPTS = [
    { t: "Complemento a 2", k: "datos", why: "Forma de representar enteros con signo." },
    { t: "Código BCD", k: "datos", why: "Cada dígito decimal en 4 bits." },
    { t: "IEEE 754", k: "datos", why: "Estándar de punto flotante." },
    { t: "Código ASCII", k: "datos", why: "Codifica caracteres en 7/8 bits." },
    { t: "Bit de paridad", k: "datos", why: "Detecta errores de transmisión." },
    { t: "Compuerta NAND", k: "circ", why: "Compuerta universal del álgebra de Boole." },
    { t: "Mapa de Karnaugh", k: "circ", why: "Simplifica funciones booleanas." },
    { t: "Multiplexor", k: "circ", why: "Selecciona una de varias entradas." },
    { t: "Flip-flop", k: "circ", why: "Elemento básico de memoria secuencial." },
    { t: "Sumador completo", k: "circ", why: "Circuito combinacional con acarreo." },
    { t: "ALU", k: "cpu", why: "Unidad Aritmético-Lógica." },
    { t: "Registro IR", k: "cpu", why: "Contiene la instrucción en curso." },
    { t: "Contador de programa", k: "cpu", why: "Apunta a la próxima instrucción." },
    { t: "Bus de datos", k: "cpu", why: "Transporta datos en el procesador." },
    { t: "Microprograma", k: "cpu", why: "Implementa la unidad de control." },
    { t: "Pipeline", k: "cpu", why: "Solapa etapas de instrucciones (segmentación)." },
    { t: "Planificador (scheduler)", k: "so", why: "Decide qué proceso usa la CPU." },
    { t: "Semáforo", k: "so", why: "Sincroniza procesos con wait/signal." },
    { t: "Paginación", k: "so", why: "Memoria dividida en páginas y marcos." },
    { t: "Llamada al sistema", k: "so", why: "Interfaz entre proceso y kernel." },
    { t: "Licencia GPL", k: "libre", why: "Licencia copyleft del software libre." },
    { t: "Código fuente abierto", k: "libre", why: "Disponible para estudiar y modificar." },
    { t: "Kernel Linux", k: "libre", why: "Núcleo libre de tipo monolítico." },
    { t: "GNU", k: "libre", why: "Proyecto de software libre (compiladores, utilidades)." },
  ];

  function classify(container) {
    function start() {
      const deck = shuffle(CONCEPTS);
      let i = 0, score = 0, lives = 3, answered = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item"><span class="game-hud__label">Vidas</span><span class="game-hud__val" id="g-lives">●●●</span></div>
         <div class="game-hud__item"><span class="game-hud__label">N°</span><span class="game-hud__val"><span id="g-i">1</span>/${deck.length}</span></div>`);
      const elScore = container.querySelector("#g-score"), elLives = container.querySelector("#g-lives"), elI = container.querySelector("#g-i");

      function paint() {
        answered = false;
        const it = deck[i]; elI.textContent = i + 1;
        body.innerHTML =
          `<p class="game-ask">¿A qué área temática pertenece este concepto?</p>
           <div class="classify-number">${it.t}</div>
           <div class="classify-sets" id="g-sets">
             ${AREAS.map(s => `<button class="classify-set" data-k="${s.k}"><span class="classify-set__name">${s.name}</span></button>`).join("")}
           </div>
           <div class="game-feedback" id="g-fb"></div>
           <div class="btn-row" id="g-nav" style="justify-content:center"></div>`;
        const fb = container.querySelector("#g-fb"), nav = container.querySelector("#g-nav");
        container.querySelector("#g-sets").addEventListener("click", e => {
          const b = e.target.closest(".classify-set"); if (!b || answered) return;
          answered = true; const k = b.dataset.k;
          container.querySelectorAll(".classify-set").forEach(el => {
            el.disabled = true;
            if (el.dataset.k === it.k) el.classList.add("correct");
            else if (el === b) el.classList.add("wrong");
          });
          if (k === it.k) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "✔ ¡Correcto! " + it.why; }
          else { lives--; elLives.textContent = "●".repeat(lives) + "○".repeat(3 - lives); fb.className = "game-feedback no show"; fb.innerHTML = "✘ Era <strong>" + AREAS.find(a => a.k === it.k).name + "</strong>. " + it.why; }
          if (lives <= 0 || i >= deck.length - 1) nav.innerHTML = `<button class="btn btn--primary" id="g-next">Ver resultado →</button>`;
          else nav.innerHTML = `<button class="btn btn--primary" id="g-next">Siguiente →</button>`;
          nav.querySelector("#g-next").addEventListener("click", () => {
            if (lives <= 0 || i >= deck.length - 1) finish();
            else { i++; paint(); }
          });
        });
      }
      function finish() {
        const best = getBest("classify") || 0, record = score > best;
        if (record) setBest("classify", score);
        resultScreen(container, "Clasificá el concepto", `<span class="game-result__big">${score}</span> aciertos`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("classify") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     2) VERDADERO O FALSO contrarreloj
     ============================================================ */
  const VOF = [
    { s: "Un byte tiene 8 bits.", v: true },
    { s: "En complemento a 2, el bit más significativo indica el signo.", v: true },
    { s: "El código BCD representa cada dígito decimal con 4 bits.", v: true },
    { s: "La compuerta NOT tiene dos entradas.", v: false, e: "La NOT (inversor) tiene una sola entrada." },
    { s: "NAND y NOR son compuertas universales.", v: true },
    { s: "La XOR da 1 cuando sus dos entradas son iguales.", v: false, e: "XOR da 1 solo cuando las entradas son distintas." },
    { s: "La ALU realiza operaciones aritméticas y lógicas.", v: true },
    { s: "El contador de programa (PC) apunta a la próxima instrucción.", v: true },
    { s: "RISC usa un conjunto de instrucciones reducido.", v: true },
    { s: "CISC tiene instrucciones más simples que RISC.", v: false, e: "CISC tiene instrucciones complejas; RISC son simples." },
    { s: "El pipeline ejecuta instrucciones solapando etapas.", v: true },
    { s: "El registro AX del 8086 es de 16 bits.", v: true },
    { s: "La caché es más lenta que el disco rígido.", v: false, e: "La caché es mucho más rápida que el disco." },
    { s: "Los registros son la memoria más rápida del sistema.", v: true },
    { s: "Un semáforo se opera con wait y signal.", v: true },
    { s: "La paginación divide la memoria en páginas y marcos del mismo tamaño.", v: true },
    { s: "El software libre prohíbe estudiar el código fuente.", v: false, e: "El software libre permite estudiar y modificar el código." },
    { s: "La licencia GPL es una licencia copyleft.", v: true },
    { s: "El número binario 1010 equivale al decimal 10.", v: true },
    { s: "El sistema hexadecimal usa base 16.", v: true },
    { s: "Un multiplexor selecciona una de varias entradas.", v: true },
    { s: "En IEEE 754 simple precisión se usan 64 bits.", v: false, e: "Simple precisión usa 32 bits; doble usa 64." },
  ];
  function vof(container) {
    const TIME = 50;
    function start() {
      const deck = shuffle(VOF); let i = 0, score = 0, timeLeft = TIME, answered = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="g-bar"></span></div></div>`);
      const elScore = container.querySelector("#g-score"), bar = container.querySelector("#g-bar");
      every(() => { timeLeft--; bar.style.width = (timeLeft / TIME * 100) + "%"; if (timeLeft <= 0) finish(); }, 1000);
      function paint() {
        answered = false; const it = deck[i % deck.length];
        body.innerHTML = `<div class="vof-statement">${it.s}</div>
          <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-v="1">Verdadero</button><button class="btn vof-btn vof-btn--f" data-v="0">Falso</button></div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        body.querySelectorAll(".vof-btn").forEach(b => b.addEventListener("click", () => {
          if (answered) return; answered = true;
          const ans = b.dataset.v === "1";
          if (ans === it.v) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "✔ Correcto"; }
          else { fb.className = "game-feedback no show"; fb.innerHTML = "✘ " + (it.v ? "Es Verdadero. " : "Es Falso. ") + (it.e || ""); }
          after(() => { i++; if (timeLeft > 0) paint(); }, 850);
        }));
      }
      function finish() {
        stopAll(); const best = getBest("vof") || 0, record = score > best; if (record) setBest("vof", score);
        resultScreen(container, "Verdadero o Falso", `<span class="game-result__big">${score}</span> aciertos en ${TIME}s`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("vof") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     3) MEMOTEST DE SIGLAS — emparejar sigla ↔ significado
     ============================================================ */
  const MEMO_PAIRS = [
    ["CPU", "Unidad Central de Proceso"], ["ALU", "Unidad Aritmético-Lógica"],
    ["RAM", "Memoria de acceso aleatorio"], ["ROM", "Memoria de solo lectura"],
    ["UC", "Unidad de Control"], ["ISA", "Arquitectura del conjunto de instrucciones"],
    ["RISC", "Conjunto de instrucciones reducido"], ["BCD", "Decimal codificado en binario"],
  ];
  function memo(container) {
    function start() {
      const cards = shuffle(MEMO_PAIRS.flatMap((p, idx) => [{ id: idx, txt: p[0] }, { id: idx, txt: p[1] }]));
      let flipped = [], moves = 0, matched = 0, lock = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Movimientos</span><span class="game-hud__val" id="g-moves">0</span></div>
         <div class="game-hud__item"><span class="game-hud__label">Pares</span><span class="game-hud__val"><span id="g-pairs">0</span>/${MEMO_PAIRS.length}</span></div>`);
      const elMoves = container.querySelector("#g-moves"), elPairs = container.querySelector("#g-pairs");
      body.innerHTML = `<div class="memo-grid" id="g-grid">${cards.map((c, k) =>
        `<button class="memo-card" data-k="${k}" data-id="${c.id}">
           <span class="memo-card__face memo-card__cover">?</span>
           <span class="memo-card__face memo-card__content">${c.txt}</span></button>`).join("")}</div>`;
      body.querySelector("#g-grid").addEventListener("click", e => {
        const card = e.target.closest(".memo-card"); if (!card || lock || card.classList.contains("is-matched") || card.classList.contains("is-flipped")) return;
        card.classList.add("is-flipped"); flipped.push(card);
        if (flipped.length === 2) {
          moves++; elMoves.textContent = moves; lock = true;
          const [a, b] = flipped;
          if (a.dataset.id === b.dataset.id) {
            after(() => { a.classList.add("is-matched"); b.classList.add("is-matched"); flipped = []; lock = false; matched++; elPairs.textContent = matched; if (matched === MEMO_PAIRS.length) finish(); }, 350);
          } else {
            after(() => { a.classList.remove("is-flipped"); b.classList.remove("is-flipped"); flipped = []; lock = false; }, 750);
          }
        }
      });
      function finish() {
        const best = getBest("memo"); const record = !best || moves < best.moves; if (record) setBest("memo", { moves });
        resultScreen(container, "Memotest de siglas", `Completado en <span class="game-result__big">${moves}</span> movimientos`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("memo").moves) + " movimientos").addEventListener("click", start);
      }
    }
    start();
  }

  /* ============================================================
     4) CONVERSIÓN BINARIA contrarreloj  (id: bits)
     ============================================================ */
  function bits(container) {
    const TIME = 45;
    function start() {
      let score = 0, timeLeft = TIME, answered = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="g-bar"></span></div></div>`);
      const elScore = container.querySelector("#g-score"), bar = container.querySelector("#g-bar");
      every(() => { timeLeft--; bar.style.width = (timeLeft / TIME * 100) + "%"; if (timeLeft <= 0) finish(); }, 1000);

      function makeQ() {
        const toDec = Math.random() < 0.5;
        const n = 1 + Math.floor(Math.random() * 254); // 1..254
        let prompt, correct;
        if (toDec) { prompt = n.toString(2); correct = n; }
        else { prompt = n.toString(); correct = n.toString(2); }
        const opts = new Set([correct]);
        let guard = 0;
        while (opts.size < 4 && guard++ < 50) {
          let d = n + (Math.floor(Math.random() * 11) - 5);
          if (d === n) d = n + 1;
          if (d > 0) opts.add(toDec ? d : d.toString(2));
        }
        return { toDec, prompt, correct, opts: shuffle([...opts]) };
      }
      function paint() {
        answered = false; const q = makeQ();
        body.innerHTML = `<p class="game-ask">${q.toDec ? "¿Qué número decimal es este binario?" : "¿Cuál es el binario de este decimal?"}</p>
          <div class="ipow-q">${q.prompt}${q.toDec ? "₂" : ""}</div>
          <div class="ipow-opts" id="g-opts">${q.opts.map(o => `<button class="btn ipow-opt" data-v="${o}">${o}${q.toDec ? "" : "₂"}</button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>`;
        const fb = container.querySelector("#g-fb");
        body.querySelector("#g-opts").addEventListener("click", e => {
          const b = e.target.closest(".ipow-opt"); if (!b || answered) return; answered = true;
          if (String(b.dataset.v) === String(q.correct)) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "✔ Correcto"; }
          else { fb.className = "game-feedback no show"; fb.innerHTML = "✘ Era <strong>" + q.correct + (q.toDec ? "" : "₂") + "</strong>"; }
          after(() => { if (timeLeft > 0) paint(); }, 650);
        });
      }
      function finish() {
        stopAll(); const best = getBest("bits") || 0, record = score > best; if (record) setBest("bits", score);
        resultScreen(container, "Conversión binaria", `<span class="game-result__big">${score}</span> aciertos en ${TIME}s`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("bits") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     5) COMPUERTAS LÓGICAS  (id: gates)
     ============================================================ */
  const GATES = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: (a) => a ? 0 : 1,
    NAND: (a, b) => (a & b) ? 0 : 1,
    NOR: (a, b) => (a | b) ? 0 : 1,
    XOR: (a, b) => a ^ b,
  };
  const GATE_NAMES = Object.keys(GATES);
  function gates(container) {
    function start() {
      let score = 0, lives = 3, answered = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item"><span class="game-hud__label">Vidas</span><span class="game-hud__val" id="g-lives">●●●</span></div>`);
      const elScore = container.querySelector("#g-score"), elLives = container.querySelector("#g-lives");

      function makeQ() {
        const name = GATE_NAMES[Math.floor(Math.random() * GATE_NAMES.length)];
        const a = Math.round(Math.random()), b = Math.round(Math.random());
        const correct = name === "NOT" ? GATES.NOT(a) : GATES[name](a, b);
        const inputs = name === "NOT" ? `A=${a}` : `A=${a}, B=${b}`;
        return { name, inputs, correct };
      }
      function paint() {
        answered = false; const q = makeQ();
        body.innerHTML = `<p class="game-ask">Compuerta <strong>${q.name}</strong> con entradas ${q.inputs}. ¿Cuál es la salida?</p>
          <div class="classify-number">${q.name}</div>
          <div class="ipow-opts" id="g-opts">
            <button class="btn ipow-opt" data-v="0">0</button>
            <button class="btn ipow-opt" data-v="1">1</button>
          </div>
          <div class="game-feedback" id="g-fb"></div>
          <div class="btn-row" id="g-nav" style="justify-content:center"></div>`;
        const fb = container.querySelector("#g-fb"), nav = container.querySelector("#g-nav");
        body.querySelector("#g-opts").addEventListener("click", e => {
          const b = e.target.closest(".ipow-opt"); if (!b || answered) return; answered = true;
          body.querySelectorAll(".ipow-opt").forEach(el => {
            el.disabled = true;
            if (Number(el.dataset.v) === q.correct) el.classList.add("correct");
            else if (el === b) el.classList.add("wrong");
          });
          if (Number(b.dataset.v) === q.correct) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "✔ Correcto: la salida es <strong>" + q.correct + "</strong>."; }
          else { lives--; elLives.textContent = "●".repeat(Math.max(0, lives)) + "○".repeat(3 - Math.max(0, lives)); fb.className = "game-feedback no show"; fb.innerHTML = "✘ La salida era <strong>" + q.correct + "</strong>."; }
          nav.innerHTML = `<button class="btn btn--primary" id="g-next">${lives <= 0 ? "Ver resultado →" : "Siguiente →"}</button>`;
          nav.querySelector("#g-next").addEventListener("click", () => lives <= 0 ? finish() : paint());
        });
      }
      function finish() {
        const best = getBest("gates") || 0, record = score > best; if (record) setBest("gates", score);
        resultScreen(container, "Compuertas lógicas", `<span class="game-result__big">${score}</span> aciertos`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("gates") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     6) ORDENÁ LA SECUENCIA  (id: order)
     ============================================================ */
  const CHAINS = [
    { label: "Ciclo de instrucción", items: ["Búsqueda (Fetch)", "Decodificación", "Búsqueda de operandos", "Ejecución", "Almacenamiento"] },
    { label: "Jerarquía de memoria (de + rápida a + lenta)", items: ["Registros", "Caché", "RAM", "Disco"] },
    { label: "Máquina multinivel (de arriba hacia abajo)", items: ["Lenguaje de alto nivel", "Lenguaje ensamblador", "Lenguaje máquina", "Microarquitectura", "Lógica digital"] },
    { label: "Estados de un proceso", items: ["Nuevo", "Listo", "En ejecución", "Bloqueado", "Terminado"] },
    { label: "Suma binaria de un programa en ensamblador", items: ["MOV AX, dato", "ADD AX, dato2", "MOV resultado, AX", "INT 21h"] },
    { label: "Compilación de un programa", items: ["Código fuente", "Compilador", "Ensamblador", "Enlazador", "Ejecutable"] },
  ];
  function order(container) {
    function start() {
      const deck = shuffle(CHAINS); let qi = 0, score = 0;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Resueltos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item"><span class="game-hud__label">N°</span><span class="game-hud__val"><span id="g-i">1</span>/${deck.length}</span></div>`);
      const elScore = container.querySelector("#g-score"), elI = container.querySelector("#g-i");
      function paint() {
        const puz = deck[qi]; elI.textContent = qi + 1;
        const pool = shuffle(puz.items.map((t, idx) => ({ t, idx })));
        let next = 0;
        body.innerHTML = `<p class="game-ask">${puz.label}</p>
          <div class="chain-slots" id="g-slots">${puz.items.map((_, k) => `<span class="chain-slot" data-pos="${k}">${k + 1}</span>`).join('<span class="chain-arrow">→</span>')}</div>
          <div class="chain-pool" id="g-pool">${pool.map(p => `<button class="chain-chip" data-idx="${p.idx}">${p.t}</button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>`;
        const slots = body.querySelectorAll(".chain-slot"), fb = container.querySelector("#g-fb");
        body.querySelector("#g-pool").addEventListener("click", e => {
          const b = e.target.closest(".chain-chip"); if (!b) return;
          if (+b.dataset.idx === next) {
            slots[next].textContent = puz.items[next]; slots[next].classList.add("filled");
            b.disabled = true; b.style.visibility = "hidden"; next++;
            if (next === puz.items.length) {
              score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "✔ ¡Secuencia correcta!";
              after(() => { if (qi < deck.length - 1) { qi++; paint(); } else finish(); }, 900);
            }
          } else { b.classList.add("shake"); after(() => b.classList.remove("shake"), 400); }
        });
      }
      function finish() {
        const best = getBest("order") || 0, record = score > best; if (record) setBest("order", score);
        resultScreen(container, "Ordená la secuencia", `<span class="game-result__big">${score}</span> de ${deck.length} resueltas`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("order") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     7) AHORCADO TÉCNICO  (id: hangman)
     ============================================================ */
  const WORDS = [
    { w: "BINARIO", h: "Sistema de numeración de base 2." },
    { w: "ENSAMBLADOR", h: "Lenguaje de bajo nivel cercano al hardware." },
    { w: "PAGINACION", h: "Divide la memoria en páginas y marcos." },
    { w: "MULTINUCLEO", h: "Procesador con varios núcleos." },
    { w: "SEMAFORO", h: "Sincroniza procesos con wait y signal." },
    { w: "KERNEL", h: "Núcleo del sistema operativo." },
    { w: "REGISTRO", h: "Memoria interna muy rápida de la CPU." },
    { w: "COMPUERTA", h: "Elemento básico de los circuitos lógicos." },
    { w: "INTERRUPCION", h: "Señal que avisa un evento a la CPU." },
    { w: "HEXADECIMAL", h: "Sistema de numeración de base 16." },
    { w: "PIPELINE", h: "Segmentación que solapa etapas de instrucciones." },
    { w: "BOOLEANA", h: "Álgebra de la lógica digital." },
  ];
  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  function hangSVG(miss) {
    const parts = [
      '<line x1="10" y1="100" x2="70" y2="100"/>', '<line x1="30" y1="100" x2="30" y2="10"/>',
      '<line x1="30" y1="10" x2="80" y2="10"/>', '<line x1="80" y1="10" x2="80" y2="25"/>',
      '<circle cx="80" cy="33" r="8"/>', '<line x1="80" y1="41" x2="80" y2="65"/>',
      '<line x1="80" y1="48" x2="68" y2="58"/>', '<line x1="80" y1="48" x2="92" y2="58"/>',
      '<line x1="80" y1="65" x2="70" y2="80"/>', '<line x1="80" y1="65" x2="90" y2="80"/>',
    ];
    return `<svg class="hang-svg" viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${parts.slice(0, 4 + miss).join("")}</svg>`;
  }
  function hangman(container) {
    function start() {
      let solved = 0, pool = shuffle(WORDS);
      function play(idx) {
        const item = pool[idx % pool.length]; const word = item.w;
        let miss = 0; const guessed = new Set(); const MAXMISS = 6;
        const body = shell(container,
          `<div class="game-hud__item"><span class="game-hud__label">Resueltas</span><span class="game-hud__val" id="g-solved">${solved}</span></div>
           <div class="game-hud__item"><span class="game-hud__label">Errores</span><span class="game-hud__val" id="g-miss">0/${MAXMISS}</span></div>`);
        function paint() {
          body.innerHTML = `
            <div class="hang-top">${hangSVG(miss)}<div class="hang-hint">💡 ${item.h}</div></div>
            <div class="hang-word">${word.split("").map(c => `<span class="hang-letter">${guessed.has(c) ? c : ""}</span>`).join("")}</div>
            <div class="hang-keys" id="g-keys">${ALPHA.map(l => `<button class="hang-key" data-l="${l}" ${guessed.has(l) ? "disabled" : ""}>${l}</button>`).join("")}</div>
            <div class="game-feedback" id="g-fb"></div>`;
          container.querySelector("#g-miss").textContent = miss + "/" + MAXMISS;
          body.querySelector("#g-keys").addEventListener("click", e => {
            const b = e.target.closest(".hang-key"); if (!b || b.disabled) return;
            const l = b.dataset.l; guessed.add(l);
            if (word.includes(l)) { b.classList.add("hit"); } else { b.classList.add("miss"); miss++; }
            b.disabled = true;
            const won = word.split("").every(c => guessed.has(c));
            container.querySelector("#g-miss").textContent = miss + "/" + MAXMISS;
            if (won) { solved++; container.querySelector("#g-solved").textContent = solved; const fb = container.querySelector("#g-fb"); fb.className = "game-feedback ok show"; fb.innerHTML = "✔ ¡" + word + "!"; after(() => play(idx + 1), 1100); }
            else if (miss >= MAXMISS) { const fb = container.querySelector("#g-fb"); fb.className = "game-feedback no show"; fb.innerHTML = "✘ Era <strong>" + word + "</strong>"; after(finish, 1400); }
            else paint();
          });
        }
        paint();
      }
      function finish() {
        const best = getBest("hangman") || 0, record = solved > best; if (record) setBest("hangman", solved);
        resultScreen(container, "Ahorcado técnico", `<span class="game-result__big">${solved}</span> palabras resueltas`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("hangman") || 0)).addEventListener("click", start);
      }
      play(0);
    }
    start();
  }

  /* ============================================================
     8) CONECTÁ  (id: connect)
     ============================================================ */
  const CONNECT_SETS = [
    [["CPU", "Unidad Central de Proceso"], ["ALU", "Hace operaciones aritméticas y lógicas"], ["RAM", "Memoria volátil de acceso aleatorio"], ["Complemento a 2", "Representa enteros con signo"], ["NAND", "Compuerta universal"]],
    [["Karnaugh", "Simplifica funciones booleanas"], ["Pipeline", "Solapa etapas de instrucciones"], ["RISC", "Conjunto de instrucciones reducido"], ["Semáforo", "Sincroniza procesos"], ["GPL", "Licencia copyleft del software libre"]],
    [["IEEE 754", "Estándar de punto flotante"], ["ROM", "Memoria de solo lectura"], ["Registro PC", "Apunta a la próxima instrucción"], ["Multiplexor", "Selecciona una de varias entradas"], ["Kernel", "Núcleo del sistema operativo"]],
  ];
  function connect(container) {
    function start() {
      const set = CONNECT_SETS[Math.floor(Math.random() * CONNECT_SETS.length)];
      const left = shuffle(set.map((p, i) => ({ i, t: p[0] })));
      const right = shuffle(set.map((p, i) => ({ i, t: p[1] })));
      let sel = null, matched = 0, mistakes = 0;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Pares</span><span class="game-hud__val"><span id="g-m">0</span>/${set.length}</span></div>
         <div class="game-hud__item"><span class="game-hud__label">Errores</span><span class="game-hud__val" id="g-err">0</span></div>`);
      body.innerHTML = `<p class="game-ask">Tocá un término y luego su definición.</p>
        <div class="connect-cols">
          <div class="connect-col">${left.map(x => `<button class="connect-item" data-side="L" data-i="${x.i}">${x.t}</button>`).join("")}</div>
          <div class="connect-col">${right.map(x => `<button class="connect-item" data-side="R" data-i="${x.i}">${x.t}</button>`).join("")}</div>
        </div>`;
      const elM = container.querySelector("#g-m"), elErr = container.querySelector("#g-err");
      body.addEventListener("click", e => {
        const b = e.target.closest(".connect-item"); if (!b || b.classList.contains("matched")) return;
        if (!sel) { sel = b; b.classList.add("sel"); return; }
        if (sel === b) { sel.classList.remove("sel"); sel = null; return; }
        if (sel.dataset.side === b.dataset.side) { sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
        if (sel.dataset.i === b.dataset.i) {
          sel.classList.remove("sel"); sel.classList.add("matched"); b.classList.add("matched"); sel = null;
          matched++; elM.textContent = matched; if (matched === set.length) finish();
        } else {
          mistakes++; elErr.textContent = mistakes; const a = sel; a.classList.add("bad"); b.classList.add("bad");
          after(() => { a.classList.remove("bad", "sel"); b.classList.remove("bad"); }, 500); sel = null;
        }
      });
      function finish() {
        const best = getBest("connect"); const record = !best || mistakes < best.mistakes; if (record) setBest("connect", { mistakes });
        resultScreen(container, "Conectá", `Completado con <span class="game-result__big">${mistakes}</span> errores`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + getBest("connect").mistakes + " errores").addEventListener("click", start);
      }
    }
    start();
  }

  /* ---------------- export ---------------- */
  window.Games = { classify, vof, memo, bits, gates, order, hangman, connect, stopAll, getBest };
})();
