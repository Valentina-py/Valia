/* ============================================================
   HERRAMIENTA — Caminos y Recorridos sobre grafos
   Dijkstra · Floyd · DFS/BFS · Prim (MST) · detector de Euler
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});
  const W = 560, H = 320, R = 17;
  const lbl = i => String.fromCharCode(65 + i);

  // Grafo de ejemplo (no dirigido, ponderado)
  function makeGraph() {
    const nodes = [
      { x: 90, y: 90 }, { x: 280, y: 55 }, { x: 470, y: 80 },
      { x: 90, y: 250 }, { x: 280, y: 200 }, { x: 470, y: 220 }, { x: 280, y: 295 },
    ];
    const edges = [
      { a: 0, b: 1, w: 2 }, { a: 1, b: 2, w: 3 }, { a: 2, b: 5, w: 4 },
      { a: 5, b: 4, w: 1 }, { a: 4, b: 1, w: 2 }, { a: 4, b: 3, w: 3 },
      { a: 3, b: 0, w: 1 }, { a: 5, b: 6, w: 2 }, { a: 6, b: 4, w: 5 },
    ];
    const n = nodes.length;
    const adj = Array.from({ length: n }, () => []);
    edges.forEach(e => { adj[e.a].push({ to: e.b, w: e.w }); adj[e.b].push({ to: e.a, w: e.w }); });
    return { nodes, edges, adj, n };
  }

  function dijkstra(G, src) {
    const INF = Infinity, dist = new Array(G.n).fill(INF), prev = new Array(G.n).fill(-1);
    const done = new Array(G.n).fill(false);
    dist[src] = 0;
    const steps = [];
    for (let it = 0; it < G.n; it++) {
      let u = -1, best = INF;
      for (let i = 0; i < G.n; i++) if (!done[i] && dist[i] < best) { best = dist[i]; u = i; }
      if (u < 0) break;
      done[u] = true;
      steps.push(`Selecciono ${lbl(u)} con d=${dist[u]}`);
      G.adj[u].forEach(({ to, w }) => {
        if (dist[u] + w < dist[to]) { dist[to] = dist[u] + w; prev[to] = u; }
      });
    }
    return { dist, prev, steps };
  }
  function pathFrom(prev, dst) {
    const path = []; let u = dst;
    while (u >= 0) { path.unshift(u); u = prev[u]; }
    return path;
  }
  function floyd(G) {
    const INF = Infinity, n = G.n;
    const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 0 : INF));
    G.edges.forEach(e => { D[e.a][e.b] = Math.min(D[e.a][e.b], e.w); D[e.b][e.a] = Math.min(D[e.b][e.a], e.w); });
    for (let t = 0; t < n; t++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
      if (D[i][t] + D[t][j] < D[i][j]) D[i][j] = D[i][t] + D[t][j];
    return D;
  }
  function dfs(G, start) {
    const vis = new Array(G.n).fill(false), order = [];
    (function rec(v) {
      vis[v] = true; order.push(v);
      G.adj[v].slice().sort((a, b) => a.to - b.to).forEach(({ to }) => { if (!vis[to]) rec(to); });
    })(start);
    return order;
  }
  function bfs(G, start) {
    const state = new Array(G.n).fill(0), order = [], q = [start]; state[start] = 1;
    while (q.length) {
      const v = q.shift(); order.push(v);
      G.adj[v].slice().sort((a, b) => a.to - b.to).forEach(({ to }) => { if (state[to] === 0) { state[to] = 1; q.push(to); } });
    }
    return order;
  }
  function prim(G, start) {
    const inC = new Array(G.n).fill(false); inC[start] = true;
    const tree = []; let cost = 0;
    for (let it = 1; it < G.n; it++) {
      let best = null;
      G.edges.forEach(e => {
        const cross = (inC[e.a] && !inC[e.b]) || (inC[e.b] && !inC[e.a]);
        if (cross && (!best || e.w < best.w)) best = e;
      });
      if (!best) break;
      tree.push(best); cost += best.w;
      inC[best.a] = true; inC[best.b] = true;
    }
    return { tree, cost };
  }
  function degrees(G) {
    const deg = new Array(G.n).fill(0);
    G.edges.forEach(e => { deg[e.a]++; deg[e.b]++; });
    return deg;
  }

  function build(container) {
    const G = makeGraph();
    let tab = "dijkstra";
    container.innerHTML = `
      <div class="tool">
        <div class="tabs" id="cm-tabs">
          <button class="tab" data-t="dijkstra">Dijkstra</button>
          <button class="tab" data-t="floyd">Floyd</button>
          <button class="tab" data-t="recorridos">DFS / BFS</button>
          <button class="tab" data-t="prim">Árbol cubridor (Prim)</button>
          <button class="tab" data-t="euler">Euler</button>
        </div>
        <div class="viz-stage"><svg class="viz-svg" id="cm-svg" viewBox="0 0 ${W} ${H}"></svg></div>
        <div id="cm-ctrl"></div>
        <div id="cm-out"></div>
      </div>`;
    const $ = s => container.querySelector(s);
    const svg = $("#cm-svg"), ctrl = $("#cm-ctrl"), out = $("#cm-out");
    const SVGNS = "http://www.w3.org/2000/svg";
    function el(tag, attrs, txt) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (txt != null) e.textContent = txt; return e; }

    function render(hlEdges, nodeClass) {
      hlEdges = hlEdges || new Set();
      nodeClass = nodeClass || {};
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      G.edges.forEach((e, i) => {
        const A = G.nodes[e.a], B = G.nodes[e.b];
        svg.appendChild(el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "gedge" + (hlEdges.has(i) ? " path" : "") }));
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        svg.appendChild(el("rect", { x: mx - 10, y: my - 9, width: 20, height: 15, rx: 4, class: "gedge-w-bg" }));
        svg.appendChild(el("text", { x: mx, y: my + 2, "text-anchor": "middle", class: "gedge-w" }, e.w));
      });
      G.nodes.forEach((nd, i) => {
        svg.appendChild(el("circle", { cx: nd.x, cy: nd.y, r: R, class: "gnode" + (nodeClass[i] ? " " + nodeClass[i] : "") }));
        svg.appendChild(el("text", { x: nd.x, y: nd.y, class: "gnode-label" }, lbl(i)));
      });
    }
    const edgeIndex = (a, b) => G.edges.findIndex(e => (e.a === a && e.b === b) || (e.a === b && e.b === a));
    function nodeSelect(id, label, sel) {
      return `<div class="field"><label>${label}</label><select class="input" id="${id}">${
        G.nodes.map((_, i) => `<option value="${i}" ${i === sel ? "selected" : ""}>${lbl(i)}</option>`).join("")}</select></div>`;
    }

    function runDijkstra() {
      ctrl.innerHTML = `<div class="field-row">${nodeSelect("cm-src", "Origen", 0)}${nodeSelect("cm-dst", "Destino", 2)}</div>
        <div class="btn-row"><button class="btn btn--primary" id="cm-go">Calcular camino mínimo</button></div>`;
      $("#cm-go").addEventListener("click", () => {
        const src = +$("#cm-src").value, dst = +$("#cm-dst").value;
        const { dist, prev, steps } = dijkstra(G, src);
        const path = pathFrom(prev, dst);
        const hl = new Set(); for (let k = 1; k < path.length; k++) hl.add(edgeIndex(path[k - 1], path[k]));
        const nc = {}; path.forEach(p => nc[p] = "done"); nc[src] = "in-set"; nc[dst] = "active";
        render(hl, nc);
        out.innerHTML = `<div class="result-box ${dist[dst] === Infinity ? "" : ""}">
          <strong>Costo mínimo ${lbl(src)} → ${lbl(dst)} = ${dist[dst] === Infinity ? "∞ (sin camino)" : dist[dst]}</strong><br>
          Camino: ${path.map(lbl).join(" → ")}</div>
          <h3>Distancias desde ${lbl(src)}</h3>
          <div class="tbl-wrap"><table class="tbl"><thead><tr>${G.nodes.map((_, i) => `<th>${lbl(i)}</th>`).join("")}</tr></thead>
          <tbody><tr>${dist.map(d => `<td>${d === Infinity ? "∞" : d}</td>`).join("")}</tr></tbody></table></div>
          <div class="trace">${steps.join("\n")}</div>`;
      });
      $("#cm-go").click();
    }
    function runFloyd() {
      ctrl.innerHTML = `<div class="field-row">${nodeSelect("cm-i", "De", 0)}${nodeSelect("cm-j", "A", 6)}</div>`;
      render();
      const D = floyd(G);
      function show() {
        const i = +$("#cm-i").value, j = +$("#cm-j").value;
        const head = `<th></th>` + G.nodes.map((_, k) => `<th>${lbl(k)}</th>`).join("");
        out.innerHTML = `<div class="result-box"><strong>Costo mínimo ${lbl(i)} → ${lbl(j)} = ${D[i][j] === Infinity ? "∞" : D[i][j]}</strong></div>
          <h3>Matriz de costos mínimos (todos los pares)</h3>
          <div class="tbl-wrap"><table class="tbl"><thead><tr>${head}</tr></thead><tbody>${
            D.map((row, r) => `<tr><th>${lbl(r)}</th>${row.map((v, c) => `<td style="${r === i && c === j ? "background:var(--accent-soft);font-weight:700" : ""}">${v === Infinity ? "∞" : v}</td>`).join("")}</tr>`).join("")
          }</tbody></table></div>`;
      }
      $("#cm-i").addEventListener("change", show); $("#cm-j").addEventListener("change", show); show();
    }
    function runRecorridos() {
      ctrl.innerHTML = `${nodeSelect("cm-st", "Nodo inicial", 0)}
        <div class="btn-row"><button class="btn btn--primary" id="cm-dfs">Recorrer DFS</button><button class="btn" id="cm-bfs">Recorrer BFS</button></div>`;
      function showOrder(order, name, desc) {
        const nc = {}; order.forEach(o => nc[o] = "done"); nc[order[0]] = "in-set";
        render(new Set(), nc);
        out.innerHTML = `<div class="result-box"><strong>${name}:</strong> ${order.map(lbl).join(" → ")}</div><p class="viz-hint">${desc}</p>`;
      }
      $("#cm-dfs").addEventListener("click", () => showOrder(dfs(G, +$("#cm-st").value), "DFS (en profundidad)", "Avanza por un camino hasta el fondo y retrocede (backtracking, vía recursión/pila)."));
      $("#cm-bfs").addEventListener("click", () => showOrder(bfs(G, +$("#cm-st").value), "BFS (en anchura)", "Visita por niveles usando una cola (FIFO): primero los vecinos, luego los vecinos de éstos."));
      $("#cm-dfs").click();
    }
    function runPrim() {
      ctrl.innerHTML = `${nodeSelect("cm-pst", "Nodo inicial", 0)}<div class="btn-row"><button class="btn btn--primary" id="cm-prim">Construir MST</button></div>`;
      $("#cm-prim").addEventListener("click", () => {
        const { tree, cost } = prim(G, +$("#cm-pst").value);
        const hl = new Set(); tree.forEach(e => hl.add(edgeIndex(e.a, e.b)));
        const nc = {}; G.nodes.forEach((_, i) => nc[i] = "in-set");
        render(hl, nc);
        out.innerHTML = `<div class="result-box"><strong>Árbol cubridor mínimo · costo total = ${cost}</strong><br>
          Aristas: ${tree.map(e => `{${lbl(e.a)},${lbl(e.b)}}·${e.w}`).join("  ")}</div>
          <p class="viz-hint">Prim agrega en cada paso la arista de menor costo que conecta un nodo nuevo.</p>`;
      });
      $("#cm-prim").click();
    }
    function runEuler() {
      ctrl.innerHTML = "";
      const deg = degrees(G);
      const impares = deg.map((d, i) => ({ d, i })).filter(o => o.d % 2 === 1);
      render();
      let verdict, cls;
      if (impares.length === 0) { verdict = "Tiene <strong>ciclo de Euler</strong>: es conexo y todos los nodos tienen grado par."; cls = "tip"; }
      else if (impares.length === 2) { verdict = `Tiene <strong>camino de Euler</strong>: hay exactamente 2 nodos de grado impar (${impares.map(o => lbl(o.i)).join(" y ")}). El camino debe empezar en uno y terminar en el otro.`; cls = "tip"; }
      else { verdict = `<strong>No tiene</strong> recorrido de Euler: hay ${impares.length} nodos de grado impar (deben ser 0 o 2).`; cls = "warn"; }
      out.innerHTML = `<h3>Grados de los nodos</h3>
        <div class="tbl-wrap"><table class="tbl"><thead><tr>${G.nodes.map((_, i) => `<th>${lbl(i)}</th>`).join("")}</tr></thead>
        <tbody><tr>${deg.map(d => `<td class="${d % 2 ? "v-false" : "v-true"}">${d}</td>`).join("")}</tr></tbody></table></div>
        <div class="callout ${cls}"><strong class="callout__tag">Teorema de Euler</strong>${verdict}</div>`;
    }

    function setTab(t) {
      tab = t;
      container.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.t === t));
      ({ dijkstra: runDijkstra, floyd: runFloyd, recorridos: runRecorridos, prim: runPrim, euler: runEuler })[t]();
    }
    container.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => setTab(b.dataset.t)));
    setTab("dijkstra");
  }

  Tools.caminos = build;
})();
