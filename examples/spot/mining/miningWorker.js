const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.miningWorker('sha256', 'test', 'aa').then(response => console.log(response.data))
  .catch(error => console.log(error))
