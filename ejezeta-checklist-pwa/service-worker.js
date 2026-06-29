const CACHE_NAME = 'ez-revision-depto-v1';
const APP_ASSETS = [
  './', './index.html', './manifest.json', './service-worker.js',
  './logo-nuevo-ez-circulo.jpeg', './icon-192.png', './icon-512.png', './icon-180.png', './icon-32.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
