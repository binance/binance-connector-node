'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.rollingWindowTicker('BTCUSDT').then(response => client.logger.log(response.data))

client.rollingWindowTicker('', ['BTCUSDT', 'BNBUSDT']).then(response => client.logger.log(response.data))

client.rollingWindowTicker('BTCUSDT', { windowSize: '1d' }).then(response => client.logger.log(response.data))
