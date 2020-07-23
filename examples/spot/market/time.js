const Spot = require('../../../src/spot')

const client = new Spot('', '')

client.time().then(response => console.log(response.data))
