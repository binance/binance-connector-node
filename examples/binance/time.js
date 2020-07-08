const Spot = require('../../src/spot')

const client = new Spot('', '')

client.test().then(response => console.log(response.data))
