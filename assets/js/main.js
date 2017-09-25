// Scroll Top
/*
$(".top").click(function() {
  $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
});

$(window).scroll(function() {
  if ($(this).scrollTop() > $(window).height()) {
    $(".top").addClass("up");
  } else {
    $(".top").removeClass("up");
  }
});

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var scrollEl = document.body; // Element that user scrolls.
    var parallaxContainer = document.getElementById("parallax-container");
    var parallaxGroups = parallaxContainer.querySelectorAll(".parallax-group");
    var parallaxGroupHeight = parallaxGroups[0].offsetHeight;
    var parallaxBgs = parallaxContainer.querySelectorAll(".parallax-bg");
    var numOfParallaxBgs = parallaxBgs.length;
    var parallaxBgHeight = parallaxBgs[0].offsetHeight;
    var diffHeight = parallaxBgHeight - parallaxGroupHeight;
    var parallaxBgOffsets = [];
    var i, parallaxBg, parallaxBgBoundingRect, parallaxBgOffset, parallaxScrollAmt, transform;

    // Cache initial offsets of parallax backgrounds.
    for (i = 0; i < numOfParallaxBgs; i++) {
      parallaxBgBoundingRect = parallaxBgs[i].getBoundingClientRect();
      parallaxBgOffsets.push(parallaxBgBoundingRect.top + scrollEl.scrollTop);
    }
    console.log(parallaxBgOffsets);

    var render = function () {
      // Loop thru parallax backgrounds.
      for (i = 0; i < numOfParallaxBgs; i++) {
        // Calculate the transformation (`~~` is a bitwise round).
        parallaxBgOffset = scrollEl.scrollTop - parallaxBgOffsets[i];
        parallaxScrollAmt = ~~(parallaxBgOffset / parallaxGroupHeight * diffHeight);
        transform = 'translate3d(0, ' + parallaxScrollAmt + 'px, 0)';

        // Transform the DOM element.
        parallaxBg = parallaxBgs[i];
        parallaxBg.style.webkitTransform = transform;
        parallaxBg.style.MozTransform = transform;
        parallaxBg.style.msTransform = transform;
        parallaxBg.style.OTransform = transform;
        parallaxBg.style.transform = transform;
      }
    };

    (function loop () {
      window.requestAnimationFrame(loop);
      render();
    })();
  });
})();
*/
var translate = function() {
  //$("#para").css("transform", "translateY(" + -$(window).scrollTop() * 0.5 + "px)");
  $("#para").css("background-position", "0 " + -$(window).scrollTop() + "px");
}

$(window).on("scroll", function() {
   window.requestAnimationFrame(translate);
});
