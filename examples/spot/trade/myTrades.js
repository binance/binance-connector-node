'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })

client.myTrades('BNBUSDT').then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
