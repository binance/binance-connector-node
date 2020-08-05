
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
    return this.publicRequest('GET', '/api/v3/ping')
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
    return this.publicRequest('GET', '/api/v3/time')
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
    return this.publicRequest('GET', '/api/v3/exchangeInfo')
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
      'GET',
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
      'GET',
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
      'GET',
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
      'GET',
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
      'GET',
      '/api/v3/klines',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        interval: interval
      })
    )
  }

  /*
    * Current Average Price
    *
    * GET /api/v3/avgPrice
    *
    * @param {string} symbol
    */
  avgPrice (symbol) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      'GET',
      '/api/v3/avgPrice', { symbol: symbol.toUpperCase() }
    )
  }

  /*
  * 24hr Ticker Price Change Statistics
  *
  * GET /api/v3/ticker/24hr
  *
  * @param {string} symbol
  */
  ticker24hr (symbol = '') {
    return this.publicRequest(
      'GET',
      '/api/v3/ticker/24hr', { symbol: symbol.toUpperCase() }
    )
  }

  /*
  * Symbol Price Ticker
  *
  * GET /api/v3/ticker/price
  *
  * @param {string} symbol
  */
  tickerPrice (symbol = '') {
    return this.publicRequest(
      'GET',
      '/api/v3/ticker/price', { symbol: symbol.toUpperCase() }
    )
  }

  /*
  * Symbol Order Book Ticker
  *
  * GET /api/v3/ticker/bookTicker
  *
  * @param {string} symbol
  */
  bookTicker (symbol = '') {
    return this.publicRequest(
      'GET',
      '/api/v3/ticker/bookTicker', { symbol: symbol.toUpperCase() }
    )
  }
}

module.exports = Market
