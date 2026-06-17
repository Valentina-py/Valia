/* ============================================================
   JUEGOS DE APRENDIZAJE — window.Games[id](mount)
   Mejores marcas en localStorage. Timers cancelables con stopAll().
   ============================================================ */
(function () {
  "use strict";
  const CE = window.CEngine;
  const esc = CE.escapeHtml;
  const hlc = code => `<pre class="code">${CE.highlight(code)}</pre>`;
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // timers
  const timers = new Set();
  function every(fn, ms) { const id = setInterval(fn, ms); timers.add(id); return id; }
  function after(fn, ms) { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; }
  function stopAll() { timers.forEach(id => { clearInterval(id); clearTimeout(id); }); timers.clear(); }

  // mejores marcas
  const STORE = "estudioProg.games.v1";
  let best = (() => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; } })();
  function saveBest() { localStorage.setItem(STORE, JSON.stringify(best)); }
  function getBest(id) { return id in best ? best[id] : null; }
  function setBestIf(id, val, isBetter) { const cur = best[id]; if (cur == null || isBetter(val, cur)) { best[id] = val; saveBest(); } }

  function resultScreen(mount, opts) {
    stopAll();
    const card = h(`<div class="game center">
      <div class="game-result__title">${opts.title}</div>
      <span class="game-result__big">${opts.big}</span>
      <div class="game-result__stats">${opts.stats || ""}</div>
      <div class="game-result__best">${opts.best || ""}</div>
      <div class="btn-row" style="justify-content:center;margin-top:18px">
        <button class="btn btn--primary" id="again">↻ Jugar de nuevo</button>
        <a class="btn" href="#/games">Otros juegos</a>
      </div>
    </div>`);
    mount.innerHTML = ""; mount.appendChild(card);
    card.querySelector("#again").addEventListener("click", opts.again);
  }

  function feedback(el, ok, msg) { el.className = "game-feedback show " + (ok ? "ok" : "no"); el.innerHTML = msg; }

  /* ============================================================
     Juego genérico de opción múltiple con código + temporizador
     ============================================================ */
  function mcGame(mount, cfg) {
    // cfg: { id, questions:[{code?,prompt,options,answer,exp}], time, mono }
    const qs = shuffle(cfg.questions);
    let i = 0, score = 0, lives = cfg.lives || 0, timeLeft = cfg.time || 0, tid = null;
    const total = qs.length;

    function paint() {
      if (i >= total) return finish();
      const q = qs[i];
      const opts = q.options.map((o, k) => `<button class="btn opt-btn" data-k="${k}">${esc(String(o))}</button>`).join("");
      const hud = `<div class="game-hud">
        <div class="game-hud__item"><span class="game-hud__label">Pregunta</span><span class="game-hud__val">${i + 1}/${total}</span></div>
        <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="sc">${score}</span></div>
        ${cfg.time ? `<div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="tbar"></span></div></div>` : ""}
        ${cfg.lives ? `<div class="game-hud__item"><span class="game-hud__label">Vidas</span><span class="game-hud__val" id="lv">${"♥".repeat(lives)}</span></div>` : ""}
      </div>`;
      mount.innerHTML = `<div class="game">${hud}
        ${q.code ? `<div class="game-code">${hlc(q.code)}</div>` : ""}
        <div class="game-prompt">${q.prompt}</div>
        <div class="opt-grid" id="opts">${opts}</div>
        <div class="game-feedback" id="fb"></div></div>`;
      const optsEl = mount.querySelector("#opts"), fb = mount.querySelector("#fb");
      optsEl.querySelectorAll(".opt-btn").forEach(b => b.addEventListener("click", () => choose(+b.dataset.k, optsEl, fb, q)));
      if (cfg.time) startTimer();
    }
    function startTimer() {
      const bar = mount.querySelector("#tbar"); if (!bar) return;
      let t = cfg.time; bar.style.width = "100%";
      tid = every(() => {
        t--; bar.style.width = (t / cfg.time * 100) + "%";
        if (t <= 0) { clearTimer(); timeup(); }
      }, 1000);
    }
    function clearTimer() { if (tid) { clearInterval(tid); timers.delete(tid); tid = null; } }
    function timeup() { finish(); }

    function choose(k, optsEl, fb, q) {
      clearTimer();
      optsEl.querySelectorAll(".opt-btn").forEach((b, idx) => { b.disabled = true; if (idx === q.answer) b.classList.add("correct"); else if (idx === k) b.classList.add("wrong"); });
      const ok = k === q.answer;
      if (ok) { score++; const sc = mount.querySelector("#sc"); if (sc) sc.textContent = score; }
      else if (cfg.lives) { lives--; const lv = mount.querySelector("#lv"); if (lv) lv.textContent = "♥".repeat(lives); }
      feedback(fb, ok, (ok ? "¡Correcto! " : "Incorrecto. ") + (q.exp || ""));
      const next = h(`<div class="btn-row" style="justify-content:center;margin-top:14px"><button class="btn btn--primary">${i + 1 < total ? "Siguiente →" : "Ver resultado"}</button></div>`);
      mount.querySelector(".game").appendChild(next);
      next.querySelector("button").addEventListener("click", () => { i++; if (cfg.lives && lives <= 0) finish(); else paint(); });
    }
    function finish() {
      clearTimer();
      setBestIf(cfg.id, score, (a, b) => a > b);
      resultScreen(mount, {
        title: cfg.title || "Resultado",
        big: score + "/" + total,
        stats: score === total ? "¡Perfecto!" : score >= total * 0.6 ? "¡Muy bien!" : "Seguí practicando.",
        best: "Mejor marca: " + getBest(cfg.id) + " aciertos",
        again: () => start()
      });
    }
    function start() { i = 0; score = 0; lives = cfg.lives || 0; paint(); }
    start();
  }

  /* ============================================================
     1) ADIVINÁ LA SALIDA
     ============================================================ */
  function output(mount) {
    mcGame(mount, {
      id: "output", title: "Adiviná la salida",
      questions: [
        { code: `printf("%i", 7 / 2);`, prompt: "¿Qué imprime?", options: ["3", "3.5", "4", "1"], answer: 0, exp: "División entera: descarta los decimales." },
        { code: `printf("%i", 7 % 3);`, prompt: "¿Qué imprime?", options: ["2", "1", "0", "3"], answer: 1, exp: "% es el resto: 7 = 3·2 + 1." },
        { code: `printf("%c", 66);`, prompt: "¿Qué imprime?", options: ["66", "B", "A", "C"], answer: 1, exp: "El código ASCII 66 es la letra B." },
        { code: `int i;\nfor (i = 0; i < 3; i++)\n    printf("%i", i);`, prompt: "¿Qué imprime?", options: ["123", "012", "0123", "111"], answer: 1, exp: "i toma 0, 1 y 2." },
        { code: `int x = 5;\nx += 3;\nprintf("%i", x);`, prompt: "¿Qué imprime?", options: ["5", "3", "8", "53"], answer: 2, exp: "x += 3 es x = x + 3 = 8." },
        { code: `printf("%i", 2 + 3 * 2);`, prompt: "¿Qué imprime?", options: ["10", "8", "12", "7"], answer: 1, exp: "Primero la multiplicación: 2 + 6 = 8." },
        { code: `int a = 10, b = 4;\nprintf("%i", a - b * 2);`, prompt: "¿Qué imprime?", options: ["12", "2", "8", "20"], answer: 1, exp: "b*2 = 8, luego 10 − 8 = 2." },
        { code: `int v[3] = {5, 9, 2};\nprintf("%i", v[1]);`, prompt: "¿Qué imprime?", options: ["5", "9", "2", "1"], answer: 1, exp: "El índice 1 es el segundo elemento: 9." },
        { code: `printf("%i", 3 > 5);`, prompt: "¿Qué imprime?", options: ["1", "0", "true", "false"], answer: 1, exp: "Una comparación falsa vale 0 en C." },
        { code: `int i = 4;\nprintf("%i", i++);\nprintf("%i", i);`, prompt: "¿Qué imprime?", options: ["45", "55", "44", "54"], answer: 0, exp: "i++ usa 4 y luego incrementa a 5." },
      ]
    });
  }

  /* ============================================================
     2) ¿CUÁNTO VALE? (traza)
     ============================================================ */
  function trace(mount) {
    mcGame(mount, {
      id: "trace", title: "¿Cuánto vale?", time: 25,
      questions: [
        { code: `int s = 0, i;\nfor (i = 1; i <= 4; i++)\n    s = s + i;`, prompt: "¿Cuánto vale <code>s</code> al final?", options: ["4", "10", "6", "16"], answer: 1, exp: "1+2+3+4 = 10." },
        { code: `int n = 253, c = 0;\nwhile (n > 0) {\n    n = n / 10;\n    c++;\n}`, prompt: "¿Cuánto vale <code>c</code>?", options: ["2", "3", "253", "0"], answer: 1, exp: "Cuenta los dígitos de 253: 3." },
        { code: `int p = 1, i;\nfor (i = 1; i <= 4; i++)\n    p = p * i;`, prompt: "¿Cuánto vale <code>p</code>?", options: ["10", "24", "4", "12"], answer: 1, exp: "4! = 1·2·3·4 = 24." },
        { code: `int x = 17, r;\nr = x % 5;`, prompt: "¿Cuánto vale <code>r</code>?", options: ["3", "2", "5", "12"], answer: 1, exp: "17 = 5·3 + 2 → resto 2." },
        { code: `int c = 0, i;\nfor (i = 1; i <= 10; i++)\n    if (i % 2 == 0) c++;`, prompt: "¿Cuánto vale <code>c</code>?", options: ["5", "10", "4", "6"], answer: 0, exp: "Pares del 1 al 10: 2,4,6,8,10 → 5." },
        { code: `int a = 2;\nint b = a * a * a;`, prompt: "¿Cuánto vale <code>b</code>?", options: ["6", "8", "4", "2"], answer: 1, exp: "2·2·2 = 8." },
        { code: `int s = 0, i;\nfor (i = 0; i < 5; i++)\n    s += 2;`, prompt: "¿Cuánto vale <code>s</code>?", options: ["5", "10", "2", "8"], answer: 1, exp: "Suma 2 cinco veces: 10." },
        { code: `int n = 5, f = 1;\nwhile (n > 1) {\n    f = f * n;\n    n--;\n}`, prompt: "¿Cuánto vale <code>f</code>?", options: ["120", "25", "5", "24"], answer: 0, exp: "5! = 120." },
      ]
    });
  }

  /* ============================================================
     3) MEMOTEST (función ↔ significado)
     ============================================================ */
  function memo(mount) {
    const pairs = [
      ["printf", "mostrar en pantalla"],
      ["scanf", "leer del teclado"],
      ["strlen", "longitud de cadena"],
      ["strcpy", "copiar cadena"],
      ["strcmp", "comparar cadenas"],
      ["%", "resto / módulo"],
    ];
    let cards = [];
    pairs.forEach((p, gi) => { cards.push({ g: gi, t: p[0] }); cards.push({ g: gi, t: p[1] }); });
    cards = shuffle(cards);
    let first = null, lock = false, matched = 0, moves = 0;

    function paint() {
      mount.innerHTML = `<div class="game">
        <div class="game-hud">
          <div class="game-hud__item"><span class="game-hud__label">Movimientos</span><span class="game-hud__val" id="mv">0</span></div>
          <div class="game-hud__item"><span class="game-hud__label">Pares</span><span class="game-hud__val" id="pr">0/${pairs.length}</span></div>
        </div>
        <div class="memo-grid" id="grid"></div></div>`;
      const grid = mount.querySelector("#grid");
      cards.forEach((c, idx) => {
        const el = h(`<button class="memo-card" data-i="${idx}">
          <span class="memo-card__face memo-card__cover">&lt;/&gt;</span>
          <span class="memo-card__face memo-card__content">${esc(c.t)}</span></button>`);
        el.addEventListener("click", () => flip(idx, el));
        grid.appendChild(el);
      });
    }
    function flip(idx, el) {
      if (lock || el.classList.contains("is-flipped") || el.classList.contains("is-matched")) return;
      el.classList.add("is-flipped");
      if (!first) { first = { idx, el }; return; }
      moves++; mount.querySelector("#mv").textContent = moves; lock = true;
      const a = cards[first.idx], b = cards[idx];
      if (a.g === b.g && first.idx !== idx) {
        first.el.classList.add("is-matched"); el.classList.add("is-matched");
        matched++; mount.querySelector("#pr").textContent = matched + "/" + pairs.length;
        first = null; lock = false;
        if (matched === pairs.length) after(win, 450);
      } else {
        after(() => { first.el.classList.remove("is-flipped"); el.classList.remove("is-flipped"); first = null; lock = false; }, 750);
      }
    }
    function win() {
      setBestIf("memo", { moves }, (a, b) => a.moves < b.moves);
      resultScreen(mount, { title: "¡Completaste el memotest!", big: moves, stats: "movimientos", best: "Mejor marca: " + (getBest("memo") ? getBest("memo").moves + " movimientos" : "—"), again: () => start() });
    }
    function start() { cards = shuffle(cards); first = null; lock = false; matched = 0; moves = 0; paint(); }
    start();
  }

  /* ============================================================
     4) CLASIFICÁ EL TIPO (literal)
     ============================================================ */
  function types(mount) {
    const SETS = [
      { sym: "int", name: "entero" },
      { sym: "float", name: "real" },
      { sym: "char", name: "carácter" },
      { sym: "cadena", name: "string" },
    ];
    const items = shuffle([
      { v: "42", a: 0 }, { v: "-7", a: 0 }, { v: "1000", a: 0 },
      { v: "3.14", a: 1 }, { v: "0.5", a: 1 }, { v: "-2.0", a: 1 },
      { v: "'A'", a: 2 }, { v: "'9'", a: 2 }, { v: "'\\n'", a: 2 },
      { v: '"hola"', a: 3 }, { v: '"C"', a: 3 }, { v: '"123"', a: 3 },
    ]);
    let i = 0, score = 0, lives = 3;
    function paint() {
      if (i >= items.length || lives <= 0) return finish();
      const q = items[i];
      mount.innerHTML = `<div class="game">
        <div class="game-hud">
          <div class="game-hud__item"><span class="game-hud__label">Puntos</span><span class="game-hud__val" id="sc">${score}</span></div>
          <div class="game-hud__item"><span class="game-hud__label">Vidas</span><span class="game-hud__val" id="lv">${"♥".repeat(lives)}</span></div>
        </div>
        <div class="game-ask">¿De qué tipo es este literal de C?</div>
        <div class="classify-number">${esc(q.v)}</div>
        <div class="classify-sets" id="sets"></div>
        <div class="game-feedback" id="fb"></div></div>`;
      const sets = mount.querySelector("#sets"), fb = mount.querySelector("#fb");
      SETS.forEach((s, k) => {
        const b = h(`<button class="classify-set"><span class="classify-set__sym">${s.sym}</span><span class="classify-set__name">${s.name}</span></button>`);
        b.addEventListener("click", () => choose(k, b, sets, fb, q));
        sets.appendChild(b);
      });
    }
    function choose(k, b, sets, fb, q) {
      sets.querySelectorAll("button").forEach(x => x.disabled = true);
      const ok = k === q.a;
      if (ok) { score++; mount.querySelector("#sc").textContent = score; b.classList.add("correct"); }
      else { lives--; b.classList.add("wrong"); sets.children[q.a].classList.add("correct"); }
      feedback(fb, ok, ok ? "¡Bien!" : `Era <code>${SETS[q.a].sym}</code> (${SETS[q.a].name}).`);
      after(() => { i++; paint(); }, ok ? 600 : 1100);
    }
    function finish() {
      setBestIf("types", score, (a, b) => a > b);
      resultScreen(mount, { title: "Clasificá el tipo", big: score, stats: "aciertos", best: "Mejor marca: " + getBest("types") + " aciertos", again: () => start() });
    }
    function start() { i = 0; score = 0; lives = 3; paint(); }
    start();
  }

  /* ============================================================
     5) ELEGÍ EL FORMATO
     ============================================================ */
  function format(mount) {
    mcGame(mount, {
      id: "format", title: "Elegí el formato", time: 20,
      questions: [
        { code: `int edad = 25;\nprintf("___", edad);`, prompt: "¿Qué especificador va?", options: ["%i", "%f", "%c", "%s"], answer: 0, exp: "Los enteros usan %i o %d." },
        { code: `float precio = 9.99;\nprintf("___", precio);`, prompt: "¿Qué especificador va?", options: ["%i", "%f", "%c", "%s"], answer: 1, exp: "Los reales usan %f." },
        { code: `char inicial = 'V';\nprintf("___", inicial);`, prompt: "¿Qué especificador va?", options: ["%s", "%i", "%c", "%f"], answer: 2, exp: "Un carácter usa %c." },
        { code: `char nombre[20] = "Ana";\nprintf("___", nombre);`, prompt: "¿Qué especificador va?", options: ["%c", "%s", "%i", "%f"], answer: 1, exp: "Una cadena (vector de char) usa %s." },
        { code: `double pi = 3.1416;\nprintf("___", pi);`, prompt: "¿Qué especificador va?", options: ["%i", "%c", "%f", "%d"], answer: 2, exp: "double también se imprime con %f." },
        { code: `int c = 'A';\nprintf("___", c);\n// queremos ver 65`, prompt: "Para ver el NÚMERO 65:", options: ["%c", "%d", "%s", "%f"], answer: 1, exp: "%d muestra el código; %c mostraría la letra A." },
        { code: `unsigned int n = 50000;\nprintf("___", n);`, prompt: "¿Qué especificador va?", options: ["%u", "%c", "%f", "%s"], answer: 0, exp: "Los sin signo usan %u." },
      ]
    });
  }

  /* ============================================================
     6) ORDENÁ EL CÓDIGO
     ============================================================ */
  const ORDER_PUZZLES = [
    {
      name: "Hola mundo",
      lines: [`#include <stdio.h>`, `int main() {`, `    printf("Hola");`, `    return 0;`, `}`]
    },
    {
      name: "Leer y sumar",
      lines: [`int a, b;`, `scanf("%i", &a);`, `scanf("%i", &b);`, `printf("%i", a + b);`]
    },
    {
      name: "Recorrer un vector",
      lines: [`int i, v[5];`, `for (i = 0; i < 5; i++) {`, `    scanf("%i", &v[i]);`, `}`]
    },
  ];
  function order(mount) {
    let pi = 0, solved = 0;
    function paint() {
      const puzzle = ORDER_PUZZLES[pi];
      let arr = shuffle(puzzle.lines.map((t, i) => ({ t, i })));
      // evitar que salga ya ordenado
      if (arr.every((x, k) => x.i === k)) arr = arr.reverse();
      mount.innerHTML = `<div class="game">
        <div class="game-hud">
          <div class="game-hud__item"><span class="game-hud__label">Puzzle</span><span class="game-hud__val">${pi + 1}/${ORDER_PUZZLES.length}</span></div>
          <div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Programa</span><span class="game-hud__val" style="font-size:14px">${esc(puzzle.name)}</span></div>
        </div>
        <div class="game-ask">Arrastrá las líneas para ordenar el programa.</div>
        <div class="order-pool" id="pool"></div>
        <div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="check">Verificar</button></div>
        <div class="game-feedback" id="fb"></div></div>`;
      const pool = mount.querySelector("#pool"), fb = mount.querySelector("#fb");
      arr.forEach(item => {
        const el = h(`<div class="order-line" draggable="true"><span class="order-line__handle">⋮⋮</span><span>${CE.highlight(item.t)}</span></div>`);
        el.dataset.i = item.i;
        addDnD(el, pool);
        pool.appendChild(el);
      });
      mount.querySelector("#check").addEventListener("click", () => {
        const order = [...pool.children].map(c => +c.dataset.i);
        const ok = order.every((x, k) => x === k);
        [...pool.children].forEach((c, k) => c.classList.toggle("ok", ok) || c.classList.toggle("no", !ok));
        if (ok) {
          solved++;
          feedback(fb, true, "¡Correcto! Programa bien ordenado.");
          const b = h(`<div class="btn-row" style="justify-content:center;margin-top:12px"><button class="btn btn--primary">${pi + 1 < ORDER_PUZZLES.length ? "Siguiente programa →" : "Ver resultado"}</button></div>`);
          mount.querySelector(".game").appendChild(b);
          b.querySelector("button").addEventListener("click", () => { pi++; if (pi < ORDER_PUZZLES.length) paint(); else finish(); });
        } else feedback(fb, false, "Todavía no está en orden. Probá de nuevo.");
      });
    }
    let dragEl = null;
    function addDnD(el, pool) {
      el.addEventListener("dragstart", () => { dragEl = el; el.classList.add("dragging"); });
      el.addEventListener("dragend", () => { el.classList.remove("dragging"); pool.querySelectorAll(".order-line").forEach(x => x.classList.remove("over")); });
      el.addEventListener("dragover", (e) => { e.preventDefault(); el.classList.add("over"); });
      el.addEventListener("dragleave", () => el.classList.remove("over"));
      el.addEventListener("drop", (e) => {
        e.preventDefault(); el.classList.remove("over");
        if (!dragEl || dragEl === el) return;
        const items = [...pool.children];
        const di = items.indexOf(dragEl), ti = items.indexOf(el);
        if (di < ti) pool.insertBefore(dragEl, el.nextSibling); else pool.insertBefore(dragEl, el);
      });
    }
    function finish() {
      setBestIf("order", solved, (a, b) => a > b);
      resultScreen(mount, { title: "Ordená el código", big: solved + "/" + ORDER_PUZZLES.length, stats: "programas ordenados", best: "Mejor marca: " + getBest("order") + " programas", again: () => start() });
    }
    function start() { pi = 0; solved = 0; paint(); }
    start();
  }

  /* ============================================================
     7) CAZÁ EL ERROR (V/F)
     ============================================================ */
  function bug(mount) {
    const items = shuffle([
      { code: `int x;\nscanf("%i", x);`, bad: true, exp: "Falta el <code>&amp;</code>: debe ser <code>scanf(\"%i\", &amp;x)</code>." },
      { code: `int x = 5;\nif (x == 5)\n    printf("cinco");`, bad: false, exp: "Está bien: usa <code>==</code> para comparar." },
      { code: `int x = 3;\nif (x = 0)\n    printf("cero");`, bad: true, exp: "Usa <code>=</code> (asignación) en vez de <code>==</code> (comparación)." },
      { code: `int v[5];\nv[5] = 10;`, bad: true, exp: "Índice fuera de rango: los válidos son 0 a 4." },
      { code: `printf("Hola\\n");`, bad: false, exp: "Correcto." },
      { code: `int i;\nfor (i = 0, i < 5, i++)\n    printf("%i", i);`, bad: true, exp: "El <code>for</code> usa <code>;</code> entre las partes, no comas." },
      { code: `char c = "A";`, bad: true, exp: "Un <code>char</code> usa comillas simples: <code>'A'</code>. Las dobles son para cadenas." },
      { code: `int suma(int a, int b) {\n    return a + b;\n}`, bad: false, exp: "Función correcta." },
      { code: `int main() {\n    printf("Hi")\n    return 0;\n}`, bad: true, exp: "Falta el <code>;</code> después de <code>printf(\"Hi\")</code>." },
    ]);
    let i = 0, score = 0;
    function paint() {
      if (i >= items.length) return finish();
      const q = items[i];
      mount.innerHTML = `<div class="game">
        <div class="game-hud">
          <div class="game-hud__item"><span class="game-hud__label">Código</span><span class="game-hud__val">${i + 1}/${items.length}</span></div>
          <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="sc">${score}</span></div>
        </div>
        <div class="game-ask">¿Este código está bien o tiene un error?</div>
        <div class="game-code">${hlc(q.code)}</div>
        <div class="vof-buttons">
          <button class="btn vof-btn vof-btn--v" id="ok">✓ Está bien</button>
          <button class="btn vof-btn vof-btn--f" id="err">✕ Tiene error</button>
        </div>
        <div class="game-feedback" id="fb"></div></div>`;
      const fb = mount.querySelector("#fb");
      mount.querySelector("#ok").addEventListener("click", () => choose(false, q, fb));
      mount.querySelector("#err").addEventListener("click", () => choose(true, q, fb));
    }
    function choose(saysBad, q, fb) {
      mount.querySelectorAll(".vof-btn").forEach(b => b.disabled = true);
      const ok = saysBad === q.bad;
      if (ok) { score++; }
      feedback(fb, ok, (ok ? "¡Correcto! " : "Casi. ") + q.exp);
      after(() => { i++; paint(); }, 1500);
    }
    function finish() {
      setBestIf("bug", score, (a, b) => a > b);
      resultScreen(mount, { title: "Cazá el error", big: score + "/" + items.length, stats: "aciertos", best: "Mejor marca: " + getBest("bug") + " aciertos", again: () => start() });
    }
    function start() { i = 0; score = 0; paint(); }
    start();
  }

  /* ============================================================
     8) AHORCADO DE PROGRAMACIÓN
     ============================================================ */
  const HANG = [
    { w: "VARIABLE", hint: "Zona de memoria con nombre que guarda un valor." },
    { w: "FUNCION", hint: "Módulo de código con nombre que resuelve una tarea." },
    { w: "ARREGLO", hint: "Secuencia homogénea accesible por índice." },
    { w: "CADENA", hint: "Texto: vector de char terminado en '\\0'." },
    { w: "ENTERO", hint: "Tipo de dato sin parte decimal (int)." },
    { w: "BUCLE", hint: "Estructura que repite instrucciones (for, while)." },
    { w: "COMPILAR", hint: "Traducir el código fuente a lenguaje de máquina." },
    { w: "INDICE", hint: "Número que indica una posición dentro de un vector." },
    { w: "CONDICION", hint: "Lo que evalúa un if para decidir." },
    { w: "PRINTF", hint: "Función que muestra datos en pantalla." },
  ];
  function hangman(mount) {
    let round = 0, won = 0;
    function paint(reset) {
      const item = HANG[round % HANG.length];
      const word = item.w;
      let guessed = new Set(), wrong = 0; const MAX = 6;
      function draw() {
        const display = word.split("").map(ch => guessed.has(ch) ? ch : "").join("");
        mount.innerHTML = `<div class="game">
          <div class="game-hud">
            <div class="game-hud__item"><span class="game-hud__label">Palabra</span><span class="game-hud__val">${round + 1}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Adivinadas</span><span class="game-hud__val" id="won">${won}</span></div>
            <div class="game-hud__item"><span class="game-hud__label">Errores</span><span class="game-hud__val">${wrong}/${MAX}</span></div>
          </div>
          <div class="hang-top">${hangSvg(wrong)}<div class="hang-hint"><strong>Pista:</strong> ${esc(item.hint)}</div></div>
          <div class="hang-word">${word.split("").map(ch => `<span class="hang-letter">${guessed.has(ch) ? ch : "&nbsp;"}</span>`).join("")}</div>
          <div class="hang-keys" id="keys"></div>
          <div class="game-feedback" id="fb"></div></div>`;
        const keys = mount.querySelector("#keys");
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(L => {
          const used = guessed.has(L);
          const b = h(`<button class="hang-key ${used ? (word.includes(L) ? "hit" : "miss") : ""}" ${used ? "disabled" : ""}>${L}</button>`);
          if (!used) b.addEventListener("click", () => press(L));
          keys.appendChild(b);
        });
      }
      function press(L) {
        guessed.add(L);
        if (!word.includes(L)) wrong++;
        const complete = word.split("").every(ch => guessed.has(ch));
        if (complete) { won++; after(nextRound, 350); }
        else if (wrong >= MAX) { after(loseRound, 350); }
        else draw();
      }
      function nextRound() { round++; if (round >= HANG.length) finish(); else paint(); }
      function loseRound() {
        const fb = `<div class="game-feedback show no">La palabra era <strong>${word}</strong>.</div>`;
        mount.querySelector(".game").insertAdjacentHTML("beforeend", fb);
        after(() => finish(), 1600);
      }
      draw();
    }
    function finish() {
      setBestIf("hangman", won, (a, b) => a > b);
      resultScreen(mount, { title: "Ahorcado", big: won, stats: "palabras adivinadas", best: "Mejor marca: " + getBest("hangman") + " palabras", again: () => start() });
    }
    function start() { round = 0; won = 0; paint(); }
    start();
  }
  function hangSvg(w) {
    const parts = [
      '<line x1="10" y1="95" x2="70" y2="95"/>', '<line x1="30" y1="95" x2="30" y2="10"/>',
      '<line x1="30" y1="10" x2="75" y2="10"/>', '<line x1="75" y1="10" x2="75" y2="22"/>',
      '<circle cx="75" cy="30" r="8"/>', '<line x1="75" y1="38" x2="75" y2="62"/>',
      '<line x1="75" y1="45" x2="64" y2="55"/><line x1="75" y1="45" x2="86" y2="55"/>',
      '<line x1="75" y1="62" x2="65" y2="78"/><line x1="75" y1="62" x2="85" y2="78"/>'
    ];
    return `<svg class="hang-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">${parts.slice(0, 2 + w).join("")}</svg>`;
  }

  /* ============================================================
     9) CONECTÁ (expresión ↔ valor)
     ============================================================ */
  function connect(mount) {
    const ALL = [
      { l: "7 % 2", r: "1" }, { l: "7 / 2", r: "3" }, { l: "2 * 3", r: "6" },
      { l: "'A'", r: "65" }, { l: "10 % 3", r: "1*" }, { l: "5 > 2", r: "verdadero(1)" },
      { l: 'strlen("hi")', r: "2" }, { l: "3 + 4 * 2", r: "11" },
    ];
    let round = 0, totalRounds = 3, score = 0;
    function paint() {
      const pick = shuffle(ALL).slice(0, 4);
      // arreglar duplicado '1*'
      pick.forEach(p => { if (p.r === "1*") p.r = "1"; });
      const left = pick.map((p, i) => ({ ...p, id: i }));
      const right = shuffle(pick.map((p, i) => ({ r: p.r, id: i })));
      let sel = null, done = 0;
      mount.innerHTML = `<div class="game">
        <div class="game-hud">
          <div class="game-hud__item"><span class="game-hud__label">Ronda</span><span class="game-hud__val">${round + 1}/${totalRounds}</span></div>
          <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="sc">${score}</span></div>
        </div>
        <div class="game-ask">Tocá una expresión y luego su valor.</div>
        <div class="connect-cols">
          <div class="connect-col" id="L"></div>
          <div class="connect-col" id="R"></div>
        </div>
        <div class="game-feedback" id="fb"></div></div>`;
      const L = mount.querySelector("#L"), R = mount.querySelector("#R"), fb = mount.querySelector("#fb");
      left.forEach(item => { const el = h(`<button class="connect-item" data-id="${item.id}">${esc(item.l)}</button>`); el.addEventListener("click", () => selLeft(item.id, el)); L.appendChild(el); });
      right.forEach(item => { const el = h(`<button class="connect-item" data-id="${item.id}">${esc(item.r)}</button>`); el.addEventListener("click", () => selRight(item.id, el)); R.appendChild(el); });
      function selLeft(id, el) { if (el.classList.contains("matched")) return; L.querySelectorAll(".connect-item").forEach(x => x.classList.remove("sel")); el.classList.add("sel"); sel = { id, el }; }
      function selRight(id, el) {
        if (!sel || el.classList.contains("matched")) return;
        if (id === sel.id) {
          sel.el.classList.add("matched"); sel.el.classList.remove("sel"); el.classList.add("matched");
          score++; mount.querySelector("#sc").textContent = score; done++; sel = null;
          if (done === left.length) { feedback(fb, true, "¡Ronda completa!"); after(next, 800); }
        } else {
          el.classList.add("bad"); after(() => el.classList.remove("bad"), 500);
        }
      }
    }
    function next() { round++; if (round >= totalRounds) finish(); else paint(); }
    function finish() {
      setBestIf("connect", score, (a, b) => a > b);
      resultScreen(mount, { title: "Conectá", big: score, stats: "pares conectados", best: "Mejor marca: " + getBest("connect") + " pares", again: () => start() });
    }
    function start() { round = 0; score = 0; paint(); }
    start();
  }

  /* ============================================================
     10) ADIVINÁ EL ASCII
     ============================================================ */
  function asciiGame(mount) {
    const POOL = [["A", 65], ["B", 66], ["Z", 90], ["a", 97], ["b", 98], ["z", 122], ["0", 48], ["9", 57], ["espacio", 32], ["+", 43]];
    function mkQuestions() {
      return POOL.map(([ch, code]) => {
        const wrongs = shuffle([code - 1, code + 1, code + 5, code - 3, code + 10]).slice(0, 3);
        const opts = shuffle([code, ...wrongs]);
        return { code: null, prompt: `¿Cuál es el código ASCII de <code>'${ch === "espacio" ? " " : ch}'</code>${ch === "espacio" ? " (espacio)" : ""}?`, options: opts, answer: opts.indexOf(code), exp: `'${ch}' = ${code}.` };
      });
    }
    mcGame(mount, { id: "ascii", title: "Adiviná el ASCII", time: 15, questions: mkQuestions() });
  }

  /* ============================================================
     11) VERDADERO O FALSO
     ============================================================ */
  function truefalse(mount) {
    const items = shuffle([
      { s: "Los índices de un arreglo empiezan en <code>1</code>.", v: false, exp: "Empiezan en 0." },
      { s: "Un <code>char</code> ocupa 1 byte.", v: true },
      { s: "<code>=</code> sirve para comparar dos valores.", v: false, exp: "<code>=</code> asigna; <code>==</code> compara." },
      { s: "El <code>for</code> sirve para repetir una cantidad fija de veces.", v: true },
      { s: "<code>scanf</code> necesita <code>&amp;</code> en variables simples.", v: true },
      { s: "Toda cadena termina con el carácter <code>'\\0'</code>.", v: true },
      { s: "<code>double</code> tiene menos precisión que <code>float</code>.", v: false, exp: "Es al revés: double tiene más precisión." },
      { s: "<code>%</code> devuelve el resto de una división.", v: true },
      { s: "Todo programa C debe tener una función <code>main()</code>.", v: true },
      { s: "<code>'A'</code> y <code>\"A\"</code> son lo mismo en C.", v: false, exp: "<code>'A'</code> es un char; <code>\"A\"</code> es una cadena (con '\\0')." },
    ]);
    let i = 0, score = 0, timeLeft = 60, tid = null;
    function paint() {
      if (i >= items.length) return finish();
      const q = items[i];
      mount.innerHTML = `<div class="game">
        <div class="game-hud">
          <div class="game-hud__item"><span class="game-hud__label">Aciertos</span><span class="game-hud__val" id="sc">${score}</span></div>
          <div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">Tiempo</span><div class="game-timer"><span id="tbar"></span></div></div>
        </div>
        <div class="vof-statement">${q.s}</div>
        <div class="vof-buttons">
          <button class="btn vof-btn vof-btn--v" id="v">✓ Verdadero</button>
          <button class="btn vof-btn vof-btn--f" id="f">✕ Falso</button>
        </div>
        <div class="game-feedback" id="fb"></div></div>`;
      const bar = mount.querySelector("#tbar"); bar.style.width = (timeLeft / 60 * 100) + "%";
      mount.querySelector("#v").addEventListener("click", () => choose(true, q));
      mount.querySelector("#f").addEventListener("click", () => choose(false, q));
    }
    function tickClock() {
      tid = every(() => { timeLeft--; const bar = mount.querySelector("#tbar"); if (bar) bar.style.width = (timeLeft / 60 * 100) + "%"; if (timeLeft <= 0) finish(); }, 1000);
    }
    function choose(ans, q) {
      mount.querySelectorAll(".vof-btn").forEach(b => b.disabled = true);
      const ok = ans === q.v;
      if (ok) { score++; }
      feedback(mount.querySelector("#fb"), ok, (ok ? "¡Correcto! " : "Incorrecto. ") + (q.exp || ""));
      after(() => { i++; paint(); }, 1100);
    }
    function finish() {
      if (tid) { clearInterval(tid); timers.delete(tid); tid = null; }
      setBestIf("truefalse", score, (a, b) => a > b);
      resultScreen(mount, { title: "Verdadero o Falso", big: score + "/" + items.length, stats: "aciertos", best: "Mejor marca: " + getBest("truefalse") + " aciertos", again: () => start() });
    }
    function start() { i = 0; score = 0; timeLeft = 60; stopAll(); paint(); tickClock(); }
    start();
  }

  window.Games = {
    output, trace, memo, types, format, order, bug, hangman, connect, ascii: asciiGame, truefalse,
    stopAll, getBest
  };
})();
