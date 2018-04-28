(() => {
  class Recommendations {
    constructor (uri, title, endpoint) {
      if (window.matchMedia('(max-width: 600px)').matches) {
        this.scale = 0.35
      } else {
        this.scale = 0.25
      }
      this.pictureWidth = 600 * this.scale
      this.pictureHeight = 400 * this.scale

      this.container = document.createElement('div')
      Object.assign(this.container.style, {
        display: 'grid',
        gridGap: '.5em',
        // gridTemplateColumns: `repeat(auto-fill, var(--pictureWidth))`,
        gridTemplateColumns: `repeat(auto-fill, ${this.pictureWidth}px)`,
        justifyContent: 'center',
        justifyItems: 'center',
        overflow: 'auto',
        padding: '.5em'
      })

      let outer = document.querySelector('.article-custom-box') || document.querySelector('.content-primary')
      outer.appendChild(this.container)

      // if (this.container.clientWidth < 600) {
      //   const scale = 0.35
      //   this.container.style.setProperty('--pictureWidth', `${this.pictureWidth * scale}px`)
      //   this.container.style.setProperty('--pictureHeight', `${this.pictureHeight * scale}px`)
      // } else {
      //   const scale = 0.4
      //   this.container.style.setProperty('--pictureWidth', `${this.pictureWidth * scale}px`)
      //   this.container.style.setProperty('--pictureHeight', `${this.pictureHeight * scale}px`)
      // }

      // CORS
      // this.request = new window.XMLHttpRequest()
      // this.request.onload = this._loadHandler
      // this.request.withCredentials = true
      // this.request.open('POST', endpoint, true)
      // this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      // this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      // this.request.send({ uri: uri, title: title })

      // JSONP
      window.JSONPHandler = this._loadHandler.bind(this)
      let callbackName = encodeURIComponent('JSONPHandler')
      let script = document.createElement('script')
      script.src = `${endpoint}?callback=${callbackName}&uri=${uri}&title=${title}`
      document.body.appendChild(script)
    }

    _loadHandler (json) {
      // const response = JSON.parse(this.request.response).entries
      const response = json.entries

      response.forEach(entry => {
        let link = document.createElement('a')
        link.href = entry.linkURI
        Object.assign(link.style, {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          textDecoration: 'none',
          width: '100%'
        })

        let picture = document.createElement('img')
        picture.src = entry.pictureURI
        Object.assign(picture.style, {
          height: `${this.pictureHeight}px`,
          alignSelf: 'center',
          width: `${this.pictureWidth}px`
        })

        let headline = document.createElement('p')
        headline.innerText = entry.headline
        Object.assign(headline.style, {
          color: '#444',
          fontSize: '1em',
          margin: '0',
          padding: '.5em'
        })

        let source = document.createElement('p')
        source.innerText = entry.source
        Object.assign(source.style, {
          color: '#999',
          fontFamily: 'serif',
          fontSize: '.75em',
          margin: '0',
          padding: '.5em'
        })

        link.appendChild(picture)
        link.appendChild(headline)
        link.appendChild(source)
        this.container.appendChild(link)
      })

      let logo = document.createElement('div')
      Object.assign(logo.style, {
        alignItems: 'center',
        alignSelf: 'end',
        display: 'flex',
        gridColumnEnd: '-1',
        justifySelf: 'end'
      })

      let img = document.createElement('img')
      img.src = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
      Object.assign(img.style, {
        height: `28px`,
        opacity: '.5',
        width: `28px`
      })

      let text = document.createElement('p')
      text.innerText = 'Powered by OctoCats'
      Object.assign(text.style, {
        alignSelf: 'center',
        color: '#888',
        fontSize: '.75em'
      })

      logo.appendChild(img)
      logo.appendChild(text)
      this.container.appendChild(logo)
    }
  }

  const uri = encodeURIComponent(window.location)
  const title = encodeURIComponent(document.head.querySelector('title').innerText)
  const endpoint = 'https://widget.high.fi/silakka-json.cfm'
  return new Recommendations(uri, title, endpoint)
})()
