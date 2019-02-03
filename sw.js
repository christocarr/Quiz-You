const CACHE_NAME = 'cache-v2';
const CACHE_ASSETS = [
  'index.html',
  '/css/main.css',
  '/scripts',
  '/data',
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        cache.addAll(CACHE_ASSETS);
      })
      .then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  //remove unwanted caches
  ev.waitUntil(
    caches.keys().then(CACHE_NAME => {
      return Promise.all(
        CACHE_NAME.map(cache => {
          if(cache != CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', ev => {
  ev.respondWith(
    fetch(ev.request).catch(() => caches.match(ev.request))
  );
});

