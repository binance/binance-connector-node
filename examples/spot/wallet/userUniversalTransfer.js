'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.userUniversalTransfer('MAIN_MARGIN', 'BNB', 0.1)
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
