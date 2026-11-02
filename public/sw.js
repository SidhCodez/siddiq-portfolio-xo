/*
 * Siddiq — Portfolio service worker.
 *
 * Strategy:
 *  - App shell / offline page are precached on install.
 *  - Navigations are network-first, falling back to the cached page and then
 *    to /offline when the network is unavailable.
 *  - Hashed Next.js assets, fonts, and images are cache-first.
 *  - Everything else same-origin is stale-while-revalidate.
 *
 * Bump VERSION to invalidate old caches on the next visit.
 */
const VERSION = "v1";
const PRECACHE = `siddiq-precache-${VERSION}`;
const RUNTIME = `siddiq-runtime-${VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
];

const CACHE_FIRST_DESTINATIONS = new Set([
  "font",
  "image",
  "script",
  "style",
  "manifest",
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      // Cache entries individually so one missing asset cannot fail the install.
      await Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PRECACHE, RUNTIME]);
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => !keep.has(key)).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isCacheFirst(request, url) {
  if (CACHE_FIRST_DESTINATIONS.has(request.destination)) return true;
  if (!isSameOrigin(url)) return false;
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/fonts/")
  );
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const cache = await caches.open(RUNTIME);
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === "opaque")) {
      cache.put(request, response.clone()).catch(() => undefined);
    }
    return response;
  } catch {
    return Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone()).catch(() => undefined);
      }
      return response;
    })
    .catch(() => null);

  // Serve the cached copy immediately and let the network refresh it.
  if (cached) return cached;

  return (await network) || Response.error();
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(RUNTIME);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone()).catch(() => undefined);
    }
    return response;
  } catch {
    return (
      (await cache.match(request)) ||
      (await caches.match(request)) ||
      (await caches.match(OFFLINE_URL)) ||
      Response.error()
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never intercept API calls or Next.js dev/websocket traffic.
  if (isSameOrigin(url) && url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  if (!isSameOrigin(url)) {
    // Cache remote imagery (e.g. Unsplash) so the gallery still works offline.
    if (request.destination === "image") {
      event.respondWith(cacheFirst(request));
    }
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (isCacheFirst(request, url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
