'use strict'

const fs = require('fs')
const crypto = require('crypto')
const { removeEmptyValue, buildQueryString, createRequest, defaultLogger } = require('./helpers/utils')

class APIBase {
  constructor (options) {
    const { apiKey, apiSecret, baseURL, logger, timeout, proxy, httpsAgent, privateKeyFile, privateKeyPassphrase } = options

    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.baseURL = baseURL
    // default is 0 (no timeout)
    this.timeout = timeout || 0
    this.proxy = proxy || false
    this.httpsAgent = httpsAgent
    this.logger = logger || defaultLogger
    this.privateKeyFile = privateKeyFile || ''
    this.privateKeyPassphrase = privateKeyPassphrase || ''
  }

  publicRequest (method, path, params = {}) {
    params = removeEmptyValue(params)
    params = buildQueryString(params)
    if (params !== '') {
      path = `${path}?${params}`
    }
    return createRequest({
      method,
      baseURL: this.baseURL,
      url: path,
      apiKey: this.apiKey,
      timeout: this.timeout,
      proxy: this.proxy,
      httpsAgent: this.httpsAgent
    })
  }

  signRequest (method, path, params = {}) {
    params = removeEmptyValue(params)
    const timestamp = Date.now()
    const queryString = buildQueryString({ ...params, timestamp })
    let signature

    if (!this.privateKeyFile) {
      signature = crypto
        .createHmac('sha256', this.apiSecret)
        .update(queryString)
        .digest('hex')
    } else {
      signature = crypto
        .createSign('RSA-SHA256')
        .update(queryString)
        .sign({
          key: fs.readFileSync(this.privateKeyFile),
          passphrase: this.privateKeyPassphrase
        }, 'base64')
      signature = encodeURIComponent(signature)
    }

    return createRequest({
      method,
      baseURL: this.baseURL,
      url: `${path}?${queryString}&signature=${signature}`,
      apiKey: this.apiKey,
      timeout: this.timeout,
      proxy: this.proxy,
      httpsAgent: this.httpsAgent
    })
  }
}

module.exports = APIBase
