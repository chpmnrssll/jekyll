---
---
window.addEventListener('load', (event) => {
  {% include_relative vendor/page.js %}
  {% include_relative nodeList.js %}
  {% include_relative scrollTo.js %}
  {% include_relative themeColors.js %}
  {% include_relative routes.js %}
  {% include_relative starField.js %}
  {% include_relative sideNav.js %}

  // if (navigator.serviceWorker) {
  //   navigator.serviceWorker.register('/sw.js').catch(function (error) {
  //     console.error('Unable to register service worker.', error)
  //   })
  // }
})
