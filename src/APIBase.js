const crypto = require('crypto')
const qs = require('qs')
const bunyan = require('bunyan')
const { cleanEmptyObject, buildQueryString, createRequest } = require('./helpers/utils')
const { appName } = require('./helpers/constants')

class APIBase {
  constructor (options) {
    const { apiKey, apiSecret, baseURL, logger } = options
    
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.baseURL = baseURL
    this.logger = logger || bunyan.createLogger({ name: appName })
  }

  publicRequest (method, path, params = {}) {
    params = cleanEmptyObject(params)
    params = qs.stringify(params)
    if (params !== '') {
      path = `${path}?${params}`
    }
    return createRequest({
      method: method,
      baseURL: this.baseURL,
      url: path,
      apiKey: this.apiKey
    })
  }

  signRequest (method, path, params = {}) {
    const timestamp = Date.now()
    const queryString = buildQueryString({ ...params, timestamp })
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString.substr(1))
      .digest('hex')

    return createRequest({
      method: method,
      baseURL: this.baseURL,
      url: `${path}${queryString}&signature=${signature}`,
      apiKey: this.apiKey
    })
  }
}

module.exports = APIBase
