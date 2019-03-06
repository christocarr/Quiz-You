const CACHE_NAME = 'cache-v4';
const CACHE_ASSETS = [
  '/',
  'index.html',
  'css/main.css',
  'scripts/index.js',
  'data/questions.js',
  'manifest.json'
];

self.addEventListener('install', ev => {
  console.log('Service worker install event');
  ev.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CACHE_ASSETS);
      })
      .then(cache => {
        console.log('Assets cached', cache);
      })
      // .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', ev => {
  ev.respondWith(caches.match(ev.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(ev.request);
    })
  );
});

// self.addEventListener('activate', ev => {
//   //remove unwanted caches
//   ev.waitUntil(
//     caches.keys().then(CACHE_NAME => {
//       return Promise.all(
//         CACHE_NAME.map(cache => {
//           if(cache != CACHE_NAME) {
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (ev) => {
//   console.log('fetch', ev.request.url);
//  ev.respondWith(
//    caches.match(ev.request)
//    .then(response => {
//      if(response) {
//        console.log('Found response in cache:', response);
//        return response;
//      }
//      console.log('No response found in cache. About to fetch from network...');
//      return fetch(ev.request)
//      .then(response => {
//         console.log('Response from network is:', response);
//         return response;
//      }, (error) => {
//         console.log('Fetching failed:', error);
//         throw error;
//       });
//    })
//  );
// });