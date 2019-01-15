class Static {
  constructor (width = 256, height = 256) {
    this.canvas = document.querySelector('.canvasDemo')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.centerX = width / 2
    this.canvas.centerY = height / 2
    this.context2D = this.canvas.getContext('2d')
    this.context2D.imageSmoothingEnabled = false
    this.buffer = this.context2D.createImageData(width, height)
    this.buffer.size = width * height * 4
    this.buffer.lineHeight = width * 4
    this.running = true
    this.update()
  }

  update () {
    // Pick random shade for every pixel (0-255)
    for (let i = 0; i < this.buffer.size; i++) {
      let c = Math.floor(Math.random() * 255)
      let index = i * 4
      this.buffer.data[index++] = c
      this.buffer.data[index++] = c
      this.buffer.data[index++] = c
      this.buffer.data[index++] = 255
    }

    // Flip buffer to canvas
    this.context2D.putImageData(this.buffer, 0, 0)

    if (this.running) {
      window.requestAnimationFrame(this.update.bind(this))
    }
  }

  stop () {
    this.running = false
  }
}

window.demo = new Static(320, 180)
