importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js')

if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)

  workbox.routing.registerRoute(
    /.*\.(?:html|css|js)/,
    // /.*\.*/,
    // workbox.strategies.cacheFirst()
    workbox.strategies.staleWhileRevalidate()
  )

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst()
  )

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30
        })
      ]
    })
  )
} else {
  console.log(`Boo! Workbox didn't load`)
}
