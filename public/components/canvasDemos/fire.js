[
  function init () {
    this.canvas.height /= 2

    // Precalc y*width values for each horizontal line
    this.yIndex = {}
    for (let y = 0; y < this.canvas.height; y++) {
      this.yIndex[y] = y * this.canvas.width
    }

    // Precalc random turbulence values
    this.turbulence = []
    for (let i = 0; i < this.buffer.size / 4; i++) {
      this.turbulence[i] = Math.random() + 0.5
      this.turbulence[i] *= (Math.cos(1 / i) + 1) / 2
    }

    this.turbulenceIndex = 0
    window.requestAnimationFrame(this.update.bind(this))
  },

  function update () {
    if (this.running) {
      // Fill bottom line of buffer with random fire colors
      for (let x = 0; x < this.canvas.width; x++) {
        let index = (this.yIndex[this.canvas.height - 1] + x) << 2
        let c = Math.floor(Math.random() * 255)
        this.buffer.data[index++] = c * 1.6
        this.buffer.data[index++] = c * 0.8
        this.buffer.data[index++] = c * 0.4
        this.buffer.data[index++] = 255
      }

      // Loop through buffer from the bottom up
      for (let y = this.canvas.height - 2; y > 0; y--) {
        for (let x = 0; x < this.canvas.width; x++) {
          // X-1: Left pixel
          let index = (this.yIndex[y] + x - 1) << 2
          let r1 = this.buffer.data[index++]
          let g1 = this.buffer.data[index++]
          let b1 = this.buffer.data[index++]

          // X+1: Right pixel
          index = (this.yIndex[y] + x + 1) << 2
          let r2 = this.buffer.data[index++]
          let g2 = this.buffer.data[index++]
          let b2 = this.buffer.data[index++]

          // Y+1: Bottom pixel
          index = (this.yIndex[y + 1] + x) << 2
          let r3 = this.buffer.data[index++]
          let g3 = this.buffer.data[index++]
          let b3 = this.buffer.data[index++]

          const turbulence = this.turbulence[(this.yIndex[y] + x + this.turbulenceIndex) % this.turbulence.length]

          // Average pixels, add turbulence, & write to buffer w/fancy bit-shift math
          index = (this.yIndex[y] + x) << 2
          this.buffer.data[index++] = ((r1 + r2 >> 1) + r3 >> 1) * turbulence
          this.buffer.data[index++] = ((g1 + g2 >> 1) + g3 >> 1) * turbulence
          this.buffer.data[index++] = ((b1 + b2 >> 1) + b3 >> 1) * turbulence
          this.buffer.data[index++] = 255
        }
      }

      // Move turbulence index a random amount each frame
      this.turbulenceIndex += Math.floor(this.turbulence.length * Math.random())

      // Flip buffer to canvas
      this.context2D.putImageData(this.buffer, 0, 0)

      window.requestAnimationFrame(this.update.bind(this))
    }
  }
]
