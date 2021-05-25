const crypto = require('crypto')
const { cleanEmptyObject, buildQueryString, createRequest, defaultLogger, stringify } = require('./helpers/utils')

class APIBase {
  constructor (options) {
    const { apiKey, apiSecret, baseURL, logger } = options

    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.baseURL = baseURL
    this.logger = logger || defaultLogger
  }

  publicRequest (method, path, params = {}) {
    params = cleanEmptyObject(params)
    params = stringify(params)
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
