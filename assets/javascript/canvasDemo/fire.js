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

    // Precalc random turbulence values
    window.demo.turbulence = []
    window.demo.turbulenceIndex = 0
    for (let i = 0; i < window.demo.buffer.size / 4; i++) {
      window.demo.turbulence[i] = Math.random() + 0.5
      window.demo.turbulence[i] *= (Math.cos(1 / i) + 1) / 2
    }

    window.demo.update()
  },
  update: function () {
    // Fill bottom line of buffer with random fire colors
    for (let x = 0; x < window.demo.canvas.width; x++) {
      let index = (window.demo.yIndex[window.demo.canvas.height - 1] + x) << 2
      let c = Math.floor(Math.random() * 255)
      window.demo.buffer.data[index++] = c * 1.6
      window.demo.buffer.data[index++] = c * 0.8
      window.demo.buffer.data[index++] = c * 0.4
      window.demo.buffer.data[index++] = 255
    }

    // Loop through buffer from the bottom up
    for (let y = window.demo.canvas.height - 2; y > 0; y--) {
      for (let x = 0; x < window.demo.canvas.width; x++) {
        // X-1: Left pixel
        let index = (window.demo.yIndex[y] + x - 1) << 2
        let r1 = window.demo.buffer.data[index++]
        let g1 = window.demo.buffer.data[index++]
        let b1 = window.demo.buffer.data[index++]

        // X+1: Right pixel
        index = (window.demo.yIndex[y] + x + 1) << 2
        let r2 = window.demo.buffer.data[index++]
        let g2 = window.demo.buffer.data[index++]
        let b2 = window.demo.buffer.data[index++]

        // Y+1: Bottom pixel
        index = (window.demo.yIndex[y + 1] + x) << 2
        let r3 = window.demo.buffer.data[index++]
        let g3 = window.demo.buffer.data[index++]
        let b3 = window.demo.buffer.data[index++]

        const turbulence = window.demo.turbulence[(window.demo.yIndex[y] + x + window.demo.turbulenceIndex) % window.demo.turbulence.length]

        // Average pixels, add turbulence, & write to buffer w/fancy bit-shift math
        index = (window.demo.yIndex[y] + x) << 2
        window.demo.buffer.data[index++] = ((r1 + r2 >> 1) + r3 >> 1) * turbulence
        window.demo.buffer.data[index++] = ((g1 + g2 >> 1) + g3 >> 1) * turbulence
        window.demo.buffer.data[index++] = ((b1 + b2 >> 1) + b3 >> 1) * turbulence
        window.demo.buffer.data[index++] = 255
      }
    }

    // Move turbulence index a random amount each frame
    window.demo.turbulenceIndex += Math.floor(window.demo.turbulence.length * Math.random())

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
