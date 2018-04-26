(() => {
  const scale = 0.4
  const pictureWidth = 600 * scale
  const pictureHeight = 400 * scale
  const logoWidth = 24
  const logoHeight = 24
  const uri = window.location
  const title = document.head.querySelector('title').innerText
  const params = encodeURIComponent(`uri=${uri}&title=${title}`)
  const endpoint = 'http://widget.high.fi/silakka-json.cfm'

  function dataLoaded (event) {
    let response = event.response.entries
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
      headline.innerText = element.Headline
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

  let request = new window.XMLHttpRequest()
  request.onload = dataLoaded
  request.withCredentials = true
  request.open('POST', endpoint, true)
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  // request.send(params)
  console.log(params)

  dataLoaded({
    response: {
      'entries': [
        {
          'Headline': 'Have you installed any of these ad blockers? They spy on your actions',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/24/oletko-supported-some-some-advertising-and-vouching-to-sunun-toyourwork',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/fake_adblockers_chromewebstore.jpg',
          'source': 'afterdawn.com'
        },
        {
          'Headline': 'Now you should upgrade Chrome - Net browsing becomes more enjoyable',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/18/nyt-support-support-chrome-net-seleating-tuleenautitavampaa',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/chrome-logo-1000px.jpg',
          'source': 'afterdawn.com'
        },
        {
          'Headline': 'The most stunning feature of the Galaxy S9 is found in LG\'s top-of-the-line telephony, but with a huge difference',
          'linkURI': 'https://www.phonebook.com/news/2018/04/20/galaxy-s9-n-suffering-content-conditioning-g7-to-mutta-yhdella-without-powerful-relationship',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/lg-g7-thinq-leak.jpg',
          'source': 'phonebook.com'
        },
        {
          'Headline': 'Guide: How to launch Android Safe Mode',
          'linkURI': 'https://www.phonebook.com/annuals/2018/04/21/opas-android-victory',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/android-logo-large.jpg',
          'source': 'phonebook.com'
        },
        {
          'Headline': 'Which phone is worth buying for 100-200 euros?',
          'linkURI': 'https://www.phonebook.com/news/2018/04/21/mika-puhelin-kannattaa-ostaa-100-200-eurolla',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/honor6a-galaxyj3-nokia5.jpg',
          'source': 'phonebook.com'
        },
        {
          'Headline': 'New Nokia came for sale in Finland - So much for them to pay',
          'linkURI': 'https://www.phonebook.com/news/2018/04/19/nokia-8-sirocco-7-plus-suomi-hinta',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/Nokia-8Sirocco-table.jpg',
          'source': 'phonebook.com'
        },
        {
          'Headline': 'Netflix\'s very competitor revealed its own readings: 100 million subscribers',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/19/netflixin-kov-kilpailija-paljasti-omat-lukemat-100-miljoonaa-tilaajaa',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/Amazon-prime-video-grand-tour.jpg',
          'source': 'afterdawn.com'
        },
        {
          'Headline': 'Oops! Russia tried to block Telegram, blocked thousands of IP addresses, but Telegram still works',
          'linkURI': 'https://www.phonebook.com/news/2018/04/18/venaya-telegram-ip-esto-amazon-google',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/telegram-logo-with-name.jpg',
          'source': 'phonebook.com'
        },
        {
          'Headline': 'Chrome\'s look is renewed - This is the way it is',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/24/chromen-ulkoasu-uvudistuu-tallaista-on-luvaassa',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/chrome-logo-1000px.jpg',
          'source': 'afterdawn.com'
        }
      ]
    }
  })
})()
