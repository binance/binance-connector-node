'use strict'

const { Console } = require('console')
const Spot = require('../../../src/spot')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })
const client = new Spot('', '', { logger })

const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

// all pairs
// const wsRef = client.tickerWS(null, callbacks)

// single pair
const wsRef = client.tickerWS('bnbusdt', callbacks)
setTimeout(() => client.unsubscribe(wsRef), 60000)
