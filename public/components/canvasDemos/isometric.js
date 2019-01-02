[
  function init () {
    this.keyDown = {}
    this.keyUp = {}

    this.heightmap = new window.Image()
    this.heightmap.src = '/assets/images/about/map2.png'
    this.heightmap.addEventListener('load', this._loadHandler.bind(this))
  },

  function _loadHandler (event) {
    this.viewport = {
      angle: 0,
      scale: 1.0,
      x: 0,
      y: 0
    }
    this.viewport.canvas = document.createElement('canvas')
    this.viewport.context = this.viewport.canvas.getContext('2d')
    this.viewport.context.imageSmoothingEnabled = false

    // isometric canvas is twice as wide as map tile
    this.viewport.canvas.width = this.canvas.width / 2
    this.viewport.canvas.height = this.canvas.height
    this.viewport.canvas.halfW = this.viewport.canvas.width / 2
    this.viewport.canvas.halfH = this.viewport.canvas.height / 2
    this.viewport.canvas.style.imageRendering = 'pixelated'
    this.viewport.canvas.style.width = '100%'
    this.viewport.canvas.style.height = '100%'

    this.viewport.pattern = this.viewport.context.createPattern(this.heightmap, 'repeat')
    this.shadowDOM.appendChild(this.viewport.canvas)

    document.addEventListener('keydown', this._keydownHandler.bind(this))
    document.addEventListener('keyup', this._keyupHandler.bind(this))

    this.updateViewport()
    this.heightmap.loaded = true
    window.requestAnimationFrame(this.update.bind(this))
  },

  function kill () {
    document.removeEventListener('keydown', this._keydownHandler)
    document.removeEventListener('keyup', this._keyupHandler)
  },

  // Keyboard controls
  function _keydownHandler (event) {
    for (let i in KEY) {
      if (event.keyCode === KEY[i]) {
        this.keyDown[event.keyCode] = true
        return false
      }
    }
  },

  function _keyupHandler (event) {
    this.keyUp[event.keyCode] = true
  },

  function clearKeys () {
    for (let i in this.keyUp) {
      if (this.keyUp[i]) {
        this.keyDown[i] = false
        this.keyUp[i] = false
      }
    }
  },

  // Checks key buffers and moves/scales viewport
  function checkKeys () {
    const speed = 4 / this.viewport.scale
    let xVel = 0
    let yVel = 0

    if (this.keyDown[KEY.RIGHT]) {
      xVel += speed
      yVel -= speed
    }
    if (this.keyDown[KEY.LEFT]) {
      xVel -= speed
      yVel += speed
    }
    if (this.keyDown[KEY.DOWN]) {
      xVel += speed
      yVel += speed
    }
    if (this.keyDown[KEY.UP]) {
      xVel -= speed
      yVel -= speed
    }
    if (this.keyUp[KEY.ADD]) {
      this.viewport.scale += 0.1
    }
    if (this.keyUp[KEY.SUB]) {
      if (this.viewport.scale > 0) {
        this.viewport.scale -= 0.1
      }
    }
    if (this.keyUp[KEY.ROTL]) {
      this.viewport.angle = (this.viewport.angle - 9) % 360
    }
    if (this.keyUp[KEY.ROTR]) {
      this.viewport.angle = (this.viewport.angle + 9) % 360
    }

    this.setViewport(this.viewport.x + xVel, this.viewport.y + yVel)
    this.clearKeys()
  },

  function setViewport (x, y) {
    // Set viewport position clipped to heightmap dimensions
    if ((x > 0) && (x < this.heightmap.width - this.viewport.canvas.width)) {
      this.viewport.x = x
    }

    if ((y > 0) && (y < this.heightmap.height - this.viewport.canvas.height)) {
      this.viewport.y = y
    }

    this.updateViewport()
  },

  function updateViewport () {
    this.viewport.context.clearRect(0, 0, this.viewport.canvas.width, this.viewport.canvas.height)
    this.viewport.context.save()

    // this.viewport.context.beginPath()
    // this.viewport.context.rect(0, 0, this.viewport.canvas.width, this.viewport.canvas.height)
    this.viewport.context.translate(this.viewport.canvas.halfW, this.viewport.canvas.halfH)
    this.viewport.context.scale(1, 1)
    this.viewport.context.rotate(this.viewport.angle * Math.PI / 180)
    this.viewport.context.translate(-this.viewport.canvas.halfW, -this.viewport.canvas.halfH)
    this.viewport.context.drawImage(this.heightmap, this.viewport.x, this.viewport.y, this.viewport.canvas.width, this.viewport.canvas.height, 0, 0, this.viewport.canvas.width, this.viewport.canvas.height)
    // this.viewport.context.fillStyle = this.viewport.pattern
    // this.viewport.context.fillRect(0, 0, this.viewport.canvas.width, this.viewport.canvas.height)
    // this.viewport.context.fill()

    this.viewport.context.beginPath()
    this.viewport.context.strokeStyle = 'rgba(255,128,64,.5)'
    this.viewport.context.moveTo(this.viewport.canvas.halfW, this.viewport.canvas.halfH)
    this.viewport.context.lineTo(this.viewport.canvas.halfW, this.viewport.canvas.halfH-63)
    this.viewport.context.stroke()
    this.viewport.context.fillStyle = 'rgba(255,128,64,.5)'
    this.viewport.context.fillText('N', this.viewport.canvas.halfW-4, this.viewport.canvas.halfH-63)

    this.viewport.context.restore()
    this.viewport.map = this.viewport.context.getImageData(0, 0, this.viewport.canvas.width, this.viewport.canvas.height)

    // Scale heightmap (alpha channel) values to smaller range
    for (let i = 0; i < this.viewport.map.data.length; i += 4) {
      this.viewport.map.data[i + 3] *= 0.35
    }
  },

  function cartesianToIsometric (x, y) {
    const newX = x - y
    // const newY = (x + y) / 2
    const newY = (x + y) >> 1
    return { x: newX, y: newY }
  },

  function isometricToCartesian (x, y) {
    // const newX = (2 * y + x) / 2
    // const newY = (2 * y - x) / 2
    const newX = ((y + x) << 1) >> 1
    const newY = ((y - x) << 1) >> 1
    return { x: newX, y: newY }
  },

  function coordinateToIndex (x, y, width) {
    return (y * (width << 2)) + (x << 2)
  },

  function update () {
    if (this.running) {
      if (this.heightmap.loaded) {
        // clear buffer
        for (let i = 0; i < this.buffer.data.length; i += 4) {
          this.buffer.data[i] = 0
          this.buffer.data[i + 1] = 0
          this.buffer.data[i + 2] = 0
          this.buffer.data[i + 3] = 0
        }

        for (let y = this.viewport.map.height-1; y > 0; y--) {
          for (let x = this.viewport.map.width-1; x > 0; x--) {
            let mapIndex = this.coordinateToIndex(x, y, this.viewport.map.width)

            let r = this.viewport.map.data[mapIndex]
            let g = this.viewport.map.data[mapIndex + 1]
            let b = this.viewport.map.data[mapIndex + 2]
            let height = this.viewport.map.data[mapIndex + 3]

            let isoPos = this.cartesianToIsometric(x, y)
            let bufferIndex = this.coordinateToIndex(isoPos.x - this.viewport.canvas.width, isoPos.y - height + this.viewport.canvas.halfH/4, this.buffer.width)
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

              this.buffer.data[bufferIndex] = r
              this.buffer.data[bufferIndex + 1] = g
              this.buffer.data[bufferIndex + 2] = b
              this.buffer.data[bufferIndex + 3] = 255 - fade

              bufferIndex += this.buffer.lineHeight
              height--
              // if (fade < 255) {
              //   fade += 8
              // }
            }
          }
        }

        // Flip buffer to canvas
        this.context2D.putImageData(this.buffer, 0, 0)
        this.checkKeys()
      }

      window.requestAnimationFrame(this.update.bind(this))
    }
  }
]
