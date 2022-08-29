'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.tickerPrice().then(response => client.logger.log(response.data))

client.tickerPrice('BTCUSDT').then(response => client.logger.log(response.data))

client.tickerPrice('', ['BTCUSDT', 'BNBUSDT']).then(response => client.logger.log(response.data))
