class Ascii {
  constructor (canvas, image, fontFamily = 'monospace', fontSize = 16, scale = 1.0, characters = '') {
    this.canvas = canvas
    this.context2D = this.canvas.getContext('2d')
    this.fontFamily = fontFamily
    this.fontSize = fontSize
    this.scale = scale
    this.characterList = this.generateCharacters(characters)

    this.image = new window.Image()
    this.image.src = image
    this.image.addEventListener('load', this.convertImage.bind(this))
  }

  convertImage () {
    // set-up canvas size/scale & draw image
    this.canvas.width = this.image.width * this.scale
    this.canvas.height = this.image.height * this.scale
    this.context2D.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    this.context2D.font = `${this.fontSize}px ${this.fontFamily}`
    this.context2D.textAlign = 'center'
    this.centerY = this.fontSize * 0.75
    this.centerX = this.fontSize * 0.35

    for (let y = 0; y < this.canvas.height; y += this.fontHeight) {
      for (let x = 0; x < this.canvas.width; x += this.fontWidth) {
        // generate imageData (cell.width x cell.height)
        let imageData = this.context2D.getImageData(x, y, this.fontWidth, this.fontHeight).data

        // find matching character from imageData average (lightness)
        let character = this.getMatchingCharacter(imageData)

        // lower opacity on darker characters
        if (character.average.lightness < 75) {
          character.average.a = (character.average.lightness + 1) / 255
        }

        this.context2D.clearRect(x, y, this.fontWidth, this.fontHeight)
        this.context2D.fillStyle = 'rgba(0,0,0,.25)'
        this.context2D.fillRect(x, y, this.fontWidth, this.fontHeight)
        this.context2D.fillStyle = `rgba(${character.average.r}, ${character.average.g}, ${character.average.b}, ${character.average.a})`
        this.context2D.fillText(character.character, x + this.centerX, y + this.centerY)
      }
    }

    this.image.removeEventListener('load', this.convertImage)
  }

  // returns array of { character, average } objects
  generateCharacters (characterString) {
    let characters = []

    if (!characterString || characterString === '') {
      for (let count = 32; count < 127; count++) {
        characters.push(String.fromCharCode(count))
      }
    } else {
      characters = characterString.split('')
    }

    this.fontHeight = this.fontSize
    this.fontWidth = this.fontSize * 0.75
    this.centerY = this.fontSize * 0.75
    this.centerX = this.fontSize * 0.35
    this.canvas.height = this.fontHeight
    this.canvas.width = this.fontWidth
    this.context2D.font = `${this.fontSize}px ${this.fontFamily}`
    this.context2D.textAlign = 'center'

    characters.forEach((character) => {
      let average = this.getCharacterAverage(character)
      if (average) {
        characters.push({
          character: character,
          average: average
        })
      }
    })

    return characters
  }

  // returns average lightness/rgba for a single character
  getCharacterAverage (character) {
    this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context2D.fillStyle = 'white'
    this.context2D.fillText(character, this.centerX, this.centerY)

    let imageData = this.context2D.getImageData(0, 0, this.canvas.width, this.canvas.height).data
    let average = this.getImageDataAverage(imageData)

    // magic # tweak for effect
    average.lightness *= 1.8

    return average
  }

  // returns average lightness/rgba for an imageData
  getImageDataAverage (imageData) {
    let pixelCount = imageData.length / 4
    let average = {
      lightness: 0,
      r: 0,
      g: 0,
      b: 0,
      a: 0
    }

    // running average for this imageData
    for (let i = 0; i < imageData.length; i += 4) {
      average.lightness += (imageData[i] + imageData[i + 1] + imageData[i + 2] + imageData[i + 3]) / 4
      average.r += imageData[i]
      average.g += imageData[i + 1]
      average.b += imageData[i + 2]
      average.a += imageData[i + 3]
    }

    average.lightness = roundClamp(average.lightness / pixelCount, 255)
    average.r = roundClamp(average.r / pixelCount, 255)
    average.g = roundClamp(average.g / pixelCount, 255)
    average.b = roundClamp(average.b / pixelCount, 255)
    average.a = roundClamp(average.a / pixelCount, 255)

    function roundClamp (value, maxValue) {
      return Math.round(Math.min(value, maxValue))
    }

    return average
  }

  // returns { character, average } object that matches this block best
  getMatchingCharacter (imageData) {
    let average = this.getImageDataAverage(imageData)
    let min = Infinity
    let best = null

    this.characterList.forEach((character) => {
      if (character.average) {
        let difference = Math.abs(average.lightness - character.average.lightness)
        if (difference < min) {
          min = difference
          best = character
        }
      }
    })

    return {
      character: best.character,
      average: average
    }
  }
}

document.querySelectorAll('.canvasDemo').forEach((canvasDemo) => {
  const fontFamily = canvasDemo.getAttribute('fontfamily')
  const fontSize = parseInt(canvasDemo.getAttribute('fontsize'))
  const image = canvasDemo.getAttribute('image')
  const scale = parseFloat(canvasDemo.getAttribute('scale'))
  const characters = canvasDemo.getAttribute('characters')
  const demo = new Ascii(canvasDemo, image, fontFamily, fontSize, scale, characters)
  console.log(demo)
})
