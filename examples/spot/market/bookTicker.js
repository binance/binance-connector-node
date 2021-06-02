const Spot = require('../../../src/spot')

const client = new Spot()

client.bookTicker('BTCUSDT').then(response => client.logger.log(response.data))
