class Navigation {
  constructor () {
    this.showButton = document.querySelector('.navigation__button--open')
    this.hideButton = document.querySelector('.navigation__button--close')
    this.topButton = document.querySelector('.navigation__button--top')
    this.navigation = document.querySelector('.navigation')

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)

    this.touching = false
    this.currentX = 0
    this.startX = 0

    this.showButton.addEventListener('click', this.show)
    this.hideButton.addEventListener('click', this.hide)
    this.navigation.addEventListener('click', this.hide)
    this.navigation.addEventListener('touchstart', this.onTouchStart, { passive: true })
    this.navigation.addEventListener('touchmove', this.onTouchMove, { passive: true })
    this.navigation.addEventListener('touchend', this.onTouchEnd)
    this.topButton.addEventListener('click', () => {
      this.scrollTo(0, 500, 'easeInOutQuad')
    }, { passive: true })
  }

  onTouchStart (event) {
    if (this.navigation.classList.contains('navigation--showing')) {
      this.startX = event.touches[0].pageX
      this.currentX = this.startX
      this.touching = true
    }
  }

  onTouchMove (event) {
    if (this.touching) {
      this.currentX = event.touches[0].pageX
    }
  }

  onTouchEnd (event) {
    if (this.touching) {
      this.touching = false
      if (Math.min(0, this.currentX - this.startX) < 0) {
        this.hide()
      }
    }
  }

  show () {
    this.navigation.classList.remove('navigation--hidden')
    this.navigation.classList.add('navigation--showing')
  }

  hide () {
    this.navigation.classList.remove('navigation--showing')
    this.navigation.classList.add('navigation--hidden')
  }

  // https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
  scrollTo (destination, duration = 200, easing = 'linear') {
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
}
