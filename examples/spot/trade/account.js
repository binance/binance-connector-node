'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''

// baseURL is used to set which market you wish to send the request to.
// Please make sure the api key/secret is consistent with the baseURL, It won't work if you send request to production site with testnet api key.
// https://api.binance.com  is for production.
// https://testnet.binance.vision is the spot testnet base url

// timeout is another optional value in milliseconds, that how long the request is allowed to executed.

const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision', timeout: 1000 })

client.account()
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error.message))
