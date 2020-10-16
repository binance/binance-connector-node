const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountList(
  {
    email: '',
    status: 'enabled',
    page: 1,
    limit: 100
  }
).then(response => console.log(response.data))
  .catch(error => console.log(error))
