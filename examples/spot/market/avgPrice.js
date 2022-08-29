'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.avgPrice('BTCUSDT').then(response => client.logger.log(response.data))
