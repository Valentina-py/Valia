/* ============================================================
   HERRAMIENTA: Laboratorio de Memoria
   1) Paginación  — traducción de dirección lógica → física
   2) Reemplazo   — FIFO / LRU / Óptimo (cuenta fallos de página)
   3) Segmentación — traducción con base, límite y permisos
   ============================================================ */
(function () {
  "use strict";

  function tabsShell(container) {
    container.innerHTML = `
      <div class="tabs">
        <button class="tab-btn active" data-tab="pag">Paginación</button>
        <button class="tab-btn" data-tab="rep">Reemplazo de páginas</button>
        <button class="tab-btn" data-tab="seg">Segmentación</button>
      </div>
      <div id="mem-pag"></div>
      <div id="mem-rep" hidden></div>
      <div id="mem-seg" hidden></div>`;
    const panels = { pag: container.querySelector("#mem-pag"), rep: container.querySelector("#mem-rep"), seg: container.querySelector("#mem-seg") };
    container.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => {
      container.querySelectorAll(".tab-btn").forEach(x => x.classList.toggle("active", x === b));
      Object.keys(panels).forEach(k => panels[k].hidden = (k !== b.dataset.tab));
    }));
    return panels;
  }

  /* ============================================================
     1) PAGINACIÓN
     ============================================================ */
  function buildPaging(el) {
    el.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field"><label>Tamaño de página (bytes)</label><input class="input" id="pg-size" type="number" min="1" value="1024"/></div>
          <div class="field"><label>Dirección lógica (decimal)</label><input class="input" id="pg-addr" type="number" min="0" value="2500"/></div>
        </div>
        <label>Tabla de páginas (página → marco)</label>
        <div class="tbl-wrap"><table class="tbl proc-table" style="max-width:420px">
          <thead><tr><th>Página</th><th>Marco</th><th></th></tr></thead>
          <tbody id="pg-rows"></tbody>
        </table></div>
        <div class="proc-actions">
          <button class="btn btn--primary" id="pg-go">Traducir</button>
          <button class="btn" id="pg-add">+ Fila</button>
        </div>
        <div id="pg-out"></div>
      </div>`;
    const tbody = el.querySelector("#pg-rows");
    function addRow(pg, fr) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td><input class="input" type="number" min="0" value="${pg}"/></td>
        <td><input class="input" type="number" min="0" value="${fr}"/></td>
        <td><button class="btn btn--ghost pg-del">✕</button></td>`;
      tbody.appendChild(tr);
      tr.querySelector(".pg-del").addEventListener("click", () => tr.remove());
    }
    [[0, 10], [1, 15], [2, 23], [3, 8]].forEach(([p, f]) => addRow(p, f));

    function hex(n) { return "0x" + n.toString(16).toUpperCase(); }
    function go() {
      const size = parseInt(el.querySelector("#pg-size").value) || 1;
      const addr = parseInt(el.querySelector("#pg-addr").value) || 0;
      const table = {};
      tbody.querySelectorAll("tr").forEach(tr => {
        const c = tr.querySelectorAll("input");
        table[parseInt(c[0].value)] = parseInt(c[1].value);
      });
      const page = Math.floor(addr / size);
      const offset = addr % size;
      const out = el.querySelector("#pg-out");
      if (!(page in table)) {
        out.innerHTML = `<div class="result-box"><strong>Página ${page}</strong> · desplazamiento ${offset}<br>
          <span class="error-text">⚠️ La página ${page} no está en la tabla de páginas → no se puede traducir (page fault).</span></div>`;
        return;
      }
      const frame = table[page];
      const phys = frame * size + offset;
      out.innerHTML = `
        <div class="result-box">
          <div class="addr-steps">
            número de página = ${addr} DIV ${size} = <b>${page}</b><br>
            desplazamiento   = ${addr} MOD ${size} = <b>${offset}</b><br>
            marco (tabla[${page}]) = <b>${frame}</b><br>
            dirección física = ${frame} × ${size} + ${offset} = <b>${phys}</b> &nbsp;(${hex(phys)})
          </div>
        </div>`;
    }
    el.querySelector("#pg-go").addEventListener("click", go);
    el.querySelector("#pg-add").addEventListener("click", () => addRow(0, 0));
    go();
  }

  /* ============================================================
     2) REEMPLAZO DE PÁGINAS
     ============================================================ */
  function simulateReplace(refs, frames, algo) {
    const mem = [];            // marcos actuales
    const steps = [];
    const order = [];          // para FIFO: orden de llegada
    const lastUse = {};        // para LRU
    let faults = 0;

    refs.forEach((page, t) => {
      let fault = false;
      const hit = mem.includes(page);
      if (!hit) {
        fault = true; faults++;
        if (mem.length < frames) {
          mem.push(page); order.push(page);
        } else {
          let victim;
          if (algo === "fifo") {
            victim = order.shift();
          } else if (algo === "lru") {
            victim = mem.reduce((a, b) => (lastUse[a] <= lastUse[b] ? a : b));
          } else { // óptimo
            let farthest = -1; victim = mem[0];
            mem.forEach(m => {
              let nextUse = Infinity;
              for (let k = t + 1; k < refs.length; k++) { if (refs[k] === m) { nextUse = k; break; } }
              if (nextUse > farthest) { farthest = nextUse; victim = m; }
            });
            order[order.indexOf(victim)] = page;
          }
          const idx = mem.indexOf(victim);
          mem[idx] = page;
          if (algo === "fifo") order.push(page);
        }
      }
      lastUse[page] = t;
      steps.push({ page, fault, hit, frame: mem.slice() });
    });
    return { steps, faults };
  }

  function buildReplace(el) {
    el.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field"><label>Cantidad de marcos</label><input class="input" id="rp-frames" type="number" min="1" value="4"/></div>
          <div class="field"><label>Algoritmo</label>
            <select class="input" id="rp-algo"><option value="fifo">FIFO</option><option value="lru">LRU</option><option value="opt">Óptimo</option></select>
          </div>
        </div>
        <div class="field"><label>Cadena de referencias (separadas por espacio o coma)</label>
          <input class="input input--mono" id="rp-refs" value="0 7 2 7 5 8 9 2 4"/></div>
        <div class="proc-actions"><button class="btn btn--primary" id="rp-go">Simular</button></div>
        <div id="rp-out"></div>
      </div>`;
    function go() {
      const frames = Math.max(1, parseInt(el.querySelector("#rp-frames").value) || 1);
      const algo = el.querySelector("#rp-algo").value;
      const refs = el.querySelector("#rp-refs").value.split(/[\s,]+/).filter(x => x !== "").map(Number);
      const out = el.querySelector("#rp-out");
      if (!refs.length || refs.some(isNaN)) { out.innerHTML = `<div class="error-text">⚠️ Ingresá una cadena de números válida.</div>`; return; }
      const { steps, faults } = simulateReplace(refs, frames, algo);

      const strip = steps.map(s => `<div class="ref-chip ${s.fault ? "fault" : "hit"}">${s.page}</div>`).join("");
      // tabla de estados de los marcos
      let head = "<tr><th>Ref</th>";
      steps.forEach(s => head += `<th class="${s.fault ? "v-false" : "v-true"}">${s.page}</th>`);
      head += "</tr>";
      let body = "";
      for (let f = 0; f < frames; f++) {
        body += "<tr><td class='muted'>M" + f + "</td>";
        steps.forEach(s => { body += `<td>${s.frame[f] !== undefined ? s.frame[f] : ""}</td>`; });
        body += "</tr>";
      }
      body += "<tr><td class='muted'>F/H</td>";
      steps.forEach(s => body += `<td class="${s.fault ? "v-false" : "v-true"}">${s.fault ? "F" : "H"}</td>`);
      body += "</tr>";

      const hits = steps.length - faults;
      out.innerHTML = `
        <div class="ref-strip">${strip}</div>
        <div class="tbl-wrap"><table class="tbl"><thead>${head}</thead><tbody>${body}</tbody></table></div>
        <div class="metric-grid">
          <div class="metric"><div class="metric__num">${faults}</div><div class="metric__label">Fallos de página</div></div>
          <div class="metric"><div class="metric__num">${hits}</div><div class="metric__label">Aciertos</div></div>
          <div class="metric"><div class="metric__num">${((hits / steps.length) * 100).toFixed(0)}%</div><div class="metric__label">Tasa de acierto</div></div>
        </div>
        <p class="muted" style="font-size:12.5px;margin-top:6px">F = fallo de página (rojo) · H = acierto (verde).</p>`;
    }
    el.querySelector("#rp-go").addEventListener("click", go);
    go();
  }

  /* ============================================================
     3) SEGMENTACIÓN
     ============================================================ */
  function buildSeg(el) {
    el.innerHTML = `
      <div class="tool">
        <div class="field-row--3">
          <div class="field"><label>Bits de segmento</label><input class="input" id="sg-sbits" type="number" min="1" value="4"/></div>
          <div class="field"><label>Bits de desplazamiento</label><input class="input" id="sg-obits" type="number" min="1" value="12"/></div>
          <div class="field"><label>Operación</label>
            <select class="input" id="sg-op"><option value="R">Lectura (R)</option><option value="W">Escritura (W)</option><option value="X">Ejecución (X)</option></select>
          </div>
        </div>
        <div class="field"><label>Dirección virtual (hex, ej. 0x0F00)</label><input class="input input--mono" id="sg-addr" value="0x0F00"/></div>
        <label>Tabla de segmentos (base en hex, límite en decimal, permisos RWX o – )</label>
        <div class="tbl-wrap"><table class="tbl proc-table">
          <thead><tr><th>Seg</th><th>Base</th><th>Límite</th><th>Permisos</th><th></th></tr></thead>
          <tbody id="sg-rows"></tbody>
        </table></div>
        <div class="proc-actions">
          <button class="btn btn--primary" id="sg-go">Traducir</button>
          <button class="btn" id="sg-add">+ Segmento</button>
        </div>
        <div id="sg-out"></div>
      </div>`;
    const tbody = el.querySelector("#sg-rows");
    function addRow(seg, base, lim, perm) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td><input class="input" type="number" min="0" value="${seg}" style="width:60px"/></td>
        <td><input class="input input--mono" value="${base}"/></td>
        <td><input class="input" type="number" min="0" value="${lim}"/></td>
        <td><input class="input input--mono" value="${perm}" maxlength="3" style="width:70px"/></td>
        <td><button class="btn btn--ghost sg-del">✕</button></td>`;
      tbody.appendChild(tr);
      tr.querySelector(".sg-del").addEventListener("click", () => tr.remove());
    }
    [[0, "0x2000", 4096, "RW-"], [1, "0x5000", 2048, "R-X"], [2, "0x8000", 1024, "RW-"], [3, "0xC000", 512, "R--"]]
      .forEach(r => addRow(r[0], r[1], r[2], r[3]));

    function parseInt0(v) { v = (v || "").trim(); return v.toLowerCase().startsWith("0x") ? parseInt(v, 16) : parseInt(v, 10); }
    function hex(n) { return "0x" + n.toString(16).toUpperCase(); }
    function go() {
      const sbits = parseInt(el.querySelector("#sg-sbits").value) || 4;
      const obits = parseInt(el.querySelector("#sg-obits").value) || 12;
      const op = el.querySelector("#sg-op").value;
      const va = parseInt0(el.querySelector("#sg-addr").value);
      const out = el.querySelector("#sg-out");
      if (isNaN(va)) { out.innerHTML = `<div class="error-text">⚠️ Dirección virtual inválida.</div>`; return; }
      const table = {};
      tbody.querySelectorAll("tr").forEach(tr => {
        const c = tr.querySelectorAll("input");
        table[parseInt(c[0].value)] = { base: parseInt0(c[1].value), lim: parseInt(c[2].value), perm: (c[3].value || "").toUpperCase() };
      });
      const offMask = (1 << obits) - 1;
      const seg = va >> obits;
      const off = va & offMask;
      let html = `<div class="addr-steps">dirección virtual = ${hex(va)}<br>segmento = <b>${seg}</b> · desplazamiento = <b>${off}</b> (${hex(off)})<br>`;
      const s = table[seg];
      if (!s || isNaN(s.base)) { out.innerHTML = `<div class="result-box">${html}<span class="error-text">⚠️ El segmento ${seg} no existe en la tabla.</span></div>`; return; }
      html += `límite del segmento = ${s.lim} · permisos = ${s.perm}<br>`;
      if (off >= s.lim) {
        out.innerHTML = `<div class="result-box">${html}<span class="error-text">⚠️ desplazamiento ${off} ≥ límite ${s.lim} → SEGMENT FAULT (fuera de límite).</span></div>`;
        return;
      }
      const permOk = { R: s.perm[0] === "R", W: s.perm[1] === "W", X: s.perm[2] === "X" }[op];
      const phys = s.base + off;
      if (!permOk) {
        out.innerHTML = `<div class="result-box">${html}base + desp = ${hex(s.base)} + ${hex(off)} = ${hex(phys)}<br>
          <span class="error-text">⚠️ La operación «${op}» no está permitida (permisos ${s.perm}) → VIOLACIÓN DE PERMISOS.</span></div>`;
        return;
      }
      out.innerHTML = `<div class="result-box">${html}dirección física = base + desp = ${hex(s.base)} + ${hex(off)} = <b>${hex(phys)}</b> (${phys})<br><span class="v-true">✓ Acceso válido</span></div>`;
    }
    el.querySelector("#sg-go").addEventListener("click", go);
    el.querySelector("#sg-add").addEventListener("click", () => addRow(tbody.children.length, "0x0", 1024, "RW-"));
    go();
  }

  function build(container) {
    const panels = tabsShell(container);
    buildPaging(panels.pag);
    buildReplace(panels.rep);
    buildSeg(panels.seg);
  }

  window.Tools = window.Tools || {};
  window.Tools.memoria = build;
})();
