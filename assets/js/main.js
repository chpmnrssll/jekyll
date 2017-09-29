let parallax = $("#parallax"),
    win = $(window),
    scrollTop = 0;

// Parallax header image (2D Fast!)
$(window).on("scroll", function () {
  requestAnimationFrame(function () {
    scrollTop = -win.scrollTop() >> 2;
    parallax.css("background-position", "center " + scrollTop + "px");
  });
});

// 3D article summary cards
$(".featured-items__article-summary").on("mousemove", function(e) {
  const that = this;
  requestAnimationFrame(function () {
    const tmp = $(that);  // save a jquery lookup (x3)
    let w = tmp.width();
    let h = tmp.height();
    let offset = tmp.offset();
    let hw = w >> 1;  // >> 1 === /2
    let hh = h >> 1;
    let xOffset = ((e.clientX - offset.left) / w) - 0.5;
    let yOffset = ((e.clientY - offset.top + window.scrollY) / h) - 0.5;

    that.style.setProperty("--x-offset", xOffset);
    that.style.setProperty("--y-offset", yOffset);
    that.style.setProperty("--x-pos", (xOffset * hw) + w);
    that.style.setProperty("--y-pos", (yOffset * hh) + h);
  });
});

// Reset card offset & position
$(".featured-items__article-summary").on("mouseleave", function(e) {
  const that = this;
  requestAnimationFrame(function () {
    const tmp = $(that);  // save a jquery lookup (x2)
    that.style.setProperty("--x-offset", 0);
    that.style.setProperty("--y-offset", 0);
    that.style.setProperty("--x-pos", tmp.width());
    that.style.setProperty("--y-pos", tmp.height());
  });
});

// Scroll to Top button
$(".top").click(function () {
  $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
});

if(localStorage.getItem("hsl")) {
  let themeColor = JSON.parse(localStorage.getItem("hsl"));
  document.documentElement.style.setProperty("--hue", themeColor.h);
  document.documentElement.style.setProperty("--saturation", themeColor.s + "%");
  document.documentElement.style.setProperty("--lightness", themeColor.l + "%");
}

$("#themeColor").change(function () {
  let color = hexToHSL(this.value);
  localStorage.setItem("hsl", JSON.stringify({ h: color.h, s: color.s, l: color.l }));
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

  if(max == min) {
      h = s = 0; // achromatic
  } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  s = s*100;
  l = l*100;
  s = Math.round(s);
  l = Math.round(l);
  h = Math.round(360*h);
  return { h: h, s: s, l: l };
}
