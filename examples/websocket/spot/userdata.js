'use strict'

const { Console } = require('console')
const Spot = require('../../../src/spot')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const client = new Spot('', '', {
  logger,
  wsURL: 'wss://testnet.binance.vision' // optional, for testnet only. By default on production
})

const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

// To generate the listen key, please check examples/spot/stream/ folder.
const wsRef = client.userData('<listen_key>', callbacks)
setTimeout(() => client.unsubscribe(wsRef), 60000)
