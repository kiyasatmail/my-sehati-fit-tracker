const CACHE_NAME = 'sehati-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/lovable-uploads/805f9bde-f349-4631-80f4-0d524ebd9ec8.png',
  // Core app files
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  '/src/components/Navigation.tsx',
  '/src/components/Header.tsx',
  '/src/components/HeroSection.tsx',
  '/src/components/NewHeroSection.tsx',
  '/src/components/CalorieCalculator.tsx',
  '/src/components/BodyMeasurements.tsx',
  '/src/components/CardioConverter.tsx',
  '/src/components/WeeklyProgram.tsx',
  '/src/contexts/LanguageContext.tsx',
  '/src/index.css',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // For network requests, try to fetch and cache
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Cache commonly used resources
                if (event.request.url.includes('.js') || 
                    event.request.url.includes('.css') || 
                    event.request.url.includes('.png') || 
                    event.request.url.includes('.jpg') ||
                    event.request.url.includes('.jpeg') ||
                    event.request.url.includes('.svg') ||
                    event.request.url.includes('fonts.googleapis.com')) {
                  cache.put(event.request, responseToCache);
                }
              });
            
            return response;
          })
          .catch(() => {
            // Offline fallback - return index.html for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            // Return a basic offline response for other requests
            return new Response('عذراً، هذا المحتوى غير متوفر في وضع عدم الاتصال', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
          });
      }
    )
  );
});

// Handle cache cleanup
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});