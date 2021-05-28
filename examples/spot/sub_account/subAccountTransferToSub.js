const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountTransferToSub(
  '', // sub email
  'USDT',
  '1' // amount
).then(response => console.log(response.data))
  .catch(error => console.log(error))
