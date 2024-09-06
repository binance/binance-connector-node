/**
 * This script is used to demonstrate log different level.
 * Package winston is required, to install:
 * npm install winston
 */

const { createLogger, format, transports } = require('winston')
const WebsocketStream = require('../../../src/websocketStream')

const logger = createLogger({
  level: 'debug', // change the level to show different log message, e.g. info, warn, etc
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
})

const callbacks = {
  open: () => logger.info('open'),
  close: () => logger.info('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks })

websocketStreamClient.kline('bnbusdt', '1m', callbacks)

// disconnect after 1 minute
setTimeout(() => websocketStreamClient.disconnect(), 6000)
