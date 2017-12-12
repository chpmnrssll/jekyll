// Scroll to top button
document.querySelector('#top-button').addEventListener('click', () => {
  scrollTo(0, 500, 'easeInOutQuad')
}, { passive: true })

// https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
function scrollTo (destination, duration = 200, easing = 'linear') {
  const easings = {
    linear (t) { return t },
    easeInQuad (t) { return t * t },
    easeInCubic (t) { return t * t * t },
    easeInQuart (t) { return t * t * t * t },
    easeInQuint (t) { return t * t * t * t * t },
    easeOutQuad (t) { return t * (2 - t) },
    easeOutCubic (t) { return (--t) * t * t + 1 },
    easeOutQuart (t) { return 1 - (--t) * t * t * t },
    easeOutQuint (t) { return 1 + (--t) * t * t * t * t },
    easeInOutQuad (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
    easeInOutCubic (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
    easeInOutQuart (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
    easeInOutQuint (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
  }

  const start = window.pageYOffset
  const startTime = 'now' in window.performance ? window.performance.now() : new Date().getTime()
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

  function tick () {
    const now = 'now' in window.performance ? window.performance.now() : new Date().getTime()
    const time = Math.min(1, ((now - startTime) / duration))
    const timeFunction = easings[easing](time)
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

    if (window.pageYOffset !== destinationOffsetToScroll) {
      window.requestAnimationFrame(tick)
    } else {

    }
  }

  window.requestAnimationFrame(tick)
}
