() => {
  // Pick random shade for every pixel (0-255)
  for(let i = 0; i < this.bufferSize; i++) {
    let c = Math.floor(Math.random() * 255);
    let index = i * 4;
    this.buffer.data[index++] = c;
    this.buffer.data[index++] = c;
    this.buffer.data[index++] = c;
    this.buffer.data[index++] = 255;
  }

  // Flip buffer to canvas
  this.context2D.putImageData(this.buffer, 0, 0)
  if (this.running) {
    window.requestAnimationFrame(this.update.bind(this))
  }
}
