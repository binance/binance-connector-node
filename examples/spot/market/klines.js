'use strict'

const Spot = require('../../../src/spot')

const client = new Spot('', '', {
  baseURL: 'http://testnet.binance.vision'
})

client.klines('BTCUSDT', '1m', { limit: 5 }).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error.message))
