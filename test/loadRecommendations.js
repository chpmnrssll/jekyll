(() => {
  class Recommendations {
    constructor (uri, title, endpoint) {
      this.scale = 0.4
      this.logoWidth = 24
      this.logoHeight = 24
      this.pictureWidth = 600 * this.scale
      this.pictureHeight = 400 * this.scale

      // this.container = document.querySelector('.recommendations__container')
      this.container = document.getElementById('taboola-below-article-thumbnails')
      Object.assign(this.container.style, {
        border: '1px solid #ddd',
        display: 'grid',
        gridGap: '1em',
        gridTemplateColumns: `repeat(auto-fill, minmax(${this.pictureWidth}px, 1fr))`,
        justifyItems: 'center',
        overflow: 'auto',
        padding: '1em',
        resize: 'both'
      })

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
          textDecoration: 'none',
          width: `${this.pictureWidth}px`
        })

        let picture = document.createElement('img')
        picture.src = entry.pictureURI
        Object.assign(picture.style, {
          height: `${this.pictureHeight}px`,
          width: `${this.pictureWidth}px`
        })

        let headline = document.createElement('p')
        headline.innerText = entry.headline
        Object.assign(headline.style, {
          color: '#444',
          fontFamily: 'serif',
          margin: '0',
          padding: '.5em'
        })

        let source = document.createElement('p')
        source.innerText = entry.source
        Object.assign(source.style, {
          color: '#999',
          fontSize: '.8em',
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
        height: `${this.logoHeight}px`,
        opacity: '.5',
        width: `${this.logoWidth}px`
      })

      let text = document.createElement('p')
      text.innerText = 'Powered by OctoCats'
      Object.assign(text.style, {
        alignSelf: 'center',
        color: '#888',
        fontSize: '.8em'
      })

      logo.appendChild(img)
      logo.appendChild(text)
      this.container.appendChild(logo)
    }
  }

  const uri = encodeURIComponent(window.location)
  const title = encodeURIComponent(document.head.querySelector('title').innerText)
  const endpoint = 'https://widget.high.fi/silakka-json.cfm'
  console.log(new Recommendations(uri, title, endpoint))
})()
