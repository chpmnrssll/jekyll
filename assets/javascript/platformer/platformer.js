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
  let Engine = Matter.Engine
  let Render = Matter.Render
  let Runner = Matter.Runner
  let Composites = Matter.Composites
  let Common = Matter.Common
  let MouseConstraint = Matter.MouseConstraint
  let Mouse = Matter.Mouse
  let World = Matter.World
  let Bodies = Matter.Bodies

  // create engine
  let engine = Engine.create()
  let world = engine.world
  let canvas = document.querySelector('#platformer')
  let style = window.getComputedStyle(canvas)

  // create renderer
  let render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      background: '#0f0f13',
      width: parseInt(style.width),
      height: parseInt(style.height),
      showAngleIndicator: false,
      wireframes: false
    }
  })

  Render.run(render)

  // create runner
  let runner = Runner.create()
  Runner.run(runner, engine)

  // add bodies
  world.bodies = []

  const width = render.options.width
  const height = render.options.height
  const wallSize = 10

  // these static walls will not be rendered in this sprites example, see options
  World.add(world, [
    Bodies.rectangle(width / 2, 0, width * 2, wallSize, { isStatic: true }),
    Bodies.rectangle(width, height / 2, wallSize, height * 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width * 2, wallSize, { isStatic: true }),
    Bodies.rectangle(0, height / 2, wallSize, height * 2, { isStatic: true })
  ])

  let stack = Composites.stack(0, 0, 32, 16, width / 16, height / 16, (x, y) => {
    let r = Common.random()
    if (r > 0.5) {
      return Bodies.rectangle(x, y, 58, 22, {
        density: 0.5,
        render: {
          sprite: {
            texture: '/assets/images/logo/logoNpm.png',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      })
    } else if (r > 0.25) {
      return Bodies.circle(x, y, 30, {
        density: 0.005,
        render: {
          sprite: {
            texture: '/assets/images/logo/logoAtom.png',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      })
    } else if (r > 0.10) {
      return Bodies.circle(x, y, 30, {
        density: 0.25,
        render: {
          sprite: {
            texture: '/assets/images/logo/logoYeoman.png',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      })
    } else {
      return Bodies.circle(x, y, 30, {
        density: 0.05,
        render: {
          sprite: {
            texture: '/assets/images/logo/logoBower.png',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      })
    }
  })

  World.add(world, stack)

  // add mouse control
  let mouse = Mouse.create(render.canvas)
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  })

  World.add(world, mouseConstraint)

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // fit the render viewport to the scene
  // Render.lookAt(render, {
  //   min: {
  //     x: 0,
  //     y: 0
  //   },
  //   max: {
  //     x: width,
  //     y: height
  //   }
  // })

  Engine.run(engine)
}
