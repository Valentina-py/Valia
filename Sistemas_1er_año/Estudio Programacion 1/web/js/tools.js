/* ============================================================
   HERRAMIENTAS INTERACTIVAS
   window.Tools[id](mountEl):
     consola  · Consola de C (intérprete + paso a paso)
     pseint   · De PSeInt a C
     ascii    · Tabla ASCII interactiva
     bases    · Conversor de bases
     vectores · Simulador de vectores
     tipos    · Explorador de tipos de datos
   ============================================================ */
(function () {
  "use strict";
  const CE = window.CEngine;
  const esc = CE.escapeHtml;
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  function hl(root) { root.querySelectorAll("pre.code").forEach(p => { if (!p.dataset.hl) { p.innerHTML = CE.highlight(p.textContent); p.dataset.hl = "1"; } }); }

  // registro de timers para poder cancelarlos al cambiar de ruta
  const timers = new Set();
  function every(fn, ms) { const id = setInterval(fn, ms); timers.add(id); return id; }
  function stopTimer(id) { clearInterval(id); timers.delete(id); }
  function stopAll() { timers.forEach(id => clearInterval(id)); timers.clear(); }

  /* =====================================================================
     1) CONSOLA DE C
     ===================================================================== */
  const EXAMPLES = [
    {
      name: "Hola mundo", stdin: "",
      code: `#include <stdio.h>

int main() {
    printf("Hola mundo\\n");
    return 0;
}`
    },
    {
      name: "Suma de 2 números", stdin: "3 4",
      code: `#include <stdio.h>

int main() {
    int a, b;
    printf("Ingrese dos numeros: ");
    scanf("%i %i", &a, &b);
    printf("La suma es %i\\n", a + b);
    return 0;
}`
    },
    {
      name: "Tabla del 5", stdin: "",
      code: `#include <stdio.h>

int main() {
    int i;
    for (i = 1; i <= 10; i++)
        printf("5 x %i = %i\\n", i, 5 * i);
    return 0;
}`
    },
    {
      name: "¿Es primo?", stdin: "13",
      code: `#include <stdio.h>

int main() {
    int n, i, esPrimo = 1;
    printf("Numero: ");
    scanf("%i", &n);
    if (n < 2) esPrimo = 0;
    for (i = 2; i < n; i++)
        if (n % i == 0) esPrimo = 0;
    if (esPrimo) printf("%i es primo\\n", n);
    else         printf("%i no es primo\\n", n);
    return 0;
}`
    },
    {
      name: "Dígitos primos", stdin: "14583",
      code: `#include <stdio.h>

int main() {
    int n, d, cant = 0;
    printf("Numero: ");
    scanf("%i", &n);
    while (n > 0) {
        d = n % 10;
        if (d==2 || d==3 || d==5 || d==7) cant++;
        n = n / 10;
    }
    printf("Digitos primos: %i\\n", cant);
    return 0;
}`
    },
    {
      name: "Promedio de un vector", stdin: "5 10 20 30 40 50",
      code: `#include <stdio.h>
#define tam 50

int main() {
    int v[tam], n, i, suma = 0;
    printf("Cantidad: ");
    scanf("%i", &n);
    for (i = 0; i < n; i++) {
        printf("v[%i]: ", i);
        scanf("%i", &v[i]);
    }
    for (i = 0; i < n; i++) suma += v[i];
    printf("Promedio: %.2f\\n", (float)suma / n);
    return 0;
}`
    },
    {
      name: "Función (módulo)", stdin: "",
      code: `#include <stdio.h>

int suma(int a, int b) {
    return a + b;
}

int main() {
    printf("20 + 22 = %i\\n", suma(20, 22));
    return 0;
}`
    },
    {
      name: "Cadenas (string.h)", stdin: "",
      code: `#include <stdio.h>
#include <string.h>

int main() {
    char s[40];
    strcpy(s, "Programacion");
    printf("Cadena: %s\\n", s);
    printf("Longitud: %i\\n", strlen(s));
    return 0;
}`
    },
  ];

  function consola(mount) {
    const ui = h(`<div class="tool">
      <label>Ejemplos para cargar</label>
      <div class="example-pills" id="ex"></div>
      <label style="margin-top:14px">Tu programa en C</label>
      <div class="editor-wrap">
        <textarea class="editor" id="code" spellcheck="false"></textarea>
      </div>
      <label style="margin-top:12px">Entrada (lo que se "teclea" para <code>scanf</code>/<code>gets</code>) — opcional</label>
      <textarea class="input input--mono" id="stdin" rows="2" placeholder="Ej: 3 4" spellcheck="false"></textarea>
      <div class="console-toolbar">
        <button class="btn btn--primary" id="run">▶ Ejecutar</button>
        <button class="btn" id="step">Paso a paso</button>
        <button class="btn btn--ghost" id="clear">Limpiar salida</button>
        <span class="spacer"></span>
        <span class="muted" id="meta" style="font-size:12px"></span>
      </div>
      <label>Salida (consola)</label>
      <div class="term" id="out">—</div>
      <div id="trace"></div>
    </div>`);
    mount.appendChild(ui);
    const $ = s => ui.querySelector(s);
    const codeEl = $("#code"), stdinEl = $("#stdin"), outEl = $("#out"), traceEl = $("#trace"), metaEl = $("#meta");

    // pills de ejemplos
    EXAMPLES.forEach((ex, i) => {
      const b = h(`<button>${esc(ex.name)}</button>`);
      b.addEventListener("click", () => { codeEl.value = ex.code; stdinEl.value = ex.stdin; outEl.textContent = "—"; traceEl.innerHTML = ""; metaEl.textContent = ""; });
      $("#ex").appendChild(b);
    });
    codeEl.value = EXAMPLES[0].code;

    // Tab inserta 4 espacios
    codeEl.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = codeEl.selectionStart, en = codeEl.selectionEnd;
        codeEl.value = codeEl.value.slice(0, s) + "    " + codeEl.value.slice(en);
        codeEl.selectionStart = codeEl.selectionEnd = s + 4;
      }
    });

    function renderOutput(res) {
      let html = "";
      if (res.output) html += esc(res.output);
      if (res.error) html += `<span class="term__err">${html ? "\n" : ""}✖ Error${res.errorLine ? " (línea " + res.errorLine + ")" : ""}: ${esc(res.error)}</span>`;
      if (!res.output && !res.error) html += "(el programa no produjo salida)";
      outEl.innerHTML = html;
      metaEl.textContent = `${res.steps} pasos ejecutados`;
    }

    $("#run").addEventListener("click", () => {
      traceEl.innerHTML = "";
      const res = CE.run(codeEl.value, stdinEl.value);
      renderOutput(res);
    });
    $("#clear").addEventListener("click", () => { outEl.textContent = "—"; traceEl.innerHTML = ""; metaEl.textContent = ""; });

    $("#step").addEventListener("click", () => {
      const res = CE.run(codeEl.value, stdinEl.value);
      renderOutput(res);
      const tr = res.trace || [];
      if (!tr.length) { traceEl.innerHTML = `<div class="callout warn" style="margin-top:14px">No hay pasos para mostrar (el programa no asignó variables).</div>`; return; }
      let idx = 0;
      const panel = h(`<div class="card" style="margin-top:16px">
        <div class="trace-controls">
          <button class="btn" id="tFirst">⏮</button>
          <button class="btn" id="tPrev">◀ Anterior</button>
          <button class="btn" id="tNext">Siguiente ▶</button>
          <button class="btn" id="tLast">⏭</button>
          <span class="trace-step-info" id="tInfo"></span>
        </div>
        <div class="trace-vars" id="tVars"></div>
        <label style="margin-top:10px">Salida hasta este paso</label>
        <div class="term" id="tOut" style="min-height:30px"></div>
        ${res.traceFull ? `<div class="muted" style="font-size:12px;margin-top:6px">Traza recortada a los primeros pasos.</div>` : ""}
      </div>`);
      traceEl.innerHTML = ""; traceEl.appendChild(panel);
      const tInfo = panel.querySelector("#tInfo"), tVars = panel.querySelector("#tVars"), tOut = panel.querySelector("#tOut");
      function paint() {
        const s = tr[idx], prev = idx > 0 ? tr[idx - 1] : { vars: {} };
        tInfo.textContent = `Paso ${idx + 1} de ${tr.length}` + (s.line ? ` · línea ${s.line}` : "");
        const keys = Object.keys(s.vars);
        tVars.innerHTML = keys.length ? keys.map(k => {
          const changed = prev.vars[k] !== s.vars[k];
          return `<div class="trace-var ${changed ? "changed" : ""}"><small>${esc(k)}</small><b>${esc(String(s.vars[k]))}</b></div>`;
        }).join("") : `<span class="muted">sin variables aún</span>`;
        tOut.textContent = s.out || "(sin salida aún)";
      }
      panel.querySelector("#tFirst").addEventListener("click", () => { idx = 0; paint(); });
      panel.querySelector("#tPrev").addEventListener("click", () => { idx = Math.max(0, idx - 1); paint(); });
      panel.querySelector("#tNext").addEventListener("click", () => { idx = Math.min(tr.length - 1, idx + 1); paint(); });
      panel.querySelector("#tLast").addEventListener("click", () => { idx = tr.length - 1; paint(); });
      paint();
    });
  }

  /* =====================================================================
     2) DE PSeInt A C
     ===================================================================== */
  const PSEINT = [
    {
      key: "sec", name: "Secuencial",
      ps: `Proceso ejemplo
   Definir x Como Entero
   Escribir "Ingrese x:"
   Leer x
   Escribir "Hola, x vale ", x
FinProceso`,
      c: `#include <stdio.h>
int main() {
    int x;
    printf("Ingrese x:\\n");
    scanf("%i", &x);
    printf("Hola, x vale %i\\n", x);
    return 0;
}`
    },
    {
      key: "if", name: "Decisión (Si/Sino)",
      ps: `Si (x > 0) Entonces
   Escribir "x es positivo"
Sino
   Escribir "x no es positivo"
FinSi`,
      c: `if (x > 0) {
    printf("x es positivo\\n");
} else {
    printf("x no es positivo\\n");
}`
    },
    {
      key: "switch", name: "Decisión múltiple",
      ps: `Segun i Hacer
   1: Escribir "i = 1"
   2: Escribir "i = 2"
   3: Escribir "i = 3"
   De Otro Modo:
      Escribir "i > 3"
FinSegun`,
      c: `switch (i) {
    case 1: printf("i = 1\\n"); break;
    case 2: printf("i = 2\\n"); break;
    case 3: printf("i = 3\\n"); break;
    default: printf("i > 3\\n");
}`
    },
    {
      key: "for", name: "Repetir (Para)",
      ps: `Para i Desde 1 Hasta 5 Con Paso 1 Hacer
   Escribir "Ingrese numero:"
   Leer num
   suma <- suma + num
FinPara`,
      c: `for (i = 1; i <= 5; i++) {
    printf("Ingrese numero:\\n");
    scanf("%i", &num);
    suma = suma + num;
}`
    },
    {
      key: "while", name: "Repetir (Mientras)",
      ps: `Mientras (n > 0) Hacer
   digito <- n MOD 10
   n <- trunc(n / 10)
   suma <- suma + digito
FinMientras`,
      c: `while (n > 0) {
    digito = n % 10;
    n = n / 10;
    suma = suma + digito;
}`
    },
  ];

  function pseint(mount) {
    const ui = h(`<div class="tool">
      <p class="muted" style="margin-top:0">Elegí una estructura y compará el <strong>diagrama de PSeInt</strong> con su equivalente en <strong>lenguaje C</strong>.</p>
      <div class="pseint-tabs" id="tabs"></div>
      <div class="pseint-cols">
        <div class="pseint-col"><h4>PSeInt (pseudocódigo)</h4><pre class="code" id="ps" data-hl="1"></pre></div>
        <div class="pseint-col"><h4>Lenguaje C</h4><pre class="code" id="c"></pre></div>
      </div>
    </div>`);
    mount.appendChild(ui);
    const tabs = ui.querySelector("#tabs"), psEl = ui.querySelector("#ps"), cEl = ui.querySelector("#c");
    function show(i) {
      tabs.querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === i));
      psEl.textContent = PSEINT[i].ps;
      cEl.textContent = PSEINT[i].c; cEl.dataset.hl = ""; cEl.innerHTML = CE.highlight(PSEINT[i].c); cEl.dataset.hl = "1";
    }
    PSEINT.forEach((p, i) => { const b = h(`<button>${esc(p.name)}</button>`); b.addEventListener("click", () => show(i)); tabs.appendChild(b); });
    show(0);
  }

  /* =====================================================================
     3) TABLA ASCII
     ===================================================================== */
  function ascii(mount) {
    const ui = h(`<div class="tool">
      <label>Escribí un carácter o un número (0–127)</label>
      <input class="input input--mono" id="q" placeholder="Ej: A   o   65" maxlength="3" />
      <div class="result-box empty" id="info">Escribí algo para ver su código…</div>
      <label style="margin-top:16px">Tabla de caracteres imprimibles (32–126)</label>
      <div class="ascii-grid" id="grid"></div>
      <p class="muted" style="font-size:12.5px">Los códigos 0–31 son de control (no imprimibles). El 65 es <code>'A'</code>, el 97 <code>'a'</code>, el 48 <code>'0'</code>, el 32 es el espacio.</p>
    </div>`);
    mount.appendChild(ui);
    const grid = ui.querySelector("#grid"), info = ui.querySelector("#info"), q = ui.querySelector("#q");
    const cells = {};
    for (let code = 32; code <= 126; code++) {
      const ch = code === 32 ? "␣" : String.fromCharCode(code);
      const cell = h(`<div class="ascii-cell" data-code="${code}"><div class="ascii-cell__char">${esc(ch)}</div><div class="ascii-cell__code">${code}</div></div>`);
      cell.addEventListener("click", () => showInfo(code));
      cells[code] = cell; grid.appendChild(cell);
    }
    function showInfo(code) {
      Object.values(cells).forEach(c => c.classList.remove("hl"));
      if (cells[code]) { cells[code].classList.add("hl"); if (cells[code].scrollIntoView) cells[code].scrollIntoView({ block: "nearest" }); }
      const ch = (code === 32) ? "(espacio)" : (code >= 32 && code <= 126 ? String.fromCharCode(code) : "(no imprimible)");
      info.className = "result-box";
      info.innerHTML = `<strong style="font-size:20px;font-family:var(--mono)">'${esc(ch)}'</strong> &nbsp;→&nbsp;
        decimal <b>${code}</b> · binario <b>${code.toString(2).padStart(8, "0")}</b> · hex <b>0x${code.toString(16).toUpperCase()}</b>`;
    }
    q.addEventListener("input", () => {
      const v = q.value.trim();
      if (!v) { info.className = "result-box empty"; info.textContent = "Escribí algo para ver su código…"; Object.values(cells).forEach(c => c.classList.remove("hl")); return; }
      if (/^[0-9]+$/.test(v)) showInfo(parseInt(v, 10));
      else showInfo(v.charCodeAt(0));
    });
  }

  /* =====================================================================
     4) CONVERSOR DE BASES
     ===================================================================== */
  function bases(mount) {
    const ui = h(`<div class="tool">
      <div class="field-row">
        <div class="field"><label>Número</label><input class="input input--mono" id="n" value="42" /></div>
        <div class="field"><label>Base de entrada</label>
          <select class="input" id="base">
            <option value="10">Decimal (10)</option>
            <option value="2">Binario (2)</option>
            <option value="8">Octal (8)</option>
            <option value="16">Hexadecimal (16)</option>
          </select>
        </div>
      </div>
      <div class="bases-grid" id="outs"></div>
      <div class="error-text" id="err"></div>
      <div class="callout" style="margin-top:18px"><strong class="callout__tag">¿Cómo se pasa a binario?</strong>
        Se divide el número por 2 sucesivamente; los <strong>restos</strong>, leídos de abajo hacia arriba, forman el binario. Ej: 42 → 101010.</div>
    </div>`);
    mount.appendChild(ui);
    const nEl = ui.querySelector("#n"), baseEl = ui.querySelector("#base"), outs = ui.querySelector("#outs"), err = ui.querySelector("#err");
    function calc() {
      const base = parseInt(baseEl.value, 10);
      const raw = nEl.value.trim().toLowerCase();
      const re = base === 2 ? /^[01]+$/ : base === 8 ? /^[0-7]+$/ : base === 16 ? /^[0-9a-f]+$/ : /^[0-9]+$/;
      if (!raw || !re.test(raw)) { err.textContent = "No es un número válido en base " + base; outs.innerHTML = ""; return; }
      err.textContent = "";
      const dec = parseInt(raw, base);
      const data = [["Decimal", dec.toString(10)], ["Binario", dec.toString(2)], ["Octal", dec.toString(8)], ["Hexadecimal", dec.toString(16).toUpperCase()]];
      outs.innerHTML = data.map(([k, v]) => `<div class="base-out"><div class="base-out__label">${k}</div><div class="base-out__val">${v}</div></div>`).join("");
    }
    nEl.addEventListener("input", calc); baseEl.addEventListener("change", () => { nEl.value = ""; outs.innerHTML = ""; nEl.focus(); });
    calc();
  }

  /* =====================================================================
     5) SIMULADOR DE VECTORES
     ===================================================================== */
  function vectores(mount) {
    const ui = h(`<div class="tool">
      <label>Valores del vector (separados por coma)</label>
      <input class="input input--mono" id="vals" value="8, -90, 5, 23, 7, 42" />
      <div class="btn-row">
        <button class="btn btn--primary" id="recorrer">Recorrer</button>
        <button class="btn" id="sumar">Sumar</button>
        <button class="btn" id="mayor">Mayor</button>
        <button class="btn" id="menor">Menor</button>
        <button class="btn" id="invertir">Invertir</button>
        <button class="btn btn--ghost" id="stop">⏹ Detener</button>
      </div>
      <div class="field" style="max-width:220px"><label>Buscar un valor</label>
        <div style="display:flex;gap:8px"><input class="input input--mono" id="needle" placeholder="Ej: 5" /><button class="btn" id="buscar">Buscar</button></div>
      </div>
      <div class="vec-view" id="view"></div>
      <div class="vec-log" id="log">Cargá valores y elegí una operación.</div>
    </div>`);
    mount.appendChild(ui);
    const $ = s => ui.querySelector(s);
    const view = $("#view"), log = $("#log");
    let v = [], cells = [], anim = null;
    function parse() {
      v = $("#vals").value.split(",").map(s => parseInt(s.trim(), 10)).filter(x => !isNaN(x)).slice(0, 30);
      render();
    }
    function render(active = -1) {
      view.innerHTML = "";
      cells = v.map((x, i) => {
        const c = h(`<div class="vec-cell"><div class="vec-cell__box ${i === active ? "active" : ""}">${x}</div><div class="vec-cell__idx">[${i}]</div></div>`);
        view.appendChild(c); return c.querySelector(".vec-cell__box");
      });
    }
    function clearActive() { cells.forEach(c => c.classList.remove("active")); }
    function stop() { if (anim) { stopTimer(anim); anim = null; } clearActive(); }
    function animate(steps, done) {
      stop(); let i = 0;
      anim = every(() => {
        if (i >= steps.length) { stopTimer(anim); anim = null; if (done) done(); return; }
        clearActive(); steps[i](); i++;
      }, 650);
    }

    $("#vals").addEventListener("change", parse);
    $("#stop").addEventListener("click", stop);
    $("#recorrer").addEventListener("click", () => {
      parse(); const steps = v.map((x, i) => () => { cells[i].classList.add("active"); log.textContent = `v[${i}] = ${x}`; });
      animate(steps, () => { log.textContent = `Recorrido completo: ${v.length} elementos.`; });
    });
    $("#sumar").addEventListener("click", () => {
      parse(); let s = 0; const steps = v.map((x, i) => () => { cells[i].classList.add("active"); s += x; log.textContent = `suma += v[${i}] (${x})  →  suma = ${s}`; });
      animate(steps, () => { log.textContent = `Suma total = ${v.reduce((a, b) => a + b, 0)} · Promedio = ${(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2)}`; });
    });
    $("#mayor").addEventListener("click", () => {
      parse(); if (!v.length) return; let may = v[0], pos = 0;
      const steps = v.map((x, i) => () => { cells[i].classList.add("active"); if (x > may) { may = x; pos = i; } log.textContent = `Comparando v[${i}]=${x} · mayor hasta ahora = ${may}`; });
      animate(steps, () => { render(pos); log.textContent = `El mayor es ${may} en la posición ${pos}.`; });
    });
    $("#menor").addEventListener("click", () => {
      parse(); if (!v.length) return; let men = v[0], pos = 0;
      const steps = v.map((x, i) => () => { cells[i].classList.add("active"); if (x < men) { men = x; pos = i; } log.textContent = `Comparando v[${i}]=${x} · menor hasta ahora = ${men}`; });
      animate(steps, () => { render(pos); log.textContent = `El menor es ${men} en la posición ${pos}.`; });
    });
    $("#invertir").addEventListener("click", () => {
      parse(); const n = v.length; const pairs = [];
      for (let i = 0; i < Math.floor(n / 2); i++) pairs.push(i);
      const steps = pairs.map(i => () => {
        const aux = v[i]; v[i] = v[n - 1 - i]; v[n - 1 - i] = aux; render();
        cells[i].classList.add("active"); cells[n - 1 - i].classList.add("active");
        log.textContent = `Intercambio v[${i}] ↔ v[${n - 1 - i}]`;
      });
      animate(steps, () => { render(); log.textContent = `Vector invertido: [${v.join(", ")}]`; });
    });
    $("#buscar").addEventListener("click", () => {
      parse(); const x = parseInt($("#needle").value, 10);
      if (isNaN(x)) { log.textContent = "Ingresá un valor a buscar."; return; }
      let found = -1;
      const steps = []; for (let i = 0; i < v.length; i++) {
        steps.push(() => { cells[i].classList.add("active"); if (v[i] === x && found < 0) found = i; log.textContent = `¿v[${i}]==${x}? ${v[i] === x ? "¡Sí!" : "no"}`; });
        if (v[i] === x) break;
      }
      animate(steps, () => { log.textContent = found >= 0 ? `Encontrado en la posición ${found}.` : `${x} no está en el vector.`; });
    });
    parse();
  }

  /* =====================================================================
     6) EXPLORADOR DE TIPOS
     ===================================================================== */
  const TYPES = [
    { name: "char", bytes: 1, fmt: "%c / %d", min: -128, max: 127, float: false },
    { name: "unsigned char", bytes: 1, fmt: "%c", min: 0, max: 255, float: false },
    { name: "short int", bytes: 2, fmt: "%d", min: -32768, max: 32767, float: false },
    { name: "unsigned short", bytes: 2, fmt: "%u", min: 0, max: 65535, float: false },
    { name: "int", bytes: 4, fmt: "%i / %d", min: -2147483648, max: 2147483647, float: false },
    { name: "unsigned int", bytes: 4, fmt: "%u", min: 0, max: 4294967295, float: false },
    { name: "float", bytes: 4, fmt: "%f", min: -3.4e38, max: 3.4e38, float: true },
    { name: "double", bytes: 8, fmt: "%lf", min: -1.7e308, max: 1.7e308, float: true },
  ];
  function tipos(mount) {
    const ui = h(`<div class="tool">
      <label>Escribí un valor: un número (42, -7, 3.5) o un carácter entre comillas ('A')</label>
      <input class="input input--mono" id="val" value="65" />
      <div id="charNote"></div>
      <p class="muted" id="kind" style="margin:10px 0 0"></p>
      <div class="types-result" id="res"></div>
    </div>`);
    mount.appendChild(ui);
    const val = ui.querySelector("#val"), res = ui.querySelector("#res"), kind = ui.querySelector("#kind"), charNote = ui.querySelector("#charNote");
    function calc() {
      let raw = val.value.trim(); let num = null; let isFloat = false; charNote.innerHTML = "";
      const cm = raw.match(/^'(.)'$/);
      if (cm) { num = cm[1].charCodeAt(0); charNote.innerHTML = `<div class="callout" style="margin:12px 0">El carácter <code>'${esc(cm[1])}'</code> se almacena como el número <b>${num}</b> (ASCII).</div>`; }
      else if (/^-?\d+$/.test(raw)) { num = parseInt(raw, 10); }
      else if (/^-?\d*\.\d+$/.test(raw)) { num = parseFloat(raw); isFloat = true; }
      else { kind.textContent = "Ingresá un número o un carácter entre comillas."; res.innerHTML = ""; return; }
      kind.innerHTML = isFloat ? "Valor <b>real</b> → necesita <code>float</code> o <code>double</code>." : `Valor <b>entero</b> (${num}).`;
      res.innerHTML = TYPES.map(t => {
        let fits;
        if (isFloat) fits = t.float && num >= t.min && num <= t.max;
        else fits = num >= t.min && num <= t.max && (!t.float || true);
        return `<div class="type-pill ${fits ? "fits" : "nofit"}">
          <div class="type-pill__name">${t.name} ${fits ? "✓" : "✕"}</div>
          <div class="type-pill__meta">${t.bytes} byte${t.bytes > 1 ? "s" : ""} · formato ${esc(t.fmt)}</div>
        </div>`;
      }).join("");
    }
    val.addEventListener("input", calc);
    calc();
  }

  window.Tools = { consola, pseint, ascii, bases, vectores, tipos, stopAll, _hl: hl };
})();
