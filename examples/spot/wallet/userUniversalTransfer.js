const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.userUniversalTransfer('MAIN_MARGIN', 'BNB', 0.1).then(response => console.log(response.data))
  .catch(error => console.log(error))
