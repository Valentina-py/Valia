/* ============================================================
   JUEGOS — Inglés para el Turismo I
   window.Games = { memory, speed, sentence, hangman, _stop }
   Cada juego recibe un elemento "mount". _stop() limpia temporizadores.
   ============================================================ */
(function () {
  "use strict";

  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function esc(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  let activeTimer = null;
  function stop() { if (activeTimer) { clearInterval(activeTimer); activeTimer = null; } }

  const ICON = {
    refresh: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>',
    check: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>',
    cross: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  };

  /* =========================================================
     1) MEMOTEST — emparejar inglés ↔ español
     ========================================================= */
  const MEM_THEMES = {
    "Saludos y cortesía": [["Hello", "Hola"], ["Goodbye", "Adiós"], ["Please", "Por favor"], ["Thank you", "Gracias"], ["Sorry", "Perdón"], ["Excuse me", "Disculpe"], ["Good morning", "Buenos días"], ["Good night", "Buenas noches"], ["See you", "Nos vemos"], ["You're welcome", "De nada"], ["Nice to meet you", "Encantado/a"], ["Welcome", "Bienvenido/a"]],
    "Familia": [["mother", "madre"], ["father", "padre"], ["sister", "hermana"], ["brother", "hermano"], ["son", "hijo"], ["daughter", "hija"], ["wife", "esposa"], ["husband", "esposo"], ["parents", "padres"], ["children", "hijos"], ["grandmother", "abuela"], ["grandfather", "abuelo"], ["aunt", "tía"], ["uncle", "tío"]],
    "Comida y bebida": [["bread", "pan"], ["cheese", "queso"], ["water", "agua"], ["milk", "leche"], ["coffee", "café"], ["tea", "té"], ["fish", "pescado"], ["meat", "carne"], ["egg", "huevo"], ["fruit", "fruta"], ["chicken", "pollo"], ["juice", "jugo"], ["sugar", "azúcar"], ["wine", "vino"]],
    "Objetos y souvenirs": [["bag", "bolsa"], ["hat", "sombrero"], ["map", "mapa"], ["key", "llave"], ["umbrella", "paraguas"], ["postcard", "postal"], ["T-shirt", "remera"], ["mug", "taza"], ["ticket", "boleto"], ["camera", "cámara"], ["wallet", "billetera"], ["phone", "teléfono"]],
    "Números": [["one", "uno"], ["four", "cuatro"], ["five", "cinco"], ["eight", "ocho"], ["ten", "diez"], ["twelve", "doce"], ["thirteen", "trece"], ["fifteen", "quince"], ["twenty", "veinte"], ["thirty", "treinta"], ["fifty", "cincuenta"], ["a hundred", "cien"]],
    "Colores": [["red", "rojo"], ["blue", "azul"], ["green", "verde"], ["yellow", "amarillo"], ["black", "negro"], ["white", "blanco"], ["orange", "naranja"], ["pink", "rosa"], ["brown", "marrón"], ["grey", "gris"]],
    "Países / nacionalidades": [["England", "Inglaterra"], ["Spain", "España"], ["France", "Francia"], ["Italy", "Italia"], ["Japan", "Japón"], ["Brazil", "Brasil"], ["Germany", "Alemania"], ["China", "China"], ["Argentina", "Argentina"], ["Portugal", "Portugal"]],
    "Días y meses": [["Monday", "lunes"], ["Tuesday", "martes"], ["Wednesday", "miércoles"], ["Thursday", "jueves"], ["Friday", "viernes"], ["Saturday", "sábado"], ["Sunday", "domingo"], ["January", "enero"], ["July", "julio"], ["December", "diciembre"]],
    "Ropa": [["shirt", "camisa"], ["skirt", "pollera"], ["dress", "vestido"], ["trousers", "pantalón"], ["shoes", "zapatos"], ["jacket", "campera"], ["jeans", "jeans"], ["coat", "abrigo"], ["sweater", "suéter"], ["socks", "medias"]],
    "Hotel y viaje": [["hotel", "hotel"], ["room", "habitación"], ["reception", "recepción"], ["lift", "ascensor"], ["pool", "piscina"], ["view", "vista"], ["luggage", "equipaje"], ["passport", "pasaporte"], ["flight", "vuelo"], ["airport", "aeropuerto"]],
    "Trabajos": [["waiter", "mozo"], ["waitress", "moza"], ["receptionist", "recepcionista"], ["tour guide", "guía"], ["doctor", "médico"], ["nurse", "enfermero/a"], ["teacher", "profesor/a"], ["journalist", "periodista"], ["cook", "cocinero/a"], ["pilot", "piloto"]],
    "Tiempo libre": [["football", "fútbol"], ["tennis", "tenis"], ["swimming", "natación"], ["cinema", "cine"], ["music", "música"], ["dancing", "baile"], ["reading", "lectura"], ["cooking", "cocina"], ["shopping", "compras"], ["travelling", "viajar"]],
    "Verbos comunes": [["be", "ser / estar"], ["have", "tener"], ["go", "ir"], ["like", "gustar"], ["live", "vivir"], ["work", "trabajar"], ["eat", "comer"], ["drink", "beber"], ["want", "querer"], ["speak", "hablar"]],
  };
  const MEM_NAMES = Object.keys(MEM_THEMES);

  function memory(mount) {
    stop();
    let theme = MEM_NAMES[0];
    mount.innerHTML = `
      <div class="tool">
        <div class="field">
          <label>Tema</label>
          <select class="input" id="mTheme">${MEM_NAMES.map(n => `<option>${n}</option>`).join("")}</select>
        </div>
        <div class="game-bar">
          <span class="game-stat">Movimientos: <b id="mMoves">0</b></span>
          <span class="game-stat">Parejas: <b id="mPairs">0/6</b></span>
          <button class="btn" id="mNew">${ICON.refresh} Nuevo juego</button>
        </div>
        <div class="mem-grid" id="mGrid"></div>
        <div id="mDone"></div>
      </div>
      <p class="muted" style="font-size:12.5px">Encontrá las 6 parejas: una carta en inglés y su traducción en español.</p>`;

    const grid = mount.querySelector("#mGrid");
    const elMoves = mount.querySelector("#mMoves");
    const elPairs = mount.querySelector("#mPairs");
    const done = mount.querySelector("#mDone");

    function start() {
      const pairs = shuffle(MEM_THEMES[theme]).slice(0, 6);
      let cards = [];
      pairs.forEach((p, i) => { cards.push({ id: i, txt: p[0] }); cards.push({ id: i, txt: p[1] }); });
      cards = shuffle(cards);
      let first = null, lock = false, moves = 0, matched = 0;
      done.innerHTML = "";
      elMoves.textContent = "0";
      elPairs.textContent = "0/6";
      grid.innerHTML = cards.map((c, i) => `<button class="mem-card" data-i="${i}" data-id="${c.id}">${esc(c.txt)}</button>`).join("");

      grid.querySelectorAll(".mem-card").forEach(card => {
        card.addEventListener("click", () => {
          if (lock || card.classList.contains("up") || card.classList.contains("matched")) return;
          card.classList.add("up");
          if (!first) { first = card; return; }
          moves++; elMoves.textContent = moves;
          if (first.dataset.id === card.dataset.id) {
            first.classList.add("matched"); card.classList.add("matched");
            first = null; matched++; elPairs.textContent = matched + "/6";
            if (matched === 6) done.innerHTML = `<div class="quiz-feedback ok show" style="margin-top:14px">${ICON.check} <strong>¡Ganaste!</strong> Completaste el tablero en ${moves} movimientos.</div>`;
          } else {
            lock = true;
            const a = first, b = card; first = null;
            setTimeout(() => { a.classList.remove("up"); b.classList.remove("up"); lock = false; }, 750);
          }
        });
      });
    }

    mount.querySelector("#mTheme").addEventListener("change", e => { theme = e.target.value; start(); });
    mount.querySelector("#mNew").addEventListener("click", start);
    start();
  }

  /* =========================================================
     2) CONTRARRELOJ — quiz con tiempo (60 s)
     ========================================================= */
  function speed(mount) {
    stop();
    const ALL = [];
    (window.APP_DATA && window.APP_DATA.units || []).forEach(u => u.quiz.forEach(q => ALL.push(q)));
    let pool = shuffle(ALL), idx = 0, score = 0, best = 0, timeLeft = 60, running = false, ended = false;

    mount.innerHTML = `
      <div class="tool">
        <div class="game-bar">
          <span class="game-stat timer" id="spTimer">⏱ <b>60</b>s</span>
          <span class="game-stat">Aciertos: <b id="spScore">0</b></span>
          <button class="btn btn--primary" id="spStart">Empezar</button>
        </div>
        <div id="spArea"><p class="muted">Respondé la mayor cantidad de preguntas en 60 segundos. ¡Tocá «Empezar»!</p></div>
      </div>`;

    const area = mount.querySelector("#spArea");
    const elTimer = mount.querySelector("#spTimer");
    const elScore = mount.querySelector("#spScore");
    const elStart = mount.querySelector("#spStart");

    function paint() {
      if (ended) return;
      const q = pool[idx % pool.length]; // el módulo reusa preguntas si se agotan
      area.innerHTML = `
        <div class="card">
          <div class="quiz-question">${q.q}</div>
          <div class="quiz-options" id="spOpts">
            ${q.opts.map((o, k) => `<button class="quiz-opt" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${o}</span></button>`).join("")}
          </div>
        </div>`;
      area.querySelector("#spOpts").addEventListener("click", e => {
        const b = e.target.closest(".quiz-opt"); if (!b) return;
        const k = +b.dataset.k;
        const opts = area.querySelectorAll(".quiz-opt");
        opts.forEach(el => el.disabled = true);
        opts[q.a].classList.add("correct");
        if (k === q.a) { score++; elScore.textContent = score; }
        else b.classList.add("wrong");
        idx++;
        setTimeout(() => { if (!ended) paint(); }, 420);
      });
    }

    function tick() {
      timeLeft--;
      elTimer.innerHTML = `⏱ <b>${timeLeft}</b>s`;
      elTimer.classList.toggle("low", timeLeft <= 10);
      if (timeLeft <= 0) end();
    }

    function end() {
      stop(); ended = true; running = false;
      if (score > best) best = score;
      elStart.textContent = "Jugar de nuevo";
      elStart.disabled = false;
      area.innerHTML = `
        <div class="card center">
          <div class="quiz-score-ring">${score}</div>
          <p class="lead">¡Tiempo! Acertaste <strong>${score}</strong> respuestas.</p>
          <p class="muted">${score >= 12 ? "¡Excelente velocidad!" : score >= 6 ? "¡Muy bien! Seguí practicando." : "Repasá las unidades y reintentá."}</p>
        </div>`;
    }

    function startGame() {
      if (running) return;
      stop(); ended = false; running = true;
      idx = 0; score = 0; timeLeft = 60;
      pool = shuffle(ALL);
      elScore.textContent = "0";
      elTimer.innerHTML = `⏱ <b>60</b>s`; elTimer.classList.remove("low");
      elStart.disabled = true; elStart.textContent = "Jugando…";
      paint();
      activeTimer = setInterval(tick, 1000);
    }

    elStart.addEventListener("click", startGame);
  }

  /* =========================================================
     3) ORDENÁ LA ORACIÓN
     ========================================================= */
  const SENTENCES = [
    { en: "I am from Argentina.", es: "Soy de Argentina." },
    { en: "Where are you from?", es: "¿De dónde sos?" },
    { en: "What is your name?", es: "¿Cómo te llamás?" },
    { en: "She is a tour guide.", es: "Ella es guía de turismo." },
    { en: "They are not English.", es: "Ellos no son ingleses." },
    { en: "How old are you?", es: "¿Cuántos años tenés?" },
    { en: "Nice to meet you.", es: "Encantado de conocerte." },
    { en: "This is my sister.", es: "Esta es mi hermana." },
    { en: "How much is it?", es: "¿Cuánto cuesta?" },
    { en: "Can I have a coffee?", es: "¿Me da un café?" },
    { en: "Her husband is Italian.", es: "Su esposo es italiano." },
    { en: "It is a small red car.", es: "Es un auto rojo pequeño." },
    { en: "We are not from Spain.", es: "No somos de España." },
    { en: "My name is Rob Walker.", es: "Mi nombre es Rob Walker." },
    { en: "I have a reservation.", es: "Tengo una reserva." },
    { en: "What time is it?", es: "¿Qué hora es?" },
    { en: "I would like a single room.", es: "Quisiera una habitación simple." },
    { en: "Is breakfast included?", es: "¿El desayuno está incluido?" },
    { en: "Can you help me, please?", es: "¿Puede ayudarme, por favor?" },
    { en: "He works in a hotel.", es: "Él trabaja en un hotel." },
    { en: "She does not like coffee.", es: "A ella no le gusta el café." },
    { en: "Do you speak English?", es: "¿Hablás inglés?" },
    { en: "I love travelling.", es: "Me encanta viajar." },
    { en: "They are waiting at the airport.", es: "Están esperando en el aeropuerto." },
    { en: "What are you doing?", es: "¿Qué estás haciendo?" },
    { en: "There is a lift in the hotel.", es: "Hay un ascensor en el hotel." },
    { en: "There are two restaurants here.", es: "Hay dos restaurantes acá." },
    { en: "The key is on the table.", es: "La llave está sobre la mesa." },
    { en: "I was at home yesterday.", es: "Estuve en casa ayer." },
    { en: "Can I pay by card?", es: "¿Puedo pagar con tarjeta?" },
    { en: "Where is the station?", es: "¿Dónde está la estación?" },
    { en: "We usually get up early.", es: "Normalmente nos levantamos temprano." },
  ];

  function sentence(mount) {
    stop();
    const BEST_KEY = "estudioIng.sentence.best";
    const ROUND = 8;
    let level = "all";
    let queue = [], idx = 0, points = 0, streak = 0, words = [], picked = [], locked = false, roundActive = false;
    let R = {};

    const bestGet = () => { try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; } };
    const bestSet = v => { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) { /* noop */ } };
    const wcount = s => s.en.replace(/[.?!,]/g, "").split(" ").length;
    function pool() {
      const p = SENTENCES.filter(s => level === "easy" ? wcount(s) <= 5 : level === "hard" ? wcount(s) >= 7 : true);
      return p.length >= 4 ? p : SENTENCES.slice();
    }

    mount.innerHTML = `
      <div class="tool" id="sbTool">
        <div class="seg" id="sbLevel">
          <button data-l="easy">Fácil</button>
          <button data-l="all" class="active">Todas</button>
          <button data-l="hard">Difícil</button>
        </div>
        <div class="game-bar">
          <span class="game-stat">Puntos: <b id="sbPts">0</b></span>
          <span class="game-stat">Racha: <b id="sbStreak">0</b></span>
          <span class="game-stat">Oración: <b id="sbPos">1/${ROUND}</b></span>
          <span class="game-stat">Récord: <b id="sbBest">${bestGet()}</b></span>
        </div>
        <div class="sb-roundbar"><span id="sbRound" style="width:0%"></span></div>
        <div class="sb-hint-big" id="sbHint"></div>
        <div class="sb-answer" id="sbAnswer"></div>
        <div class="sb-bank" id="sbBank"></div>
        <div class="btn-row">
          <button class="btn" id="sbHintBtn">Ver respuesta (pierde racha)</button>
          <button class="btn" id="sbClear">Borrar</button>
        </div>
        <div class="sb-result" id="sbResult"></div>
      </div>`;

    R = {
      lvl: mount.querySelector("#sbLevel"), pts: mount.querySelector("#sbPts"), streak: mount.querySelector("#sbStreak"),
      pos: mount.querySelector("#sbPos"), best: mount.querySelector("#sbBest"), round: mount.querySelector("#sbRound"),
      hint: mount.querySelector("#sbHint"), ans: mount.querySelector("#sbAnswer"), bank: mount.querySelector("#sbBank"),
      res: mount.querySelector("#sbResult"), hintBtn: mount.querySelector("#sbHintBtn"), clear: mount.querySelector("#sbClear"),
    };

    function startRound() {
      const p = pool();
      queue = shuffle(p).slice(0, Math.min(ROUND, p.length));
      idx = 0; points = 0; streak = 0; roundActive = true;
      R.pts.textContent = "0"; R.streak.textContent = "0";
      load();
    }

    function load() {
      const s = queue[idx];
      words = s.en.replace(/[.?!]/g, "").split(" ");
      picked = []; locked = false;
      R.res.innerHTML = "";
      R.hint.innerHTML = `<span class="muted">Traducí:</span> ${esc(s.es)}`;
      R.pos.textContent = (idx + 1) + "/" + queue.length;
      R.round.style.width = Math.round(idx / queue.length * 100) + "%";
      renderBank();
      renderAnswer();
    }

    function renderBank() {
      const bank = shuffle(words.map((w, i) => ({ w, i })));
      R.bank.innerHTML = bank.map(b => `<button class="sb-word" data-i="${b.i}">${esc(b.w)}</button>`).join("");
      R.bank.querySelectorAll(".sb-word").forEach(b => b.addEventListener("click", () => {
        if (locked) return;
        b.style.display = "none";
        picked.push(+b.dataset.i);
        renderAnswer();
        if (picked.length === words.length) tryCheck();
      }));
    }

    function renderAnswer(marks) {
      R.ans.innerHTML = picked.map((wi, k) => {
        const cls = marks ? (marks[k] ? " ok" : " wrong") : "";
        return `<button class="sb-word${cls}" data-k="${k}">${esc(words[wi])}</button>`;
      }).join("");
      R.ans.querySelectorAll(".sb-word").forEach(b => b.addEventListener("click", () => {
        if (locked) return;
        const k = +b.dataset.k, wi = picked[k];
        picked.splice(k, 1);
        const orig = R.bank.querySelector(`.sb-word[data-i="${wi}"]`);
        if (orig) orig.style.display = "";
        renderAnswer();
      }));
    }

    function tryCheck() {
      const correct = words.join(" ");
      const attempt = picked.map(i => words[i]).join(" ");
      if (attempt === correct) {
        locked = true;
        const mult = Math.min(5, streak + 1);
        const gained = 10 * mult;
        points += gained; streak += 1;
        R.pts.textContent = points;
        R.streak.textContent = streak + (mult > 1 ? " (×" + mult + ")" : "");
        renderAnswer(words.map(() => true));
        R.res.innerHTML = `<div class="quiz-feedback ok show">${ICON.check} <strong>¡Correcto!</strong> <span class="sb-points sb-pop">+${gained}</span> &nbsp;<em>${esc(queue[idx].en)}</em></div>`;
        setTimeout(() => { if (!roundActive) return; idx++; if (idx >= queue.length) finishRound(); else load(); }, 850);
      } else {
        const marks = picked.map((wi, k) => words[wi] === words[k]);
        renderAnswer(marks);
        R.ans.classList.remove("shake"); void R.ans.offsetWidth; R.ans.classList.add("shake");
        streak = 0; R.streak.textContent = "0";
        R.res.innerHTML = `<div class="quiz-feedback no show">${ICON.cross} <strong>Casi…</strong> Reordená (o sacá) las palabras marcadas en rojo.</div>`;
      }
    }

    function revealHint() {
      if (locked) return;
      streak = 0; R.streak.textContent = "0";
      R.res.innerHTML = `<div class="quiz-feedback show" style="background:var(--warn-soft);border:1px solid var(--warn)"><strong>Respuesta:</strong> <em>${esc(queue[idx].en)}</em></div>`;
    }

    function finishRound() {
      roundActive = false;
      const best = bestGet();
      const isBest = points > best;
      if (isBest) bestSet(points);
      mount.querySelector("#sbTool").innerHTML = `
        <div class="center">
          <div class="quiz-score-ring">${points}</div>
          <p class="lead">¡Ronda completa!</p>
          <p class="muted">${isBest ? "¡Nuevo récord!" : "Tu récord: " + Math.max(best, points) + " pts"}</p>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary" id="sbAgain">${ICON.refresh} Jugar otra ronda</button>
          </div>
        </div>`;
      mount.querySelector("#sbAgain").addEventListener("click", () => sentence(mount));
    }

    R.lvl.addEventListener("click", e => {
      const b = e.target.closest("button[data-l]"); if (!b) return;
      level = b.dataset.l;
      R.lvl.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      startRound();
    });
    R.hintBtn.addEventListener("click", revealHint);
    R.clear.addEventListener("click", () => { if (!locked) load(); });
    startRound();
  }

  /* =========================================================
     4) AHORCADO
     ========================================================= */
  const HM_WORDS = [
    { w: "MONDAY", cat: "Día", hint: "lunes" },
    { w: "WEDNESDAY", cat: "Día", hint: "miércoles" },
    { w: "SATURDAY", cat: "Día", hint: "sábado" },
    { w: "JANUARY", cat: "Mes", hint: "enero" },
    { w: "AUGUST", cat: "Mes", hint: "agosto" },
    { w: "SPAIN", cat: "País", hint: "España" },
    { w: "FRANCE", cat: "País", hint: "Francia" },
    { w: "FRENCH", cat: "Nacionalidad", hint: "francés" },
    { w: "JAPANESE", cat: "Nacionalidad", hint: "japonés" },
    { w: "UMBRELLA", cat: "Objeto", hint: "paraguas" },
    { w: "POSTCARD", cat: "Souvenir", hint: "postal" },
    { w: "CAMERA", cat: "Objeto", hint: "cámara" },
    { w: "SISTER", cat: "Familia", hint: "hermana" },
    { w: "DAUGHTER", cat: "Familia", hint: "hija" },
    { w: "HUSBAND", cat: "Familia", hint: "esposo" },
    { w: "BROTHER", cat: "Familia", hint: "hermano" },
    { w: "PARENTS", cat: "Familia", hint: "padres" },
    { w: "NINETEEN", cat: "Número", hint: "19" },
    { w: "THIRTEEN", cat: "Número", hint: "13" },
    { w: "YELLOW", cat: "Color", hint: "amarillo" },
    { w: "ORANGE", cat: "Color", hint: "naranja" },
    { w: "RECEPTION", cat: "Hotel", hint: "recepción" },
    { w: "PASSPORT", cat: "Viaje", hint: "pasaporte" },
    { w: "AIRPORT", cat: "Viaje", hint: "aeropuerto" },
    { w: "LUGGAGE", cat: "Viaje", hint: "equipaje" },
    { w: "FLIGHT", cat: "Viaje", hint: "vuelo" },
    { w: "BREAKFAST", cat: "Comida", hint: "desayuno" },
    { w: "CHICKEN", cat: "Comida", hint: "pollo" },
    { w: "WAITER", cat: "Trabajo", hint: "mozo" },
    { w: "DOCTOR", cat: "Trabajo", hint: "médico" },
    { w: "TEACHER", cat: "Trabajo", hint: "profesor/a" },
    { w: "TROUSERS", cat: "Ropa", hint: "pantalón" },
    { w: "JACKET", cat: "Ropa", hint: "campera" },
    { w: "SWIMMING", cat: "Tiempo libre", hint: "natación" },
    { w: "CINEMA", cat: "Tiempo libre", hint: "cine" },
    { w: "WEATHER", cat: "General", hint: "clima/tiempo" },
    { w: "STATION", cat: "Lugar", hint: "estación" },
    { w: "RESTAURANT", cat: "Lugar", hint: "restaurante" },
  ];
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const MAX_LIVES = 7;

  function hangman(mount) {
    stop();
    let order = shuffle(HM_WORDS.map((_, i) => i)), pos = 0, score = 0;

    mount.innerHTML = `
      <div class="tool">
        <div class="game-bar">
          <span class="game-stat" id="hmCat"></span>
          <span class="game-stat">Vidas: <b class="hm-lives" id="hmLives"></b></span>
          <span class="game-stat">Aciertos: <b id="hmScore">0</b></span>
        </div>
        <p class="muted" id="hmHint" style="text-align:center"></p>
        <div class="hm-word" id="hmWord"></div>
        <div class="hm-keys" id="hmKeys"></div>
        <div id="hmMsg"></div>
        <div class="btn-row" style="justify-content:center"><button class="btn" id="hmNext">Otra palabra →</button></div>
      </div>`;

    const elCat = mount.querySelector("#hmCat");
    const elLives = mount.querySelector("#hmLives");
    const elScore = mount.querySelector("#hmScore");
    const elHint = mount.querySelector("#hmHint");
    const elWord = mount.querySelector("#hmWord");
    const elKeys = mount.querySelector("#hmKeys");
    const elMsg = mount.querySelector("#hmMsg");

    let target = "", guessed = new Set(), lives = MAX_LIVES, over = false;

    function load() {
      const item = HM_WORDS[order[pos]];
      target = item.w; guessed = new Set(); lives = MAX_LIVES; over = false;
      elCat.textContent = "Categoría: " + item.cat;
      elHint.innerHTML = `Pista: <em>${esc(item.hint)}</em>`;
      elMsg.innerHTML = "";
      elKeys.innerHTML = ALPHABET.map(l => `<button data-l="${l}">${l}</button>`).join("");
      elKeys.querySelectorAll("button").forEach(b => b.addEventListener("click", () => guess(b.dataset.l, b)));
      renderWord(); renderLives();
    }
    function renderWord() {
      elWord.innerHTML = target.split("").map(ch => {
        if (ch === " ") return `<span class="hm-letter space"></span>`;
        const show = guessed.has(ch) || over;
        const cls = "hm-letter" + (over && !guessed.has(ch) ? "" : (won() ? " win" : ""));
        return `<span class="${cls}">${show ? ch : ""}</span>`;
      }).join("");
    }
    function renderLives() { elLives.textContent = "♥".repeat(lives) + "·".repeat(MAX_LIVES - lives); }
    function won() { return target.split("").every(ch => ch === " " || guessed.has(ch)); }

    function guess(letter, btn) {
      if (over || guessed.has(letter)) return;
      guessed.add(letter);
      if (target.includes(letter)) { btn.classList.add("good"); btn.disabled = true; }
      else { btn.classList.add("bad"); btn.disabled = true; lives--; renderLives(); }
      if (won()) {
        over = true; score++; elScore.textContent = score;
        elMsg.innerHTML = `<div class="quiz-feedback ok show">${ICON.check} <strong>¡Bien!</strong> La palabra era <strong>${target}</strong>.</div>`;
        elKeys.querySelectorAll("button").forEach(b => b.disabled = true);
      } else if (lives <= 0) {
        over = true;
        elMsg.innerHTML = `<div class="quiz-feedback no show">${ICON.cross} <strong>¡Te quedaste sin vidas!</strong> Era <strong>${target}</strong>.</div>`;
        elKeys.querySelectorAll("button").forEach(b => b.disabled = true);
      }
      renderWord();
    }
    function next() { pos = (pos + 1) % HM_WORDS.length; if (pos === 0) order = shuffle(order); load(); }

    mount.querySelector("#hmNext").addEventListener("click", next);
    load();
  }

  /* =========================================================
     5) ¿CUÁL SOBRA? (odd one out)
     ========================================================= */
  const ODD_PUZZLES = [
    { items: ["Monday", "Tuesday", "March", "Friday"], odd: 2, why: "March es un mes; el resto son días." },
    { items: ["red", "blue", "green", "dog"], odd: 3, why: "dog es un animal; el resto son colores." },
    { items: ["mother", "father", "sister", "teacher"], odd: 3, why: "teacher es un trabajo; el resto son familia." },
    { items: ["coffee", "tea", "water", "bread"], odd: 3, why: "bread es comida; el resto son bebidas." },
    { items: ["one", "two", "three", "blue"], odd: 3, why: "blue es un color; el resto son números." },
    { items: ["Spain", "France", "Italy", "Spanish"], odd: 3, why: "Spanish es nacionalidad; el resto son países." },
    { items: ["shirt", "skirt", "shoes", "table"], odd: 3, why: "table es un mueble; el resto es ropa." },
    { items: ["waiter", "receptionist", "tour guide", "breakfast"], odd: 3, why: "breakfast es comida; el resto son trabajos." },
    { items: ["big", "small", "fast", "apple"], odd: 3, why: "apple es comida; el resto son adjetivos." },
    { items: ["swim", "run", "dance", "chair"], odd: 3, why: "chair es un objeto; el resto son actividades." },
    { items: ["hotel", "reception", "lift", "daughter"], odd: 3, why: "daughter es familia; el resto es del hotel." },
    { items: ["January", "June", "August", "Monday"], odd: 3, why: "Monday es un día; el resto son meses." },
    { items: ["he", "she", "it", "my"], odd: 3, why: "my es posesivo; el resto son pronombres sujeto." },
    { items: ["my", "your", "his", "me"], odd: 3, why: "me es pronombre objeto; el resto son posesivos." },
    { items: ["apple", "banana", "orange", "pasta"], odd: 3, why: "pasta no es una fruta." },
    { items: ["pen", "book", "bag", "run"], odd: 3, why: "run es un verbo; el resto son objetos." },
    { items: ["is", "are", "am", "do"], odd: 3, why: "do no es parte del verbo be." },
    { items: ["mother", "aunt", "uncle", "doctor"], odd: 3, why: "doctor es un trabajo; el resto es familia." },
  ];

  function oddone(mount) {
    stop();
    let order = shuffle(ODD_PUZZLES.map((_, i) => i)), pos = 0, score = 0, answered = false, shown = [];
    mount.innerHTML = `
      <div class="tool">
        <div class="game-bar">
          <span class="game-stat">Ronda: <b id="odPos">1/${ODD_PUZZLES.length}</b></span>
          <span class="game-stat">Aciertos: <b id="odScore">0</b></span>
        </div>
        <p class="muted">Tocá la palabra que <strong>no pertenece</strong> al grupo.</p>
        <div class="quiz-options" id="odOpts"></div>
        <div id="odFb"></div>
        <div class="btn-row" style="justify-content:flex-end"><button class="btn btn--primary" id="odNext">Siguiente →</button></div>
      </div>`;
    const opts = mount.querySelector("#odOpts");
    const fb = mount.querySelector("#odFb");
    const posEl = mount.querySelector("#odPos");
    const scoreEl = mount.querySelector("#odScore");

    function load() {
      answered = false; fb.innerHTML = "";
      const p = ODD_PUZZLES[order[pos]];
      posEl.textContent = (pos + 1) + "/" + ODD_PUZZLES.length;
      shown = shuffle(p.items.map((w, i) => ({ w, isOdd: i === p.odd })));
      opts.innerHTML = shown.map((o, k) => `<button class="quiz-opt" data-k="${k}"><span class="opt-letter">${String.fromCharCode(65 + k)}</span><span>${esc(o.w)}</span></button>`).join("");
    }
    opts.addEventListener("click", e => {
      const b = e.target.closest(".quiz-opt"); if (!b || answered) return;
      answered = true;
      const k = +b.dataset.k;
      const p = ODD_PUZZLES[order[pos]];
      opts.querySelectorAll(".quiz-opt").forEach((el, idx) => { el.disabled = true; if (shown[idx].isOdd) el.classList.add("correct"); else if (idx === k) el.classList.add("wrong"); });
      if (shown[k].isOdd) { score++; scoreEl.textContent = score; fb.innerHTML = `<div class="quiz-feedback ok show">${ICON.check} <strong>¡Correcto!</strong> ${esc(p.why)}</div>`; }
      else fb.innerHTML = `<div class="quiz-feedback no show">${ICON.cross} <strong>No.</strong> ${esc(p.why)}</div>`;
    });
    mount.querySelector("#odNext").addEventListener("click", () => { pos = (pos + 1) % ODD_PUZZLES.length; if (pos === 0) order = shuffle(order); load(); });
    load();
  }

  /* =========================================================
     6) VERDADERO O FALSO
     ========================================================= */
  const TF = [
    { q: "El plural de «city» es «cities».", a: true, exp: "Consonante + y → -ies." },
    { q: "«He don't like coffee» es correcto.", a: false, exp: "Con he/she/it: He doesn't like." },
    { q: "«an umbrella» es correcto.", a: true, exp: "umbrella empieza con sonido vocálico → an." },
    { q: "«Monday» significa martes.", a: false, exp: "Monday = lunes." },
    { q: "«How much is it?» pregunta el precio.", a: true, exp: "Sí, pregunta cuánto cuesta." },
    { q: "El pasado de «is» es «was».", a: true, exp: "is → was." },
    { q: "«I am» se contrae como «I'm».", a: true, exp: "Correcto." },
    { q: "«twenty» significa 12.", a: false, exp: "twenty = 20; twelve = 12." },
    { q: "Después de «can» se usa «to» (I can to swim).", a: false, exp: "can + verbo base, sin to." },
    { q: "«like» va seguido de verbo-ing (I like swimming).", a: true, exp: "like / love / hate + -ing." },
    { q: "«their» y «there» significan lo mismo.", a: false, exp: "their = posesivo; there = ahí." },
    { q: "«waiter» significa mozo.", a: true, exp: "Correcto." },
    { q: "El plural de «child» es «childs».", a: false, exp: "child → children (irregular)." },
    { q: "«breakfast» significa desayuno.", a: true, exp: "Correcto." },
    { q: "«She is never late» es correcto.", a: true, exp: "never va después del verbo be." },
    { q: "«Do you live here?» se responde «Yes, I do».", a: true, exp: "Con el auxiliar do: Yes, I do." },
    { q: "El present continuous es be + verbo-ing.", a: true, exp: "am / is / are + -ing." },
    { q: "Los adjetivos llevan plural: «reds cars».", a: false, exp: "No tienen plural: red cars." },
    { q: "«Where are you from?» pregunta de dónde sos.", a: true, exp: "Correcto." },
    { q: "«thirteen» significa 30.", a: false, exp: "thirteen = 13; thirty = 30." },
  ];

  function truefalse(mount) {
    stop();
    let order = shuffle(TF.map((_, i) => i)), pos = 0, score = 0, streak = 0, answered = false;
    mount.innerHTML = `
      <div class="tool">
        <div class="game-bar">
          <span class="game-stat">Afirmación: <b id="tfPos">1/${TF.length}</b></span>
          <span class="game-stat">Aciertos: <b id="tfScore">0</b></span>
          <span class="game-stat">Racha: <b id="tfStreak">0</b></span>
        </div>
        <div class="card" style="text-align:center"><div class="quiz-question" id="tfQ" style="margin:8px 0"></div></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn--primary" id="tfTrue">${ICON.check} Verdadero</button>
          <button class="btn" id="tfFalse" style="background:linear-gradient(135deg,var(--bad),#b91c1c);color:#fff;border:none">${ICON.cross} Falso</button>
        </div>
        <div id="tfFb"></div>
        <div class="btn-row" style="justify-content:flex-end"><button class="btn" id="tfNext">Siguiente →</button></div>
      </div>`;
    const qEl = mount.querySelector("#tfQ");
    const fb = mount.querySelector("#tfFb");
    const posEl = mount.querySelector("#tfPos");
    const scoreEl = mount.querySelector("#tfScore");
    const streakEl = mount.querySelector("#tfStreak");

    function load() { answered = false; fb.innerHTML = ""; const t = TF[order[pos]]; qEl.textContent = t.q; posEl.textContent = (pos + 1) + "/" + TF.length; }
    function answer(val) {
      if (answered) return; answered = true;
      const t = TF[order[pos]]; const ok = (val === t.a);
      if (ok) { score++; streak++; } else streak = 0;
      scoreEl.textContent = score; streakEl.textContent = streak;
      fb.innerHTML = `<div class="quiz-feedback ${ok ? "ok" : "no"} show">${ok ? ICON.check : ICON.cross} <strong>${ok ? "¡Correcto!" : "Incorrecto."}</strong> Es <strong>${t.a ? "Verdadero" : "Falso"}</strong>. ${esc(t.exp)}</div>`;
    }
    mount.querySelector("#tfTrue").addEventListener("click", () => answer(true));
    mount.querySelector("#tfFalse").addEventListener("click", () => answer(false));
    mount.querySelector("#tfNext").addEventListener("click", () => { pos = (pos + 1) % TF.length; if (pos === 0) order = shuffle(order); load(); });
    load();
  }

  /* ---------- Export ---------- */
  window.Games = { memory, speed, sentence, hangman, oddone, truefalse, _stop: stop };
})();
