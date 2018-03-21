class ImageLoader {
  constructor (rootMargin = '0px', threshold = 0.006, imageClass = '.lazyload') {
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
        entry.target.classList.add('visible')
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
