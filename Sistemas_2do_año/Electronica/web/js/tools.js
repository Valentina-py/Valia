/* ============================================================
   HERRAMIENTAS INTERACTIVAS — ELECTRÓNICA
   1) Ley de Ohm (V, I, R, P)
   2) Código de colores de resistencias
   3) Resistencia equivalente (serie / paralelo)
   4) Divisor de tensión y de corriente
   5) Reactancia e impedancia (X_L, X_C, Z, resonancia)
   Se exponen en window.Tools[id](container)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- utilidades de formato ---------- */
  function fmtEng(x, unit) {
    if (!isFinite(x)) return "∞ " + unit;
    if (x === 0) return "0 " + unit;
    const abs = Math.abs(x);
    const pre = [
      { f: 1e9, s: "G" }, { f: 1e6, s: "M" }, { f: 1e3, s: "k" },
      { f: 1, s: "" }, { f: 1e-3, s: "m" }, { f: 1e-6, s: "µ" },
      { f: 1e-9, s: "n" }, { f: 1e-12, s: "p" },
    ];
    let chosen = pre[pre.length - 1];
    for (const p of pre) { if (abs >= p.f) { chosen = p; break; } }
    const v = x / chosen.f;
    const r = Math.abs(v) >= 100 ? v.toFixed(1) : Math.abs(v) >= 10 ? v.toFixed(2) : v.toFixed(3);
    return parseFloat(r) + " " + chosen.s + unit;
  }
  function num(v) { const n = parseFloat(String(v).replace(",", ".")); return isFinite(n) ? n : NaN; }
  function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  function kvItem(label, value) {
    return `<div class="kv__item"><div class="kv__label">${label}</div><div class="kv__val">${value}</div></div>`;
  }

  /* ============================================================
     1) LEY DE OHM
     ============================================================ */
  function ohm(container) {
    container.innerHTML = `
      <div class="tool">
        <p class="muted" style="margin-top:0">Ingresá <strong>dos</strong> valores cualesquiera y se calculan los otros dos. Dejá vacíos los que querés hallar.</p>
        <div class="field-row">
          <div class="field"><label>Voltaje V (voltios)</label><input class="input" id="o-v" type="number" step="any" placeholder="V"></div>
          <div class="field"><label>Corriente I (amperios)</label><input class="input" id="o-i" type="number" step="any" placeholder="A"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>Resistencia R (ohmios)</label><input class="input" id="o-r" type="number" step="any" placeholder="Ω"></div>
          <div class="field"><label>Potencia P (watts)</label><input class="input" id="o-p" type="number" step="any" placeholder="W"></div>
        </div>
        <div class="btn-row" style="margin-bottom:0">
          <button class="btn btn--primary" id="o-calc">Calcular</button>
          <button class="btn" id="o-clear">Limpiar</button>
        </div>
        <div id="o-out" class="result-box empty" style="margin-top:16px">Completá dos campos y presioná «Calcular».</div>
      </div>`;

    const out = container.querySelector("#o-out");
    const get = id => num(container.querySelector(id).value);
    function calc() {
      let V = get("#o-v"), I = get("#o-i"), R = get("#o-r"), P = get("#o-p");
      const known = [["V", V], ["I", I], ["R", R], ["P", P]].filter(x => isFinite(x[1]));
      if (known.length < 2) { out.className = "result-box empty"; out.textContent = "Necesito al menos dos valores."; return; }
      // resolver a partir de cualquier par
      for (let iter = 0; iter < 4; iter++) {
        if (!isFinite(V)) { if (isFinite(I) && isFinite(R)) V = I * R; else if (isFinite(P) && isFinite(I)) V = P / I; else if (isFinite(P) && isFinite(R)) V = Math.sqrt(P * R); }
        if (!isFinite(I)) { if (isFinite(V) && isFinite(R)) I = V / R; else if (isFinite(P) && isFinite(V)) I = P / V; else if (isFinite(P) && isFinite(R)) I = Math.sqrt(P / R); }
        if (!isFinite(R)) { if (isFinite(V) && isFinite(I)) R = V / I; else if (isFinite(V) && isFinite(P)) R = V * V / P; else if (isFinite(P) && isFinite(I)) R = P / (I * I); }
        if (!isFinite(P)) { if (isFinite(V) && isFinite(I)) P = V * I; else if (isFinite(I) && isFinite(R)) P = I * I * R; else if (isFinite(V) && isFinite(R)) P = V * V / R; }
      }
      out.className = "result-box";
      out.innerHTML = `<div class="kv">
        ${kvItem("Voltaje", fmtEng(V, "V"))}
        ${kvItem("Corriente", fmtEng(I, "A"))}
        ${kvItem("Resistencia", fmtEng(R, "Ω"))}
        ${kvItem("Potencia", fmtEng(P, "W"))}
      </div>`;
    }
    container.querySelector("#o-calc").addEventListener("click", calc);
    container.querySelectorAll(".input").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") calc(); }));
    container.querySelector("#o-clear").addEventListener("click", () => {
      container.querySelectorAll(".input").forEach(i => i.value = "");
      out.className = "result-box empty"; out.textContent = "Completá dos campos y presioná «Calcular».";
    });
  }

  /* ============================================================
     2) CÓDIGO DE COLORES
     ============================================================ */
  const COLORS = [
    { n: "Negro", c: "#222", d: 0, m: 1e0 },
    { n: "Marrón", c: "#7c4a25", d: 1, m: 1e1 },
    { n: "Rojo", c: "#d33", d: 2, m: 1e2 },
    { n: "Naranja", c: "#e8841a", d: 3, m: 1e3 },
    { n: "Amarillo", c: "#f2c200", d: 4, m: 1e4 },
    { n: "Verde", c: "#1faa4f", d: 5, m: 1e5 },
    { n: "Azul", c: "#2b6fd6", d: 6, m: 1e6 },
    { n: "Violeta", c: "#8a4fc4", d: 7, m: 1e7 },
    { n: "Gris", c: "#888", d: 8, m: 1e8 },
    { n: "Blanco", c: "#eee", d: 9, m: 1e9 },
  ];
  const MULTI = [
    ...COLORS.slice(0, 8).map(c => ({ n: c.n, c: c.c, m: c.m })),
    { n: "Oro", c: "#caa33a", m: 0.1 },
    { n: "Plata", c: "#bcc2c6", m: 0.01 },
  ];
  const TOL = [
    { n: "Marrón", c: "#7c4a25", t: "±1 %" },
    { n: "Rojo", c: "#d33", t: "±2 %" },
    { n: "Oro", c: "#caa33a", t: "±5 %" },
    { n: "Plata", c: "#bcc2c6", t: "±10 %" },
  ];

  function colores(container) {
    let b1 = 1, b2 = 0, bm = 2, bt = 2; // marrón, negro, ×100, oro → 1 kΩ
    container.innerHTML = `
      <div class="tool">
        <div class="resistor">
          <div class="resistor__wire"></div>
          <div class="resistor__body" id="cc-body"></div>
        </div>
        <div id="cc-out" class="result-box center" style="font-size:22px;font-weight:800"></div>
        <h3>1ª banda (dígito)</h3><div class="color-pills" id="cc-b1"></div>
        <h3>2ª banda (dígito)</h3><div class="color-pills" id="cc-b2"></div>
        <h3>3ª banda (multiplicador)</h3><div class="color-pills" id="cc-bm"></div>
        <h3>4ª banda (tolerancia)</h3><div class="color-pills" id="cc-bt"></div>
      </div>`;

    function pill(active, color, label) {
      return `<button class="color-pill${active ? " active" : ""}"><span class="color-swatch" style="background:${color}"></span>${label}</button>`;
    }
    function render() {
      container.querySelector("#cc-b1").innerHTML = COLORS.map((c, i) => pill(i === b1, c.c, `${c.n} (${c.d})`)).join("");
      container.querySelector("#cc-b2").innerHTML = COLORS.map((c, i) => pill(i === b2, c.c, `${c.n} (${c.d})`)).join("");
      container.querySelector("#cc-bm").innerHTML = MULTI.map((c, i) => pill(i === bm, c.c, `${c.n} (×${c.m >= 1 ? c.m : c.m})`)).join("");
      container.querySelector("#cc-bt").innerHTML = TOL.map((c, i) => pill(i === bt, c.c, `${c.n} ${c.t}`)).join("");
      // resistor visual
      container.querySelector("#cc-body").innerHTML =
        `<span class="resistor__band" style="background:${COLORS[b1].c}"></span>
         <span class="resistor__band" style="background:${COLORS[b2].c}"></span>
         <span class="resistor__band" style="background:${MULTI[bm].c}"></span>
         <span class="resistor__band" style="margin-left:auto;background:${TOL[bt].c}"></span>`;
      const val = (COLORS[b1].d * 10 + COLORS[b2].d) * MULTI[bm].m;
      container.querySelector("#cc-out").innerHTML = `${fmtEng(val, "Ω")} <span style="font-size:14px;color:var(--muted);font-weight:600">${TOL[bt].t}</span>`;
      bind();
    }
    function bind() {
      const wire = (sel, set) => container.querySelectorAll(sel + " .color-pill").forEach((b, i) => b.addEventListener("click", () => { set(i); render(); }));
      wire("#cc-b1", i => b1 = i); wire("#cc-b2", i => b2 = i); wire("#cc-bm", i => bm = i); wire("#cc-bt", i => bt = i);
    }
    render();
  }

  /* ============================================================
     3) RESISTENCIA EQUIVALENTE
     ============================================================ */
  function equivalente(container) {
    let vals = [100, 220, 470];
    container.innerHTML = `
      <div class="tool">
        <label>Tipo de conexión</label>
        <div class="btn-row" id="eq-mode" style="margin-top:6px">
          <button class="btn btn--primary" data-m="serie">Serie</button>
          <button class="btn" data-m="paralelo">Paralelo</button>
        </div>
        <label>Resistencias (Ω) — una por campo</label>
        <div id="eq-list"></div>
        <div class="btn-row">
          <button class="btn" id="eq-add">+ Agregar resistencia</button>
          <button class="btn btn--primary" id="eq-calc">Calcular</button>
        </div>
        <div id="eq-out" class="result-box empty"></div>
      </div>`;
    let mode = "serie";

    function drawList() {
      const list = container.querySelector("#eq-list");
      list.innerHTML = vals.map((v, i) =>
        `<div class="field" style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
           <input class="input" data-i="${i}" type="number" step="any" value="${v}" placeholder="Ω">
           <button class="btn btn--ghost" data-del="${i}" title="Quitar">✕</button>
         </div>`).join("");
      list.querySelectorAll("input").forEach(inp => inp.addEventListener("input", () => { vals[+inp.dataset.i] = num(inp.value); }));
      list.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => { if (vals.length > 1) { vals.splice(+b.dataset.del, 1); drawList(); } }));
    }
    function calc() {
      const rs = vals.filter(v => isFinite(v) && v > 0);
      if (!rs.length) { return; }
      let Rt;
      if (mode === "serie") Rt = rs.reduce((a, b) => a + b, 0);
      else Rt = 1 / rs.reduce((a, b) => a + 1 / b, 0);
      const out = container.querySelector("#eq-out");
      out.className = "result-box";
      const formula = mode === "serie"
        ? `R_T = ${rs.map(r => fmtEng(r, "Ω")).join(" + ")}`
        : `1/R_T = ${rs.map(r => "1/" + fmtEng(r, "Ω")).join(" + ")}`;
      out.innerHTML = `<div class="muted" style="font-size:13px;margin-bottom:8px">${formula}</div>
        <div class="kv">${kvItem("Resistencia equivalente", fmtEng(Rt, "Ω"))}${kvItem("Cantidad", rs.length + " resistencias")}</div>`;
    }
    container.querySelector("#eq-add").addEventListener("click", () => { vals.push(100); drawList(); });
    container.querySelector("#eq-calc").addEventListener("click", calc);
    container.querySelectorAll("#eq-mode .btn").forEach(b => b.addEventListener("click", () => {
      mode = b.dataset.m;
      container.querySelectorAll("#eq-mode .btn").forEach(x => x.classList.toggle("btn--primary", x === b));
      calc();
    }));
    drawList(); calc();
  }

  /* ============================================================
     4) DIVISOR DE TENSIÓN / CORRIENTE
     ============================================================ */
  function divisor(container) {
    container.innerHTML = `
      <div class="tool">
        <h3 class="mt-0">Divisor de tensión</h3>
        <p class="muted" style="margin-top:0">Dos resistencias en serie. \\(V_x = E\\,\\dfrac{R_x}{R_1+R_2}\\)</p>
        <div class="field-row--3" style="display:grid;gap:12px">
          <div class="field"><label>E (V)</label><input class="input" id="dv-e" type="number" step="any" value="24"></div>
          <div class="field"><label>R₁ (Ω)</label><input class="input" id="dv-r1" type="number" step="any" value="1000"></div>
          <div class="field"><label>R₂ (Ω)</label><input class="input" id="dv-r2" type="number" step="any" value="3000"></div>
        </div>
        <div id="dv-out" class="result-box"></div>
      </div>
      <div class="tool">
        <h3 class="mt-0">Divisor de corriente</h3>
        <p class="muted" style="margin-top:0">Dos resistencias en paralelo. \\(I_1 = I_T\\,\\dfrac{R_2}{R_1+R_2}\\)</p>
        <div class="field-row--3" style="display:grid;gap:12px">
          <div class="field"><label>I_T (A)</label><input class="input" id="dc-i" type="number" step="any" value="9"></div>
          <div class="field"><label>R₁ (Ω)</label><input class="input" id="dc-r1" type="number" step="any" value="2"></div>
          <div class="field"><label>R₂ (Ω)</label><input class="input" id="dc-r2" type="number" step="any" value="4"></div>
        </div>
        <div id="dc-out" class="result-box"></div>
      </div>`;

    const g = id => num(container.querySelector(id).value);
    function calcV() {
      const E = g("#dv-e"), r1 = g("#dv-r1"), r2 = g("#dv-r2"); const rt = r1 + r2;
      const out = container.querySelector("#dv-out");
      if (!isFinite(E) || !(rt > 0)) { out.className = "result-box empty"; out.textContent = "Completá los valores."; return; }
      out.className = "result-box";
      out.innerHTML = `<div class="kv">
        ${kvItem("V sobre R₁", fmtEng(E * r1 / rt, "V"))}
        ${kvItem("V sobre R₂", fmtEng(E * r2 / rt, "V"))}
        ${kvItem("Corriente", fmtEng(E / rt, "A"))}
        ${kvItem("R_T", fmtEng(rt, "Ω"))}</div>`;
    }
    function calcI() {
      const I = g("#dc-i"), r1 = g("#dc-r1"), r2 = g("#dc-r2"); const rt = r1 + r2;
      const out = container.querySelector("#dc-out");
      if (!isFinite(I) || !(rt > 0)) { out.className = "result-box empty"; out.textContent = "Completá los valores."; return; }
      out.className = "result-box";
      out.innerHTML = `<div class="kv">
        ${kvItem("I por R₁", fmtEng(I * r2 / rt, "A"))}
        ${kvItem("I por R₂", fmtEng(I * r1 / rt, "A"))}
        ${kvItem("R paralelo", fmtEng(r1 * r2 / rt, "Ω"))}</div>`;
    }
    ["#dv-e", "#dv-r1", "#dv-r2"].forEach(s => container.querySelector(s).addEventListener("input", calcV));
    ["#dc-i", "#dc-r1", "#dc-r2"].forEach(s => container.querySelector(s).addEventListener("input", calcI));
    calcV(); calcI();
  }

  /* ============================================================
     5) REACTANCIA E IMPEDANCIA
     ============================================================ */
  function reactancia(container) {
    container.innerHTML = `
      <div class="tool">
        <p class="muted" style="margin-top:0">Ingresá la frecuencia y los componentes del RLC serie. Dejá L o C en 0 si no están.</p>
        <div class="field-row--3" style="display:grid;gap:12px">
          <div class="field"><label>Frecuencia f (Hz)</label><input class="input" id="x-f" type="number" step="any" value="60"></div>
          <div class="field"><label>R (Ω)</label><input class="input" id="x-r" type="number" step="any" value="30"></div>
          <div class="field"><label>L (H)</label><input class="input" id="x-l" type="number" step="any" value="0.1"></div>
        </div>
        <div class="field"><label>C (faradios — ej. 10e-6 para 10 µF)</label><input class="input" id="x-c" type="number" step="any" value="0.00001"></div>
        <div class="btn-row" style="margin-bottom:0"><button class="btn btn--primary" id="x-calc">Calcular</button></div>
        <div id="x-out" class="result-box empty" style="margin-top:16px"></div>
      </div>`;

    const g = id => num(container.querySelector(id).value);
    function calc() {
      const f = g("#x-f"), R = g("#x-r"), L = g("#x-l"), C = g("#x-c");
      const out = container.querySelector("#x-out");
      if (!(f > 0)) { out.className = "result-box empty"; out.textContent = "La frecuencia debe ser mayor que 0."; return; }
      const w = 2 * Math.PI * f;
      const XL = (L > 0) ? w * L : 0;
      const XC = (C > 0) ? 1 / (w * C) : 0;
      const X = XL - XC;
      const Rr = (R > 0) ? R : 0;
      const Z = Math.sqrt(Rr * Rr + X * X);
      const theta = Math.atan2(X, Rr) * 180 / Math.PI;
      let f0 = (L > 0 && C > 0) ? 1 / (2 * Math.PI * Math.sqrt(L * C)) : NaN;
      out.className = "result-box";
      out.innerHTML = `<div class="kv">
        ${kvItem("X_L (inductiva)", fmtEng(XL, "Ω"))}
        ${kvItem("X_C (capacitiva)", fmtEng(XC, "Ω"))}
        ${kvItem("Reactancia neta", fmtEng(X, "Ω"))}
        ${kvItem("Impedancia |Z|", fmtEng(Z, "Ω"))}
        ${kvItem("Ángulo θ", (theta >= 0 ? "+" : "") + theta.toFixed(1) + "°")}
        ${isFinite(f0) ? kvItem("Resonancia f₀", fmtEng(f0, "Hz")) : ""}
      </div>
      <div class="muted" style="font-size:13px;margin-top:10px">${theta > 1 ? "Circuito inductivo: la tensión adelanta a la corriente." : theta < -1 ? "Circuito capacitivo: la corriente adelanta a la tensión." : "Prácticamente resistivo (en fase)."}</div>`;
    }
    container.querySelector("#x-calc").addEventListener("click", calc);
    container.querySelectorAll(".input").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") calc(); }));
    calc();
  }

  window.Tools = { ohm, colores, equivalente, divisor, reactancia };
})();
