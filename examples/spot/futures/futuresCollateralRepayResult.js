const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.futuresCollateralRepayResult('3eece81ca2734042b2f538ea0d9cbdd3')
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
