## Build Instructions

The first paragraph tells the company why you want to work for them. Once you
have written down why you want to work there, back it up with a single specific
reason why.

The second paragraph tells the company why they want to hire you. Highlight the
exact things you want to bring to the company, whether it’s knowledge of some
tech, domain knowledge, a process you follow, or whatever else you think
might work to help solve their problems. And again, back it up with a specific example.

A great cover letter is an opportunity to explain any shortcomings you might have.
Horribly under-qualified but pretty sure you have what it takes? Have a huge gap
in your resume? Really, really want to work for this particular company?
The cover letter is where you do it.

Based on real Hired interview data, Front-end Engineers in Denver earn an average
annual salary of $110,014. The salaries of candidates in this role range from a
low of $60,000 to a high of $198,000, with a median salary of $110,000.


## Past CV Data

I'm interested.
This sounds interesting!
I think I might be of help.
If you still need help, I could
Do you have anything built yet?
This looks like a fairly simple project.
This looks like an interesting product,
Does the rest of the app use the same stack?
I think I could put it together for you fairly fast.
I'm sure I can help you build some great UI for your site.
Do you have a road-map on how to use all the libraries together?
Absolutely, I'm very interested.
I love working with graphics and math.
I think I could be of help with the front-end development.
After looking into ..., this has definitely has me interested.
Do you have a specific use case in mind or are you hoping for a more general library?
I'd love to help contribute to an open source project that does something new.
I usually don't like to include any dependencies until I've exhausted every Vanilla JS solution available.


I've been programming in some form or another since the early 90's and have studied a wide variety of languages and computer science topics.
I'm primarily drawn to the web platform lately and have experience building everything from REST APIs and content management systems, to single page apps and games.
I haven't been active on oDesk/upWork for quite a while due to some medical issues, but now it's time to get back to it.
Becoming an active developer again is my highest priority, so I can be as flexible as you need.
I've just recently come back to freelancing on upWork, so I can be pretty flexible.
Hoping to find long term full-time work though.
I am based in eastern Colorado and can be available when I'm needed.
I'm in eastern Colorado if that makes any difference.
I am based in Colorado (Mountain UTC-6h)

I have experience in everything you're looking for.
I have experience with the WordPress plugin API.
I have experience in everything you need: ,,, & more.
I have experience in most of your requirements, and am not afraid of learning more.
I've built everything from content management systems to WordPress plug-ins in the past,
I've built content management systems from scratch (with and without frameworks) in PHP, Node, & Ruby.
I've worked on the front and back end in several languages and frameworks.
I've worked on the front and back end on a few WordPress sites, Joomla, and even pure PHP+SQL.
I've worked on client and server side code in several languages and frameworks including PHP, Javascript, & Ruby on Rails.
I'm not afraid to bring in other frameworks as they're needed.
I'm also not afraid of learning new frameworks or languages if they're needed.
I'm no stranger to graphics and animation and love working with math (see 'Demos' sections on my site).

I've worked on client and server side code in several languages/frameworks and have experience with:
- Content management systems (WordPress, Joomla, custom)
- PHP, Ruby, JavaScript, Node.js
- Vanilla ES6, Vue.js, Backbone.js, jQuery
- Rails, Jekyll, Hexo, Express.js, Slim
- Bower, Bundler, Gulp, Grunt, NPM
- git, Github, BitBucket
- TDD, TravisCI, CircleCI
- API, AJAX, CMS, OOP, MVC, REST
- CSS3, SVG, BEM, Sass, Responsive design
- mySQL, MariaDB, MongoDB, CSV, JSON, XML

More info about me can be found on my upWork profile,
More info about me can be found on my portfolio site: https://chpmnrssll.github.io/
or Github: https://github.com/chpmnrssll/

It fought me a little bit, but I usually always win in the end.
I recommend looking into


Yeah, I've seen those recommended content ads. A few questions though:
Do you have the backend setup to test with?
Can I use CSS Grid for layout?
If so, I'm interested and think I can optimize it to a tiny size.

Petteri, I spent some time today putting together a demo and have it temporarily hosted here: https://chpmnrssll.github.io/taboola/
I have the JSON hardcoded for now. The url you gave me keeps giving me "No 'Access-Control-Allow-Origin' header is present on the requested resource." CORS errors, once that's resolved I can update the script to load data from your endpoint. I used CSS grid to get multiple responsive columns. It does go past 3 columns at higher resolutions though. Is that a hard limit for grid sizing? If so, I can keep at it. Let me know if I'm on the right track or if you want to change anything. Thanks

Ok, here's a new version with the changes you requested: https://chpmnrssll.github.io/test/taboola.html
Is this what you had in mind? I added the a "source" key to each entry in the test JSON.
Let me know when you're ready to move forward.

Still getting "No 'Access-Control-Allow-Origin' headers" errors with an AJAX GET/POST request, but JSONP works great.
https://chpmnrssll.github.io/test/taboola.html

Petteri,
I swapped out the JSONP for a POST request, works great now. I didn't know exactly how the original Taboola section looked until I realized that ad-blocker was still active (facepalm). It should look a lot closer now. It's kind of an unusual approach to build & style elements in vanilla JavaScript, but it's tiny (under 3.5k without minifying), and should be very fast to load. There's a breakpoint @600px where I change the scale of the items (larger in a smaller container), then just let the grid flow responsively to fill in from there. It only checks the media query the first time it is rendered, so to see different widths correctly the page must be refreshed. I didn't think it was a big deal as developers are about the only people I see constantly resizing their windows. There's a few variables included to customize logo text, image, endpoint, etc.

I'm going to send the source file rather than screen-shots so you can take a look. Let me know if there's any more I need to take a look at.


Petteri, here's an updated copy with your changes. I limited the grid to 1 row below 550px, 2 rows below 600px, and tweaked the widths some more. It's trial and error getting the grid to do exactly what you want without a normal media query from a stylesheet. It looks ok here, but I've only tested in dev tools w/device toolbar (kinda hard to inject a script from javascript console on a mobile device). I can make more adjustments if you need or find a different way to do the breakpoints if it's not quite what you need.


Nilay, Sorry I went silent for bit, I ended up tearing StreamSaver.js completely apart, refactored it, and built a somewhat working test.
I had trouble getting fetch to do a proper CORS request for your public bucket files on B2. So I ended up putting together the test with Google Drive & gapi (they use range requests too). Looking through the docs I found something about adding CORS rules to your bucket, but it sounds like you need to do this with your account access. It should be simple to swap the B2 api in once the access control issues are fixed.

I'm still working on how to use readable/writable streams to re-assemble the chunks write to single file, but splitting requests into multiple range requests works well. Would it be possible to enable GitHub Pages in the repo settings? Then I could setup a live demo/test page.

## Past Q/A

### Have you created responsive web applications before? Do you have experience in developing single-page web apps?
Yes, my portfolio site is my playground for SPA & PWA experiments.
Yes, my portfolio site is a responsive single page app.
My portfolio site is a single-page progressive web app experiment.
It's built on Github Pages with Jekyll static site generator.
It has tons of newer front-end features, lots of vanilla JavaScript, and all of the code is available on Github.
I've been working with Jekyll for quite a while now so I know a lot of it's quirks.

### How comfortable are you working in a Wordpress Environment? And creating custom post types, plugins, themes, etc.?
I've worked as developer on the front and back end on a few WordPress sites.
I've also worked with other content management systems like Joomla and even pure PHP+SQL.
Here's a WordPress project I worked on that has a public member directory, admin dashboard controls, per user custom settings, etc...
Live: http://mscra.com/attorneys/mcra-public-directory/
More info: https://chpmnrssll.github.io/posts/about/MCRA

### How comfortable are you using Github?
I am proficient in git with Github, BitBucket, and such.
https://github.com/chpmnrssll/

### What is your local development environment?
I am running Arch linux with Gnome desktop and Atom.io.
I currently have Node, Ruby, PHP, & MariaDB(SQL) setup and use livereload a lot.

### How many years experience do you have with JavaScript?
Since IE6 or so (early 2000s?). I remember Microsoft JScript nonsense.

### How many years experience do you have with CSS?
15+, I've been using CSS since tables were used for page layout and flash was still cool.

### Do you have experience working with Docker?
I've used the RedHat OpenShift PaaS a bit, which is just another layer on top of Docker containers with Kubernetes for management.

### Examples (links) of your best work? Which part of the project did you directly contribute to?
- Multi-user content management app:
  * https://github.com/chpmnrssll/multi-CMS
- PHP MongoDB REST server:
  * https://github.com/chpmnrssll/api
- Old PHP SQL content management system:
  * https://github.com/chpmnrssll/old/tree/master/php


## About

I'm a developer currently based in Eastern Colorado
Beside programming you'll often find me wrenching on a truck or playing guitar.
I've been programming for more than 20 years, starting way back in the day on a 486dx 33mhz PC.
I specialized early in computer graphics, games, and web application development.
First in Basic, then C, C++, Java, PHP, JavaScript, Python, and more.

I have been learning the in/outs of Arch linux by installing it on every piece of hardware that it will run on.
Arch's "build it yourself" attitude to everything seems like a programmers playground, and it has some of the best docs around!


## Other
- A developer will usually not be able to easily debug or fix issues with a pre-built theme

### Questions to ask a WordPress developer
Once you’ve decided to go with a custom WordPress site, and have evaluated your options, how do you select your WordPress developer? Well, here are some questions to ask your candidate WordPress developer or contracting shop. Use these to help determine if they can build your CMS.

- What is custom theme?
- What makes up a custom theme?
- What’s your process for setting up a custom theme?
- How does WordPress generate new pages?
- Do you modify existing themes, or write them from scratch?
- Can you write front-end code and WordPress/PHP code?
- What are some best practices for creating and styling a WordPress theme?
- How do you create a custom page template?
- How do you ensure content on the template can be edited in WordPress?
- How do you include CSS and JS into a WordPress theme?
- How often do you use WordPress plugins?
- What are your favorite or most-used plug-ins?
- How do you make a custom WordPress theme menu?
- How do you edit this menu in WordPress?
- What is a WordPress loop? How does it work?
- What is a shortcode? Why use it?
- What is a widget? Will I need one?
- What are the steps to create a simple plugin?
- Have you created a master-child WordPress theme before? What are the steps?
