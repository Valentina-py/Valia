/* ============================================================
   HERRAMIENTAS INTERACTIVAS — Redes
   window.Tools[id](mountEl)
     subredes · retardos · capas · binario
   ============================================================ */
(function () {
  "use strict";
  window.Tools = window.Tools || {};
  const h = (s) => { const d = document.createElement("div"); d.innerHTML = s; return d.firstElementChild; };

  /* ---------- utilidades IP (enteros sin signo de 32 bits) ---------- */
  function parseIp(str) {
    if (!str) return null;
    const p = String(str).trim().split(".");
    if (p.length !== 4) return null;
    let n = 0;
    for (const o of p) {
      if (!/^\d+$/.test(o)) return null;
      const v = +o;
      if (v < 0 || v > 255) return null;
      n = (n * 256) + v;
    }
    return n >>> 0;
  }
  function ipToStr(n) {
    n = n >>> 0;
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
  }
  function maskFromCidr(c) { return c === 0 ? 0 : (0xFFFFFFFF << (32 - c)) >>> 0; }
  function cidrFromMask(m) {
    m = m >>> 0; let c = 0, seenZero = false, ok = true;
    for (let i = 31; i >= 0; i--) {
      const bit = (m >>> i) & 1;
      if (bit === 1) { if (seenZero) ok = false; c++; } else { seenZero = true; }
    }
    return ok ? c : null;
  }
  function ipClass(n) {
    const f = (n >>> 24) & 255;
    if (f < 128) return "A";
    if (f < 192) return "B";
    if (f < 224) return "C";
    if (f < 240) return "D (multicast)";
    return "E (reservada)";
  }
  function isPrivate(n) {
    const a = (n >>> 24) & 255, b = (n >>> 16) & 255;
    return a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }

  /* ===================== 1 · CALCULADORA DE SUBREDES ===================== */
  window.Tools.subredes = function (mount) {
    const el = h(`<div class="tool">
      <div class="field-row">
        <div class="field"><label>Dirección IP</label>
          <input class="input input--mono" id="sIp" placeholder="192.168.1.10" value="192.168.1.10"></div>
        <div class="field"><label>Máscara o CIDR</label>
          <input class="input input--mono" id="sMask" placeholder="/24 · 24 · 255.255.255.0" value="/24"></div>
      </div>
      <div class="op-keys" id="sChips"></div>
      <div class="result-box empty" id="sOut">Ingresá una IP y una máscara.</div>
    </div>`);
    mount.appendChild(el);

    const chips = ["/8", "/16", "/24", "/25", "/26", "/27", "/28", "/30"];
    el.querySelector("#sChips").innerHTML = chips.map(c => `<button data-c="${c}">${c}</button>`).join("");
    el.querySelector("#sChips").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      el.querySelector("#sMask").value = b.dataset.c; calc();
    });

    function calc() {
      const out = el.querySelector("#sOut");
      const ip = parseIp(el.querySelector("#sIp").value);
      let mraw = String(el.querySelector("#sMask").value).trim().replace(/^\//, "");
      let mask = null, cidr = null;
      if (/^\d{1,2}$/.test(mraw) && +mraw >= 0 && +mraw <= 32) { cidr = +mraw; mask = maskFromCidr(cidr); }
      else { const pm = parseIp(mraw); if (pm !== null) { cidr = cidrFromMask(pm); mask = pm; } }

      if (ip === null) { out.className = "result-box empty"; out.textContent = "La dirección IP no es válida."; return; }
      if (mask === null || cidr === null) { out.className = "result-box empty"; out.textContent = "La máscara no es válida (usá /24, 24 o 255.255.255.0)."; return; }

      const net = (ip & mask) >>> 0;
      const bc = (net | (~mask >>> 0)) >>> 0;
      const totalHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.pow(2, 32 - cidr) - 2;
      const first = cidr >= 31 ? net : (net + 1) >>> 0;
      const last = cidr >= 31 ? bc : (bc - 1) >>> 0;

      out.className = "result-box";
      out.innerHTML = `<div class="result-grid">
        <span class="k">Dirección de red</span><span class="v">${ipToStr(net)} /${cidr}</span>
        <span class="k">Máscara</span><span class="v">${ipToStr(mask)}</span>
        <span class="k">Wildcard</span><span class="v">${ipToStr(~mask >>> 0)}</span>
        <span class="k">Broadcast</span><span class="v">${ipToStr(bc)}</span>
        <span class="k">Primer host</span><span class="v">${ipToStr(first)}</span>
        <span class="k">Último host</span><span class="v">${ipToStr(last)}</span>
        <span class="k">Hosts útiles</span><span class="v">${totalHosts.toLocaleString("es-AR")}</span>
        <span class="k">Clase</span><span class="v">${ipClass(ip)}</span>
        <span class="k">Tipo</span><span class="v">${isPrivate(ip) ? "Privada" : "Pública"}</span>
      </div>`;
    }
    el.querySelector("#sIp").addEventListener("input", calc);
    el.querySelector("#sMask").addEventListener("input", calc);
    calc();
  };

  /* ===================== 2 · RETARDOS Y THROUGHPUT ===================== */
  window.Tools.retardos = function (mount) {
    const el = h(`<div>
      <div class="tool">
        <h3 class="mt-0">Retardo de un enlace</h3>
        <div class="field-row">
          <div class="field"><label>Tamaño del paquete L (bits)</label>
            <input class="input" id="rL" type="number" value="8000"></div>
          <div class="field"><label>Tasa del enlace R</label>
            <div style="display:flex;gap:8px">
              <input class="input" id="rR" type="number" value="2" style="flex:2">
              <select class="input" id="rRu" style="flex:1">
                <option value="1">bps</option><option value="1000">kbps</option>
                <option value="1000000" selected>Mbps</option><option value="1000000000">Gbps</option>
              </select>
            </div></div>
        </div>
        <div class="field-row field-row--3">
          <div class="field"><label>Distancia (km)</label><input class="input" id="rD" type="number" value="3000"></div>
          <div class="field"><label>Velocidad v (m/s)</label><input class="input" id="rV" type="number" value="200000000"></div>
          <div class="field"><label>N° de enlaces (store-and-forward)</label><input class="input" id="rN" type="number" value="1"></div>
        </div>
        <div class="result-box" id="rOut"></div>
      </div>

      <div class="tool">
        <h3 class="mt-0">Throughput y tiempo de archivo</h3>
        <div class="field-row">
          <div class="field"><label>Tasas de los enlaces en serie (Mbps, separadas por coma)</label>
            <input class="input input--mono" id="tLinks" value="10, 2, 5"></div>
          <div class="field"><label>Tamaño del archivo (MB)</label>
            <input class="input" id="tFile" type="number" value="5"></div>
        </div>
        <div class="result-box" id="tOut"></div>
      </div>
    </div>`);
    mount.appendChild(el);

    function ms(x) { return (x * 1000).toLocaleString("es-AR", { maximumFractionDigits: 4 }) + " ms"; }
    function calcDelay() {
      const L = +el.querySelector("#rL").value;
      const R = (+el.querySelector("#rR").value) * (+el.querySelector("#rRu").value);
      const d = (+el.querySelector("#rD").value) * 1000;
      const v = +el.querySelector("#rV").value;
      const N = Math.max(1, +el.querySelector("#rN").value || 1);
      const out = el.querySelector("#rOut");
      if (!R || !v) { out.className = "result-box empty"; out.textContent = "Completá R y v (no pueden ser 0)."; return; }
      const tTrans = L / R, tProp = d / v, total = tTrans + tProp;
      out.className = "result-box";
      out.innerHTML = `<div class="result-grid">
        <span class="k">Transmisión (L/R)</span><span class="v">${ms(tTrans)}</span>
        <span class="k">Propagación (d/v)</span><span class="v">${ms(tProp)}</span>
        <span class="k">Total 1 enlace</span><span class="v">${ms(total)}</span>
        <span class="k">Transmisión N·(L/R)</span><span class="v">${ms(tTrans * N)} ${N > 1 ? "(" + N + " enlaces)" : ""}</span>
      </div>`;
    }
    function calcThr() {
      const rates = String(el.querySelector("#tLinks").value).split(",").map(s => parseFloat(s)).filter(x => !isNaN(x) && x > 0);
      const mb = +el.querySelector("#tFile").value;
      const out = el.querySelector("#tOut");
      if (!rates.length) { out.className = "result-box empty"; out.textContent = "Ingresá al menos una tasa válida."; return; }
      const bottleneck = Math.min(...rates);
      const bits = mb * 8 * 1e6;
      const t = bits / (bottleneck * 1e6);
      out.className = "result-box";
      out.innerHTML = `<div class="result-grid">
        <span class="k">Cuello de botella</span><span class="v">${bottleneck} Mbps</span>
        <span class="k">Archivo</span><span class="v">${mb} MB = ${(mb * 8).toLocaleString("es-AR")} Mbit</span>
        <span class="k">Tiempo de descarga</span><span class="v">${t.toLocaleString("es-AR", { maximumFractionDigits: 3 })} s</span>
      </div>`;
    }
    el.querySelectorAll("#rL,#rR,#rRu,#rD,#rV,#rN").forEach(i => i.addEventListener("input", calcDelay));
    el.querySelectorAll("#tLinks,#tFile").forEach(i => i.addEventListener("input", calcThr));
    calcDelay(); calcThr();
  };

  /* ===================== 3 · PROTOCOLOS POR CAPA (juego) ===================== */
  const LAYERS = [
    { p: "HTTP", c: "Aplicación" }, { p: "SMTP", c: "Aplicación" }, { p: "POP3", c: "Aplicación" },
    { p: "IMAP", c: "Aplicación" }, { p: "FTP", c: "Aplicación" }, { p: "DNS", c: "Aplicación" },
    { p: "RIP", c: "Aplicación" }, { p: "TCP", c: "Transporte" }, { p: "UDP", c: "Transporte" },
    { p: "IP", c: "Red" }, { p: "ICMP", c: "Red" }, { p: "ARP", c: "Enlace" },
    { p: "Ethernet", c: "Enlace" }, { p: "Token Ring", c: "Enlace" }, { p: "Frame Relay", c: "Enlace" },
    { p: "ATM", c: "Enlace" }
  ];
  const LAYER_OPTS = ["Aplicación", "Transporte", "Red", "Enlace"];
  const EXP = {
    "HTTP": "Web · sobre TCP (80).", "SMTP": "Correo (envío) · TCP 25.", "POP3": "Correo (descarga) · TCP.",
    "IMAP": "Correo (en el servidor) · TCP.", "FTP": "Archivos · TCP 21/20.", "DNS": "Nombres a IP · UDP 53.",
    "RIP": "Enrutamiento, pero corre sobre UDP → se clasifica en Aplicación.", "TCP": "Transporte fiable.",
    "UDP": "Transporte rápido, sin garantías.", "IP": "Direccionamiento y enrutamiento.",
    "ICMP": "Mensajes de control y errores (ping).", "ARP": "Traduce IP ↔ MAC.",
    "Ethernet": "LAN cableada.", "Token Ring": "LAN clásica.", "Frame Relay": "WAN.", "ATM": "WAN."
  };

  window.Tools.capas = function (mount, opts) {
    let order = LAYERS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [order[i], order[j]] = [order[j], order[i]]; }
    let pos = 0, score = 0, answered = false;

    const el = h(`<div class="tool">
      <div class="layer-game__score" id="gScore"></div>
      <div class="layer-game__proto" id="gProto"></div>
      <div class="layer-game__opts" id="gOpts"></div>
      <div class="quiz-feedback" id="gFb"></div>
      <div class="btn-row" style="justify-content:center;margin-bottom:0" id="gNav"></div>
    </div>`);
    mount.appendChild(el);

    function paint() {
      answered = false;
      const item = LAYERS[order[pos]];
      el.querySelector("#gScore").textContent = `Protocolo ${pos + 1} de ${LAYERS.length} · Aciertos: ${score}`;
      el.querySelector("#gProto").textContent = item.p;
      el.querySelector("#gOpts").innerHTML = LAYER_OPTS.map(o => `<button data-o="${o}">${o}</button>`).join("");
      el.querySelector("#gFb").className = "quiz-feedback";
      el.querySelector("#gNav").innerHTML = "";
    }
    el.querySelector("#gOpts").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b || answered) return;
      answered = true;
      const item = LAYERS[order[pos]];
      const fb = el.querySelector("#gFb");
      el.querySelectorAll("#gOpts button").forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.o === item.c) btn.classList.add("correct");
        else if (btn === b) btn.classList.add("wrong");
      });
      if (b.dataset.o === item.c) { score++; fb.className = "quiz-feedback ok show"; fb.innerHTML = `<strong>¡Correcto!</strong> ${item.p}: ${EXP[item.p] || ""}`; }
      else { fb.className = "quiz-feedback no show"; fb.innerHTML = `<strong>Es ${item.c}.</strong> ${item.p}: ${EXP[item.p] || ""}`; }
      el.querySelector("#gScore").textContent = `Protocolo ${pos + 1} de ${LAYERS.length} · Aciertos: ${score}`;
      const nav = el.querySelector("#gNav");
      if (pos < LAYERS.length - 1) nav.innerHTML = `<button class="btn btn--primary" id="gNext">Siguiente →</button>`;
      else { nav.innerHTML = `<div class="center"><p><strong>Terminaste: ${score}/${LAYERS.length}</strong></p><button class="btn btn--primary" id="gNext">Volver a empezar</button></div>`; if (opts && opts.onScore) opts.onScore(score); }
      nav.querySelector("#gNext").addEventListener("click", () => {
        if (pos < LAYERS.length - 1) pos++; else { pos = 0; score = 0; }
        paint();
      });
    });
    paint();
  };
})();
