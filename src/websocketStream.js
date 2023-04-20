'use strict'

const WebsocketBase = require('./websocketBase')
const Stream = require('./modules/websocket/stream')

class WebsocketStream extends (Stream)(WebsocketBase) {
  constructor (options = {}) {
    super(options)
    this.wsURL = options.wsURL || 'wss://stream.binance.com:9443'
    this.combinedStreams = options.combinedStreams || false
  }

  _prepareURL (stream) {
    let url = `${this.wsURL}/ws/${stream}`
    if (this.combinedStreams) {
      url = `${this.wsURL}/stream?streams=${stream}`
    }
    return url
  }

  subscribe (stream) {
    if (!this.isConnected()) {
      const url = this._prepareURL(stream)
      this.initConnect(url)
    } else {
      if (!Array.isArray(stream)) {
        stream = [stream]
      }
      const payload = {
        method: 'SUBSCRIBE',
        params: stream,
        id: Date.now()
      }

      this.logger.info('SUBSCRIBE', payload)
      this.send(JSON.stringify(payload))
    }
  }

  unsubscribe (stream) {
    if (!this.isConnected()) {
      this.logger.warn('Not connected')
    } else {
      if (!Array.isArray(stream)) {
        stream = [stream]
      }
      const payload = {
        method: 'UNSUBSCRIBE',
        params: stream,
        id: Date.now()
      }
      this.logger.info('UNSUBSCRIBE', payload)
      this.send(JSON.stringify(payload))
    }
  }
}

module.exports = WebsocketStream
