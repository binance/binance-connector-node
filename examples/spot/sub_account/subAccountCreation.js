const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountCreation(
  'account_name' // subAccountString
).then(response => console.log(response.data))
  .catch(error => console.log(error))
