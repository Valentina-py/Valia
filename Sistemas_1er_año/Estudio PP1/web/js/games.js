/* ============================================================
   JUEGOS DE APRENDIZAJE — PP1
   window.Games = { stopAll, getBest, classify, vof, memo, hangman, connect, spot, order }
   Cada juego recibe el elemento contenedor donde montarse.
   Las mejores marcas se guardan en localStorage.
   ============================================================ */
(function () {
  "use strict";
  const G = {};
  window.Games = G;

  /* ---------------- Mejores marcas ---------------- */
  const STORE = "estudioPP1.games.v1";
  const LOWER_IS_BETTER = new Set(["memo", "connect"]); // métricas donde menos es mejor
  function loadBest() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; } }
  function saveBest(o) { localStorage.setItem(STORE, JSON.stringify(o)); }
  let BEST = loadBest();

  G.getBest = function (id) { return id in BEST ? BEST[id] : null; };
  function metric(v) { return typeof v === "number" ? v : (v && (v.moves ?? v.mistakes ?? v.score)) ?? 0; }
  function record(id, value) {
    const prev = BEST[id];
    if (prev == null) { BEST[id] = value; saveBest(BEST); return; }
    const a = metric(value), b = metric(prev);
    const better = LOWER_IS_BETTER.has(id) ? a < b : a > b;
    if (better) { BEST[id] = value; saveBest(BEST); }
  }

  /* ---------------- Timers (se limpian al navegar) ---------------- */
  let interval = null;
  let timeouts = [];
  function setT(fn, ms) { const t = setTimeout(fn, ms); timeouts.push(t); return t; }
  G.stopAll = function () {
    if (interval) { clearInterval(interval); interval = null; }
    timeouts.forEach(clearTimeout); timeouts = [];
  };

  /* ---------------- Utilidades ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function result(mount, html, onRetry) {
    mount.innerHTML = `<div class="game center">${html}
      <div class="btn-row" style="justify-content:center;margin-top:18px">
        <button class="btn btn--primary" id="grRetry">↺ Jugar de nuevo</button>
        <a class="btn" href="#/games">Otros juegos</a>
      </div></div>`;
    mount.querySelector("#grRetry").addEventListener("click", onRetry);
  }
  function timerBar(secs, onTick, onEnd) {
    let left = secs;
    interval = setInterval(() => {
      left--;
      onTick(left);
      if (left <= 0) { clearInterval(interval); interval = null; onEnd(); }
    }, 1000);
    return () => left;
  }

  /* ============================================================
     1) CLASIFICÁ EL DISPOSITIVO
     ============================================================ */
  const DEVICES = [
    { n: "Teclado", e: "⌨️", cat: "Entrada" },
    { n: "Mouse", e: "🖱️", cat: "Entrada" },
    { n: "Micrófono", e: "🎤", cat: "Entrada" },
    { n: "Cámara web", e: "📷", cat: "Entrada" },
    { n: "Escáner", e: "🖨️", cat: "Entrada" },
    { n: "Monitor", e: "🖥️", cat: "Salida" },
    { n: "Impresora", e: "🖨️", cat: "Salida" },
    { n: "Parlantes", e: "🔊", cat: "Salida" },
    { n: "Proyector", e: "📽️", cat: "Salida" },
    { n: "Disco rígido", e: "💽", cat: "Almacenamiento" },
    { n: "Pendrive", e: "💾", cat: "Almacenamiento" },
    { n: "DVD", e: "📀", cat: "Almacenamiento" },
    { n: "Tarjeta SD", e: "🗃️", cat: "Almacenamiento" },
    { n: "Placa de red", e: "🌐", cat: "Conectividad" },
    { n: "Módem", e: "📶", cat: "Conectividad" },
    { n: "Adaptador Wi-Fi", e: "📡", cat: "Conectividad" },
    { n: "Bluetooth", e: "🔵", cat: "Conectividad" },
  ];
  const CATS = ["Entrada", "Salida", "Almacenamiento", "Conectividad"];

  G.classify = function (mount) {
    let queue = shuffle(DEVICES), i = 0, score = 0, answered = false;
    function paint() {
      if (i >= queue.length) return finish();
      const d = queue[i]; answered = false;
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="cScore">${score}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Dispositivo</span><span class="game-hud__val">${i + 1}/${queue.length}</span></div>
          </div>
          <div class="game-ask">¿Qué tipo de dispositivo es?</div>
          <div class="classify-number"><span class="emoji">${d.e}</span>${d.n}</div>
          <div class="classify-sets" id="cSets">
            ${CATS.map(c => `<button class="classify-set" data-c="${c}"><span class="classify-set__name">${c}</span></button>`).join("")}
          </div>
          <div class="game-feedback" id="cFb"></div>
        </div>`;
      mount.querySelector("#cSets").addEventListener("click", e => {
        const b = e.target.closest(".classify-set"); if (!b || answered) return;
        answered = true;
        const ok = b.dataset.c === d.cat;
        const fb = mount.querySelector("#cFb");
        mount.querySelectorAll(".classify-set").forEach(s => {
          s.disabled = true;
          if (s.dataset.c === d.cat) s.classList.add("correct");
          else if (s === b) s.classList.add("wrong");
        });
        if (ok) { score++; mount.querySelector("#cScore").textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Correcto!"; }
        else { fb.className = "game-feedback no show"; fb.textContent = `Es de ${d.cat}.`; }
        setT(() => { i++; paint(); }, 850);
      });
    }
    function finish() {
      record("classify", score);
      result(mount, `<div class="game-result__title">¡Terminaste!</div>
        <span class="game-result__big">${score}/${queue.length}</span>
        <div class="game-result__best">Mejor marca: ${G.getBest("classify")} aciertos</div>`,
        () => { queue = shuffle(DEVICES); i = 0; score = 0; paint(); });
    }
    paint();
  };

  /* ============================================================
     2) VERDADERO O FALSO (contrarreloj)
     ============================================================ */
  const VOF = [
    { t: "La memoria RAM es volátil: se borra al apagar la PC.", v: true },
    { t: "La memoria ROM se borra al apagar la computadora.", v: false, x: "La ROM es no volátil." },
    { t: "El software es la parte física de la computadora.", v: false, x: "Eso es el hardware." },
    { t: "La CPU interpreta y ejecuta las instrucciones.", v: true },
    { t: "Un teclado es un periférico de salida.", v: false, x: "Es de entrada." },
    { t: "La fuente convierte corriente alterna en continua.", v: true },
    { t: "El humanware son los programas instalados.", v: false, x: "Es la dimensión humana." },
    { t: "Linux es un software propietario y cerrado.", v: false, x: "Es libre y de código abierto." },
    { t: "El mantenimiento preventivo se hace antes de la falla.", v: true },
    { t: "La pulsera antiestática protege los componentes.", v: true },
    { t: "USB significa Bus Universal en Serie.", v: true },
    { t: "Una cotización obliga al cliente a pagar.", v: false, x: "Puede aceptarla, modificarla o rechazarla." },
    { t: "La DDR4 es la memoria RAM más usada hoy.", v: true },
    { t: "El disco duro es más rápido que la RAM.", v: false, x: "La RAM es mucho más rápida." },
    { t: "El doble booteo permite tener dos sistemas operativos.", v: true },
    { t: "El sistema operativo es un software de aplicación.", v: false, x: "Es software de sistema." },
    { t: "Comprimir un archivo reduce su tamaño.", v: true },
    { t: "Hacer copias de seguridad previene la pérdida de datos.", v: true },
  ];

  G.vof = function (mount) {
    let queue, i, score, answered, getLeft;
    function start() {
      queue = shuffle(VOF); i = 0; score = 0; answered = false;
      paint();
      getLeft = timerBar(45,
        l => { const el = mount.querySelector("#vTime"); if (el) el.style.width = (l / 45 * 100) + "%"; },
        finish);
    }
    function paint() {
      const q = queue[i % queue.length]; answered = false; // se recicla mientras dure el tiempo
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="vScore">${score}</span></div>
            <div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="vTime"></span></div></div>
          </div>
          <div class="game-ask">¿Verdadero o Falso?</div>
          <div class="vof-statement">${q.t}</div>
          <div class="vof-buttons">
            <button class="btn vof-btn vof-btn--v" data-v="true">✔ Verdadero</button>
            <button class="btn vof-btn vof-btn--f" data-v="false">✘ Falso</button>
          </div>
          <div class="game-feedback" id="vFb"></div>
        </div>`;
      mount.querySelectorAll(".vof-btn").forEach(b => b.addEventListener("click", () => {
        if (answered) return; answered = true;
        const chosen = b.dataset.v === "true";
        const ok = chosen === q.v;
        const fb = mount.querySelector("#vFb");
        mount.querySelectorAll(".vof-btn").forEach(x => x.disabled = true);
        if (ok) { score++; mount.querySelector("#vScore").textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Correcto!"; }
        else { fb.className = "game-feedback no show"; fb.textContent = (q.v ? "Era Verdadero. " : "Era Falso. ") + (q.x || ""); }
        setT(() => { i++; paint(); }, 750);
      }));
    }
    function finish() {
      G.stopAll();
      record("vof", score);
      result(mount, `<div class="game-result__title">¡Se acabó el tiempo!</div>
        <span class="game-result__big">${score}</span><div class="game-result__stats">respuestas correctas</div>
        <div class="game-result__best">Mejor marca: ${G.getBest("vof")} aciertos</div>`, start);
    }
    start();
  };

  /* ============================================================
     3) MEMOTEST (término ↔ definición)
     ============================================================ */
  const MEMO_PAIRS = [
    { id: "ram", a: "RAM", b: "Memoria volátil" },
    { id: "rom", a: "ROM", b: "Solo lectura" },
    { id: "cpu", a: "CPU", b: "Procesa datos" },
    { id: "usb", a: "USB", b: "Puerto universal" },
    { id: "drv", a: "Driver", b: "Controlador" },
    { id: "bkp", a: "Backup", b: "Copia de seguridad" },
  ];

  G.memo = function (mount) {
    let cards, flipped, matched, moves, lock;
    function start() {
      cards = shuffle(MEMO_PAIRS.flatMap(p => [
        { pid: p.id, txt: p.a }, { pid: p.id, txt: p.b }
      ]));
      flipped = []; matched = 0; moves = 0; lock = false;
      paint();
    }
    function paint() {
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Movimientos</span><span class="game-hud__val" id="mMoves">${moves}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Pares</span><span class="game-hud__val"><span id="mMatched">${matched}</span>/${MEMO_PAIRS.length}</span></div>
          </div>
          <div class="game-ask">Emparejá cada término con su definición.</div>
          <div class="memo-grid" id="mGrid">
            ${cards.map((c, k) => `
              <button class="memo-card" data-k="${k}">
                <span class="memo-card__face memo-card__cover">?</span>
                <span class="memo-card__face memo-card__content">${c.txt}</span>
              </button>`).join("")}
          </div>
        </div>`;
      mount.querySelector("#mGrid").addEventListener("click", e => {
        const b = e.target.closest(".memo-card"); if (!b || lock) return;
        const k = +b.dataset.k;
        if (b.classList.contains("is-flipped") || b.classList.contains("is-matched")) return;
        b.classList.add("is-flipped"); flipped.push(k);
        if (flipped.length === 2) {
          moves++; mount.querySelector("#mMoves").textContent = moves; lock = true;
          const [x, y] = flipped;
          if (cards[x].pid === cards[y].pid) {
            setT(() => {
              mount.querySelector(`[data-k="${x}"]`).classList.add("is-matched");
              mount.querySelector(`[data-k="${y}"]`).classList.add("is-matched");
              matched++; mount.querySelector("#mMatched").textContent = matched;
              flipped = []; lock = false;
              if (matched === MEMO_PAIRS.length) finish();
            }, 420);
          } else {
            setT(() => {
              mount.querySelector(`[data-k="${x}"]`).classList.remove("is-flipped");
              mount.querySelector(`[data-k="${y}"]`).classList.remove("is-flipped");
              flipped = []; lock = false;
            }, 750);
          }
        }
      });
    }
    function finish() {
      record("memo", { moves });
      const best = G.getBest("memo");
      result(mount, `<div class="game-result__title">¡Completaste el memotest!</div>
        <span class="game-result__big">${moves}</span><div class="game-result__stats">movimientos</div>
        <div class="game-result__best">Mejor marca: ${best && best.moves != null ? best.moves + " movimientos" : "—"}</div>`, start);
    }
    start();
  };

  /* ============================================================
     4) AHORCADO TÉCNICO
     ============================================================ */
  const WORDS = [
    { w: "PROCESADOR", h: "El cerebro de la computadora (CPU)." },
    { w: "MEMORIA", h: "Almacena datos; la RAM es la principal." },
    { w: "HARDWARE", h: "La parte física y tangible." },
    { w: "SOFTWARE", h: "El componente lógico: los programas." },
    { w: "HUMANWARE", h: "La dimensión humana del sistema." },
    { w: "TECLADO", h: "Periférico de entrada con teclas." },
    { w: "MONITOR", h: "Periférico de salida: la pantalla." },
    { w: "DRIVER", h: "Controlador de un dispositivo." },
    { w: "ANTIVIRUS", h: "Protege de programas dañinos." },
    { w: "GABINETE", h: "La caja o torre de la PC." },
    { w: "PENDRIVE", h: "Almacenamiento extraíble por USB." },
    { w: "MANTENIMIENTO", h: "Cuidado periódico del equipo." },
    { w: "PRESUPUESTO", h: "Los recursos del comprador." },
    { w: "COTIZACION", h: "Documento que detalla precios." },
    { w: "PERIFERICO", h: "Dispositivo externo a la PC." },
    { w: "FUENTE", h: "Convierte la corriente para alimentar la PC." },
  ];
  const ABC = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  const HANG_MAX = 6;

  function hangSvg(miss) {
    const p = [
      '<line x1="10" y1="98" x2="80" y2="98"/><line x1="30" y1="98" x2="30" y2="8"/><line x1="30" y1="8" x2="75" y2="8"/><line x1="75" y1="8" x2="75" y2="20"/>',
      '<circle cx="75" cy="30" r="10"/>',
      '<line x1="75" y1="40" x2="75" y2="65"/>',
      '<line x1="75" y1="48" x2="62" y2="58"/>',
      '<line x1="75" y1="48" x2="88" y2="58"/>',
      '<line x1="75" y1="65" x2="63" y2="80"/>',
      '<line x1="75" y1="65" x2="87" y2="80"/>',
    ];
    return `<svg class="hang-svg" viewBox="0 0 100 105" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">${p.slice(0, miss + 1).join("")}</svg>`;
  }

  G.hangman = function (mount) {
    let solved, current, guessed, wrong, over;
    function start() { solved = 0; nextWord(); }
    function nextWord() {
      current = WORDS[Math.floor(Math.random() * WORDS.length)];
      guessed = new Set(); wrong = new Set(); over = false; paint();
    }
    const won = () => current.w.split("").every(ch => guessed.has(ch));
    function paint() {
      const miss = wrong.size;
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Adivinadas</span><span class="game-hud__val">${solved}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Errores</span><span class="game-hud__val">${miss}/${HANG_MAX}</span></div>
          </div>
          <div class="hang-top">
            ${hangSvg(miss - 1)}
            <div class="hang-hint">💡 ${current.h}</div>
          </div>
          <div class="hang-word">
            ${current.w.split("").map(ch => `<span class="hang-letter">${guessed.has(ch) ? ch : ""}</span>`).join("")}
          </div>
          <div class="hang-keys" id="hKeys">
            ${ABC.map(l => {
              const cls = guessed.has(l) ? "hit" : (wrong.has(l) ? "miss" : "");
              const dis = (guessed.has(l) || wrong.has(l) || over) ? "disabled" : "";
              return `<button class="hang-key ${cls}" data-l="${l}" ${dis}>${l}</button>`;
            }).join("")}
          </div>
          <div class="game-feedback" id="hFb"></div>
        </div>`;
      mount.querySelector("#hKeys").addEventListener("click", e => {
        const b = e.target.closest(".hang-key"); if (!b || b.disabled || over) return;
        const l = b.dataset.l;
        if (current.w.includes(l)) guessed.add(l); else wrong.add(l);
        if (won()) { solved++; over = true; paint(); feedback(true); }
        else if (wrong.size >= HANG_MAX) { over = true; paint(); feedback(false); }
        else paint();
      });
    }
    function feedback(win) {
      const fb = mount.querySelector("#hFb");
      if (win) { fb.className = "game-feedback ok show"; fb.innerHTML = `¡Adivinaste <strong>${current.w}</strong>! Va otra…`; setT(nextWord, 1100); }
      else {
        fb.className = "game-feedback no show"; fb.innerHTML = `La palabra era <strong>${current.w}</strong>.`;
        setT(() => {
          record("hangman", solved);
          result(mount, `<div class="game-result__title">Fin del juego</div>
            <span class="game-result__big">${solved}</span><div class="game-result__stats">palabras adivinadas</div>
            <div class="game-result__best">Mejor marca: ${G.getBest("hangman")} palabras</div>`, start);
        }, 1200);
      }
    }
    start();
  };

  /* ============================================================
     5) CONECTÁ (dos columnas)
     ============================================================ */
  const CONNECT_PAIRS = [
    { l: "USB", r: "Conecta periféricos" },
    { l: "RJ-45", r: "Red de datos (LAN)" },
    { l: "VGA / HDMI", r: "Conecta el monitor" },
    { l: "RAM", r: "Memoria volátil" },
    { l: "ROM", r: "Solo lectura" },
    { l: "CPU", r: "Procesa instrucciones" },
    { l: "Fuente", r: "Alterna → continua" },
    { l: "Driver", r: "Comunica SO y hardware" },
    { l: "Placa madre", r: "Conecta los componentes" },
    { l: "Cotización", r: "Detalla precios" },
  ];
  const CONNECT_PER_ROUND = 5;

  G.connect = function (mount) {
    let pool, round, mistakes, sel, matchedCount, leftOrder, rightOrder;
    function start() { mistakes = 0; round = 0; newRound(); }
    function newRound() {
      pool = shuffle(CONNECT_PAIRS).slice(0, CONNECT_PER_ROUND);
      leftOrder = shuffle(pool.map((p, i) => i));
      rightOrder = shuffle(pool.map((p, i) => i));
      sel = null; matchedCount = 0;
      paint();
    }
    function paint() {
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Errores</span><span class="game-hud__val" id="kMiss">${mistakes}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Pares</span><span class="game-hud__val"><span id="kMatched">0</span>/${pool.length}</span></div>
          </div>
          <div class="game-ask">Tocá un concepto y luego su pareja.</div>
          <div class="connect-cols">
            <div class="connect-col" id="kLeft">
              ${leftOrder.map(idx => `<button class="connect-item" data-side="l" data-idx="${idx}">${pool[idx].l}</button>`).join("")}
            </div>
            <div class="connect-col" id="kRight">
              ${rightOrder.map(idx => `<button class="connect-item" data-side="r" data-idx="${idx}">${pool[idx].r}</button>`).join("")}
            </div>
          </div>
          <div class="game-feedback" id="kFb"></div>
        </div>`;
      mount.querySelector(".connect-cols").addEventListener("click", e => {
        const b = e.target.closest(".connect-item"); if (!b || b.classList.contains("matched")) return;
        if (!sel) {
          if (b.dataset.side !== "l") return; // empezar por la izquierda
          sel = b; b.classList.add("sel"); return;
        }
        if (b.dataset.side !== "r") { // cambiar selección de la izquierda
          sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return;
        }
        // comparar
        if (b.dataset.idx === sel.dataset.idx) {
          b.classList.add("matched"); sel.classList.remove("sel"); sel.classList.add("matched"); sel = null;
          matchedCount++; mount.querySelector("#kMatched").textContent = matchedCount;
          if (matchedCount === pool.length) {
            round++;
            const fb = mount.querySelector("#kFb"); fb.className = "game-feedback ok show"; fb.textContent = "¡Ronda completa!";
            setT(() => { if (round >= 3) finish(); else newRound(); }, 900);
          }
        } else {
          mistakes++; mount.querySelector("#kMiss").textContent = mistakes;
          const wrong = b; wrong.classList.add("bad");
          setT(() => wrong.classList.remove("bad"), 450);
          sel.classList.remove("sel"); sel = null;
        }
      });
    }
    function finish() {
      record("connect", { mistakes });
      const best = G.getBest("connect");
      result(mount, `<div class="game-result__title">¡Completaste las 3 rondas!</div>
        <span class="game-result__big">${mistakes}</span><div class="game-result__stats">errores</div>
        <div class="game-result__best">Mejor marca: ${best && best.mistakes != null ? best.mistakes + " errores" : "—"}</div>`, start);
    }
    start();
  };

  /* ============================================================
     6) CAZÁ EL ERROR (buena práctica vs error)
     ============================================================ */
  const SPOT = [
    { t: "Limpiar el interior de la PC con aire comprimido y el equipo apagado.", good: true },
    { t: "Comer y beber sobre el teclado mientras trabajás.", good: false, x: "Puede dañar las teclas." },
    { t: "Usar pulsera antiestática al abrir el gabinete.", good: true },
    { t: "Desconectar el monitor con la PC encendida.", good: false, x: "Puede dañar el monitor y la torre." },
    { t: "Instalar programas desde sitios desconocidos.", good: false, x: "Es una vía de entrada de malware." },
    { t: "Hacer copias de seguridad de forma periódica.", good: true },
    { t: "Limpiar la pantalla con agua y la PC encendida.", good: false, x: "Nunca con líquidos ni encendida." },
    { t: "Tener el equipo con conexión a tierra.", good: true },
    { t: "Mover la notebook mientras está encendida.", good: false, x: "El disco en movimiento puede dañarse." },
    { t: "Actualizar el antivirus y el sistema con regularidad.", good: true },
    { t: "Tener el gabinete en un lugar bien ventilado.", good: true },
    { t: "Abrir un monitor para limpiarlo por dentro.", good: false, x: "Maneja voltajes peligrosos (CRT hasta 10.000 V)." },
    { t: "Vaciar la papelera después de borrar muchos archivos.", good: true },
    { t: "Fumar cerca del gabinete de la computadora.", good: false, x: "El alquitrán ensucia y daña las piezas." },
  ];

  G.spot = function (mount) {
    let queue, i, score, answered;
    function start() { queue = shuffle(SPOT); i = 0; score = 0; paint(); }
    function paint() {
      if (i >= queue.length) return finish();
      const q = queue[i]; answered = false;
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="sScore">${score}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Caso</span><span class="game-hud__val">${i + 1}/${queue.length}</span></div>
          </div>
          <div class="game-ask">¿Buena práctica o error?</div>
          <div class="spot-card">${q.t}</div>
          <div class="spot-buttons">
            <button class="btn vof-btn--v spot-btn" data-g="true">👍 Buena práctica</button>
            <button class="btn vof-btn--f spot-btn" data-g="false">👎 Error</button>
          </div>
          <div class="game-feedback" id="sFb"></div>
        </div>`;
      mount.querySelectorAll(".spot-btn").forEach(b => b.addEventListener("click", () => {
        if (answered) return; answered = true;
        const chosen = b.dataset.g === "true";
        const ok = chosen === q.good;
        const fb = mount.querySelector("#sFb");
        mount.querySelectorAll(".spot-btn").forEach(x => x.disabled = true);
        if (ok) { score++; mount.querySelector("#sScore").textContent = score; fb.className = "game-feedback ok show"; fb.textContent = "¡Correcto!"; }
        else { fb.className = "game-feedback no show"; fb.textContent = (q.good ? "Era una buena práctica. " : "Era un error. ") + (q.x || ""); }
        setT(() => { i++; paint(); }, 850);
      }));
    }
    function finish() {
      record("spot", score);
      result(mount, `<div class="game-result__title">¡Terminaste!</div>
        <span class="game-result__big">${score}/${queue.length}</span>
        <div class="game-result__best">Mejor marca: ${G.getBest("spot")} aciertos</div>`, start);
    }
    start();
  };

  /* ============================================================
     7) ORDENÁ (secuencias)
     ============================================================ */
  const ORDER = [
    { title: "Ciclo de instrucción de la CPU", steps: ["Búsqueda", "Decodificación", "Ejecución", "Almacenamiento"] },
    { title: "Funciones de la fuente de alimentación", steps: ["Transformación", "Rectificación", "Filtrado", "Estabilización"] },
    { title: "Etapas del informe técnico", steps: ["Preparación", "Ordenación", "Redacción", "Revisión"] },
    { title: "Ciclo básico de la computadora", steps: ["Entrada", "Procesamiento", "Almacenamiento", "Salida"] },
    { title: "Pasos de la limpieza física", steps: ["Apagar y desenchufar", "Limpiar el exterior", "Aire comprimido adentro", "Ordenar los cables"] },
    { title: "Crear un presupuesto", steps: ["Objetivos", "Alcance", "Dividir en etapas", "Estimar montos"] },
  ];

  G.order = function (mount) {
    let queue, i, solved, placed;
    function start() { queue = shuffle(ORDER); i = 0; solved = 0; paint(); }
    function paint() {
      if (i >= queue.length) return finish();
      const puzzle = queue[i];
      placed = 0;
      const pool = shuffle(puzzle.steps.map((s, idx) => ({ s, idx })));
      mount.innerHTML = `
        <div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Resueltos</span><span class="game-hud__val">${solved}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Secuencia</span><span class="game-hud__val">${i + 1}/${queue.length}</span></div>
          </div>
          <div class="game-ask">Ordená: <strong>${puzzle.title}</strong></div>
          <div class="chain-slots" id="oSlots">
            ${puzzle.steps.map((_, k) => `
              ${k ? '<span class="chain-arrow">→</span>' : ''}
              <div class="chain-slot" data-pos="${k}">${k + 1}</div>`).join("")}
          </div>
          <div class="chain-pool" id="oPool">
            ${pool.map(p => `<button class="chain-chip" data-idx="${p.idx}">${p.s}</button>`).join("")}
          </div>
          <div class="game-feedback" id="oFb"></div>
        </div>`;
      mount.querySelector("#oPool").addEventListener("click", e => {
        const b = e.target.closest(".chain-chip"); if (!b || b.disabled) return;
        if (+b.dataset.idx === placed) {
          const slot = mount.querySelector(`.chain-slot[data-pos="${placed}"]`);
          slot.textContent = puzzle.steps[placed]; slot.classList.add("filled");
          b.disabled = true; b.style.visibility = "hidden";
          placed++;
          if (placed === puzzle.steps.length) {
            solved++;
            const fb = mount.querySelector("#oFb"); fb.className = "game-feedback ok show"; fb.textContent = "¡Secuencia correcta!";
            setT(() => { i++; paint(); }, 950);
          }
        } else {
          b.classList.add("shake");
          setT(() => b.classList.remove("shake"), 420);
          const fb = mount.querySelector("#oFb"); fb.className = "game-feedback no show"; fb.textContent = "Ese no es el siguiente paso.";
        }
      });
    }
    function finish() {
      record("order", solved);
      result(mount, `<div class="game-result__title">¡Completaste todo!</div>
        <span class="game-result__big">${solved}/${queue.length}</span><div class="game-result__stats">secuencias resueltas</div>
        <div class="game-result__best">Mejor marca: ${G.getBest("order")} secuencias</div>`, start);
    }
    start();
  };

})();
