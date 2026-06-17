/* ============================================================
   HERRAMIENTA — Punto flotante IEEE 754 (simple precisión, 32 bits)
   Convierte un decimal a:
     · signo (1 bit) · exponente (8 bits, sesgo 127) · mantisa (23 bits)
   Muestra los pasos de normalización, el patrón de 32 bits y el hex.
   Incluye el camino inverso (32 bits / hex → decimal).
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  function group(bits) {
    const out = [];
    for (let i = 0; i < bits.length; i += 4) out.push(bits.slice(i, i + 4));
    return out.join(" ");
  }

  // decimal -> 32 bits exactos vía DataView
  function floatToBits(x) {
    const dv = new DataView(new ArrayBuffer(4));
    dv.setFloat32(0, x);
    return dv.getUint32(0) >>> 0;
  }

  function bitsToFloat(u) {
    const dv = new DataView(new ArrayBuffer(4));
    dv.setUint32(0, u >>> 0);
    return dv.getFloat32(0);
  }

  function decToView(container) {
    const x = parseFloat(container.querySelector("#fp-num").value);
    const out = container.querySelector("#fp-out");
    if (!isFinite(x) && !isNaN(x)) {
      // ±Infinity sí lo procesamos abajo igual; solo bloqueamos campo vacío
    }
    if (container.querySelector("#fp-num").value.trim() === "" || isNaN(x)) {
      out.innerHTML = `<div class="result-box empty">Ingresá un número decimal (ej: -6.25, 0.1, 13.5).</div>`;
      return;
    }

    const u = floatToBits(x);
    const bits = u.toString(2).padStart(32, "0");
    const sign = bits[0];
    const expBits = bits.slice(1, 9);
    const manBits = bits.slice(9);
    const expVal = parseInt(expBits, 2);
    const eUnbiased = expVal - 127;
    const hex = "0x" + u.toString(16).toUpperCase().padStart(8, "0");

    let pasos;
    if (x === 0) {
      pasos = `<li>El número es <strong>cero</strong>: exponente y mantisa en 0 (signo según el cero).</li>`;
    } else if (expVal === 0) {
      pasos = `<li>Número <strong>subnormal</strong> (exponente sesgado = 0): se interpreta como 0.f × 2<sup>-126</sup>.</li>`;
    } else if (expVal === 255) {
      pasos = `<li>Patrón especial: ${manBits.includes("1") ? "<strong>NaN</strong>" : "<strong>±Infinito</strong>"}.</li>`;
    } else {
      pasos = `
        <li>Signo: ${x < 0 ? "negativo → <strong>1</strong>" : "positivo → <strong>0</strong>"}.</li>
        <li>Normalización: el valor se escribe como <strong>1.f × 2<sup>${eUnbiased}</sup></strong>.</li>
        <li>Exponente sesgado = e + 127 = ${eUnbiased} + 127 = <strong>${expVal}</strong> = <span class="code">${expBits}</span>.</li>
        <li>Mantisa (parte fraccionaria f, 23 bits, el 1 implícito no se almacena): <span class="code">${group(manBits)}</span>.</li>`;
    }

    out.innerHTML = `
      <div class="result-box" style="margin-top:14px">
        <span style="color:#d33">${sign}</span>
        <span style="color:#2a7">${expBits}</span>
        <span style="color:#36c">${manBits}</span>
        — patrón de 32 bits
      </div>
      <div class="tbl-wrap" style="margin-top:12px"><table class="tbl tbl--left">
        <thead><tr><th>Campo</th><th>Bits</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Signo (1)</td><td class="code">${sign}</td><td>${sign === "1" ? "negativo" : "positivo"}</td></tr>
          <tr><td>Exponente (8)</td><td class="code">${expBits}</td><td>${expVal} (sesgado) → e = ${eUnbiased}</td></tr>
          <tr><td>Mantisa (23)</td><td class="code">${group(manBits)}</td><td>0x${parseInt(manBits, 2).toString(16).toUpperCase()}</td></tr>
        </tbody>
      </table></div>
      <div class="result-box" style="margin-top:12px">
        Patrón completo: <span class="code">${group(bits)}</span><br>
        Hexadecimal: <strong class="code">${hex}</strong>
      </div>
      <div class="callout tip" style="margin-top:12px">
        <strong>Pasos:</strong>
        <ol style="margin:6px 0 0 18px">${pasos}</ol>
      </div>`;
  }

  function hexToView(container) {
    const inv = container.querySelector("#fp-inv-out");
    let raw = container.querySelector("#fp-inv").value.trim().replace(/^0x/i, "").replace(/\s+/g, "");
    if (raw === "") { inv.innerHTML = `<div class="result-box empty">Ingresá 32 bits binarios o un hex de 8 dígitos.</div>`; return; }

    let u;
    if (/^[01]{1,32}$/.test(raw)) {
      u = parseInt(raw.padStart(32, "0"), 2) >>> 0;
    } else if (/^[0-9a-fA-F]{1,8}$/.test(raw)) {
      u = parseInt(raw, 16) >>> 0;
    } else {
      inv.innerHTML = `<div class="error-text">⚠️ Formato inválido: usá 32 bits (0/1) o hex de hasta 8 dígitos.</div>`;
      return;
    }

    const bits = u.toString(2).padStart(32, "0");
    const value = bitsToFloat(u);
    inv.innerHTML = `
      <div class="result-box" style="margin-top:12px">
        Patrón: <span class="code">${group(bits)}</span><br>
        Hex: <strong class="code">0x${u.toString(16).toUpperCase().padStart(8, "0")}</strong><br>
        Valor decimal: <strong style="font-size:18px">${value}</strong>
      </div>`;
  }

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field" style="max-width:60%">
          <label>Número decimal</label>
          <input class="input input--mono" id="fp-num" placeholder="ej: -6.25" value="1" autocomplete="off" />
        </div>
        <div id="fp-out"></div>

        <h3 style="font-size:15px;margin-top:26px">Inverso · de bits/hex a decimal</h3>
        <div class="field" style="max-width:60%">
          <label>32 bits binarios o hex (ej: 0x3F800000)</label>
          <input class="input input--mono" id="fp-inv" placeholder="0x3F800000" value="0x3F800000" autocomplete="off" />
        </div>
        <div id="fp-inv-out"></div>
      </div>`;

    container.querySelector("#fp-num").addEventListener("input", () => decToView(container));
    container.querySelector("#fp-inv").addEventListener("input", () => hexToView(container));
    decToView(container);
    hexToView(container);
  }

  Tools.ieee754 = build;
})();
