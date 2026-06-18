/* =======================================================================
   HUB DE ESTUDIO · lógica
   - Tema claro/oscuro
   - Animaciones de scroll
   - Login (email + Google) y apuntes con Supabase (o MODO DEMO sin claves)
   ======================================================================= */
(function () {
  "use strict";
  const C = window.HUB_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Iconos (línea, monocromos) ---------- */
  const P = {
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M20 9h2M20 14h2M2 9h2M2 14h2"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>',
    languages: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    upload: '<path d="M12 3v13"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    sheet: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  };
  const icon = (name, size = 24) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.book}</svg>`;

  /* ---------- Marca ---------- */
  const LOGO_MARK = '<svg viewBox="0 0 80 80" width="62%" height="62%" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M15 42 L33 58 L66 20"/></svg>';
  $$(".logo").forEach((el) => { el.innerHTML = LOGO_MARK; });
  if (C.marca) {
    $("#brandName").textContent = C.marca.nombre;
    $("#footName").textContent = C.marca.nombre;
    document.title = `${C.marca.nombre} · Plataforma de estudio`;
    if (C.marca.lema) $("#heroTagline").textContent = C.marca.lema;
  }
  $("#year").textContent = "2026";

  /* ---------- Iconos estáticos de la interfaz ---------- */
  $$("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon, +el.dataset.size || 24); });

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

  /* ---------- Navbar + barra de progreso ---------- */
  const nav = $("#nav"), prog = $("#scrollProgress");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

  /* ---------- Materias ---------- */
  const mount = $("#gruposMount");
  let totalMaterias = 0;
  (C.grupos || []).forEach((g) => {
    const wrap = document.createElement("div");
    wrap.className = "grupo reveal";
    const cards = g.materias.map((m, i) => {
      totalMaterias++;
      const p = 0;
      return `
        <a class="card reveal d${(i % 4) + 1}" href="${m.ruta}" style="--card-accent:${m.color || "var(--accent)"}">
          <div class="ico">${icon(m.icono, 24)}</div>
          <h4>${m.nombre}</h4>
          <div class="bar"><span style="--p:${p}%"></span></div>
          <div class="pct">${p ? p + "% completado" : "Sin empezar"}</div>
          <span class="go">Abrir materia <span class="arrow">&rarr;</span></span>
        </a>`;
    }).join("");
    wrap.innerHTML = `<h3>${g.titulo}</h3><div class="cards">${cards}</div>`;
    mount.appendChild(wrap);
  });
  $("#statMaterias").textContent = totalMaterias;

  /* ---------- Donativos ---------- */
  const payRow = $("#payRow");
  let anyPay = false;
  const pagos = C.pagos || {};
  if (pagos.paypal) {
    anyPay = true;
    payRow.insertAdjacentHTML("beforeend",
      `<a class="pay-btn paypal" href="${pagos.paypal}" target="_blank" rel="noopener">Donar con PayPal</a>`);
  }
  if (pagos.mercadopago) {
    anyPay = true;
    payRow.insertAdjacentHTML("beforeend",
      `<a class="pay-btn mp" href="${pagos.mercadopago}" target="_blank" rel="noopener">Donar con Mercado Pago</a>`);
  }
  if (!anyPay) $("#noPay").hidden = false;

  /* ---------- Anuncios ----------
     El script de AdSense se carga estáticamente desde el <head> del HTML
     (método recomendado por Google). El client queda en config.js solo como referencia. */

  /* ======================================================================
     AUTENTICACIÓN + APUNTES
     ===================================================================== */
  const hasSupabase = !!(C.supabase && C.supabase.url && C.supabase.anonKey && window.supabase);
  let sb = null;
  if (hasSupabase) sb = window.supabase.createClient(C.supabase.url, C.supabase.anonKey);
  const DEMO = !hasSupabase;

  const modal = $("#authModal");
  const openModal = () => { modal.classList.add("open"); $("#demoNote").hidden = !DEMO; };
  const closeModal = () => modal.classList.remove("open");
  $("#loginNavBtn").addEventListener("click", openModal);
  $("#panelBtn").addEventListener("click", () => { location.href = "panel.html"; });
  $("#heroLoginBtn").addEventListener("click", () => { if (isLogged()) location.href = "panel.html"; else openModal(); });
  $("#lockedLoginBtn") && $("#lockedLoginBtn").addEventListener("click", openModal);
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // Abrir el login automáticamente si se llega desde una materia con #entrar / #login
  const maybeOpenFromHash = () => { if (/^#(entrar|login)$/i.test(location.hash)) openModal(); };
  maybeOpenFromHash();
  window.addEventListener("hashchange", maybeOpenFromHash);

  let currentUser = null;
  const isLogged = () => !!currentUser;

  // tabs
  let mode = "login";
  $$(".modal .tabs button").forEach((b) => b.addEventListener("click", () => {
    $$(".modal .tabs button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    mode = b.dataset.tab;
    $("#modalTitle").textContent = mode === "login" ? "Inicia sesión" : "Crea tu cuenta";
    $("#modalSub").textContent = mode === "login" ? "Accede para subir y guardar tus apuntes." : "Es gratis. Solo necesitas un correo.";
    $("#authSubmit").textContent = mode === "login" ? "Entrar" : "Crear cuenta";
    $$(".modal .signup-only").forEach((el) => { el.hidden = mode !== "signup"; });
    setMsg("", "");
  }));

  const setMsg = (txt, cls) => { const m = $("#authMsg"); m.textContent = txt; m.className = "msg " + (cls || ""); };

  function renderUser(user) {
    currentUser = user;
    const chip = $("#userChip"), loginBtn = $("#loginNavBtn");
    if (user) {
      const meta = user.user_metadata || {};
      const name = user.username || meta.username || meta.full_name || user.email || "Estudiante";
      chip.classList.add("show");
      loginBtn.style.display = "none";
      $("#userEmail").textContent = name;
      $("#userAv").textContent = (name[0] || "U").toUpperCase();
      $("#panelBtn").hidden = false;   // engranaje → panel.html
    } else {
      chip.classList.remove("show");
      loginBtn.style.display = "";
      $("#panelBtn").hidden = true;
    }
  }

  // ---- DEMO store ----
  const demoStore = {
    user: () => JSON.parse(localStorage.getItem("hub-demo-user") || "null"),
    setUser: (u) => localStorage.setItem("hub-demo-user", JSON.stringify(u)),
    clearUser: () => localStorage.removeItem("hub-demo-user"),
    apuntes: () => JSON.parse(localStorage.getItem("hub-demo-apuntes") || "[]"),
    addApunte: (a) => { const l = demoStore.apuntes(); l.unshift(a); localStorage.setItem("hub-demo-apuntes", JSON.stringify(l)); },
  };

  // ---- email login ----
  $("#authSubmit").addEventListener("click", async () => {
    const email = $("#authEmail").value.trim();
    const pass = $("#authPass").value;
    const isSignup = mode === "signup";
    const username = $("#authUser").value.trim();
    const pass2 = $("#authPass2").value;

    if (!email || !pass) { setMsg("Completa correo y contraseña.", "err"); return; }
    if (isSignup) {
      if (!username) { setMsg("Elegí un nombre de usuario.", "err"); return; }
      if (pass.length < 6) { setMsg("La contraseña debe tener al menos 6 caracteres.", "err"); return; }
      if (pass !== pass2) { setMsg("Las contraseñas no coinciden.", "err"); return; }
    }
    setMsg("Procesando…", "");
    if (DEMO) {
      const u = { email, username: isSignup ? username : undefined };
      demoStore.setUser(u);
      renderUser(u);
      setMsg("Listo (modo demo).", "ok");
      setTimeout(closeModal, 700); loadApuntes(); return;
    }
    try {
      if (isSignup) {
        const { error } = await sb.auth.signUp({ email, password: pass, options: { data: { username } } });
        if (error) throw error;
        setMsg("Cuenta creada. Ya podés iniciar sesión.", "ok");
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        setMsg("Bienvenido.", "ok");
        setTimeout(closeModal, 600);
      }
    } catch (err) { setMsg(traducirError(err.message), "err"); }
  });

  // ---- Google login ----
  $("#googleBtn").addEventListener("click", async () => {
    if (DEMO) {
      demoStore.setUser({ email: "demo.google@gmail.com" });
      renderUser({ email: "demo.google@gmail.com" });
      setMsg("Listo (modo demo).", "ok");
      setTimeout(closeModal, 700); loadApuntes(); return;
    }
    setMsg("Redirigiendo a Google…", "");
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href.split("#")[0] },
    });
    if (error) setMsg(error.message, "err");
  });

  function traducirError(m = "") {
    if (/invalid login/i.test(m)) return "Correo o contraseña incorrectos.";
    if (/already registered/i.test(m)) return "Ese correo ya tiene cuenta. Inicia sesión.";
    if (/password should be at least/i.test(m)) return "La contraseña debe tener al menos 6 caracteres.";
    if (/provider is not enabled/i.test(m)) return "Activa el proveedor Google en Supabase (Authentication → Providers).";
    return m;
  }

  // ---- logout ----
  $("#logoutBtn").addEventListener("click", async () => {
    if (DEMO) { demoStore.clearUser(); renderUser(null); loadApuntes(); return; }
    await sb.auth.signOut();
    renderUser(null);
  });

  // ---- init sesión ----
  async function initAuth() {
    if (DEMO) { renderUser(demoStore.user()); return; }
    const { data } = await sb.auth.getSession();
    renderUser(data.session ? data.session.user : null);
    sb.auth.onAuthStateChange((_e, session) => { renderUser(session ? session.user : null); loadApuntes(); });
  }

  /* ---------- Listar apuntes (lista pública) ---------- */
  const fileIconName = (name = "") => {
    const e = name.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(e)) return "image";
    if (["xls", "xlsx", "csv"].includes(e)) return "sheet";
    return "file";
  };
  const fmtSize = (b) => !b ? "" : b > 1e6 ? (b / 1e6).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";

  async function loadApuntes() {
    const list = $("#apunteList"), count = $("#apuntesCount");
    let items = [];
    if (DEMO) {
      items = demoStore.apuntes();
    } else {
      const { data, error } = await sb.from("apuntes").select("*").order("created_at", { ascending: false }).limit(100);
      if (!error && data) items = data.map((d) => ({ titulo: d.titulo, materia: d.materia, name: (d.file_path || "").split("/").pop(), url: d.url }));
    }
    if (!items.length) {
      list.innerHTML = `<div class="empty">Todavía no hay apuntes. Sé el primero en subir uno.</div>`;
      count.textContent = "0 apuntes"; return;
    }
    count.textContent = items.length + (items.length === 1 ? " apunte" : " apuntes");
    list.innerHTML = items.map((a) => `
      <div class="apunte-item">
        <div class="fico">${icon(fileIconName(a.name), 20)}</div>
        <div class="meta">
          <b>${escapeHtml(a.titulo)}</b>
          <span>${escapeHtml(a.materia || "General")}${a.size ? " · " + fmtSize(a.size) : ""}</span>
        </div>
        <a class="dl" href="${a.url || "#"}" ${a.url && a.url !== "#" ? 'target="_blank" rel="noopener"' : ""}>Abrir</a>
      </div>`).join("");
  }
  function escapeHtml(s = "") { return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  /* ---------- Contacto (Formspree / mailto) ---------- */
  const cForm = $("#contactForm");
  if (cForm) {
    cForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#cName").value.trim(), email = $("#cEmail").value.trim(), mensaje = $("#cMsg").value.trim();
      const st = $("#cStatus");
      if (!name || !email || !mensaje) { st.className = "msg err"; st.textContent = "Completá todos los campos."; return; }
      const cfg = C.contacto || {};
      if (!cfg.formspree) {
        const to = cfg.email || "nvalentinabaudino@gmail.com";
        location.href = `mailto:${to}?subject=${encodeURIComponent("Contacto Valía · " + name)}&body=${encodeURIComponent(mensaje + "\n\nDe: " + name + " (" + email + ")")}`;
        return;
      }
      const btn = $("#cSend"); btn.disabled = true;
      st.className = "msg"; st.textContent = "Enviando…";
      try {
        const r = await fetch(cfg.formspree, { method: "POST", headers: { "Accept": "application/json" }, body: JSON.stringify({ nombre: name, email, mensaje }) });
        if (r.ok) { st.className = "msg ok"; st.textContent = "¡Mensaje enviado! Gracias, te respondemos pronto."; $("#cName").value = ""; $("#cEmail").value = ""; $("#cMsg").value = ""; }
        else { st.className = "msg err"; st.textContent = "No se pudo enviar. Intentá de nuevo más tarde."; }
      } catch (_) { st.className = "msg err"; st.textContent = "No se pudo enviar. Revisá tu conexión."; }
      finally { btn.disabled = false; }
    });
  }

  /* ---------- Init ---------- */
  observeReveals();
  initAuth();
  loadApuntes();
})();
