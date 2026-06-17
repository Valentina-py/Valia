/* ============================================================
   HERRAMIENTA — Editor de Grafos → Matrices y Listas
   Dibujá nodos y aristas; se generan en vivo la matriz de
   adyacencia, la matriz de costos y las listas de adyacencia.
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});
  const W = 560, H = 320, R = 18;

  function build(container) {
    let nodes = [];   // {x,y}
    let edges = [];   // {a,b,w}
    let mode = "nodo";
    let sel = -1;
    let dragging = -1;

    function preset() {
      nodes = [
        { x: 120, y: 70 }, { x: 300, y: 55 }, { x: 460, y: 95 },
        { x: 110, y: 220 }, { x: 300, y: 250 }, { x: 460, y: 230 },
      ];
      edges = [
        { a: 0, b: 1, w: 2 }, { a: 1, b: 2, w: 3 }, { a: 0, b: 3, w: 1 },
        { a: 1, b: 4, w: 2 }, { a: 3, b: 4, w: 4 }, { a: 4, b: 5, w: 1 }, { a: 2, b: 5, w: 5 },
      ];
    }
    preset();

    container.innerHTML = `
      <div class="tool">
        <div class="btn-row" style="margin-top:0">
          <button class="btn" data-mode="nodo">+ Nodo</button>
          <button class="btn" data-mode="arista">+ Arista</button>
          <button class="btn" data-mode="mover">Mover</button>
          <button class="btn" data-mode="borrar">Borrar</button>
          <span class="field" style="margin:0 0 0 auto"><label style="display:inline">Peso</label>
            <input class="input input--mono" id="gr-w" value="1" style="width:64px;display:inline-block" /></span>
        </div>
        <div class="viz-stage"><svg class="viz-svg" id="gr-svg" viewBox="0 0 ${W} ${H}"></svg></div>
        <p class="viz-hint" id="gr-hint"></p>
        <div class="btn-row">
          <button class="btn btn--primary" id="gr-preset">Ejemplo</button>
          <button class="btn" id="gr-clear">Vaciar</button>
          <label style="display:inline-flex;align-items:center;gap:6px;margin-left:auto">
            <input type="checkbox" id="gr-dir" /> Dirigido</label>
        </div>
        <div id="gr-out"></div>
      </div>`;

    const $ = s => container.querySelector(s);
    const svg = $("#gr-svg"), out = $("#gr-out"), hint = $("#gr-hint");
    const dirEl = $("#gr-dir");
    const SVGNS = "http://www.w3.org/2000/svg";

    const HINTS = {
      nodo: "Modo Nodo: tocá un lugar vacío para agregar un vértice.",
      arista: "Modo Arista: tocá un nodo y luego otro para conectarlos con el peso indicado.",
      mover: "Modo Mover: arrastrá los nodos para reubicarlos.",
      borrar: "Modo Borrar: tocá un nodo (se borra con sus aristas) o una arista para eliminarla.",
    };

    function setMode(m) {
      mode = m; sel = -1;
      container.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("btn--primary", b.dataset.mode === m));
      hint.textContent = HINTS[m];
      render();
    }

    function svgPoint(evt) {
      const r = svg.getBoundingClientRect();
      const px = (evt.touches ? evt.touches[0].clientX : evt.clientX) - r.left;
      const py = (evt.touches ? evt.touches[0].clientY : evt.clientY) - r.top;
      return { x: px * W / r.width, y: py * H / r.height };
    }
    function nodeAt(p) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const d = Math.hypot(nodes[i].x - p.x, nodes[i].y - p.y);
        if (d <= R + 4) return i;
      }
      return -1;
    }
    function edgeAt(p) {
      for (let i = 0; i < edges.length; i++) {
        const A = nodes[edges[i].a], B = nodes[edges[i].b];
        const d = distToSeg(p, A, B);
        if (d < 8) return i;
      }
      return -1;
    }
    function distToSeg(p, a, b) {
      const dx = b.x - a.x, dy = b.y - a.y;
      const l2 = dx * dx + dy * dy || 1;
      let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
    }

    function addEdge(a, b) {
      if (a === b) return;
      const w = parseFloat($("#gr-w").value) || 1;
      const ex = edges.find(e => (e.a === a && e.b === b) || (e.a === b && e.b === a));
      if (ex) ex.w = w; else edges.push({ a, b, w });
    }

    function onDown(evt) {
      evt.preventDefault();
      const p = svgPoint(evt);
      const ni = nodeAt(p);
      if (mode === "nodo") {
        if (ni < 0) { nodes.push({ x: p.x, y: p.y }); render(); }
      } else if (mode === "arista") {
        if (ni >= 0) {
          if (sel < 0) { sel = ni; render(); }
          else { addEdge(sel, ni); sel = -1; render(); }
        }
      } else if (mode === "mover") {
        if (ni >= 0) dragging = ni;
      } else if (mode === "borrar") {
        if (ni >= 0) {
          edges = edges.filter(e => e.a !== ni && e.b !== ni)
            .map(e => ({ a: e.a > ni ? e.a - 1 : e.a, b: e.b > ni ? e.b - 1 : e.b, w: e.w }));
          nodes.splice(ni, 1); render();
        } else {
          const ei = edgeAt(p);
          if (ei >= 0) { edges.splice(ei, 1); render(); }
        }
      }
    }
    function onMove(evt) {
      if (dragging < 0) return;
      evt.preventDefault();
      const p = svgPoint(evt);
      nodes[dragging].x = Math.max(R, Math.min(W - R, p.x));
      nodes[dragging].y = Math.max(R, Math.min(H - R, p.y));
      render();
    }
    function onUp() { dragging = -1; }

    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    function el(tag, attrs, txt) {
      const e = document.createElementNS(SVGNS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (txt != null) e.textContent = txt;
      return e;
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const directed = dirEl.checked;
      if (directed) {
        const defs = el("defs", {});
        defs.innerHTML = `<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker>`;
        svg.appendChild(defs);
      }
      edges.forEach(e => {
        const A = nodes[e.a], B = nodes[e.b];
        if (!A || !B) return;
        const line = el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "gedge" });
        if (directed) line.setAttribute("marker-end", "url(#arrow)");
        svg.appendChild(line);
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        svg.appendChild(el("rect", { x: mx - 11, y: my - 10, width: 22, height: 16, rx: 4, class: "gedge-w-bg" }));
        svg.appendChild(el("text", { x: mx, y: my + 2, "text-anchor": "middle", class: "gedge-w" }, e.w));
      });
      nodes.forEach((nd, i) => {
        const c = el("circle", { cx: nd.x, cy: nd.y, r: R, class: "gnode" + (i === sel ? " active" : "") });
        svg.appendChild(c);
        svg.appendChild(el("text", { x: nd.x, y: nd.y, class: "gnode-label" }, i + 1));
      });
      renderOut();
    }

    function renderOut() {
      const m = nodes.length;
      const directed = dirEl.checked;
      if (m === 0) { out.innerHTML = `<div class="result-box empty">Agregá nodos y aristas para ver las representaciones.</div>`; return; }
      const adj = Array.from({ length: m }, () => new Array(m).fill(0));
      const cost = Array.from({ length: m }, () => new Array(m).fill(0));
      edges.forEach(e => {
        adj[e.a][e.b] = 1; cost[e.a][e.b] = e.w;
        if (!directed) { adj[e.b][e.a] = 1; cost[e.b][e.a] = e.w; }
      });
      const head = `<th></th>` + Array.from({ length: m }, (_, j) => `<th>${j + 1}</th>`).join("");
      const matTbl = (mtx) => `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head}</tr></thead><tbody>` +
        mtx.map((row, i) => `<tr><th>${i + 1}</th>${row.map(v => `<td>${v || "·"}</td>`).join("")}</tr>`).join("") +
        `</tbody></table></div>`;
      const lists = nodes.map((_, i) => {
        const ad = [];
        for (let j = 0; j < m; j++) if (adj[i][j]) ad.push(j + 1);
        return `<div><code>${i + 1}</code> → ${ad.length ? ad.join(" → ") + " → X" : "X"}</div>`;
      }).join("");
      // grados
      const grados = nodes.map((_, i) => {
        let g = 0; for (let j = 0; j < m; j++) g += adj[i][j] + (i === j ? adj[i][j] : 0);
        if (!directed) { g = 0; for (let j = 0; j < m; j++) { if (adj[i][j]) g += (i === j ? 2 : 1); } }
        return g;
      });
      const impares = grados.filter(g => g % 2 === 1).length;
      out.innerHTML = `
        <h3>Matriz de adyacencia</h3>${matTbl(adj)}
        <h3>Matriz de costos</h3>${matTbl(cost)}
        <h3>Listas de adyacencia</h3><div class="trace">${lists}</div>
        <div class="callout ${impares === 0 || impares === 2 ? "tip" : ""}">
          <strong class="callout__tag">Grados</strong>
          ${grados.map((g, i) => `nodo ${i + 1}: <strong>${g}</strong>`).join(" · ")}.
          ${!directed ? ` Nodos de grado impar: <strong>${impares}</strong> ⇒ ${impares === 0 ? "puede tener ciclo de Euler." : impares === 2 ? "puede tener camino de Euler." : "no tiene recorrido de Euler."}` : ""}
        </div>`;
    }

    container.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
    $("#gr-preset").addEventListener("click", () => { preset(); sel = -1; render(); });
    $("#gr-clear").addEventListener("click", () => { nodes = []; edges = []; sel = -1; render(); });
    dirEl.addEventListener("change", render);

    setMode("arista");
  }

  Tools.grafos = build;
})();
