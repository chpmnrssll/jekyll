---
---
const shellVersion = "v1.0";
const shellUrl = "/index.html";
const dataUrl = "/";

class app {
  constructor() {
    if ("serviceWorker" in navigator) {
      // Browser supports service worker API
      if (!navigator.serviceWorker.controller) {
        // No service worker registered. Override default scope of "/" with "./"
        navigator.serviceWorker.register("service-worker.js", { scope: "./" }).then((registration) => {
          // Service worker is registered
        }).catch((error) => {
          // Service worker registration failed
        });
      }
      this.fetch("shell", shellUrl);
      this.fetch("data", dataUrl);
    }
  }


  cache(key, value) {
    console.log(key, value);
    localStorage.setItem(key, value);
  }


  // "Cache then network" fetch strategy
  fetch(key, url) {
    if ("caches" in window) {
      // Browser supports caches API
      caches.match(url).then((value) => {
        // Cached data exists for this url
        this[key] = value;
      });
    }

    // Request the latest data
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          console.log("App: Cached data updated");
          this[key] = request.response;
          this.cache(key, this[key]);
        } else {
          console.log("App: Cached data is current");
        }
      }
      request.open("GET", url);
      request.send();
    }
  }


}

let myApp = new app();
