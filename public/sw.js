const CACHE_NAME = 'sehati-v3';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/lovable-uploads/805f9bde-f349-4631-80f4-0d524ebd9ec8.png'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching essential resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Fetch event - handle requests with cache-first strategy
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }

        console.log('Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response before caching
            const responseToCache = response.clone();
            
            // Cache specific types of resources
            const url = event.request.url;
            if (url.includes('.js') || 
                url.includes('.css') || 
                url.includes('.png') || 
                url.includes('.jpg') ||
                url.includes('.jpeg') ||
                url.includes('.svg') ||
                url.includes('.woff') ||
                url.includes('.woff2') ||
                url.includes('fonts.googleapis.com') ||
                url === self.location.origin + '/') {
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(error => {
            console.log('Network request failed, serving offline content:', error);
            
            // For navigation requests, return the cached index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/').then(cachedIndex => {
                if (cachedIndex) {
                  return cachedIndex;
                }
                // Fallback offline page
                return new Response(`
                  <!DOCTYPE html>
                  <html lang="ar" dir="rtl">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>صحتي - غير متصل</title>
                    <style>
                      body { font-family: 'Cairo', sans-serif; text-align: center; padding: 50px; background: #f0f9f4; }
                      .offline { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto; }
                      .icon { font-size: 64px; margin-bottom: 20px; }
                      h1 { color: #22c55e; margin-bottom: 15px; }
                      p { color: #666; line-height: 1.6; }
                    </style>
                  </head>
                  <body>
                    <div class="offline">
                      <div class="icon">📱</div>
                      <h1>تطبيق صحتي</h1>
                      <p>أنت غير متصل بالإنترنت حالياً</p>
                      <p>بعض الميزات قد تكون محدودة</p>
                      <button onclick="window.location.reload()" style="background: #22c55e; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; margin-top: 20px;">حاول مرة أخرى</button>
                    </div>
                  </body>
                  </html>
                `, {
                  headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
              });
            }
            
            // For other requests, return a simple error response
            return new Response('غير متوفر في وضع عدم الاتصال', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
          });
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ])
  );
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});