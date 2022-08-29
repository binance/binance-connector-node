'use strict'

const Spot = require('../../../src/spot')

// historicalTrades require API KEY
const apiKey = ''
const client = new Spot(apiKey, '')

client.aggTrades('BTCUSDT', { limit: 5 })
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error.message))
