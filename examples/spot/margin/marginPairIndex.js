const Spot = require('../../../src/spot')

const apiKey = ''
const client = new Spot(apiKey)

client.marginPairIndex('BNBUSDT').then(response => console.log(response.data))
  .catch(error => console.log(error))
