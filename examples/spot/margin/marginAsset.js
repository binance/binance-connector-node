const Spot = require('../../../src/spot')

const apiKey = ''
const client = new Spot(apiKey)

client.marginAsset(
  'BNB' // asset
).then(response => console.log(response.data))
  .catch(error => console.log(error))
