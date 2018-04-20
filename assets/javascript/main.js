---
---
window.addEventListener('load', event => {
  {% include_relative utils.js %}
  {% include_relative navigation.js %}
  {% include_relative imageLoader.js %}
  {% include_relative routes.js %}

  const nav = new Navigation()
  const loader = new ImageLoader()
  loader.lazyLoadImages()

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      if (navigator.serviceWorker.controller) {
        let preventDevToolsReloadLoop = false
        navigator.serviceWorker.addEventListener('controllerchange', event => {
          // Ensure refresh is only called once. This works around a bug in "force update on reload".
          if (!preventDevToolsReloadLoop) {
            preventDevToolsReloadLoop = true
            window.location.reload()
          }
        })

        onNewServiceWorker(registration, () => {
          showRefreshUI(registration)
        })
      }
    })

    let updateChannel = new BroadcastChannel('update')
    updateChannel.addEventListener('message', async (event) => {
      console.log('Update broadcast recieved', event)
      showRefreshUI({ waiting: false })
    })
  }
})

async function showRefreshUI (registration) {
  let button = document.querySelector('.navigation__button--update')
  button.classList.remove('navigation--hidden')
  button.classList.add('navigation--showing')

  button.addEventListener('click', event => {
    button.classList.remove('navigation--showing')
    button.classList.add('navigation--hidden')
    if (registration.waiting) {
      console.log('service worker updated')
      registration.waiting.postMessage('skipWaiting')
    } else {
      console.log('cache updated')
      window.location.reload()
    }
  })
}

function onNewServiceWorker (registration, callback) {
  if (registration.waiting) {
    return callback()
  }

  function listenInstalledStateChange () {
    registration.installing.addEventListener('statechange', event => {
      if (event.target.state === 'installed') {
        // A new service worker is available, inform the user
        callback()
      }
    })
  }

  if (registration.installing) {
    return listenInstalledStateChange()
  }

  registration.addEventListener('updatefound', listenInstalledStateChange)
}
