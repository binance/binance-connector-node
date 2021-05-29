const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)
const email = 'sub.account@email.com'

client.subAccountLeverageToken(
  email, true
).then(response => console.log(response.data))
  .catch(error => console.log(error))
