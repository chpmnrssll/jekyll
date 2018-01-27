function _URLRequest (url, loadHandler) {
  let request = new window.XMLHttpRequest()
  request.onloadend = loadHandler
  request.open('GET', url, true)
  request.send()
}

function _loadHandler (event) {
  if (event.srcElement.status === 404) {
    page('/404')
    // createStarField()
  } else {
    const parser = new window.DOMParser()
    const newDocument = parser.parseFromString(event.srcElement.response, 'text/html')
    const newTitle = newDocument.querySelector('.header__title--main')
    const newSubTitle = newDocument.querySelector('.header__title--sub')
    const newContent = newDocument.querySelector('.content')
    const currentTitle = document.querySelector('.header__title--main')
    const currentSubTitle = document.querySelector('.header__title--sub')
    const currentContent = document.querySelector('.content')
    const htmlStyles = window.getComputedStyle(document.querySelector('html'))
    const animationSpeed = parseInt(htmlStyles.getPropertyValue('--animation-speed').slice(0, -2)) * 2

    currentTitle.innerHTML = newTitle.innerHTML
    slide.in(currentTitle, animationSpeed, 1, 0).onfinish = () => {
      currentTitle.style.opacity = 1
    }

    currentSubTitle.innerHTML = newSubTitle.innerHTML
    slide.in(currentSubTitle, animationSpeed, 1, 0).onfinish = () => {
      currentSubTitle.style.opacity = 1
    }

    currentContent.innerHTML = newContent.innerHTML
    currentContent.children.forEach((child, index) => {
      zoom.in(child, animationSpeed, 1, 0).onfinish = () => {
        child.style.opacity = 1
      }
    })

    // createStarField(currentContent)
  }
}

// URL Request 'middleware' for all routes
page('*', (context, next) => {
  _URLRequest(context.path, _loadHandler)
})

page.exit('*', (context, next) => {
  const currentTitle = document.querySelector('.header__title--main')
  const currentSubTitle = document.querySelector('.header__title--sub')
  const currentContent = document.querySelector('.content')
  const htmlStyles = window.getComputedStyle(document.querySelector('html'))
  const animationSpeed = parseInt(htmlStyles.getPropertyValue('--animation-speed').slice(0, -2)) * 2

  slide.out(currentTitle, animationSpeed, 1, 0).onfinish = () => {
    currentTitle.style.opacity = 0
  }
  slide.out(currentSubTitle, animationSpeed, 1, 0).onfinish = () => {
    currentSubTitle.style.opacity = 0
  }

  currentContent.children.forEach((child, index) => {
    zoom.out(child, animationSpeed, 1, 0).onfinish = () => {
      child.style.opacity = 0
    }
    if (index === currentContent.children.length - 1) {
      setTimeout(next, animationSpeed * 2)
    }
  })
})

// page({ dispatch: false })
page()

const slide = {
  in: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 0, transform: 'translate(-75vw, 0) skew(-45deg) scale(1.5, 0)' },
      { opacity: 1, transform: 'none' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
    }
    return element.animate(keyframes, timing)
  },
  out: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 1, transform: 'none' },
      { opacity: 0, transform: 'translate(-75vw, 0) skew(-45deg) scale(1.5, 0)' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
    }
    return element.animate(keyframes, timing)
  }
}

const zoom = {
  in: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 0, transform: 'translate3d(0, 0, -250vw) rotateX(60deg)' },
      { opacity: 1, transform: 'none' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
    }
    return element.animate(keyframes, timing)
  },
  out: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 1, transform: 'none' },
      { opacity: 0, transform: 'translate3d(0, 0, -250vw) rotateX(60deg)' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
    }
    return element.animate(keyframes, timing)
  }
}
