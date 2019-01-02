class AmbientLight {
  constructor (options = {
    r: 0,
    g: 0.5,
    b: 1,
    a: 0.25
  }) {
    Object.assign(this, options)
  }
}

// point light will emit light from a position in all directions
class PointLight {
  constructor (options = {
    x: 0,
    y: 0,
    z: 64,
    radius: 128,
    r: 1,
    g: 0.8,
    b: 0.4,
    a: 1
  }) {
    Object.assign(this, options)
  }

  // attenuation reduces the light luminance based on distance
  attenuateDistance (distance) {
    const f = distance / this.radius
    return 1 / (f * f)
  }
}

class NormalMap {
  constructor (width = 256, height = 256) {
    this.canvas = document.querySelector('.canvasDemo')
    this.canvas.style.imageRendering = 'pixelated'
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.centerX = width / 2
    this.canvas.centerY = height / 2
    this.context2D = this.canvas.getContext('2d')
    this.context2D.imageSmoothingEnabled = false
    this.buffer = this.context2D.createImageData(width, height)

    this.ambientLight = new AmbientLight()
    this.pointLight = new PointLight()

    this.texture = {
      image: new window.Image(),
      normalMap: new window.Image()
    }

    this.texture.image.src = '/assets/images/route-66.png'
    this.texture.image.onload = this.loadHandler.bind(this)
    this.texture.normalMap.src = '/assets/images/route-66_normals.png'
    this.texture.normalMap.onload = this.loadHandler.bind(this)

    this.imagesLoaded = 0
    this.running = true
  }

  loadHandler () {
    if (++this.imagesLoaded === 2) {
      // get the imageData of the texture
      this.context2D.drawImage(this.texture.image, 0, 0, this.canvas.width, this.canvas.height)
      const textureImageData = this.context2D.getImageData(0, 0, this.canvas.width, this.canvas.height)
      this.texture.diffuse = new Float32Array(textureImageData.data)

      // normalize texture colors to range of 0 to 1
      for (let i = 0; i < this.texture.diffuse.length; i += 4) {
        this.texture.diffuse[i] /= 255
        this.texture.diffuse[i + 1] /= 255
        this.texture.diffuse[i + 2] /= 255
        this.texture.diffuse[i + 3] = 1
      }

      // get the imageData of the normal map, normals (x, y, z) === colors (r, g, b)
      this.context2D.drawImage(this.texture.normalMap, 0, 0, this.canvas.width, this.canvas.height)
      const normalMapImageData = this.context2D.getImageData(0, 0, this.canvas.width, this.canvas.height)
      this.texture.normals = new Float32Array(normalMapImageData.data)

      // normals must be converted to a range of -1 to 1
      for (let j = 0; j < this.texture.normals.length; j += 4) {
        let x = (this.texture.normals[j] / 255) * 2 - 1
        let y = (this.texture.normals[j + 1] / 255) * 2 - 1
        let z = (this.texture.normals[j + 2] / 255) * 2 - 1
        let l = this.length(x, y, z)

        // they must also be normalised to get the surface normal direction
        this.texture.normals[j] = x / l
        this.texture.normals[j + 1] = y / l
        this.texture.normals[j + 2] = z / l
        this.texture.normals[j + 3] = 1
      }

      this.update()
    }
  }

  stop () {
    this.running = false
  }

  update () {
    const tick = window.performance.now() * 0.0005
    // move the point light
    this.pointLight.x = this.canvas.centerX + Math.sin(tick) * this.canvas.centerX
    this.pointLight.y = this.canvas.centerY + Math.cos(tick) * this.canvas.centerY

    // the code below will determine the color of every pixel on screen
    let diffuse = this.texture.diffuse
    let normals = this.texture.normals
    let output = this.buffer.data

    for (let i = 0; i < output.length; i += 4) {
      // get the pixel color from the texture. This is the diffuse color.
      let diffuseR = diffuse[i]
      let diffuseG = diffuse[i + 1]
      let diffuseB = diffuse[i + 2]

      // get the corresponding normal from the normal map
      let normalX = normals[i]
      let normalY = normals[i + 1]
      let normalZ = normals[i + 2]

      // get screen space position (x, y)
      // let j = i / 4
      const tmp = i >> 2
      let fragmentX = tmp % this.canvas.width
      let fragmentY = (tmp / this.canvas.width) >> 0 // bitwise Math.floor

      // determine distance to the point light
      let lightDirX = this.pointLight.x - fragmentX
      let lightDirY = this.pointLight.y - fragmentY
      let lightDirZ = this.pointLight.z
      let lightDist = this.length(lightDirX, lightDirY, lightDirZ)

      // normalize distance to get direction
      lightDirX /= lightDist
      lightDirY /= lightDist
      lightDirZ /= lightDist

      // dot product of light direction and surface normal (the direction that pixel of surface is 'pointing')
      // negative values indicate that the pixel is pointing away from the light, so it will not be illuminated (clamped to 0)
      // positive values indicate that teh pixel is pointing towards the light, so it be illuminated based on the angle (0 to 1)
      let dp = this.dot(lightDirX, lightDirY, lightDirZ, normalX, normalY, normalZ)
      let reflection = dp < 0 ? 0 : dp

      // this will reduce the effect of the point light based on distance
      let attenuation = this.pointLight.attenuateDistance(lightDist)

      // this is the effect of the point light on this pixel
      const rXa = reflection * attenuation
      let pointR = this.pointLight.r * this.pointLight.a * rXa
      let pointG = this.pointLight.g * this.pointLight.a * rXa
      let pointB = this.pointLight.b * this.pointLight.a * rXa

      // this is the effect of the ambient light on this pixel (same for all pixels)
      let ambientR = this.ambientLight.r * this.ambientLight.a
      let ambientG = this.ambientLight.g * this.ambientLight.a
      let ambientB = this.ambientLight.b * this.ambientLight.a

      // final color = texture color * (ambient light color + point light color)
      output[i] = diffuseR * (ambientR + pointR) * 255
      output[i + 1] = diffuseG * (ambientG + pointG) * 255
      output[i + 2] = diffuseB * (ambientB + pointB) * 255
      output[i + 3] = 255
    }

    // render the processed image data onto the canvas
    this.context2D.putImageData(this.buffer, 0, 0)

    // show light position
    this.context2D.fillStyle = '#fff4'
    this.context2D.beginPath()
    this.context2D.arc(this.pointLight.x, this.pointLight.y, 5, 0, Math.PI << 1)
    this.context2D.fill()

    if (this.running) {
      window.requestAnimationFrame(this.update.bind(this))
    }
  }

  // vector dot product
  dot (x1, y1, z1, x2, y2, z2) {
    return x1 * x2 + y1 * y2 + z1 * z2
  }

  // vector length
  length (x, y, z) {
    return Math.sqrt(x * x + y * y + z * z)
  }
}

window.demo = new NormalMap(320, 180)
