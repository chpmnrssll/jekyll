(() => {
  const imgWidth = 300
  const imgHeight = 200
  const uri = window.location
  const title = document.head.querySelector('title').innerText
  const params = encodeURIComponent(`uri=${uri}&title=${title}`)
  const container = document.querySelector('.recommendations__container')

  function dataLoaded (event) {
    let response = event.response.entries
    // let response = JSON.parse(request.response).entries
    container.style.display = 'grid'
    container.style.gridTemplateColumns = `repeat(auto-fill, minmax(${imgWidth}px, 1fr))`
    container.style.justifyItems = 'center'
    container.style.border = '1px solid #ddd'
    container.style.resize = 'both'
    container.style.overflow = 'auto'

    response.forEach((element, index) => {
      let headline = document.createElement('p')
      headline.innerText = element.Headline

      let img = document.createElement('img')
      img.style.width = `${imgWidth}px`
      img.style.height = `${imgHeight}px`
      img.src = element.pictureURI

      let link = document.createElement('a')
      link.href = element.linkURI
      link.appendChild(img)
      link.appendChild(headline)

      let recommendation = document.createElement('section')
      recommendation.style.width = `${imgWidth}px`
      recommendation.appendChild(link)

      container.appendChild(recommendation)
    })
  }

  let request = new window.XMLHttpRequest()
  request.onload = dataLoaded
  request.withCredentials = true
  request.open('POST', 'http://widget.high.fi/silakka-json.cfm', true)
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
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/fake_adblockers_chromewebstore.jpg'
        },
        {
          'Headline': 'Now you should upgrade Chrome - Net browsing becomes more enjoyable',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/18/nyt-support-support-chrome-net-seleating-tuleenautitavampaa',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/chrome-logo-1000px.jpg'
        },
        {
          'Headline': 'The most stunning feature of the Galaxy S9 is found in LG\'s top-of-the-line telephony, but with a huge difference',
          'linkURI': 'https://www.phonebook.com/news/2018/04/20/galaxy-s9-n-suffering-content-conditioning-g7-to-mutta-yhdella-without-powerful-relationship',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/lg-g7-thinq-leak.jpg'
        },
        {
          'Headline': 'Guide: How to launch Android Safe Mode',
          'linkURI': 'https://www.phonebook.com/annuals/2018/04/21/opas-android-victory',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/android-logo-large.jpg'
        },
        {
          'Headline': 'Which phone is worth buying for 100-200 euros?',
          'linkURI': 'https://www.phonebook.com/news/2018/04/21/mika-puhelin-kannattaa-ostaa-100-200-eurolla',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/honor6a-galaxyj3-nokia5.jpg'
        },
        {
          'Headline': 'New Nokia came for sale in Finland - So much for them to pay',
          'linkURI': 'https://www.phonebook.com/news/2018/04/19/nokia-8-sirocco-7-plus-suomi-hinta',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/Nokia-8Sirocco-table.jpg'
        },
        {
          'Headline': 'Netflix\'s very competitor revealed its own readings: 100 million subscribers',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/19/netflixin-kov-kilpailija-paljasti-omat-lukemat-100-miljoonaa-tilaajaa',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/Amazon-prime-video-grand-tour.jpg'
        },
        {
          'Headline': 'Oops! Russia tried to block Telegram, blocked thousands of IP addresses, but Telegram still works',
          'linkURI': 'https://www.phonebook.com/news/2018/04/18/venaya-telegram-ip-esto-amazon-google',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/telegram-logo-with-name.jpg'
        },
        {
          'Headline': 'Chrome\'s look is renewed - This is the way it is',
          'linkURI': 'https://fin.afterdawn.com/uutiset/artikkeli.cfm/2018/04/24/chromen-ulkoasu-uvudistuu-tallaista-on-luvaassa',
          'pictureURI': 'https://cdn.afterdawn.fi/v3/news/600x400/chrome-logo-1000px.jpg'
        }
      ]
    }
  })
})()
