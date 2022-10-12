'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.ticker24hr().then(response => client.logger.log(response.data))

client.ticker24hr('BTCUSDT').then(response => client.logger.log(response.data))

client.ticker24hr('', ['BTCUSDT', 'BNBUSDT']).then(response => client.logger.log(response.data))

client.ticker24hr('BTCUSDT', [], 'MINI').then(response => client.logger.log(response.data))
