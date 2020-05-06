const Spot = require('../../../src/spot')

const client = new Spot()

client.time().then(response => client.logger.log(response.data))
