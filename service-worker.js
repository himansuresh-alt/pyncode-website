const CACHE_NAME = "pyncode-v1";

const APP_FILES = [
  "/",
  "/index.html",
  "/category.html",
  "/category-shop-current-offer.html",
  "/services.html",
  "/promotion.html",
  "/promotion-category.html",
  "/promotion-admin-login.html",
  "/promotion-poster-manager.html",
  "/list-your-shop.html",
  "/list-your-service.html",
  "/shopowner-create-account.html",
  "/shopowner-upload-login.html",
  "/shop-offer-upload.html",
  "/shop-offer-admin.html",
  "/admin-login.html",
  "/admin-dashboard.html",
  "/banner-upload.html",
  "/banner-manager.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});