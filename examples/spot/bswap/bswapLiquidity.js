const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.bswapLiquidity({ poolId: 2 }).then(({ data }) => console.log(data))
  .catch(({ response }) => console.log(response.data))
