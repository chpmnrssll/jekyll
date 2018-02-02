const htmlStyles = window.getComputedStyle(document.querySelector('html'))
const animationSpeed = parseInt(htmlStyles.getPropertyValue('--animation-speed').slice(0, -2)) * 2

// URL Request 'middleware' for all routes
page('*', (context, next) => {
  // Ignore initial page load
  if (!context.init) {
    let request = new window.XMLHttpRequest()
    request.onloadend = _loadHandler
    request.open('GET', context.path, true)
    request.send()
  }
})

page.exit('*', (context, next) => {
  const pageTitle = document.querySelector('.header__title--main')
  slide.out(pageTitle, animationSpeed, 1, 0).onfinish = () => {
    pageTitle.remove()
  }

  const pageSubTitle = document.querySelector('.header__title--sub')
  slide.out(pageSubTitle, animationSpeed, 1, 100).onfinish = () => {
    pageSubTitle.remove()
  }

  const pageContent = document.querySelector('.content')
  zoom.out(pageContent, animationSpeed, 1, 200).onfinish = () => {
    while (pageContent.firstChild) {
      pageContent.firstChild.remove()
    }
    setTimeout(next, animationSpeed * 2)
  }
})

page()

function _loadHandler (event) {
  if (event.srcElement.status === 404) {
    page('/404')
    // createStarField()
  } else {
    const parser = new window.DOMParser()
    const newDocument = parser.parseFromString(event.srcElement.response, 'text/html')
    const newContent = newDocument.querySelector('.content')
    const newSubTitle = newDocument.querySelector('.header__title--sub')
    const newTitle = newDocument.querySelector('.header__title--main')
    const pageContent = document.querySelector('.content')
    const pageHeader = document.querySelector('.header__title')

    newTitle.style.opacity = 0
    pageHeader.appendChild(newTitle)
    slide.in(newTitle, animationSpeed, 1, 0).onfinish = () => {
      newTitle.style.opacity = 1
    }

    newSubTitle.style.opacity = 0
    pageHeader.appendChild(newSubTitle)
    slide.in(newSubTitle, animationSpeed, 1, 200).onfinish = () => {
      newSubTitle.style.opacity = 1
    }

    newContent.style.opacity = 0
    pageContent.parentNode.replaceChild(newContent, pageContent)
    zoom.in(newContent, animationSpeed, 1, 400).onfinish = () => {
      newContent.style.opacity = 1
    }

    // createStarField(pageContent)
  }
}

const slide = {
  in: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 0, transform: 'translate(-75vw, 0) scale(2.5, 0)' },
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
      { opacity: 0, transform: 'translate(-75vw, 0) scale(2.5, 0)' }
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
      { opacity: 0, transform: 'translate3d(-100vw, -50vh, -50vw) rotateY(-45deg)' },
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
      { opacity: 0, transform: 'translate3d(100vw, -50vh, -50vw) rotateY(45deg)' }
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
