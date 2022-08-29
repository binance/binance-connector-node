'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.depth('btcusdt', { limit: 5 }).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
