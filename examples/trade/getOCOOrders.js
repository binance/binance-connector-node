const Spot = require('../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { url: 'https://testnet.binance.vision' })

client.getOCOOrders({
  limit: 100
}).then(response => console.log(response.data))
  .catch(error => console.log(error))
