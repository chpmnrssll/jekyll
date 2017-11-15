{
const starCount = 64;
const maxTime = 1000;
const universe = document.querySelector(".universe");
const width = universe.offsetWidth*2;
const height = universe.offsetHeight;

for (let i = 0; i < starCount; ++i) {
  let star = document.createElement("div");
  let ypos = r(height);
  let zpos = (i-starCount) * 4;
  let speed = 1000 * r(maxTime);
  star.classList.add("star");

  universe.appendChild(star);
  star.animate([
      { transform: `translate3d(${-width}px, ${ypos}px, ${zpos}px)` },
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
}
