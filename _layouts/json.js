---
---
[{
  "url": {{ page.url | jsonify }},
  "title": {{ page.title | jsonify }},
  "sub-title": {{ page.sub-title | jsonify }},
  "image": {{ page.image | jsonify }},
  "date": {{ page.date | jsonify }},
  "categories": {{ page.categories | jsonify }},
  "tags": {{ page.tags | jsonify }},
  "content": {{ content | jsonify }}
}]
