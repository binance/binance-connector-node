const Spot = require('../../../src/spot')

const apiKey = ''
const client = new Spot(apiKey)

client.blvtInfo({ tokenName: 'BTCDOWN' }).then(({ data }) => console.log(data))
  .catch(({ response }) => console.log(response.data))
