/* Service Worker — Estudio Redes (PWA offline)
   Estrategia:
   - HTML / CSS / JS: "network-first" (siempre intenta lo último; offline → copia guardada).
   - Íconos / manifest: "cache-first" (carga instantánea).
   Al cambiar el contenido, subí el número de versión (CACHE) para forzar el refresco. */
const CACHE = "redes-v13";
const ASSETS = [
  "./", "./index.html",
  "./css/styles.css",
  "./js/data.js", "./js/decks.js", "./js/practice.js", "./js/labs.js", "./js/lab-sim.js", "./js/net-sim.js", "./js/tools.js", "./js/games.js", "./js/app.js",
  "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFresh = req.mode === "navigate" || url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".js") || url.pathname.endsWith(".css");

  if (isFresh) {
    // network-first; offline → cache (y como fallback de navegación, el index)
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then((m) => m || caches.match("./index.html")))
    );
  } else {
    // cache-first
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((m) => m || fetch(req).then((res) => {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
      }))
    );
  }
});
