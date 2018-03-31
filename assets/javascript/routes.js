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

  if (window.demo) {
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
  if (window.demo) {
    try {
      window.demo.stop()
    } catch (e) {
      console.error(e)
    }
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
