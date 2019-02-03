let CACHE_NAME = 'cache-v1';
const URLS_TO_CACHE = [
  'index.html',
  'styles.css',
  'index.js',
  'questions.js',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if(response) {
        return response;
      }
      return fetch(event.request)
      .then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        let responseToCache = response.clone();

        caches.open(CACHE_NAME)
        .then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});