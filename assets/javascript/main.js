---
---
(() => {
  {% include_relative nodeList.js %}
  {% include_relative scrollTo.js %}
  {% include_relative parallax.js %}
  {% include_relative themeColors.js %}

  // if (navigator.serviceWorker) {
  //   navigator.serviceWorker.register("/sw.js").catch(function(error) {
  //     console.error("Unable to register service worker.", error);
  //   });
  // }

})();
