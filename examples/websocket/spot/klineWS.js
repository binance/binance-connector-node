'use strict'

const { Console } = require('console')
const Spot = require('../../../src/spot')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })
const client = new Spot('', '', { logger })

const callbacks = {
  open: () => logger.info('open'),
  close: () => logger.info('closed'),
  message: data => logger.info(data)
}

const wsRef = client.klineWS('bnbusdt', '1m', callbacks)

setInterval(() => {
  client.pingServer(wsRef)
}, 5000)

// disconnect after 1 minute
setTimeout(() => client.unsubscribe(wsRef), 60000)
