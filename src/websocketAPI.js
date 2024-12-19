'use strict'

const WebsocketBase = require('./websocketBase')
const crypto = require('crypto')
const WebSocketAPIModules = require('./modules/websocket/api')
const { randomString, removeEmptyValue, buildQueryString, sortObject, flowRight } = require('./helpers/utils')
const { validateTimeUnit } = require('./helpers/validation')

class WebsocketAPI extends flowRight(...Object.values(WebSocketAPIModules))(WebsocketBase) {
  constructor (apiKey = '', apiSecret = '', options = {}) {
    super(options)
    this.wsURL = options.wsURL || 'wss://ws-api.binance.com:443/ws-api/v3'
    this.timeUnit = options.timeUnit
    this.initConnect(this._prepareURL(this.wsURL))
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  _prepareURL (wsUrl) {
    let url = wsUrl
    if (this.timeUnit) {
      try {
        validateTimeUnit(this.timeUnit)
        url = `${url}?timeUnit=${this.timeUnit}`
      } catch (err) {
        this.logger.error(err)
      }
    }
    return url
  }

  sendMessageWithAPIKey (method, options = {}) {
    if (!this.isConnected()) {
      this.logger.error('Not connected')
      return
    }
    const id = options.id || randomString()
    options.apiKey = this.apiKey
    delete options.id
    const payload = {
      id,
      method,
      params: removeEmptyValue(options)
    }
    this.logger.debug('Send message to Binance Websocket API Server:', payload)
    this.send(JSON.stringify(payload))
  }

  sendMessage (method, options = {}) {
    if (!this.isConnected()) {
      this.logger.error('Not connected')
      return
    }
    const id = options.id || randomString()
    delete options.id
    const payload = {
      id,
      method,
      params: removeEmptyValue(options)
    }
    this.logger.debug('Send message to Binance Websocket API Server:', payload)
    this.send(JSON.stringify(payload))
  }

  sendSignatureMessage (method, options = {}) {
    if (!this.isConnected()) {
      this.logger.error('Not connected')
      return
    }
    const id = options.id || randomString()
    delete options.id
    options = removeEmptyValue(options)
    options.apiKey = this.apiKey
    options.timestamp = Date.now()
    options = sortObject(options)
    options.signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(buildQueryString(options))
      .digest('hex')

    const payload = {
      id,
      method,
      params: options
    }
    this.logger.debug('Send message to Binance Websocket API Server:', payload)
    this.send(JSON.stringify(payload))
  }
}

module.exports = WebsocketAPI
