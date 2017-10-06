var image = new Image(),
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    cell = { width: 8, height: 13 },
    chars = {},
    scale = 1;

canvas.width = cell.width;
canvas.height = cell.height;
ctx.font = cell.height + "px monospace";

var characters = "#*+`´'.:dbPUVMWA<>Xx ".split("")
for (var c = 32; c < 127; c++) {
  //for (var c in characters){
  //  getCharData(characters[c]);
  getCharData(String.fromCharCode(c));
}

image.src = "image.png";

image.onload = function() {
  var width = image.width * scale,
      height = image.height * scale,
      scaledHeight = height * 0.92,
      out = "",
      data, x, y;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, scaledHeight);

  for (y = 0; y < scaledHeight; y += cell.height + 2) {
    for (x = 0; x < width; x += cell.width) {
      data = ctx.getImageData(x, y, cell.width, cell.height).data;
      out += getNearest(data);
    }
    out += "\n";
  }

  ctx.drawImage(image, 0, 0, width, height);
  var output = document.getElementById("output"),
    pre = document.createElement("pre");

  output.style.width = width + "px";
  output.style.height = height + "px";
  pre.innerText = out;
  output.appendChild(canvas);
  output.appendChild(pre);
};

function getCharData(character) {
  if (character == "_") {
    return;
  }

  clear();
  ctx.fillStyle = "#000";
  ctx.fillText(character, 0, cell.height / 1.2);
  chars[character] = ctx.getImageData(0, 0, cell.width, cell.height).data;
}

function getNearest(imageData) {
  var c, i, diff, charData,
      min = Infinity,
      best = " ";

  for (c in chars) {
    charData = chars[c];
    diff = 0;
    for (i = 0; i < charData.length; i += 4) {
      if (imageData[i + 3]) {
        diff += Math.abs(imageData[i] > 200 != charData[i] > 200);
      }
    }
    if (diff < min) {
      min = diff;
      best = c;
    }
  }

  if (best == "Q" || best == "M") {
    return "#";
  }

  return best;
}

function clear() {
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, cell.width, cell.height);
}




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
