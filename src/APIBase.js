const crypto = require('crypto')
const qs = require('qs')
const { cleanEmptyObject, buildQueryString, getRequestInstance } = require('./helpers/utils')

class APIBase {
  constructor (apiKey = '', apiSecret = '', options = {}) {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.baseURL = options.url || 'https://api.binance.com'
  }

  publicRequest (path, params = {}) {
    params = cleanEmptyObject(params)
    params = qs.stringify(params)
    if (params !== '') {
      path = `${path}?${params}`
    }
    return getRequestInstance({
      baseURL: this.baseURL,
      headers: {
        'content-type': 'application/json',
        'X-MBX-APIKEY': this.apiKey
      }
    }).request({
      method: 'GET',
      url: path
    })
  }

  signRequest (method, path, params = {}) {
    const timestamp = Date.now()
    const queryString = buildQueryString({ ...params, timestamp })
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString.substr(1))
      .digest('hex')

    const url = `${path}${queryString}&signature=${signature}`
    return getRequestInstance({
      baseURL: this.baseURL,
      headers: {
        'content-type': 'application/json',
        'X-MBX-APIKEY': this.apiKey
      }
    }).request({
      method,
      url
    })
  }
}

module.exports = APIBase
