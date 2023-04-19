'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.historicalTrades('BNBUSDT', { limit: 10 })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

// API Key is required for this method.
// Please make sure you have the correct API Key from the right place. There are testnet and production keys available.
// See https://dev.binance.vision/t/binance-testnet-environments/99
const apiKey = ''

// wsURL is optional, by default it's set to the production site: 'wss://ws-api.binance.com:443/ws-api/v3'.
const websocketAPIClient = new WebsocketAPI(apiKey, null, { logger, callbacks, wsURL: 'wss://testnet.binance.vision/ws-api/v3' })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
