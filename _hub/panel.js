/* =======================================================================
   PANEL DE USUARIO · Valía
   Página propia (panel.html): perfil, estadísticas, subir apuntes y "mis apuntes".
   Requiere sesión iniciada; si no hay, muestra aviso para iniciar sesión.
   ======================================================================= */
(function () {
  "use strict";
  const C = window.HUB_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Iconos ---------- */
  const P = {
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    upload: '<path d="M12 3v13"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    sheet: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  };
  const icon = (name, size = 24) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.file}</svg>`;
  $$("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon, +el.dataset.size || 24); });

  /* ---------- Marca ---------- */
  $$(".logo").forEach((el) => { el.innerHTML = '<svg viewBox="0 0 80 80" width="62%" height="62%" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M15 42 L33 58 L66 20"/></svg>'; });
  if (C.marca) {
    $("#brandName").textContent = C.marca.nombre;
  }

  /* ---------- Tema ---------- */
  const themeBtn = $("#themeToggle");
  const saved = localStorage.getItem("hub-theme");
  if (saved) document.documentElement.dataset.theme = saved;
  const syncThemeIcon = () => { themeBtn.innerHTML = icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon", 20); };
  syncThemeIcon();
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("hub-theme", next);
    syncThemeIcon();
  });

  /* ---------- Helpers ---------- */
  const fileIconName = (name = "") => {
    const e = name.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(e)) return "image";
    if (["xls", "xlsx", "csv"].includes(e)) return "sheet";
    return "file";
  };
  const fmtSize = (b) => !b ? "" : b > 1e6 ? (b / 1e6).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
  const escapeHtml = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Supabase ---------- */
  const hasSb = !!(C.supabase && C.supabase.url && C.supabase.anonKey && window.supabase);
  const sb = hasSb ? window.supabase.createClient(C.supabase.url, C.supabase.anonKey) : null;
  let currentUser = null;

  /* ---------- Materias en el selector ---------- */
  const sel = $("#apMateria");
  (C.grupos || []).forEach((g) => (g.materias || []).forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.nombre; opt.textContent = `${g.titulo} · ${m.nombre}`;
    sel.appendChild(opt);
  }));
  const optOtra = document.createElement("option");
  optOtra.value = "__otra__"; optOtra.textContent = "Otra materia / institución…";
  sel.appendChild(optOtra);
  const otraField = $("#otraField"), apOtra = $("#apMateriaOtra");
  sel.addEventListener("change", () => {
    otraField.hidden = sel.value !== "__otra__";
    if (sel.value === "__otra__") apOtra.focus();
  });

  /* ---------- Archivo (chip) ---------- */
  const dz = $("#dropzone"), fileInput = $("#apFile"), dropText = $("#dropText");
  const fileChip = $("#fileChip"), fcName = $("#fcName"), fcSize = $("#fcSize"), fcIco = $("#fcIco");
  function showFile(file) {
    if (!file) { fileChip.classList.remove("show"); dropText.textContent = "Arrastra tu archivo o haz clic para elegirlo"; return; }
    fcName.textContent = file.name;
    fcSize.textContent = fmtSize(file.size);
    fcIco.innerHTML = icon(fileIconName(file.name), 20);
    fileChip.classList.add("show");
    dropText.textContent = "Archivo listo · tocá para cambiarlo";
  }
  fileInput.addEventListener("change", () => showFile(fileInput.files[0]));
  $("#fcRemove").addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); fileInput.value = ""; showFile(null); });
  ["dragover", "dragenter"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("drag"); }));
  ["dragleave", "drop"].forEach((ev) => dz.addEventListener(ev, () => dz.classList.remove("drag")));
  dz.addEventListener("drop", (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) { fileInput.files = e.dataTransfer.files; showFile(e.dataTransfer.files[0]); } });

  /* ---------- Subir ---------- */
  const uploadBtn = $("#uploadBtn");
  uploadBtn.addEventListener("click", async () => {
    const titulo = $("#apTitulo").value.trim();
    const materia = sel.value === "__otra__" ? apOtra.value.trim() : sel.value;
    const file = fileInput.files[0];
    const msg = $("#uploadMsg");
    if (!titulo || !file) { msg.className = "msg err"; msg.textContent = "Poné un título y elegí un archivo."; return; }
    if (sel.value === "__otra__" && !materia) { msg.className = "msg err"; msg.textContent = "Escribí el nombre de la materia o institución."; return; }
    if (!sb || !currentUser) { msg.className = "msg err"; msg.textContent = "Tu sesión expiró. Volvé a iniciar sesión."; return; }
    const lock = (on) => { uploadBtn.disabled = on; uploadBtn.textContent = on ? "Subiendo…" : "Subir apunte"; };
    msg.className = "msg"; msg.textContent = "Subiendo…"; lock(true);
    try {
      const uid = currentUser.id;
      const path = `${uid}/${Date.now()}_${file.name}`;
      const up = await sb.storage.from(C.supabase.bucket).upload(path, file);
      if (up.error) throw up.error;
      const { data: pub } = sb.storage.from(C.supabase.bucket).getPublicUrl(path);
      const ins = await sb.from("apuntes").insert({ titulo, materia, file_path: path, url: pub.publicUrl, user_id: uid });
      if (ins.error) throw ins.error;
      msg.className = "msg ok"; msg.textContent = "¡Apunte subido!";
      resetUpload(); loadMisApuntes();
    } catch (err) { msg.className = "msg err"; msg.textContent = "Error: " + err.message; }
    finally { lock(false); }
  });
  function resetUpload() {
    $("#apTitulo").value = ""; fileInput.value = ""; showFile(null);
    sel.value = sel.options[0] ? sel.options[0].value : ""; otraField.hidden = true; apOtra.value = "";
  }

  /* ---------- Mis apuntes ---------- */
  async function loadMisApuntes() {
    const wrap = $("#misApuntes"); if (!wrap || !sb || !currentUser) return;
    const { data, error } = await sb.from("apuntes").select("*").eq("user_id", currentUser.id).order("created_at", { ascending: false });
    const items = (!error && data) ? data.map((d) => ({ id: d.id, titulo: d.titulo, materia: d.materia, file_path: d.file_path, name: (d.file_path || "").split("/").pop(), url: d.url })) : [];
    $("#statApuntes").textContent = items.length;
    $("#statMateriasUser").textContent = new Set(items.map((i) => i.materia || "General")).size;
    $("#statUltimo").textContent = items[0] ? (items[0].titulo.length > 13 ? items[0].titulo.slice(0, 13) + "…" : items[0].titulo) : "—";
    $("#misCount").textContent = items.length + (items.length === 1 ? " apunte" : " apuntes");
    if (!items.length) { wrap.innerHTML = `<div class="empty">Todavía no subiste apuntes. Usá el formulario para subir el primero.</div>`; return; }
    wrap.innerHTML = items.map((a) => `
      <div class="apunte-item">
        <div class="fico">${icon(fileIconName(a.name), 20)}</div>
        <div class="meta"><b>${escapeHtml(a.titulo)}</b><span>${escapeHtml(a.materia || "General")}</span></div>
        <div class="actions">
          <a class="dl" href="${a.url || "#"}" ${a.url && a.url !== "#" ? 'target="_blank" rel="noopener"' : ""}>Abrir</a>
          <button class="del" data-id="${a.id || ""}" data-path="${escapeHtml(a.file_path || "")}">Borrar</button>
        </div>
      </div>`).join("");
    wrap.querySelectorAll(".del").forEach((b) => b.addEventListener("click", () => borrarApunte(b.dataset)));
  }
  async function borrarApunte(ds) {
    if (!confirm("¿Borrar este apunte? No se puede deshacer.")) return;
    try {
      if (ds.path) await sb.storage.from(C.supabase.bucket).remove([ds.path]);
      if (ds.id) await sb.from("apuntes").delete().eq("id", ds.id);
      loadMisApuntes();
    } catch (err) { alert("No se pudo borrar: " + err.message); }
  }

  /* ---------- Sesión ---------- */
  function renderUser(user) {
    currentUser = user;
    const name = (user.user_metadata && (user.user_metadata.username || user.user_metadata.full_name)) || user.email || "Estudiante";
    $("#dashAv").textContent = (name[0] || "U").toUpperCase();
    $("#dashHola").textContent = "Hola, " + name;
    $("#dashEmail").textContent = user.email || "";
  }
  $("#logoutBtn").addEventListener("click", async () => {
    if (sb) await sb.auth.signOut();
    location.href = "index.html";
  });

  async function init() {
    if (!sb) { $("#needLogin").hidden = false; return; }
    const { data } = await sb.auth.getSession();
    const user = data.session ? data.session.user : null;
    if (!user) { $("#needLogin").hidden = false; $("#panelMain").hidden = true; return; }
    $("#panelMain").hidden = false; $("#needLogin").hidden = true;
    renderUser(user);
    loadMisApuntes();
    sb.auth.onAuthStateChange((_e, session) => {
      if (!session) { location.href = "index.html"; }
    });
  }
  init();
})();
