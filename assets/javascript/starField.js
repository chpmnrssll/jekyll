function createStarField (parentElement) {
  const starCount = 100
  const maxTime = 1000

  let universe = document.createElement('div')
  universe.classList.add('universe')
  parentElement.appendChild(universe)

  for (let i = 0; i < starCount; ++i) {
    const width = universe.offsetWidth * 2
    const height = universe.offsetHeight
    let star = document.createElement('div')
    let zpos = i - r(starCount * 4)
    let ypos = r(height)
    let speed = maxTime * r(maxTime)

    star.classList.add('star')
    universe.appendChild(star)
    star.animate([
      { transform: `translate3d(${width}px, ${ypos}px, ${zpos}px)` },
      { transform: `translate3d(${-width + 16}px, ${ypos}px, ${zpos}px)` }
    ], {
      delay: r(-speed),
      duration: speed,
      iterations: Infinity
    })
  }

  function r (num) {
    return Math.round(Math.random() * num)
  }
}
