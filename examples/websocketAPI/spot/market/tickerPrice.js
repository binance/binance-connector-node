'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.tickerPrice({ symbol: 'BTCUSDT' })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(null, null, { logger, callbacks })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
