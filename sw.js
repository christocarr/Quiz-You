const CACHE_NAME = 'cache-v4';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/scripts/index.js',
  '/data/questions.js',
  '/manifest.json'
];

self.addEventListener('install', ev => {
  console.log('Service worker install event');
  ev.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CACHE_ASSETS);
      })
  );
});

self.addEventListener('fetch', ev => {
  ev.respondWith(caches.match(ev.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(ev.request);
    })
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
