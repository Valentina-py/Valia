/* ============================================================
   HERRAMIENTA — Enteros con signo
   Representa un entero decimal en:
     · Signo-Magnitud
     · Complemento a 1 (Ca1)
     · Complemento a 2 (Ca2)
   en binario (agrupado de a 4 bits) y hexadecimal, indicando
   el rango representable y avisando si hay desbordamiento.
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  // agrupa una cadena binaria de a 4 bits
  function group4(bits) {
    const out = [];
    for (let i = 0; i < bits.length; i += 4) out.push(bits.slice(i, i + 4));
    return out.join(" ");
  }

  // entero (>=0) a binario de N bits sin signo
  function toBin(n, N) {
    let s = (n >>> 0).toString(2);
    if (n > 0xffffffff || N > 32) {
      // soportar 32 bits con BigInt para evitar problemas de signo
      s = (BigInt(n) & ((1n << BigInt(N)) - 1n)).toString(2);
    }
    return s.padStart(N, "0").slice(-N);
  }

  // binario -> hex agrupado por nibbles
  function binToHex(bits) {
    let h = "";
    for (let i = 0; i < bits.length; i += 4) {
      h += parseInt(bits.slice(i, i + 4), 2).toString(16).toUpperCase();
    }
    return h;
  }

  function invert(bits) {
    return [...bits].map(b => (b === "0" ? "1" : "0")).join("");
  }

  // Calcula las tres representaciones de n en N bits (usando BigInt)
  function reps(n, N) {
    const bn = BigInt(n);
    const mask = (1n << BigInt(N)) - 1n;
    const mag = bn < 0n ? -bn : bn;
    const magBits = mag.toString(2).padStart(N, "0").slice(-N);

    // Signo-Magnitud: bit de signo + magnitud (N-1 bits)
    const sm = (bn < 0n ? "1" : "0") + mag.toString(2).padStart(N - 1, "0").slice(-(N - 1));

    // Ca1
    const ca1 = bn >= 0n ? magBits : invert(magBits);

    // Ca2
    const ca2v = bn >= 0n ? bn : ((1n << BigInt(N)) + bn) & mask;
    const ca2 = ca2v.toString(2).padStart(N, "0").slice(-N);

    return { sm, ca1, ca2 };
  }

  function rangeOf(N) {
    const lo = -(2n ** BigInt(N - 1));
    const hi = 2n ** BigInt(N - 1) - 1n;
    return { lo, hi };
  }

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field">
            <label>Número decimal (entero, puede ser negativo)</label>
            <input class="input input--mono" id="en-num" placeholder="ej: -25" value="-1" autocomplete="off" />
          </div>
          <div class="field">
            <label>Tamaño</label>
            <select class="input" id="en-bits">
              <option value="8">8 bits</option>
              <option value="16">16 bits</option>
              <option value="32">32 bits</option>
            </select>
          </div>
        </div>
        <div id="en-out"></div>

        <h3 style="font-size:15px;margin-top:26px">Bonus · Suma en Complemento a 2</h3>
        <div class="field-row">
          <div class="field">
            <label>Sumando A</label>
            <input class="input input--mono" id="en-a" placeholder="ej: 100" value="100" autocomplete="off" />
          </div>
          <div class="field">
            <label>Sumando B</label>
            <input class="input input--mono" id="en-b" placeholder="ej: 50" value="50" autocomplete="off" />
          </div>
        </div>
        <div id="en-sum"></div>
      </div>`;

    const num = container.querySelector("#en-num");
    const bitsSel = container.querySelector("#en-bits");
    const out = container.querySelector("#en-out");
    const aIn = container.querySelector("#en-a");
    const bIn = container.querySelector("#en-b");
    const sumOut = container.querySelector("#en-sum");

    function run() {
      const N = +bitsSel.value;
      const raw = num.value.trim();
      if (!/^-?\d+$/.test(raw)) {
        out.innerHTML = `<div class="result-box empty">Ingresá un número entero (por ejemplo -25).</div>`;
        return;
      }
      const n = BigInt(raw);
      const { lo, hi } = rangeOf(N);

      let warn = "";
      const overflow = n < lo || n > hi;
      if (overflow) {
        warn = `<div class="callout warn">⚠️ <strong>Desbordamiento:</strong> ${raw} está fuera del rango representable en Ca2 de ${N} bits (${lo} a ${hi}). Las representaciones se muestran truncadas a ${N} bits.</div>`;
      }

      const r = reps(n, N);
      const row = (label, bits) =>
        `<tr><td><strong>${label}</strong></td><td class="code">${group4(bits)}</td><td class="code">0x${binToHex(bits)}</td></tr>`;

      out.innerHTML = `
        ${warn}
        <div class="result-box" style="margin-top:14px">
          Rango representable en <strong>Ca2 de ${N} bits</strong>:
          <strong>${lo}</strong> a <strong>${hi}</strong>.
        </div>
        <div class="tbl-wrap" style="margin-top:14px"><table class="tbl tbl--left">
          <thead><tr><th>Representación</th><th>Binario (${N} bits)</th><th>Hexadecimal</th></tr></thead>
          <tbody>
            ${row("Signo-Magnitud", r.sm)}
            ${row("Complemento a 1", r.ca1)}
            ${row("Complemento a 2", r.ca2)}
          </tbody>
        </table></div>
        <div class="callout tip" style="margin-top:12px">
          <strong>Cómo se calcula (Ca2):</strong> si n ≥ 0 → binario normal en ${N} bits;
          si n &lt; 0 → 2<sup>${N}</sup> + n en binario. En Ca1 negativo se invierten los bits de |n|.
        </div>`;
    }

    function runSum() {
      const N = +bitsSel.value;
      const ra = aIn.value.trim(), rb = bIn.value.trim();
      if (!/^-?\d+$/.test(ra) || !/^-?\d+$/.test(rb)) {
        sumOut.innerHTML = `<div class="result-box empty">Ingresá dos enteros para sumar.</div>`;
        return;
      }
      const a = BigInt(ra), b = BigInt(rb);
      const mask = (1n << BigInt(N)) - 1n;
      const aBits = ((a % (1n << BigInt(N))) + (1n << BigInt(N))) & mask;
      const bBits = ((b % (1n << BigInt(N))) + (1n << BigInt(N))) & mask;
      const rawSum = (aBits + bBits) & mask;

      // interpretar como Ca2 con signo
      const signBit = 1n << BigInt(N - 1);
      const signed = (rawSum & signBit) ? rawSum - (1n << BigInt(N)) : rawSum;
      const real = a + b;
      const overflow = signed !== real;

      const fmt = v => group4(v.toString(2).padStart(N, "0").slice(-N));

      sumOut.innerHTML = `
        <div class="tbl-wrap" style="margin-top:8px"><table class="tbl tbl--left">
          <thead><tr><th></th><th>Binario Ca2 (${N} bits)</th><th>Decimal</th></tr></thead>
          <tbody>
            <tr><td>A</td><td class="code">${fmt(aBits)}</td><td>${a}</td></tr>
            <tr><td>B</td><td class="code">${fmt(bBits)}</td><td>${b}</td></tr>
            <tr><td><strong>A + B</strong></td><td class="code"><strong>${fmt(rawSum)}</strong></td><td><strong>${signed}</strong></td></tr>
          </tbody>
        </table></div>
        ${overflow
          ? `<div class="callout warn" style="margin-top:10px">⚠️ <strong>Overflow:</strong> el resultado real (${real}) no cabe en ${N} bits con signo; el valor truncado da ${signed}.</div>`
          : `<div class="callout tip" style="margin-top:10px">✓ Sin overflow: el resultado ${signed} es correcto.</div>`}`;
    }

    num.addEventListener("input", run);
    bitsSel.addEventListener("change", () => { run(); runSum(); });
    aIn.addEventListener("input", runSum);
    bIn.addEventListener("input", runSum);
    run();
    runSum();
  }

  Tools.enteros = build;
})();
