const { Console } = require('console')
const WebsocketStream = require('../../../src/websocketStream')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: () => logger.debug('Connected to WebSocket server'),
  close: () => logger.debug('Disconnected from WebSocket server'),
  message: (data) => logger.info(data)
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks })

websocketStreamClient.subscribe(['bnbusdt@ticker', 'btcusdt@ticker'])

setTimeout(() => websocketStreamClient.disconnect(), 6000)
