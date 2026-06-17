/* ============================================================
   HERRAMIENTA: Planificador de CPU
   FCFS · SJF · SRTF · Prioridades (con/sin apropiación) · Round Robin
   Calcula el diagrama de Gantt y las métricas (espera, retorno, penalización).
   ============================================================ */
(function () {
  "use strict";

  const COLORS = ["#0d9488", "#0891b2", "#6366f1", "#d97706", "#db2777", "#16a34a", "#7c3aed", "#dc2626", "#0ea5e9", "#65a30d"];

  const EXAMPLE = [
    { name: "A", arrival: 4, burst: 1, priority: 2 },
    { name: "B", arrival: 0, burst: 5, priority: 1 },
    { name: "C", arrival: 1, burst: 4, priority: 3 },
    { name: "D", arrival: 8, burst: 3, priority: 2 },
    { name: "E", arrival: 12, burst: 2, priority: 2 },
  ];

  /* ---------------- Algoritmos ---------------- */
  function simulate(procs, algo, quantum) {
    const segs = [];
    const finish = {};
    const rem = {};
    procs.forEach(p => { rem[p.name] = p.burst; });
    const n = procs.length;
    let clock = 0, completed = 0;

    function pushSeg(name, start, end) {
      const last = segs[segs.length - 1];
      if (last && last.name === name && last.end === start) last.end = end;
      else segs.push({ name, start, end });
    }
    const idxOf = {}; procs.forEach((p, i) => idxOf[p.name] = i);

    if (algo === "fcfs" || algo === "sjf" || algo === "prio") {
      while (completed < n) {
        const ready = procs.filter(p => rem[p.name] > 0 && p.arrival <= clock);
        if (!ready.length) {
          const next = Math.min(...procs.filter(p => rem[p.name] > 0).map(p => p.arrival));
          pushSeg(null, clock, next); clock = next; continue;
        }
        ready.sort((a, b) => {
          if (algo === "sjf") return a.burst - b.burst || a.arrival - b.arrival || idxOf[a.name] - idxOf[b.name];
          if (algo === "prio") return a.priority - b.priority || a.arrival - b.arrival || idxOf[a.name] - idxOf[b.name];
          return a.arrival - b.arrival || idxOf[a.name] - idxOf[b.name]; // fcfs
        });
        const p = ready[0];
        pushSeg(p.name, clock, clock + p.burst);
        clock += p.burst; rem[p.name] = 0; finish[p.name] = clock; completed++;
      }
    }
    else if (algo === "srtf" || algo === "priop") {
      while (completed < n) {
        const ready = procs.filter(p => rem[p.name] > 0 && p.arrival <= clock);
        if (!ready.length) {
          const next = Math.min(...procs.filter(p => rem[p.name] > 0).map(p => p.arrival));
          pushSeg(null, clock, next); clock = next; continue;
        }
        ready.sort((a, b) => {
          if (algo === "srtf") return rem[a.name] - rem[b.name] || a.arrival - b.arrival || idxOf[a.name] - idxOf[b.name];
          return a.priority - b.priority || a.arrival - b.arrival || idxOf[a.name] - idxOf[b.name];
        });
        const p = ready[0];
        pushSeg(p.name, clock, clock + 1);
        clock += 1; rem[p.name] -= 1;
        if (rem[p.name] === 0) { finish[p.name] = clock; completed++; }
      }
    }
    else if (algo === "rr") {
      const q = Math.max(1, quantum | 0);
      const arr = procs.slice().sort((a, b) => a.arrival - b.arrival || idxOf[a.name] - idxOf[b.name]);
      const enq = new Set();
      const queue = [];
      const enqueueArrivals = t => arr.forEach(p => { if (!enq.has(p.name) && p.arrival <= t) { queue.push(p); enq.add(p.name); } });
      enqueueArrivals(0);
      while (completed < n) {
        if (!queue.length) {
          const pend = arr.filter(p => !enq.has(p.name));
          if (!pend.length) break;
          const next = Math.min(...pend.map(p => p.arrival));
          pushSeg(null, clock, next); clock = next; enqueueArrivals(clock); continue;
        }
        const p = queue.shift();
        const run = Math.min(q, rem[p.name]);
        const start = clock;
        for (let s = 0; s < run; s++) { clock++; enqueueArrivals(clock); }
        rem[p.name] -= run;
        pushSeg(p.name, start, clock);
        if (rem[p.name] === 0) { finish[p.name] = clock; completed++; }
        else queue.push(p);
      }
    }

    const rows = procs.map(p => {
      const fin = finish[p.name];
      const ret = fin - p.arrival;          // retorno (turnaround)
      const esp = ret - p.burst;            // espera
      const pen = ret / p.burst;            // penalización
      return { name: p.name, arrival: p.arrival, burst: p.burst, priority: p.priority, fin, ret, esp, pen };
    });
    return { segs, rows };
  }

  /* ---------------- UI ---------------- */
  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field">
            <label>Algoritmo</label>
            <select class="input" id="cpu-algo">
              <option value="fcfs">FCFS (First Come, First Served)</option>
              <option value="sjf">SJF (Shortest Job First)</option>
              <option value="srtf">SRTF (apropiativo)</option>
              <option value="prio">Prioridades (sin apropiación)</option>
              <option value="priop">Prioridades (con apropiación)</option>
              <option value="rr">Round Robin</option>
            </select>
          </div>
          <div class="field" id="cpu-qwrap" style="display:none">
            <label>Quantum</label>
            <input class="input" id="cpu-q" type="number" min="1" value="3" />
          </div>
        </div>

        <div class="tbl-wrap">
          <table class="tbl proc-table">
            <thead><tr><th>Proceso</th><th>Llegada</th><th>Ráfaga</th><th>Prioridad</th><th></th></tr></thead>
            <tbody id="cpu-rows"></tbody>
          </table>
        </div>
        <p class="muted" style="font-size:12px">Prioridad: <strong>menor número = mayor prioridad</strong>.</p>

        <div class="proc-actions">
          <button class="btn btn--primary" id="cpu-run">Calcular</button>
          <button class="btn" id="cpu-add">+ Agregar proceso</button>
          <button class="btn" id="cpu-ex">Cargar ejemplo</button>
          <button class="btn btn--ghost" id="cpu-clear">Limpiar</button>
        </div>

        <div id="cpu-out"></div>
      </div>`;

    const tbody = container.querySelector("#cpu-rows");
    const algoSel = container.querySelector("#cpu-algo");
    const qwrap = container.querySelector("#cpu-qwrap");
    const out = container.querySelector("#cpu-out");

    function addRow(p) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input class="input" value="${p ? p.name : ""}" maxlength="3" style="width:60px"/></td>
        <td><input class="input" type="number" min="0" value="${p ? p.arrival : 0}"/></td>
        <td><input class="input" type="number" min="1" value="${p ? p.burst : 1}"/></td>
        <td><input class="input" type="number" min="1" value="${p ? p.priority : 1}"/></td>
        <td><button class="btn btn--ghost cpu-del" title="Eliminar">✕</button></td>`;
      tbody.appendChild(tr);
      tr.querySelector(".cpu-del").addEventListener("click", () => tr.remove());
    }
    function loadRows(list) { tbody.innerHTML = ""; list.forEach(addRow); }
    function readRows() {
      const rows = [];
      tbody.querySelectorAll("tr").forEach((tr, i) => {
        const cells = tr.querySelectorAll("input");
        const name = (cells[0].value || ("P" + (i + 1))).trim();
        rows.push({
          name,
          arrival: Math.max(0, parseInt(cells[1].value) || 0),
          burst: Math.max(1, parseInt(cells[2].value) || 1),
          priority: Math.max(1, parseInt(cells[3].value) || 1),
        });
      });
      return rows;
    }

    algoSel.addEventListener("change", () => {
      qwrap.style.display = algoSel.value === "rr" ? "" : "none";
    });

    function run() {
      const procs = readRows();
      if (!procs.length) { out.innerHTML = `<div class="result-box empty">Agregá al menos un proceso.</div>`; return; }
      const names = procs.map(p => p.name);
      if (new Set(names).size !== names.length) { out.innerHTML = `<div class="error-text">⚠️ Hay nombres de proceso repetidos.</div>`; return; }
      const algo = algoSel.value;
      const q = parseInt(container.querySelector("#cpu-q").value) || 3;
      const { segs, rows } = simulate(procs, algo, q);
      render(out, procs, segs, rows);
    }

    container.querySelector("#cpu-run").addEventListener("click", run);
    container.querySelector("#cpu-add").addEventListener("click", () => addRow(null));
    container.querySelector("#cpu-ex").addEventListener("click", () => { loadRows(EXAMPLE); algoSel.value = "fcfs"; qwrap.style.display = "none"; run(); });
    container.querySelector("#cpu-clear").addEventListener("click", () => { loadRows([{ name: "P1", arrival: 0, burst: 1, priority: 1 }]); out.innerHTML = ""; });

    loadRows(EXAMPLE);
    run();
  }

  function render(out, procs, segs, rows) {
    const colorOf = {}; procs.forEach((p, i) => colorOf[p.name] = COLORS[i % COLORS.length]);
    const total = segs.length ? segs[segs.length - 1].end : 0;
    const start0 = segs.length ? segs[0].start : 0;
    const span = total - start0 || 1;

    const bars = segs.map(s => {
      const w = ((s.end - s.start) / span) * 100;
      if (s.name === null) return `<div class="gantt-cell" style="flex-grow:${s.end - s.start}"><div class="gantt-bar idle">·</div></div>`;
      return `<div class="gantt-cell" style="flex-grow:${s.end - s.start}"><div class="gantt-bar" style="background:${colorOf[s.name]}">${s.name}</div></div>`;
    }).join("");

    // ejes: marcas en los límites de los segmentos
    const ticks = [];
    segs.forEach((s, i) => { if (i === 0) ticks.push(s.start); ticks.push(s.end); });
    const tickEls = segs.map(s => `<div class="gantt-tick" style="flex-grow:${s.end - s.start}">${s.start}</div>`).join("")
      + `<div class="gantt-tick" style="flex-grow:0">${total}</div>`;

    const legend = procs.map(p => `<span><i style="background:${colorOf[p.name]}"></i>${p.name}</span>`).join("");

    const avgRet = (rows.reduce((s, r) => s + r.ret, 0) / rows.length);
    const avgEsp = (rows.reduce((s, r) => s + r.esp, 0) / rows.length);
    const avgPen = (rows.reduce((s, r) => s + r.pen, 0) / rows.length);

    const tbl = rows.map(r => `<tr>
      <td><strong>${r.name}</strong></td><td>${r.arrival}</td><td>${r.burst}</td>
      <td>${r.fin}</td><td>${r.ret}</td><td>${r.esp}</td><td>${r.pen.toFixed(2)}</td></tr>`).join("");

    out.innerHTML = `
      <h3 style="margin-top:22px">Diagrama de Gantt</h3>
      <div class="legend">${legend}</div>
      <div class="gantt">${bars}</div>
      <div class="gantt-axis">${tickEls}</div>

      <h3>Métricas por proceso</h3>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Proceso</th><th>Llegada</th><th>Ráfaga</th><th>Fin</th><th>Retorno (F)</th><th>Espera (E)</th><th>Penaliz. (P)</th></tr></thead>
        <tbody>${tbl}</tbody>
      </table></div>

      <div class="metric-grid">
        <div class="metric"><div class="metric__num">${avgEsp.toFixed(2)}</div><div class="metric__label">Espera media</div></div>
        <div class="metric"><div class="metric__num">${avgRet.toFixed(2)}</div><div class="metric__label">Retorno medio</div></div>
        <div class="metric"><div class="metric__num">${avgPen.toFixed(2)}</div><div class="metric__label">Penalización media</div></div>
        <div class="metric"><div class="metric__num">${total}</div><div class="metric__label">Tiempo total</div></div>
      </div>`;
  }

  window.Tools = window.Tools || {};
  window.Tools.cpu = build;
})();
