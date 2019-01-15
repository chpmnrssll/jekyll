window.addEventListener('load', event => {
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList

if (typeof window.NodeList.prototype.addEventListener === 'undefined') {
  window.NodeList.prototype.addEventListener = function (event, callback, options) {
    this.forEach((element) => {
      element.addEventListener(event, callback, options)
    })
  }
}

if (typeof window.NodeList.prototype.removeAllChildren === 'undefined') {
  window.NodeList.prototype.removeAllChildren = function (event, callback, options) {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
  }
}

if (typeof window.NodeList.prototype.forEach === 'undefined') {
  window.NodeList.prototype.forEach = Array.prototype.forEach
}

if (typeof window.NodeList.prototype.find === 'undefined') {
  window.NodeList.prototype.find = Array.prototype.find
}

if (typeof window.NodeList.prototype.reverse === 'undefined') {
  window.NodeList.prototype.reverse = Array.prototype.reverse
}

if (typeof window.HTMLCollection.prototype.forEach === 'undefined') {
  window.HTMLCollection.prototype.forEach = Array.prototype.forEach
}

// memoize (fn) {
//   let cache = {}
//   return (...args) => {
//     let stringifiedArgs = JSON.stringify(args)
//     let result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args)
//     return result
//   }
// }

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

  class ImageLoader {
  constructor (rootMargin = '100%', threshold = 0.006, imageClass = '.image--lazyload') {
    this.options = {
      rootMargin: rootMargin,
      threshold: threshold
    }
    this.imageClass = imageClass
    this.observer = new window.IntersectionObserver(this.handler, this.options)
  }

  handler (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.srcset = entry.target.getAttribute('data-srcset') || ''
        entry.target.src = entry.target.getAttribute('data-src') || ''
        entry.target.classList.add('image--visible')
        observer.unobserve(entry.target)
      }
    })
  }

  lazyLoadImages () {
    document.querySelectorAll(this.imageClass).forEach(img => {
      this.observer.observe(img)
    })
  }
}

  const htmlStyles = window.getComputedStyle(document.querySelector('html'))
const animationSpeed = parseInt(htmlStyles.getPropertyValue('--animation-speed').slice(0, -2)) * 1
const delaySpeed = 10
const waitSpeed = 100

const easeInBack = 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
const easeOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
const easeInOutBack = 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'

page('*', (context, next) => {
  // Bail on initial page load
  if (context.init) {
    return
  }

  let request = new window.XMLHttpRequest()
  request.onloadend = event => {
    if (event.target.status === 404) {
      page('/404')
    }

    let parser = new window.DOMParser()
    let newDocument = parser.parseFromString(event.target.response, 'text/html')
    let newContent = newDocument.querySelector('.content')
    let newArticle = newDocument.querySelector('.article')
    let newFeatured = newDocument.querySelector('.featured')
    let parent = newFeatured ? newFeatured : newArticle ? newArticle : newContent
    let newElements = [].slice.call(parent.querySelectorAll('*'))

    newElements.forEach(element => {
      element.style.opacity = 0
    })

    let oldContent = document.querySelector('.content')
    oldContent.parentNode.replaceChild(newContent, oldContent)
    startAnyCanvasDemos()
    loader.lazyLoadImages()

    newElements.map(element => {
      element.depth = getElementDepth(newContent, element)
      return element
    }).sort((a, b) => {
      return a.depth > b.depth ? 1 : -1
    }).forEach((element, index) => {
      attachElement(element, element.depth + index)
    })
  }

  request.open('GET', `${context.path}`, true)
  request.send()
})

page.exit('*', (context, next) => {
  let content = document.querySelector('.content')
  let article = document.querySelector('.article')
  let featured = document.querySelector('.featured')
  let parent = featured ? featured : article ? article : content
  let elements = [].slice.call(parent.querySelectorAll('*'))

  if (window.demo && window.demo.stop) {
    window.demo.stop()
  }
  elements.map(element => {
    element.depth = getElementDepth(content, element)
    return element
  }).sort((a, b) => {
    return a.depth < b.depth ? 1 : -1
  }).forEach((element, index, list) => {
    detachElement(element, element.depth + index)
    if (index + 1 === list.length) {
      setTimeout(next, (list.length * delaySpeed) + waitSpeed)
    }
  })
})

page()
startAnyCanvasDemos()

function startAnyCanvasDemos () {
  if (window.demo && window.demo.stop) {
    window.demo.stop()
  }

  const canvasDemo = document.querySelector('.canvasDemo')
  if (canvasDemo) {
    let request = new window.XMLHttpRequest()
    request.addEventListener('load', event => {
      eval(request.response)
    })
    request.open('GET', canvasDemo.getAttribute('src'), true)
    request.send()
  }
}

function getElementDepth (parent, descendant) {
  let depth = 0
  while (!descendant.isEqualNode(parent)) {
    depth++
    descendant = descendant.parentElement
  }

  return depth
}

function attachElement (element, delay) {
  const keyframes = [
    { opacity: 0, transform: 'scale(0, 0)' },
    { opacity: 1, transform: 'none' }
  ]

  transition(element, keyframes, animationSpeed, 1, delay, easeInOutBack)
    .onfinish = () => { element.style.opacity = 1 }
}

function detachElement (element, delay) {
  const keyframes = [
    { opacity: 1, transform: 'none' },
    { opacity: 0, transform: 'scale(0, 0)' }
  ]

  transition(element, keyframes, animationSpeed, 1, delay, easeInOutBack)
    .onfinish = () => { element.style.opacity = 0 }
}

function transition (element, keyframes, duration, iterations, delay, easing) {
  const timing = {
    delay: delaySpeed * delay,
    duration: duration,
    iterations: iterations,
    easing: easing
  }

  return element.animate(keyframes, timing)
}


  const nav = new Navigation()
  const loader = new ImageLoader()
  loader.lazyLoadImages()

  // Check that service workers are registered
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/sw.js').then(registration => {
  //     if (navigator.serviceWorker.controller) {
  //       let preventDevToolsReloadLoop = false
  //       navigator.serviceWorker.addEventListener('controllerchange', event => {
  //         // Ensure refresh is only called once. This works around a bug in "force update on reload".
  //         if (!preventDevToolsReloadLoop) {
  //           preventDevToolsReloadLoop = true
  //           window.location.reload()
  //         }
  //       })
  //
  //       onNewServiceWorker(registration, () => {
  //         showRefreshUI(registration)
  //       })
  //     }
  //   })
  //
  //   let updateChannel = new BroadcastChannel('update')
  //   updateChannel.addEventListener('message', async (event) => {
  //     console.log('Update broadcast recieved', event)
  //     showRefreshUI({ waiting: false })
  //   })
  // }
})

// async function showRefreshUI (registration) {
//   let button = document.querySelector('.navigation__button--update')
//   button.classList.remove('navigation--hidden')
//   button.classList.add('navigation--showing')
//
//   button.addEventListener('click', event => {
//     button.classList.remove('navigation--showing')
//     button.classList.add('navigation--hidden')
//     if (registration.waiting) {
//       console.log('service worker updated')
//       registration.waiting.postMessage('skipWaiting')
//     } else {
//       console.log('cache updated')
//       window.location.reload()
//     }
//   })
// }

// function onNewServiceWorker (registration, callback) {
//   if (registration.waiting) {
//     return callback()
//   }
//
//   function listenInstalledStateChange () {
//     registration.installing.addEventListener('statechange', event => {
//       if (event.target.state === 'installed') {
//         // A new service worker is available, inform the user
//         callback()
//       }
//     })
//   }
//
//   if (registration.installing) {
//     return listenInstalledStateChange()
//   }
//
//   registration.addEventListener('updatefound', listenInstalledStateChange)
// }
