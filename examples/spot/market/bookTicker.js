'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.bookTicker().then(response => client.logger.log(response.data))

client.bookTicker('BTCUSDT').then(response => client.logger.log(response.data))

client.bookTicker('', ['BTCUSDT', 'BNBUSDT']).then(response => client.logger.log(response.data))
