let zoom = {
  in: {
    right: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 0, transform: 'translate3d(45vw, 0vw, -25vw) rotateY(45deg)' },
        { opacity: 1, transform: 'none' }
      ]
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
      if (!element.animate) {
        console.log('element does not exist!')
        return false
      }
      return element.animate(keyframes, timing)
    },
    left: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 0, transform: 'translate3d(-45vw, 0vw, -25vw) rotateY(-45deg)' },
        { opacity: 1, transform: 'none' }
      ]
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
      return element.animate(keyframes, timing)
    }
  },
  out: {
    right: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translate3d(45vw, 0vw, -25vw) rotateY(45deg)' }
      ]
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
      }
      return element.animate(keyframes, timing)
    },
    left: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translate3d(-45vw, 0vw, -25vw) rotateY(-45deg)' }
      ]
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
      }
      return element.animate(keyframes, timing)
    }
  }
}
