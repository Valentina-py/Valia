/* ============================================================
   HERRAMIENTA — Conversor de bases (numeración posicional)
   Convierte entre bases 2..16 mostrando los pasos:
     · base origen → decimal con SUMA PONDERADA
     · decimal → base destino con DIVISIÓN REITERADA
   ============================================================ */
(function () {
  "use strict";

  const DIGITS = "0123456789ABCDEF";

  function valOf(ch) { return DIGITS.indexOf(ch.toUpperCase()); }

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field">
            <label>Número a convertir</label>
            <input class="input input--mono" id="bs-num" placeholder="ej: 1011" value="156" autocomplete="off" />
          </div>
          <div class="field">
            <label>Base de origen</label>
            <select class="input" id="bs-from"></select>
          </div>
        </div>
        <div class="field" style="max-width:50%">
          <label>Base de destino</label>
          <select class="input" id="bs-to"></select>
        </div>
        <div class="btn-row">
          <button class="btn btn--primary" id="bs-go">Convertir</button>
          <button class="btn" id="bs-swap">⇄ Intercambiar bases</button>
        </div>
        <div id="bs-out"></div>
      </div>`;

    const num = container.querySelector("#bs-num");
    const fromSel = container.querySelector("#bs-from");
    const toSel = container.querySelector("#bs-to");
    const out = container.querySelector("#bs-out");

    for (let b = 2; b <= 16; b++) {
      const label = b === 2 ? "2 (binario)" : b === 8 ? "8 (octal)" : b === 10 ? "10 (decimal)" : b === 16 ? "16 (hexadecimal)" : String(b);
      fromSel.insertAdjacentHTML("beforeend", `<option value="${b}">${label}</option>`);
      toSel.insertAdjacentHTML("beforeend", `<option value="${b}">${label}</option>`);
    }
    fromSel.value = "10";
    toSel.value = "2";

    function run() {
      const raw = num.value.trim().toUpperCase().replace(/\s+/g, "");
      const from = +fromSel.value, to = +toSel.value;
      if (!raw) { out.innerHTML = `<div class="result-box empty">Ingresá un número para convertir.</div>`; return; }

      // validar dígitos
      const bad = [...raw].find(ch => { const v = valOf(ch); return v < 0 || v >= from; });
      if (bad !== undefined) {
        out.innerHTML = `<div class="error-text">⚠️ El dígito «${bad}» no es válido en base ${from}.</div>`;
        return;
      }

      // origen -> decimal (suma ponderada)
      let dec = 0;
      const len = raw.length;
      let weightRows = "";
      for (let k = 0; k < len; k++) {
        const ch = raw[k];
        const d = valOf(ch);
        const pot = len - 1 - k;
        const contrib = d * Math.pow(from, pot);
        dec += contrib;
        weightRows += `<tr><td>${ch}</td><td>${d} × ${from}<sup>${pot}</sup></td><td>${contrib}</td></tr>`;
      }

      // decimal -> destino (división reiterada)
      let divHtml = "";
      let resto = [];
      if (dec === 0) { resto = ["0"]; divHtml = `<tr><td>0 ÷ ${to}</td><td>0</td><td>0</td></tr>`; }
      else {
        let q = dec;
        while (q > 0) {
          const r = q % to;
          const nq = Math.floor(q / to);
          divHtml += `<tr><td>${q} ÷ ${to}</td><td>${nq}</td><td><strong>${DIGITS[r]}</strong></td></tr>`;
          resto.push(DIGITS[r]);
          q = nq;
        }
      }
      const result = resto.slice().reverse().join("");

      const weightTable = from === 10 ? "" : `
        <h3 style="font-size:15px">Paso 1 · De base ${from} a decimal (suma ponderada)</h3>
        <div class="tbl-wrap"><table class="tbl tbl--left">
          <thead><tr><th>Dígito</th><th>Valor × base<sup>pos</sup></th><th>Aporte</th></tr></thead>
          <tbody>${weightRows}</tbody>
          <tfoot><tr><th colspan="2" style="text-align:right">Total decimal</th><th>${dec}</th></tr></tfoot>
        </table></div>`;

      const divTable = to === 10 ? "" : `
        <h3 style="font-size:15px">Paso 2 · De decimal a base ${to} (división reiterada)</h3>
        <div class="tbl-wrap"><table class="tbl tbl--left">
          <thead><tr><th>División</th><th>Cociente</th><th>Resto</th></tr></thead>
          <tbody>${divHtml}</tbody>
        </table></div>
        <p class="muted" style="font-size:13px">El resultado se lee tomando los restos de <strong>abajo hacia arriba</strong>.</p>`;

      out.innerHTML = `
        <div class="result-box" style="margin-top:18px">
          <strong>${raw}</strong> en base ${from} = <strong style="font-family:var(--mono);font-size:18px">${result}</strong> en base ${to}
          ${from !== 10 && to !== 10 ? `<br><span class="muted" style="font-size:13px">(pasando por el decimal ${dec})</span>` : ""}
        </div>
        ${weightTable}
        ${divTable}`;
    }

    container.querySelector("#bs-go").addEventListener("click", run);
    container.querySelector("#bs-swap").addEventListener("click", () => {
      const a = fromSel.value; fromSel.value = toSel.value; toSel.value = a; run();
    });
    num.addEventListener("keydown", e => { if (e.key === "Enter") run(); });
    fromSel.addEventListener("change", run);
    toSel.addEventListener("change", run);
    run();
  }

  window.Tools = window.Tools || {};
  window.Tools.bases = build;
})();
