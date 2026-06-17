/* ============================================================
   HERRAMIENTAS — Teoría de Números
   - division: cociente y resto en ℤ (resto siempre ≥ 0, 4 casos)
   - criba: Criba de Eratóstenes hasta M
   - euclides: MCD (Euclides), Bézout (tabla st) y factorización (TFA)
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  /* ---------- utilidades aritméticas ---------- */
  function crEnteros(a, b) {
    // a = b*c + r con 0 <= r < |b|  (resto entero siempre >= 0)
    if (b === 0) return null;
    let c = Math.trunc(a / b);
    let r = a - b * c;
    if (r < 0) {
      // ajustar manteniendo a = b*c + r con r >= 0
      if (b > 0) { c -= 1; r += b; }     // c' = c-1, r' = r+b
      else { c += 1; r -= b; }           // c' = c+1, r' = r+|b|
    }
    return { c, r };
  }
  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
  function st(a, b) {
    // devuelve {s,t,g} con s*a + t*b = g = mcd(a,b); registra filas
    const rows = [];
    function rec(a, b) {
      if (b === 0) { rows.push({ a, b, c: "—", r: "—", s: 1, t: 0 }); return { s: 1, t: 0 }; }
      const c = Math.floor(a / b), r = a - b * c;
      const sub = rec(b, r);
      const s = sub.t, t = sub.s - sub.t * c;
      rows.push({ a, b, c, r, s, t });
      return { s, t };
    }
    const res = rec(a, b);
    rows.reverse();
    return { s: res.s, t: res.t, g: res.s * a + res.t * b, rows };
  }
  function isPrime(n) {
    n = Math.abs(n);
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 === 0) return false;
    for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return false;
    return true;
  }
  function factorize(n) {
    n = Math.abs(n); const f = [];
    for (let p = 2; p * p <= n; p++) {
      let q = 0; while (n % p === 0) { n /= p; q++; }
      if (q) f.push([p, q]);
    }
    if (n > 1) f.push([n, 1]);
    return f;
  }

  /* ============================================================
     TOOL: división entera en ℤ
     ============================================================ */
  Tools.division = function (container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field"><label>Dividendo a (puede ser negativo)</label><input class="input input--mono" id="dv-a" value="-23" /></div>
          <div class="field"><label>Divisor b (≠ 0)</label><input class="input input--mono" id="dv-b" value="2" /></div>
        </div>
        <div class="btn-row"><button class="btn btn--primary" id="dv-go">Calcular</button></div>
        <div id="dv-out"></div>
      </div>`;
    const $ = s => container.querySelector(s), out = $("#dv-out");
    function run() {
      const a = parseInt($("#dv-a").value, 10), b = parseInt($("#dv-b").value, 10);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return out.innerHTML = `<div class="error-text">Ingresá enteros válidos.</div>`;
      if (b === 0) return out.innerHTML = `<div class="error-text">El divisor no puede ser 0.</div>`;
      const { c, r } = crEnteros(a, b);
      const jsRem = a % b;
      out.innerHTML = `
        <div class="result-box"><strong>${a} = ${b}·(${c}) + ${r}</strong><br>
          Cociente entero <strong>c = ${c}</strong> · Resto entero <strong>r = ${r}</strong> &nbsp;(con 0 ≤ r &lt; |${b}| = ${Math.abs(b)})</div>
        <div class="callout ${jsRem !== r ? "warn" : "tip"}">
          <strong class="callout__tag">Comparación con %</strong>
          El operador <code>%</code> de JavaScript da <code>${a} % ${b} = ${jsRem}</code>.
          ${jsRem === r ? "Acá coincide con el resto entero." : `<strong>No coincide</strong> con el resto entero (${r}) porque <code>%</code> trunca hacia 0 y puede dar un resto negativo; el resto entero matemático es siempre ≥ 0.`}
        </div>
        <p class="viz-hint">Verificación: ${b}·${c} = ${b * c}, y ${b * c} + ${r} = ${b * c + r} = ${a}. ✓</p>`;
    }
    $("#dv-go").addEventListener("click", run);
    container.querySelectorAll("input").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") run(); }));
    run();
  };

  /* ============================================================
     TOOL: Criba de Eratóstenes
     ============================================================ */
  Tools.criba = function (container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field"><label>Hasta M (2 a 200)</label><input class="input input--mono" id="cb-m" type="number" value="50" min="2" max="200" /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn--primary" id="cb-go" style="width:100%">Generar criba</button></div>
        </div>
        <div class="btn-row" style="margin-top:0"><button class="btn" id="cb-step">Paso a paso</button><button class="btn" id="cb-all">Completar</button></div>
        <div id="cb-grid" class="cells" style="gap:5px"></div>
        <div id="cb-out"></div>
      </div>`;
    const $ = s => container.querySelector(s), gridEl = $("#cb-grid"), out = $("#cb-out");
    let M = 50, state = [], primesFound = [], cursor = 2, done = false;

    function init() {
      M = Math.max(2, Math.min(200, parseInt($("#cb-m").value, 10) || 50));
      state = new Array(M + 1).fill(1); state[0] = state[1] = 0;
      primesFound = []; cursor = 2; done = false;
      paint(); out.innerHTML = "";
    }
    function paint(active) {
      let h = "";
      for (let i = 2; i <= M; i++) {
        let bg = "var(--surface-2)", col = "var(--text)", bd = "var(--border)";
        if (state[i] === 0) { bg = "var(--bad-soft)"; col = "var(--muted)"; }
        else if (state[i] === 2) { bg = "var(--ok-soft)"; bd = "var(--ok)"; col = "var(--ok)"; }
        if (i === active) bd = "var(--accent)";
        h += `<div class="cell" style="width:38px;height:38px;font-size:14px;background:${bg};color:${col};border-color:${bd}">${i}</div>`;
      }
      gridEl.innerHTML = h;
    }
    function step() {
      if (done) return;
      // próximo i no tachado
      while (cursor <= M && state[cursor] === 0) cursor++;
      if (cursor > M || cursor * cursor > M) {
        // los que quedan en 1 son primos
        for (let i = 2; i <= M; i++) if (state[i] === 1) { state[i] = 2; }
        finish(); return;
      }
      state[cursor] = 2; primesFound.push(cursor);
      for (let j = cursor * 2; j <= M; j += cursor) if (state[j] === 1) state[j] = 0;
      out.innerHTML = `<div class="result-box">Primo <strong>${cursor}</strong>: tacho sus múltiplos (${cursor}², …). ${cursor * cursor > M ? "" : "Sigo, porque " + cursor + "² ≤ " + M + "."}</div>`;
      const wasCursor = cursor; cursor++;
      paint(wasCursor);
    }
    function finish() {
      done = true;
      const primes = [];
      for (let i = 2; i <= M; i++) if (state[i] === 2) primes.push(i);
      paint();
      out.innerHTML = `<div class="result-box" style="border-color:var(--ok)"><strong>Primos hasta ${M} (${primes.length}):</strong><br>${primes.join(", ")}</div>
        <p class="viz-hint">Se detiene cuando i² &gt; M: los números no tachados son todos primos.</p>`;
    }
    function all() { let guard = 0; while (!done && guard++ < 500) step(); }
    $("#cb-go").addEventListener("click", init);
    $("#cb-step").addEventListener("click", step);
    $("#cb-all").addEventListener("click", () => { if (done) init(); all(); });
    init();
  };

  /* ============================================================
     TOOL: MCD (Euclides) · Bézout · Factorización (TFA)
     ============================================================ */
  Tools.euclides = function (container) {
    let tab = "mcd";
    container.innerHTML = `
      <div class="tool">
        <div class="tabs">
          <button class="tab" data-t="mcd">MCD (Euclides)</button>
          <button class="tab" data-t="bezout">Bézout (s,t)</button>
          <button class="tab" data-t="factor">Factorización (TFA)</button>
        </div>
        <div id="eu-ctrl"></div>
        <div id="eu-out"></div>
      </div>`;
    const $ = s => container.querySelector(s), ctrl = $("#eu-ctrl"), out = $("#eu-out");

    function runMcd() {
      ctrl.innerHTML = `<div class="field-row">
          <div class="field"><label>a</label><input class="input input--mono" id="eu-a" value="70" /></div>
          <div class="field"><label>b</label><input class="input input--mono" id="eu-b" value="15" /></div>
        </div><div class="btn-row"><button class="btn btn--primary" id="eu-go">Calcular mcd</button></div>`;
      $("#eu-go").addEventListener("click", () => {
        let a = Math.abs(parseInt($("#eu-a").value, 10)), b = Math.abs(parseInt($("#eu-b").value, 10));
        if (!Number.isFinite(a) || !Number.isFinite(b) || (a === 0 && b === 0)) return out.innerHTML = `<div class="error-text">Ingresá enteros (no ambos 0).</div>`;
        const lines = []; let x = a, y = b;
        while (y) { const c = Math.floor(x / y), r = x - y * c; lines.push(`${x} = ${y}·${c} + ${r}   ⇒   mcd(${x},${y}) = mcd(${y},${r})`); [x, y] = [y, r]; }
        out.innerHTML = `<div class="result-box"><strong>mcd(${a}, ${b}) = ${x}</strong> (último resto no nulo)</div>
          <div class="trace">${lines.join("\n") || "mcd inmediato"}</div>
          ${mcd(a, b) === 1 ? `<div class="callout tip"><strong class="callout__tag">Coprimos</strong>${a} y ${b} son coprimos (mcd = 1).</div>` : ""}`;
      });
      $("#eu-go").click();
    }
    function runBezout() {
      ctrl.innerHTML = `<div class="field-row">
          <div class="field"><label>a</label><input class="input input--mono" id="eu-a" value="18" /></div>
          <div class="field"><label>b</label><input class="input input--mono" id="eu-b" value="24" /></div>
        </div><div class="btn-row"><button class="btn btn--primary" id="eu-go">Calcular Bézout</button></div>`;
      $("#eu-go").addEventListener("click", () => {
        const a = parseInt($("#eu-a").value, 10), b = parseInt($("#eu-b").value, 10);
        if (!Number.isFinite(a) || !Number.isFinite(b)) return out.innerHTML = `<div class="error-text">Ingresá enteros.</div>`;
        const { s, t, g, rows } = st(a, b);
        out.innerHTML = `<div class="result-box"><strong>${s}·${a} + (${t})·${b} = ${g}</strong> = mcd(${a},${b})</div>
          <h3>Tabla del algoritmo extendido</h3>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>a</th><th>b</th><th>c</th><th>r</th><th>s</th><th>t</th></tr></thead>
          <tbody>${rows.map(r => `<tr><td>${r.a}</td><td>${r.b}</td><td>${r.c}</td><td>${r.r}</td><td><strong>${r.s}</strong></td><td><strong>${r.t}</strong></td></tr>`).join("")}</tbody></table></div>
          <p class="viz-hint">Cada fila retorna (t, s − t·c) de la fila siguiente; el caso base (b=0) devuelve (1, 0). Verificación: ${s}·${a} + ${t}·${b} = ${s * a + t * b}. ✓</p>`;
      });
      $("#eu-go").click();
    }
    function runFactor() {
      ctrl.innerHTML = `<div class="field-row">
          <div class="field"><label>Número (2 a 10.000.000)</label><input class="input input--mono" id="eu-n" value="1470" /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn--primary" id="eu-go" style="width:100%">Factorizar</button></div>
        </div>`;
      $("#eu-go").addEventListener("click", () => {
        const n = parseInt($("#eu-n").value, 10);
        if (!Number.isFinite(n) || n < 2 || n > 1e7) return out.innerHTML = `<div class="error-text">Ingresá un entero entre 2 y 10.000.000.</div>`;
        if (isPrime(n)) return out.innerHTML = `<div class="result-box"><strong>${n} es primo.</strong> Su única factorización es ${n} = ${n}.</div>`;
        const f = factorize(n);
        const pretty = f.map(([p, q]) => q === 1 ? `${p}` : `${p}<sup>${q}</sup>`).join(" · ");
        out.innerHTML = `<div class="result-box"><strong>${n} = ${pretty}</strong></div>
          <h3>Factores primos</h3>
          <div class="trace">${f.map(([p, q]) => `${p}  aparece  ${q} ${q === 1 ? "vez" : "veces"}`).join("\n")}</div>
          <p class="viz-hint">Por el Teorema Fundamental de la Aritmética, esta factorización es única salvo el orden.</p>`;
      });
      $("#eu-go").click();
    }
    function setTab(t) {
      tab = t; container.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.t === t));
      ({ mcd: runMcd, bezout: runBezout, factor: runFactor })[t]();
    }
    container.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => setTab(b.dataset.t)));
    setTab("mcd");
  };

  // exporto utilidades para modular.js
  window.NumUtil = { mcd, st, isPrime, factorize, crEnteros };
})();
