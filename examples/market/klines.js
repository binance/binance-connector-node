const Spot = require('../../src/spot')

const client = new Spot()

client.klines('BTCUSDT', '1m', { limit: 5 }).then(response => console.log(response.data))
  .catch(error => console.log(error.message))
