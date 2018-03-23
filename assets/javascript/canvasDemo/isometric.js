const CONTROLS = {
  up: 'w',
  right: 'd',
  down: 's',
  left: 'a',
  rotateRight: 'e',
  rotateLeft: 'q',
  zoomOut: 'x',
  zoomIn: 'z'
}

class Heightmap {
  constructor (width, height) {
    this.viewport = {
      angle: 0,
      scale: 1.0,
      heightScale: 0.25,
      x: 0,
      y: 0
    }

    this.canvas = document.querySelector('.canvasDemo')
    this.canvas.style.imageRendering = 'pixelated'
    this.canvas.style.backgroundColor = 'rgba(0, 0, 0, .35)'
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext('2d')
    this.context.imageSmoothingEnabled = false

    // isometric canvas is twice as wide as map tile
    this.viewport.canvas = document.createElement('canvas')
    this.viewport.canvas.style.imageRendering = 'pixelated'
    this.viewport.canvas.width = width / 2
    this.viewport.canvas.height = height
    this.viewport.canvas.halfW = this.viewport.canvas.width / 2
    this.viewport.canvas.halfH = this.viewport.canvas.height / 2
    this.viewport.context = this.viewport.canvas.getContext('2d')
    this.viewport.context.imageSmoothingEnabled = false

    // this.canvas.parentElement.appendChild(this.viewport.canvas)

    this.buffer = this.context.createImageData(width, height)
    this.buffer.size = (width * height) * 4
    this.buffer.lineHeight = width * 4

    this.keyboard = {}
    document.addEventListener('keydown', this._keydownHandler.bind(this))
    document.addEventListener('keyup', this._keyupHandler.bind(this))

    this.heightmap = new window.Image()
    this.heightmap.src = '/assets/images/about/map2.png'
    this.heightmap.addEventListener('load', this._loadHandler.bind(this))
  }

  _loadHandler (event) {
    this.viewport.pattern = this.viewport.context.createPattern(this.heightmap, 'repeat')
    this.updateViewport()
    this.heightmap.loaded = true
    this.running = true
    window.requestAnimationFrame(this.update.bind(this))
  }

  stop () {
    this.running = false
    document.removeEventListener('keydown', this._keydownHandler)
    document.removeEventListener('keyup', this._keyupHandler)
  }

  _keydownHandler (event) {
    if (!event.repeat) {
      this.keyboard[event.key] = true
    }
  }

  _keyupHandler (event) {
    this.keyboard[event.key] = false
  }

  // Checks key buffers and moves/scales viewport
  checkKeys () {
    const speed = 2 / this.viewport.scale
    let xVel = 0
    let yVel = 0

    if (this.keyboard[CONTROLS.right]) {
      xVel += speed
      yVel -= speed
    }
    if (this.keyboard[CONTROLS.left]) {
      xVel -= speed
      yVel += speed
    }
    if (this.keyboard[CONTROLS.down]) {
      xVel += speed
      yVel += speed
    }
    if (this.keyboard[CONTROLS.up]) {
      xVel -= speed
      yVel -= speed
    }
    if (this.keyboard[CONTROLS.zoomIn]) {
      this.viewport.scale += 0.0025
      this.viewport.heightScale += 0.0005
    }
    if (this.keyboard[CONTROLS.zoomOut]) {
      if (this.viewport.scale > 0) {
        this.viewport.scale -= 0.0025
        this.viewport.heightScale -= 0.0005
      }
    }
    if (this.keyboard[CONTROLS.rotateLeft]) {
      this.viewport.angle = (this.viewport.angle - 1) % 360
    }
    if (this.keyboard[CONTROLS.rotateRight]) {
      this.viewport.angle = (this.viewport.angle + 1) % 360
    }

    this.setViewport(this.viewport.x + xVel, this.viewport.y + yVel)
  }

  setViewport (x, y) {
    // Set viewport position clipped to heightmap dimensions
    if ((x > 0) && (x < this.heightmap.width - this.viewport.canvas.width)) {
      this.viewport.x = x
    }

    if ((y > 0) && (y < this.heightmap.height - this.viewport.canvas.height)) {
      this.viewport.y = y
    }

    this.updateViewport()
  }

  updateViewport () {
    this.viewport.context.clearRect(0, 0, this.viewport.canvas.width, this.viewport.canvas.height)
    this.viewport.context.save()
    this.viewport.context.translate(this.viewport.canvas.halfW, this.viewport.canvas.halfH)
    this.viewport.context.scale(this.viewport.scale, this.viewport.scale)
    this.viewport.context.rotate(this.viewport.angle * Math.PI / 180)
    this.viewport.context.translate(-this.viewport.canvas.halfW, -this.viewport.canvas.halfH)
    this.viewport.context.drawImage(this.heightmap, this.viewport.x, this.viewport.y, this.viewport.canvas.width, this.viewport.canvas.height, 0, 0, this.viewport.canvas.width, this.viewport.canvas.height)
    this.viewport.context.restore()
    this.viewport.map = this.viewport.context.getImageData(0, 0, this.viewport.canvas.width, this.viewport.canvas.height)

    // Scale heightmap (alpha channel) values to smaller range
    for (let i = 0; i < this.viewport.map.data.length; i += 4) {
      this.viewport.map.data[i + 3] *= this.viewport.heightScale
    }
  }

  cartesianToIsometric (x, y) {
    const newX = x - y
    const newY = (x + y) >> 1
    return {
      x: newX,
      y: newY
    }
  }

  isometricToCartesian (x, y) {
    const newX = ((y + x) << 1) >> 1
    const newY = ((y - x) << 1) >> 1
    return {
      x: newX,
      y: newY
    }
  }

  coordinateToIndex (x, y, width) {
    return (y * (width << 2)) + (x << 2)
  }

  update () {
    // clear buffer
    for (let i = 0; i < this.buffer.data.length; i += 4) {
      this.buffer.data[i] = 0
      this.buffer.data[i + 1] = 0
      this.buffer.data[i + 2] = 0
      this.buffer.data[i + 3] = 0
    }

    for (let y = this.viewport.map.height - 1; y > 0; y--) {
      for (let x = this.viewport.map.width - 1; x > 0; x--) {
        let mapIndex = this.coordinateToIndex(x, y, this.viewport.map.width)

        let r = this.viewport.map.data[mapIndex]
        let g = this.viewport.map.data[mapIndex + 1]
        let b = this.viewport.map.data[mapIndex + 2]
        let height = this.viewport.map.data[mapIndex + 3]

        let isoPos = this.cartesianToIsometric(x, y)
        let bufferIndex = this.coordinateToIndex(isoPos.x - this.viewport.canvas.width, isoPos.y - height + this.viewport.canvas.halfH / 4, this.buffer.width)
        // bufferIndex += parseInt(this.viewport.canvas.height * this.viewport.heightScale) * this.buffer.lineHeight
        let fade = 0

        while (height > 0) {
          // clip to viewport top & bottom
          if (bufferIndex > this.buffer.length || bufferIndex < this.buffer.lineHeight) {
            break
          }

          // if ((this.buffer.data[bufferIndex] !== 0) && (this.buffer.data[bufferIndex + 1] !== 0) && (this.buffer.data[bufferIndex + 2] !== 0)) {
          if (this.buffer.data[bufferIndex + 3] !== 0) {
            // stop here, no overdraw
            break
          }

          this.buffer.data[bufferIndex] = r - fade
          this.buffer.data[bufferIndex + 1] = g - fade
          this.buffer.data[bufferIndex + 2] = b - fade
          this.buffer.data[bufferIndex + 3] = 255 - (fade << 2)

          bufferIndex += this.buffer.lineHeight
          height--
          if (fade < 255) {
            fade += 4
          }
        }
      }
    }

    // Flip buffer to canvas
    this.context.putImageData(this.buffer, 0, 0)
    this.checkKeys()

    if (this.running) {
      window.requestAnimationFrame(this.update.bind(this))
    }
  }
}

window.demo = new Heightmap(512, 256)
