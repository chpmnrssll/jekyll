function callback (json) {
  const scale = 0.4
  const pictureWidth = 600 * scale
  const pictureHeight = 400 * scale
  const logoWidth = 24
  const logoHeight = 24
  let response = json.entries
  // let response = JSON.parse(request.response).entries

  let container = document.querySelector('.recommendations__container')
  container.style.border = '1px solid #ddd'
  container.style.display = 'grid'
  container.style.gridGap = '1em'
  container.style.gridTemplateColumns = `repeat(auto-fill, minmax(${pictureWidth}px, 1fr))`
  container.style.justifyItems = 'center'
  container.style.overflow = 'auto'
  container.style.padding = '1em'
  container.style.resize = 'both'

  response.forEach((element, index) => {
    let picture = document.createElement('img')
    picture.src = element.pictureURI
    picture.style.height = `${pictureHeight}px`
    picture.style.width = `${pictureWidth}px`

    let headline = document.createElement('p')
    headline.innerText = element.headline
    headline.style.color = '#444'
    headline.style.fontFamily = 'serif'
    headline.style.margin = '0'
    headline.style.padding = '.5em'

    let source = document.createElement('p')
    source.innerText = element.source
    source.style.color = '#999'
    source.style.fontSize = '.8em'
    source.style.margin = '0'
    source.style.padding = '.5em'

    let link = document.createElement('a')
    link.href = element.linkURI
    link.style.textDecoration = 'none'
    link.style.width = `${pictureWidth}px`

    link.appendChild(picture)
    link.appendChild(headline)
    link.appendChild(source)
    container.appendChild(link)
  })

  let img = document.createElement('img')
  img.src = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
  img.style.height = `${logoHeight}px`
  img.style.width = `${logoWidth}px`
  img.style.opacity = '.5'

  let text = document.createElement('p')
  text.innerText = 'Powered by OctoCats'
  text.style.alignSelf = 'center'
  text.style.fontSize = '.8em'
  text.style.color = '#888'

  let logo = document.createElement('div')
  logo.style.alignItems = 'center'
  logo.style.alignSelf = 'end'
  logo.style.display = 'flex'
  logo.style.gridColumnEnd = '-1'
  logo.style.justifySelf = 'end'

  logo.appendChild(img)
  logo.appendChild(text)
  container.appendChild(logo)
}

(() => {
  const uri = encodeURIComponent(window.location)
  const title = encodeURIComponent(document.head.querySelector('title').innerText)
  const endpoint = 'http://widget.high.fi/silakka-json.cfm'
  const callbackName = 'callback'

  let script = document.createElement('script')
  script.src = `${endpoint}?callback=${callbackName}&uri=${uri}&title=${title}`
  document.body.appendChild(script)

  // let request = new window.XMLHttpRequest()
  // request.onload = recommendationsLoaded
  // request.withCredentials = true
  // request.open('GET', endpoint, true)
  // request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  // request.send(params)
})()
