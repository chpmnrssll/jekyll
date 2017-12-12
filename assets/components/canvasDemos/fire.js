() => {
  // init here
  if (!this.yIndex) {
    // Precalc y*width values for each horizontal line
    this.yIndex = {}
    for (let y = 0; y < this.canvas.height; y++) {
      this.yIndex[y] = y * this.canvas.width
    }

    // Precalc random turbulence values
    this.turbulence = this.context2D.createImageData(this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.bufferSize; i++) {
      this.turbulence[i] = Math.random() + 0.48
    }
    this.turbulenceIndex = 0
  }


  //Fill bottom line of buffer with random fire colors
  for (let x = 0; x < this.canvas.width; x++) {
    let index = (this.yIndex[this.canvas.height - 1] + x) << 2
    let c = Math.floor(Math.random() * 255)
    this.buffer.data[index++] = c * 1.50
    this.buffer.data[index++] = c * 0.75
    this.buffer.data[index++] = c * 0.25
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

      // Center pixel
      index = (this.yIndex[y] + x) << 2
      const turbulence = this.turbulence[((this.yIndex[y] + x) + (this.turbulenceIndex)) % this.bufferSize]

      // Average pixels, add turbulence, & write to buffer w/fancy bit-shift ops
      this.buffer.data[index++] = ((r1 + r2 >> 1) + r3 >> 1) * turbulence
      this.buffer.data[index++] = ((g1 + g2 >> 1) + g3 >> 1) * turbulence
      this.buffer.data[index++] = ((b1 + b2 >> 1) + b3 >> 1) * turbulence
      this.buffer.data[index++] = 255
    }
  }

  // Move turbulence index a random amount each frame
  this.turbulenceIndex += Math.floor(this.bufferSize * Math.random())

  // Flip buffer to canvas
  this.context2D.putImageData(this.buffer, 0, 0)
  if (this.running) {
    window.requestAnimationFrame(this.update.bind(this))
  }
}
