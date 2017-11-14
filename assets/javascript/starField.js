var starCount = 100;
var maxTime = 1000;
var universe = document.querySelector(".universe");
var width = universe.offsetWidth*2;
var height = universe.offsetHeight;

for (var i = 0; i < starCount; ++i) {
  var star = document.createElement("div");
  var ypos = r(height);
  var zpos = (i * 2);
  var speed = 1000 * r(maxTime + 1);
  star.classList.add("star");
  star.style.backgroundColor = `rgb(${255-r(127)}, ${255-r(127)}, ${255-r(127)})`;

  universe.appendChild(star);
  star.animate([
      { transform: `translate3d(${-16}px, ${ypos}px, ${zpos}px)` },
      { transform: `translate3d(${width+16}px, ${ypos}px, ${zpos}px)` }
    ],
    {
      delay: r(-speed),
      duration: speed,
      iterations: 1000 }
  );

  function r(num) {
    return Math.round(Math.random() * num);
  }
}
