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
