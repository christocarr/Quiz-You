const CACHE_NAME = 'cache-v4';
//these urls do not work for gh-pages because of prefixes
//eg /get-quizzed/index.html
const CACHE_ASSETS = [
  '/get-quizzed/',
  '/get-quizzed/index.html',
  '/get-quizzed//css/main.css',
  '/get-quizzed//scripts/index.js',
  '/get-quizzed//data/questions.js',
  '/get-quizzed//manifest.json'
];

self.addEventListener('install', ev => {
  console.log('Service worker install event', ev);
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
