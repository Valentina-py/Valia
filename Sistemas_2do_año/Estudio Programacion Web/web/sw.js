const CACHE = "valia-programacion-web-v1";
const ASSETS = ["./", "index.html", "data.js", "../../_shared/course.css", "../../_shared/course.js", "../../../favicon.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("valia-programacion-web-") && key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener("fetch", event => { if (event.request.method === "GET") event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request))); });
