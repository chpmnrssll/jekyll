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
$(".top").click(function() {
  $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
});
