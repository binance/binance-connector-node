'use strict'

const { Console } = require('console')
const WebsocketStream = require('../../../src/websocketStream')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks })

// all pairs
// websocketStreamClient.rollingWindowTicker('1h', null)

// single pair
websocketStreamClient.rollingWindowTicker('1h', 'bnbusdt')

setTimeout(() => websocketStreamClient.disconnect(), 6000)
