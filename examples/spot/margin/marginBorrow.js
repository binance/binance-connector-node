'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.marginBorrow(
  'BNB', // asset
  0.1 // amount
).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
