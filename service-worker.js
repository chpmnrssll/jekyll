---
---
const appCacheName = "appCache-v1";
const dataCacheName = "dataCache-v1";
const dataUrl = "{{ '/' | relative_url }}/data";

const appCacheFiles = [
  "/",
  "/index.html",
  "/assets/js/main.js",
  "/assets/css/style.css"
];

self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(appCacheName).then(function(cache) {
    return cache.addAll(appCacheFiles);
  }));
});

self.addEventListener("activate", function(event) {
  event.waitUntil(caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      // Remove old caches if their key is not current
      if (key !== appCacheName && key !== dataCacheName) {
        return caches.delete(key);
      }
    }));
  }));

  // Fixes a corner case in which the app wasn't returning the latest data. You
  // can reproduce this by commenting out the line below and then doing the
  // following steps: 1) load app for first time so that the initial data is
  // shown 2) press the refresh button on the app 3) go offline 4) reload the app.
  // You expect to see the newer data, but you get the initial data. This happens
  // because the service worker is not activated yet.
  // The code below essentially lets you activate the service worker faster.
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  //console.log("[Service Worker] Fetch", event.request.url);
  if (event.request.url.indexOf(dataUrl) > -1) {
    // Request is for a dataUrl, follow the "Cache then network" strategy:
    // https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
    event.respondWith(caches.open(dataCacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request.url, response.clone());
        return response;
      });
    }));
  } else {
    // Request for app shell, "Cache, falling back to network" offline strategy:
    // https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
    event.respondWith(caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }));
  }
});
