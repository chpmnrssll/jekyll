this.importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

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

if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)

  const broadcastUpdate = new workbox.broadcastUpdate.Plugin('update')

  workbox.routing.registerRoute(
    new RegExp('.*.(?:html|css|js)'),
    // workbox.strategies.networkFirst({ cacheName: 'static' })
    workbox.strategies.networkFirst({
      cacheName: 'static',
      plugins: [ broadcastUpdate ]
    })
    // workbox.strategies.staleWhileRevalidate({
    //   cacheName: 'static',
    //   plugins: [ broadcastUpdate ]
    // })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.(?:png|jpg|jpeg|svg|gif)'),
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [ broadcastUpdate ]
    })
    // workbox.strategies.staleWhileRevalidate({
    //   cacheName: 'images',
    //   plugins: [ broadcastUpdate ]
    // })
  )

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis'
    })
  )

  workbox.precaching.precacheAndRoute([
    {
      'url': '404.html',
      'revision': 'fb56716fbe7e0d6a96973b6d2d2f1b77'
    }, {
      'url': 'public/css/style.css',
      'revision': 'e5f4ab7c51321235e324ccde31adc87b'
    }, {
      'url': 'public/javascript/main.js',
      'revision': '00224c77214d55e9d488fd87735ea179'
    }, {
      'url': 'public/javascript/vendor/page/page.js',
      'revision': '0c1064a437446f76206a6b6ec5f7731e'
    }, {
      'url': 'index.html',
      'revision': 'fa639c4d141be4dbc8f368c6776cfc24'
    }, {
      'url': 'manifest.json',
      'revision': 'd8ec21e16e18887159fd2dab8551c5bc'
    }
  ])
}
