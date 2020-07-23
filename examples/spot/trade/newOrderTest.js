const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { url: 'https://testnet.binance.vision' })

client.newOrderTest('BNBUSDT', 'BUY', 'LIMIT', {
  price: '10',
  quantity: 1,
  timeInForce: 'GTC'
}).then(response => console.log(response.data))
  .catch(error => console.log(error))
