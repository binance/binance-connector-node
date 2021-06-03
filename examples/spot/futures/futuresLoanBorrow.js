const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.futuresLoanBorrow('USDT', '', 'BUSD', '3')
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
