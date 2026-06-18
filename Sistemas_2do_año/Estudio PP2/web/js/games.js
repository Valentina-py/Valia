/* ============================================================
   Juegos — PP2 (desarrollo web)
   - etiquetas: elegí la etiqueta HTML correcta.
   - css:       elegí la propiedad CSS que logra el efecto.
   - vof:       verdadero o falso sobre HTML/CSS/JS.
   ============================================================ */
(function () {
  "use strict";
  window.Games = window.Games || {};
  window.Games.stopAll = function () {};

  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function run(mount, pool, n) {
    const qs = shuffle(pool).slice(0, n || pool.length);
    let i = 0, score = 0;
    function paint() {
      if (i >= qs.length) {
        const pct = Math.round((score / qs.length) * 100);
        mount.innerHTML = `
          <div class="callout ${pct >= 60 ? "" : "warn"}" style="text-align:center;">
            <strong class="callout__tag">Resultado</strong> Acertaste <b>${score}</b> de <b>${qs.length}</b> (${pct}%).
          </div>
          <button class="btn btn--primary" id="gReplay" style="margin-top:14px;">Jugar de nuevo</button>`;
        mount.querySelector("#gReplay").addEventListener("click", () => run(mount, pool, n));
        return;
      }
      const qd = qs[i];
      mount.innerHTML = `
        <div style="color:var(--muted);font-size:.88rem;margin-bottom:8px;">Pregunta ${i + 1} de ${qs.length} · Aciertos: ${score}</div>
        <div class="formula-box" style="text-align:left;">${qd.q}</div>
        <div id="gOpts" style="display:grid;gap:10px;margin-top:14px;"></div>
        <div id="gFb"></div>`;
      const opts = mount.querySelector("#gOpts");
      qd.opts.forEach((opt, idx) => {
        const b = document.createElement("button");
        b.className = "btn"; b.style.textAlign = "left"; b.style.width = "100%";
        b.innerHTML = opt;
        b.addEventListener("click", () => choose(idx, b));
        opts.appendChild(b);
      });
    }
    function choose(idx, btn) {
      const qd = qs[i];
      mount.querySelectorAll("#gOpts button").forEach((b) => (b.disabled = true));
      const ok = idx === qd.a;
      if (ok) score++;
      btn.style.borderColor = ok ? "var(--ok,#16a34a)" : "var(--bad,#dc2626)";
      const correct = mount.querySelectorAll("#gOpts button")[qd.a];
      if (correct) correct.style.borderColor = "var(--ok,#16a34a)";
      mount.querySelector("#gFb").innerHTML = `
        <div class="callout ${ok ? "tip" : "warn"}" style="margin-top:12px;">
          <strong class="callout__tag">${ok ? "¡Correcto!" : "Casi"}</strong> ${qd.exp || ""}
        </div>
        <button class="btn btn--primary" id="gNext" style="margin-top:12px;">${i + 1 < qs.length ? "Siguiente" : "Ver resultado"}</button>`;
      mount.querySelector("#gNext").addEventListener("click", () => { i++; paint(); });
    }
    paint();
  }

  const T = ["&lt;a&gt;", "&lt;p&gt;", "&lt;div&gt;", "&lt;img&gt;", "&lt;h1&gt;", "&lt;ul&gt;", "&lt;table&gt;", "&lt;input&gt;", "&lt;link&gt;", "&lt;form&gt;"];
  const ETIQUETAS = [
    { q: "¿Qué etiqueta crea un <b>enlace</b> a otra página?", opts: [T[0], T[8], T[2], T[1]], a: 0, exp: "<code>&lt;a href=\"...\"&gt;</code> es el ancla (enlace)." },
    { q: "¿Qué etiqueta inserta una <b>imagen</b>?", opts: [T[4], T[3], T[2], T[0]], a: 1, exp: "<code>&lt;img src=\"...\"&gt;</code>." },
    { q: "¿Qué etiqueta es el <b>título principal</b>?", opts: [T[1], T[2], T[4], T[5]], a: 2, exp: "<code>&lt;h1&gt;</code> es el encabezado de mayor jerarquía." },
    { q: "¿Qué etiqueta crea una <b>lista no ordenada</b>?", opts: [T[5], T[6], T[1], T[9]], a: 0, exp: "<code>&lt;ul&gt;</code> con ítems <code>&lt;li&gt;</code>." },
    { q: "¿Qué etiqueta define un <b>párrafo</b>?", opts: [T[2], T[1], T[4], T[0]], a: 1, exp: "<code>&lt;p&gt;</code>." },
    { q: "¿Qué etiqueta crea una <b>tabla</b>?", opts: [T[5], T[6], T[2], T[9]], a: 1, exp: "<code>&lt;table&gt;</code> con <code>&lt;tr&gt;</code> y <code>&lt;td&gt;</code>." },
    { q: "¿Qué etiqueta es un <b>contenedor genérico</b> de bloque?", opts: [T[2], T[0], T[1], T[3]], a: 0, exp: "<code>&lt;div&gt;</code> agrupa contenido." },
    { q: "¿Qué etiqueta es un <b>campo de texto</b> de formulario?", opts: [T[9], T[7], T[1], T[2]], a: 1, exp: "<code>&lt;input type=\"text\"&gt;</code>." },
  ];

  const CSS = [
    { q: "¿Qué propiedad cambia el <b>color del texto</b>?", opts: ["<code>color</code>", "<code>background-color</code>", "<code>font-size</code>", "<code>text-align</code>"], a: 0, exp: "<code>color</code> define el color del texto." },
    { q: "¿Qué propiedad pone <b>color de fondo</b>?", opts: ["<code>color</code>", "<code>background-color</code>", "<code>border</code>", "<code>fill</code>"], a: 1, exp: "<code>background-color</code> (o <code>background</code>)." },
    { q: "¿Qué propiedad da <b>espacio interno</b> (entre el borde y el contenido)?", opts: ["<code>margin</code>", "<code>padding</code>", "<code>gap</code>", "<code>spacing</code>"], a: 1, exp: "<code>padding</code> es el relleno interno; <code>margin</code> es externo." },
    { q: "¿Qué propiedad da <b>espacio externo</b> (entre elementos)?", opts: ["<code>padding</code>", "<code>margin</code>", "<code>border</code>", "<code>inset</code>"], a: 1, exp: "<code>margin</code> separa el elemento de los demás." },
    { q: "¿Qué propiedad <b>redondea las esquinas</b>?", opts: ["<code>round</code>", "<code>corner</code>", "<code>border-radius</code>", "<code>radius</code>"], a: 2, exp: "<code>border-radius</code>." },
    { q: "¿Qué propiedad cambia el <b>tamaño de la fuente</b>?", opts: ["<code>font-size</code>", "<code>text-size</code>", "<code>font-weight</code>", "<code>scale</code>"], a: 0, exp: "<code>font-size</code>." },
    { q: "¿Qué propiedad agrega una <b>sombra</b> a una caja?", opts: ["<code>shadow</code>", "<code>box-shadow</code>", "<code>text-shadow</code>", "<code>drop</code>"], a: 1, exp: "<code>box-shadow</code> (para texto, <code>text-shadow</code>)." },
    { q: "¿Qué propiedad activa <b>Flexbox</b>?", opts: ["<code>position: flex</code>", "<code>display: flex</code>", "<code>float: flex</code>", "<code>flexbox: on</code>"], a: 1, exp: "<code>display: flex</code>." },
  ];

  const VF = ["Verdadero", "Falso"];
  const VOF = [
    ["HTML define la <b>estructura y el contenido</b> de la página.", 0],
    ["CSS se usa para <b>programar la lógica</b> de la página.", 1, "CSS es para <b>estilos</b>; la lógica la hace JavaScript."],
    ["Lo que está en <code>&lt;head&gt;</code> se muestra visible al usuario.", 1, "El <code>&lt;head&gt;</code> tiene metadatos; lo visible va en <code>&lt;body&gt;</code>."],
    ["Una hoja CSS externa se vincula con <code>&lt;link&gt;</code>.", 0],
    ["JavaScript se ejecuta en el <b>navegador</b> (lado cliente).", 0],
    ["Las <b>media queries</b> sirven para hacer el sitio responsive.", 0],
    ["<code>&lt;!DOCTYPE html&gt;</code> declara que el documento es HTML5.", 0],
    ["<code>margin</code> agrega espacio <b>dentro</b> del borde del elemento.", 1, "Eso es <code>padding</code>; <code>margin</code> es por fuera."],
    ["Los <b>elementos semánticos</b> (header, nav, main, footer) describen el significado del contenido.", 0],
  ].map(([q, a, exp]) => ({ q, opts: VF, a, exp: exp || (a === 0 ? "Es verdadero." : "Es falso.") }));

  window.Games["etiquetas"] = (m) => run(m, ETIQUETAS, ETIQUETAS.length);
  window.Games["css"] = (m) => run(m, CSS, CSS.length);
  window.Games["vof"] = (m) => run(m, VOF, VOF.length);
})();
