/* ============================================================
   HERRAMIENTA — Formas Normales (FND / FNC)
   Editás la columna de salida de una tabla de verdad y la
   herramienta deriva la Forma Normal Disyuntiva (suma de
   minitérminos, f=1) y la Conjuntiva (producto de maxitérminos, f=0).
   ============================================================ */
(function () {
  "use strict";

  const VARS = ["a", "b", "c", "d"];

  function bits(i, n) {
    const r = [];
    for (let k = n - 1; k >= 0; k--) r.push((i >> k) & 1);
    return r;
  }

  // minitérmino: bit 1 -> var ; bit 0 -> complemento
  function minterm(i, n) {
    return bits(i, n).map((b, k) => b ? VARS[k] : "\\overline{" + VARS[k] + "}").join("");
  }
  // maxitérmino: bit 1 -> complemento ; bit 0 -> var
  function maxterm(i, n) {
    return "(" + bits(i, n).map((b, k) => b ? "\\overline{" + VARS[k] + "}" : VARS[k]).join("+") + ")";
  }

  function build(container) {
    let n = 3;
    let f = [0, 0, 1, 1, 0, 1, 1, 0]; // ejemplo inicial (minterms 2,3,5,6)

    container.innerHTML = `
      <div class="tool">
        <div class="field" style="max-width:260px">
          <label>Cantidad de variables</label>
          <select class="input" id="fm-n">
            <option value="2">2 variables (a, b)</option>
            <option value="3" selected>3 variables (a, b, c)</option>
            <option value="4">4 variables (a, b, c, d)</option>
          </select>
        </div>
        <p class="muted" style="font-size:13px">Tocá la columna <strong>f</strong> para cambiar cada salida entre 0 y 1.</p>
        <div id="fm-table"></div>
        <div class="btn-row">
          <button class="btn" id="fm-all0">Todo 0</button>
          <button class="btn" id="fm-all1">Todo 1</button>
          <button class="btn" id="fm-inv">Invertir</button>
        </div>
        <div id="fm-out"></div>
      </div>`;

    const sel = container.querySelector("#fm-n");
    const tableEl = container.querySelector("#fm-table");
    const out = container.querySelector("#fm-out");

    function resize(newN) {
      n = newN;
      f = new Array(1 << n).fill(0);
    }

    function paintTable() {
      const rows = 1 << n;
      const head = VARS.slice(0, n).map(v => `<th>${v}</th>`).join("") + `<th>f</th>`;
      let body = "";
      for (let i = 0; i < rows; i++) {
        const cells = bits(i, n).map(b => `<td class="${b ? "v-true" : "v-false"}">${b}</td>`).join("");
        body += `<tr>${cells}<td class="fm-f ${f[i] ? "v-true" : "v-false"}" data-i="${i}" style="cursor:pointer"><strong>${f[i]}</strong></td></tr>`;
      }
      tableEl.innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
      tableEl.querySelectorAll(".fm-f").forEach(td => {
        td.addEventListener("click", () => {
          const i = +td.dataset.i;
          f[i] = f[i] ? 0 : 1;
          paintTable();
          paintOut();
        });
      });
    }

    function paintOut() {
      const rows = 1 << n;
      const ones = [], zeros = [];
      for (let i = 0; i < rows; i++) (f[i] ? ones : zeros).push(i);

      let fnd, fndIdx;
      if (ones.length === 0) { fnd = "f = 0"; fndIdx = "—"; }
      else if (ones.length === rows) { fnd = "f = 1"; fndIdx = "todos"; }
      else { fnd = "f = " + ones.map(i => minterm(i, n)).join(" + "); fndIdx = "\\sum m(" + ones.join(",") + ")"; }

      let fnc, fncIdx;
      if (zeros.length === 0) { fnc = "f = 1"; fncIdx = "—"; }
      else if (zeros.length === rows) { fnc = "f = 0"; fncIdx = "todos"; }
      else { fnc = "f = " + zeros.map(i => maxterm(i, n)).join(" \\cdot "); fncIdx = "\\prod M(" + zeros.join(",") + ")"; }

      out.innerHTML = `
        <div class="callout def" style="margin-top:8px">
          <strong class="callout__tag">Forma Normal Disyuntiva (FND) — suma de minitérminos (f = 1)</strong>
          <div class="formula-box" style="margin:8px 0 4px">$$${fnd}$$</div>
          <span class="muted" style="font-size:13px">Notación compacta: \\(${fndIdx}\\)</span>
        </div>
        <div class="callout def">
          <strong class="callout__tag">Forma Normal Conjuntiva (FNC) — producto de maxitérminos (f = 0)</strong>
          <div class="formula-box" style="margin:8px 0 4px">$$${fnc}$$</div>
          <span class="muted" style="font-size:13px">Notación compacta: \\(${fncIdx}\\)</span>
        </div>`;
      if (window.MathJaxRender) window.MathJaxRender(out);
    }

    function repaint() { paintTable(); paintOut(); }

    sel.addEventListener("change", () => { resize(+sel.value); repaint(); });
    container.querySelector("#fm-all0").addEventListener("click", () => { f = new Array(1 << n).fill(0); repaint(); });
    container.querySelector("#fm-all1").addEventListener("click", () => { f = new Array(1 << n).fill(1); repaint(); });
    container.querySelector("#fm-inv").addEventListener("click", () => { f = f.map(x => x ? 0 : 1); repaint(); });

    repaint();
  }

  window.Tools = window.Tools || {};
  window.Tools.formas = build;
})();
