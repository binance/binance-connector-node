const APIBase = require('./APIBase')
const Market = require('./modules/market')
const Trade = require('./modules/trade')
const Wallet = require('./modules/wallet')
const Margin = require('./modules/margin')
const Savings = require('./modules/savings')
const Stream = require('./modules/stream')
const Websocket = require('./modules/websocket')

class Spot extends Websocket(Stream(Savings(Margin(Wallet(Market(Trade(APIBase))))))) {
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
