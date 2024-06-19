'use strict'

const { Console } = require('console')
const WebsocketStream = require('../../../src/websocketStream')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

// Connect to websocket server in combine mode, the stream name will be returned in response messages
const websocketStreamClient = new WebsocketStream({ logger, callbacks, combinedStreams: true })

// subscribe to bnbusdt kline stream
websocketStreamClient.kline('bnbusdt', '1m')

// subscribe to ethusdt kline stream
setTimeout(() => { websocketStreamClient.kline('ethusdt', '1m') }, 3000)

// subscribe to btcusdt kline stream
setTimeout(() => { websocketStreamClient.kline('btcusdt', '1m') }, 3000)

// disconnect from websocket server
setTimeout(() => websocketStreamClient.disconnect(), 10000)
