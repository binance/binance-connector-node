'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.newMarginOrder(
  'BNBUSDT', // symbol
  'BUY',
  'LIMIT',
  {
    quantity: 1,
    price: '10',
    newClientOrderId: 'my_order',
    newOrderRespType: 'FULL',
    timeInForce: 'GTC'
  }
).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
