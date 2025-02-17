'use strict'

const { Console } = require('console')
const WebsocketStream = require('../../../src/websocketStream')
const TimeUnit = require('../../../src/helpers/timeUnit')
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks, timeUnit: TimeUnit.MICROSECOND })

websocketStreamClient.aggTrade('bnbusdt', callbacks)

setTimeout(() => websocketStreamClient.disconnect(), 6000)
