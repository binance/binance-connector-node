const Spot = require('../../src/spot')

const client = new Spot()

client.tickerPrice().then(response => console.log(response.data))
