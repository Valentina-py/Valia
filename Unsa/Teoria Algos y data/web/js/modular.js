/* ============================================================
   HERRAMIENTA — Aritmética Modular
   - Tablas (Zn, +n, ×n) + inversos
   - Ecuaciones a·x ≡ b (mod n)
   - Ecuaciones diofánticas a·x + b·y = c
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});
  const U = window.NumUtil || {
    mcd: (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; },
    st: function (a, b) { let old_r = a, r = b, old_s = 1, s = 0, old_t = 0, t = 1; while (r) { const q = Math.floor(old_r / r);[old_r, r] = [r, old_r - q * r];[old_s, s] = [s, old_s - q * s];[old_t, t] = [t, old_t - q * t]; } return { s: old_s, t: old_t, g: old_r, rows: [] }; },
  };
  const mod = (x, n) => ((x % n) + n) % n;
  function inverse(a, n) { // null si no existe
    if (U.mcd(a, n) !== 1) return null;
    const { s } = U.st(mod(a, n), n);
    return mod(s, n);
  }

  function build(container) {
    let tab = "tablas";
    container.innerHTML = `
      <div class="tool">
        <div class="tabs">
          <button class="tab" data-t="tablas">Tablas de Zₙ</button>
          <button class="tab" data-t="ecuacion">Ecuación a·x ≡ b</button>
          <button class="tab" data-t="diofantica">Diofántica a·x+b·y=c</button>
        </div>
        <div id="md-ctrl"></div>
        <div id="md-out"></div>
      </div>`;
    const $ = s => container.querySelector(s), ctrl = $("#md-ctrl"), out = $("#md-out");

    /* ---- tablas Zn ---- */
    function runTablas() {
      ctrl.innerHTML = `<div class="field-row">
          <div class="field"><label>n (2 a 12)</label><input class="input input--mono" id="md-n" type="number" value="5" min="2" max="12" /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn--primary" id="md-go" style="width:100%">Generar tablas</button></div>
        </div>`;
      $("#md-go").addEventListener("click", () => {
        const n = Math.max(2, Math.min(12, parseInt($("#md-n").value, 10) || 5));
        const head = `<th>${"×"}</th>` + Array.from({ length: n }, (_, j) => `<th>${j}</th>`).join("");
        const headP = `<th>+</th>` + Array.from({ length: n }, (_, j) => `<th>${j}</th>`).join("");
        const sum = `<div class="tbl-wrap"><table class="tbl"><thead><tr>${headP}</tr></thead><tbody>${
          Array.from({ length: n }, (_, i) => `<tr><th>${i}</th>${Array.from({ length: n }, (_, j) => `<td>${(i + j) % n}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        const prod = `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head}</tr></thead><tbody>${
          Array.from({ length: n }, (_, i) => `<tr><th>${i}</th>${Array.from({ length: n }, (_, j) => {
            const v = (i * j) % n; const one = v === 1 ? ' style="background:var(--ok-soft);font-weight:700;color:var(--ok)"' : "";
            return `<td${one}>${v}</td>`;
          }).join("")}</tr>`).join("")}</tbody></table></div>`;
        const units = [];
        for (let a = 1; a < n; a++) { const inv = inverse(a, n); if (inv != null) units.push(`${a}⁻¹ = ${inv}`); }
        const prime = U.isPrime ? U.isPrime(n) : units.length === n - 1;
        out.innerHTML = `
          <h3>Suma  +${n}</h3>${sum}
          <h3>Producto  ×${n}</h3>${prod}
          <div class="callout ${prime ? "tip" : ""}">
            <strong class="callout__tag">Inversos en Z${n}</strong>
            Inverso aditivo de a: <code>${n} − a</code> (siempre existe).<br>
            Inversos multiplicativos (resaltados los 1 en la tabla ×): ${units.length ? units.join(" · ") : "ninguno salvo 1"}.
            ${prime ? `Como ${n} es primo, <strong>todos</strong> los elementos no nulos tienen inverso multiplicativo.` : `Solo los coprimos con ${n} tienen inverso multiplicativo.`}
          </div>`;
      });
      $("#md-go").click();
    }

    /* ---- a·x ≡ b (mod n) ---- */
    function runEcuacion() {
      ctrl.innerHTML = `<div class="field-row--3" style="display:grid;gap:12px;grid-template-columns:1fr 1fr 1fr">
          <div class="field"><label>a</label><input class="input input--mono" id="md-a" value="5" /></div>
          <div class="field"><label>b</label><input class="input input--mono" id="md-b" value="12" /></div>
          <div class="field"><label>n</label><input class="input input--mono" id="md-mn" value="17" /></div>
        </div><div class="btn-row"><button class="btn btn--primary" id="md-go">Resolver</button></div>`;
      $("#md-go").addEventListener("click", () => {
        let a = parseInt($("#md-a").value, 10), b = parseInt($("#md-b").value, 10), n = parseInt($("#md-mn").value, 10);
        if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(n) || n < 2) return out.innerHTML = `<div class="error-text">Ingresá enteros con n ≥ 2.</div>`;
        a = mod(a, n); b = mod(b, n);
        const d = U.mcd(a, n);
        if (b % d !== 0) {
          out.innerHTML = `<div class="result-box" style="border-color:var(--bad)"><strong>Sin solución.</strong> mcd(${a},${n}) = ${d} no divide a ${b}.</div>
            <p class="viz-hint">La ecuación a·x ≡ b (mod n) tiene solución ⟺ mcd(a,n) | b.</p>`;
          return;
        }
        let html = `<div class="result-box"><strong>Tiene solución</strong> porque mcd(${a},${n}) = ${d} divide a ${b}.</div>`;
        if (d === 1) {
          const inv = inverse(a, n);
          const x0 = mod(inv * b, n);
          html += `<div class="trace">Inverso: ${a}⁻¹ = ${inv} (mod ${n})\nx ≡ ${a}⁻¹·b = ${inv}·${b} = ${inv * b} ≡ <span class="hl">${x0}</span> (mod ${n})</div>
            <div class="callout tip"><strong class="callout__tag">Solución</strong>x ≡ ${x0} (mod ${n}). General: x = ${x0} + ${n}·k. Comprobación: ${a}·${x0} = ${a * x0} ≡ ${mod(a * x0, n)} (mod ${n}).</div>`;
        } else {
          const a2 = a / d, b2 = b / d, n2 = n / d;
          const inv = inverse(mod(a2, n2), n2);
          const x0 = mod(inv * b2, n2);
          const sols = Array.from({ length: d }, (_, k) => mod(x0 + k * n2, n));
          html += `<div class="trace">Divido por d=${d}: ${a2}·x ≡ ${b2} (mod ${n2})\n(${a2})⁻¹ = ${inv} (mod ${n2})\nx₀ = ${inv}·${b2} ≡ ${x0} (mod ${n2})</div>
            <div class="callout tip"><strong class="callout__tag">${d} soluciones en Z${n}</strong>x ≡ ${sols.join(", ")} (mod ${n}).</div>`;
        }
        out.innerHTML = html;
      });
      $("#md-go").click();
    }

    /* ---- diofántica a·x + b·y = c ---- */
    function runDiofantica() {
      ctrl.innerHTML = `<div class="field-row--3" style="display:grid;gap:12px;grid-template-columns:1fr 1fr 1fr">
          <div class="field"><label>a</label><input class="input input--mono" id="md-a" value="2" /></div>
          <div class="field"><label>b</label><input class="input input--mono" id="md-b" value="6" /></div>
          <div class="field"><label>c</label><input class="input input--mono" id="md-c" value="8" /></div>
        </div><div class="btn-row"><button class="btn btn--primary" id="md-go">Resolver</button></div>`;
      $("#md-go").addEventListener("click", () => {
        const a = parseInt($("#md-a").value, 10), b = parseInt($("#md-b").value, 10), c = parseInt($("#md-c").value, 10);
        if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || (a === 0 && b === 0)) return out.innerHTML = `<div class="error-text">Ingresá enteros (a y b no ambos 0).</div>`;
        const d = U.mcd(a, b);
        if (c % d !== 0) {
          out.innerHTML = `<div class="result-box" style="border-color:var(--bad)"><strong>Sin solución entera.</strong> mcd(${a},${b}) = ${d} no divide a ${c}.</div>
            <p class="viz-hint">a·x + b·y = c tiene solución entera ⟺ mcd(a,b) | c.</p>`;
          return;
        }
        const { s, t } = U.st(a / d, b / d);
        const x0 = s * (c / d), y0 = t * (c / d);
        const bd = b / d, ad = a / d;
        const rows = [];
        for (let L = -2; L <= 5; L++) rows.push({ L, x: x0 + bd * L, y: y0 - ad * L });
        const pos = rows.find(r => r.x > 0 && r.y > 0);
        out.innerHTML = `
          <div class="result-box"><strong>Solución particular:</strong> x₀ = ${x0}, y₀ = ${y0}
            &nbsp;(d = ${d}, (s,t) = (${s},${t}))</div>
          <div class="callout tip"><strong class="callout__tag">Solución general</strong>
            x = ${x0} ${bd >= 0 ? "+" : "−"} ${Math.abs(bd)}·λ &nbsp;·&nbsp; y = ${y0} ${ad >= 0 ? "−" : "+"} ${Math.abs(ad)}·λ, &nbsp; λ ∈ ℤ
            ${pos ? `<br>Una solución positiva (λ=${pos.L}): <strong>(x, y) = (${pos.x}, ${pos.y})</strong>.` : ""}
          </div>
          <h3>Algunas soluciones</h3>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>λ</th><th>x</th><th>y</th><th>a·x+b·y</th></tr></thead>
          <tbody>${rows.map(r => `<tr><td>${r.L}</td><td>${r.x}</td><td>${r.y}</td><td>${a * r.x + b * r.y}</td></tr>`).join("")}</tbody></table></div>`;
      });
      $("#md-go").click();
    }

    function setTab(t) {
      tab = t; container.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.t === t));
      ({ tablas: runTablas, ecuacion: runEcuacion, diofantica: runDiofantica })[t]();
    }
    container.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => setTab(b.dataset.t)));
    setTab("tablas");
  }

  Tools.modular = build;
})();
