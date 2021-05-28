const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountFuturesTransfer(
  '', // sub email
  'USDT',
  '1', // amount
  1 // type
).then(response => console.log(response.data))
  .catch(error => console.log(error))
