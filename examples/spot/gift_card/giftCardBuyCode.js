'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.giftCardBuyCode('BUSD', 'BNB', 10).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
