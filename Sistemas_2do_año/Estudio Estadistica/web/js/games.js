/* ============================================================
   Juegos — Estadística
   - clasificar: clasificá cada variable (cualitativa/cuantitativa).
   - medida:     adiviná la media, mediana, moda o rango.
   - vof:        verdadero o falso sobre conceptos.
   Se registran en window.Games[id](mount).
   ============================================================ */
(function () {
  "use strict";
  window.Games = window.Games || {};
  window.Games.stopAll = function () {}; // estos juegos no usan temporizadores globales

  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // Motor genérico de juego tipo "pregunta + opciones"
  function run(mount, pool, n) {
    const qs = shuffle(pool).slice(0, n || pool.length);
    let i = 0, score = 0;
    function paint() {
      if (i >= qs.length) {
        const pct = Math.round((score / qs.length) * 100);
        mount.innerHTML = `
          <div class="callout ${pct >= 60 ? "" : "warn"}" style="text-align:center;">
            <strong class="callout__tag">Resultado</strong>
            Acertaste <b>${score}</b> de <b>${qs.length}</b> (${pct}%).
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
      if (window.MathJaxRender) window.MathJaxRender(mount);
    }
    function choose(idx, btn) {
      const qd = qs[i];
      mount.querySelectorAll("#gOpts button").forEach((b) => (b.disabled = true));
      const ok = idx === qd.a;
      if (ok) score++;
      btn.style.borderColor = ok ? "var(--ok, #16a34a)" : "var(--bad, #dc2626)";
      const correct = mount.querySelectorAll("#gOpts button")[qd.a];
      if (correct) correct.style.borderColor = "var(--ok, #16a34a)";
      mount.querySelector("#gFb").innerHTML = `
        <div class="callout ${ok ? "tip" : "warn"}" style="margin-top:12px;">
          <strong class="callout__tag">${ok ? "¡Correcto!" : "Casi"}</strong> ${qd.exp || ""}
        </div>
        <button class="btn btn--primary" id="gNext" style="margin-top:12px;">${i + 1 < qs.length ? "Siguiente" : "Ver resultado"}</button>`;
      mount.querySelector("#gNext").addEventListener("click", () => { i++; paint(); });
      if (window.MathJaxRender) window.MathJaxRender(mount);
    }
    paint();
  }

  /* ---------- Clasificá la variable ---------- */
  const TIPOS = ["Cualitativa nominal", "Cualitativa ordinal", "Cuantitativa discreta", "Cuantitativa continua"];
  const CLASIFICAR = [
    ["Color preferido de auto", 0], ["Sexo", 0], ["Marca de celular", 0], ["Estado civil", 0],
    ["Nivel de satisfacción (malo / regular / bueno)", 1], ["Puesto en una carrera (1.º, 2.º, 3.º)", 1], ["Grado militar", 1],
    ["Número de hermanos", 2], ["Cantidad de mascotas", 2], ["Cantidad de aulas de una escuela", 2],
    ["Altura de una persona (cm)", 3], ["Peso de un paquete (kg)", 3], ["Tiempo en correr 100 m (s)", 3],
  ].map(([v, a]) => ({ q: `¿Qué tipo de variable es:<br><b>${v}</b>?`, opts: TIPOS, a, exp: `Es <b>${TIPOS[a]}</b>.` }));

  /* ---------- Adiviná la medida ---------- */
  const MEDIDA = [
    { q: "Media de <b>4, 6, 11</b>", opts: ["6", "7", "8", "21"], a: 1, exp: "(4+6+11)/3 = 7." },
    { q: "Mediana de <b>3, 5, 7, 9</b>", opts: ["5", "6", "7", "8"], a: 1, exp: "Promedio de los centrales: (5+7)/2 = 6." },
    { q: "Moda de <b>2, 3, 3, 5, 7</b>", opts: ["2", "3", "5", "no tiene"], a: 1, exp: "El 3 es el más frecuente." },
    { q: "Media de <b>10, 20, 30</b>", opts: ["15", "20", "25", "60"], a: 1, exp: "(10+20+30)/3 = 20." },
    { q: "Rango de <b>2, 9, 15, 4</b>", opts: ["9", "11", "13", "15"], a: 2, exp: "15 − 2 = 13." },
    { q: "Mediana de <b>1, 4, 9, 16, 25</b>", opts: ["4", "9", "11", "16"], a: 1, exp: "El valor central (n impar) es 9." },
    { q: "Moda de <b>5, 5, 6, 7, 7, 7</b>", opts: ["5", "6", "7", "no tiene"], a: 2, exp: "El 7 aparece 3 veces." },
    { q: "Media de <b>2, 4, 6, 8</b>", opts: ["4", "5", "6", "20"], a: 1, exp: "(2+4+6+8)/4 = 5." },
  ];

  /* ---------- Verdadero o Falso ---------- */
  const VF = ["Verdadero", "Falso"];
  const VOF = [
    ["La media es sensible a los valores atípicos.", 0],
    ["La mediana es el valor que más se repite.", 1, "Ese es la <b>moda</b>; la mediana es el valor central."],
    ["En una muestra, la varianza se divide por n−1.", 0],
    ["La moda sirve también para variables cualitativas.", 0],
    ["El desvío estándar queda en unidades al cuadrado.", 1, "La <b>varianza</b> está al cuadrado; el desvío vuelve a las unidades originales."],
    ["El segundo cuartil Q₂ coincide con la mediana.", 0],
    ["La frecuencia relativa se calcula como fᵢ · n.", 1, "Es <b>fᵢ / n</b> (una proporción)."],
    ["El histograma usa barras separadas.", 1, "Usa barras <b>contiguas</b>; las separadas son para variable discreta/cualitativa."],
    ["El coeficiente de variación permite comparar dispersiones de grupos con medias distintas.", 0],
  ].map(([q, a, exp]) => ({ q, opts: VF, a, exp: exp || (a === 0 ? "Es verdadero." : "Es falso.") }));

  window.Games["clasificar"] = (m) => run(m, CLASIFICAR, 8);
  window.Games["medida"] = (m) => run(m, MEDIDA, MEDIDA.length);
  window.Games["vof"] = (m) => run(m, VOF, VOF.length);
})();
