const Spot = require('../../src/spot')

const client = new Spot('', '')

client.ping().then(response => console.log(response.data))
