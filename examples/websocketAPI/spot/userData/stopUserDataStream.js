'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const apiKey = process.env.BINANCE_API_KEY || ''

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.stopUserDataStream('yout_listen_key')
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(apiKey, null, { logger, callbacks })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
