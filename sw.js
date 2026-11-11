var CACHE = 'rastgele-ayet-v1';
var FILES = ['./', './index.html', './data-1.js', './data-2.js'];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }).then(function() { return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.map(function(k) { if (k !== CACHE) return caches.delete(k); }));
  }).then(function() { return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function(r) {
    return r || fetch(e.request);
  }));
});
