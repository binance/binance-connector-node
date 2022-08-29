'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.marginOCOOrder('BNBUSDT', 'BUY', 1, 10, 12, {
  listClientOrderId: 'my_oco_order',
  stopLimitPrice: 13,
  stopLimitTimeInForce: 'GTC'
}).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
