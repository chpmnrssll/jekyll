window.addEventListener('load', (event) => {
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

  // create renderer
  let render = Render.create({
    element: document.querySelector('article'),
    engine: engine,
    options: {
      width: 800,
      height: 600,
      hasBounds: true,
      bounds: Matter.Bounds.create(),
      // losing track of time, damn dinosaur!
      background: '#0f0f13',
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

  const width = 800
  const height = 600
  const wallSize = 10

  // these static walls will not be rendered in this sprites example, see options
  World.add(world, [
    Bodies.rectangle(-width, -height, width * 2, wallSize, { isStatic: true }),
    Bodies.rectangle(width - wallSize, -height, wallSize, height * 2, { isStatic: true }),
    Bodies.rectangle(0, height - wallSize, width * 2, wallSize, { isStatic: true }),
    Bodies.rectangle(0, 0, wallSize, height * 2, { isStatic: true })
  ])

  let stack = Composites.stack(0, 0, 10, 5, 50, 10, function (x, y) {
    if (Common.random() > 0.35) {
      return Bodies.rectangle(x, y, 58, 22, {
        render: {
          sprite: {
            texture: '/assets/images/logo/logoNpm.png',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      })
    } else {
      return Bodies.circle(x, y, 30, {
        density: 0.0005,
        frictionAir: 0.06,
        // restitution: 0.3,
        friction: 0.01,
        render: {
          sprite: {
            texture: '/assets/images/logo/logoAtom.png',
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
  //     x: -width,
  //     y: -height
  //   },
  //   max: {
  //     x: width,
  //     y: height
  //   }
  // })
  render.bounds = {
    min: {
      x: -width,
      y: -height
    },
    max: {
      x: width,
      y: height
    }
  }

  Engine.run(engine)
})
