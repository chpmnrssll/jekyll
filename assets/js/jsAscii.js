let output = document.getElementById("output"),
    canvas = document.createElement("canvas"),
    ascii = document.createElement("pre");
    ctx = canvas.getContext("2d"),
    image = new Image();

image.src = "/assets/images/skull.png";

image.onload = function() {
  let characters = "#*+`´'.:dbPUVA<>Xx ".split(""),
      cell = { width: 8, height: 8 },
      characterLightnessValues = [],
      outputCharacters = [],
      scale = 1.5;


  function getCharacterLightness(character) {
    // clear canvas (black)
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cell.width, cell.height);

    // draw the character (white)
    ctx.fillStyle = "#FFF";
    ctx.fillText(character, 0, cell.height / 2);

    let data = ctx.getImageData(0, 0, cell.width, cell.height).data, avg = 0;

    // running average of lightness for this imageData block
    for (let i = 0; i < data.length; i += 4) {
      let lightness = (data[i] + data[i+1] + data[i+2]) / 3;
      avg += lightness;
    }

    avg /= (data.length / 4);
    return Math.round(Math.min(avg*8, 255));
  }


  function getMatchingCharacter(data) {
    let avg = { lightness:0, r:0, g:0, b:0, a:0 },
        pixelCount = data.length / 4;
        min = Infinity,
        best = " ";

    // running average of lightness, & rgba for this imageData block
    for (let i = 0; i < data.length; i += 4) {
      let lightness = (data[i] + data[i+1] + data[i+2]) / 3;
      avg.lightness += lightness;
      avg.r += data[i];
      avg.g += data[i+1];
      avg.b += data[i+2];
      avg.a += data[i+3];
    }

    avg.lightness /= pixelCount;
    avg.r /= pixelCount;
    avg.g /= pixelCount;
    avg.b /= pixelCount;
    avg.a /= pixelCount;

    avg.lightness = Math.round(avg.lightness)
    avg.r = Math.round(avg.r);
    avg.g = Math.round(avg.g);
    avg.b = Math.round(avg.b);
    avg.a = Math.round(avg.a);

    // find character with lightness that closely matches this imageData block
    characters.forEach(function (character) {
      let difference = Math.abs(avg.lightness - characterLightnessValues[character]);
      if (difference < min) {
        min = difference;
        best = character;
      }
    });

    return { character: best, average: avg };
  }


  // draw the characters and get lightness value (imageData)
  canvas.width = cell.width;
  canvas.height = cell.height;
  ctx.font = cell.height + "px Share Tech Mono monospace";

  // use characters array from above
  /*characters.forEach(function (character) {
    characterLightnessValues[character] = getCharacterLightness(character);
  });*/

  // use all characters from 32-127
  for (let character = 32; character < 127; character++) {
    let string = String.fromCharCode(character);
    characters[string] = string;
    characterLightnessValues[string] = getCharacterLightness(string);
  }

  //change canvas size & draw image
  canvas.width = this.width * scale;
  canvas.height = this.height * scale;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // loop through imageData (by cell size)
  for (let y = 0; y < canvas.height; y += cell.width) {
    for (let x = 0; x < canvas.width; x += cell.height) {
      let data = ctx.getImageData(x, y, cell.width, cell.height).data;
      //find matching character from imageData block, add to outputCharacters
      outputCharacters.push(getMatchingCharacter(data));
    }
    // end of the line
    let avg = { lightness:0, r:0, g:0, b:0, a:0 };
    outputCharacters.push({ character: "\n", average: avg });
  }


  // final results
  ascii.style.width = canvas.width + "px";
  ascii.style.height = canvas.height + "px";
  ascii.style.font = cell.height + "px monospace";
  ascii.style.letterSpacing = cell.width*0.4 + "px";
  ascii.style.lineHeight = cell.height*1.1 + "px";
  outputCharacters.forEach(function (match) {
    let span = document.createElement("span");
    span.innerText = match.character;
    span.style.color = "rgba("+match.average.r+", "+match.average.g+", "+match.average.b+", "+match.average.a+")";
    span.style.textShadow = "0px 0px 6px " + span.style.color;
    ascii.appendChild(span);
  });

  canvas.width /= 4;
  canvas.height /= 4;
  canvas.style.float = "right";
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  output.appendChild(canvas);
  output.appendChild(ascii);
};

//////////////////////////////////////////////////


function imageToASCII(img) {
  let html, bmp, x, y;

  // Create a bitmap from the image
  bmp = new Bitmap(img);

  // The text will be enclosed in a paragraph tag with the class
  // ascii_art so that we can apply CSS styles to it.
  html += "<p>";

  // Loop through each pixel in the bitmap
  for (y = 0; y < bmp.Height; y++) {
    for (x = 0; x < bmp.Width; x++) {
      // Get the color of the current pixel
      let col = bmp.GetPixel(x, y);

      // To convert to grayscale, the easiest method is to add the R+G+B colors
      // and divide by three to get the gray scaled color.
      col = Color.FromArgb((col.R + col.G + col.B) / 3,
                           (col.R + col.G + col.B) / 3,
                           (col.R + col.G + col.B) / 3);

      // Get the R(ed) value from the grayscale color, between 0-255.
      let rValue = int.Parse(col.R.ToString());

      // Append the "color" using various darknesses of ASCII character.
      html += getGrayShade(rValue);

      // If we're at the width, insert a line break
      if (x === bmp.Width - 1) {
        html += "<br/>";
      }
    }
  }

  // Close the paragraph tag, and return the html string.
  html += "</p>";
  return html;
}

function getGrayShade(lightness) {
  if (lightness >= 230) {
    return WHITE;
  } else if (lightness >= 200) {
    return LIGHTGRAY;
  } else if(lightness >= 180) {
    return SLATEGRAY;
  } else if(lightness >= 160) {
    return GRAY;
  } else if(lightness >= 130) {
    return MEDIUM;
  } else if(lightness >= 100) {
    return MEDIUMGRAY;
  } else if(lightness >= 70) {
    return DARKGRAY;
  } else if(lightness >= 50) {
    return CHARCOAL;
  } else {
    return BLACK;
  }
}
