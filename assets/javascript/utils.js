// https://developer.mozilla.org/en-US/docs/Web/API/NodeList

if (typeof window.NodeList.prototype.addEventListener === 'undefined') {
  window.NodeList.prototype.addEventListener = function (event, callback, options) {
    this.forEach((element) => {
      element.addEventListener(event, callback, options)
    })
  }
}

if (typeof window.NodeList.prototype.removeAllChildren === 'undefined') {
  window.NodeList.prototype.removeAllChildren = function (event, callback, options) {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
  }
}

if (typeof window.NodeList.prototype.forEach === 'undefined') {
  window.NodeList.prototype.forEach = Array.prototype.forEach
}

if (typeof window.NodeList.prototype.find === 'undefined') {
  window.NodeList.prototype.find = Array.prototype.find
}

if (typeof window.NodeList.prototype.reverse === 'undefined') {
  window.NodeList.prototype.reverse = Array.prototype.reverse
}

if (typeof window.HTMLCollection.prototype.forEach === 'undefined') {
  window.HTMLCollection.prototype.forEach = Array.prototype.forEach
}

// memoize (fn) {
//   let cache = {}
//   return (...args) => {
//     let stringifiedArgs = JSON.stringify(args)
//     let result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args)
//     return result
//   }
// }
