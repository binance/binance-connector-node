const axios = require('axios')

class APIBase {
  constructor (apiKey = '', apiSecret = '') {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  publicRequest (path, params = {}) {
    return axios.create({
      baseURL: 'https://api.binance.com'
    }).get(path)
  }
}

module.exports = APIBase
