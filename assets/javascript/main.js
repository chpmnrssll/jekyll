---
---
window.addEventListener('load', (event) => {
  {% include_relative vendor/page/page.js %}
  {% include_relative nodeList.js %}
  {% include_relative scrollTo.js %}
  {% include_relative routes.js %}
  {% include_relative sideNav.js %}

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
      console.error('Unable to register service worker.', error)
    })
  }
})
