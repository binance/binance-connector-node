const Spot = require('../../src/spot')

const client = new Spot()

client.ticker24hr('BTCUSDT').then(response => console.log(response.data))
