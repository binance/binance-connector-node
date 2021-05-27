const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountDepositHistory(
  '' // sub email
).then(response => console.log(response.data))
  .catch(error => console.log(error))
