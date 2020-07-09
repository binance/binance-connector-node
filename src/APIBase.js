const axios = require('axios')
const qs = require('qs')

class APIBase {
  constructor (apiKey = '', apiSecret = '') {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  publicRequest (path, params = {}) {
    params = qs.stringify(params)
    if (params !== '') {
      path = `${path}?${params}`
    }

    console.log(path)
    return this.createRequest().get(path)
  }

  createRequest () {
    axios.defaults.baseURL = 'https://api.binance.com'
    axios.defaults.headers['Content-Type'] = 'application/json'

    return axios.create()
  }
}

module.exports = APIBase
