/* ============================================================
   HERRAMIENTA — Mapa de Karnaugh (minimizador)
   Tocá las casillas para poner 1 / 0; la herramienta calcula la
   expresión mínima en suma de productos (SOP) con Quine-McCluskey
   y lista los implicantes primos.
   ============================================================ */
(function () {
  "use strict";

  const VARS = ["a", "b", "c", "d"];

  function bitsOf(i, n) {
    const r = [];
    for (let k = n - 1; k >= 0; k--) r.push((i >> k) & 1);
    return r;
  }
  function grayOrder(b) {
    const r = [];
    for (let i = 0; i < (1 << b); i++) r.push(i ^ (i >> 1));
    return r;
  }
  function binStr(val, b) {
    let s = "";
    for (let k = b - 1; k >= 0; k--) s += (val >> k) & 1;
    return s;
  }

  /* -------- Quine-McCluskey -------- */
  function combine(a, b) {
    let diff = -1;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { if (diff !== -1) return null; diff = i; }
    }
    if (diff === -1 || a[diff] === "-" || b[diff] === "-") return null;
    const r = a.slice(); r[diff] = "-"; return r;
  }

  function minimize(minterms, n) {
    if (minterms.length === 0) return { expr: "0", terms: [] };
    if (minterms.length === (1 << n)) return { expr: "1", terms: [] };

    let current = minterms.map(m => ({ bits: bitsOf(m, n).map(String), mins: new Set([m]) }));
    const primes = [];
    while (true) {
      const flags = new Array(current.length).fill(false);
      const seen = new Map();
      const nextLevel = [];
      for (let i = 0; i < current.length; i++) {
        for (let j = i + 1; j < current.length; j++) {
          const c = combine(current[i].bits, current[j].bits);
          if (c) {
            flags[i] = true; flags[j] = true;
            const key = c.join("");
            const union = new Set([...current[i].mins, ...current[j].mins]);
            if (seen.has(key)) { union.forEach(x => seen.get(key).mins.add(x)); }
            else { const obj = { bits: c, mins: union }; seen.set(key, obj); nextLevel.push(obj); }
          }
        }
      }
      current.forEach((t, i) => { if (!flags[i]) primes.push(t); });
      if (nextLevel.length === 0) break;
      current = nextLevel;
    }

    // cobertura: esenciales + greedy
    const chart = new Map();
    minterms.forEach(m => chart.set(m, []));
    primes.forEach((p, pi) => p.mins.forEach(m => { if (chart.has(m)) chart.get(m).push(pi); }));

    const chosen = new Set();
    minterms.forEach(m => { const l = chart.get(m); if (l.length === 1) chosen.add(l[0]); });
    const remaining = new Set(minterms);
    chosen.forEach(pi => primes[pi].mins.forEach(m => remaining.delete(m)));
    while (remaining.size > 0) {
      let best = -1, bestCov = -1;
      primes.forEach((p, pi) => {
        if (chosen.has(pi)) return;
        let cov = 0; p.mins.forEach(m => { if (remaining.has(m)) cov++; });
        if (cov > bestCov) { bestCov = cov; best = pi; }
      });
      if (best === -1) break;
      chosen.add(best);
      primes[best].mins.forEach(m => remaining.delete(m));
    }

    const terms = [...chosen].map(pi => termTex(primes[pi].bits));
    const cover = [...chosen].map(pi => primes[pi].bits.slice());
    return { expr: terms.join(" + "), terms, cover, allPrimes: primes.map(p => termTex(p.bits)) };
  }

  function termTex(bits) {
    const parts = [];
    bits.forEach((b, k) => {
      if (b === "1") parts.push(VARS[k]);
      else if (b === "0") parts.push("\\overline{" + VARS[k] + "}");
    });
    return parts.length ? parts.join("") : "1";
  }

  /* -------- UI -------- */
  function build(container) {
    let n = 3;
    let f = [];

    function defaults() {
      // ejemplo: f = b̄ → minterms 0,1,4,5 en 3 variables
      f = new Array(1 << n).fill(0);
      if (n === 3) [0, 1, 4, 5].forEach(i => f[i] = 1);
    }
    defaults();

    container.innerHTML = `
      <div class="tool">
        <div class="field" style="max-width:260px">
          <label>Cantidad de variables</label>
          <select class="input" id="km-n">
            <option value="2">2 variables (a, b)</option>
            <option value="3" selected>3 variables (a, b, c)</option>
            <option value="4">4 variables (a, b, c, d)</option>
          </select>
        </div>
        <p class="muted" style="font-size:13px">Tocá una casilla para alternar entre <strong>0</strong> y <strong>1</strong>.</p>
        <div id="km-map" style="overflow-x:auto"></div>
        <div class="btn-row">
          <button class="btn" id="km-clear">Vaciar (todo 0)</button>
          <button class="btn" id="km-full">Llenar (todo 1)</button>
        </div>
        <div id="km-out"></div>
      </div>`;

    const sel = container.querySelector("#km-n");
    const mapEl = container.querySelector("#km-map");
    const out = container.querySelector("#km-out");

    function layout() {
      // rowBits / colBits
      const colBits = n <= 2 ? 1 : 2;
      const rowBits = n - colBits;
      return { rowBits, colBits };
    }

    function idxFrom(rv, cv, colBits) { return (rv << colBits) | cv; }

    function paintMap() {
      const { rowBits, colBits } = layout();
      const rowVals = grayOrder(rowBits);
      const colVals = grayOrder(colBits);
      const rowLabel = VARS.slice(0, rowBits).join("");
      const colLabel = VARS.slice(rowBits, n).join("");

      let html = `<table class="kmap-grid"><thead><tr><th class="kmap-corner">${rowLabel}\\${colLabel}</th>`;
      colVals.forEach(cv => { html += `<th class="kmap-axis">${binStr(cv, colBits)}</th>`; });
      html += `</tr></thead><tbody>`;
      rowVals.forEach(rv => {
        html += `<tr><th class="kmap-axis">${binStr(rv, rowBits)}</th>`;
        colVals.forEach(cv => {
          const i = idxFrom(rv, cv, colBits);
          html += `<td class="${f[i] ? "on" : "off"}" data-i="${i}" title="minterm ${i}">${f[i]}</td>`;
        });
        html += `</tr>`;
      });
      html += `</tbody></table>`;
      mapEl.innerHTML = html;
      mapEl.querySelectorAll("td[data-i]").forEach(td => {
        td.addEventListener("click", () => {
          const i = +td.dataset.i;
          f[i] = f[i] ? 0 : 1;
          paintMap(); paintOut();
        });
      });
    }

    function paintOut() {
      const minterms = [];
      for (let i = 0; i < f.length; i++) if (f[i]) minterms.push(i);
      const res = minimize(minterms, n);

      let primesHtml = "";
      if (res.allPrimes && res.allPrimes.length) {
        primesHtml = `<div class="kmap-legend">${res.allPrimes.map(t => `<span class="kmap-tag">\\(${t}\\)</span>`).join("")}</div>
          <p class="muted center" style="font-size:12px">Implicantes primos detectados</p>`;
      }

      out.innerHTML = `
        <div class="callout tip" style="margin-top:14px">
          <strong class="callout__tag">Expresión mínima (suma de productos)</strong>
          <div class="formula-box" style="margin:8px 0 4px">$$f = ${res.expr || "0"}$$</div>
          <span class="muted" style="font-size:13px">${minterms.length ? "\\(\\sum m(" + minterms.join(",") + ")\\)" : "La función vale 0 en todas las filas."}</span>
        </div>
        ${primesHtml}`;
      if (window.MathJaxRender) window.MathJaxRender(out);
    }

    function repaint() { paintMap(); paintOut(); }

    sel.addEventListener("change", () => { n = +sel.value; defaults(); repaint(); });
    container.querySelector("#km-clear").addEventListener("click", () => { f = new Array(1 << n).fill(0); repaint(); });
    container.querySelector("#km-full").addEventListener("click", () => { f = new Array(1 << n).fill(1); repaint(); });

    repaint();
  }

  window.Tools = window.Tools || {};
  window.Tools.karnaugh = build;
  window.Karnaugh = { minimize };
})();
