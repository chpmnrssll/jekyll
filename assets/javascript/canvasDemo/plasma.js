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

    // Precalc y*width values for each horizontal line
    window.demo.yIndex = []
    for (let y = 0; y < window.demo.canvas.height; y++) {
      window.demo.yIndex[y] = y * window.demo.canvas.width
    }

    // Precalc 256 color palette r,g,b values
    window.demo.palette = {}
    for (let i = 0; i < 256; i++) {
      window.demo.palette[i] = {}
      window.demo.palette[i].r = ~~(128 + 128 * Math.sin(Math.PI * i / 64))
      window.demo.palette[i].g = ~~(128 + 128 * Math.sin(Math.PI * i / 96))
      window.demo.palette[i].b = ~~(128 + 128 * Math.sin(Math.PI * i / 128))
    }

    // Precalc Math.sin table
    window.demo.sinc = {}
    for (let i = 0; i < 1800; i++) {
      window.demo.sinc[i] = (Math.sin((Math.PI * i) / 180) * 1024)
    }

    window.demo.tmp = 0

    window.demo.update()
  },
  update: function () {
    window.demo.tmp = (window.demo.tmp + 1) % 720

    // Main loop with optimized magic plasma color formula
    for (let y = 0; y < window.demo.canvas.height; y++) {
      let yc = 128 + ((window.demo.sinc[(y << 1) + (window.demo.tmp >> 1)] + window.demo.sinc[y + (window.demo.tmp << 1)] + (window.demo.sinc[(y >> 1) + window.demo.tmp] << 1)) >> 6)
      for (let x = 0; x < window.demo.canvas.width; x++) {
        let xc = 128 + (((window.demo.sinc[x + (window.demo.tmp << 1)] << 1) + window.demo.sinc[(x << 1) + (window.demo.tmp >> 1)] + (window.demo.sinc[x + window.demo.tmp] << 1)) >> 6)

        let index = (window.demo.yIndex[y] + x) << 2
        let color = Math.abs(((yc * xc) >> 5) % 255)
        window.demo.buffer.data[index++] = window.demo.palette[color].r
        window.demo.buffer.data[index++] = window.demo.palette[color].g
        window.demo.buffer.data[index++] = window.demo.palette[color].b
        window.demo.buffer.data[index++] = 255
      }
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
