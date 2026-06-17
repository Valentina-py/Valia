/* ============================================================
   HERRAMIENTA — Simulador de Cola Circular con Array
   Base 1: Frente/Fin en 0 = cola vacía. Avance con envoltura.
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  function build(container) {
    let n = 6;
    let cola = [];          // cola[1..n]
    let frente = 0, fin = 0; // 0 = vacía
    let nextChar = 65;       // 'A'

    function reset(size) {
      n = size; cola = new Array(n + 1).fill(null);
      frente = 0; fin = 0; nextChar = 65;
    }
    reset(n);

    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field">
            <label>Tamaño del array (n)</label>
            <select class="input" id="cc-n">
              <option>5</option><option selected>6</option><option>7</option><option>8</option>
            </select>
          </div>
          <div class="field">
            <label>Valor a meter</label>
            <input class="input input--mono" id="cc-val" value="A" maxlength="3" />
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn--primary" id="cc-meter">Meter ▸</button>
          <button class="btn" id="cc-sacar">◂ Sacar</button>
          <button class="btn" id="cc-reset">Reiniciar</button>
        </div>
        <div class="cells" id="cc-cells"></div>
        <div class="ptr-legend">
          <span><i class="dot" style="background:var(--ok)"></i> Frente</span>
          <span><i class="dot" style="background:var(--warn)"></i> Fin</span>
          <span><i class="dot" style="background:var(--accent)"></i> Ocupada</span>
        </div>
        <div id="cc-msg" class="result-box empty" style="margin-top:14px">Cola vacía. Probá Meter y Sacar para ver cómo avanzan los índices.</div>
        <div class="trace" id="cc-state"></div>
      </div>`;

    const $ = s => container.querySelector(s);
    const cellsEl = $("#cc-cells"), msgEl = $("#cc-msg"), stateEl = $("#cc-state"), valEl = $("#cc-val");

    function paint() {
      let h = "";
      for (let i = 1; i <= n; i++) {
        const full = cola[i] != null;
        const cl = ["cell"];
        if (full) cl.push("full");
        if (i === frente && frente !== 0) cl.push("frente");
        if (i === fin && fin !== 0) cl.push("fin");
        h += `<div class="${cl.join(" ")}"><span class="cell-idx">${i}</span>${full ? cola[i] : ""}</div>`;
      }
      cellsEl.innerHTML = h;
      const empty = (frente === 0 && fin === 0);
      const count = empty ? 0 : (fin >= frente ? fin - frente + 1 : n - frente + 1 + fin);
      stateEl.innerHTML = `Frente = <span class="hl">${frente}</span>   ·   Fin = <span class="hl">${fin}</span>   ·   Elementos = <span class="hl">${count}</span>   ·   ${empty ? "VACÍA" : isFull() ? "LLENA" : "OK"}`;
    }
    function isFull() {
      if (frente === 0) return false;
      return (frente === 1 && fin === n) || (frente === fin + 1);
    }
    function setMsg(txt, kind) {
      msgEl.className = "result-box" + (kind === "empty" ? " empty" : "");
      msgEl.style.borderColor = kind === "bad" ? "var(--bad)" : kind === "ok" ? "var(--ok)" : "";
      msgEl.innerHTML = txt;
    }

    function meter() {
      const val = (valEl.value || String.fromCharCode(nextChar)).trim().slice(0, 3);
      if (frente === 0 && fin === 0) {           // caso 1: vacía
        frente = 1; fin = 1; cola[fin] = val;
        setMsg(`<strong>Caso vacía:</strong> Frente=1, Fin=1, Cola[1]=${val}.`, "ok");
      } else if (isFull()) {                      // overflow
        setMsg(`<strong>¡Overflow!</strong> La cola está llena (Frente=${frente}, Fin=${fin}). No se inserta.`, "bad");
        bump(); return;
      } else {
        const antes = fin;
        if (fin === n) { fin = 1; } else { fin = fin + 1; }
        cola[fin] = val;
        setMsg(`<strong>Meter ${val}:</strong> Fin pasa de ${antes} a <strong>${fin}</strong> ${antes === n ? "(envuelve: Fin==n ⇒ Fin=1)" : "(Fin = Fin+1)"}. Cola[${fin}]=${val}.`, "ok");
      }
      nextChar = (val.charCodeAt(0) || nextChar) + 1;
      valEl.value = String.fromCharCode(Math.min(90, (valEl.value.charCodeAt(0) || 64) + 1));
      paint();
    }

    function sacar() {
      if (frente === 0 && fin === 0) {
        setMsg(`<strong>¡Underflow!</strong> La cola está vacía, no hay nada para sacar.`, "bad");
        bump(); return;
      }
      const val = cola[frente]; cola[frente] = null;
      if (frente === fin) {                       // caso 1 elemento
        setMsg(`<strong>Sacar ${val}:</strong> era el último elemento ⇒ Frente=0, Fin=0 (cola vacía).`, "ok");
        frente = 0; fin = 0;
      } else {
        const antes = frente;
        if (frente === n) { frente = 1; } else { frente = frente + 1; }
        setMsg(`<strong>Sacar ${val}:</strong> Frente pasa de ${antes} a <strong>${frente}</strong> ${antes === n ? "(envuelve: Frente==n ⇒ Frente=1)" : "(Frente = Frente+1)"}.`, "ok");
      }
      paint();
    }

    function bump() { cellsEl.classList.remove("shake"); void cellsEl.offsetWidth; cellsEl.classList.add("shake"); }

    $("#cc-meter").addEventListener("click", meter);
    $("#cc-sacar").addEventListener("click", sacar);
    $("#cc-reset").addEventListener("click", () => { reset(n); setMsg("Cola reiniciada. Frente=0, Fin=0 (vacía).", "empty"); paint(); });
    $("#cc-n").addEventListener("change", e => { reset(+e.target.value); setMsg("Tamaño cambiado. Cola vacía.", "empty"); paint(); });
    valEl.addEventListener("keydown", e => { if (e.key === "Enter") meter(); });

    paint();
  }

  Tools.colacircular = build;
})();
