(() => {
  let script = document.createElement('script')
  script.onload = () => {
    setTimeout(() => {
      window.demo = new Game(1000, 1000, document.querySelector('.canvasDemo'), { width: 640, height: 360 })
    }, 1000)
  }
  script.setAttribute('src', '/public/javascript/vendor/Matter/build/matter.min.js')
  document.querySelector('article').appendChild(script)
})()

class Keyboard {
  constructor () {
    this.keys = {}
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    document.addEventListener('keyup', this.keyupHandler.bind(this))
  }

  stop () {
    document.removeEventListener('keydown', this.keydownHandler)
    document.removeEventListener('keyup', this.keyupHandler)
  }

  keydownHandler (event) {
    if (!event.repeat) {
      this.keys[event.key] = true
    } else {
      this.keys[event.key] = 'holding'
    }
  }

  keyupHandler (event) {
    this.keys[event.key] = false
  }
}

class Player {
  constructor (x, y) {
    const width = 32
    const height = 32
    const halfWidth = width / 2
    const halfHeight = height / 2
    const sensorWidth = 1
    const sensorLength = 0.65

    this.sensors = {
      top: Matter.Bodies.rectangle(x, y - halfHeight - sensorWidth, width * sensorLength, sensorWidth, { isSensor: true }),
      right: Matter.Bodies.rectangle(x + halfWidth + sensorWidth, y, sensorWidth, height * sensorLength, { isSensor: true }),
      bottom: Matter.Bodies.rectangle(x, y + halfHeight + sensorWidth, width * sensorLength, sensorWidth, { isSensor: true }),
      left: Matter.Bodies.rectangle(x - halfWidth - sensorWidth, y, sensorWidth, height * sensorLength, { isSensor: true })
    }

    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      density: 4.0,
      render: {
        // sprite: {
        //   texture: '/assets/images/badMario.png',
        //   xScale: 0.125,
        //   yScale: 0.125
        // },
        fillStyle: '#224488'
      }
    })

    // join body parts into one
    this.composite = Matter.Body.create({
      // density: 0.01,
      friction: 0.25,
      frictionStatic: 0.25,
      parts: [ this.body, this.sensors.top, this.sensors.right, this.sensors.bottom, this.sensors.left ],
      restitution: 0.5
    })
  }
}

class Viewport {
  constructor (width = 256, height = 256, scale = 1.0) {
    this.x = width / 2
    this.y = height / 2
    this.scale = scale
    this.width = width
    this.height = height
  }
  // get height () { return this.height * this.scale }
  // set height (h) { this.height = h / 2 }
  // get width () { return this.width * this.scale }
  // set width (w) { this.width = w / 2 }
}


class Game {
  constructor (width, height, canvas, resolution) {
    this.engine = Matter.Engine.create()
    this.world = this.engine.world
    this.canvas = canvas
    this.context2D = this.canvas.getContext('2d')
    this.context2D.imageSmoothingEnabled = false

    this.viewport = new Viewport(parseInt(this.canvas.clientWidth / 2), parseInt(this.canvas.clientHeight / 2))

    // create renderer
    this.render = Matter.Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        background: '#112244',
        width: resolution.width,
        height: resolution.height,
        showAngleIndicator: false,
        wireframes: false
      }
    })

    Matter.Render.run(this.render)
    this.runner = Matter.Runner.create()
    Matter.Runner.run(this.runner, this.engine)

    Matter.World.add(this.world, this.createBounds(1000, 1000, 1000))
    let wall = Matter.Bodies.rectangle(1000 / 3, 1000 / 5, 900, 50, { isStatic: true, angle: 0.075, render: { fillStyle: '#224466' }})
    let wall2 = Matter.Bodies.rectangle(1000 / 1.5, 1000 / 2, 900, 50, { isStatic: true, angle: -0.075, render: { fillStyle: '#224466' }})
    let wall3 = Matter.Bodies.rectangle(1000 / 3, 1000 / 1.25, 900, 50, { isStatic: true, angle: 0.075, render: { fillStyle: '#224466' }})
    Matter.World.add(this.engine.world, [wall, wall2, wall3])

    // window.fetch('/public/assets/level.svg')
    //   .then(response => response.text())
    //   .then(data => {
    //     let parser = new window.DOMParser()
    //     let doc = parser.parseFromString(data, 'image/svg+xml')
    //     let paths = doc.querySelectorAll('path')
    //     let vertexSets = []
    //     let color = Matter.Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'])
    //     paths.forEach(path => {
    //       vertexSets.push(Matter.Svg.pathToVertices(path, 10))
    //     })
    //     let level = Matter.Bodies.fromVertices(0, 0, vertexSets, {
    //       isStatic: true,
    //       render: {
    //         fillStyle: color,
    //         strokeStyle: color,
    //         lineWidth: 1
    //       }
    //     }, true)
    //     // Matter.Body.scale(level, 10, 10)
    //     // Matter.Body.translate(level, { x: 50, y: 200 })
    //     Matter.World.add(this.world, level)
    //
    //     Matter.Engine.run(this.engine)
    //   })


    this.keyboard = new Keyboard()

    this.render.mouse = Matter.Mouse.create(this.render.canvas)
    Matter.World.add(this.world, Matter.MouseConstraint.create(this.engine, {
      mouse: this.render.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true
        }
      }
    }))

    window.addEventListener('resize', this.resizeViewport.bind(this))
    Matter.Events.on(this.render, 'beforeRender', this.beforeRender.bind(this))
    Matter.Events.on(this.engine, 'collisionEnd', this.collisionEnd.bind(this))
    Matter.Events.on(this.engine, 'collisionActive', this.collisionActive.bind(this))
    Matter.Engine.run(this.engine)

    this.player = new Player(25, 850)
    Matter.World.add(this.engine.world, this.player.composite)

    this.logos = []
    this.lastShape = {}
    this.spawnLogos()
  }

  stop () {
    Matter.Events.off(this.render, 'beforeRender', this.beforeRender)
    Matter.Events.off(this.engine, 'collisionEnd', this.collisionEnd)
    Matter.Events.off(this.engine, 'collisionActive', this.collisionActive)
    Matter.Runner.stop(this.runner)
    this.keyboard.stop()
  }

  resizeViewport () {
    this.viewport.width = parseInt(this.canvas.clientWidth / 2)
    this.viewport.height = parseInt(this.canvas.clientHeight / 2)
  }

  beforeRender (event) {
    // keep player at 0 rotation
    Matter.Body.setAngle(this.player.composite, 0)

    this.viewport.x = this.player.composite.position.x
    this.viewport.y = this.player.composite.position.y
    const scaledWidth = this.viewport.width * this.viewport.scale
    const scaledHeight = this.viewport.height * this.viewport.scale
    Matter.Render.lookAt(this.render, {
      min: {
        x: this.viewport.x - scaledWidth,
        y: this.viewport.y - scaledHeight
      },
      max: {
        x: this.viewport.x + scaledWidth,
        y: this.viewport.y + scaledHeight
      }
    })

    if (this.keyboard.keys['w'] && this.keyboard.keys['w'] !== 'holding') {
      if (!this.player.onFloor) {
        if (this.player.onRight) {
          // console.log('walljump onRight')
          const forceX = -(0.015 * this.player.composite.mass)
          const forceY = -(0.045 * this.player.composite.mass)
          Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: forceX, y: forceY })
          this.keyboard.keys['w'] = false
        } else if (this.player.onLeft) {
          // console.log('walljump onLeft')
          const forceX = (0.015 * this.player.composite.mass)
          const forceY = -(0.045 * this.player.composite.mass)
          Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: forceX, y: forceY })
          this.keyboard.keys['w'] = false
        }
      } else {
        if (this.player.onRight) {
          // console.log('wallrun onRight')
          const forceY = -(0.04 * this.player.composite.mass)
          Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: 0, y: forceY })
          this.keyboard.keys['w'] = false
        } else if (this.player.onLeft) {
          // console.log('wallrun onLeft')
          const forceY = -(0.04 * this.player.composite.mass)
          Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: 0, y: forceY })
          this.keyboard.keys['w'] = false
        } else {
          // console.log('jump')
          const forceY = -(0.035 * this.player.composite.mass)
          Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: 0, y: forceY })
          this.keyboard.keys['w'] = false
        }
      }
    }

    if (this.keyboard.keys['s'] && !this.player.onFloor) {
      // console.log('pound')
      const forceY = (0.005 * this.player.composite.mass)
      Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: 0, y: forceY })
    }

    if (this.keyboard.keys['a']) {
      // console.log('move left')
      const forceX = -(0.001 * this.player.composite.mass)
      const forceY = -(0.0005 * this.player.composite.mass)
      Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: forceX, y: forceY })
    }

    if (this.keyboard.keys['d']) {
      // console.log('move right')
      const forceX = (0.001 * this.player.composite.mass)
      const forceY = -(0.0005 * this.player.composite.mass)
      Matter.Body.applyForce(this.player.composite, this.player.composite.position, { x: forceX, y: forceY })
    }

    if (this.keyboard.keys['+']) {
      this.viewport.scale -= 0.01
    }

    if (this.keyboard.keys['-']) {
      this.viewport.scale += 0.01
    }
  }

  collisionEnd(event) {
    let pairs = event.pairs

    for (let i = 0, j = pairs.length; i !== j; ++i) {
      let pair = pairs[i]

      if (pair.bodyA === this.player.sensors.bottom || pair.bodyB === this.player.sensors.bottom) {
        this.player.onFloor = false
      } else if (pair.bodyA === this.player.sensors.right || pair.bodyB === this.player.sensors.right) {
        this.player.onRight = false
      } else if (pair.bodyA === this.player.sensors.left || pair.bodyB === this.player.sensors.left) {
        this.player.onLeft = false
      }
    }
  }

  collisionActive(event) {
    let pairs = event.pairs

    for (let i = 0, j = pairs.length; i !== j; ++i) {
      let pair = pairs[i]

      if (pair.bodyA === this.player.sensors.bottom || pair.bodyB === this.player.sensors.bottom) {
        this.player.onFloor = true
      } else if (pair.bodyA === this.player.sensors.right || pair.bodyB === this.player.sensors.right) {
        this.player.onRight = true
      } else if (pair.bodyA === this.player.sensors.left || pair.bodyB === this.player.sensors.left) {
        this.player.onLeft = true
      }
    }
    // console.log(this.player.onLeft, this.player.onFloor, this.player.onRight)
  }

  // create 4 rectangles just outside the width & height
  createBounds(width, height, thickness) {
    const halfW = width / 2
    const halfH = height / 2
    const halfT = thickness / 2
    const doubleW = width * 2
    const doubleH = height * 2

    return [
      Matter.Bodies.rectangle(halfW, -halfT, doubleW, thickness, { render: { fillStyle: '#224466' }, isStatic: true }),
      Matter.Bodies.rectangle(width + halfT, halfH, thickness, doubleH, { render: { fillStyle: '#224466' }, isStatic: true }),
      Matter.Bodies.rectangle(halfW, height + halfT, doubleW, thickness, { render: { fillStyle: '#224466' }, isStatic: true }),
      Matter.Bodies.rectangle(-halfT, halfH, thickness, doubleH, { render: { fillStyle: '#224466' }, isStatic: true })
    ]
  }

  spawnLogos() {
    const positions = [
      { x: 600, y: 96 },
      { x: 600, y: 256 },
      { x: 60, y: 127 }
    ]

    if (this.logos.length < 20) {
      let randomPosition = parseInt(Math.random() * positions.length)
      let logo = this.randomLogo(positions[randomPosition].x, positions[randomPosition].y)

      this.logos.push(logo)
      Matter.World.add(this.world, logo)
      Matter.Body.applyForce(logo, logo.position, { x: Math.random() - 0.5, y: 0.05 })
      Matter.Body.setAngularVelocity(logo, Math.random() - 0.5)
    } else {
      Matter.World.remove(this.world, this.logos.shift())
    }

    setTimeout(this.spawnLogos.bind(this), 1000)
  }

  randomLogo(x, y) {
    if (this.lastShape.type === 'circle') {
      let scale = Matter.Common.random(0.5, 1.5)
      return this.randomRectLogo(x, y, scale)
    } else {
      let scale = Matter.Common.random(0.25, 0.75)
      return this.randomCircleLogo(x, y, scale)
    }
  }

  randomRectLogo(x, y, scale) {
    const rectangles = [{
        type: 'rectangle',
        density: 0.7,
        width: 55,
        height: 64,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoGrunt.png'
      },
      {
        type: 'rectangle',
        density: 0.8,
        width: 29,
        height: 64,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoGulp.png'
      },
      {
        type: 'rectangle',
        density: 0.8,
        width: 38,
        height: 64,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoHTML5.png'
      },
      {
        type: 'rectangle',
        density: 0.4,
        width: 50,
        height: 50,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoJavascript.png'
      },
      {
        type: 'rectangle',
        density: 0.5,
        width: 60,
        height: 22,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoJekyll.png'
      },
      {
        type: 'rectangle',
        density: 0.6,
        width: 50,
        height: 52,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoMarionette.png'
      },
      {
        type: 'rectangle',
        density: 0.7,
        width: 64,
        height: 18,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoMongoDB.png'
      },
      {
        type: 'rectangle',
        density: 0.8,
        width: 62,
        height: 32,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoMySQL.png'
      },
      {
        type: 'rectangle',
        density: 0.6,
        width: 52,
        height: 32,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoNodeJS.png'
      },
      {
        type: 'rectangle',
        density: 0.8,
        width: 60,
        height: 21,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoNpm.png'
      },
      {
        type: 'rectangle',
        density: 0.7,
        width: 60,
        height: 32,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoPHP.png'
      },
      {
        type: 'rectangle',
        density: 0.7,
        width: 49,
        height: 62,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoRubyOnRails.png'
      },
      {
        type: 'rectangle',
        density: 0.6,
        width: 62,
        height: 48,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoSass.png'
      }
    ]

    let shape = rectangles[parseInt(Matter.Common.random(0, rectangles.length))]
    while (shape === this.lastShape) {
      shape = rectangles[parseInt(Matter.Common.random(0, rectangles.length))]
    }
    this.lastShape = shape

    return Matter.Bodies.rectangle(x, y, shape.width * scale, shape.height * scale, {
      density: shape.density * scale,
      friction: 0.5,
      render: {
        sprite: {
          texture: shape.url,
          xScale: shape.xScale * scale,
          yScale: shape.yScale * scale
        }
      }
    })
  }

  randomCircleLogo(x, y, scale) {
    const circles = [{
        type: 'circle',
        density: 0.025,
        radius: 30,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoAMP.png'
      },
      {
        type: 'circle',
        density: 0.05,
        radius: 30,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoAtom.png'
      },
      {
        type: 'circle',
        density: 0.015,
        radius: 31,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoBower.png'
      },
      {
        type: 'circle',
        density: 0.05,
        radius: 29,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoChrome.png'
      },
      {
        type: 'circle',
        density: 0.015,
        radius: 24,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoWordpress.png'
      },
      {
        type: 'circle',
        density: 0.05,
        radius: 28,
        xScale: 0.25,
        yScale: 0.25,
        url: '/public/assets/logo/logoYeoman.png'
      }
    ]

    let shape = circles[parseInt(Matter.Common.random(0, circles.length))]
    while (shape === this.lastShape) {
      shape = circles[parseInt(Matter.Common.random(0, circles.length))]
    }
    this.lastShape = shape

    return Matter.Bodies.circle(x, y, shape.radius * scale, {
      density: shape.density * scale,
      friction: 0.5,
      render: {
        sprite: {
          texture: shape.url,
          xScale: shape.xScale * scale,
          yScale: shape.yScale * scale
        }
      }
    })
  }
}
