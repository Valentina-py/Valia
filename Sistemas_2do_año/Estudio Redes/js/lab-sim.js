/* ============================================================
   MODO INTERACTIVO — "Jugá el laboratorio"
   Convierte cada lab de Packet Tracer en una serie de desafíos:
     choice  · decisión / predicción (opción múltiple)
     ip      · configurar IP (se valida la red)
     terminal· escribir comandos en una consola simulada
     order   · ordenar el flujo de protocolos
   Datos en window.LAB_SIM · motor en window.LabSim
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------- DESAFÍOS ----------------------- */
  window.LAB_SIM = {
    lab1: {
      title: "Armá tu red hogareña",
      sub: "Conectá, configurá y probá una red — como en el Laboratorio N° 1.",
      challenges: [
        { type: "choice", kind: "Decisión",
          q: "Vas a conectar directamente una <strong>PC</strong> y un <strong>Servidor</strong>. ¿Qué cable corresponde?",
          opts: ["Cable directo (straight-through)", "Cable cruzado (crossover) UTP", "Fibra óptica monomodo", "Cable serial"],
          a: 1, exp: "Entre dispositivos del mismo tipo (PC–Servidor, PC–Router, switch–switch) se usa <strong>cable cruzado UTP</strong>." },

        { type: "ip", kind: "Configurar IP",
          q: "El Servidor0 tiene <span class='cmd'>192.168.0.1 /24</span>. Configurá la <strong>PC0</strong> para que pueda comunicarse con él.",
          devices: [{ name: "PC0", rule: { network: "192.168.0.0", cidr: 24, avoid: ["192.168.0.1"] } }],
          exp: "La PC debe estar en la <strong>misma red</strong> (192.168.0.0/24), con máscara 255.255.255.0 y una IP de host distinta de la del servidor (p. ej. 192.168.0.2)." },

        { type: "terminal", kind: "Terminal",
          q: "Probá la conectividad con el servidor desde la PC0.",
          prompt: "PC>", accept: [/^ping 192\.168\.0\.1$/], hint: "Escribí: ping 192.168.0.1",
          output: `<span class="dim">Haciendo ping a 192.168.0.1 con 32 bytes de datos:</span>
<span class="ok">Respuesta desde 192.168.0.1: bytes=32 tiempo&lt;1ms TTL=128</span>
<span class="ok">Respuesta desde 192.168.0.1: bytes=32 tiempo&lt;1ms TTL=128</span>
<span class="dim">Paquetes: enviados = 4, recibidos = 4, perdidos = 0</span>`,
          exp: "El <strong>ping</strong> usa ICMP para verificar que el destino responde. 0% de pérdida = hay conectividad." },

        { type: "choice", kind: "Predecí",
          q: "Ahora hacés <span class='cmd'>ping 192.168.0.5</span>, una IP que no existe en la red. ¿Qué ocurre?",
          opts: ["Respuesta desde 192.168.0.5", "Tiempo de espera agotado (Request timed out)", "Se apaga el servidor", "Cambia la IP de tu PC"],
          a: 1, exp: "Nadie tiene esa IP, así que no llega respuesta: <strong>Tiempo de espera agotado</strong>." },

        { type: "choice", kind: "Predecí",
          q: "Cambiás el Servidor0 a <span class='cmd'>192.168.1.1 /24</span> y dejás la PC0 en 192.168.0.2 /24. ¿Qué pasa con el ping?",
          opts: ["Sigue funcionando igual", "Falla: quedan en redes distintas y no hay router", "Anda más rápido", "El cable se vuelve directo"],
          a: 1, exp: "Quedan en <strong>redes diferentes</strong> (192.168.0.0 vs 192.168.1.0). Sin un router que las una, no hay comunicación." },

        { type: "choice", kind: "Decisión",
          q: "En la red hogareña con router Linksys, ¿qué puerto obtiene su IP automáticamente del ISP por DHCP?",
          opts: ["El puerto LAN", "El puerto Internet / WAN", "El puerto inalámbrico", "Ninguno, siempre es estático"],
          a: 1, exp: "La puerta <strong>WAN/Internet</strong> toma IP por DHCP del proveedor; la LAN interna usa 192.168.0.1/24." },

        { type: "choice", kind: "Concepto",
          q: "¿Para qué sirve el servidor <strong>DHCP</strong> del router?",
          opts: ["Traducir nombres de dominio a IP", "Asignar direcciones IP automáticamente a los clientes", "Cifrar la red Wi-Fi", "Detectar virus"],
          a: 1, exp: "<strong>DHCP</strong> entrega IP, máscara, gateway y DNS automáticamente a cada cliente que se conecta." },

        { type: "terminal", kind: "Terminal",
          q: "Una PC tomó su configuración por DHCP. Verificá qué dirección recibió.",
          prompt: "PC>", accept: [/^ipconfig( \/all)?$/], hint: "Probá: ipconfig",
          output: `<span class="dim">Adaptador de Ethernet:</span>
   Dirección IPv4. . . . . : 192.168.0.100
   Máscara de subred . . . : 255.255.255.0
   Puerta de enlace. . . . : 192.168.0.1`,
          exp: "<strong>ipconfig</strong> muestra la IP, la máscara y la puerta de enlace asignadas (acá, por DHCP)." }
      ]
    },

    lab2: {
      title: "Protocolos en acción",
      sub: "HTTP, FTP, SMTP/POP3, DNS y TFTP — como en el Laboratorio N° 2.",
      challenges: [
        { type: "choice", kind: "Decisión",
          q: "Abrís <span class='cmd'>http://192.168.0.1</span> en el navegador. ¿A qué puerto se conecta por defecto?",
          opts: ["21", "25", "80", "53"], a: 2,
          exp: "<strong>HTTP usa el puerto 80.</strong> (21 = FTP control, 25 = SMTP, 53 = DNS)." },

        { type: "choice", kind: "Análisis",
          q: "En el análisis, una <strong>sola</strong> conexión TCP transportó varios objetos de la página. La sesión es…",
          opts: ["No persistente", "Persistente", "Sin conexión (UDP)", "Cifrada"], a: 1,
          exp: "Reutilizar la misma conexión TCP para varios objetos = HTTP <strong>persistente</strong> (ahorra un RTT por objeto)." },

        { type: "choice", kind: "Predecí",
          q: "Pedís una página que no existe en el servidor. ¿Qué código de estado HTTP devuelve?",
          opts: ["200 OK", "301 Moved", "404 Not Found", "500 Server Error"], a: 2,
          exp: "Recurso inexistente → <strong>404 Not Found</strong>." },

        { type: "terminal", kind: "Terminal",
          q: "Conectate al servidor FTP, que está en 10.0.0.1.",
          prompt: "PC>", accept: [/^ftp 10\.0\.0\.1$/], hint: "Escribí: ftp 10.0.0.1",
          output: `<span class="dim">Conectando a 10.0.0.1...</span>
<span class="ok">220 Bienvenido al servidor FTP</span>
<span class="dim">Usuario: cisco · Contraseña: cisco</span>
<span class="ok">230 Sesión iniciada.</span>`,
          exp: "El cliente FTP abre la <strong>conexión de control (puerto 21)</strong> y pide usuario/clave (cisco/cisco)." },

        { type: "terminal", kind: "Terminal",
          q: "Ya dentro del FTP, subí el archivo <span class='cmd'>prueba.txt</span> al servidor.",
          prompt: "ftp>", accept: [/^put prueba\.txt$/], hint: "El comando para subir es: put prueba.txt",
          output: `<span class="dim">Abriendo conexión de datos (puerto 20)...</span>
<span class="ok">226 Transferencia completa.</span>`,
          exp: "<strong>put</strong> sube un archivo; <strong>get</strong> lo descarga. Los datos viajan por el puerto 20." },

        { type: "choice", kind: "Concepto",
          q: "FTP usa dos conexiones TCP separadas. ¿Cuáles son los puertos?",
          opts: ["80 (web) y 443 (https)", "21 control y 20 datos", "25 (envío) y 110 (recepción)", "53 y 67"], a: 1,
          exp: "Control (21) y datos (20): por eso se dice que el control va <strong>“fuera de banda”</strong>." },

        { type: "order", kind: "Ordená",
          q: "Alicia (webmail) le manda un correo a Benito (que usa POP3). Ordená el camino del mensaje.",
          items: [
            "HTTP — Alicia sube el correo desde el navegador a su servidor",
            "SMTP — el servidor de Alicia lo envía al servidor de Benito",
            "POP3 — Benito descarga el correo desde su servidor"
          ],
          exp: "La serie es <strong>HTTP → SMTP → POP3</strong>. SMTP siempre <em>envía</em>; POP3/IMAP <em>reciben</em>." },

        { type: "choice", kind: "Concepto",
          q: "Configurás en el servidor un registro <strong>A</strong>: <span class='cmd'>server → 10.0.0.1</span>. ¿Qué hace el DNS?",
          opts: ["Asigna IPs por DHCP", "Traduce nombres a direcciones IP", "Cifra el correo", "Reenvía paquetes entre redes"], a: 1,
          exp: "El <strong>DNS</strong> traduce nombres a IP. Usa UDP, puerto 53." },

        { type: "terminal", kind: "Terminal",
          q: "Desde el router, en modo privilegio, respaldá la configuración en el servidor TFTP.",
          prompt: "Router#", accept: [/^copy run(ning-config)? tftp$/], hint: "Comando: copy run tftp",
          output: `<span class="dim">Address or name of remote host []? 10.1.1.2</span>
<span class="dim">Destination filename [router-confg]?</span>
<span class="ok">!!!</span>
<span class="ok">1289 bytes copied in 0.4 secs</span>`,
          exp: "<strong>copy run tftp</strong> guarda la config en el servidor TFTP; para restaurar es <span class='cmd'>copy tftp run</span>." },

        { type: "choice", kind: "Concepto",
          q: "¿Sobre qué protocolo de transporte corre <strong>TFTP</strong> (a diferencia de FTP)?",
          opts: ["TCP", "UDP", "IP", "HTTP"], a: 1,
          exp: "TFTP es liviano y corre sobre <strong>UDP</strong>; FTP, en cambio, usa TCP." }
      ]
    }
  };

  /* ----------------------- helpers IP ----------------------- */
  function parseIp(str) {
    if (!str) return null;
    const p = String(str).trim().split(".");
    if (p.length !== 4) return null;
    let n = 0;
    for (const o of p) { if (!/^\d+$/.test(o)) return null; const v = +o; if (v < 0 || v > 255) return null; n = n * 256 + v; }
    return n >>> 0;
  }
  function cidrFromMask(m) {
    m = m >>> 0; let c = 0, zero = false, ok = true;
    for (let i = 31; i >= 0; i--) { const b = (m >>> i) & 1; if (b) { if (zero) ok = false; c++; } else zero = true; }
    return ok ? c : null;
  }
  function maskFromCidr(c) { return c === 0 ? 0 : (0xFFFFFFFF << (32 - c)) >>> 0; }
  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ----------------------- MOTOR ----------------------- */
  window.LabSim = {
    start: function (root, labId, opts) {
      opts = opts || {};
      const sim = window.LAB_SIM[labId];
      if (!sim) { root.innerHTML = "Lab no encontrado."; return; }
      const icon = opts.icon || (() => "");
      const challenges = sim.challenges;
      const total = challenges.length;
      let idx = 0, score = 0;

      function starsFor(s) { return s >= total * 0.85 ? 3 : s >= total * 0.55 ? 2 : s > 0 ? 1 : 0; }
      function starBar(n) {
        let h = "";
        for (let i = 0; i < 3; i++) h += `<span class="${i < n ? "" : "off"}">★</span>`;
        return `<span class="sim-stars">${h}</span>`;
      }

      function shell(stageHtml) {
        root.innerHTML = `<div class="fade-in">
          <div class="chip">${icon("lab")} ${sim.title}</div>
          <h1 class="page-title" style="margin:10px 0 4px">Modo interactivo</h1>
          <p class="page-sub">${sim.sub}</p>
          <div class="sim-top">
            <div class="progress-bar"><span style="width:${Math.round((idx) / total * 100)}%"></span></div>
            <span class="sim-count">Desafío ${idx + 1} de ${total} · ${score} ✓</span>
          </div>
          ${stageHtml}
        </div>`;
      }

      function navHtml(last) {
        return `<div class="btn-row" id="simNav" style="margin-bottom:0"></div>`;
      }
      function showNext(container, fbHtml, ok) {
        const fb = container.querySelector("#simFb");
        fb.className = "quiz-feedback " + (ok ? "ok" : "no") + " show";
        fb.innerHTML = `${ok ? icon("check") : icon("cross")} ${fbHtml}`;
        const nav = container.querySelector("#simNav");
        nav.innerHTML = `<button class="btn btn--primary" id="simNext">${idx < total - 1 ? "Siguiente →" : "Ver resultado →"}</button>`;
        nav.querySelector("#simNext").addEventListener("click", () => {
          if (idx < total - 1) { idx++; paint(); } else finish();
        });
      }

      function paint() {
        const ch = challenges[idx];
        let first = true;

        if (ch.type === "choice") {
          shell(`<div class="sim-card">
            <span class="sim-kind">${ch.kind}</span>
            <div class="sim-q">${ch.q}</div>
            <div class="quiz-options" id="opts">${ch.opts.map((o, k) => `<button class="quiz-opt" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("")}</div>
            <div class="quiz-feedback" id="simFb"></div>
            ${navHtml()}
          </div>`);
          const optsEl = root.querySelector("#opts");
          let answered = false;
          optsEl.addEventListener("click", (e) => {
            const b = e.target.closest(".quiz-opt"); if (!b || answered) return;
            answered = true; const k = +b.dataset.k;
            optsEl.querySelectorAll(".quiz-opt").forEach((el, i2) => {
              el.disabled = true;
              if (i2 === ch.a) el.classList.add("correct"); else if (i2 === k) el.classList.add("wrong");
            });
            const ok = k === ch.a; if (ok) score++;
            showNext(root, (ok ? "<strong>¡Correcto!</strong> " : `<strong>La correcta es ${String.fromCharCode(65 + ch.a)}.</strong> `) + ch.exp, ok);
          });

        } else if (ch.type === "ip") {
          shell(`<div class="sim-card">
            <span class="sim-kind">${ch.kind}</span>
            <div class="sim-q">${ch.q}</div>
            ${ch.devices.map((d, di) => `<div class="sim-dev">
              <div class="sim-dev__name"><span class="dot"></span>${d.name}</div>
              <div class="field-row">
                <div class="field"><label>Dirección IP</label><input class="input input--mono" id="ip${di}" placeholder="192.168.0.x"></div>
                <div class="field"><label>Máscara de subred</label><input class="input input--mono" id="mk${di}" placeholder="255.255.255.0"></div>
              </div>
              <div class="error-text" id="er${di}"></div>
            </div>`).join("")}
            <div class="btn-row" style="margin-bottom:0"><button class="btn btn--primary" id="ipCheck">Verificar configuración</button></div>
            <div class="quiz-feedback" id="simFb"></div>
            ${navHtml()}
          </div>`);
          root.querySelector("#ipCheck").addEventListener("click", () => {
            let allOk = true;
            ch.devices.forEach((d, di) => {
              const er = root.querySelector("#er" + di);
              const ipN = parseIp(root.querySelector("#ip" + di).value);
              const mkN = parseIp(root.querySelector("#mk" + di).value);
              const reqMask = maskFromCidr(d.rule.cidr);
              const netN = parseIp(d.rule.network);
              let msg = "";
              if (ipN === null) msg = "La IP no es válida.";
              else if (mkN === null || cidrFromMask(mkN) !== d.rule.cidr) msg = `La máscara debe ser /${d.rule.cidr} (${[(reqMask>>>24)&255,(reqMask>>>16)&255,(reqMask>>>8)&255,reqMask&255].join(".")}).`;
              else if (((ipN & reqMask) >>> 0) !== netN) msg = `La IP no está en la red ${d.rule.network}/${d.rule.cidr}.`;
              else if (((ipN ^ netN) >>> 0) === 0) msg = "Esa es la dirección de red, no sirve para un host.";
              else if (((ipN | (~reqMask >>> 0)) >>> 0) === ipN) msg = "Esa es la dirección de broadcast, no sirve para un host.";
              else if ((d.rule.avoid || []).some(a => parseIp(a) === ipN)) msg = "Esa IP ya está usada por otro equipo.";
              er.textContent = msg;
              if (msg) allOk = false;
            });
            if (allOk) { score++; root.querySelector("#ipCheck").disabled = true;
              root.querySelectorAll(".sim-dev input").forEach(i => i.disabled = true);
              showNext(root, "<strong>¡Bien configurado!</strong> " + ch.exp, true);
            } else { first = false; }
          });

        } else if (ch.type === "terminal") {
          shell(`<div class="sim-card">
            <span class="sim-kind">${ch.kind}</span>
            <div class="sim-q">${ch.q}</div>
            <div class="term">
              <div class="term-log" id="tlog"></div>
              <div class="term-row"><span class="term-prompt">${ch.prompt}</span><input class="term-input" id="tin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="escribí el comando y Enter…"></div>
            </div>
            <div class="sim-hint" id="thint"></div>
            <div class="quiz-feedback" id="simFb"></div>
            ${navHtml()}
          </div>`);
          const input = root.querySelector("#tin"), log = root.querySelector("#tlog");
          let solved = false, tries = 0;
          input.focus();
          input.addEventListener("keydown", (e) => {
            if (e.key !== "Enter" || solved) return;
            const raw = input.value; const cmd = norm(raw);
            log.innerHTML += `<div><span class="term-prompt">${ch.prompt}</span> ${esc(raw)}</div>`;
            if (ch.accept.some(r => r.test(cmd))) {
              solved = true; if (tries === 0) score++;
              log.innerHTML += `<div>${ch.output}</div>`;
              input.disabled = true;
              showNext(root, "<strong>¡Comando correcto!</strong> " + ch.exp, true);
            } else {
              tries++; first = false;
              log.innerHTML += `<div class="err">Comando no reconocido o incorrecto. Intentá de nuevo.</div>`;
              root.querySelector("#thint").textContent = "💡 " + (ch.hint || "");
            }
            input.value = "";
            log.scrollTop = log.scrollHeight;
          });

        } else if (ch.type === "order") {
          const order = ch.items.map((t, i) => ({ t, i }));
          for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
          shell(`<div class="sim-card">
            <span class="sim-kind">${ch.kind}</span>
            <div class="sim-q">${ch.q}</div>
            <div class="order-seq" id="oseq"></div>
            <div class="order-pool" id="opool">${order.map(o => `<button class="order-chip" data-i="${o.i}">${o.t}</button>`).join("")}</div>
            <div class="quiz-feedback" id="simFb"></div>
            ${navHtml()}
          </div>`);
          const pool = root.querySelector("#opool"), seq = root.querySelector("#oseq");
          let placed = 0, lost = false;
          pool.addEventListener("click", (e) => {
            const b = e.target.closest(".order-chip"); if (!b || b.disabled) return;
            const expected = placed; // próximo índice correcto
            if (+b.dataset.i === expected) {
              b.disabled = true; b.classList.add("placed");
              placed++;
              seq.innerHTML += `<div class="order-chip"><span class="num">${placed}</span>${ch.items[expected]}</div>`;
              if (placed === ch.items.length) {
                if (!lost) score++;
                showNext(root, "<strong>¡Orden correcto!</strong> " + ch.exp, true);
              }
            } else {
              lost = true; first = false;
              b.classList.add("placed", "bad"); b.classList.remove("placed");
              b.style.borderColor = "var(--bad)";
              setTimeout(() => { b.style.borderColor = ""; }, 600);
            }
          });
        }
      }

      function finish() {
        const pct = Math.round(score / total * 100);
        const st = starsFor(score);
        if (opts.onFinish) opts.onFinish(st);
        const msg = st === 3 ? "¡Dominás este lab!" : st === 2 ? "Muy bien, repasá lo que falló." : "Buen intento — volvé a jugarlo para afianzar.";
        root.innerHTML = `<div class="fade-in">
          <h1 class="page-title">Resultado</h1>
          <div class="card center">
            <div style="font-size:34px;margin-bottom:6px">${starBar(st)}</div>
            <div class="quiz-score-ring">${score}/${total}</div>
            <div class="progress-bar" style="max-width:320px;margin:16px auto"><span style="width:${pct}%"></span></div>
            <p class="lead">${pct}% · ${msg}</p>
            <div class="btn-row" style="justify-content:center">
              <button class="btn btn--primary" id="simRetry">${icon("refresh")} Jugar de nuevo</button>
              <a class="btn" href="#/labs/${labId}">${icon("book")} Ver la guía</a>
              <a class="btn" href="#/play">Otros labs</a>
            </div>
          </div>
        </div>`;
        const r = root.querySelector("#simRetry");
        if (r) r.addEventListener("click", () => { idx = 0; score = 0; paint(); });
      }

      paint();
    }
  };
})();
