const Spot = require('../../../src/spot')

const client = new Spot()

client.avgPrice('BTCUSDT').then(response => console.log(response.data))
