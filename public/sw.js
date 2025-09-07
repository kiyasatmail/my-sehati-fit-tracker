// QiyasaT Health App Service Worker - Enhanced for SEO and Performance
const CACHE_NAME = 'qiyasat-v2024.12.07';
const STATIC_CACHE = 'qiyasat-static-v1';
const DYNAMIC_CACHE = 'qiyasat-dynamic-v1';

// Critical resources for offline functionality and SEO
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt',
  '/humans.txt',
  '/security.txt',
  '/lovable-uploads/a6dfe1c6-1bfc-44c5-9886-ffe941b7c0a5.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Dynamic content patterns for caching
const CACHEABLE_PATTERNS = [
  /\/calories/,
  /\/measurements/,
  /\/cardio/,
  /\/program/,
  /\/water/,
  /\/wakeup/,
  /\/items/,
  /\/terms/
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching essential resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Fetch event - handle requests with network-first strategy for HTML, cache-first for assets
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Network-first strategy for HTML documents and API calls
  if (event.request.mode === 'navigate' || 
      event.request.destination === 'document' ||
      url.pathname === '/' ||
      url.pathname.endsWith('.html')) {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If network request is successful, cache the response
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Fallback offline page for navigation requests
            if (event.request.mode === 'navigate') {
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
            }
            
            return new Response('غير متوفر في وضع عدم الاتصال', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
          });
        })
    );
  } else {
    // Cache-first strategy for static assets (JS, CSS, images, fonts)
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
              
              // Cache static assets
              if (url.pathname.includes('.js') || 
                  url.pathname.includes('.css') || 
                  url.pathname.includes('.png') || 
                  url.pathname.includes('.jpg') ||
                  url.pathname.includes('.jpeg') ||
                  url.pathname.includes('.svg') ||
                  url.pathname.includes('.woff') ||
                  url.pathname.includes('.woff2') ||
                  url.hostname.includes('fonts.googleapis.com')) {
                
                caches.open(STATIC_CACHE)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }

              return response;
            })
            .catch(error => {
              console.log('Network request failed for asset:', error);
              return new Response('غير متوفر في وضع عدم الاتصال', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
  }
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
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
  
  // Notify all clients about the update
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'SW_UPDATED' });
    });
  });
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});