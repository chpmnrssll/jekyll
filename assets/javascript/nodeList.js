// https://developer.mozilla.org/en-US/docs/Web/API/NodeList

NodeList.prototype.addEventListener = function(event, callback, options) {
  this.forEach((element) => {
    element.addEventListener(event, callback, options);
  });
}

NodeList.prototype.removeAllChildren = function(event, callback, options) {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
}

if (typeof NodeList.prototype.forEach === "undefined") {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (typeof HTMLCollection.prototype.forEach === "undefined") {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}
