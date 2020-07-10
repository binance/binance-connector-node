const Spot = require('../../src/spot')

const client = new Spot('', '')

client.exchangeInfo().then(response => console.log(response.data))
