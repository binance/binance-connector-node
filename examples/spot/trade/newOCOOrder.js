'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })

client.newOCOOrder('BNBUSDT', 'SELL', 1, 'LIMIT_MAKER', 'STOP_LOSS_LIMIT', {
  abovePrice: 530,
  belowPrice: 520,
  belowStopPrice: 519,
  belowTimeInForce: 'GTC'
}).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
