const APIBase = require('./APIBase')
const {
  Blvt, Bswap, Corporate, Market, Trade,
  Wallet, Margin, Mining, Savings, Stream, Websocket
} = require('./modules')
const flowRight = require('lodash.flowright')

class Spot extends flowRight(Blvt, Bswap, Corporate, Websocket, Stream,
  Savings, Margin, Mining, Wallet, Market, Trade)(APIBase) {
  constructor (apiKey = '', apiSecret = '', options = {}) {
    options.baseURL = options.baseURL || 'https://api.binance.com'
    super({
      apiKey,
      apiSecret,
      ...options
    })
  }
}

module.exports = Spot
