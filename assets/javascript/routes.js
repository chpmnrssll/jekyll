function _URLRequest(url, loadHandler) {
  let request = new window.XMLHttpRequest()
  request.onloadend = loadHandler
  request.onerror = () => { page('/404') }
  request.open('GET', url, true)
  request.send()
}

function _loadHandler (event) {
  if (event.srcElement.status === 404) {
    page('/404')
  } else {
    const parser = new DOMParser()
    const newDocument = parser.parseFromString(event.srcElement.response, 'text/html')
    const newTitle = newDocument.querySelector('.header__title--main')
    const newSubTitle = newDocument.querySelector('.header__title--sub')
    const newContent = newDocument.querySelector('.content')
    const currentTitle = document.querySelector('.header__title--main')
    const currentSubTitle = document.querySelector('.header__title--sub')
    const currentContent = document.querySelector('.content')
    const htmlStyles = window.getComputedStyle(document.querySelector('html'))
    const animationSpeed = parseInt(htmlStyles.getPropertyValue('--animation-speed').slice(0, -2))

    newTitle.style.opacity = 0
    newSubTitle.style.opacity = 0
    currentTitle.innerHTML = newTitle.innerHTML
    slide.in(currentTitle, animationSpeed, 1, 0).onfinish = () => {
      newTitle.style.opacity = 1
    }

    currentSubTitle.innerHTML = newSubTitle.innerHTML
    slide.in(currentSubTitle, animationSpeed, 1, 0).onfinish = () => {
      newSubTitle.style.opacity = 1
    }

    newContent.children.forEach((item, index) => { item.style.opacity = 0 })
    currentContent.innerHTML = newContent.innerHTML
    currentContent.children.forEach((item, index) => {
      zoom.in(item, animationSpeed, 1, 0).onfinish = () => {
        item.style.opacity = 1
      }
    })
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
  const animationSpeed = parseInt(htmlStyles.getPropertyValue('--animation-speed').slice(0, -2))

  slide.out(currentTitle, animationSpeed, 1, 0).onfinish = () => {
    currentTitle.style.alpha = 0
  }
  slide.out(currentSubTitle, animationSpeed, 1, 0).onfinish = () => {
    currentSubTitle.style.alpha = 0
  }

  currentContent.children.forEach((item, index) => {
    let onfinishHandler = () => {
      item.style.opacity = 0
    }

    if (index === currentContent.children.length-1) {
      onfinishHandler = () => {
        item.style.opacity = 0
        next()
      }
    }

    zoom.out(item, animationSpeed, 1, 0).onfinish = onfinishHandler
  })
})

page('/posts/:title', (context, next) => {
  // console.log('post!')
  // _URLRequest(context.path, _loadHandler)
})

page('/404', (context, next) => {
  createStarField()
})

page({ dispatch: false })

document.querySelector('#button-home').addEventListener('click', () => { page('/') })
document.querySelector('#button-categories').addEventListener('click', () => { page('/categories/') })
document.querySelector('#button-contact').addEventListener('click', () => { page('/contact/') })
document.querySelector('#button-settings').addEventListener('click', () => { page('/settings/') })
document.querySelector('#button-about').addEventListener('click', () => { page('/about/') })

let zoom = {
  in: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 0, transform: 'translate3d(0, 0, -100vw) rotateX(-45deg)' },
      { opacity: 1, transform: 'none' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
    return element.animate(keyframes, timing)
  },
  out: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 1, transform: 'none' },
      { opacity: 0, transform: 'translate3d(0, 0, -100vw) rotateX(45deg)' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
    }
    return element.animate(keyframes, timing)
  }
}

let slide = {
  in: (element, duration, iterations, delay) => {
    const keyframes = [
      { opacity: 0, transform: 'translate3d(20vw, 0, 0)' },
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
      { opacity: 0, transform: 'translate3d(20vw, 0, 0)' }
    ]
    const timing = {
      delay: delay,
      duration: duration,
      iterations: iterations,
      easing: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)'
    }
    return element.animate(keyframes, timing)
  }
}
