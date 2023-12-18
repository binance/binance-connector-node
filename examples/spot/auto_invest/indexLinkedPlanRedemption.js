const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.indexLinkedPlanRedemption(12345, {
  current: 1,
  asset: 'BTC',
  size: 100,
  recvWindow: 5000
})
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
