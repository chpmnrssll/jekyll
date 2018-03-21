'use strict'

class Navigation {
  constructor () {
    this.showButtonEl = document.querySelector('.navigation__button--open')
    this.hideButtonEl = document.querySelector('.navigation__button--close')
    this.sideNavEl = document.querySelector('.navigation')

    this.showSideNav = this.showSideNav.bind(this)
    this.hideSideNav = this.hideSideNav.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.update = this.update.bind(this)

    this.startX = 0
    this.currentX = 0
    this.touchingSideNav = false
    this.supportsPassive = undefined
    this.addEventListeners()
  }

  // apply passive event listening if it's supported
  applyPassive () {
    if (this.supportsPassive !== undefined) {
      return this.supportsPassive ? { passive: true } : false
    }

    // feature detect
    let isSupported = false
    try {
      document.addEventListener('test', null, { get passive () { isSupported = true } })
    } catch (e) {
    }

    this.supportsPassive = isSupported
    return this.applyPassive()
  }

  addEventListeners () {
    this.showButtonEl.addEventListener('click', this.showSideNav)
    this.hideButtonEl.addEventListener('click', this.hideSideNav)
    this.sideNavEl.addEventListener('click', this.hideSideNav)
    this.sideNavEl.addEventListener('touchstart', this.onTouchStart, this.applyPassive())
    this.sideNavEl.addEventListener('touchmove', this.onTouchMove, this.applyPassive())
    this.sideNavEl.addEventListener('touchend', this.onTouchEnd)
  }

  onTouchStart (event) {
    if (!this.sideNavEl.classList.contains('navigation__show')) {
      return
    }

    this.startX = event.touches[0].pageX
    this.currentX = this.startX

    this.touchingSideNav = true
    window.requestAnimationFrame(this.update)
  }

  onTouchMove (event) {
    if (!this.touchingSideNav) {
      return
    }

    this.currentX = event.touches[0].pageX
  }

  onTouchEnd (event) {
    if (!this.touchingSideNav) {
      return
    }

    this.touchingSideNav = false

    const translateX = Math.min(0, this.currentX - this.startX)
    this.sideNavEl.style.transform = ''

    if (translateX < 0) {
      this.hideSideNav()
    }
  }

  update () {
    if (!this.touchingSideNav) {
      return
    }

    window.requestAnimationFrame(this.update)

    const translateX = Math.min(0, this.currentX - this.startX)
    this.sideNavEl.style.transform = `translateX(${translateX})`
  }

  showSideNav () {
    this.sideNavEl.classList.remove('navigation__hide')
    this.sideNavEl.classList.add('navigation__show')
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  hideSideNav () {
    this.sideNavEl.classList.remove('navigation__show')
    this.sideNavEl.classList.add('navigation__hide')
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  onTransitionEnd (event) {
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd)
  }
}

// Scroll to top button
document.querySelector('.navigation__button--top').addEventListener('click', () => {
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
