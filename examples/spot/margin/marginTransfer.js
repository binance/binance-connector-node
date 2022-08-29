'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.marginTransfer(
  'BNB', // asset
  0.1, // amount
  1 // type 1: transfer from main account to margin account 2: transfer from margin account to main account
).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
