/* ============================================================
   Herramienta — Editor de código en vivo (HTML + CSS + JavaScript)
   Escribís en los tres paneles y se ve el resultado en un iframe.
   Se registra en window.Tools["editor"](mount).
   ============================================================ */
(function () {
  "use strict";
  window.Tools = window.Tools || {};

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

  const panel = (id, label, ph) =>
    `<div style="display:flex;flex-direction:column;min-width:0;">
       <label style="font-size:.82rem;font-weight:700;color:var(--muted);margin-bottom:5px;">${label}</label>
       <textarea id="${id}" spellcheck="false" placeholder="${ph}"
         style="width:100%;height:200px;padding:10px 12px;border-radius:10px;border:1px solid var(--border);
                background:var(--surface-2);color:var(--text);font-family:'Courier New',ui-monospace,monospace;
                font-size:.86rem;line-height:1.5;resize:vertical;white-space:pre;overflow:auto;"></textarea>
     </div>`;

  window.Tools["editor"] = function (mount) {
    mount.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
        ${panel("edHtml", "HTML", "&lt;h1&gt;Hola&lt;/h1&gt;")}
        ${panel("edCss", "CSS", "h1 { color: red; }")}
        ${panel("edJs", "JavaScript", "console.log('hola')")}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">
        <button class="btn btn--primary" id="edRun">▶ Ejecutar</button>
        <button class="btn" id="edSample">Cargar ejemplo</button>
        <button class="btn" id="edClear">Limpiar</button>
      </div>
      <label style="font-size:.82rem;font-weight:700;color:var(--muted);">Vista previa</label>
      <iframe id="edPrev" title="Vista previa" sandbox="allow-scripts allow-modals"
        style="width:100%;height:340px;border:1px solid var(--border);border-radius:12px;background:#fff;margin-top:5px;"></iframe>
      <div class="callout tip" style="margin-top:14px;"><strong class="callout__tag">Tip</strong> El JavaScript corre aislado (sandbox); si algo falla, no afecta a la página. Tu código no se guarda al recargar.</div>`;

    const q = (s) => mount.querySelector(s);
    const html = q("#edHtml"), css = q("#edCss"), js = q("#edJs"), prev = q("#edPrev");

    function run() {
      const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css.value}</style></head>`
        + `<body>${html.value}<script>try{${js.value}\n}catch(e){document.body.insertAdjacentHTML("beforeend","<pre style=\\"color:#c00\\">"+e+"</pre>");}<\/script></body></html>`;
      prev.srcdoc = doc;
    }
    function load(h, c, j) { html.value = h; css.value = c; js.value = j; run(); }

    q("#edRun").addEventListener("click", run);
    q("#edSample").addEventListener("click", () => load(SAMPLE_HTML, SAMPLE_CSS, SAMPLE_JS));
    q("#edClear").addEventListener("click", () => load("", "", ""));
    // arranca con el ejemplo
    load(SAMPLE_HTML, SAMPLE_CSS, SAMPLE_JS);
  };
})();
