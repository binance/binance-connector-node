const Spot = require('../../../src/spot')

const client = new Spot()

client.tickerPrice().then(response => client.logger.log(response.data))
