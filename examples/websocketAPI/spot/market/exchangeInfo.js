'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    // get single symbol exchange info, when connection is established
    client.exchangeInfo({ symbol: 'BTCUSDT' })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(null, null, { logger, callbacks })

// get the exchange info by specifying the symbols
setTimeout(() => websocketAPIClient.exchangeInfo({ symbols: ['BTCUSDT', 'BNBUSDT'] }), 3000)

// get the symbols exchange info with permissions = SPOT
setTimeout(() => websocketAPIClient.exchangeInfo({ permissions: 'SPOT' }), 3000)

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
