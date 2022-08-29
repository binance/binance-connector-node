
/**
 * This script is used to demonstrate log different level.
 * Package winston is required, to install:
 * npm install winston
 */

const { createLogger, format, transports } = require('winston')
const Spot = require('../../../src/spot')

const logger = createLogger({
  level: 'debug', // change the level to show different log message, e.g. info, warn, etc
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
})

const client = new Spot('', '', { logger })

const callbacks = {
  open: () => logger.info('open'),
  close: () => logger.info('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const wsRef = client.klineWS('bnbusdt', '1m', callbacks)

// disconnect after 1 minute
setTimeout(() => client.unsubscribe(wsRef), 60000)
