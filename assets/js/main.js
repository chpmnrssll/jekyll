let parallax = document.querySelector(".parallax-header"), scrollTop = 0;

// Parallax header image (2D - not fast enough)
window.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    if(parallax) {
      scrollTop = window.pageYOffset >> 2;
      parallax.style.backgroundPosition = "center " + -scrollTop + "px";
    }
  });
}, { passive: true });

// https://developer.mozilla.org/en-US/docs/Web/API/NodeList
NodeList.prototype.addEventListener = function(event, callback) {
  this.forEach((element) => {
    element.addEventListener(event, callback);
  });
}

// 3D article summary cards
const cards = document.querySelectorAll(".featured-items__3DCard");

// calculate rotation and parallax, then set CSS custom properties
cards.addEventListener("mousemove", (event) => {
  const currentTarget = event.currentTarget;
  requestAnimationFrame(() => {
    const width = currentTarget.clientWidth;
    const height = currentTarget.clientHeight;
    const halfWidth = width >> 1;
    const halfHeight = height >> 1;

    // offset from center of card for rotation, range(-0.5, 0.5)
    const scrollOffset = currentTarget.offsetParent.offsetTop + currentTarget.offsetTop - window.pageYOffset;
    const xOffset = ((event.clientX - currentTarget.offsetLeft) / width) - 0.5;
    const yOffset = ((event.clientY - scrollOffset) / height) - 0.5;

    // parallax background-position, range(0, 50)
    const xPos = (xOffset * halfWidth) >> 1;
    const yPos = (yOffset * halfHeight) >> 1;

    currentTarget.style.setProperty("--x-offset", xOffset);
    currentTarget.style.setProperty("--y-offset", yOffset);
    currentTarget.style.setProperty("--x-pos", xPos);
    currentTarget.style.setProperty("--y-pos", yPos);
  });
}, { passive: true });

// reset card rotation & background-position
cards.addEventListener("mouseleave", (event) => {
  const currentTarget = event.currentTarget;
  requestAnimationFrame(() => {
    currentTarget.style.setProperty("--x-offset", 0);
    currentTarget.style.setProperty("--y-offset", 0);
    currentTarget.style.setProperty("--x-pos", 0);
    currentTarget.style.setProperty("--y-pos", 0);
  });
}, { passive: true });

// load themeColor from localStorage, { hex, h, s, l }
if (localStorage.getItem("themeColor")) {
  const themeColor = JSON.parse(localStorage.getItem("themeColor"));
  document.querySelector("#themeColor").value = themeColor.hex;
  document.documentElement.style.setProperty("--hue", themeColor.h);
  document.documentElement.style.setProperty("--saturation", themeColor.s + "%");
  document.documentElement.style.setProperty("--lightness", themeColor.l + "%");
}

// save themeColor to localStorage and update CSS custom properties
document.querySelector("#themeColor").addEventListener("input", (event) => {
  const color = hexToHSL(event.target.value);
  localStorage.setItem("themeColor", JSON.stringify({ h: color.h, s: color.s, l: color.l, hex: color.hex }));
  document.documentElement.style.setProperty("--hue", color.h);
  document.documentElement.style.setProperty("--saturation", color.s + "%");
  document.documentElement.style.setProperty("--lightness", color.l + "%");
});

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

// Scroll to top button
document.querySelector("#top-button").addEventListener("click", () => {
  scrollTo(0, 500, "easeInOutQuad");
}, { passive: true });

// https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
function scrollTo(destination, duration = 200, easing = "linear") {
  const easings = {
    linear(t) { return t; },
    easeInQuad(t) { return t * t; },
    easeInCubic(t) { return t * t * t; },
    easeInQuart(t) { return t * t * t * t; },
    easeInQuint(t) { return t * t * t * t * t; },
    easeOutQuad(t) { return t * (2 - t); },
    easeOutCubic(t) { return (--t) * t * t + 1; },
    easeOutQuart(t) { return 1 - (--t) * t * t * t; },
    easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
    easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
  };

  const start = window.pageYOffset;
  const startTime = "now" in window.performance ? performance.now() : new Date().getTime();
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;
  const destinationOffset = typeof destination === "number" ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  function tick() {
    const now = "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset !== destinationOffsetToScroll) {
      requestAnimationFrame(tick);
    } else {
      return;
    }
  }

  requestAnimationFrame(tick);
}
