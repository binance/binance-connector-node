'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.futuresTransferHistory('BNB', 1622466784000)
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
