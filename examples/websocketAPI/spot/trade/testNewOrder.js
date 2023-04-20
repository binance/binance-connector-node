'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const apiKey = process.env.BINANCE_API_KEY || ''
const apiSecret = process.env.BINANCE_API_SECRET || ''
const wsURL = 'wss://testnet.binance.vision/ws-api/v3' // we setup wsURL to testnet. The default value set to production site: wss://ws-api.binance.com/ws-api/v3

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.testNewOrder('BNBUSDT', 'BUY', 'LIMIT', {
      timeInForce: 'GTC',
      price: 300,
      quantity: 0.1,
      newClientOrderId: 'my_order_id_2',
      newOrderRespType: 'FULL'
    })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(apiKey, apiSecret, { logger, callbacks, wsURL })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
