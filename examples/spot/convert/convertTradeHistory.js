'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''

const client = new Spot(apiKey, apiSecret)

client.convertTradeHistory(1636541539000, 1638442339000)
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
