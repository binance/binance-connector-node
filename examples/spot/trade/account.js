'use strict'

const Spot = require('../../../src/spot')

let apiKey = ''
let apiSecret = ''
let client

// baseURL is used to set which market you wish to send the request to.
// Please make sure the api key/secret is consistent with the baseURL, It won't work if you send request to production site with testnet api key.
// https://api.binance.com  is for production.
// https://testnet.binance.vision is the spot testnet base url

// timeout is another optional value in milliseconds, that how long the request is allowed to executed.

client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision', timeout: 1000 })

client.account()
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error.message))

// Below example shows how to sign the request with RSA key. You will have to a few steps:
// 1. Have your RSA keys ready.
// 2. Login to Binance.com to register your public key.
// 3. Save the API Key that is generated from UI, then you are ready to go.
apiKey = ''
apiSecret = '' // Not required for RSA signature.

client = new Spot(apiKey, apiSecret, {
  baseURL: 'https://testnet.binance.vision', // This URL is for testnet; Remove it for production.
  private_key_file: '/Users/john/ssl/private_key_encrypted.pem',
  private_key_passphrase: 'password', // only used for encrypted key
  timeout: 1000
})

client.account()
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
