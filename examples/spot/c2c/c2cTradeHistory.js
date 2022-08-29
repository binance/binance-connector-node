'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.c2cTradeHistory('BUY')
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
