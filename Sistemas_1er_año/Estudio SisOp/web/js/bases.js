/* ============================================================
   HERRAMIENTA: Conversor de bases y unidades
   Binario · Octal · Decimal · Hexadecimal + potencias de 2 y bytes
   ============================================================ */
(function () {
  "use strict";

  const BASES = { bin: 2, oct: 8, dec: 10, hex: 16 };

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field"><label>Valor</label><input class="input input--mono" id="bs-val" value="1024"/></div>
          <div class="field"><label>Base de entrada</label>
            <select class="input" id="bs-base">
              <option value="dec">Decimal (10)</option><option value="bin">Binario (2)</option>
              <option value="oct">Octal (8)</option><option value="hex">Hexadecimal (16)</option>
            </select>
          </div>
        </div>
        <div id="bs-out"></div>

        <h3>Potencias de 2 y unidades</h3>
        <div class="field-row">
          <div class="field"><label>Exponente n (para 2ⁿ)</label><input class="input" id="bs-exp" type="number" min="0" value="10"/></div>
          <div class="field"><label>&nbsp;</label><div class="result-box" id="bs-pow" style="margin-top:0"></div></div>
        </div>
        <p class="muted" style="font-size:12.5px">Recordá: 1 KB = 1024 B = 2¹⁰ · 1 MB = 2²⁰ · 1 GB = 2³⁰. Una dirección de <em>k</em> bits direcciona 2<sup><em>k</em></sup> posiciones.</p>
      </div>`;

    const val = container.querySelector("#bs-val");
    const base = container.querySelector("#bs-base");
    const out = container.querySelector("#bs-out");

    function convert() {
      const raw = val.value.trim().replace(/^0x/i, "").replace(/\s+/g, "");
      if (!raw) { out.innerHTML = `<div class="result-box empty">Ingresá un valor.</div>`; return; }
      const b = BASES[base.value];
      const valid = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^\d+$/, 16: /^[0-9a-fA-F]+$/ }[b];
      if (!valid.test(raw)) { out.innerHTML = `<div class="error-text">⚠️ «${raw}» no es válido en base ${b}.</div>`; return; }
      const dec = parseInt(raw, b);
      const bin = dec.toString(2);
      out.innerHTML = `
        <div class="result-box"><div class="addr-steps">
          Binario&nbsp;&nbsp;&nbsp;(2)&nbsp;&nbsp;= <b>${bin}</b><br>
          Octal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(8)&nbsp;&nbsp;= <b>${dec.toString(8)}</b><br>
          Decimal&nbsp;(10) = <b>${dec.toString(10)}</b><br>
          Hexadec.(16) = <b>0x${dec.toString(16).toUpperCase()}</b><br>
          Bits necesarios = <b>${bin.length}</b>
        </div></div>`;
    }

    function power() {
      const n = Math.max(0, parseInt(container.querySelector("#bs-exp").value) || 0);
      const v = Math.pow(2, n);
      let unit = "";
      if (n >= 30) unit = " = " + (v / (1 << 30)) + " GB";
      else if (n >= 20) unit = " = " + (v / (1 << 20)) + " MB";
      else if (n >= 10) unit = " = " + (v / 1024) + " KB";
      container.querySelector("#bs-pow").innerHTML = `2<sup>${n}</sup> = <b>${v.toLocaleString("es")}</b>${unit}`;
    }

    val.addEventListener("input", convert);
    base.addEventListener("change", convert);
    container.querySelector("#bs-exp").addEventListener("input", power);
    convert(); power();
  }

  window.Tools = window.Tools || {};
  window.Tools.bases = build;
})();
