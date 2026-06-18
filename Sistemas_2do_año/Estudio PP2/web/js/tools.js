/* ============================================================
   Herramientas — PP2 (desarrollo web)
   - editor:     editor HTML+CSS+JS en vivo, con guardado, descarga
                 y vista previa responsive (celular/tablet/escritorio).
   - degradados: generador de degradados CSS con código copiable.
   ============================================================ */
(function () {
  "use strict";
  window.Tools = window.Tools || {};

  /* ===================== EDITOR EN VIVO ===================== */
  const SAMPLE_HTML = `<h1>¡Hola, mundo!</h1>
<p>Editá el código y tocá <b>Ejecutar</b>.</p>
<button id="btn">Tocame</button>`;
  const SAMPLE_CSS = `body { font-family: system-ui, sans-serif; text-align: center; padding: 20px; }
h1 { color: #8B5CF6; }
button { padding: 10px 18px; border: 0; border-radius: 10px;
  background: linear-gradient(135deg,#7C3AED,#EC4899); color: #fff; cursor: pointer; }`;
  const SAMPLE_JS = `document.getElementById("btn").addEventListener("click", function () {
  alert("¡Funciona el JavaScript!");
});`;

  const K = { h: "pp2-ed-html", c: "pp2-ed-css", j: "pp2-ed-js" };

  const panel = (id, label) =>
    `<div style="display:flex;flex-direction:column;min-width:0;">
       <label style="font-size:.82rem;font-weight:700;color:var(--muted);margin-bottom:5px;">${label}</label>
       <textarea id="${id}" spellcheck="false"
         style="width:100%;height:200px;padding:10px 12px;border-radius:10px;border:1px solid var(--border);
                background:var(--surface-2);color:var(--text);font-family:'Courier New',ui-monospace,monospace;
                font-size:.86rem;line-height:1.5;resize:vertical;white-space:pre;overflow:auto;"></textarea>
     </div>`;

  window.Tools["editor"] = function (mount) {
    mount.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
        ${panel("edHtml", "HTML")}${panel("edCss", "CSS")}${panel("edJs", "JavaScript")}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
        <button class="btn btn--primary" id="edRun">▶ Ejecutar</button>
        <button class="btn" id="edSample">Cargar ejemplo</button>
        <button class="btn" id="edClear">Limpiar</button>
        <button class="btn" id="edDownload">⬇ Descargar .html</button>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px;">
        <span style="font-size:.82rem;font-weight:700;color:var(--muted);">Vista previa:</span>
        <button class="btn" data-w="375">📱 Celular</button>
        <button class="btn" data-w="768">▭ Tablet</button>
        <button class="btn" data-w="0">🖥 Escritorio</button>
        <span id="edSaved" style="font-size:.78rem;color:var(--muted);margin-left:auto;"></span>
      </div>
      <div style="text-align:center;background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:10px;overflow:auto;">
        <iframe id="edPrev" title="Vista previa" sandbox="allow-scripts allow-modals"
          style="width:100%;height:340px;border:0;border-radius:8px;background:#fff;"></iframe>
      </div>
      <div class="callout tip" style="margin-top:14px;"><strong class="callout__tag">Tip</strong> Tu código se <b>guarda en este navegador</b> automáticamente. El JS corre aislado (sandbox).</div>`;

    const q = (s) => mount.querySelector(s);
    const html = q("#edHtml"), css = q("#edCss"), js = q("#edJs"), prev = q("#edPrev");

    function run() {
      prev.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css.value}</style></head>`
        + `<body>${html.value}<script>try{${js.value}\n}catch(e){document.body.insertAdjacentHTML("beforeend","<pre style=\\"color:#c00\\">"+e+"</pre>");}<\/script></body></html>`;
    }
    function save() {
      try { localStorage.setItem(K.h, html.value); localStorage.setItem(K.c, css.value); localStorage.setItem(K.j, js.value); } catch (e) {}
      const s = q("#edSaved"); if (s) { s.textContent = "guardado ✓"; setTimeout(() => (s.textContent = ""), 1200); }
    }
    function load(h, c, j) { html.value = h; css.value = c; js.value = j; run(); }

    [html, css, js].forEach((t) => t.addEventListener("input", () => { run(); save(); }));
    q("#edRun").addEventListener("click", run);
    q("#edSample").addEventListener("click", () => { load(SAMPLE_HTML, SAMPLE_CSS, SAMPLE_JS); save(); });
    q("#edClear").addEventListener("click", () => { load("", "", ""); save(); });
    q("#edDownload").addEventListener("click", () => {
      const doc = `<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="UTF-8">\n<title>Mi página</title>\n<style>\n${css.value}\n</style>\n</head>\n<body>\n${html.value}\n<script>\n${js.value}\n<\/script>\n</body>\n</html>`;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([doc], { type: "text/html" }));
      a.download = "pagina.html"; a.click(); URL.revokeObjectURL(a.href);
    });
    mount.querySelectorAll("[data-w]").forEach((b) => b.addEventListener("click", () => {
      const w = +b.dataset.w; prev.style.width = w ? w + "px" : "100%"; prev.style.maxWidth = "100%";
    }));

    // restaurar lo guardado, o el ejemplo
    let sh = null;
    try { sh = localStorage.getItem(K.h); } catch (e) {}
    if (sh !== null) load(sh, localStorage.getItem(K.c) || "", localStorage.getItem(K.j) || "");
    else load(SAMPLE_HTML, SAMPLE_CSS, SAMPLE_JS);
  };

  /* ===================== GENERADOR DE DEGRADADOS ===================== */
  window.Tools["degradados"] = function (mount) {
    mount.innerHTML = `
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin-bottom:14px;">
        <label style="display:flex;flex-direction:column;font-size:.82rem;color:var(--muted);gap:4px;">Color 1
          <input type="color" id="dgC1" value="#7C3AED" style="width:60px;height:38px;border:1px solid var(--border);border-radius:8px;background:none;cursor:pointer;"></label>
        <label style="display:flex;flex-direction:column;font-size:.82rem;color:var(--muted);gap:4px;">Color 2
          <input type="color" id="dgC2" value="#EC4899" style="width:60px;height:38px;border:1px solid var(--border);border-radius:8px;background:none;cursor:pointer;"></label>
        <label style="display:flex;flex-direction:column;font-size:.82rem;color:var(--muted);gap:4px;min-width:160px;flex:1;">Tipo
          <select id="dgType" style="padding:9px 12px;border-radius:10px;border:1px solid var(--border);background:var(--surface-2);color:var(--text);">
            <option value="linear">Lineal</option><option value="radial">Radial</option></select></label>
      </div>
      <label id="dgAngWrap" style="display:block;font-size:.82rem;color:var(--muted);margin-bottom:14px;">Ángulo: <b id="dgAngVal">135</b>°
        <input type="range" id="dgAng" min="0" max="360" value="135" style="width:100%;margin-top:6px;"></label>
      <div id="dgPrev" style="height:160px;border-radius:14px;border:1px solid var(--border);margin-bottom:14px;"></div>
      <div class="field"><label>Código CSS</label>
        <textarea id="dgCode" readonly style="width:100%;height:64px;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--surface-2);color:var(--text);font-family:'Courier New',monospace;font-size:.86rem;"></textarea></div>
      <button class="btn btn--primary" id="dgCopy" style="margin-top:10px;">Copiar código</button>`;
    const q = (s) => mount.querySelector(s);
    function update() {
      const c1 = q("#dgC1").value, c2 = q("#dgC2").value, type = q("#dgType").value, ang = q("#dgAng").value;
      q("#dgAngVal").textContent = ang;
      q("#dgAngWrap").style.display = type === "linear" ? "block" : "none";
      const val = type === "linear" ? `linear-gradient(${ang}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})`;
      q("#dgPrev").style.background = val;
      q("#dgCode").value = `background: ${val};`;
    }
    ["#dgC1", "#dgC2", "#dgType", "#dgAng"].forEach((s) => q(s).addEventListener("input", update));
    q("#dgCopy").addEventListener("click", () => {
      const ta = q("#dgCode"); ta.select();
      try { navigator.clipboard.writeText(ta.value); } catch (e) { document.execCommand("copy"); }
      q("#dgCopy").textContent = "¡Copiado! ✓"; setTimeout(() => (q("#dgCopy").textContent = "Copiar código"), 1200);
    });
    update();
  };
})();
