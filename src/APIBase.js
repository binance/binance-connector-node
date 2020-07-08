const axios = require('axios')

class APIBase {
  constructor (apiKey = '', apiSecret = '') {
    this.apiKey = apiKey
    this.apiSecret = apiSecret

    this.request = axios.create({
      baseURL: 'https://api.binance.com'
    })
  }
}

module.exports = APIBase
