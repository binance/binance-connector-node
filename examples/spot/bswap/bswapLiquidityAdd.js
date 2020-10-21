const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.bswapLiquidityAdd(2, 'USDT', 100).then(({ data }) => console.log(data))
  .catch(({ response }) => console.log(response.data))
