import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered successfully:', registration);
        
        // Check for updates every 30 seconds
        setInterval(() => {
          registration.update();
        }, 30000);
        
        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SW_UPDATED') {
            window.location.reload();
          }
        });
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content is available; refreshing automatically...');
                // Auto-refresh for immediate updates
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed:', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
