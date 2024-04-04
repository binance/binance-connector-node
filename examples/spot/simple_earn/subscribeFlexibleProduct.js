const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subscribeFlexibleProduct('BTC001', 0.01)
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
