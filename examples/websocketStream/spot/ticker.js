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
// websocketStreamClient.ticker()

// single pair
websocketStreamClient.ticker('bnbusdt')

setTimeout(() => { websocketStreamClient.ticker('btcbusd') }, 3000)

// ping server
setTimeout(() => websocketStreamClient.pingServer(), 4000)

setTimeout(() => websocketStreamClient.disconnect(), 6000)
