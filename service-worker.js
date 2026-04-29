/* ============================================================
   Solar Mason — Service Worker
   Strategy: stale-while-revalidate for HTML, cache-first for
   static assets (icons, OG images, fonts). Offline fallback
   serves the homepage.
   ============================================================ */

const VERSION = 'v1.0.0';
const STATIC_CACHE = `sm-static-${VERSION}`;
const RUNTIME_CACHE = `sm-runtime-${VERSION}`;

// Pre-cached assets — keep this list small to avoid install timeouts.
const PRECACHE = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-192-maskable.png',
  '/assets/icons/icon-512-maskable.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/og-card.png'
];

// ── Install: pre-cache critical shell assets ─────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[SW] precache failed:', err))
  );
});

// ── Activate: clean up old caches ────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: routing strategy ──────────────────────────────────
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GETs over http(s); pass everything else through.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!url.protocol.startsWith('http')) return;

  // Don't intercept third-party requests (analytics, fonts, chatbot, etc.)
  // The browser handles those directly.
  if (url.origin !== self.location.origin) return;

  // HTML navigation: stale-while-revalidate with offline fallback
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        fetch(req).then((networkRes) => {
          if (networkRes.ok) cache.put(req, networkRes.clone());
          return networkRes;
        }).catch(() =>
          cache.match(req).then((cached) => cached || cache.match('/'))
        )
      )
    );
    return;
  }

  // Static assets (icons, images, css, js, fonts): cache-first
  const isStatic =
    url.pathname.startsWith('/assets/') ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/i.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached || fetch(req).then((networkRes) => {
          if (networkRes.ok) {
            const copy = networkRes.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return networkRes;
        })
      )
    );
    return;
  }

  // Everything else: network-first with cache fallback
  event.respondWith(
    fetch(req).then((networkRes) => {
      if (networkRes.ok) {
        const copy = networkRes.clone();
        caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
      }
      return networkRes;
    }).catch(() => caches.match(req))
  );
});

// Allow the page to trigger an SW update via postMessage
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
