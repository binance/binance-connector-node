'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const client = new Spot(apiKey)

client.createIsolatedMarginListenKey('BNBUSDT').then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
