const fs = require('fs')
fs.readFile('./docs/binance-connector-node/0.5.1/index.html', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  const result = data.replace('Home', 'binance-connector-node')
  fs.writeFile('./docs/binance-connector-node/0.5.1/index.html', result, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
