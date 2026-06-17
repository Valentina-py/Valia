/* ============================================================
   HERRAMIENTAS INTERACTIVAS — Inglés para el Turismo I
   window.Tools = { verbs, numbers, phrases, vocab }
   Cada función recibe un elemento "mount" donde dibuja la herramienta.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Helpers de lenguaje ---------- */
  const ONES = ["zero","one","two","three","four","five","six","seven","eight","nine",
    "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

  function numWords(n) {
    n = Math.round(n);
    if (n < 0 || n > 1000) return null;
    if (n === 1000) return "one thousand";
    if (n < 20) return ONES[n];
    if (n < 100) {
      const t = Math.floor(n / 10), o = n % 10;
      return TENS[t] + (o ? "-" + ONES[o] : "");
    }
    const h = Math.floor(n / 100), r = n % 100;
    let s = ONES[h] + " hundred";
    if (r) s += " and " + (r < 20 ? ONES[r] : TENS[Math.floor(r / 10)] + (r % 10 ? "-" + ONES[r % 10] : ""));
    return s;
  }

  const ING_EXC = { travel: "travelling", begin: "beginning", swim: "swimming",
    lie: "lying", die: "dying", "shop": "shopping", "plan": "planning", "win": "winning", "put": "putting" };
  function ingForm(verb) {
    verb = (verb || "").toLowerCase().trim().replace(/[^a-z]/g, "");
    if (!verb) return "";
    if (ING_EXC[verb]) return ING_EXC[verb];
    if (verb.endsWith("ie")) return verb.slice(0, -2) + "ying";
    if (verb.endsWith("e") && !verb.endsWith("ee")) return verb.slice(0, -1) + "ing";
    // una sílaba CVC (consonante-vocal-consonante, no w/x/y) → dobla
    if (verb.length <= 4 && /[^aeiou][aeiou][^aeiouwxy]$/.test(verb)) return verb + verb.slice(-1) + "ing";
    return verb + "ing";
  }

  function thirdS(verb) {
    verb = (verb || "").toLowerCase().trim().replace(/[^a-z]/g, "");
    if (!verb) return "";
    if (verb === "have") return "has";
    if (verb === "be") return "is";
    if (verb === "go") return "goes";
    if (verb === "do") return "does";
    if (/(ss|sh|ch|x|z|o)$/.test(verb)) return verb + "es";
    if (/[^aeiou]y$/.test(verb)) return verb.slice(0, -1) + "ies";
    return verb + "s";
  }

  const BE = { i: "am", you: "are", he: "is", she: "is", it: "is", we: "are", they: "are" };
  const SUBJ_LABEL = { i: "I", you: "you", he: "he", she: "she", it: "it", we: "we", they: "they" };
  const SUBJ_CAP = { i: "I", you: "You", he: "He", she: "She", it: "It", we: "We", they: "They" };
  const SUBJECTS = ["i", "you", "he", "she", "it", "we", "they"];
  const is3rd = s => (s === "he" || s === "she" || s === "it");

  function esc(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  /* =========================================================
     1) CONJUGADOR DE VERBOS
     ========================================================= */
  function verbsTool(mount) {
    let tense = "be";    // be | simple | continuous | can
    let subject = "i";
    let verb = "work";

    mount.innerHTML = `
      <div class="tool">
        <label>Estructura / tiempo verbal</label>
        <div class="seg" id="vTense">
          <button data-t="be" class="active">verbo to be</button>
          <button data-t="simple">present simple</button>
          <button data-t="continuous">present continuous</button>
          <button data-t="can">can / can't</button>
        </div>

        <div class="field-row" style="margin-top:14px">
          <div class="field">
            <label>Sujeto</label>
            <select class="input" id="vSubject">
              ${SUBJECTS.map(s => `<option value="${s}"${s===subject?" selected":""}>${SUBJ_CAP[s]}</option>`).join("")}
            </select>
          </div>
          <div class="field" id="vVerbField">
            <label>Verbo (en forma base)</label>
            <input class="input input--mono" id="vVerb" value="${verb}" placeholder="work, live, have…" />
          </div>
        </div>
        <div class="op-keys" id="vChips">
          ${["work","live","have","go","like","study","do","play","want"].map(w => `<button data-v="${w}">${w}</button>`).join("")}
        </div>

        <div id="vOut"></div>
      </div>
      <p class="muted" style="font-size:12.5px">Las reglas de ortografía (-s, -ing) son una ayuda automática; algunos verbos irregulares pueden variar.</p>
    `;

    const out = mount.querySelector("#vOut");
    const verbField = mount.querySelector("#vVerbField");
    const chips = mount.querySelector("#vChips");

    function render() {
      const cap = SUBJ_CAP[subject];
      const low = SUBJ_LABEL[subject];
      let aff = "", neg = "", q = "", note = "";

      if (tense === "be") {
        const b = BE[subject];
        const contr = subject === "i" ? "I'm" : cap + "'" + (b === "are" ? "re" : "s");
        aff = `${cap} ${b} <span class="muted">(${contr})</span>`;
        neg = subject === "i" ? "I'm not" : `${cap} ${b}n't <span class="muted">(${cap}'${b==="are"?"re":"s"} not)</span>`;
        q = `${b.charAt(0).toUpperCase()+b.slice(1)} ${low}…?`;
        note = "El verbo to be no necesita otro verbo: " + cap + " " + b + " a tour guide.";
      } else if (tense === "simple") {
        const base = (verb || "").toLowerCase().trim() || "…";
        const v3 = is3rd(subject) ? thirdS(verb) : base;
        const aux = is3rd(subject) ? "doesn't" : "don't";
        const auxQ = is3rd(subject) ? "Does" : "Do";
        aff = `${cap} ${v3}`;
        neg = `${cap} ${aux} ${base}`;
        q = `${auxQ} ${low} ${base}?`;
        note = is3rd(subject)
          ? "3ª persona: el verbo lleva -s en afirmativo, pero con doesn't/does vuelve a la base."
          : "Con I/you/we/they el verbo va en forma base.";
      } else if (tense === "continuous") {
        const b = BE[subject];
        const ing = ingForm(verb) || "…ing";
        const contr = subject === "i" ? "I'm" : cap + "'" + (b === "are" ? "re" : "s");
        aff = `${contr} ${ing}`;
        neg = subject === "i" ? `I'm not ${ing}` : `${cap} ${b}n't ${ing}`;
        q = `${b.charAt(0).toUpperCase()+b.slice(1)} ${low} ${ing}?`;
        note = "Present continuous = be + verbo-ing (acción de ahora).";
      } else { // can
        const base = (verb || "").toLowerCase().trim() || "…";
        aff = `${cap} can ${base}`;
        neg = `${cap} can't ${base}`;
        q = `Can ${low} ${base}?`;
        note = "can es igual para todos los sujetos y va con el verbo en forma base.";
      }

      out.innerHTML = `
        <div class="result-box" style="margin-top:8px">
          <div style="display:grid;gap:10px">
            <div><span class="chip">Afirmativo</span> <strong style="font-size:17px">${aff}.</strong></div>
            <div><span class="chip">Negativo</span> <strong style="font-size:17px">${neg}.</strong></div>
            <div><span class="chip">Pregunta</span> <strong style="font-size:17px">${q}</strong></div>
          </div>
        </div>
        <p class="muted" style="font-size:13px;margin-top:10px">${note}</p>`;
    }

    function syncVerbField() {
      const hide = (tense === "be");
      verbField.style.display = hide ? "none" : "block";
      chips.style.display = hide ? "none" : "flex";
    }

    mount.querySelector("#vTense").addEventListener("click", e => {
      const b = e.target.closest("button[data-t]"); if (!b) return;
      tense = b.dataset.t;
      mount.querySelectorAll("#vTense button").forEach(x => x.classList.toggle("active", x === b));
      syncVerbField(); render();
    });
    mount.querySelector("#vSubject").addEventListener("change", e => { subject = e.target.value; render(); });
    mount.querySelector("#vVerb").addEventListener("input", e => { verb = e.target.value; render(); });
    chips.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]"); if (!b) return;
      verb = b.dataset.v; mount.querySelector("#vVerb").value = verb; render();
    });

    syncVerbField(); render();
  }

  /* =========================================================
     2) NÚMEROS Y LA HORA
     ========================================================= */
  function clockSVG(h, m) {
    const cx = 100, cy = 100, R = 92;
    let ticks = "";
    for (let i = 0; i < 12; i++) {
      const a = (i * 30) * Math.PI / 180;
      const x1 = cx + Math.sin(a) * (R - 4), y1 = cy - Math.cos(a) * (R - 4);
      const x2 = cx + Math.sin(a) * (R - 14), y2 = cy - Math.cos(a) * (R - 14);
      ticks += `<line class="clock-tick" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }
    const ha = ((h % 12) + m / 60) * 30 * Math.PI / 180;
    const ma = (m * 6) * Math.PI / 180;
    const hx = cx + Math.sin(ha) * 46, hy = cy - Math.cos(ha) * 46;
    const mx = cx + Math.sin(ma) * 70, my = cy - Math.cos(ma) * 70;
    return `<svg class="clock-svg" viewBox="0 0 200 200" width="100%">
      <circle class="clock-face" cx="${cx}" cy="${cy}" r="${R}"/>
      ${ticks}
      <line class="clock-hand-h" x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}"/>
      <line class="clock-hand-m" x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}"/>
      <circle class="clock-center" cx="${cx}" cy="${cy}" r="5"/>
    </svg>`;
  }

  function timeWords(h, m) {
    h = ((h - 1 + 12) % 12) + 1;          // 1..12
    const next = (h % 12) + 1;
    if (m === 0) return `It's ${numWords(h)} o'clock.`;
    if (m === 15) return `It's quarter past ${numWords(h)}.`;
    if (m === 30) return `It's half past ${numWords(h)}.`;
    if (m === 45) return `It's quarter to ${numWords(next)}.`;
    if (m < 30) return `It's ${numWords(m)} past ${numWords(h)}.`;
    return `It's ${numWords(60 - m)} to ${numWords(next)}.`;
  }

  // “random” sin Math.random puro: usamos el reloj del sistema como semilla suave
  function pseudo(max) { return Math.floor((Date.now() / 137 % 1) * 1e6) % max; }

  function numbersTool(mount) {
    mount.innerHTML = `
      <div class="tool">
        <h3 class="mt-0">Número → palabras (0–1000)</h3>
        <div class="field">
          <input class="input input--mono" id="nInput" type="number" min="0" max="1000" value="247" />
        </div>
        <div class="result-box" id="nOut"></div>
      </div>

      <div class="tool">
        <h3 class="mt-0">La hora</h3>
        <div class="field-row">
          <div class="field"><label>Hora (1–12)</label><input class="input" id="tH" type="number" min="1" max="12" value="3"/></div>
          <div class="field"><label>Minutos (0–59)</label><input class="input" id="tM" type="number" min="0" max="59" value="15"/></div>
        </div>
        <div class="btn-row"><button class="btn" id="tRand">Hora al azar</button></div>
        <div class="clock-wrap">
          <div id="clock"></div>
          <div class="result-box" id="tOut" style="width:100%;text-align:center"></div>
        </div>
      </div>`;

    const nInput = mount.querySelector("#nInput");
    const nOut = mount.querySelector("#nOut");
    function renderNum() {
      const v = parseInt(nInput.value, 10);
      if (isNaN(v) || v < 0 || v > 1000) { nOut.className = "result-box empty"; nOut.textContent = "Ingresá un número de 0 a 1000."; return; }
      nOut.className = "result-box";
      nOut.innerHTML = `<span class="big">${v}</span> <strong>${numWords(v)}</strong>`;
    }
    nInput.addEventListener("input", renderNum);

    const tH = mount.querySelector("#tH"), tM = mount.querySelector("#tM");
    const clock = mount.querySelector("#clock"), tOut = mount.querySelector("#tOut");
    function renderTime() {
      let h = parseInt(tH.value, 10), m = parseInt(tM.value, 10);
      if (isNaN(h) || h < 1 || h > 12) h = 12;
      if (isNaN(m) || m < 0 || m > 59) m = 0;
      clock.innerHTML = clockSVG(h, m);
      const digital = `${h}:${m.toString().padStart(2, "0")}`;
      tOut.innerHTML = `<span class="big">${timeWords(h, m)}</span> <span class="muted">${digital} · también: ${numWords(h)} ${m === 0 ? "o'clock" : numWords(m)}</span>`;
    }
    tH.addEventListener("input", renderTime);
    tM.addEventListener("input", renderTime);
    mount.querySelector("#tRand").addEventListener("click", () => {
      tH.value = (pseudo(12) + 1);
      const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      tM.value = mins[pseudo(mins.length)];
      renderTime();
    });

    renderNum(); renderTime();
  }

  /* =========================================================
     3) FRASEBOOK DE TURISMO
     ========================================================= */
  const PHRASES = [
    { cat: "Saludos", en: "Hello / Good morning.", es: "Hola / Buenos días." },
    { cat: "Saludos", en: "Nice to meet you.", es: "Encantado/a de conocerte." },
    { cat: "Saludos", en: "How are you? — Fine, thanks.", es: "¿Cómo estás? — Bien, gracias." },
    { cat: "Saludos", en: "See you tomorrow. / Goodbye.", es: "Nos vemos mañana. / Adiós." },
    { cat: "Saludos", en: "Excuse me… / Sorry.", es: "Disculpe… / Perdón." },
    { cat: "Saludos", en: "Thank you very much. — You're welcome.", es: "Muchas gracias. — De nada." },

    { cat: "Aeropuerto", en: "Where is the check-in desk?", es: "¿Dónde está el mostrador de check-in?" },
    { cat: "Aeropuerto", en: "Here is my passport and ticket.", es: "Aquí están mi pasaporte y boleto." },
    { cat: "Aeropuerto", en: "What time is the flight to Madrid?", es: "¿A qué hora es el vuelo a Madrid?" },
    { cat: "Aeropuerto", en: "Where is the boarding gate?", es: "¿Dónde está la puerta de embarque?" },
    { cat: "Aeropuerto", en: "I'm waiting at passport control.", es: "Estoy esperando en migraciones." },
    { cat: "Aeropuerto", en: "Where can I get my luggage?", es: "¿Dónde retiro mi equipaje?" },

    { cat: "Hotel", en: "I have a reservation. My name is…", es: "Tengo una reserva. Mi nombre es…" },
    { cat: "Hotel", en: "I'd like a single / double room, please.", es: "Quisiera una habitación simple / doble." },
    { cat: "Hotel", en: "Is breakfast included?", es: "¿El desayuno está incluido?" },
    { cat: "Hotel", en: "Is there Wi-Fi in the room?", es: "¿Hay wifi en la habitación?" },
    { cat: "Hotel", en: "What time is check-out?", es: "¿A qué hora es la salida?" },
    { cat: "Hotel", en: "Can I have my key, please?", es: "¿Me da mi llave, por favor?" },

    { cat: "Restaurante", en: "A table for two, please.", es: "Una mesa para dos, por favor." },
    { cat: "Restaurante", en: "Can I have the menu, please?", es: "¿Me trae el menú?" },
    { cat: "Restaurante", en: "I'd like a chicken sandwich and a water.", es: "Quisiera un sándwich de pollo y un agua." },
    { cat: "Restaurante", en: "How much is it? / The bill, please.", es: "¿Cuánto es? / La cuenta, por favor." },
    { cat: "Restaurante", en: "Can I pay by card?", es: "¿Puedo pagar con tarjeta?" },
    { cat: "Restaurante", en: "It's delicious! Thank you.", es: "¡Está delicioso! Gracias." },

    { cat: "Direcciones", en: "Excuse me, where is the station?", es: "Disculpe, ¿dónde está la estación?" },
    { cat: "Direcciones", en: "Is it near / far from here?", es: "¿Está cerca / lejos de aquí?" },
    { cat: "Direcciones", en: "Go straight on and turn left / right.", es: "Siga derecho y doble a la izquierda / derecha." },
    { cat: "Direcciones", en: "It's next to / opposite the bank.", es: "Está al lado de / frente al banco." },
    { cat: "Direcciones", en: "Can you call a taxi for me, please?", es: "¿Puede pedirme un taxi?" },

    { cat: "Compras", en: "How much is this / are these?", es: "¿Cuánto cuesta esto / cuestan estos?" },
    { cat: "Compras", en: "Do you have a smaller / bigger size?", es: "¿Tiene un talle más chico / más grande?" },
    { cat: "Compras", en: "It's too expensive. / It's cheap.", es: "Es muy caro. / Es barato." },
    { cat: "Compras", en: "I'll take it, thanks.", es: "Me lo llevo, gracias." },

    { cat: "Emergencias", en: "Can you help me, please?", es: "¿Puede ayudarme, por favor?" },
    { cat: "Emergencias", en: "I don't understand. Can you repeat that?", es: "No entiendo. ¿Puede repetir?" },
    { cat: "Emergencias", en: "Do you speak Spanish?", es: "¿Habla español?" },
    { cat: "Emergencias", en: "I need a doctor. / Call the police.", es: "Necesito un médico. / Llame a la policía." },
    { cat: "Emergencias", en: "How do you say… in English?", es: "¿Cómo se dice… en inglés?" },
  ];
  const PHRASE_CATS = ["Todas", "Saludos", "Aeropuerto", "Hotel", "Restaurante", "Direcciones", "Compras", "Emergencias"];

  function phrasesTool(mount) {
    let cat = "Todas", term = "";
    mount.innerHTML = `
      <div class="tool">
        <div class="field">
          <input class="input" id="phSearch" type="search" placeholder="Buscar una frase en español o inglés…" />
        </div>
        <div class="seg" id="phCats">
          ${PHRASE_CATS.map((c, i) => `<button data-c="${c}"${i===0?' class="active"':''}>${c}</button>`).join("")}
        </div>
      </div>
      <div id="phList"></div>`;

    const list = mount.querySelector("#phList");
    function render() {
      const t = term.toLowerCase();
      const items = PHRASES.filter(p =>
        (cat === "Todas" || p.cat === cat) &&
        (!t || p.en.toLowerCase().includes(t) || p.es.toLowerCase().includes(t)));
      if (!items.length) { list.innerHTML = `<p class="muted">Sin resultados.</p>`; return; }
      const groups = {};
      items.forEach(p => { (groups[p.cat] = groups[p.cat] || []).push(p); });
      list.innerHTML = Object.keys(groups).map(g => `
        <h3>${g}</h3>
        <div class="phrase-list">
          ${groups[g].map(p => `<div class="phrase"><span class="phrase__en">${esc(p.en)}</span><span class="phrase__es">${esc(p.es)}</span></div>`).join("")}
        </div>`).join("");
    }
    mount.querySelector("#phCats").addEventListener("click", e => {
      const b = e.target.closest("button[data-c]"); if (!b) return;
      cat = b.dataset.c;
      mount.querySelectorAll("#phCats button").forEach(x => x.classList.toggle("active", x === b));
      render();
    });
    mount.querySelector("#phSearch").addEventListener("input", e => { term = e.target.value; render(); });
    render();
  }

  /* =========================================================
     4) ENTRENADOR DE VOCABULARIO
     ========================================================= */
  const VOCAB_SETS = {
    "Países y nacionalidades": [
      ["Argentina", "Argentinian"], ["Brazil", "Brazilian"], ["Spain", "Spanish"],
      ["England", "English"], ["The UK", "British"], ["The USA", "American"],
      ["France", "French"], ["Italy", "Italian"], ["China", "Chinese"], ["Japan", "Japanese"],
    ].map(([a, b]) => ({ en: a, es: "→ " + b })),
    "Trabajos": [
      ["waiter / waitress", "mozo / moza"], ["receptionist", "recepcionista"],
      ["tour guide", "guía de turismo"], ["doctor", "médico"], ["nurse", "enfermero/a"],
      ["journalist", "periodista"], ["shop assistant", "vendedor/a"], ["teacher", "profesor/a"],
    ].map(([a, b]) => ({ en: a, es: b })),
    "Comida y bebida": [
      ["bread", "pan"], ["cheese", "queso"], ["eggs", "huevos"], ["fruit", "fruta"],
      ["meat", "carne"], ["fish", "pescado"], ["coffee", "café"], ["tea", "té"],
      ["milk", "leche"], ["water", "agua"], ["orange juice", "jugo de naranja"],
    ].map(([a, b]) => ({ en: a, es: b })),
    "Familia": [
      ["mother", "madre"], ["father", "padre"], ["husband", "esposo"], ["wife", "esposa"],
      ["son", "hijo"], ["daughter", "hija"], ["brother", "hermano"], ["sister", "hermana"],
      ["parents", "padres"], ["children", "hijos"],
    ].map(([a, b]) => ({ en: a, es: b })),
    "Ropa": [
      ["a shirt", "camisa"], ["a T-shirt", "remera"], ["a skirt", "pollera"], ["a dress", "vestido"],
      ["trousers", "pantalón"], ["jeans", "jeans"], ["a jacket", "campera"], ["shoes", "zapatos"],
      ["a sweater", "suéter"], ["a coat", "abrigo"],
    ].map(([a, b]) => ({ en: a, es: b })),
    "Hotel": [
      ["a single room", "habitación simple"], ["a double room", "habitación doble"],
      ["a lift", "ascensor"], ["a swimming pool", "piscina"], ["reception", "recepción"],
      ["a key card", "tarjeta-llave"], ["a view", "vista"], ["breakfast included", "desayuno incluido"],
    ].map(([a, b]) => ({ en: a, es: b })),
  };
  const VOCAB_NAMES = Object.keys(VOCAB_SETS);

  function vocabTool(mount) {
    let setName = VOCAB_NAMES[0];
    let order = VOCAB_SETS[setName].map((_, i) => i);
    let pos = 0, flipped = false, known = 0;

    mount.innerHTML = `
      <div class="tool">
        <div class="field">
          <label>Tema</label>
          <select class="input" id="vsSet">
            ${VOCAB_NAMES.map(n => `<option>${n}</option>`).join("")}
          </select>
        </div>
        <div class="btn-row">
          <button class="btn" id="vsShuffle">Mezclar</button>
          <span class="chip" id="vsCount"></span>
        </div>
        <div class="vt-card" id="vsCard"></div>
        <div class="btn-row" style="justify-content:space-between">
          <button class="btn" id="vsPrev">← Anterior</button>
          <button class="btn btn--primary" id="vsFlip">Ver traducción</button>
          <button class="btn" id="vsNext">Siguiente →</button>
        </div>
      </div>`;

    const card = mount.querySelector("#vsCard");
    const count = mount.querySelector("#vsCount");

    function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = pseudo(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

    function render() {
      const items = VOCAB_SETS[setName];
      const item = items[order[pos]];
      card.innerHTML = `
        <div class="vt-en">${esc(item.en)}</div>
        <div class="vt-es">${flipped ? esc(item.es) : '<span class="muted">¿Qué significa?</span>'}</div>`;
      count.textContent = `${pos + 1} / ${items.length}`;
      mount.querySelector("#vsFlip").textContent = flipped ? "Ocultar" : "Ver traducción";
    }
    function go(d) {
      const len = VOCAB_SETS[setName].length;
      pos = (pos + d + len) % len; flipped = false; render();
    }

    mount.querySelector("#vsSet").addEventListener("change", e => {
      setName = e.target.value; order = VOCAB_SETS[setName].map((_, i) => i); pos = 0; flipped = false; render();
    });
    mount.querySelector("#vsShuffle").addEventListener("click", () => {
      order = shuffle(VOCAB_SETS[setName].map((_, i) => i)); pos = 0; flipped = false; render();
    });
    mount.querySelector("#vsFlip").addEventListener("click", () => { flipped = !flipped; render(); });
    card.addEventListener("click", () => { flipped = !flipped; render(); });
    mount.querySelector("#vsPrev").addEventListener("click", () => go(-1));
    mount.querySelector("#vsNext").addEventListener("click", () => go(1));

    render();
  }

  /* ---------- Export ---------- */
  window.Tools = {
    verbs: verbsTool,
    numbers: numbersTool,
    phrases: phrasesTool,
    vocab: vocabTool,
  };
})();
