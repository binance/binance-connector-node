const APIBase = require('./APIBase')
const Blvt = require('./modules/blvt')
const Bswap = require('./modules/bswap')
const Corporate = require('./modules/corporate')
const Market = require('./modules/market')
const Trade = require('./modules/trade')
const Wallet = require('./modules/wallet')
const Margin = require('./modules/margin')
const Mining = require('./modules/mining')
const Savings = require('./modules/savings')
const Stream = require('./modules/stream')
const Websocket = require('./modules/websocket')
const flowRight = require('lodash.flowright')

class Spot extends flowRight(Blvt, Bswap, Corporate, Websocket, Stream, Savings, Margin, Mining, Wallet, Market, Trade) (APIBase) {
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
