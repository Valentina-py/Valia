/* ============================================================
   JUEGOS — Redes Informáticas y Comunicación
   window.Games[id](mountEl, { onFinish(stars) })
     puertos · tcpudp · claseip · privada · secuencia · siglas · subneteo
   Cada juego, al terminar, llama opts.onFinish(stars 0..3).
   ============================================================ */
(function () {
  "use strict";
  window.Games = window.Games || {};
  const h = (s) => { const d = document.createElement("div"); d.innerHTML = s; return d.firstElementChild; };

  /* ---- timers (para limpiar al navegar) ---- */
  let timers = [];
  function after(fn, ms) { const t = setTimeout(fn, ms); timers.push(t); return t; }
  window.Games.stopAll = function () { timers.forEach(clearTimeout); timers = []; };

  /* ---- utilidades ---- */
  function rnd(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function ipToStr(n) { n = n >>> 0; return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
  function maskFromCidr(c) { return c === 0 ? 0 : (0xFFFFFFFF << (32 - c)) >>> 0; }
  function stars(pct) { return pct >= 80 ? 3 : pct >= 50 ? 2 : pct > 0 ? 1 : 0; }
  function starHtml(n) { return `<span class="game-end__stars">${"★".repeat(n)}${"☆".repeat(3 - n)}</span>`; }
  function endCard(inner) { return `<div class="tool center game-end">${inner}</div>`; }

  /* ===================== Motor genérico de opción múltiple ===================== */
  function runMC(mount, title, builder, onFinish) {
    const rounds = builder();
    let i = 0, score = 0, answered = false;
    const el = h(`<div class="tool">
      <div class="game-mc__score" id="gScore"></div>
      <div class="game-mc__q" id="gQ"></div>
      <div class="quiz-options" id="gOpts"></div>
      <div class="quiz-feedback" id="gFb"></div>
      <div class="btn-row" style="justify-content:center" id="gNav"></div>
    </div>`);
    mount.innerHTML = ""; mount.appendChild(el);
    const Q = el.querySelector("#gQ"), O = el.querySelector("#gOpts"), F = el.querySelector("#gFb"), N = el.querySelector("#gNav"), S = el.querySelector("#gScore");

    function paint() {
      answered = false; const r = rounds[i];
      S.textContent = `${title} · ${i + 1} de ${rounds.length} · Aciertos: ${score}`;
      Q.innerHTML = r.q;
      O.innerHTML = r.opts.map((o, k) => `<button class="quiz-opt" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("");
      F.className = "quiz-feedback"; N.innerHTML = "";
    }
    O.addEventListener("click", (e) => {
      const b = e.target.closest(".quiz-opt"); if (!b || answered) return;
      answered = true; const k = +b.dataset.k, r = rounds[i];
      O.querySelectorAll(".quiz-opt").forEach((x, idx) => {
        x.disabled = true;
        if (idx === r.a) x.classList.add("correct"); else if (idx === k) x.classList.add("wrong");
      });
      if (k === r.a) { score++; F.className = "quiz-feedback ok show"; F.innerHTML = `<strong>¡Correcto!</strong> ${r.exp || ""}`; }
      else { F.className = "quiz-feedback no show"; F.innerHTML = `<strong>No.</strong> ${r.exp || ""}`; }
      S.textContent = `${title} · ${i + 1} de ${rounds.length} · Aciertos: ${score}`;
      N.innerHTML = `<button class="btn btn--primary" id="gNext">${i < rounds.length - 1 ? "Siguiente →" : "Ver resultado →"}</button>`;
      N.querySelector("#gNext").addEventListener("click", () => { if (i < rounds.length - 1) { i++; paint(); } else finish(); });
    });
    function finish() {
      const pct = Math.round(score / rounds.length * 100), st = stars(pct);
      el.innerHTML = endCard(`${starHtml(st)}
        <div class="quiz-score-ring">${score}/${rounds.length}</div>
        <p class="lead">${pct}% de aciertos</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn--primary" id="again">↻ Jugar de nuevo</button>
          <a class="btn" href="#/games">Otros juegos</a></div>`);
      el.querySelector("#again").addEventListener("click", () => runMC(mount, title, builder, onFinish));
      if (onFinish) onFinish(st);
    }
    paint();
  }

  /* ===================== 1 · PUERTO ↔ SERVICIO ===================== */
  const PORTS = [
    { s: "HTTP", p: 80 }, { s: "HTTPS", p: 443 }, { s: "FTP (control)", p: 21 },
    { s: "SMTP", p: 25 }, { s: "DNS", p: 53 }, { s: "POP3", p: 110 },
    { s: "IMAP", p: 143 }, { s: "SSH", p: 22 }, { s: "Telnet", p: 23 }
  ];
  window.Games.puertos = function (mount, opts) {
    runMC(mount, "Puertos", () =>
      shuffle(PORTS).slice(0, 8).map((it) => {
        const others = shuffle(PORTS.filter((p) => p.p !== it.p)).slice(0, 3).map((p) => p.p);
        const opt = shuffle([it.p, ...others]).map(String);
        return { q: `¿Qué puerto usa <strong>${it.s}</strong>?`, opts: opt, a: opt.indexOf(String(it.p)), exp: `${it.s} → puerto ${it.p}.` };
      }), opts && opts.onFinish);
  };

  /* ===================== 2 · TCP o UDP ===================== */
  const SCEN = [
    { t: "Navegar una página web (HTTP)", a: "TCP" }, { t: "Una videollamada en vivo", a: "UDP" },
    { t: "Descargar un archivo por FTP", a: "TCP" }, { t: "Una consulta DNS", a: "UDP" },
    { t: "Enviar un correo (SMTP)", a: "TCP" }, { t: "Streaming de audio en vivo", a: "UDP" },
    { t: "Un juego online de acción", a: "UDP" }, { t: "Cargar el home banking", a: "TCP" },
    { t: "Conectarte por SSH a un servidor", a: "TCP" }, { t: "VoIP (voz por Internet)", a: "UDP" },
    { t: "Transferir con TFTP", a: "UDP" }, { t: "Descargar un PDF del aula virtual", a: "TCP" }
  ];
  window.Games.tcpudp = function (mount, opts) {
    runMC(mount, "TCP o UDP", () =>
      shuffle(SCEN).slice(0, 10).map((it) => ({
        q: `¿<strong>TCP</strong> o <strong>UDP</strong>?<br><span class="game-ip">${it.t}</span>`,
        opts: ["TCP", "UDP"], a: it.a === "TCP" ? 0 : 1,
        exp: it.a === "TCP" ? "Necesita entrega fiable y completa → TCP." : "Prioriza velocidad / tiempo real y tolera pérdidas → UDP."
      })), opts && opts.onFinish);
  };

  /* ===================== 3 · CLASE DE IP ===================== */
  function classIdx(f) { return f < 128 ? 0 : f < 192 ? 1 : f < 224 ? 2 : f < 240 ? 3 : 4; }
  const CLASS_OPTS = ["A", "B", "C", "D", "E"];
  const CLASS_EXP = ["0–127", "128–191", "192–223", "224–239 (multicast)", "240–255 (reservada)"];
  window.Games.claseip = function (mount, opts) {
    runMC(mount, "Clase de IP", () => {
      const rs = [];
      for (let n = 0; n < 10; n++) {
        const f = 1 + rnd(252);
        const ip = `${f}.${rnd(256)}.${rnd(256)}.${1 + rnd(254)}`;
        const a = classIdx(f);
        rs.push({ q: `¿A qué <strong>clase</strong> pertenece?<br><span class="game-ip">${ip}</span>`, opts: CLASS_OPTS.slice(), a, exp: `El primer octeto es ${f} → Clase ${CLASS_OPTS[a]} (${CLASS_EXP[a]}).` });
      }
      return rs;
    }, opts && opts.onFinish);
  };

  /* ===================== 4 · PÚBLICA o PRIVADA ===================== */
  window.Games.privada = function (mount, opts) {
    runMC(mount, "Pública o privada", () => {
      const rs = [];
      for (let n = 0; n < 10; n++) {
        let ip, priv;
        if (rnd(2) === 0) {
          const k = rnd(3);
          if (k === 0) ip = `10.${rnd(256)}.${rnd(256)}.${1 + rnd(254)}`;
          else if (k === 1) ip = `172.${16 + rnd(16)}.${rnd(256)}.${1 + rnd(254)}`;
          else ip = `192.168.${rnd(256)}.${1 + rnd(254)}`;
          priv = true;
        } else {
          let f; do { f = 1 + rnd(223); } while (f === 10 || f === 127 || f === 172 || f === 192);
          ip = `${f}.${rnd(256)}.${rnd(256)}.${1 + rnd(254)}`;
          priv = false;
        }
        rs.push({ q: `¿Es <strong>pública o privada</strong>?<br><span class="game-ip">${ip}</span>`, opts: ["Privada", "Pública"], a: priv ? 0 : 1, exp: priv ? "Está en un rango privado (10/8, 172.16–31, 192.168/16)." : "No pertenece a ningún rango privado." });
      }
      return rs;
    }, opts && opts.onFinish);
  };

  /* ===================== 5 · ORDENÁ LA SECUENCIA ===================== */
  const SEQS = [
    { name: "Saludo de 3 pasos (TCP)", steps: ["Cliente envía SYN", "Servidor responde SYN-ACK", "Cliente envía ACK"] },
    { name: "Encapsulamiento (de arriba hacia abajo)", steps: ["Mensaje (aplicación)", "Segmento (transporte)", "Datagrama (red)", "Trama (enlace)", "Bits (física)"] },
    { name: "DHCP: obtener una IP", steps: ["DHCP Discover", "DHCP Offer", "DHCP Request", "DHCP ACK"] },
    { name: "Resolución ARP", steps: ["Solicitud ARP (broadcast)", "Respuesta ARP (unicast)", "Guardar la MAC en la tabla", "Enviar la trama al destino"] }
  ];
  window.Games.secuencia = function (mount, opts) {
    const seqs = shuffle(SEQS); let qi = 0, perfect = 0;
    function start() {
      const seq = seqs[qi]; let expected = 0, errs = 0;
      const chips = shuffle(seq.steps.map((s, idx) => ({ s, idx })));
      const el = h(`<div class="tool">
        <div class="game-mc__score">Secuencia ${qi + 1} de ${seqs.length} · Perfectas: ${perfect}</div>
        <h3 class="mt-0">${seq.name}</h3>
        <p class="muted">Tocá los pasos en el orden correcto.</p>
        <div class="seq-target" id="seqT"></div>
        <div class="seq-pool" id="seqP"></div>
        <div class="quiz-feedback" id="seqF"></div>
        <div class="btn-row" style="justify-content:center" id="seqN"></div></div>`);
      mount.innerHTML = ""; mount.appendChild(el);
      const pool = el.querySelector("#seqP"), tgt = el.querySelector("#seqT"), fb = el.querySelector("#seqF"), nav = el.querySelector("#seqN");
      pool.innerHTML = chips.map((c) => `<button class="seq-chip" data-idx="${c.idx}">${c.s}</button>`).join("");
      pool.addEventListener("click", (e) => {
        const b = e.target.closest(".seq-chip"); if (!b || b.disabled) return;
        if (+b.dataset.idx === expected) {
          b.disabled = true; b.classList.add("ok");
          tgt.insertAdjacentHTML("beforeend", `<div class="seq-step"><span class="seq-step__n">${expected + 1}</span><span>${b.textContent}</span></div>`);
          expected++;
          if (expected === seq.steps.length) { if (errs === 0) perfect++; done(errs); }
        } else { errs++; b.classList.add("shake"); after(() => b.classList.remove("shake"), 400); }
      });
      function done(e2) {
        fb.className = "quiz-feedback ok show";
        fb.innerHTML = e2 === 0 ? "✓ ¡Perfecto, sin errores!" : `Completado con ${e2} error(es).`;
        const last = qi === seqs.length - 1;
        nav.innerHTML = `<button class="btn btn--primary" id="sn">${last ? "Ver resultado →" : "Siguiente →"}</button>`;
        nav.querySelector("#sn").addEventListener("click", () => { if (last) finishAll(); else { qi++; start(); } });
      }
    }
    function finishAll() {
      const pct = Math.round(perfect / seqs.length * 100), st = stars(pct);
      mount.innerHTML = endCard(`${starHtml(st)}<p class="lead">${perfect}/${seqs.length} secuencias perfectas</p>
        <div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="again">↻ Jugar de nuevo</button> <a class="btn" href="#/games">Otros juegos</a></div>`);
      const ag = mount.querySelector("#again"); if (ag) ag.addEventListener("click", () => window.Games.secuencia(mount, opts));
      if (opts && opts.onFinish) opts.onFinish(st);
    }
    start();
  };

  /* ===================== 6 · MEMOTEST DE SIGLAS ===================== */
  const SIGLAS = [
    ["TCP", "Transporte fiable y en orden"], ["UDP", "Transporte rápido, sin garantías"],
    ["IP", "Direccionamiento y enrutamiento"], ["DNS", "Traduce nombres a IP"],
    ["ARP", "Traduce IP a MAC"], ["DHCP", "Asigna IP automáticamente"],
    ["NAT", "IP privadas → una IP pública"], ["ICMP", "Mensajes de control (ping)"],
    ["MAC", "Dirección física de 48 bits"], ["MTU", "Tamaño máximo de trama"]
  ];
  window.Games.siglas = function (mount, opts) {
    function start() {
      const pairs = shuffle(SIGLAS).slice(0, 6);
      const cards = [];
      pairs.forEach((p, idx) => { cards.push({ id: idx, txt: p[0] }); cards.push({ id: idx, txt: p[1] }); });
      const deck = shuffle(cards);
      let first = null, lock = false, matched = 0, mistakes = 0;
      const el = h(`<div class="tool">
        <div class="game-mc__score" id="mScore"></div>
        <div class="memo-grid" id="mGrid"></div>
        <div class="btn-row" style="justify-content:center" id="mNav"></div></div>`);
      mount.innerHTML = ""; mount.appendChild(el);
      const grid = el.querySelector("#mGrid"), sc = el.querySelector("#mScore");
      grid.innerHTML = deck.map((c, k) => `<button class="memo-card" data-k="${k}" data-id="${c.id}"><span>${c.txt}</span></button>`).join("");
      function upd() { sc.textContent = `Pares: ${matched}/${pairs.length} · Errores: ${mistakes}`; }
      upd();
      grid.addEventListener("click", (e) => {
        const b = e.target.closest(".memo-card"); if (!b || lock || b.classList.contains("done") || b === first) return;
        b.classList.add("flip");
        if (!first) { first = b; return; }
        if (first.dataset.id === b.dataset.id) {
          first.classList.add("done"); b.classList.add("done"); matched++; first = null; upd();
          if (matched === pairs.length) finish();
        } else {
          mistakes++; lock = true; upd();
          const a = first, bb = b;
          after(() => { a.classList.remove("flip"); bb.classList.remove("flip"); first = null; lock = false; }, 850);
        }
      });
      function finish() {
        const st = mistakes <= 2 ? 3 : mistakes <= 5 ? 2 : 1;
        el.querySelector("#mNav").innerHTML = `${starHtml(st)}<p class="lead">¡Completado! ${mistakes} error(es)</p>
          <div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="again">↻ Jugar de nuevo</button> <a class="btn" href="#/games">Otros juegos</a></div>`;
        const ag = el.querySelector("#again"); if (ag) ag.addEventListener("click", start);
        if (opts && opts.onFinish) opts.onFinish(st);
      }
    }
    start();
  };

  /* ===================== 7 · SUBNETEO EXPRÉS (generador) ===================== */
  window.Games.subneteo = function (mount, opts) {
    const N = 5; let i = 0, correct = 0;
    function gen() {
      const cidr = [25, 26, 27, 28, 29, 30][rnd(6)];
      const o3 = rnd(256), d = 1 + rnd(254);
      const mask = maskFromCidr(cidr);
      const ipInt = (((192 << 24) >>> 0) | (168 << 16) | (o3 << 8) | d) >>> 0;
      const net = (ipInt & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0;
      return { ip: `192.168.${o3}.${d}`, cidr, net: ipToStr(net), bc: ipToStr(bc), hosts: Math.pow(2, 32 - cidr) - 2 };
    }
    function mark(ok, val) { return ok ? `<span class="sn-ok">✓</span>` : `<span class="sn-no">✗ ${val}</span>`; }
    function start() {
      const p = gen();
      const el = h(`<div class="tool">
        <div class="game-mc__score">Subneteo exprés · ${i + 1} de ${N} · Puntos: ${correct}</div>
        <p>Para la IP <span class="game-ip">${p.ip}/${p.cidr}</span> calculá:</p>
        <div class="field"><label>Dirección de red</label><input class="input input--mono" id="snNet" placeholder="ej. 192.168.0.0" autocomplete="off"></div>
        <div class="field"><label>Dirección de broadcast</label><input class="input input--mono" id="snBc" placeholder="ej. 192.168.0.255" autocomplete="off"></div>
        <div class="field"><label>Hosts útiles</label><input class="input" id="snH" type="number" placeholder="ej. 254" autocomplete="off"></div>
        <div class="quiz-feedback" id="snF"></div>
        <div class="btn-row" style="justify-content:center" id="snN"><button class="btn btn--primary" id="snCheck">Verificar</button></div></div>`);
      mount.innerHTML = ""; mount.appendChild(el);
      el.querySelector("#snCheck").addEventListener("click", () => {
        const okNet = el.querySelector("#snNet").value.trim() === p.net;
        const okBc = el.querySelector("#snBc").value.trim() === p.bc;
        const okH = (+el.querySelector("#snH").value) === p.hosts;
        const got = (okNet ? 1 : 0) + (okBc ? 1 : 0) + (okH ? 1 : 0);
        correct += got;
        const fb = el.querySelector("#snF");
        fb.className = "quiz-feedback " + (got === 3 ? "ok" : "no") + " show";
        fb.innerHTML = `Red: ${mark(okNet, p.net)} &nbsp; Broadcast: ${mark(okBc, p.bc)} &nbsp; Hosts: ${mark(okH, p.hosts)}`;
        const nav = el.querySelector("#snN");
        nav.innerHTML = `<button class="btn btn--primary" id="snNext">${i < N - 1 ? "Siguiente →" : "Ver resultado →"}</button>`;
        nav.querySelector("#snNext").addEventListener("click", () => { if (i < N - 1) { i++; start(); } else finish(); });
      });
    }
    function finish() {
      const pct = Math.round(correct / (N * 3) * 100), st = stars(pct);
      mount.innerHTML = endCard(`${starHtml(st)}<div class="quiz-score-ring">${correct}/${N * 3}</div>
        <p class="lead">${pct}% de aciertos</p>
        <div class="btn-row" style="justify-content:center"><button class="btn btn--primary" id="again">↻ Jugar de nuevo</button> <a class="btn" href="#/games">Otros juegos</a></div>`);
      const ag = mount.querySelector("#again"); if (ag) ag.addEventListener("click", () => window.Games.subneteo(mount, opts));
      if (opts && opts.onFinish) opts.onFinish(st);
    }
    start();
  };
})();
