(() => {
  setTimeout(() => {
    let script = document.createElement('script')
    script.onload = init
    script.setAttribute('src', '/assets/javascript/vendor/Matter/build/matter.min.js')
    document.querySelector('article').appendChild(script)
  }, 1000)
})()

let render
let player = {}
let keys = []
let world

function init () {
  // create engine
  let engine = Matter.Engine.create()
  world = engine.world
  let canvas = document.querySelector('.canvasDemo')
  let style = window.getComputedStyle(canvas)

  // create renderer
  render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    element: canvas.parentElement,
    options: {
      background: '#112244',
      width: parseInt(style.width),
      height: parseInt(style.height),
      showAngleIndicator: false,
      wireframes: false
    }
  })

  Matter.Render.run(render)

  let runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)

  Matter.World.add(world, screenBounds(render.options.width, render.options.height, 200))

  let wall = Matter.Bodies.rectangle(render.options.width / 3, render.options.height / 5, 500, 20, { isStatic: true, angle: 0.05, render: { fillStyle: '#224466' } })
  let wall2 = Matter.Bodies.rectangle(render.options.width / 1.5, render.options.height / 2, 500, 20, { isStatic: true, angle: -0.05, render: { fillStyle: '#224466' } })
  let wall3 = Matter.Bodies.rectangle(render.options.width / 3, render.options.height / 1.25, 500, 20, { isStatic: true, angle: 0.05, render: { fillStyle: '#224466' } })
  Matter.World.add(engine.world, [ wall, wall2, wall3 ])

  // Matter.World.add(world, Matter.Composites.stack(10, 10, 16, 1, 1, 1, randomLogo))
  more()

  // fetch('/assets/images/level.svg')
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
  //     Matter.World.add(world, level)
  //     Matter.Engine.run(engine)
  //   })

  player = createPlayer(0, 350)
  Matter.World.add(engine.world, player.body)

  // add mouse control
  let mouse = Matter.Mouse.create(render.canvas)
  let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  })

  Matter.World.add(world, mouseConstraint)
  render.mouse = mouse

  document.addEventListener('keypress', keyDown)
  document.addEventListener('keyup', keyUp)
  Matter.Events.on(render, 'beforeRender', beforeRender)
  Matter.Events.on(engine, 'collisionEnd', collisionEnd)
  Matter.Events.on(engine, 'collisionActive', collisionActive)
  Matter.Engine.run(engine)
}

function createPlayer (x, y) {
  let w = 16
  let h = 16
  let w2 = w / 2
  let h2 = h / 2
  let size = 1

  let body = Matter.Bodies.rectangle(x, y, w, h, {
    density: 0.05,
    friction: 0.5,
    render: {
      // sprite: {
      //   texture: '/assets/images/badMario.png',
      //   xScale: 0.125,
      //   yScale: 0.125
      // },
      fillStyle: '#224488'
    }
  })

  let top = Matter.Bodies.rectangle(x, y-h2-size, w*0.75, size, { isSensor: true })
  let right = Matter.Bodies.rectangle(x+w2+size, y, size, h*0.75, { isSensor: true })
  let bottom = Matter.Bodies.rectangle(x, y+h2+size, w*0.75, size, { isSensor: true })
  let left = Matter.Bodies.rectangle(x-w2-size, y, size, h*0.75, { isSensor: true })

  return {
    // join body parts into one
    body: Matter.Body.create({ parts: [ body, top, right, bottom, left ], friction: 0 }),
    sensors: {
      top: top,
      right: right,
      bottom: bottom,
      left: left
    }
  }
}

let logos = []
const pos = [
  { x: 600, y: 96 },
  { x: 600, y: 256 },
  { x: 60, y: 127 }
]
function more () {
  if (logos.length < 20) {
    let i = parseInt(Math.random() * pos.length)
    let logo = randomLogo(pos[i].x, pos[i].y)
    logos.push(logo)
    Matter.World.add(world, logo)
    Matter.Body.applyForce(logo, logo.position, { x: Math.random() - 0.5, y: 0.05 })
    Matter.Body.setAngularVelocity(logo, Math.random() - 0.5)
  } else {
    Matter.World.remove(world, logos.shift())
  }
  setTimeout(more, 1000)
}

let holding = false
function keyDown (event) {
  keys[event.key] = true
  if (event.key === 'w' && event.repeat) {
    holding = true
  }
}

function keyUp (event) {
  keys[event.key] = false
  if (event.key === 'w') {
    holding = false
  }
}

function beforeRender (event) {
  // keep player at 0 rotation
  Matter.Body.setAngle(player.body, 0)

  const screenWidth = 64
  const screenHeight = 64
  // fit the render viewport to the scene
  Matter.Render.lookAt(render, {
    min: {
      x: player.body.position.x - screenWidth,
      y: player.body.position.y - screenHeight
    },
    max: {
      x: player.body.position.x + screenWidth,
      y: player.body.position.y + screenHeight
    }
  })

  if (keys['w'] && !holding) {
    if (player.onFloor) {
      // let force = (-0.0275 * player.body.mass)
      let force = (-0.025 * player.body.mass)
      Matter.Body.applyForce(player.body, player.body.position, { x: 0, y: force })
      keys['w'] = false
    } else if (player.onRight) {
      let force = (-0.025 * player.body.mass)
      let forcey = (-0.05 * player.body.mass)
      Matter.Body.applyForce(player.body, player.body.position, { x: force, y: forcey })
      keys['w'] = false
    } else if (player.onLeft) {
      let force = (0.025 * player.body.mass)
      let forcey = (-0.05 * player.body.mass)
      Matter.Body.applyForce(player.body, player.body.position, { x: force, y: forcey })
      keys['w'] = false
    }
  }
  if (keys['d']) {
    let force = (0.0005 * player.body.mass)
    Matter.Body.applyForce(player.body, player.body.position, { x: force, y: 0 })
  }
  if (keys['a']) {
    let force = (-0.0005 * player.body.mass)
    Matter.Body.applyForce(player.body, player.body.position, { x: force, y: 0 })
  }
}

function collisionEnd (event) {
  let pairs = event.pairs

  for (let i = 0, j = pairs.length; i !== j; ++i) {
    let pair = pairs[i]

    if (pair.bodyA === player.sensors.bottom || pair.bodyB === player.sensors.bottom) {
      player.onFloor = false
    } else if (pair.bodyA === player.sensors.right || pair.bodyB === player.sensors.right) {
      player.onRight = false
    } else if (pair.bodyA === player.sensors.left || pair.bodyB === player.sensors.left) {
      player.onLeft = false
    }
  }
}

function collisionActive (event) {
  let pairs = event.pairs

  for (let i = 0, j = pairs.length; i !== j; ++i) {
    let pair = pairs[i]

    if (pair.bodyA === player.sensors.bottom || pair.bodyB === player.sensors.bottom) {
      player.onFloor = true
    } else if (pair.bodyA === player.sensors.right || pair.bodyB === player.sensors.right) {
      player.onRight = true
    } else if (pair.bodyA === player.sensors.left || pair.bodyB === player.sensors.left) {
      player.onLeft = true
    }
  }
}

let lastRect = null
let lastRound = null

function randomLogo (x, y) {
  const roundTextures = [
    { density: 0.025, radius: 30, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoAMP.png' },
    { density: 0.05, radius: 30, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoAtom.png' },
    { density: 0.015, radius: 31, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoBower.png' },
    { density: 0.05, radius: 29, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoChrome.png' },
    { density: 0.015, radius: 24, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoWordpress.png' },
    { density: 0.05, radius: 28, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoYeoman.png' }
  ]

  const rectTextures = [
    { density: 0.7, width: 55, height: 64, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoGrunt.png' },
    { density: 0.8, width: 29, height: 64, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoGulp.png' },
    { density: 0.8, width: 38, height: 64, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoHTML5.png' },
    { density: 0.4, width: 50, height: 50, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoJavascript.png' },
    { density: 0.5, width: 60, height: 22, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoJekyll.png' },
    { density: 0.6, width: 50, height: 52, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoMarionette.png' },
    { density: 0.7, width: 64, height: 18, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoMongoDB.png' },
    { density: 0.8, width: 62, height: 32, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoMySQL.png' },
    { density: 0.6, width: 52, height: 32, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoNodeJS.png' },
    { density: 0.8, width: 60, height: 21, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoNpm.png' },
    { density: 0.7, width: 60, height: 32, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoPHP.png' },
    { density: 0.7, width: 49, height: 62, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoRubyOnRails.png' },
    { density: 0.6, width: 62, height: 48, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoSass.png' }
  ]

  let scale = Matter.Common.random(0.25, 0.65)

  if (Matter.Common.random() > 0.5) {
    let texture = rectTextures[parseInt(Matter.Common.random(0, rectTextures.length))]
    while(lastRect === texture) {
      texture = rectTextures[parseInt(Matter.Common.random(0, rectTextures.length))]
    }
    lastRect = texture
    return Matter.Bodies.rectangle(x, y, texture.width * scale, texture.height * scale, {
      density: texture.density * scale,
      friction: 0.5,
      render: {
        sprite: {
          texture: texture.url,
          xScale: texture.xScale * scale,
          yScale: texture.yScale * scale
        }
      }
    })
  } else {
    let texture = roundTextures[parseInt(Matter.Common.random(0, roundTextures.length))]
    while(lastRound === texture) {
      texture = roundTextures[parseInt(Matter.Common.random(0, roundTextures.length))]
    }
    lastRound = texture
    return Matter.Bodies.circle(x, y, texture.radius * scale, {
      density: texture.density * scale,
      friction: 0.5,
      render: {
        sprite: {
          texture: texture.url,
          xScale: texture.xScale * scale,
          yScale: texture.yScale * scale
        }
      }
    })
  }
}

// create 4 rectangles just outside the visible screen boundary
function screenBounds (width, height, size) {
  const halfW = width / 2
  const halfH = height / 2
  const halfS = size / 2
  const doubleW = width * 2
  const doubleH = height * 2

  return [
    Matter.Bodies.rectangle(halfW, -halfS, doubleW, size, { render: { fillStyle: '#224466' }, isStatic: true }),
    Matter.Bodies.rectangle(width + halfS, halfH, size, doubleH, { render: { fillStyle: '#224466' }, isStatic: true }),
    Matter.Bodies.rectangle(halfW, height + halfS, doubleW, size, { render: { fillStyle: '#224466' }, isStatic: true }),
    Matter.Bodies.rectangle(-halfS, halfH, size, doubleH, { render: { fillStyle: '#224466' }, isStatic: true })
  ]
}
