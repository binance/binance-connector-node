'use strict'

const { Console } = require('console')
const WebsocketStream = require('../../../src/websocketStream')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks, combinedStreams: true })

websocketStreamClient.kline('bnbusdt', '1m')

setTimeout(() => websocketStreamClient.unsubscribe('bnbusdt@kline_1m'), 6000)
setTimeout(() => websocketStreamClient.disconnect(), 12000)
