[
  function init () {
    // Precalc y*width values for each horizontal line
    this.yIndex = {}
    for (let y = 0; y < this.canvas.height; y++) {
      this.yIndex[y] = y * this.canvas.width
    }

    // Precalc 256 color palette r,g,b values
    this.palette = {}
    for (let i = 0; i < 256; i++) {
      this.palette[i] = {}
      this.palette[i].r = ~~(128 + 128 * Math.sin(Math.PI * i / 64))
      this.palette[i].g = ~~(128 + 128 * Math.sin(Math.PI * i / 96))
      this.palette[i].b = ~~(128 + 128 * Math.sin(Math.PI * i / 128))
    }

    // Precalc Math.sin table
    this.sinc = {}
    for (let i = 0; i < 1800; i++) {
      this.sinc[i] = (Math.sin((Math.PI * i) / 180) * 1024)
    }

    this.tmp = 0
    window.requestAnimationFrame(this.update.bind(this))
  },

  function update () {
    if (this.running) {
      this.tmp = (this.tmp + 1) % 720

      // Main loop with optimized magic plasma color formula
      for (let y = 0; y < this.canvas.height; y++) {
        let yc = 128 + ((this.sinc[(y << 1) + (this.tmp >> 1)] + this.sinc[y + (this.tmp << 1)] + (this.sinc[(y >> 1) + this.tmp] << 1)) >> 6)
        for (let x = 0; x < this.canvas.width; x++) {
          let xc = 128 + (((this.sinc[x + (this.tmp << 1)] << 1) + this.sinc[(x << 1) + (this.tmp >> 1)] + (this.sinc[x + this.tmp] << 1)) >> 6)

          let index = (this.yIndex[y] + x) << 2
          let color = Math.abs(((yc * xc) >> 5) % 255)
          this.buffer.data[index++] = this.palette[color].r
          this.buffer.data[index++] = this.palette[color].g
          this.buffer.data[index++] = this.palette[color].b
          this.buffer.data[index++] = 255
        }
      }

      // Flip buffer to canvas
      this.context2D.putImageData(this.buffer, 0, 0)
      window.requestAnimationFrame(this.update.bind(this))
    }
  }
]
