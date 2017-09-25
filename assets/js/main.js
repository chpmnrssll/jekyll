let parallax = $("#parallax"),
    win = $(window),
    scrollTop = 0;

$(window).on("scroll", function() {
  requestAnimationFrame(anim);
  function anim() {
    scrollTop = -win.scrollTop() >> 2;
    parallax.css("background-position", "center " + scrollTop + "px");
    console.log(scrollTop);
  }
});

// Scroll to Top
$(".top").click(function() {
  $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
});
