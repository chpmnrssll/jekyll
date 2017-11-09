// load themeColor from localStorage, { hex, h, s, l }
let themeColor = JSON.parse(localStorage.getItem("themeColor"));

if (themeColor) {
  document.documentElement.style.setProperty("--hue", themeColor.hue);
  document.documentElement.style.setProperty("--saturation", themeColor.saturation + "%");
  document.documentElement.style.setProperty("--lightness", themeColor.lightness + "%");
}

function hexToHSL(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  l = l * 100;
  s = Math.round(s);
  l = Math.round(l);
  h = Math.round(360 * h);
  return { hex: hex, h: h, s: s, l: l };
}
