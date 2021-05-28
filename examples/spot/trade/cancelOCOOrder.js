const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })

client.cancelOCOOrder('BNBUSDT', {
  orderListId: 52
}).then(response => console.log(response.data))
  .catch(error => console.log(error))
