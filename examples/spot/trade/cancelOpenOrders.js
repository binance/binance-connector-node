const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { url: 'https://testnet.binance.vision' })

client.cancelOpenOrders('BNBUSDT', {
  recvWindow: 3000
}).then(response => console.log(response.data))
  .catch(({ response }) => console.log(response.data.code, response.data.msg))
