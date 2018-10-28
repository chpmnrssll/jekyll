[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Powered by
- [Jekyll](http://jekyllrb.com)
- [Jekyll::Livereload](https://github.com/RobertDeRose/jekyll-livereload)
- [Customizing GitHub Pages](https://help.github.com/categories/customizing-github-pages/)
- [CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)
- [CSS/BEM](https://en.bem.info/methodology/quick-start/)
- [Semantic HTML5](http://www.hongkiat.com/blog/html-5-semantics/)
- [App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell)
- [Commitizen command line utility](https://github.com/commitizen/cz-cli)
- [conventiona changelog](https://github.com/conventional-changelog/conventional-changelog)

### Local Server
```bash
$ bundle exec jekyll serve --livereload
```

### cloc.sh
Counts lines of code and writes to json.
```bash
$ _data/linesOfCode.json
```

### Build/Update CHANGELOG.md
```bash
conventional-changelog -i CHANGELOG.md -s -r 0
```

### Commits
Commits should be a guide to the code.
Break large commits down into single objectives.
An objective should be a related code that requires further explanation, such as:
- Why it's needed
- What it is
- How it works
