const axios = require('axios')
const qs = require('qs')
const { cleanEmptyObject } = require('./helpers/utils')

class APIBase {
  constructor (apiKey = '', apiSecret = '') {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  publicRequest (path, params = {}) {
    params = cleanEmptyObject(params)
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
    axios.defaults.headers['X-MBX-APIKEY'] = this.apiKey
    return axios.create()
  }
}

module.exports = APIBase
