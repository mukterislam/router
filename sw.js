const CACHE_NAME = 'router-v3';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// ফাইলগুলো ক্যাশ করা
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// নেট না থাকলেও ক্যাশ থেকে ফাইল দেখানো
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
