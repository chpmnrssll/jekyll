this.importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)

  workbox.routing.registerRoute(
    new RegExp('.*.(?:html|css|js)'),
    // workbox.strategies.networkFirst({ cacheName: 'static' })
    // workbox.strategies.cacheFirst({ cacheName: 'static' })
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'static',
      plugins: [
        new workbox.broadcastUpdate.Plugin('update-static')
      ]
    })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.(?:png|jpg|jpeg|svg|gif)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.broadcastUpdate.Plugin('update-images')
      ]
    })
  )

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({ cacheName: 'googleapis' })
  )
}

self.addEventListener('message', event => {
  if (event.data) {
    switch (event.data) {
      case 'skipWaiting':
        self.skipWaiting()
        break
      default:
        break
    }
  }
})
