const Spot = require('../../../src/spot')

const apiKey = ''
const client = new Spot(apiKey)

client.createListenKey().then(response => console.log(response.data))
