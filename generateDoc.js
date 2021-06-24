const fs = require('fs')
const marked = require('marked')
const basePath = './docs/binance-connector-node/0.5.1/'
const indexFile = 'index.html'
const changeLogFile = 'changelog.html'
fs.readFile(basePath + indexFile, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  const result = data.replace('Home', 'binance-connector-node')
  fs.writeFile(basePath + indexFile, result, 'utf8', function (err) {
    if (err) return console.log(err)
  })

  const changelogMd = fs.readFileSync('CHANGELOG.md', 'utf-8')
  const changelogContent = marked(changelogMd)
  const changelog = data.replace(
    /<section class="readme">\s*<article>[\s\S]+<\/article>\s*<\/section>/,
    '<section class="readme"> <article>' + changelogContent + '</article> </section>'
  )

  fs.writeFile(basePath + changeLogFile, changelog, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
