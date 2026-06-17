/* ============================================================
   HERRAMIENTA — Códigos
   Codifica un decimal en:
     · BCD natural (8421) · Exceso-3 · Aiken (2421)  — dígito a dígito
     · Gray  — sobre el entero completo (g = b XOR (b>>1))
   Incluye una referencia ASCII (carácter → dec / hex / binario).
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  const AIKEN = ["0000", "0001", "0010", "0011", "0100", "1011", "1100", "1101", "1110", "1111"];

  function bcd(d) { return d.toString(2).padStart(4, "0"); }
  function exc3(d) { return (d + 3).toString(2).padStart(4, "0"); }
  function aiken(d) { return AIKEN[d]; }

  function group4(bits) {
    const out = [];
    for (let i = 0; i < bits.length; i += 4) out.push(bits.slice(i, i + 4));
    return out.join(" ");
  }

  // entero -> binario -> Gray
  function toGray(n) {
    const b = BigInt(n);
    const g = b ^ (b >> 1n);
    const len = b.toString(2).length;
    return {
      bin: b.toString(2),
      gray: g.toString(2).padStart(len, "0"),
    };
  }

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field" style="max-width:60%">
          <label>Número decimal (entero ≥ 0)</label>
          <input class="input input--mono" id="cd-num" placeholder="ej: 25" value="25" autocomplete="off" />
        </div>
        <div id="cd-out"></div>

        <h3 style="font-size:15px;margin-top:26px">Referencia ASCII</h3>
        <div class="field" style="max-width:60%">
          <label>Carácter</label>
          <input class="input input--mono" id="cd-char" placeholder="ej: A" value="A" maxlength="1" autocomplete="off" />
        </div>
        <div id="cd-ascii"></div>
        <div id="cd-ascii-tbl"></div>
      </div>`;

    const num = container.querySelector("#cd-num");
    const out = container.querySelector("#cd-out");
    const charIn = container.querySelector("#cd-char");
    const asciiOut = container.querySelector("#cd-ascii");

    function run() {
      const raw = num.value.trim();
      if (!/^\d+$/.test(raw)) {
        out.innerHTML = `<div class="result-box empty">Ingresá un número decimal entero (dígitos 0-9).</div>`;
        return;
      }

      // dígito a dígito: BCD / Exceso-3 / Aiken
      let rows = "", bcdStr = "", exc3Str = "", aikStr = "";
      for (const ch of raw) {
        const d = +ch;
        rows += `<tr><td><strong>${d}</strong></td><td class="code">${bcd(d)}</td><td class="code">${exc3(d)}</td><td class="code">${aiken(d)}</td></tr>`;
        bcdStr += bcd(d) + " ";
        exc3Str += exc3(d) + " ";
        aikStr += aiken(d) + " ";
      }

      // Gray sobre el entero completo
      const g = toGray(raw);

      out.innerHTML = `
        <div class="tbl-wrap" style="margin-top:14px"><table class="tbl tbl--left">
          <thead><tr><th>Dígito</th><th>BCD (8421)</th><th>Exceso-3</th><th>Aiken (2421)</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
        <div class="result-box" style="margin-top:12px">
          <strong>BCD natural:</strong> <span class="code">${bcdStr.trim()}</span><br>
          <strong>Exceso-3:</strong> <span class="code">${exc3Str.trim()}</span><br>
          <strong>Aiken (2421):</strong> <span class="code">${aikStr.trim()}</span>
        </div>
        <div class="result-box" style="margin-top:12px">
          <strong>Gray</strong> (del entero ${raw}):<br>
          Binario: <span class="code">${group4(g.bin.padStart(Math.ceil(g.bin.length / 4) * 4, "0"))}</span><br>
          Gray: <span class="code">${group4(g.gray.padStart(Math.ceil(g.gray.length / 4) * 4, "0"))}</span>
        </div>
        <div class="callout tip" style="margin-top:12px">
          BCD: cada dígito en binario 4 bits. Exceso-3: binario de (d+3). Aiken: tabla autocomplementaria fija.
          Gray: g = b ⊕ (b ≫ 1).
        </div>`;
    }

    function runAscii() {
      const v = charIn.value;
      if (v.length === 0) {
        asciiOut.innerHTML = `<div class="result-box empty">Ingresá un carácter.</div>`;
        return;
      }
      const code = v.charCodeAt(0);
      asciiOut.innerHTML = `
        <div class="result-box" style="margin-top:10px">
          Carácter <strong>«${v}»</strong> →
          decimal <strong>${code}</strong> ·
          hex <span class="code">0x${code.toString(16).toUpperCase()}</span> ·
          binario (8 bits) <span class="code">${group4(code.toString(2).padStart(8, "0"))}</span>
        </div>`;
    }

    // tabla de algunos caracteres comunes
    const common = ["0", "9", "A", "Z", "a", "z", " ", "@"];
    let trows = "";
    for (const c of common) {
      const code = c.charCodeAt(0);
      const shown = c === " " ? "(espacio)" : c;
      trows += `<tr><td><strong>${shown}</strong></td><td>${code}</td><td class="code">0x${code.toString(16).toUpperCase()}</td><td class="code">${group4(code.toString(2).padStart(8, "0"))}</td></tr>`;
    }
    container.querySelector("#cd-ascii-tbl").innerHTML = `
      <div class="tbl-wrap" style="margin-top:12px"><table class="tbl tbl--left">
        <thead><tr><th>Carácter</th><th>Decimal</th><th>Hex</th><th>Binario (8 bits)</th></tr></thead>
        <tbody>${trows}</tbody>
      </table></div>`;

    num.addEventListener("input", run);
    charIn.addEventListener("input", runAscii);
    run();
    runAscii();
  }

  Tools.codigos = build;
})();
