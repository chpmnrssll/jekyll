(() => {
  class Recommendations {
    constructor (uri, title, endpoint) {
      this.request = new window.XMLHttpRequest()
      this.request.onload = this._loadHandler
      this.request.open('POST', endpoint, true)
      this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      this.request.send({uri: uri, title: title})
    }

    _loadHandler (event) {
      const response = JSON.parse(event.target.response)
      const breakpoint1 = window.matchMedia('(max-width: 550px)').matches
      const breakpoint2 = window.matchMedia('(max-width: 600px)').matches
      const breakpoint3 = window.matchMedia('(max-width: 768px)').matches
      const scale = breakpoint1 ? 0.65 : breakpoint2 ? 0.4 : breakpoint3 ? 0.35 : 0.315
      const pictureWidth = 600 * scale
      const pictureHeight = 480 * scale

      let grid = document.createElement('div')
      Object.assign(grid.style, {
        display: 'grid',
        gridGap: '1em',
        gridTemplateColumns: `repeat(auto-fill, ${pictureWidth}px)`,
        justifyContent: 'center',
        justifyItems: 'center',
        overflow: 'auto',
        paddingTop: '1em'
      })

      let container = document.querySelector('.post') || document.querySelector('.content-primary')
      container.appendChild(grid)

      response.entries.forEach((entry, index) => {
        if ((breakpoint1 && index > 1) || (breakpoint2 && index > 3)) {
          return
        }

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
          alignSelf: 'center',
          height: `${pictureHeight}px`,
          width: `${pictureWidth}px`
        })

        let headline = document.createElement('p')
        headline.innerText = entry.headline
        Object.assign(headline.style, {
          color: '#303030',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '22px',
          margin: '5px 0 0 0',
          maxHeight: '66px',
          overflow: 'hidden',
          wordWrap: 'break-word'
        })

        let source = document.createElement('p')
        source.innerText = entry.source
        Object.assign(source.style, {
          color: '#999999',
          fontSize: '11px',
          fontWeight: 'bold',
          lineHeight: '22px',
          margin: '0',
          wordWrap: 'break-word'
        })

        link.appendChild(picture)
        link.appendChild(headline)
        link.appendChild(source)
        grid.appendChild(link)
      })

      let logo = document.createElement('div')
      Object.assign(logo.style, {
        alignItems: 'center',
        alignSelf: 'end',
        display: 'flex',
        gridColumnEnd: '-1',
        justifyContent: 'flex-end',
        justifySelf: 'end'
      })

      let text = document.createElement('p')
      text.innerText = 'Powered by OctoCats'
      Object.assign(text.style, {
        color: '#999999',
        fontSize: '.75em'
      })

      let img = document.createElement('img')
      img.src = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
      Object.assign(img.style, {
        height: `18px`,
        opacity: '.65',
        width: `18px`
      })

      logo.appendChild(text)
      logo.appendChild(img)
      grid.appendChild(logo)
    }
  }

  const uri = window.location
  const title = document.head.querySelector('title').innerText
  const endpoint = 'https://widget.high.fi/silakka-json.cfm'

  return new Recommendations(uri, title, endpoint)
})()
