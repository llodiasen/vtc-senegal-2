// Service Worker basique pour PWA
// Version du cache pour invalidation
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const ROUTES_CACHE = `routes-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Assets statiques à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Les fichiers CSS et JS seront ajoutés automatiquement par Next.js
];

// Routes principales à mettre en cache
const ROUTES_TO_CACHE = [
  '/',
  '/auth/login',
  '/auth/verify',
  '/booking/new',
  '/history',
  '/profile',
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(ROUTES_CACHE).then((cache) => {
        console.log('[Service Worker] Caching routes');
        // Cache les routes principales (sera complété dynamiquement lors de la navigation)
        return Promise.all(
          ROUTES_TO_CACHE.map((route) =>
            fetch(route).catch(() => null).then((response) => {
              if (response && response.ok) {
                return cache.put(route, response);
              }
            })
          )
        );
      }),
    ])
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Supprimer les anciens caches
              return (
                cacheName.startsWith('static-') ||
                cacheName.startsWith('routes-') ||
                cacheName.startsWith('api-') ||
                cacheName.startsWith('images-')
              ) && !cacheName.includes(CACHE_VERSION);
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Prendre le contrôle de toutes les pages
      self.clients.claim(),
    ])
  );
});

// Stratégie Network-First pour les requêtes API
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      try {
        const cache = await caches.open(API_CACHE);
        cache.put(request, response.clone());
      } catch (cacheError) {
        // Ignorer les erreurs de cache (ex: chrome-extension)
        console.log('[Service Worker] Cache error (ignored):', cacheError);
      }
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stratégie Stale-While-Revalidate pour les routes
async function staleWhileRevalidate(request) {
  const cache = await caches.open(ROUTES_CACHE);
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        try {
          cache.put(request, response.clone());
        } catch (cacheError) {
          // Ignorer les erreurs de cache (ex: chrome-extension)
          console.log('[Service Worker] Cache error (ignored):', cacheError);
        }
      }
      return response;
    })
    .catch(() => {
      // En cas d'erreur réseau, retourner le cache si disponible
      return cachedResponse;
    });

  // Retourner le cache immédiatement si disponible, sinon attendre la réponse réseau
  return cachedResponse || fetchPromise;
}

// Stratégie Cache-First pour les images
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      try {
        const cache = await caches.open(IMAGE_CACHE);
        cache.put(request, response.clone());
      } catch (cacheError) {
        // Ignorer les erreurs de cache (ex: chrome-extension)
        console.log('[Service Worker] Cache error (ignored):', cacheError);
      }
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Failed to fetch image:', error);
    throw error;
  }
}

// Gestion des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes non-HTTP/HTTPS (chrome-extension, etc.)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Ignorer les requêtes vers _next/ (gérées par Next.js)
  if (url.pathname.startsWith('/_next/')) {
    return;
  }

  // Stratégie pour les API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Stratégie pour les images
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stratégie pour les routes (pages HTML)
  // Utiliser stale-while-revalidate pour un meilleur UX
  if (
    request.mode === 'navigate' ||
    (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      staleWhileRevalidate(request).catch(async () => {
        // Si tout échoue, retourner la page offline
        const offlinePage = await caches.match('/offline.html');
        if (offlinePage) {
          return offlinePage;
        }
        // Fallback si offline.html n'est pas en cache
        return new Response(
          '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Hors ligne</title></head><body><h1>Vous êtes hors ligne</h1><p>Votre connexion Internet semble interrompue.</p></body></html>',
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          }
        );
      })
    );
    return;
  }

  // Ignorer les requêtes vers _next (fichiers Next.js internes)
  // Ils sont gérés automatiquement par Next.js
  if (url.pathname.startsWith('/_next/')) {
    return;
  }

  // Stratégie Network-First pour les autres ressources
  event.respondWith(networkFirst(request));
});
