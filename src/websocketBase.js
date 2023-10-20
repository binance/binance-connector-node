'use strict'

const APIBase = require('./APIBase')
const WebSocketClient = require('ws')

class WebsocketBase extends APIBase {
  constructor (options = {}) {
    super(options)
    this.callbacks = options.callbacks || {}
    this.reconnectDelay = options.reconnectDelay || 5000
    this.wsConnection = {}
  }

  isConnected () {
    return !(!this.wsConnection.ws || this.wsConnection.ws.readyState !== WebSocketClient.OPEN)
  }

  initConnect (url) {
    const ws = new WebSocketClient(url)
    this.logger.info(`Sending Websocket connection to: ${url}`)
    this.wsConnection.ws = ws
    this.wsConnection.closeInitiated = false

    ws.on('open', () => {
      this.logger.info(`Connected to the Websocket Server: ${url}`)
      this.callbacks.open && this.callbacks.open(this)
    })

    // handle data message. Pass the data to the call back method from user
    // It could be useful to store the original messages from server for debug
    ws.on('message', data => {
      this.callbacks.message && this.callbacks.message(data.toString())
    })

    ws.on('ping', () => {
      // As ping pong is very important for maintaining the connection, log them as INFO level
      this.logger.info('Received PING from server')
      this.callbacks.ping && this.callbacks.ping()
      ws.pong()
      this.logger.info('Responded PONG to server\'s PING message')
    })

    ws.on('pong', () => {
      this.logger.info('Received PONG from server')
      this.callbacks.pong && this.callbacks.pong()
    })

    ws.on('error', err => {
      this.logger.error('Received error from server')
      this.callbacks.error && this.callbacks.error()
      this.logger.error(err)
    })

    ws.on('close', (closeEventCode, reason) => {
      if (!this.wsConnection.closeInitiated) {
        this.callbacks.close && this.callbacks.close()
        this.logger.warn(`Connection close due to ${closeEventCode}: ${reason}.`)
        setTimeout(() => {
          this.logger.debug('Reconnect to the server.')
          this.initConnect(url)
        }, this.reconnectDelay)
      } else {
        this.wsConnection.closeInitiated = false
      }
    })
  }

  /**
   * Unsubscribe the stream <br>
   *
   */
  disconnect () {
    if (!this.isConnected()) this.logger.warn('No connection to close.')
    else {
      this.wsConnection.closeInitiated = true
      this.wsConnection.ws.close()
      this.logger.info('Disconnected with Binance Websocket Server')
    }
  }

  /**
   * Send Ping message to the Websocket Server <br>
   *
   */
  pingServer () {
    if (!this.isConnected()) this.logger.warn('Ping only can be sent when connection is ready.')
    else {
      this.logger.info('Send PING to the Websocket Server')
      this.wsConnection.ws.ping()
    }
  }

  send (payload) {
    if (!this.isConnected()) this.logger.warn('Send only can be sent when connection is ready.')
    else {
      this.wsConnection.ws.send(payload)
    }
  }
}

module.exports = WebsocketBase
