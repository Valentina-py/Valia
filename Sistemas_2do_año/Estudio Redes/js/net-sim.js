/* ============================================================
   SIMULADOR DE TOPOLOGÍA — "Armá la red"
   Agregás dispositivos, los conectás con el cable correcto,
   configurás IPs y probás conectividad con ping. Misiones con
   validación en vivo, inspiradas en los labs de Packet Tracer.
   Datos en window.NET_MISSIONS · motor en window.NetSim
   ============================================================ */
(function () {
  "use strict";

  /* -------- dispositivos (grupo A=L3/host, B=L2) -------- */
  const DEV = {
    PC:     { label: "PC",       group: "A", ip: true,  icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>' },
    Server: { label: "Servidor", group: "A", ip: true,  icon: '<rect x="5" y="3" width="14" height="8" rx="1"/><rect x="5" y="13" width="14" height="8" rx="1"/><path d="M8 7h.01M8 17h.01"/>' },
    Router: { label: "Router",   group: "A", ip: true,  icon: '<rect x="2" y="9" width="20" height="7" rx="2"/><path d="M7 6l-2 3M17 6l2 3M9 12.5h.01M13 12.5h.01"/>' },
    Switch: { label: "Switch",   group: "B", ip: false, icon: '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 12h2m3 0h2m3 0h2"/>' },
  };
  const cableNeeded = (ta, tb) => DEV[ta].group === DEV[tb].group ? "cruzado" : "directo";

  /* -------- misiones -------- */
  window.NET_MISSIONS = {
    m1: {
      title: "Misión 1 · Red simple PC–Servidor",
      brief: "Conectá una <strong>PC</strong> y un <strong>Servidor</strong> en la red <span class='cmd'>192.168.0.0/24</span> con el cable correcto y lográ que se hagan ping.",
      need: { devices: { PC: 1, Server: 1 }, links: [["PC", "Server"]], subnet: { net: "192.168.0.0", cidr: 24 }, ping: ["PC", "Server"] }
    },
    m2: {
      title: "Misión 2 · LAN con switch",
      brief: "Armá una LAN: <strong>2 PCs</strong> y un <strong>Switch</strong> en <span class='cmd'>192.168.1.0/24</span>. Las dos PCs tienen que poder hacerse ping.",
      need: { devices: { PC: 2, Switch: 1 }, links: [["PC", "Switch"], ["PC", "Switch"]], subnet: { net: "192.168.1.0", cidr: 24 }, ping: ["PC", "PC"] }
    },
    sandbox: {
      title: "Modo libre",
      brief: "Agregá lo que quieras, conectá, configurá IPs y probá ping. Sin objetivos: para experimentar.",
      need: { devices: {}, links: [], subnet: { net: "192.168.0.0", cidr: 24 }, ping: null, free: true }
    }
  };

  /* -------- helpers IP -------- */
  function parseIp(s) {
    if (!s) return null; const p = String(s).trim().split("."); if (p.length !== 4) return null;
    let n = 0; for (const o of p) { if (!/^\d+$/.test(o)) return null; const v = +o; if (v > 255) return null; n = n * 256 + v; } return n >>> 0;
  }
  function cidrFromMask(m) { m = m >>> 0; let c = 0, z = false, ok = true; for (let i = 31; i >= 0; i--) { const b = (m >>> i) & 1; if (b) { if (z) ok = false; c++; } else z = true; } return ok ? c : null; }
  const maskFromCidr = c => c === 0 ? 0 : (0xFFFFFFFF << (32 - c)) >>> 0;
  const maskStr = c => { const m = maskFromCidr(c); return [(m >>> 24) & 255, (m >>> 16) & 255, (m >>> 8) & 255, m & 255].join("."); };

  /* ============================ MOTOR ============================ */
  window.NetSim = {
    start: function (root, missionId, opts) {
      opts = opts || {};
      const icon = opts.icon || (() => "");
      const M = window.NET_MISSIONS[missionId] || window.NET_MISSIONS.sandbox;
      const sub = M.need.subnet;
      let nodes = [], links = [], idc = 0, mode = "config", connectFirst = null, suppress = false, doneFired = false;

      function devIcon(type) {
        return `<svg viewBox="0 0 24 24" class="ic" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${DEV[type].icon}</svg>`;
      }
      function addNode(type) {
        const n = nodes.filter(x => x.type === type).length;
        const total = nodes.length;
        const x = 80 + (total % 4) * 150, y = 80 + Math.floor(total / 4) * 130;
        nodes.push({ id: "n" + (idc++), type, x, y, ip: "", mask: DEV[type].ip ? maskStr(sub.cidr) : "" });
        renderCanvas(); renderChecklist();
      }
      function delNode(id) {
        nodes = nodes.filter(n => n.id !== id);
        links = links.filter(l => l.a !== id && l.b !== id);
        connectFirst = null; closePop(); renderCanvas(); renderChecklist();
      }

      /* ---- conectividad ---- */
      function adj(okOnly) {
        const g = {}; nodes.forEach(n => g[n.id] = []);
        links.forEach(l => { if (okOnly && !l.ok) return; g[l.a].push(l.b); g[l.b].push(l.a); });
        return g;
      }
      function reachable(srcId, dstId, okOnly) {
        const g = adj(okOnly), seen = { [srcId]: 1 }, q = [srcId];
        while (q.length) { const c = q.shift(); if (c === dstId) return true; g[c].forEach(v => { if (!seen[v]) { seen[v] = 1; q.push(v); } }); }
        return false;
      }
      function sameSubnet(a, b) {
        const ia = parseIp(a.ip), ib = parseIp(b.ip), ma = parseIp(a.mask), mb = parseIp(b.mask);
        if (ia === null || ib === null || ma === null || mb === null || ma !== mb) return false;
        return ((ia & ma) >>> 0) === ((ib & mb) >>> 0);
      }
      function pingResult(a, b) {
        if (!a || !b) return { ok: false, msg: "Elegí origen y destino." };
        if (a.id === b.id) return { ok: false, msg: "Origen y destino son el mismo equipo." };
        if (parseIp(a.ip) === null || parseIp(b.ip) === null) return { ok: false, msg: "Configurá las IP de ambos equipos primero." };
        if (!reachable(a.id, b.id, true)) {
          if (reachable(a.id, b.id, false)) return { ok: false, msg: "Hay un <strong>cable equivocado</strong> en el camino (enlace en rojo)." };
          return { ok: false, msg: "No hay un <strong>camino físico</strong>: revisá las conexiones." };
        }
        if (!sameSubnet(a, b)) return { ok: false, msg: "Llegan pero están en <strong>redes distintas</strong> (harían falta routers)." };
        return { ok: true, msg: `Respuesta de ${b.ip}: <strong>¡hay conectividad!</strong> (0% de pérdida)` };
      }

      /* ---- validación de misión ---- */
      function hostNodes() { return nodes.filter(n => DEV[n.type].ip); }
      function ipOkForSubnet(n) {
        const ip = parseIp(n.ip), mk = parseIp(n.mask), net = parseIp(sub.net), req = maskFromCidr(sub.cidr);
        if (ip === null || mk === null || cidrFromMask(mk) !== sub.cidr) return false;
        if (((ip & req) >>> 0) !== net) return false;
        if (((ip ^ net) >>> 0) === 0) return false;                 // dirección de red
        if (((ip | (~req >>> 0)) >>> 0) === ip) return false;        // broadcast
        return true;
      }
      function checklist() {
        if (M.need.free) return [];
        const items = [];
        // dispositivos
        const devOk = Object.entries(M.need.devices).every(([t, c]) => nodes.filter(n => n.type === t).length >= c);
        items.push({ ok: devOk, label: "Dispositivos: " + Object.entries(M.need.devices).map(([t, c]) => `${c} ${DEV[t].label}`).join(" + ") });
        // enlaces con cable correcto
        const need = {}; M.need.links.forEach(([a, b]) => { const k = [a, b].sort().join("-"); need[k] = (need[k] || 0) + 1; });
        const have = {}; links.forEach(l => { if (!l.ok) return; const k = [nodes.find(n => n.id === l.a).type, nodes.find(n => n.id === l.b).type].sort().join("-"); have[k] = (have[k] || 0) + 1; });
        const linkOk = Object.entries(need).every(([k, c]) => (have[k] || 0) >= c);
        items.push({ ok: linkOk, label: "Conexiones con el cable correcto" });
        // IPs
        const hosts = hostNodes();
        const needHosts = Object.entries(M.need.devices).filter(([t]) => DEV[t].ip).reduce((s, [, c]) => s + c, 0);
        const valid = hosts.filter(ipOkForSubnet);
        const distinct = new Set(valid.map(n => n.ip)).size === valid.length;
        const ipsOk = valid.length >= needHosts && distinct && needHosts > 0;
        items.push({ ok: ipsOk, label: `IPs válidas en ${sub.net}/${sub.cidr}, distintas` });
        // ping
        let pingOk = false;
        if (M.need.ping) {
          const [fa, fb] = M.need.ping;
          const A = nodes.filter(n => n.type === fa), B = nodes.filter(n => n.type === fb);
          for (const a of A) for (const b of B) { if (a.id !== b.id && pingResult(a, b).ok) { pingOk = true; break; } }
          items.push({ ok: pingOk, label: `Ping ${DEV[fa].label} → ${DEV[fb].label} exitoso` });
        }
        return items;
      }

      /* ---- render ---- */
      function shell() {
        root.innerHTML = `<div class="fade-in">
          <div class="chip">${icon("build")} Simulador</div>
          <h1 class="page-title" style="margin:10px 0 4px">${M.title}</h1>
          <p class="page-sub">${M.brief}</p>

          <div class="net-palette">
            ${Object.keys(DEV).map(t => `<button data-add="${t}">${devIcon(t)} ${DEV[t].label}</button>`).join("")}
          </div>
          <div class="net-bar">
            <button class="net-mode" id="mConfig">✥ Mover / configurar</button>
            <button class="net-mode" id="mConnect">🔗 Conectar</button>
            <button class="btn btn--ghost" id="mClear" style="padding:8px 14px">Vaciar</button>
            <span class="net-tip" id="netTip"></span>
          </div>
          <div class="netcanvas" id="netcanvas"></div>

          <div class="net-ping">
            <strong style="font-size:13.5px">Probar ping:</strong>
            <select class="input" id="pFrom"></select>
            <span class="muted">→</span>
            <select class="input" id="pTo"></select>
            <button class="btn btn--primary" id="pGo" style="padding:8px 16px">Enviar ping</button>
          </div>
          <div class="net-ping__out" id="pOut"></div>

          <div id="checkWrap"></div>

          <div class="pager"><span></span>
            <a class="next" href="#/build"><small>Otras misiones →</small>Volver</a></div>
        </div>`;

        root.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => addNode(b.dataset.add)));
        root.querySelector("#mConfig").addEventListener("click", () => setMode("config"));
        root.querySelector("#mConnect").addEventListener("click", () => setMode("connect"));
        root.querySelector("#mClear").addEventListener("click", () => { nodes = []; links = []; connectFirst = null; closePop(); renderCanvas(); renderChecklist(); });
        root.querySelector("#pGo").addEventListener("click", doPing);
        setMode("config");
        renderCanvas(); renderChecklist();
      }

      function setMode(m) {
        mode = m; connectFirst = null; closePop();
        const c = root.querySelector("#mConfig"), k = root.querySelector("#mConnect");
        c.classList.toggle("active", m === "config"); k.classList.toggle("active", m === "connect");
        root.querySelector("#netTip").innerHTML = m === "connect"
          ? "Tocá un dispositivo y luego otro para unirlos."
          : "Tocá un dispositivo para configurar su IP o borrarlo · arrastralo para moverlo.";
        renderCanvas();
      }

      function renderCanvas() {
        const cv = root.querySelector("#netcanvas"); if (!cv) return;
        const lines = links.map(l => {
          const a = nodes.find(n => n.id === l.a), b = nodes.find(n => n.id === l.b); if (!a || !b) return "";
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          return `<line class="${l.ok ? "" : "bad"}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"></line>
            <text class="net-linklabel" x="${mx}" y="${my - 5}" text-anchor="middle">${l.cable}</text>`;
        }).join("");
        cv.innerHTML = `<svg>${lines}</svg>` + nodes.map(n => {
          const bad = DEV[n.type].ip && n.ip && !ipOkForSubnet(n);
          return `<div class="netnode${connectFirst === n.id ? " sel" : ""}${bad ? " host-bad" : ""}" data-id="${n.id}" style="left:${n.x}px;top:${n.y}px">
            <div class="netnode__box">${devIcon(n.type)}</div>
            <div class="netnode__name">${DEV[n.type].label}</div>
            ${DEV[n.type].ip ? `<div class="netnode__ip">${n.ip || "sin IP"}</div>` : ""}
          </div>`;
        }).join("");
        cv.querySelectorAll(".netnode").forEach(el => wireNode(el, cv));
        fillPingSelects();
      }

      function wireNode(el, cv) {
        const id = el.dataset.id;
        const node = nodes.find(n => n.id === id);
        let down = null, moved = false;
        el.addEventListener("pointerdown", (e) => {
          if (mode !== "config") return;
          down = { x: e.clientX, y: e.clientY, nx: node.x, ny: node.y }; moved = false;
          try { el.setPointerCapture(e.pointerId); } catch (_) {}
        });
        el.addEventListener("pointermove", (e) => {
          if (!down) return;
          const dx = e.clientX - down.x, dy = e.clientY - down.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
          node.x = Math.max(40, Math.min((cv.clientWidth || 800) - 40, down.nx + dx));
          node.y = Math.max(34, Math.min((cv.clientHeight || 380) - 24, down.ny + dy));
          el.style.left = node.x + "px"; el.style.top = node.y + "px";
          updateLines();
        });
        el.addEventListener("pointerup", () => { if (down && moved) suppress = true; down = null; });
        el.addEventListener("click", () => {
          if (suppress) { suppress = false; return; }
          onTap(node);
        });
      }
      function updateLines() {
        const cv = root.querySelector("#netcanvas"); if (!cv) return;
        const svg = cv.querySelector("svg"); if (!svg) return;
        const lineEls = svg.querySelectorAll("line"), txtEls = svg.querySelectorAll("text");
        links.forEach((l, i) => {
          const a = nodes.find(n => n.id === l.a), b = nodes.find(n => n.id === l.b); if (!a || !b) return;
          const le = lineEls[i]; if (le) { le.setAttribute("x1", a.x); le.setAttribute("y1", a.y); le.setAttribute("x2", b.x); le.setAttribute("y2", b.y); }
          const te = txtEls[i]; if (te) { te.setAttribute("x", (a.x + b.x) / 2); te.setAttribute("y", (a.y + b.y) / 2 - 5); }
        });
      }

      function onTap(node) {
        if (mode === "connect") {
          if (!connectFirst) { connectFirst = node.id; renderCanvas(); }
          else if (connectFirst !== node.id) { askCable(connectFirst, node.id); }
          return;
        }
        openConfig(node);
      }

      function askCable(aId, bId) {
        if (links.some(l => (l.a === aId && l.b === bId) || (l.a === bId && l.b === aId))) { connectFirst = null; renderCanvas(); return; }
        const ta = nodes.find(n => n.id === aId).type, tb = nodes.find(n => n.id === bId).type;
        const cv = root.querySelector("#netcanvas");
        const ov = document.createElement("div"); ov.className = "cable-ask";
        ov.innerHTML = `<div class="cable-ask__box">
          <p>¿Con qué cable conectás <strong>${DEV[ta].label}</strong> y <strong>${DEV[tb].label}</strong>?</p>
          <div class="btn-row" style="justify-content:center;margin:0">
            <button class="btn" data-cable="directo">Directo</button>
            <button class="btn" data-cable="cruzado">Cruzado</button>
          </div></div>`;
        cv.appendChild(ov);
        ov.querySelectorAll("[data-cable]").forEach(btn => btn.addEventListener("click", () => {
          const choice = btn.dataset.cable, ok = choice === cableNeeded(ta, tb);
          links.push({ a: aId, b: bId, cable: choice, ok });
          connectFirst = null; ov.remove(); renderCanvas(); renderChecklist();
          flash(ok ? `Enlace creado con cable ${choice}.` : `Cable ${choice} incorrecto para ${DEV[ta].label}–${DEV[tb].label}: debería ser ${cableNeeded(ta, tb)}.`, ok);
        }));
      }

      function openConfig(node) {
        closePop();
        const cv = root.querySelector("#netcanvas");
        const pop = document.createElement("div"); pop.className = "net-pop"; pop.id = "netPop";
        const px = Math.min(node.x, (cv.clientWidth || 600) - 230), py = Math.min(node.y + 10, 200);
        pop.style.left = Math.max(8, px) + "px"; pop.style.top = Math.max(8, py) + "px";
        pop.innerHTML = `<h4>${DEV[node.type].label}</h4>
          ${DEV[node.type].ip ? `
            <label style="font-size:11px;color:var(--muted)">Dirección IP</label>
            <input class="input input--mono" id="cfgIp" value="${node.ip}" placeholder="${sub.net.replace(/0$/, "x")}">
            <label style="font-size:11px;color:var(--muted)">Máscara</label>
            <input class="input input--mono" id="cfgMk" value="${node.mask}" placeholder="${maskStr(sub.cidr)}">` : `<p class="muted" style="font-size:12.5px">Este equipo no necesita IP.</p>`}
          <div class="net-pop__row">
            ${DEV[node.type].ip ? `<button class="btn btn--primary" id="cfgSave" style="flex:1">Guardar</button>` : ""}
            <button class="btn" id="cfgDel">Borrar</button>
          </div>`;
        cv.appendChild(pop);
        if (DEV[node.type].ip) root.querySelector("#cfgSave").addEventListener("click", () => {
          node.ip = root.querySelector("#cfgIp").value.trim();
          node.mask = root.querySelector("#cfgMk").value.trim() || maskStr(sub.cidr);
          closePop(); renderCanvas(); renderChecklist();
        });
        root.querySelector("#cfgDel").addEventListener("click", () => delNode(node.id));
      }
      function closePop() { const p = root.querySelector("#netPop"); if (p) p.remove(); }

      function flash(msg, ok) {
        const tip = root.querySelector("#netTip"); if (!tip) return;
        tip.innerHTML = `<span style="color:${ok ? "var(--ok)" : "var(--bad)"}">${msg}</span>`;
      }

      /* ---- ping UI ---- */
      function fillPingSelects() {
        const from = root.querySelector("#pFrom"), to = root.querySelector("#pTo"); if (!from) return;
        const hosts = hostNodes();
        const opt = n => `<option value="${n.id}">${DEV[n.type].label} (${n.ip || "sin IP"})</option>`;
        const keepF = from.value, keepT = to.value;
        from.innerHTML = hosts.map(opt).join(""); to.innerHTML = hosts.map(opt).join("");
        from.value = hosts.some(n => n.id === keepF) ? keepF : (hosts[0] ? hosts[0].id : "");
        let t = (hosts.some(n => n.id === keepT) && keepT !== from.value) ? keepT : "";
        if (!t) { const other = hosts.find(n => n.id !== from.value); t = other ? other.id : from.value; }
        to.value = t;
      }
      function doPing() {
        const from = root.querySelector("#pFrom"), to = root.querySelector("#pTo");
        const a = nodes.find(n => n.id === from.value), b = nodes.find(n => n.id === to.value);
        const r = pingResult(a, b);
        const out = root.querySelector("#pOut");
        out.className = "net-ping__out quiz-feedback " + (r.ok ? "ok" : "no") + " show";
        out.innerHTML = `${icon(r.ok ? "check" : "cross")} ${r.msg}`;
      }

      /* ---- checklist ---- */
      function renderChecklist() {
        const wrap = root.querySelector("#checkWrap"); if (!wrap) return;
        if (M.need.free) { wrap.innerHTML = `<p class="muted" style="font-size:13px">Modo libre: experimentá sin objetivos. Probá conectar un switch entre varias PCs.</p>`; return; }
        const items = checklist();
        const allOk = items.length && items.every(i => i.ok);
        wrap.innerHTML = `<h3>Objetivos</h3>
          <ul class="net-check">${items.map(i => `<li class="${i.ok ? "ok" : "no"}"><span class="mk">${i.ok ? "✓" : "•"}</span>${i.label}</li>`).join("")}</ul>
          ${allOk ? `<div class="net-mission-done"><strong>¡Misión cumplida!</strong> Armaste y configuraste la red correctamente. 🎉</div>` : ""}`;
        if (allOk && !doneFired) { doneFired = true; if (opts.onFinish) opts.onFinish(); }
      }

      shell();
    }
  };
})();
