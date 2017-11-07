---
permalink: ':collection/:path.json'
---
[ {% for post in site.posts %}
  {
    "category": {{ post.category | jsonify }},
    "title": {{ post.title | jsonify }},
    "subTitle": {{ post.sub-title | jsonify }},
    "date": {{ post.date | date: "%b %d, %Y" | jsonify }},
    "image": {{ post.image | jsonify }},
    "tags": {{ post.tags | jsonify }},
    "url": {{ post.url | jsonify }}
  }{% unless forloop.last %},{% endunless %}{% endfor %}
]
