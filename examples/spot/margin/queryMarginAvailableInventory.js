const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.queryMarginAvailableInventory('MARGIN')
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
