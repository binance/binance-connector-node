'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.exchangeInfo().then(response => client.logger.log(response.data))
client.exchangeInfo({ symbol: 'btcusdt' }).then(response => client.logger.log(response.data))
client.exchangeInfo({ symbols: ['btcusdt', 'BNBUSDT'] }).then(response => client.logger.log(response.data))
