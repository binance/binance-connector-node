const { validateParameter } = require('../helpers/validation')
const WebSocketClient = require('ws')

const Websocket = superclass => class extends superclass {
  constructor (options) {
    super(options)
    this.wsURL = 'wss://stream.binance.com:9443'
  }

  aggTrade (symbol, callbacks) {
    validateParameter(symbol, 'symbol')
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@aggTrade`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  subscribe (url, callbacks) {
    const ws = new WebSocketClient(url)
    Object.keys(callbacks).forEach((event, _) => {
      this.logger.debug(`listen to event: ${event}`)
      ws.on(event, callbacks[event])
    })

    ws.on('ping', () => {
      this.logger.debug('Received ping from server')
      ws.pong()
    })

    ws.on('pong', () => {
      this.logger.debug('Received pong from server')
    })
  }
}

module.exports = Websocket
