/* ============================================================
   HERRAMIENTA: Planificación de disco
   FCFS · SSTF · SCAN · C-SCAN · LOOK · C-LOOK
   Calcula el orden de atención, el desplazamiento total del cabezal
   y dibuja el recorrido.
   ============================================================ */
(function () {
  "use strict";

  function plan(reqs, head, diskMax, algo, dir) {
    const reqSet = new Set(reqs);
    let points = [head];

    if (algo === "fcfs") {
      points = [head, ...reqs];
    } else if (algo === "sstf") {
      const pool = reqs.slice(); let cur = head;
      while (pool.length) {
        let best = 0;
        for (let i = 1; i < pool.length; i++) if (Math.abs(pool[i] - cur) < Math.abs(pool[best] - cur)) best = i;
        cur = pool[best]; points.push(cur); pool.splice(best, 1);
      }
    } else {
      const sorted = reqs.slice().sort((a, b) => a - b);
      const higher = sorted.filter(r => r >= head);
      const lower = sorted.filter(r => r < head).reverse(); // desc
      const lowerAsc = sorted.filter(r => r < head);
      if (dir === "up") {
        if (algo === "scan") { points = [head, ...higher]; if (head < diskMax && lower.length) points.push(diskMax); points.push(...lower); }
        else if (algo === "cscan") { points = [head, ...higher]; if (lowerAsc.length) { points.push(diskMax, 0); points.push(...lowerAsc); } }
        else if (algo === "look") { points = [head, ...higher, ...lower]; }
        else if (algo === "clook") { points = [head, ...higher, ...lowerAsc]; }
      } else { // down
        const higherAsc = sorted.filter(r => r >= head);
        const higherDesc = higherAsc.slice().reverse();
        if (algo === "scan") { points = [head, ...lower]; if (head > 0 && higherAsc.length) points.push(0); points.push(...higherAsc); }
        else if (algo === "cscan") { points = [head, ...lower]; if (higherDesc.length) { points.push(0, diskMax); points.push(...higherDesc); } }
        else if (algo === "look") { points = [head, ...lower, ...higherAsc]; }
        else if (algo === "clook") { points = [head, ...lower, ...higherDesc]; }
      }
    }

    let total = 0;
    for (let i = 1; i < points.length; i++) total += Math.abs(points[i] - points[i - 1]);
    const served = points.slice(1).filter(p => reqSet.has(p));
    return { points, total, served };
  }

  function drawSVG(points, diskMax) {
    const W = 600, H = Math.max(180, 36 * points.length), padX = 44, padTop = 26, padBot = 16;
    const innerW = W - padX * 2, innerH = H - padTop - padBot;
    const x = pos => padX + (pos / diskMax) * innerW;
    const y = step => padTop + (points.length <= 1 ? 0 : (step / (points.length - 1)) * innerH);

    let ticks = "";
    for (let i = 0; i <= 5; i++) {
      const v = Math.round((diskMax / 5) * i);
      ticks += `<text class="disk-label" x="${x(v)}" y="14" text-anchor="middle">${v}</text>`;
    }
    let poly = points.map((p, i) => `${x(p)},${y(i)}`).join(" ");
    let dots = points.map((p, i) => `<circle class="disk-dot" cx="${x(p)}" cy="${y(i)}" r="4"/>
      <text class="disk-label" x="${x(p)}" y="${y(i) - 7}" text-anchor="middle">${p}</text>`).join("");
    return `<svg class="disk-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
      <polyline class="disk-path" points="${poly}"/>${dots}${ticks}</svg>`;
  }

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field-row--3">
          <div class="field"><label>Posición inicial del cabezal</label><input class="input" id="dk-head" type="number" min="0" value="53"/></div>
          <div class="field"><label>Tamaño del disco (cilindro máx.)</label><input class="input" id="dk-max" type="number" min="1" value="199"/></div>
          <div class="field"><label>Algoritmo</label>
            <select class="input" id="dk-algo">
              <option value="fcfs">FCFS</option><option value="sstf">SSTF</option>
              <option value="scan">SCAN</option><option value="cscan">C-SCAN</option>
              <option value="look">LOOK</option><option value="clook">C-LOOK</option>
            </select>
          </div>
        </div>
        <div class="field-row">
          <div class="field"><label>Cola de solicitudes (pistas)</label><input class="input input--mono" id="dk-reqs" value="98 183 37 122 14 124 65 67"/></div>
          <div class="field" id="dk-dirwrap"><label>Dirección inicial</label>
            <select class="input" id="dk-dir"><option value="up">Hacia arriba (↑)</option><option value="down">Hacia abajo (↓)</option></select>
          </div>
        </div>
        <div class="proc-actions"><button class="btn btn--primary" id="dk-go">Calcular</button></div>
        <div id="dk-out"></div>
      </div>`;
    const algo = container.querySelector("#dk-algo");
    const dirwrap = container.querySelector("#dk-dirwrap");
    algo.addEventListener("change", () => { dirwrap.style.display = (algo.value === "fcfs" || algo.value === "sstf") ? "none" : ""; });
    dirwrap.style.display = "none";

    function go() {
      const head = parseInt(container.querySelector("#dk-head").value) || 0;
      const diskMax = Math.max(1, parseInt(container.querySelector("#dk-max").value) || 199);
      const dir = container.querySelector("#dk-dir").value;
      const reqs = container.querySelector("#dk-reqs").value.split(/[\s,]+/).filter(x => x !== "").map(Number);
      const out = container.querySelector("#dk-out");
      if (!reqs.length || reqs.some(isNaN)) { out.innerHTML = `<div class="error-text">⚠️ Ingresá una cola de pistas válida.</div>`; return; }
      const { points, total, served } = plan(reqs, head, diskMax, algo.value, dir);
      out.innerHTML = `
        <div class="result-box">
          <strong>Orden de atención:</strong> ${head} → ${served.join(" → ")}<br>
          <strong>Recorrido completo:</strong> ${points.join(" → ")}
        </div>
        <div class="metric-grid" style="margin-bottom:14px">
          <div class="metric"><div class="metric__num">${total}</div><div class="metric__label">Desplazamiento total (pistas)</div></div>
          <div class="metric"><div class="metric__num">${(total / served.length).toFixed(1)}</div><div class="metric__label">Promedio por solicitud</div></div>
        </div>
        ${drawSVG(points, diskMax)}`;
    }
    container.querySelector("#dk-go").addEventListener("click", go);
    go();
  }

  window.Tools = window.Tools || {};
  window.Tools.disk = build;
})();
