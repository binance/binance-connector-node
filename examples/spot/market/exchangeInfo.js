const Spot = require('../../../src/spot')

const client = new Spot('', '')

client.exchangeInfo().then(response => console.log(response.data))
client.exchangeInfo({symbol: 'btcusdt'}).then(response => console.log(response.data))
client.exchangeInfo({symbols: ['btcusdt', 'BNBUSDT']}).then(response => console.log(response.data))
