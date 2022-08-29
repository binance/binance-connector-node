'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })

client.cancelOpenOrders('BNBUSDT', {
  recvWindow: 3000
}).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
