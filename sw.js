const CACHE_VERSION = 'v2';
const SHELL_CACHE = `prabhu-portfolio-shell-${CACHE_VERSION}`;
const IMAGE_CACHE = `prabhu-portfolio-images-${CACHE_VERSION}`;

const SHELL_URLS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/css/swiper-bundle.min.css',
    '/assets/js/main.js',
    '/assets/js/swiper-bundle.min.js',
    '/manifest.json'
];

const IMAGE_URLS = [
    '/assets/img/perfil.png',
    '/assets/img/about.png',
    '/assets/img/ps.jpeg',
    '/assets/img/DLG.svg'
];

// Install — pre-cache shell and images separately
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL_URLS)),
            caches.open(IMAGE_CACHE).then(cache => cache.addAll(IMAGE_URLS))
        ])
    );
    self.skipWaiting();
});

// Activate — clean up any old caches from previous versions
self.addEventListener('activate', event => {
    const validCaches = [SHELL_CACHE, IMAGE_CACHE];
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => !validCaches.includes(name))
                    .map(name => caches.delete(name))
            )
        )
    );
    self.clients.claim();
});

// Fetch — stale-while-revalidate for shell, cache-first for images
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Only handle same-origin requests
    if (url.origin !== location.origin) return;

    const isImage = /\.(png|jpe?g|gif|svg|webp)$/i.test(url.pathname);

    if (isImage) {
        // Cache-first for images (they change rarely)
        event.respondWith(
            caches.open(IMAGE_CACHE).then(cache =>
                cache.match(request).then(cached => {
                    if (cached) return cached;
                    return fetch(request).then(response => {
                        if (response.ok) cache.put(request, response.clone());
                        return response;
                    });
                })
            )
        );
    } else {
        // Stale-while-revalidate for HTML/CSS/JS — serve cached immediately,
        // update cache in background so next visit gets fresh content
        event.respondWith(
            caches.open(SHELL_CACHE).then(cache =>
                cache.match(request).then(cached => {
                    const networkFetch = fetch(request).then(response => {
                        if (response.ok) cache.put(request, response.clone());
                        return response;
                    });
                    return cached || networkFetch;
                })
            )
        );
    }
});

