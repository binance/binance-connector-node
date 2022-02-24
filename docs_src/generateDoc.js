const fs = require('fs')
const { marked } = require('marked')
const { name, version } = require('../package.json')
const basePath = `./docs/${name}/${version}/`
const indexFile = 'index.html'
const changeLogFile = 'changelog.html'
const gettingStartedFile = 'gettingStarted.html'
fs.readFile(basePath + indexFile, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  const result = data.replace('Home', name)
  fs.writeFile(basePath + indexFile, result, 'utf8', function (err) {
    if (err) return console.log(err)
  })

  // Convert the content of CHANGELOG.md to html and insert into the template
  const changelogMd = fs.readFileSync('CHANGELOG.md', 'utf-8')
  const changelogContent = marked(changelogMd)
  const changelog = data.replace(
    /<section class="readme">\s*<article>[\s\S]+<\/article>\s*<\/section>/,
    '<section class="readme"> <article>' + changelogContent + '</article> </section>'
  )

  fs.writeFile(basePath + changeLogFile, changelog, 'utf8', function (err) {
    if (err) return console.log(err)
  })

  /**
   * Convert the content of gettingStarted.md to html and insert into the template.
   * Convertion script is docs.sh at the same directory.
   */
  const gettingStartedHtml = fs.readFileSync('./out/index.html', 'utf-8')
  const gettingStartedContent = gettingStartedHtml.match(/<article>([\s\S]+)<\/article>/)
  const gettingStarted = data.replace(
    /<section class="readme">\s*<article>[\s\S]+<\/article>\s*<\/section>/,
    '<section class="readme"> <article>' + gettingStartedContent[1] + '</article> </section>'
  )

  fs.writeFile(basePath + gettingStartedFile, gettingStarted, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
