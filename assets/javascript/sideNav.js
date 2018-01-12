'use strict'

class SideNav {
  constructor () {
    this.showButtonEl = document.querySelector('.navigation-button__open')
    this.hideButtonEl = document.querySelector('.navigation-button__close')
    this.sideNavEl = document.querySelector('.navigation-menu')

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
    if (!this.sideNavEl.classList.contains('navigation-menu__show')) {
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
    this.sideNavEl.classList.remove('navigation-menu__hide')
    this.sideNavEl.classList.add('navigation-menu__show')
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  hideSideNav () {
    this.sideNavEl.classList.remove('navigation-menu__show')
    this.sideNavEl.classList.add('navigation-menu__hide')
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  onTransitionEnd (event) {
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd)
  }
}

const nav = new SideNav()
