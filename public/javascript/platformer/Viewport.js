class Viewport {
  constructor (width = 256, height = 256, scale = 1.0) {
    this.x = width / 2
    this.y = height / 2
    this.scale = scale
    this.width = width
    this.height = height
  }
  // get height () { return this.height * this.scale }
  // set height (h) { this.height = h / 2 }
  // get width () { return this.width * this.scale }
  // set width (w) { this.width = w / 2 }
}
