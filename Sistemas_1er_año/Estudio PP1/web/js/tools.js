/* ============================================================
   HERRAMIENTAS INTERACTIVAS — PP1
   window.Tools = { bytes, cotizador, diagnostico, informe }
   Cada función recibe el elemento contenedor donde montarse.
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  const pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });

  /* ============================================================
     1) CONVERSOR DE ALMACENAMIENTO
     ============================================================ */
  const UNITS = [
    { key: "bit", name: "Bits", factor: 1 / 8 },
    { key: "B",   name: "Bytes", factor: 1 },
    { key: "KB",  name: "Kilobytes", factor: 1024 },
    { key: "MB",  name: "Megabytes", factor: 1024 ** 2 },
    { key: "GB",  name: "Gigabytes", factor: 1024 ** 3 },
    { key: "TB",  name: "Terabytes", factor: 1024 ** 4 },
  ];

  Tools.bytes = function (root) {
    root.innerHTML = `
      <div class="tool">
        <div class="field-row">
          <div class="field">
            <label for="bvVal">Cantidad</label>
            <input class="input input--mono" id="bvVal" type="number" min="0" step="any" value="1" />
          </div>
          <div class="field">
            <label for="bvUnit">Unidad</label>
            <select class="input" id="bvUnit">
              ${UNITS.map(u => `<option value="${u.key}" ${u.key === "GB" ? "selected" : ""}>${u.name} (${u.key})</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="conv-grid" id="bvGrid"></div>
        <p class="builder-note">Se usa la base binaria: 1 Byte = 8 bits y 1 KB = 1024 B, 1 MB = 1024 KB, etc.</p>
      </div>`;

    const valEl = root.querySelector("#bvVal");
    const unitEl = root.querySelector("#bvUnit");
    const grid = root.querySelector("#bvGrid");

    function render() {
      const v = parseFloat(valEl.value);
      const from = UNITS.find(u => u.key === unitEl.value);
      if (isNaN(v) || !from) { grid.innerHTML = `<div class="conv-cell">Ingresá un número.</div>`; return; }
      const bytes = v * from.factor;
      grid.innerHTML = UNITS.map(u => {
        const out = bytes / u.factor;
        const show = out === 0 ? "0" : (out < 0.001 || out >= 1e9 ? out.toExponential(3) : num.format(out));
        return `<div class="conv-cell"><div class="conv-cell__val">${show}</div><div class="conv-cell__unit">${u.key}</div></div>`;
      }).join("");
    }
    valEl.addEventListener("input", render);
    unitEl.addEventListener("change", render);
    render();
  };

  /* ============================================================
     2) COTIZADOR / ARMADO DE PC
     ============================================================ */
  const PARTS = [
    { name: "Placa madre", desc: "Motherboard que conecta todo", price: 95000, on: true },
    { name: "Procesador (CPU)", desc: "El cerebro del equipo", price: 180000, on: true },
    { name: "Memoria RAM", desc: "16 GB DDR4", price: 65000, on: true },
    { name: "Disco SSD", desc: "Almacenamiento 480 GB", price: 48000, on: true },
    { name: "Fuente de alimentación", desc: "550 W certificada", price: 52000, on: true },
    { name: "Gabinete", desc: "Caja con ventilación", price: 42000, on: true },
    { name: "Refrigeración (cooler)", desc: "Disipador / ventiladores", price: 28000, on: true },
    { name: "Placa de video", desc: "GPU dedicada (opcional)", price: 260000, on: false },
    { name: "Monitor", desc: "Pantalla", price: 135000, on: true },
    { name: "Teclado", desc: "Periférico de entrada", price: 16000, on: true },
    { name: "Mouse", desc: "Periférico de entrada", price: 11000, on: true },
    { name: "Sistema operativo", desc: "Licencia (o software libre $0)", price: 0, on: true },
  ];

  Tools.cotizador = function (root) {
    // copia de trabajo para no mutar el original entre visitas
    const parts = PARTS.map(p => ({ ...p }));
    root.innerHTML = `
      <div class="tool">
        <div class="tbl-wrap">
          <table class="builder" id="ctTable">
            <thead><tr><th class="pick">Incluir</th><th>Componente</th><th class="num">Precio (ARS)</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="builder-total">
          <div><div style="font-size:12px;opacity:.85">PRESUPUESTO TOTAL</div><div id="ctCount" style="font-size:12.5px;opacity:.85"></div></div>
          <div class="builder-total__num" id="ctTotal">$0</div>
        </div>
        <div class="btn-row"><button class="btn" id="ctReset">↺ Restablecer precios</button></div>
        <p class="builder-note">Los precios son orientativos: editalos con valores reales de tiendas locales o en línea. Tildá o destildá componentes según tu armado.</p>
      </div>`;

    const tbody = root.querySelector("#ctTable tbody");
    const totalEl = root.querySelector("#ctTotal");
    const countEl = root.querySelector("#ctCount");

    function rows() {
      tbody.innerHTML = parts.map((p, i) => `
        <tr class="${p.on ? "" : "off"}" data-i="${i}">
          <td class="pick"><input type="checkbox" ${p.on ? "checked" : ""} data-act="toggle" /></td>
          <td><div class="part-name">${p.name}</div><div class="part-desc">${p.desc}</div></td>
          <td class="num"><input type="number" min="0" step="1000" value="${p.price}" data-act="price" /></td>
        </tr>`).join("");
    }
    function recalc() {
      let total = 0, n = 0;
      parts.forEach(p => { if (p.on) { total += (+p.price || 0); n++; } });
      totalEl.textContent = pesos.format(total);
      countEl.textContent = `${n} componente${n === 1 ? "" : "s"} seleccionado${n === 1 ? "" : "s"}`;
    }
    tbody.addEventListener("input", e => {
      const tr = e.target.closest("tr"); if (!tr) return;
      const i = +tr.dataset.i;
      if (e.target.dataset.act === "toggle") { parts[i].on = e.target.checked; tr.classList.toggle("off", !parts[i].on); }
      else if (e.target.dataset.act === "price") { parts[i].price = parseFloat(e.target.value) || 0; }
      recalc();
    });
    root.querySelector("#ctReset").addEventListener("click", () => {
      PARTS.forEach((p, i) => { parts[i].price = p.price; parts[i].on = p.on; });
      rows(); recalc();
    });
    rows(); recalc();
  };

  /* ============================================================
     3) DIAGNÓSTICO DE FALLAS
     ============================================================ */
  const DIAG = [
    { s: "La PC no enciende (sin luces ni ventiladores)",
      c: "Problema de alimentación: cable suelto, toma sin corriente, interruptor de la fuente apagado o conector ATX flojo.",
      f: "Verificá el cable y el tomacorriente, el interruptor trasero de la fuente y que el conector ATX de la placa esté bien insertado. Probá otra toma." },
    { s: "Enciende pero no muestra imagen",
      c: "Falla de video: cable de monitor mal conectado, monitor apagado, o memoria RAM/placa de video mal asentada.",
      f: "Revisá el cable VGA/HDMI y que el monitor esté encendido y en la entrada correcta. Reasentá la RAM y la placa de video (con el equipo apagado y pulsera antiestática)." },
    { s: "Se apaga sola o se reinicia",
      c: "Sobrecalentamiento por polvo o cooler detenido, pasta térmica seca, o fuente de potencia insuficiente.",
      f: "Limpiá el polvo con aire comprimido, verificá que los ventiladores giren, renová la pasta térmica y comprobá que la fuente alcance para los componentes." },
    { s: "Funciona muy lenta",
      c: "Poca RAM, disco casi lleno, demasiados programas al iniciar o malware.",
      f: "Cerrá programas que no uses, desactivá los del inicio, liberá espacio en disco, pasá un antivirus y considerá agregar RAM o un disco SSD." },
    { s: "Aparece una pantalla azul de error",
      c: "Driver defectuoso, RAM con fallas o un cambio reciente de hardware/software.",
      f: "Actualizá o reinstalá los drivers, hacé un test de memoria RAM y deshacé el último cambio realizado. Anotá el código de error para buscarlo." },
    { s: "No reconoce un dispositivo USB",
      c: "Falta el driver, el puerto está dañado o el cable falla.",
      f: "Probá otro puerto USB y otro cable, reiniciá el equipo e instalá el controlador del dispositivo." },
    { s: "Hace ruido fuerte o zumbido",
      c: "Ventilador (cooler) con polvo, desbalanceado o por agotarse.",
      f: "Limpiá los ventiladores; si el ruido persiste, reemplazá el cooler afectado." },
    { s: "No hay sonido",
      c: "Volumen en silencio, salida de audio mal seleccionada o driver de sonido faltante.",
      f: "Revisá el volumen y el dispositivo de salida, verificá el conector de parlantes/auriculares e instalá el driver de audio." },
    { s: "No conecta a Internet",
      c: "Cable de red o Wi-Fi desconectado, router con problemas o driver de red faltante.",
      f: "Verificá el cable o la conexión Wi-Fi, reiniciá el router/módem y comprobá el driver de la placa de red." },
  ];

  Tools.diagnostico = function (root) {
    root.innerHTML = `
      <div class="tool">
        <label>Elegí el síntoma que observás:</label>
        <div class="diag-list" id="dgList">
          ${DIAG.map((d, i) => `<button class="btn diag-q" data-i="${i}">${d.s}</button>`).join("")}
        </div>
        <div id="dgOut"></div>
      </div>`;
    const out = root.querySelector("#dgOut");
    root.querySelector("#dgList").addEventListener("click", e => {
      const b = e.target.closest(".diag-q"); if (!b) return;
      const d = DIAG[+b.dataset.i];
      root.querySelectorAll(".diag-q").forEach(x => x.classList.remove("btn--primary"));
      b.classList.add("btn--primary");
      out.innerHTML = `
        <div class="diag-card">
          <div class="diag-cause"><h4>⚠️ Causa probable</h4>${d.c}</div>
          <div class="diag-fix"><h4>🔧 Qué hacer</h4>${d.f}</div>
        </div>`;
    });
  };

  /* ============================================================
     4) ARMADOR DE INFORME TÉCNICO (checklist)
     ============================================================ */
  const REPORT = [
    { g: "Etapas del método", items: ["I. Preparación (objetivo, lector, material)", "II. Ordenación del material en secciones", "III. Redacción del informe", "IV. Revisión del borrador"] },
    { g: "Partes del informe", items: ["Título claro que identifique el tema", "Introducción (destinatario, fecha, propósito, antecedentes)", "Cuerpo / secciones con hechos y su análisis", "Conclusiones y recomendaciones", "Lista de referencias (bibliografía)", "Índice y apéndices"] },
    { g: "Reglas de oro", items: ["Precisión", "Concisión", "Claridad"] },
  ];

  Tools.informe = function (root) {
    let done = 0;
    const total = REPORT.reduce((s, g) => s + g.items.length, 0);
    root.innerHTML = `
      <div class="tool">
        <p class="muted" style="margin-top:0">Marcá cada elemento a medida que lo completás en tu informe técnico.</p>
        <div class="progress-bar" style="margin-bottom:6px"><span id="rpBar"></span></div>
        <div class="progress-mini__pct" id="rpPct" style="text-align:left">0 / ${total}</div>
        ${REPORT.map((g, gi) => `
          <h4>${g.g}</h4>
          <ul class="checklist">
            ${g.items.map((it, ii) => `<li><input type="checkbox" id="rp${gi}-${ii}" /><span>${it}</span></li>`).join("")}
          </ul>`).join("")}
      </div>`;
    const bar = root.querySelector("#rpBar");
    const pct = root.querySelector("#rpPct");
    root.querySelectorAll(".checklist input").forEach(cb => {
      cb.addEventListener("change", () => {
        cb.closest("li").classList.toggle("done", cb.checked);
        done = root.querySelectorAll(".checklist input:checked").length;
        bar.style.width = Math.round((done / total) * 100) + "%";
        pct.textContent = `${done} / ${total}`;
      });
    });
  };

})();
