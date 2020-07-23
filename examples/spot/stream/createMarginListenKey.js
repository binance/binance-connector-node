const Spot = require('../../../src/spot')

const apiKey = ''
const client = new Spot(apiKey)

client.createMarginListenKey().then(response => console.log(response.data))
