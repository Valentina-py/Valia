/* ============================================================
   JUEGOS DE APRENDIZAJE — Fundamentos de la Programación
   evalbool · vof · gate · binary · trace · spot · order · memo · hangman · connect
   Cada juego guarda su mejor marca en localStorage.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- utilidades ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function render(el) { if (window.MathJaxRender) window.MathJaxRender(el); }
  function fmtTime(s) { const m = Math.floor(s / 60), r = s % 60; return m + ":" + String(r).padStart(2, "0"); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------------- timers (se limpian al navegar) ---------------- */
  let intervals = [], timeouts = [];
  function every(fn, ms) { const id = setInterval(fn, ms); intervals.push(id); return id; }
  function after(fn, ms) { const id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function stopAll() { intervals.forEach(clearInterval); timeouts.forEach(clearTimeout); intervals = []; timeouts = []; }

  /* ---------------- mejores marcas ---------------- */
  const GKEY = "estudioProg.games.v1";
  function loadG() { try { return JSON.parse(localStorage.getItem(GKEY)) || {}; } catch { return {}; } }
  function saveG(o) { try { localStorage.setItem(GKEY, JSON.stringify(o)); } catch { } }
  function getBest(id) { return loadG()[id]; }
  function setBest(id, val) { const o = loadG(); o[id] = val; saveG(o); }
  function recordHigh(id, score) { const b = getBest(id); if (b == null || score > b) setBest(id, score); }
  function recordLow(id, key, val) { const b = getBest(id); if (b == null || val < b[key]) setBest(id, { [key]: val }); }

  /* ---------------- helpers de UI ---------------- */
  function shell(container, hudHTML) {
    container.innerHTML = `<div class="game"><div class="game-hud">${hudHTML}</div><div class="game-body" id="gbody"></div></div>`;
    return container.querySelector("#gbody");
  }
  function hudTimer(label) {
    return `<div class="game-hud__item game-hud__item--grow"><span class="game-hud__label">${label}</span>
      <div class="game-timer"><span id="g-timebar"></span></div></div>`;
  }
  function hudVal(label, id, val) { return `<div class="game-hud__item"><span class="game-hud__label">${label}</span><span class="game-hud__val" id="${id}">${val}</span></div>`; }
  function resultScreen(container, title, statsHTML, bestHTML) {
    container.innerHTML = `<div class="card center game-result">
      <div class="game-result__title">${title}</div>
      <div class="game-result__stats">${statsHTML}</div>
      ${bestHTML ? `<div class="game-result__best">${bestHTML}</div>` : ""}
      <div class="btn-row" style="justify-content:center;margin-top:6px">
        <button class="btn btn--primary" id="g-replay">Jugar de nuevo</button>
        <a class="btn" href="#/games">Otros juegos</a></div></div>`;
    render(container);
    return container.querySelector("#g-replay");
  }
  function feedback(body) {
    let fb = body.querySelector("#g-fb");
    if (!fb) { fb = document.createElement("div"); fb.id = "g-fb"; fb.className = "game-feedback"; body.appendChild(fb); }
    return fb;
  }
  function showFb(fb, ok, html) { fb.className = "game-feedback show " + (ok ? "ok" : "no"); fb.innerHTML = html; render(fb); }

  /* ============================================================
     1) EVALUÁ LA EXPRESIÓN BOOLEANA  (contrarreloj 60s)
     ============================================================ */
  const BOOL_EXPR = [
    { tex: "a + b", fn: (a, b) => a | b },
    { tex: "a \\cdot b", fn: (a, b) => a & b },
    { tex: "\\overline{a}", fn: (a) => a ? 0 : 1 },
    { tex: "a + \\overline{b}", fn: (a, b) => a | (b ? 0 : 1) },
    { tex: "\\overline{a} \\cdot b", fn: (a, b) => (a ? 0 : 1) & b },
    { tex: "a + b \\cdot c", fn: (a, b, c) => a | (b & c) },
    { tex: "(a + b) \\cdot c", fn: (a, b, c) => (a | b) & c },
    { tex: "a \\cdot b + c", fn: (a, b, c) => (a & b) | c },
    { tex: "a + \\overline{a} \\cdot b", fn: (a, b) => a | ((a ? 0 : 1) & b) },
    { tex: "\\overline{a \\cdot b}", fn: (a, b) => (a & b) ? 0 : 1 },
    { tex: "\\overline{a} + \\overline{b}", fn: (a, b) => (a ? 0 : 1) | (b ? 0 : 1) },
    { tex: "\\overline{a} \\cdot b + a \\cdot \\overline{b}", fn: (a, b) => ((a ? 0 : 1) & b) | (a & (b ? 0 : 1)) },
  ];
  function gEvalBool(container) {
    let score = 0, time = 60, done = false;
    const body = shell(container, hudVal("Aciertos", "g-score", 0) + hudVal("Tiempo", "g-time", "1:00") + hudTimer("Resolvé rápido"));
    const timeEl = container.querySelector("#g-time"), bar = container.querySelector("#g-timebar"), scoreEl = container.querySelector("#g-score");
    every(() => { if (done) return; time--; timeEl.textContent = fmtTime(time); bar.style.width = (time / 60 * 100) + "%"; if (time <= 0) finish(); }, 1000);

    function q() {
      const e = pick(BOOL_EXPR);
      const a = Math.round(Math.random()), b = Math.round(Math.random()), c = Math.round(Math.random());
      const ans = e.fn(a, b, c) ? 1 : 0;
      const vars = e.tex.includes("c") ? `a=${a},\\ b=${b},\\ c=${c}` : e.tex.includes("b") ? `a=${a},\\ b=${b}` : `a=${a}`;
      body.innerHTML = `<div class="big-q">\\(${e.tex}\\)<small>con \\(${vars}\\)</small></div>
        <div class="opt-grid"><button class="btn opt-btn mono" data-v="0">0</button><button class="btn opt-btn mono" data-v="1">1</button></div>`;
      render(body);
      const fb = feedback(body);
      body.querySelectorAll(".opt-btn").forEach(btn => btn.addEventListener("click", () => {
        if (done) return;
        const v = +btn.dataset.v;
        if (v === ans) { score++; scoreEl.textContent = score; showFb(fb, true, "¡Correcto!"); }
        else { showFb(fb, false, `Era <strong>${ans}</strong>.`); }
        after(q, 650);
      }));
    }
    function finish() {
      done = true; stopAll(); recordHigh("evalbool", score);
      const r = resultScreen(container, "¡Tiempo!", `Resolviste <span class="game-result__big">${score}</span> expresiones correctas.`, `Mejor marca: ${getBest("evalbool")} aciertos`);
      r.addEventListener("click", () => gEvalBool(container));
    }
    q();
  }

  /* ============================================================
     2) VERDADERO O FALSO  (leyes de Boole, contrarreloj 60s)
     ============================================================ */
  const VOF = [
    { t: "\\(a + \\overline{a} = 1\\)", v: true },
    { t: "\\(a \\cdot \\overline{a} = 1\\)", v: false, e: "Es 0." },
    { t: "\\(a + 1 = a\\)", v: false, e: "Es 1 (absorción)." },
    { t: "\\(a \\cdot 1 = a\\)", v: true },
    { t: "\\(a + 0 = a\\)", v: true },
    { t: "En la suma lógica, \\(1 + 1 = 1\\)", v: true },
    { t: "El complemento de 0 es 1", v: true },
    { t: "El neutro de la suma lógica es 1", v: false, e: "Es 0." },
    { t: "\\(\\overline{a \\cdot b} = \\overline{a} + \\overline{b}\\)", v: true },
    { t: "\\(a + a = 2a\\)", v: false, e: "Es a (idempotencia)." },
    { t: "\\(a \\cdot (b + c) = ab + ac\\)", v: true },
    { t: "En Boole, \\(a + bc = (a+b)(a+c)\\)", v: true },
    { t: "\\(0 \\cdot 1 = 1\\)", v: false, e: "Es 0." },
    { t: "\\(a \\cdot a = a\\)", v: true },
    { t: "El neutro del producto lógico es 1", v: true },
  ];
  function gVof(container) {
    let score = 0, time = 60, done = false, pool = shuffle(VOF), idx = 0;
    const body = shell(container, hudVal("Aciertos", "g-score", 0) + hudVal("Tiempo", "g-time", "1:00") + hudTimer("¿V o F?"));
    const timeEl = container.querySelector("#g-time"), bar = container.querySelector("#g-timebar"), scoreEl = container.querySelector("#g-score");
    every(() => { if (done) return; time--; timeEl.textContent = fmtTime(time); bar.style.width = (time / 60 * 100) + "%"; if (time <= 0) finish(); }, 1000);
    function q() {
      if (idx >= pool.length) { pool = shuffle(VOF); idx = 0; }
      const item = pool[idx++];
      body.innerHTML = `<div class="vof-statement">${item.t}</div>
        <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-v="1">Verdadero</button><button class="btn vof-btn vof-btn--f" data-v="0">Falso</button></div>`;
      render(body);
      const fb = feedback(body);
      body.querySelectorAll(".vof-btn").forEach(btn => btn.addEventListener("click", () => {
        if (done) return;
        const ok = (!!+btn.dataset.v) === item.v;
        if (ok) { score++; scoreEl.textContent = score; showFb(fb, true, "¡Bien!"); }
        else { showFb(fb, false, `Era <strong>${item.v ? "Verdadero" : "Falso"}</strong>. ${item.e || ""}`); }
        after(q, 700);
      }));
    }
    function finish() { done = true; stopAll(); recordHigh("vof", score); resultScreen(container, "¡Tiempo!", `Acertaste <span class="game-result__big">${score}</span>.`, `Mejor marca: ${getBest("vof")} aciertos`).addEventListener("click", () => gVof(container)); }
    q();
  }

  /* ============================================================
     3) ADIVINÁ LA COMPUERTA  (3 vidas)
     ============================================================ */
  const GATES = [
    { name: "AND", out: [0, 0, 0, 1] },
    { name: "OR", out: [0, 1, 1, 1] },
    { name: "XOR", out: [0, 1, 1, 0] },
    { name: "NAND", out: [1, 1, 1, 0] },
    { name: "NOR", out: [1, 0, 0, 0] },
    { name: "XNOR", out: [1, 0, 0, 1] },
  ];
  function gGate(container) {
    let score = 0, lives = 3, done = false;
    const body = shell(container, hudVal("Aciertos", "g-score", 0) + hudVal("Vidas", "g-lives", "❤❤❤"));
    const scoreEl = container.querySelector("#g-score"), livesEl = container.querySelector("#g-lives");
    function q() {
      const g = pick(GATES);
      const rows = [[0, 0], [0, 1], [1, 0], [1, 1]].map((r, i) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="${g.out[i] ? "v-true" : "v-false"}"><strong>${g.out[i]}</strong></td></tr>`).join("");
      const opts = shuffle([g.name, ...shuffle(GATES.filter(x => x.name !== g.name)).slice(0, 3).map(x => x.name)]);
      body.innerHTML = `<p class="game-ask">¿Qué compuerta lógica produce esta tabla?</p>
        <div class="tbl-wrap"><table class="tbl" style="max-width:260px;margin:auto"><thead><tr><th>a</th><th>b</th><th>salida</th></tr></thead><tbody>${rows}</tbody></table></div>
        <div class="opt-grid cols4" style="margin-top:14px">${opts.map(o => `<button class="btn opt-btn" data-n="${o}">${o}</button>`).join("")}</div>`;
      const fb = feedback(body);
      body.querySelectorAll(".opt-btn").forEach(btn => btn.addEventListener("click", () => {
        if (done) return;
        body.querySelectorAll(".opt-btn").forEach(b => b.disabled = true);
        if (btn.dataset.n === g.name) { score++; scoreEl.textContent = score; btn.classList.add("correct"); showFb(fb, true, "¡Correcto!"); after(q, 650); }
        else {
          btn.classList.add("wrong");
          body.querySelector(`.opt-btn[data-n="${g.name}"]`).classList.add("correct");
          lives--; livesEl.textContent = "❤".repeat(lives) || "—";
          showFb(fb, false, `Era <strong>${g.name}</strong>.`);
          if (lives <= 0) after(finish, 900); else after(q, 1000);
        }
      }));
    }
    function finish() { done = true; recordHigh("gate", score); resultScreen(container, "Fin del juego", `Reconociste <span class="game-result__big">${score}</span> compuertas.`, `Mejor marca: ${getBest("gate")} aciertos`).addEventListener("click", () => gGate(container)); }
    q();
  }

  /* ============================================================
     4) BINARIO → DECIMAL  (contrarreloj 60s)
     ============================================================ */
  function gBinary(container) {
    let score = 0, time = 60, done = false;
    const body = shell(container, hudVal("Aciertos", "g-score", 0) + hudVal("Tiempo", "g-time", "1:00") + hudTimer("Convertí rápido"));
    const timeEl = container.querySelector("#g-time"), bar = container.querySelector("#g-timebar"), scoreEl = container.querySelector("#g-score");
    every(() => { if (done) return; time--; timeEl.textContent = fmtTime(time); bar.style.width = (time / 60 * 100) + "%"; if (time <= 0) finish(); }, 1000);
    function q() {
      const bits = 3 + Math.floor(Math.random() * 3); // 3..5 bits
      const val = 1 + Math.floor(Math.random() * ((1 << bits) - 1));
      const bin = val.toString(2).padStart(bits, "0");
      const opts = new Set([val]);
      while (opts.size < 4) { const d = val + (Math.floor(Math.random() * 9) - 4); if (d >= 0 && d !== val) opts.add(d); }
      body.innerHTML = `<div class="big-q">${bin}<sub style="font-size:14px">(2)</sub><small>¿Cuánto vale en decimal?</small></div>
        <div class="opt-grid">${shuffle([...opts]).map(o => `<button class="btn opt-btn mono" data-v="${o}">${o}</button>`).join("")}</div>`;
      const fb = feedback(body);
      body.querySelectorAll(".opt-btn").forEach(btn => btn.addEventListener("click", () => {
        if (done) return;
        if (+btn.dataset.v === val) { score++; scoreEl.textContent = score; showFb(fb, true, "¡Correcto!"); }
        else { showFb(fb, false, `Era <strong>${val}</strong>.`); }
        after(q, 600);
      }));
    }
    function finish() { done = true; stopAll(); recordHigh("binary", score); resultScreen(container, "¡Tiempo!", `Convertiste <span class="game-result__big">${score}</span> números.`, `Mejor marca: ${getBest("binary")} aciertos`).addEventListener("click", () => gBinary(container)); }
    q();
  }

  /* ============================================================
     5) TRAZÁ LA SALIDA  (3 vidas)
     ============================================================ */
  const TRACE = [
    { code: `Para i ← 1 Hasta 3 Hacer\n  Escribir i\nFinPara`, q: "¿Qué imprime?", opts: ["1 2 3", "1 2 3 4", "3 2 1", "0 1 2"], a: 0 },
    { code: `x ← 5\nx ← x + 3\nEscribir x`, q: "¿Qué imprime?", opts: ["5", "3", "8", "53"], a: 2 },
    { code: `suma ← 0\nPara i ← 1 Hasta 4 Hacer\n  suma ← suma + i\nFinPara\nEscribir suma`, q: "¿Qué imprime?", opts: ["4", "10", "24", "6"], a: 1 },
    { code: `Para i ← 1 Hasta 5 Con Paso 2 Hacer\n  Escribir i\nFinPara`, q: "¿Qué imprime?", opts: ["1 2 3 4 5", "1 3 5", "2 4", "1 5"], a: 1 },
    { code: `a ← 2\nb ← 3\nEscribir a * b + 1`, q: "¿Qué imprime?", opts: ["7", "8", "12", "6"], a: 0 },
    { code: `x ← 7\nSi x mod 2 = 0 Entonces\n  Escribir "par"\nSino\n  Escribir "impar"\nFinSi`, q: "¿Qué imprime?", opts: ["par", "impar", "7", "0"], a: 1 },
    { code: `cont ← 0\nPara i ← 1 Hasta 6 Hacer\n  Si i mod 2 = 0 Entonces\n    cont ← cont + 1\n  FinSi\nFinPara\nEscribir cont`, q: "¿Qué imprime?", opts: ["6", "2", "3", "4"], a: 2 },
    { code: `n ← 10\nMientras n > 0 Hacer\n  n ← n - 3\nFinMientras\nEscribir n`, q: "¿Qué imprime al final?", opts: ["0", "1", "-2", "10"], a: 2 },
    { code: `r ← 1\nPara i ← 1 Hasta 4 Hacer\n  r ← r * 2\nFinPara\nEscribir r`, q: "¿Qué imprime?", opts: ["8", "16", "24", "6"], a: 1 },
    { code: `Escribir 17 div 5\nEscribir 17 mod 5`, q: "¿Qué imprime (en dos líneas)?", opts: ["3 y 2", "2 y 3", "3.4 y 0", "5 y 2"], a: 0 },
  ];
  function gTrace(container) {
    let score = 0, lives = 3, done = false, pool = shuffle(TRACE), idx = 0;
    const body = shell(container, hudVal("Aciertos", "g-score", 0) + hudVal("Vidas", "g-lives", "❤❤❤"));
    const scoreEl = container.querySelector("#g-score"), livesEl = container.querySelector("#g-lives");
    function q() {
      if (idx >= pool.length) { pool = shuffle(TRACE); idx = 0; }
      const it = pool[idx++];
      body.innerHTML = `<div class="code-box">${esc(it.code)}</div><p class="game-ask">${it.q}</p>
        <div class="opt-grid">${it.opts.map((o, k) => `<button class="btn opt-btn mono" data-k="${k}">${esc(o)}</button>`).join("")}</div>`;
      const fb = feedback(body);
      body.querySelectorAll(".opt-btn").forEach(btn => btn.addEventListener("click", () => {
        if (done) return;
        body.querySelectorAll(".opt-btn").forEach(b => b.disabled = true);
        if (+btn.dataset.k === it.a) { score++; scoreEl.textContent = score; btn.classList.add("correct"); showFb(fb, true, "¡Correcto!"); after(q, 650); }
        else {
          btn.classList.add("wrong");
          body.querySelectorAll(".opt-btn")[it.a].classList.add("correct");
          lives--; livesEl.textContent = "❤".repeat(lives) || "—";
          showFb(fb, false, `Era <strong>${esc(it.opts[it.a])}</strong>.`);
          if (lives <= 0) after(finish, 1000); else after(q, 1100);
        }
      }));
    }
    function finish() { done = true; recordHigh("trace", score); resultScreen(container, "Fin del juego", `Trazaste <span class="game-result__big">${score}</span> programas.`, `Mejor marca: ${getBest("trace")} aciertos`).addEventListener("click", () => gTrace(container)); }
    q();
  }

  /* ============================================================
     6) CAZÁ EL ERROR  (¿bien o tiene un error?, 3 vidas)
     ============================================================ */
  const SPOT = [
    { desc: "Sumar 1 a un contador", code: "cont ← cont + 1", ok: true, e: "Así se incrementa un contador." },
    { desc: "Inicializar el acumulador de un factorial", code: "fact ← 0", ok: false, e: "Debe arrancar en 1, no en 0 (es un producto)." },
    { desc: "Recorrer un vector de N elementos (índice desde 0)", code: "Para i ← 0 Hasta N Hacer", ok: false, e: "Debe ser Hasta N − 1; con N se sale del vector." },
    { desc: "Saber si n es par", code: "Si n mod 2 = 0 Entonces", ok: true, e: "El resto 0 al dividir por 2 indica par." },
    { desc: "Intercambiar los valores de a y b", code: "a ← b\nb ← a", ok: false, e: "Falta la variable auxiliar: se pierde el valor de a." },
    { desc: "Calcular el promedio", code: "prom ← suma / N", ok: true, e: "Promedio = suma / cantidad." },
    { desc: "Permitir el voto (mayor o igual a 18)", code: "Si edad > 18 Entonces", ok: false, e: "Debería ser >= 18; con > deja afuera a los de 18." },
    { desc: "Obtener el último dígito de n", code: "d ← n mod 10", ok: true, e: "El resto entre 10 es el último dígito." },
    { desc: "Quitar el último dígito de n", code: "n ← n / 10", ok: false, e: "Debe ser n div 10 (división entera), no /." },
    { desc: "Contar de 1 a 5", code: "Para i ← 1 Hasta 5 Hacer", ok: true, e: "Repite 5 veces, de 1 a 5." },
    { desc: "Acumular una suma de valores", code: "suma ← suma + v[i]", ok: true, e: "Acumulador correcto." },
    { desc: "Condición de un Mientras para repetir hasta 0", code: "Mientras n = 0 Hacer", ok: false, e: "Debería ser n <> 0 (o n > 0); así no entra nunca." },
  ];
  function gSpot(container) {
    let score = 0, lives = 3, done = false, pool = shuffle(SPOT), idx = 0;
    const body = shell(container, hudVal("Aciertos", "g-score", 0) + hudVal("Vidas", "g-lives", "❤❤❤"));
    const scoreEl = container.querySelector("#g-score"), livesEl = container.querySelector("#g-lives");
    function q() {
      if (idx >= pool.length) { pool = shuffle(SPOT); idx = 0; }
      const it = pool[idx++];
      body.innerHTML = `<p class="game-ask">Objetivo: <strong>${it.desc}</strong></p><div class="code-box">${esc(it.code)}</div>
        <p class="game-ask">¿El código está bien o tiene un error?</p>
        <div class="vof-buttons"><button class="btn vof-btn vof-btn--v" data-v="1">Está bien</button><button class="btn vof-btn vof-btn--f" data-v="0">Tiene un error</button></div>`;
      const fb = feedback(body);
      body.querySelectorAll(".vof-btn").forEach(btn => btn.addEventListener("click", () => {
        if (done) return;
        body.querySelectorAll(".vof-btn").forEach(b => b.disabled = true);
        const said = !!+btn.dataset.v;
        if (said === it.ok) { score++; scoreEl.textContent = score; showFb(fb, true, "¡Correcto! " + it.e); after(q, 1100); }
        else {
          lives--; livesEl.textContent = "❤".repeat(lives) || "—";
          showFb(fb, false, (it.ok ? "En realidad está bien. " : "En realidad tiene un error. ") + it.e);
          if (lives <= 0) after(finish, 1300); else after(q, 1500);
        }
      }));
    }
    function finish() { done = true; recordHigh("spot", score); resultScreen(container, "Fin del juego", `Cazaste <span class="game-result__big">${score}</span> casos.`, `Mejor marca: ${getBest("spot")} aciertos`).addEventListener("click", () => gSpot(container)); }
    q();
  }

  /* ============================================================
     7) ORDENÁ EL ALGORITMO  (pasos desordenados)
     ============================================================ */
  const ORDERS = [
    { title: "Calcular el promedio de N números", steps: ["Inicializar suma ← 0", "Leer los N números y acumular en suma", "promedio ← suma / N", "Mostrar el promedio"] },
    { title: "Intercambiar dos variables a y b", steps: ["aux ← a", "a ← b", "b ← aux"] },
    { title: "Buscar el mayor de un vector", steps: ["mayor ← v[0]", "Recorrer el vector desde i = 1", "Si v[i] > mayor: mayor ← v[i]", "Mostrar mayor"] },
    { title: "Calcular el factorial de n", steps: ["fact ← 1", "Para i ← 1 Hasta n", "fact ← fact * i", "Mostrar fact"] },
    { title: "Fases para resolver un problema", steps: ["Analizar el problema", "Diseñar el algoritmo", "Codificar en un lenguaje", "Probar y depurar"] },
    { title: "Contar pares de un vector", steps: ["cont ← 0", "Recorrer el vector", "Si el elemento es par: cont ← cont + 1", "Mostrar cont"] },
  ];
  function gOrder(container) {
    let rounds = 0, done = false;
    const body = shell(container, hudVal("Resueltos", "g-score", 0));
    const scoreEl = container.querySelector("#g-score");
    function q() {
      const puzzle = pick(ORDERS);
      const correct = puzzle.steps;
      let order = shuffle(correct);
      while (order.join("|") === correct.join("|") && correct.length > 1) order = shuffle(correct);
      let next = 0;
      body.innerHTML = `<p class="game-ask">Ordená los pasos: <strong>${puzzle.title}</strong></p>
        <div class="chain-slots" id="slots">${correct.map((_, i) => `<div class="chain-slot" data-i="${i}"><span class="slot-n">${i + 1}.</span> <span class="slot-txt"></span></div>`).join("")}</div>
        <div class="chain-pool" id="pool">${order.map(s => `<button class="chain-chip" data-s="${esc(s)}">${esc(s)}</button>`).join("")}</div>`;
      const fb = feedback(body);
      const slots = body.querySelectorAll(".chain-slot");
      body.querySelectorAll(".chain-chip").forEach(chip => chip.addEventListener("click", () => {
        if (done) return;
        if (chip.dataset.s === correct[next]) {
          const slot = slots[next];
          slot.classList.add("filled"); slot.querySelector(".slot-txt").textContent = chip.dataset.s;
          chip.remove(); next++;
          if (next === correct.length) { rounds++; scoreEl.textContent = rounds; showFb(fb, true, "¡Secuencia correcta! 🎉"); after(q, 1100); }
        } else {
          chip.classList.add("shake"); after(() => chip.classList.remove("shake"), 400);
          showFb(fb, false, "Ese no es el siguiente paso.");
        }
      }));
    }
    q();
    // botón terminar
    container.querySelector(".game-hud").insertAdjacentHTML("beforeend", `<button class="btn" id="g-end" style="margin-left:auto">Terminar</button>`);
    container.querySelector("#g-end").addEventListener("click", () => { done = true; recordHigh("order", rounds); resultScreen(container, "¡Bien hecho!", `Ordenaste <span class="game-result__big">${rounds}</span> algoritmos.`, `Mejor marca: ${getBest("order")} resueltos`).addEventListener("click", () => gOrder(container)); });
  }

  /* ============================================================
     8) MEMOTEST  (emparejar ley ↔ fórmula)
     ============================================================ */
  const MEMO_PAIRS = [
    ["De Morgan", "\\overline{a+b}=\\overline{a}\\,\\overline{b}"],
    ["Idempotencia", "a+a=a"],
    ["Absorción", "a+1=1"],
    ["Complemento", "a+\\overline{a}=1"],
    ["Neutro suma", "a+0=a"],
    ["Neutro producto", "a\\cdot 1=a"],
    ["Involución", "\\overline{\\overline{a}}=a"],
    ["Redundancia", "a+ab=a"],
  ];
  function gMemo(container) {
    const pairs = shuffle(MEMO_PAIRS).slice(0, 6);
    const cards = [];
    pairs.forEach((p, i) => { cards.push({ id: i, txt: p[0], tex: false }); cards.push({ id: i, txt: p[1], tex: true }); });
    const deck = shuffle(cards);
    let first = null, lock = false, moves = 0, matched = 0;
    const body = shell(container, hudVal("Movimientos", "g-score", 0) + hudVal("Pares", "g-pairs", `0/${pairs.length}`));
    const movesEl = container.querySelector("#g-score"), pairsEl = container.querySelector("#g-pairs");
    body.innerHTML = `<div class="memo-grid">${deck.map((c, i) => `
      <button class="memo-card" data-i="${i}" data-id="${c.id}">
        <span class="memo-card__face memo-card__cover">?</span>
        <span class="memo-card__face memo-card__content">${c.tex ? "\\(" + c.txt + "\\)" : esc(c.txt)}</span>
      </button>`).join("")}</div>`;
    render(body);
    body.querySelectorAll(".memo-card").forEach(card => card.addEventListener("click", () => {
      if (lock || card.classList.contains("is-flipped") || card.classList.contains("is-matched")) return;
      card.classList.add("is-flipped");
      if (!first) { first = card; return; }
      moves++; movesEl.textContent = moves; lock = true;
      if (first.dataset.id === card.dataset.id && first !== card) {
        first.classList.add("is-matched"); card.classList.add("is-matched");
        matched++; pairsEl.textContent = `${matched}/${pairs.length}`;
        first = null; lock = false;
        if (matched === pairs.length) after(() => { recordLow("memo", "moves", moves); resultScreen(container, "¡Completado!", `Lo lograste en <span class="game-result__big">${moves}</span> movimientos.`, bestMovesText()).addEventListener("click", () => gMemo(container)); }, 600);
      } else {
        after(() => { first.classList.remove("is-flipped"); card.classList.remove("is-flipped"); first = null; lock = false; }, 850);
      }
    }));
    function bestMovesText() { const b = getBest("memo"); return b && b.moves != null ? `Mejor marca: ${b.moves} movimientos` : ""; }
  }

  /* ============================================================
     9) AHORCADO  (vocabulario de programación)
     ============================================================ */
  const HANG = [
    ["ALGORITMO", "Secuencia finita y ordenada de pasos"],
    ["VARIABLE", "Espacio de memoria cuyo valor puede cambiar"],
    ["VECTOR", "Colección homogénea accesible por índice"],
    ["BUCLE", "Estructura que repite instrucciones"],
    ["CONDICION", "Lo que evalúa un Si para decidir"],
    ["BOOLEANO", "Tipo de dato verdadero / falso"],
    ["ITERACION", "Cada repetición de un bucle"],
    ["FUNCION", "Bloque de código reutilizable"],
    ["ENTERO", "Tipo de dato numérico sin decimales"],
    ["OPERADOR", "Símbolo como +, mod o Y"],
    ["KARNAUGH", "Mapa para minimizar funciones booleanas"],
    ["COMPLEMENTO", "Operación que invierte 0 y 1"],
    ["CONTADOR", "Variable que cuenta cuántas veces pasa algo"],
    ["ACUMULADOR", "Variable que va sumando valores"],
    ["ARREGLO", "Otro nombre para un vector"],
  ];
  const ABC = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  function hangSvg(err) {
    const parts = [
      '<line x1="10" y1="98" x2="80" y2="98"/>', '<line x1="30" y1="98" x2="30" y2="8"/>',
      '<line x1="30" y1="8" x2="75" y2="8"/>', '<line x1="75" y1="8" x2="75" y2="22"/>',
      '<circle cx="75" cy="30" r="8"/>', '<line x1="75" y1="38" x2="75" y2="62"/>',
      '<line x1="75" y1="45" x2="63" y2="55"/><line x1="75" y1="45" x2="87" y2="55"/>',
      '<line x1="75" y1="62" x2="64" y2="78"/><line x1="75" y1="62" x2="86" y2="78"/>'
    ];
    return `<svg class="hang-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">${parts.slice(0, Math.min(err + 3, parts.length)).join("")}</svg>`;
  }
  function gHangman(container) {
    let streak = 0;
    function round() {
      const [word, hint] = pick(HANG);
      let err = 0; const maxErr = 6; const guessed = new Set(); let done = false;
      const body = shell(container, hudVal("Racha", "g-score", streak));
      function paint() {
        const reveal = word.split("").map(ch => guessed.has(ch) ? ch : "").join("");
        const won = word.split("").every(ch => guessed.has(ch));
        body.innerHTML = `
          <div class="hang-top">${hangSvg(err)}<div><div class="game-hud__label">Pista</div><div class="hang-hint">${hint}</div>
            <div class="muted" style="font-size:12px;margin-top:6px">Errores: ${err}/${maxErr}</div></div></div>
          <div class="hang-word">${word.split("").map(ch => `<span class="hang-letter">${guessed.has(ch) ? ch : ""}</span>`).join("")}</div>
          <div class="hang-keys">${ABC.map(l => `<button class="hang-key" data-l="${l}" ${guessed.has(l) ? "disabled" : ""}>${l}</button>`).join("")}</div>`;
        const fb = feedback(body);
        if (won) { done = true; streak++; showFb(fb, true, "¡Adivinaste! 🎉"); recordHigh("hangman", streak); after(round, 1100); return; }
        if (err >= maxErr) { done = true; showFb(fb, false, `Perdiste. Era <strong>${word}</strong>.`); recordHigh("hangman", streak); after(() => { resultScreen(container, "Fin del juego", `Racha final: <span class="game-result__big">${streak}</span> palabras.`, `Mejor racha: ${getBest("hangman") || 0}`).addEventListener("click", () => { streak = 0; gHangman(container); }); }, 1300); return; }
        body.querySelectorAll(".hang-key").forEach(b => b.addEventListener("click", () => {
          if (done) return;
          const l = b.dataset.l; guessed.add(l);
          if (word.includes(l)) b.classList.add("hit"); else { b.classList.add("miss"); err++; }
          paint();
        }));
      }
      paint();
    }
    round();
  }

  /* ============================================================
     10) CONECTÁ  (término ↔ valor / ejemplo)
     ============================================================ */
  const CONNECT = [
    ["Tipo entero", "-7"],
    ["Tipo real", "3.14"],
    ["Tipo cadena", '"Hola"'],
    ["Tipo lógico", "verdadero"],
    ["17 mod 5", "2"],
    ["17 div 5", "3"],
    ["2 ^ 3", "8"],
    ["Neutro de la suma lógica", "0"],
    ["Neutro del producto lógico", "1"],
    ["1011 en binario", "11"],
  ];
  function gConnect(container) {
    let round = 0, mistakes = 0, done = false; const TOTAL = 3;
    function play() {
      const set = shuffle(CONNECT).slice(0, 5);
      const left = set.map((p, i) => ({ i, t: p[0] }));
      const right = shuffle(set.map((p, i) => ({ i, t: p[1] })));
      let sel = null, matched = 0;
      const body = shell(container, hudVal("Ronda", "g-round", `${round + 1}/${TOTAL}`) + hudVal("Errores", "g-mis", mistakes));
      const misEl = container.querySelector("#g-mis");
      body.innerHTML = `<p class="game-ask">Tocá un concepto y luego su valor correspondiente.</p>
        <div class="connect-cols">
          <div class="connect-col">${left.map(o => `<button class="connect-item" data-side="L" data-i="${o.i}">${esc(o.t)}</button>`).join("")}</div>
          <div class="connect-col">${right.map(o => `<button class="connect-item mono" data-side="R" data-i="${o.i}">${esc(o.t)}</button>`).join("")}</div>
        </div>`;
      const fb = feedback(body);
      body.querySelectorAll(".connect-item").forEach(it => it.addEventListener("click", () => {
        if (done || it.classList.contains("matched")) return;
        if (!sel) { sel = it; it.classList.add("sel"); return; }
        if (sel === it) { sel.classList.remove("sel"); sel = null; return; }
        if (sel.dataset.side === it.dataset.side) { sel.classList.remove("sel"); sel = it; it.classList.add("sel"); return; }
        if (sel.dataset.i === it.dataset.i) {
          sel.classList.remove("sel"); sel.classList.add("matched"); it.classList.add("matched"); sel = null; matched++;
          if (matched === set.length) {
            round++;
            if (round >= TOTAL) { done = true; recordLow("connect", "mistakes", mistakes); after(() => { resultScreen(container, "¡Completado!", `Terminaste con <span class="game-result__big">${mistakes}</span> errores.`, bestMis()).addEventListener("click", () => gConnect(container)); }, 500); }
            else { container.querySelector("#g-round").textContent = `${round + 1}/${TOTAL}`; showFb(fb, true, "¡Ronda completa!"); after(play, 800); }
          }
        } else {
          mistakes++; misEl.textContent = mistakes;
          const a = sel, b = it; a.classList.add("bad"); b.classList.add("bad"); a.classList.remove("sel"); sel = null;
          showFb(fb, false, "No coinciden.");
          after(() => { a.classList.remove("bad"); b.classList.remove("bad"); }, 500);
        }
      }));
    }
    function bestMis() { const b = getBest("connect"); return b && b.mistakes != null ? `Mejor marca: ${b.mistakes} errores` : ""; }
    play();
  }

  /* ---------------- registro ---------------- */
  window.Games = {
    stopAll, getBest,
    evalbool: gEvalBool, vof: gVof, gate: gGate, binary: gBinary, trace: gTrace,
    spot: gSpot, order: gOrder, memo: gMemo, hangman: gHangman, connect: gConnect
  };
})();
