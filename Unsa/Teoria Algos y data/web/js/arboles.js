/* ============================================================
   HERRAMIENTA — Árbol ABB / AVL interactivo
   Insertar, buscar, eliminar; recorridos y rotaciones AVL.
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  function build(container) {
    let root = null;
    let avl = false;
    let highlight = new Set();   // valores resaltados (búsqueda)
    let msgs = [];

    const node = v => ({ v, l: null, r: null, h: 1 });
    const h = n => n ? n.h : 0;
    const upd = n => { n.h = 1 + Math.max(h(n.l), h(n.r)); };
    const bf = n => n ? h(n.l) - h(n.r) : 0;

    function rotR(y) { const x = y.l; y.l = x.r; x.r = y; upd(y); upd(x); return x; }
    function rotL(x) { const y = x.r; x.r = y.l; y.l = x; upd(x); upd(y); return y; }

    function rebalance(n, label) {
      upd(n);
      const b = bf(n);
      if (b > 1) {
        if (bf(n.l) >= 0) { msgs.push(`Desbalance en ${n.v} (FE=+${b}, izq-izq) → rotación simple a la derecha`); return rotR(n); }
        else { msgs.push(`Desbalance en ${n.v} (FE=+${b}, izq-der) → rotación doble izquierda-derecha`); n.l = rotL(n.l); return rotR(n); }
      }
      if (b < -1) {
        if (bf(n.r) <= 0) { msgs.push(`Desbalance en ${n.v} (FE=${b}, der-der) → rotación simple a la izquierda`); return rotL(n); }
        else { msgs.push(`Desbalance en ${n.v} (FE=${b}, der-izq) → rotación doble derecha-izquierda`); n.r = rotR(n.r); return rotL(n); }
      }
      return n;
    }

    function insert(n, v) {
      if (!n) return node(v);
      if (v < n.v) n.l = insert(n.l, v);
      else if (v > n.v) n.r = insert(n.r, v);
      else return n; // ya existe
      return avl ? rebalance(n) : (upd(n), n);
    }
    function minNode(n) { while (n.l) n = n.l; return n; }
    function remove(n, v) {
      if (!n) return null;
      if (v < n.v) n.l = remove(n.l, v);
      else if (v > n.v) n.r = remove(n.r, v);
      else {
        if (!n.l) return n.r;
        if (!n.r) return n.l;
        const suc = minNode(n.r);   // sucesor inorden
        n.v = suc.v;
        n.r = remove(n.r, suc.v);
      }
      return avl ? rebalance(n) : (upd(n), n);
    }
    function searchPath(v) {
      const path = []; let n = root;
      while (n) { path.push(n.v); if (v === n.v) return { found: true, path }; n = v < n.v ? n.l : n.r; }
      return { found: false, path };
    }
    function trav(n, type, acc) {
      if (!n) return;
      if (type === "pre") acc.push(n.v);
      trav(n.l, type, acc);
      if (type === "in") acc.push(n.v);
      trav(n.r, type, acc);
      if (type === "post") acc.push(n.v);
    }

    container.innerHTML = `
      <div class="tool">
        <div class="field-row--3" style="display:grid;gap:12px">
          <div class="field"><label>Valor</label><input class="input input--mono" id="ab-v" type="number" placeholder="ej: 50" /></div>
          <div class="field"><label>Modo</label>
            <select class="input" id="ab-mode"><option value="abb">ABB (sin balancear)</option><option value="avl">AVL (auto-balanceado)</option></select></div>
          <div class="field"><label>&nbsp;</label>
            <label style="display:inline-flex;align-items:center;gap:6px;font-weight:500">cargar ejemplo al cambiar de modo</label></div>
        </div>
        <div class="btn-row" style="margin-top:0">
          <button class="btn btn--primary" id="ab-ins">Insertar</button>
          <button class="btn" id="ab-find">Buscar</button>
          <button class="btn" id="ab-del">Eliminar</button>
          <button class="btn" id="ab-rand">Aleatorio</button>
          <button class="btn" id="ab-clear">Vaciar</button>
        </div>
        <div class="viz-stage"><svg class="viz-svg" id="ab-svg" viewBox="0 0 560 300"></svg></div>
        <div id="ab-msg"></div>
        <div id="ab-trav"></div>
      </div>`;

    const $ = s => container.querySelector(s);
    const svg = $("#ab-svg"), msgEl = $("#ab-msg"), travEl = $("#ab-trav"), vEl = $("#ab-v");
    const SVGNS = "http://www.w3.org/2000/svg";
    function el(tag, attrs, txt) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (txt != null) e.textContent = txt; return e; }

    function layout() {
      // asigna x por índice inorden, y por profundidad
      let idx = 0; const pos = new Map(); let maxDepth = 0;
      (function rec(n, d) {
        if (!n) return;
        rec(n.l, d + 1);
        pos.set(n, { i: idx++, d }); maxDepth = Math.max(maxDepth, d);
        rec(n.r, d + 1);
      })(root, 0);
      return { pos, count: idx, maxDepth };
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const { pos, count, maxDepth } = layout();
      if (count === 0) { svg.setAttribute("viewBox", "0 0 560 120"); svg.appendChild(el("text", { x: 280, y: 65, "text-anchor": "middle", class: "gnode-label", fill: "var(--muted)" }, "Árbol vacío — insertá un valor")); return; }
      const Wd = Math.max(560, count * 56), levelH = 70, top = 30;
      const Ht = top + maxDepth * levelH + 40;
      svg.setAttribute("viewBox", `0 0 ${Wd} ${Ht}`);
      const stepX = Wd / count;
      const xy = n => ({ x: (pos.get(n).i + 0.5) * stepX, y: top + pos.get(n).d * levelH });
      (function edges(n) {
        if (!n) return;
        const p = xy(n);
        [n.l, n.r].forEach(c => { if (c) { const q = xy(c); svg.appendChild(el("line", { x1: p.x, y1: p.y, x2: q.x, y2: q.y, class: "gedge" })); } });
        edges(n.l); edges(n.r);
      })(root);
      (function nodes(n) {
        if (!n) return;
        const p = xy(n);
        const cls = "gnode" + (highlight.has(n.v) ? " active" : "");
        svg.appendChild(el("circle", { cx: p.x, cy: p.y, r: 18, class: cls }));
        svg.appendChild(el("text", { x: p.x, y: p.y, class: "gnode-label" }, n.v));
        if (avl) svg.appendChild(el("text", { x: p.x + 22, y: p.y - 14, class: "gedge-w", fill: "var(--muted)" }, (bf(n) > 0 ? "+" : "") + bf(n)));
        nodes(n.l); nodes(n.r);
      })(root);
      renderTrav();
    }
    function renderTrav() {
      const pre = [], ino = [], post = [];
      trav(root, "pre", pre); trav(root, "in", ino); trav(root, "post", post);
      travEl.innerHTML = root ? `
        <h3 style="margin-bottom:6px">Recorridos</h3>
        <div class="trace"><div><span class="hl">Preorden</span>  (R,I,D): ${pre.join(", ")}</div>
        <div><span class="hl">Inorden</span>   (I,R,D): ${ino.join(", ")}  ${avl || isOrdered(ino) ? "← ordenado ✓" : ""}</div>
        <div><span class="hl">Postorden</span> (I,D,R): ${post.join(", ")}</div>
        <div style="margin-top:6px;color:var(--muted)">Altura del árbol: ${h(root)} · ${root && pre.length ? pre.length + " nodos" : ""}</div></div>` : "";
    }
    const isOrdered = a => a.every((x, i) => i === 0 || a[i - 1] <= x);

    function setMsg(html, kind) {
      msgEl.innerHTML = `<div class="result-box ${kind === "empty" ? "empty" : ""}" style="${kind === "bad" ? "border-color:var(--bad)" : kind === "ok" ? "border-color:var(--ok)" : ""}">${html}</div>`;
    }
    function getVal() { const v = parseInt(vEl.value, 10); return Number.isFinite(v) ? v : null; }

    $("#ab-ins").addEventListener("click", () => {
      const v = getVal(); if (v == null) return setMsg("Escribí un número entero.", "bad");
      msgs = []; highlight = new Set([v]);
      const before = h(root);
      root = insert(root, v);
      let m = `Insertado <strong>${v}</strong>.`;
      if (msgs.length) m += " " + msgs.join(". ") + ".";
      else if (avl) m += " Sin rebalanceo necesario.";
      setMsg(m, "ok"); render(); vEl.value = "";
    });
    $("#ab-find").addEventListener("click", () => {
      const v = getVal(); if (v == null) return setMsg("Escribí un número.", "bad");
      const { found, path } = searchPath(v);
      highlight = new Set(path);
      setMsg(`Buscar ${v}: ${path.join(" → ") || "(árbol vacío)"} → <strong>${found ? "SÍ está" : "NO está"}</strong>.`, found ? "ok" : "");
      render();
    });
    $("#ab-del").addEventListener("click", () => {
      const v = getVal(); if (v == null) return setMsg("Escribí un número.", "bad");
      const { found } = searchPath(v);
      if (!found) return setMsg(`El valor ${v} no está en el árbol.`, "bad");
      msgs = []; highlight = new Set();
      root = remove(root, v);
      let m = `Eliminado <strong>${v}</strong> (reemplazo por sucesor inorden si tenía dos hijos).`;
      if (msgs.length) m += " " + msgs.join(". ") + ".";
      setMsg(m, "ok"); render(); vEl.value = "";
    });
    $("#ab-rand").addEventListener("click", () => {
      const v = Math.floor(Math.random() * 99) + 1; vEl.value = v; $("#ab-ins").click();
    });
    $("#ab-clear").addEventListener("click", () => { root = null; highlight = new Set(); setMsg("Árbol vacío.", "empty"); render(); });
    $("#ab-mode").addEventListener("change", e => {
      avl = e.target.value === "avl";
      root = null; highlight = new Set();
      [50, 30, 70, 20, 40, 60, 80, 10, 25].forEach(x => { msgs = []; root = insert(root, x); });
      setMsg(`Modo <strong>${avl ? "AVL" : "ABB"}</strong>. Cargué un ejemplo de 9 valores.`, "");
      render();
    });
    vEl.addEventListener("keydown", e => { if (e.key === "Enter") $("#ab-ins").click(); });

    // preset inicial
    [50, 30, 70, 20, 40, 60, 80].forEach(x => { root = insert(root, x); });
    setMsg("Árbol de ejemplo cargado. Probá insertar, buscar o eliminar; cambiá a AVL para ver las rotaciones.", "");
    render();
  }

  Tools.arboles = build;
})();
