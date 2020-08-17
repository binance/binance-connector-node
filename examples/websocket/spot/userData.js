const bunyan = require('bunyan')

const Spot = require('../../../src/spot')
const logger = bunyan.createLogger({
  name: 'binance connector',
  stream: process.stdout,
  level: 'debug'
})

const client = new Spot('', '', {
  logger,
  wsURL: 'wss://testnet.binance.vision' // optional, for testnet only. By default on production
})

const callbacks = {
  open: () => console.log('open'),
  close: () => console.log('closed'),
  message: function (data) {
    console.log(data)
  }
}
client.userData('<listen_key>', callbacks)
