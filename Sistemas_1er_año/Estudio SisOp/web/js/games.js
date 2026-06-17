/* ============================================================
   JUEGOS DE APRENDIZAJE — Sistemas Operativos
   1) Clasificá el concepto      6) Ahorcado de SO
   2) Verdadero o Falso          7) Conectá conceptos
   3) Memotest de SO             8) ¿Cuál se ejecuta? (planificador)
   4) Conversión binaria
   5) Ordená la secuencia
   Cada juego guarda su mejor marca en localStorage.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- utilidades ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function fmtTime(s) { const m = Math.floor(s / 60), r = s % 60; return m + ":" + String(r).padStart(2, "0"); }

  let intervals = [], timeouts = [];
  function every(fn, ms) { const id = setInterval(fn, ms); intervals.push(id); return id; }
  function after(fn, ms) { const id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function stopAll() { intervals.forEach(clearInterval); timeouts.forEach(clearTimeout); intervals = []; timeouts = []; }

  const GKEY = "estudioSO.games.v1";
  function loadG() { try { return JSON.parse(localStorage.getItem(GKEY)) || {}; } catch { return {}; } }
  function saveG(o) { try { localStorage.setItem(GKEY, JSON.stringify(o)); } catch { } }
  function getBest(id) { return loadG()[id]; }
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
     1) CLASIFICÁ EL CONCEPTO — ¿a qué subsistema pertenece?
     ============================================================ */
  const AREAS = [
    { k: "proc", name: "Procesos" },
    { k: "mem", name: "Memoria" },
    { k: "arch", name: "Archivos" },
    { k: "es", name: "E/S" },
  ];
  const CONCEPTS = [
    { t: "Round Robin", k: "proc", why: "Algoritmo de planificación de CPU." },
    { t: "PCB", k: "proc", why: "Bloque de Control de Proceso." },
    { t: "Semáforo", k: "proc", why: "Sincronización entre procesos." },
    { t: "Quantum", k: "proc", why: "Porción de tiempo de Round Robin." },
    { t: "Cambio de contexto", k: "proc", why: "Cambio de un proceso a otro en la CPU." },
    { t: "Interbloqueo (deadlock)", k: "proc", why: "Procesos bloqueados mutuamente." },
    { t: "Algoritmo de Peterson", k: "proc", why: "Solución a la sección crítica." },
    { t: "Paginación", k: "mem", why: "Páginas y marcos de igual tamaño." },
    { t: "Segmentación", k: "mem", why: "Divide la memoria en segmentos." },
    { t: "Fragmentación externa", k: "mem", why: "Huecos libres no contiguos en memoria." },
    { t: "MMU", k: "mem", why: "Traduce direcciones lógicas a físicas." },
    { t: "Tabla de páginas", k: "mem", why: "Mapea páginas a marcos." },
    { t: "Memoria virtual", k: "mem", why: "Espacio mayor que la RAM usando disco." },
    { t: "inodo", k: "arch", why: "Guarda los metadatos de un archivo en Linux." },
    { t: "NTFS", k: "arch", why: "Sistema de archivos de Windows." },
    { t: "FAT32", k: "arch", why: "Sistema de archivos (límite de 4 GB)." },
    { t: "Asignación contigua", k: "arch", why: "Bloques consecutivos en disco." },
    { t: "Journaling", k: "arch", why: "Registro para recuperar el sistema de archivos." },
    { t: "DMA", k: "es", why: "Transferencia a memoria sin la CPU." },
    { t: "Spooling", k: "es", why: "Cola de trabajos (impresión)." },
    { t: "Polling", k: "es", why: "La CPU consulta el estado del dispositivo." },
    { t: "Driver / controlador", k: "es", why: "Software puente con el dispositivo." },
    { t: "SSTF", k: "es", why: "Planificación de disco (pista más cercana)." },
    { t: "Buffer", k: "es", why: "Memoria temporal entre CPU y dispositivo." },
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
          `<p class="game-ask">¿A qué subsistema del SO pertenece este concepto?</p>
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
          if (lives <= 0) { nav.innerHTML = `<button class="btn btn--primary" id="g-next">Ver resultado →</button>`; }
          else if (i < deck.length - 1) nav.innerHTML = `<button class="btn btn--primary" id="g-next">Siguiente →</button>`;
          else nav.innerHTML = `<button class="btn btn--primary" id="g-next">Ver resultado →</button>`;
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
    { s: "Un proceso es un programa en ejecución.", v: true },
    { s: "FCFS es un algoritmo de planificación apropiativo.", v: false, e: "FCFS es NO apropiativo." },
    { s: "En paginación, páginas y marcos tienen el mismo tamaño.", v: true },
    { s: "El DMA libera a la CPU de transferir cada dato.", v: true },
    { s: "El polling es más eficiente que las interrupciones.", v: false, e: "Las interrupciones son más eficientes." },
    { s: "RAID 0 ofrece redundancia de datos.", v: false, e: "RAID 0 (striping) no tiene redundancia." },
    { s: "RAID 1 es un espejo (mirroring).", v: true },
    { s: "SJF minimiza el tiempo de espera promedio.", v: true },
    { s: "El kernel de Linux es un microkernel puro.", v: false, e: "Es monolítico modular." },
    { s: "Un hipervisor Tipo 1 corre sobre un SO anfitrión.", v: false, e: "El Tipo 2 corre sobre un SO host; el Tipo 1 es bare-metal." },
    { s: "El spooling se usa típicamente para la cola de impresión.", v: true },
    { s: "La fragmentación interna son huecos libres no contiguos.", v: false, e: "Eso es la externa; la interna se desperdicia dentro del bloque." },
    { s: "LRU reemplaza la página menos usada recientemente.", v: true },
    { s: "Un semáforo binario también se llama mutex.", v: true },
    { s: "El PCB guarda el estado de un proceso.", v: true },
    { s: "SSTF nunca produce inanición.", v: false, e: "SSTF puede causar inanición de pistas lejanas." },
    { s: "NTFS tiene journaling.", v: true },
    { s: "FAT32 admite archivos de más de 4 GB.", v: false, e: "FAT32 tiene un límite de 4 GB por archivo." },
    { s: "La MMU traduce direcciones lógicas a físicas.", v: true },
    { s: "Round Robin usa un quantum de tiempo.", v: true },
    { s: "En el productor-consumidor, el semáforo full inicia en N.", v: false, e: "full inicia en 0; empty inicia en N." },
    { s: "Un proceso bloqueado está usando la CPU.", v: false, e: "Bloqueado = esperando un evento, no usa la CPU." },
  ];
  function vof(container) {
    const TIME = 45;
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
     3) MEMOTEST DE SO — emparejar término ↔ significado
     ============================================================ */
  const MEMO_PAIRS = [
    ["ps", "lista procesos"], ["kill", "termina un proceso"], ["PCB", "estado del proceso"],
    ["DMA", "E/S sin la CPU"], ["MMU", "traduce direcciones"], ["mutex", "exclusión mutua"],
    ["FIFO", "reemplaza la + antigua"], ["SSTF", "pista más cercana"],
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
        resultScreen(container, "Memotest de SO", `Completado en <span class="game-result__big">${moves}</span> movimientos`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("memo").moves) + " movimientos").addEventListener("click", start);
      }
    }
    start();
  }

  /* ============================================================
     4) CONVERSIÓN BINARIA contrarreloj
     ============================================================ */
  function binconv(container) {
    const TIME = 40;
    function start() {
      let score = 0, timeLeft = TIME, answered = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="g-bar"></span></div></div>`);
      const elScore = container.querySelector("#g-score"), bar = container.querySelector("#g-bar");
      every(() => { timeLeft--; bar.style.width = (timeLeft / TIME * 100) + "%"; if (timeLeft <= 0) finish(); }, 1000);

      function makeQ() {
        const toDec = Math.random() < 0.5;
        const n = 1 + Math.floor(Math.random() * 62); // 1..62
        let prompt, correct, fmt;
        if (toDec) { prompt = n.toString(2); correct = n; fmt = v => v.toString(); }
        else { prompt = n.toString(); correct = n.toString(2); fmt = v => v.toString(2); }
        const opts = new Set([correct]);
        while (opts.size < 4) {
          const d = n + (Math.floor(Math.random() * 9) - 4) || n + 1;
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
          else { fb.className = "game-feedback no show"; fb.innerHTML = "✘ Era <strong>" + q.correct + "</strong>"; }
          after(() => { if (timeLeft > 0) paint(); }, 650);
        });
      }
      function finish() {
        stopAll(); const best = getBest("binconv") || 0, record = score > best; if (record) setBest("binconv", score);
        resultScreen(container, "Conversión binaria", `<span class="game-result__big">${score}</span> aciertos en ${TIME}s`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("binconv") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     5) ORDENÁ LA SECUENCIA
     ============================================================ */
  const CHAINS = [
    { label: "Ciclo de vida de un proceso", items: ["Nuevo", "Listo", "En ejecución", "Terminado"] },
    { label: "Jerarquía de memoria (de + rápida a + lenta)", items: ["Registros", "Caché", "RAM", "Disco"] },
    { label: "Generaciones de SO (cronológico)", items: ["Tubos al vacío", "Transistores", "Circuitos integrados", "Microprocesador"] },
    { label: "Del software al hardware", items: ["Aplicación", "Sistema operativo", "Kernel", "Hardware"] },
    { label: "Productor: orden de operaciones", items: ["wait(empty)", "wait(mutex)", "insertar", "signal(mutex)", "signal(full)"] },
  ];
  function chain(container) {
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
        const best = getBest("chain") || 0, record = score > best; if (record) setBest("chain", score);
        resultScreen(container, "Ordená la secuencia", `<span class="game-result__big">${score}</span> de ${deck.length} resueltas`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("chain") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ============================================================
     6) AHORCADO DE SO
     ============================================================ */
  const WORDS = [
    { w: "PROCESO", h: "Programa en ejecución." },
    { w: "KERNEL", h: "Núcleo del sistema operativo." },
    { w: "SEMAFORO", h: "Sincroniza procesos con wait y signal." },
    { w: "PAGINACION", h: "Divide la memoria en páginas y marcos." },
    { w: "INTERRUPCION", h: "Señal que avisa a la CPU de un evento." },
    { w: "DEADLOCK", h: "Interbloqueo de procesos." },
    { w: "BUFFER", h: "Memoria temporal para E/S." },
    { w: "DRIVER", h: "Controlador de un dispositivo." },
    { w: "QUANTUM", h: "Porción de tiempo en Round Robin." },
    { w: "MUTEX", h: "Garantiza la exclusión mutua." },
    { w: "VIRTUAL", h: "Tipo de memoria que usa el disco como extensión." },
    { w: "PLANIFICADOR", h: "Decide qué proceso usa la CPU." },
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
        resultScreen(container, "Ahorcado de SO", `<span class="game-result__big">${solved}</span> palabras resueltas`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("hangman") || 0)).addEventListener("click", start);
      }
      play(0);
    }
    start();
  }

  /* ============================================================
     7) CONECTÁ CONCEPTOS
     ============================================================ */
  const CONNECT_SETS = [
    [["FCFS", "Primero en llegar, primero en ejecutar"], ["DMA", "Transfiere a memoria sin la CPU"], ["Paginación", "Páginas y marcos del mismo tamaño"], ["RAID 1", "Espejo (mirroring)"], ["Semáforo", "Sincroniza con wait/signal"]],
    [["SJF", "Primero el trabajo más corto"], ["MMU", "Traduce direcciones lógicas a físicas"], ["NTFS", "Sistema de archivos de Windows"], ["SSTF", "Atiende la pista más cercana"], ["Mutex", "Exclusión mutua de 2 procesos"]],
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
        resultScreen(container, "Conectá conceptos", `Completado con <span class="game-result__big">${mistakes}</span> errores`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + getBest("connect").mistakes + " errores").addEventListener("click", start);
      }
    }
    start();
  }

  /* ============================================================
     8) ¿CUÁL SE EJECUTA? — intuición de planificación
     ============================================================ */
  function sched(container) {
    const ALGOS = [
      { k: "fcfs", name: "FCFS", ask: "¿Cuál se ejecuta primero?" },
      { k: "sjf", name: "SJF", ask: "¿Cuál se ejecuta primero?" },
      { k: "prio", name: "Prioridades (menor nº = mayor prioridad)", ask: "¿Cuál se ejecuta primero?" },
    ];
    function start() {
      let score = 0, lives = 3, answered = false;
      const body = shell(container,
        `<div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="g-score">0</span></div>
         <div class="game-hud__item"><span class="game-hud__label">Vidas</span><span class="game-hud__val" id="g-lives">●●●</span></div>`);
      const elScore = container.querySelector("#g-score"), elLives = container.querySelector("#g-lives");

      function makeQ() {
        const n = 3 + Math.floor(Math.random() * 2); // 3 o 4
        const names = ["A", "B", "C", "D"].slice(0, n);
        const procs = names.map(nm => ({ name: nm, arrival: Math.floor(Math.random() * 4), burst: 1 + Math.floor(Math.random() * 9), priority: 1 + Math.floor(Math.random() * 4) }));
        const algo = ALGOS[Math.floor(Math.random() * ALGOS.length)];
        const minArr = Math.min(...procs.map(p => p.arrival));
        const avail = procs.filter(p => p.arrival === minArr);
        let winner;
        if (algo.k === "fcfs") winner = avail[0];
        else if (algo.k === "sjf") winner = avail.slice().sort((a, b) => a.burst - b.burst || a.name.localeCompare(b.name))[0];
        else winner = avail.slice().sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name))[0];
        return { procs, algo, winner };
      }
      function paint() {
        answered = false; const q = makeQ();
        body.innerHTML = `
          <p class="game-ask">Algoritmo: <strong>${q.algo.name}</strong> — ${q.algo.ask}</p>
          <div class="tbl-wrap sched-table"><table class="tbl" style="max-width:420px">
            <thead><tr><th>Proc</th><th>Llegada</th><th>Ráfaga</th><th>Prioridad</th></tr></thead>
            <tbody>${q.procs.map(p => `<tr><td><strong>${p.name}</strong></td><td>${p.arrival}</td><td>${p.burst}</td><td>${p.priority}</td></tr>`).join("")}</tbody>
          </table></div>
          <div class="sched-opts" id="g-opts">${q.procs.map(p => `<button class="btn sched-opt" data-n="${p.name}">${p.name}</button>`).join("")}</div>
          <div class="game-feedback" id="g-fb"></div>
          <div class="btn-row" id="g-nav" style="justify-content:center"></div>`;
        const fb = container.querySelector("#g-fb"), nav = container.querySelector("#g-nav");
        body.querySelector("#g-opts").addEventListener("click", e => {
          const b = e.target.closest(".sched-opt"); if (!b || answered) return; answered = true;
          body.querySelectorAll(".sched-opt").forEach(el => {
            el.disabled = true;
            if (el.dataset.n === q.winner.name) el.classList.add("correct");
            else if (el === b) el.classList.add("wrong");
          });
          const minArr = Math.min(...q.procs.map(p => p.arrival));
          if (b.dataset.n === q.winner.name) { score++; elScore.textContent = score; fb.className = "game-feedback ok show"; fb.innerHTML = "✔ Correcto: se ejecuta <strong>" + q.winner.name + "</strong>."; }
          else { lives--; elLives.textContent = "●".repeat(Math.max(0, lives)) + "○".repeat(3 - Math.max(0, lives)); fb.className = "game-feedback no show"; fb.innerHTML = "✘ Era <strong>" + q.winner.name + "</strong> (entre los que llegaron en t=" + minArr + ")."; }
          nav.innerHTML = `<button class="btn btn--primary" id="g-next">${lives <= 0 ? "Ver resultado →" : "Siguiente →"}</button>`;
          nav.querySelector("#g-next").addEventListener("click", () => lives <= 0 ? finish() : paint());
        });
      }
      function finish() {
        const best = getBest("sched") || 0, record = score > best; if (record) setBest("sched", score);
        resultScreen(container, "¿Cuál se ejecuta?", `<span class="game-result__big">${score}</span> aciertos`,
          record ? "¡Nuevo récord! 🏆" : "Tu mejor marca: " + (getBest("sched") || 0)).addEventListener("click", start);
      }
      paint();
    }
    start();
  }

  /* ---------------- export ---------------- */
  window.Games = { classify, vof, memo, binconv, chain, hangman, connect, sched, stopAll, getBest };
})();
