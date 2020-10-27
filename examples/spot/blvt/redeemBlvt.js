const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.redeemBlvt('BTCUP', 1).then(({ data }) => console.log(data))
  .catch(({ response }) => console.log(response.data))
