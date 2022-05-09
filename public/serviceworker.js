const CORE_CACHE_NAME = 'core-cache';
const CORE_ASSETS = [
    '/',
    '/images/icon.png',
    '/css/mainStyles.css',
    '/manifest.json',
    '/offline'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
        .then(cache => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', event => {
    console.log(event)
})
   
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
        })
        .catch(function(err) {
            console.log('ServiceWorker registration failed: ', err)
            return caches.match('/offline')
        })
    )
})