'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)
const email = 'sub.account@email.com'

client.subAccountLeverageToken(
  email, true
).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
