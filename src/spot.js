const APIBase = require('./APIBase')
const {
  Blvt, Bswap, SubAccount, Market, Trade, Futures, Fiat,
  Wallet, Margin, Mining, Savings, Stream, Websocket, C2C, Loan, Pay, Convert, Rebate, NFT
} = require('./modules')
const { flowRight } = require('./helpers/utils')

class Spot extends flowRight(Blvt, Bswap, SubAccount, Websocket, Stream,
  Savings, Margin, Mining, Wallet, Market, Trade, Futures, Fiat, C2C, Loan, Pay, Convert, Rebate, NFT)(APIBase) {
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
