const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountAssets(
  'alice@test.com' // sub email
).then(response => console.log(response.data))
  .catch(error => console.log(error))