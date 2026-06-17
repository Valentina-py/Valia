/* ============================================================
   HERRAMIENTA — Visualizador de ordenamiento
   Anima paso a paso los métodos de la burbuja, selección e
   inserción, marcando comparaciones (amarillo), intercambios
   (rojo) y elementos ya ordenados (verde).
   ============================================================ */
(function () {
  "use strict";

  function randArray(n) {
    const a = [];
    for (let i = 0; i < n; i++) a.push(Math.floor(Math.random() * 90) + 8);
    return a;
  }

  /* ---- generadores de "frames" (cada paso de la animación) ---- */
  function genBubble(src) {
    const frames = [], arr = src.slice(), n = arr.length, sorted = new Set();
    let comps = 0, swaps = 0;
    const snap = (extra) => frames.push(Object.assign({ arr: arr.slice(), sorted: [...sorted], comps, swaps }, extra));
    snap({ msg: "Inicio" });
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        comps++; snap({ cmp: [j, j + 1], msg: `Comparo ${arr[j]} y ${arr[j + 1]}` });
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; swaps++;
          snap({ swap: [j, j + 1], msg: `Intercambio (${arr[j + 1]} > ${arr[j]})` });
        }
      }
      sorted.add(n - 1 - i);
    }
    sorted.add(0);
    snap({ msg: "¡Vector ordenado!", done: true });
    return frames;
  }

  function genSelection(src) {
    const frames = [], arr = src.slice(), n = arr.length, sorted = new Set();
    let comps = 0, swaps = 0;
    const snap = (extra) => frames.push(Object.assign({ arr: arr.slice(), sorted: [...sorted], comps, swaps }, extra));
    snap({ msg: "Inicio" });
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        comps++; snap({ cmp: [min, j], pivot: i, msg: `Busco el menor: comparo ${arr[j]} con ${arr[min]}` });
        if (arr[j] < arr[min]) min = j;
      }
      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]]; swaps++;
        snap({ swap: [i, min], msg: `El menor es ${arr[i]}, va a la posición ${i}` });
      }
      sorted.add(i);
    }
    sorted.add(n - 1);
    snap({ msg: "¡Vector ordenado!", done: true });
    return frames;
  }

  function genInsertion(src) {
    const frames = [], arr = src.slice(), n = arr.length, sorted = new Set([0]);
    let comps = 0, swaps = 0;
    const snap = (extra) => frames.push(Object.assign({ arr: arr.slice(), sorted: [...sorted], comps, swaps }, extra));
    snap({ msg: "Inicio (el primero ya está 'ordenado')" });
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      snap({ cmp: [i], msg: `Tomo ${key} para insertarlo` });
      while (j >= 0 && arr[j] > key) {
        comps++;
        arr[j + 1] = arr[j]; swaps++;
        snap({ swap: [j, j + 1], msg: `${arr[j]} > ${key}: lo corro a la derecha` });
        j--;
      }
      arr[j + 1] = key;
      for (let k = 0; k <= i; k++) sorted.add(k);
      snap({ msg: `Inserto ${key} en su lugar` });
    }
    snap({ msg: "¡Vector ordenado!", done: true });
    return frames;
  }

  const GENS = { burbuja: genBubble, seleccion: genSelection, insercion: genInsertion };
  const NAMES = { burbuja: "Burbuja", seleccion: "Selección", insercion: "Inserción" };

  function build(container) {
    let data = randArray(10);
    let frames = [], idx = 0, timer = null, speed = 420;
    let algo = "burbuja";

    container.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field">
            <label>Método de ordenamiento</label>
            <select class="input" id="so-algo">
              <option value="burbuja">Burbuja (Bubble sort)</option>
              <option value="seleccion">Selección (Selection sort)</option>
              <option value="insercion">Inserción (Insertion sort)</option>
            </select>
          </div>
          <div class="field">
            <label>Velocidad</label>
            <input type="range" id="so-speed" min="60" max="800" value="420" step="20" style="width:100%" />
          </div>
        </div>
        <div class="sort-counters">
          <span class="game-hud__item"><span class="game-hud__label">Comparaciones</span><span class="game-hud__val" id="so-comps">0</span></span>
          <span class="game-hud__item"><span class="game-hud__label">Intercambios</span><span class="game-hud__val" id="so-swaps">0</span></span>
          <span class="game-hud__item"><span class="game-hud__label">Paso</span><span class="game-hud__val" id="so-step">0 / 0</span></span>
        </div>
        <div class="sort-status" id="so-status">Tocá «Ordenar» para ver la animación.</div>
        <div class="sort-stage" id="so-stage"></div>
        <div class="btn-row">
          <button class="btn" id="so-shuffle">🎲 Mezclar</button>
          <button class="btn btn--primary" id="so-play">▶ Ordenar</button>
          <button class="btn" id="so-step-btn">Paso ›</button>
          <button class="btn" id="so-reset">↺ Reiniciar</button>
        </div>
      </div>`;

    const stage = container.querySelector("#so-stage");
    const status = container.querySelector("#so-status");
    const playBtn = container.querySelector("#so-play");
    const compsEl = container.querySelector("#so-comps");
    const swapsEl = container.querySelector("#so-swaps");
    const stepEl = container.querySelector("#so-step");

    const maxVal = 100;

    function stop() { if (timer) { clearInterval(timer); timer = null; } playBtn.textContent = "▶ Ordenar"; }

    function regen() {
      stop();
      frames = GENS[algo](data);
      idx = 0;
      paint();
    }

    function paint() {
      const fr = frames[idx] || { arr: data, sorted: [], comps: 0, swaps: 0, msg: "" };
      const cmp = fr.cmp || [], sw = fr.swap || [], sorted = new Set(fr.sorted || []);
      stage.innerHTML = fr.arr.map((v, i) => {
        let cls = "sort-bar";
        if (fr.done) cls += " done";
        else if (sw.includes(i)) cls += " swap";
        else if (cmp.includes(i)) cls += " cmp";
        else if (sorted.has(i)) cls += " done";
        const h = Math.round((v / maxVal) * 100);
        return `<div class="${cls}" style="height:${h}%">${v}</div>`;
      }).join("");
      compsEl.textContent = fr.comps || 0;
      swapsEl.textContent = fr.swaps || 0;
      stepEl.textContent = `${idx} / ${frames.length - 1}`;
      status.textContent = fr.msg || "";
    }

    function stepNext() {
      if (idx < frames.length - 1) { idx++; paint(); return true; }
      stop(); return false;
    }

    function play() {
      if (timer) { stop(); return; }
      if (idx >= frames.length - 1) { idx = 0; }
      playBtn.textContent = "⏸ Pausar";
      timer = setInterval(() => {
        if (!document.body.contains(stage)) { stop(); return; } // se navegó a otra página
        if (!stepNext()) stop();
      }, speed);
    }

    container.querySelector("#so-algo").addEventListener("change", e => { algo = e.target.value; regen(); });
    container.querySelector("#so-speed").addEventListener("input", e => {
      speed = 860 - +e.target.value; // invertir: a la derecha = más rápido
      if (timer) { stop(); play(); }
    });
    container.querySelector("#so-shuffle").addEventListener("click", () => { data = randArray(10); regen(); });
    playBtn.addEventListener("click", play);
    container.querySelector("#so-step-btn").addEventListener("click", () => { stop(); stepNext(); });
    container.querySelector("#so-reset").addEventListener("click", () => { stop(); idx = 0; paint(); });

    regen();
  }

  window.Tools = window.Tools || {};
  window.Tools.sorting = build;
})();
