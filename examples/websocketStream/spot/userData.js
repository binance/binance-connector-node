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

// To generate the listen key, please check examples/spot/stream/ folder.
websocketStreamClient.userData('<listen_key>')

setTimeout(() => websocketStreamClient.disconnect(), 6000)
