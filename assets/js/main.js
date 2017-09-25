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
*/
let para = $("#para");
$(window).on("scroll", function() {
  window.requestAnimationFrame(function() {
    //let scrollTop = ~~(-$(window).scrollTop() * 0.5);
    para.css("background-position", "center " + ~~(-$(window).scrollTop() * 0.5) + "px");
    //console.log(scrollTop);
  });
});
