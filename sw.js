this.importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)

  workbox.routing.registerRoute(
    new RegExp('.*.(?:html|css|js)'),
    workbox.strategies.staleWhileRevalidate()
    // workbox.strategies.networkFirst()
    // workbox.strategies.cacheFirst()
  )

  workbox.routing.registerRoute(
    new RegExp('.*.(?:png|jpg|jpeg|svg|gif)'),
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          // maxEntries: 256,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({ cacheName: 'googleapis' })
  )
} else {
  console.log(`Boo! Workbox didn't load`)
}
