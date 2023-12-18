const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.querySourceAssetList('RECURRING', {
  targetAsset: 'BTC',
  indexId: 1,
  flexibleAllowedToUse: true,
  recvWindow: 5000
})
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
