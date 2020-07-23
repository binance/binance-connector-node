const bunyan = require('bunyan')

const Spot = require('../../../src/spot')
const logger = bunyan.createLogger({
  name: 'binance connector',
  stream: process.stdout,
  level: 'debug'
})

const client = new Spot('', '', {
  logger
})

const callbacks = {
  open: () => console.log('open'),
  close: () => console.log('closed'),
  message: function (data) {
    console.log(data)
  }
}

// all pairs
client.miniTickerWS(null, callbacks)

// single pair
// client.miniTickerWS('bnbusdt', callbacks)