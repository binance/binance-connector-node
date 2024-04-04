const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subscribeLockedProduct('Bnb*120', 1.0)
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
