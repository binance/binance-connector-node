'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountMarginTransfer(
  '', // sub email
  'USDT',
  '1', // amount
  1 // type
).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
