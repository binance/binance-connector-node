const Spot = require('../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.marginTransferHistory(
  {
    asset: 'BNB',
    type: 'ROLL_IN',
    size: 10
  }
).then(response => console.log(response.data))
  .catch(error => console.log(error))
