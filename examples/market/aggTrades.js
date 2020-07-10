const Spot = require('../../src/spot')

// historicalTrades require API KEY
const apiKey = ''
const client = new Spot(apiKey, '')

client.aggTrades('BTCUSDT', { limit: 5 }).then(response => console.log(response.data))
  .catch(error => console.log(error.message))
