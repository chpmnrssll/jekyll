const image = new window.Image()
image.src = '/assets/images/80s/thrillaGorilla.png'

image.onload = function () {
  const font = 'monospace'
  const scale = 1
  const cell = {
    width: 4,
    height: 4
  }

  let characters = generateCharacters()
  let output = document.getElementById('output')
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let ascii = document.createElement('pre')

  ascii.style.width = `${canvas.width}px`
  ascii.style.height = `${canvas.height}px`
  ascii.style.font = `${cell.height * 2}px ${font}`
  ascii.style.letterSpacing = `${cell.width * 2 * 0.2}px`
  ascii.style.lineHeight = `${cell.height * 2}px`

  convertImage().forEach(function (match) {
    let span = document.createElement('span')
    let average = match.average
    span.innerText = match.character
    span.style.color = `rgba(${average.r}, ${average.g}, ${average.b}, ${average.a})`
    span.style.textShadow = `0px 0px 4px ${span.style.color}`
    ascii.appendChild(span)
  })

  // canvas.width /= 4;
  // canvas.height /= 4;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  output.appendChild(canvas)
  output.appendChild(ascii)

  // returns array of { character, average } objects
  function generateCharacters () {
    canvas.width = cell.width
    canvas.height = cell.height
    ctx.font = `${cell.height}px ${font}`

    // use preset characters
    // let characters = "#*+`´'.:<>Xx ".split('')
    // characters.forEach(function (character) {
    //   let average = getCharacterAverage(character)
    //   if (average) {
    //     characters.push({ character: character, average: average })
    //   }
    // })

    // use many characters
    for (let count = 32; count < 127; count++) {
      let character = String.fromCharCode(count)
      let average = getCharacterAverage(character)

      if (average) {
        characters.push({character: character, average: average})
      }
    }

    return characters
  }

  // returns average lightness/rgba for a single character
  function getCharacterAverage (character) {
    let imageBlock = ctx.getImageData(0, 0, cell.width, cell.height).data
    let average = {
      lightness: 0,
      r: 0,
      g: 0,
      b: 0,
      a: 0
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, cell.width, cell.height)
    ctx.fillStyle = 'white'
    ctx.fillText(character, 0, cell.height)

    average = getBlockAverage(imageBlock)
    average.lightness *= 3.25 // magic #, unknown force, ???

    return average
  }

  // returns average lightness/rgba for an imageBlock
  function getBlockAverage (imageBlock) {
    let pixelCount = imageBlock.length / 4
    let average = {
      lightness: 0,
      r: 0,
      g: 0,
      b: 0,
      a: 0
    }

    // running average for this imageBlock
    for (let i = 0; i < imageBlock.length; i += 4) {
      average.lightness += (imageBlock[i] + imageBlock[i + 1] + imageBlock[i + 2]) / 3
      average.r += imageBlock[i]
      average.g += imageBlock[i + 1]
      average.b += imageBlock[i + 2]
      average.a += imageBlock[i + 3]
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

  // returns an array of { character, average } objects
  function convertImage () {
    let output = []
    let average = {
      lightness: 0,
      r: 0,
      g: 0,
      b: 0,
      a: 0
    }

    // set-up canvas size/scale & draw image
    canvas.width = image.width * scale
    canvas.height = image.height * scale
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    for (let y = 0; y < canvas.height; y += cell.width) {
      for (let x = 0; x < canvas.width; x += cell.height) {
        // generate imageBlock (cell.width x cell.height)
        let imageBlock = ctx.getImageData(x, y, cell.width, cell.height).data

        // find matching character from imageBlock average (lightness)
        let character = getMatchingCharacter(imageBlock)

        // filter errant dark characters
        if (character.average.lightness < 50) {
          character.average.a = 0
        }
        output.push(character)
      }

      // end of the line
      output.push({character: '\n', average: average})
    }

    return output
  }

  // returns { character, average } object that matches this block best
  function getMatchingCharacter (imageBlock) {
    let average = getBlockAverage(imageBlock)
    let min = Infinity
    let best = null

    characters.forEach(function (character) {
      if (character.average) {
        let difference = Math.abs(average.lightness - character.average.lightness)
        if (difference < min) {
          min = difference
          best = character
        }
      }
    })

    return {character: best.character, average: average}
  }
}
