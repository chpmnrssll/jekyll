window.demo = {
  start: function (width, height) {
    window.demo.canvas = document.querySelector('.canvasDemo')
    window.demo.canvas.style.imageRendering = 'pixelated'
    window.demo.canvas.width = width
    window.demo.canvas.height = height
    window.demo.canvas.centerX = window.demo.canvas.width / 2
    window.demo.canvas.centerY = window.demo.canvas.height / 2
    window.demo.context2D = window.demo.canvas.getContext('2d')
    window.demo.context2D.imageSmoothingEnabled = false
    window.demo.buffer = window.demo.context2D.createImageData(window.demo.canvas.width, window.demo.canvas.height)
    window.demo.buffer.size = (window.demo.canvas.width * window.demo.canvas.height) * 4
    window.demo.buffer.lineHeight = window.demo.canvas.width * 4
    window.demo.running = true
    window.demo.update()
  },
  update: function () {
    // Pick random shade for every pixel (0-255)
    for (let i = 0; i < window.demo.buffer.size; i++) {
      let c = Math.floor(Math.random() * 255)
      let index = i * 4
      window.demo.buffer.data[index++] = c
      window.demo.buffer.data[index++] = c
      window.demo.buffer.data[index++] = c
      window.demo.buffer.data[index++] = 255
    }

    // Flip buffer to canvas
    window.demo.context2D.putImageData(window.demo.buffer, 0, 0)

    if (window.demo.running) {
      window.requestAnimationFrame(window.demo.update)
    }
  },
  stop: function () {
    window.demo.running = false
  }
}

window.demo.start(256, 128)
