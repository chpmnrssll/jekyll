---
---
window.addEventListener('load', (event) => {
  {% include_relative utils.js %}
  {% include_relative navigation.js %}
  {% include_relative imageLoader.js %}
  {% include_relative routes.js %}

  const nav = new Navigation()
  const loader = new ImageLoader()
  loader.lazyLoadImages()

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.error('Unable to register service worker.', error)
    })
  }
})
