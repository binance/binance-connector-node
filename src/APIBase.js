'use strict'

const crypto = require('crypto')
const { removeEmptyValue, buildQueryString, createRequest, defaultLogger } = require('./helpers/utils')
const ConnectorClientError = require('./error/connectorClientError')
const PrivateKeyAlgo = require('./helpers/privateKeyAlgo')

class APIBase {
  constructor (options) {
    const { apiKey, apiSecret, baseURL, logger, timeout, proxy, httpsAgent, privateKey, privateKeyPassphrase, privateKeyAlgo, wsURL } = options

    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.baseURL = baseURL
    // default is 0 (no timeout)
    this.timeout = timeout || 0
    this.proxy = proxy || false
    this.httpsAgent = httpsAgent
    this.logger = logger || defaultLogger
    this.privateKey = privateKey || ''
    this.privateKeyPassphrase = privateKeyPassphrase || ''
    this.privateKeyAlgo = privateKeyAlgo || PrivateKeyAlgo.RSA
    this.wsURL = wsURL
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

    if (!this.privateKey) {
      signature = crypto
        .createHmac('sha256', this.apiSecret)
        .update(queryString)
        .digest('hex')
    } else {
      if (this.privateKeyAlgo === PrivateKeyAlgo.RSA) {
        signature = crypto.sign('RSA-SHA256', Buffer.from(queryString), {
          key: this.privateKey,
          passphrase: this.privateKeyPassphrase
        }).toString('base64')
      } else if (this.privateKeyAlgo === PrivateKeyAlgo.ED25519) {
        signature = crypto.sign(null, Buffer.from(queryString), {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }).toString('base64')
      } else {
        throw new ConnectorClientError("privateKeyAlgo must be either 'RSA' or 'ED25519'")
      }
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
