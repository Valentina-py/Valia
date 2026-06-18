/* ============================================================
   Herramientas interactivas — Estadística
   - medidas:    calculadora de media, mediana, moda, rango,
                 varianza, desvío estándar y coeficiente de variación.
   - frecuencias: genera la tabla de frecuencias (fi, hi, Fi, Hi, %).
   Ambas aceptan datos sueltos o agrupados (valor + frecuencia).
   Se registran en window.Tools[id](mount) — el app las invoca.
   ============================================================ */
(function () {
  "use strict";
  window.Tools = window.Tools || {};

  const ta = (id, ph) =>
    `<textarea id="${id}" rows="4" placeholder="${ph}"
       style="width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);
              background:var(--surface-2);color:var(--text);font-family:inherit;font-size:.95rem;resize:vertical;"></textarea>`;

  const chk = (id, txt) =>
    `<label style="display:flex;align-items:center;gap:7px;font-size:.9rem;color:var(--muted);cursor:pointer;">
       <input type="checkbox" id="${id}"> ${txt}</label>`;

  const nf = (x, d = 4) =>
    Number.isFinite(x) ? (Math.round(x * 10 ** d) / 10 ** d).toString().replace(".", ",") : "—";

  // Datos sueltos -> array de números
  function parseNums(t) {
    return (t.match(/-?\d+(?:[.,]\d+)?/g) || []).map((x) => parseFloat(x.replace(",", ".")));
  }
  // Agrupados -> pares [etiqueta, frecuencia] (una línea por valor)
  function parsePairs(t) {
    return t.split(/\n+/).map((l) => l.trim()).filter(Boolean).map((l) => {
      const p = l.split(/[\s,:;=]+/).filter(Boolean);
      if (p.length < 2) return null;
      const count = parseInt(p[p.length - 1], 10);
      const label = p.slice(0, -1).join(" ");
      return (label && Number.isFinite(count) && count > 0) ? [label, count] : null;
    }).filter(Boolean);
  }

  /* ===================== CALCULADORA DE MEDIDAS ===================== */
  window.Tools["medidas"] = function (mount) {
    mount.innerHTML = `
      <div class="field">
        <label>Datos</label>
        ${ta("mdIn", "Sueltos:  2, 9, 11, 5, 6, 10\n— o agrupados (con la casilla de abajo), una línea por valor:\n0  8\n1  10\n2  6")}
      </div>
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin:12px 0;">
        <button class="btn btn--primary" id="mdGo">Calcular</button>
        ${chk("mdGrp", "Datos agrupados (valor + frecuencia)")}
        ${chk("mdPob", "Tratar como población (÷ n)")}
      </div>
      <div id="mdOut"></div>`;
    const q = (s) => mount.querySelector(s);
    q("#mdGo").addEventListener("click", () => {
      const out = q("#mdOut");
      let data;
      if (q("#mdGrp").checked) {
        data = [];
        let total = 0;
        for (const [label, count] of parsePairs(q("#mdIn").value)) {
          const v = parseFloat(label.replace(",", "."));
          if (!Number.isFinite(v)) { out.innerHTML = `<div class="callout warn">En modo agrupado, el valor «${label}» no es un número.</div>`; return; }
          total += count;
          if (total > 500000) { out.innerHTML = `<div class="callout warn">Frecuencias demasiado grandes para procesar.</div>`; return; }
          for (let i = 0; i < count; i++) data.push(v);
        }
      } else {
        data = parseNums(q("#mdIn").value);
      }
      if (data.length < 1) { out.innerHTML = `<div class="callout warn">Ingresá al menos un dato.</div>`; return; }
      const n = data.length;
      const sum = data.reduce((a, b) => a + b, 0);
      const media = sum / n;
      const s = [...data].sort((a, b) => a - b);
      const mediana = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
      const fr = {}; s.forEach((x) => (fr[x] = (fr[x] || 0) + 1));
      const maxF = Math.max(...Object.values(fr));
      const modas = Object.keys(fr).filter((k) => fr[k] === maxF).map(Number);
      const modaTxt = maxF === 1 ? "sin moda (todos los valores son únicos)"
        : modas.map((x) => nf(x)).join(", ") + (modas.length > 1 ? " · multimodal" : "");
      const min = s[0], max = s[n - 1], rango = max - min;
      const pob = q("#mdPob").checked;
      const div = pob ? n : (n > 1 ? n - 1 : 1);
      const varianza = data.reduce((a, x) => a + (x - media) ** 2, 0) / div;
      const desvio = Math.sqrt(varianza);
      const cv = media !== 0 ? (desvio / Math.abs(media)) * 100 : NaN;
      out.innerHTML = `
        <div class="tbl-wrap"><table class="tbl tbl--left"><tbody>
          <tr><td>Cantidad de datos \\(n\\)</td><td><b>${n}</b></td></tr>
          <tr><td>Suma \\(\\sum x_i\\)</td><td>${nf(sum)}</td></tr>
          <tr><td>Media \\(\\bar{x}\\)</td><td><b>${nf(media)}</b></td></tr>
          <tr><td>Mediana \\(Me\\)</td><td><b>${nf(mediana)}</b></td></tr>
          <tr><td>Moda \\(Mo\\)</td><td>${modaTxt}</td></tr>
          <tr><td>Mínimo / Máximo</td><td>${nf(min)} / ${nf(max)}</td></tr>
          <tr><td>Rango \\(R\\)</td><td>${nf(rango)}</td></tr>
          <tr><td>Varianza ${pob ? "poblacional \\((\\div n)\\)" : "muestral \\((\\div\\, n-1)\\)"}</td><td>${nf(varianza)}</td></tr>
          <tr><td>Desvío estándar ${pob ? "\\(\\sigma\\)" : "\\(s\\)"}</td><td><b>${nf(desvio)}</b></td></tr>
          <tr><td>Coef. de variación \\(CV\\)</td><td>${Number.isFinite(cv) ? nf(cv) + " %" : "—"}</td></tr>
        </tbody></table></div>`;
      if (window.MathJaxRender) window.MathJaxRender(out);
    });
  };

  /* ===================== TABLA DE FRECUENCIAS ===================== */
  window.Tools["frecuencias"] = function (mount) {
    mount.innerHTML = `
      <div class="field">
        <label>Datos</label>
        ${ta("frIn", "Sueltos:  0,1,1,2,3,1,0,2,1,3\n— o agrupados (con la casilla de abajo), una línea por valor:\n0  8\n1  10\n2  6\nRojo  5\nAzul  3")}
      </div>
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin:12px 0;">
        <button class="btn btn--primary" id="frGo">Generar tabla</button>
        ${chk("frGrp", "Datos agrupados (valor + frecuencia)")}
      </div>
      <div id="frOut"></div>`;
    const q = (s) => mount.querySelector(s);
    q("#frGo").addEventListener("click", () => {
      const out = q("#frOut");
      const map = new Map();
      let numeric = true;
      if (q("#frGrp").checked) {
        const pairs = parsePairs(q("#frIn").value);
        if (!pairs.length) { out.innerHTML = `<div class="callout warn">Ingresá pares «valor frecuencia», uno por línea.</div>`; return; }
        for (const [label, count] of pairs) {
          map.set(label, (map.get(label) || 0) + count);
          if (!/^-?\d+(?:[.,]\d+)?$/.test(label)) numeric = false;
        }
      } else {
        const toks = (q("#frIn").value.match(/-?\d+(?:[.,]\d+)?|[A-Za-zÁÉÍÓÚÑáéíóúñ]+/g) || []);
        if (!toks.length) { out.innerHTML = `<div class="callout warn">Ingresá al menos un dato.</div>`; return; }
        toks.forEach((t) => map.set(t, (map.get(t) || 0) + 1));
        numeric = toks.every((t) => /^-?\d+(?:[.,]\d+)?$/.test(t));
      }
      const n = [...map.values()].reduce((a, b) => a + b, 0);
      let keys = [...map.keys()];
      if (numeric) keys.sort((a, b) => parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", ".")));
      else keys.sort();
      let Fac = 0, Hac = 0, rows = "";
      keys.forEach((k) => {
        const fi = map.get(k), hi = fi / n;
        Fac += fi; Hac += hi;
        rows += `<tr><td><b>${k}</b></td><td>${fi}</td><td>${nf(hi)}</td><td>${Fac}</td><td>${nf(Hac)}</td><td>${nf(hi * 100, 2)} %</td></tr>`;
      });
      out.innerHTML = `
        <div class="tbl-wrap"><table class="tbl tbl--left">
          <thead><tr>
            <th>\\(x_i\\)</th><th>\\(f_i\\)</th><th>\\(h_i\\)</th>
            <th>\\(F_i\\!\\uparrow\\)</th><th>\\(H_i\\!\\uparrow\\)</th><th>%</th>
          </tr></thead>
          <tbody>${rows}
            <tr style="font-weight:700;border-top:2px solid var(--border);"><td>Total</td><td>${n}</td><td>1</td><td>—</td><td>—</td><td>100 %</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><strong class="callout__tag">Recordá</strong> \\(f_i\\): frecuencia absoluta · \\(h_i=\\dfrac{f_i}{n}\\): relativa · \\(F_i\\!\\uparrow\\): absoluta acumulada · \\(H_i\\!\\uparrow\\): relativa acumulada.</div>`;
      if (window.MathJaxRender) window.MathJaxRender(out);
    });
  };
})();
