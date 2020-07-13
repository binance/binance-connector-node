
const { validateParameter } = require('../helpers/validation')

const Market = superclass => class extends superclass {
  /*
    * Test Connectivity
    *
    * GET /api/v3/ping
    *
    * Test connectivity to the Rest API.
    *
    */
  ping () {
    return this.publicRequest('/api/v3/ping')
  }

  /*
    * Check Server Time
    *
    * GET /api/v3/time
    *
    * Test connectivity to the Rest API and get the current server time.
    *
    */
  time () {
    return this.publicRequest('/api/v3/time')
  }

  /*
    * Exchange Information
    *
    * GET /api/v3/exchangeInfo
    *
    * Current exchange trading rules and symbol information
    *
    */
  exchangeInfo () {
    return this.publicRequest('/api/v3/exchangeInfo')
  }

  /*
    * Order Book
    *
    * GET /api/v3/depth
    *
    * @param {string} symbol
    * @param {number} limit
    */
  depth (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      '/api/v3/depth',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Recent Trades List
    *
    * GET /api/v3/trades
    *
    * @param {string} symbol
    * @param {number} limit
    */
  trades (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      '/api/v3/trades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Old Trade Lookup
    *
    * GET /api/v3/historicalTrades
    *
    * @param {string} symbol
    * @param {number} limit
    * @param {number} fromId
    */
  historicalTrades (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      '/api/v3/historicalTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Compressed/Aggregate Trades List
    *
    * GET /api/v3/aggTrades
    *
    * @param {string} symbol
    * @param {number} fromId
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    */
  aggTrades (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      '/api/v3/aggTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Kline/Candlestick Data
    *
    * GET /api/v3/klines
    *
    * @param {string} symbol
    * @param {string} interval
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    */
  klines (symbol, interval, options = {}) {
    validateParameter(symbol, 'symbol')
    validateParameter(interval, 'interval')
    return this.publicRequest(
      '/api/v3/klines',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        interval: interval
      })
    )
  }
}

module.exports = Market
