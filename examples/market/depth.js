const Spot = require('../../src/spot')

const client = new Spot('', '')

client.depth('btcusdt', { limit: 5 }).then(response => console.log(response.data))
  .catch(error => console.log(error))
