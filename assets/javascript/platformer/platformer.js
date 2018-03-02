(() => {
  setTimeout(() => {
    let script = document.createElement('script')
    script.setAttribute('src', '/assets/javascript/vendor/Matter/build/matter.min.js')
    script.onload = init

    let article = document.querySelector('article')
    article.appendChild(script)
  }, 1000)
})()

function init () {
  // create engine
  let engine = Matter.Engine.create()
  let world = engine.world
  let canvas = document.querySelector('#platformer')
  let style = window.getComputedStyle(canvas)

  // create renderer
  let render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      // background: '#0f0f13',
      width: parseInt(style.width),
      height: parseInt(style.height),
      showAngleIndicator: false,
      wireframes: false
    }
  })

  Matter.Render.run(render)

  // create runner
  let runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)

  // add bodies
  world.bodies = []

  Matter.World.add(world, screenBounds(render.options.width, render.options.height, 100))

  let w = parseInt(render.options.width / 8)
  let h = parseInt(render.options.height / 8)
  let stack = Matter.Composites.stack(0, 0, 4, 4, w, h, randomLogo)
  Matter.World.add(world, stack)

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

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // fit the render viewport to the scene
  // Matter.Render.lookAt(render, {
  //   min: {
  //     x: 0,
  //     y: 0
  //   },
  //   max: {
  //     x: width,
  //     y: height
  //   }
  // })

  Matter.Engine.run(engine)
}

let lastRect = null
let lastRound = null

function randomLogo (x, y) {
  const roundTextures = [
    { density: 0.025, radius: 30, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoAMP.png' },
    { density: 0.005, radius: 30, xScale: 0.25, yScale: 0.25, url: '/assets/images/logo/logoAtom.png' },
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

  let scale = Matter.Common.random(1, 1.5)

  if (Matter.Common.random() > 0.5) {
    let texture = rectTextures[parseInt(Matter.Common.random(0, rectTextures.length))]
    while(lastRect === texture) {
      texture = rectTextures[parseInt(Matter.Common.random(0, rectTextures.length))]
    }
    lastRect = texture
    return Matter.Bodies.rectangle(x, y, texture.width * scale, texture.height * scale, {
      density: texture.density * scale,
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

function screenBounds (width, height, size) {
  const halfW = width / 2
  const halfH = height / 2
  const halfS = size / 2
  const doubleW = width * 2
  const doubleH = height * 2

  return [
    Matter.Bodies.rectangle(halfW, -halfS, doubleW, size, { isStatic: true }),
    Matter.Bodies.rectangle(width + halfS, halfH, size, doubleH, { isStatic: true }),
    Matter.Bodies.rectangle(halfW, height + halfS, doubleW, size, { isStatic: true }),
    Matter.Bodies.rectangle(-halfS, halfH, size, doubleH, { isStatic: true })
  ]
}
