
const { validateParameter } = require('../helpers/validation')

/**
 * API market endpoints
 * @module Market
 * @param {*} superclass
 */
const Market = superclass => class extends superclass {
  /**
   * Test Connectivity
   *
   * GET /api/v3/ping
   *
   * Test connectivity to the Rest API.
   * {@link https://binance-docs.github.io/apidocs/spot/en/#test-connectivity}
   */
  ping (options = {}) {
    return this.publicRequest('GET', '/api/v3/ping', options)
  }

  /**
   * Check Server Time
   *
   * GET /api/v3/time
   *
   * Test connectivity to the Rest API and get the current server time.
   * {@link https://binance-docs.github.io/apidocs/spot/en/#check-server-time}
   *
   */
  time (options = {}) {
    return this.publicRequest('GET', '/api/v3/time', options)
  }

  /**
   * Exchange Information
   *
   * GET /api/v3/exchangeInfo
   *
   * Current exchange trading rules and symbol information
   * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
   *
   * @param {string} [symbol] - symbol
   * @param {Array} [symbols] - an array of symbols
   *
   */
  exchangeInfo (options = {}) {
    if (Object.prototype.hasOwnProperty.call(options, 'symbol')) {
      options.symbol = options.symbol.toUpperCase()
    }
    if (Object.prototype.hasOwnProperty.call(options, 'symbols')) {
      options.symbols = `["${options.symbols.map(symbol => symbol.toUpperCase()).join('","')}"]`
    }
    return this.publicRequest(
      'GET',
      '/api/v3/exchangeInfo',
      options
    )
  }

  /**
   * Order Book
   *
   * GET /api/v3/depth
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#order-book}
   *
   * @param {string} symbol
   * @param {number} [limit]
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

  /**
   * Recent Trades List
   *
   * GET /api/v3/trades
   *
   * Get recent trades.
   * {@link https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list}
   *
   * @param {string} symbol
   * @param {number} [limit]
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

  /**
   * Old Trade Lookup
   *
   * GET /api/v3/historicalTrades
   *
   * Get older market trades.
   * {@link https://binance-docs.github.io/apidocs/spot/en/#old-trade-lookup}
   *
   * @param {string} symbol
   * @param {number} [limit]
   * @param {number} [fromId]
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

  /**
   * Compressed/Aggregate Trades List
   *
   * GET /api/v3/aggTrades
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list}
   *
   * @param {string} symbol
   * @param {number} [fromId]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit]
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

  /**
   * Kline/Candlestick Data
   *
   * GET /api/v3/klines
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data}
   *
   * @param {string} symbol
   * @param {string} interval
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit]
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

  /**
   * Current Average Price
   *
   * GET /api/v3/avgPrice
   *
   * Current average price for a symbol.
   * {@link https://binance-docs.github.io/apidocs/spot/en/#current-average-price}
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

  /**
   * 24hr Ticker Price Change Statistics
   *
   * GET /api/v3/ticker/24hr
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics}
   *
   * @param {string} [symbol]
   */
  ticker24hr (symbol = '') {
    return this.publicRequest(
      'GET',
      '/api/v3/ticker/24hr', { symbol: symbol.toUpperCase() }
    )
  }

  /**
   * Symbol Price Ticker
   *
   * GET /api/v3/ticker/price
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker}
   *
   * @param {string} symbol
  */
  tickerPrice (symbol = '') {
    return this.publicRequest(
      'GET',
      '/api/v3/ticker/price', { symbol: symbol.toUpperCase() }
    )
  }

  /**
   * Symbol Order Book Ticker
   *
   * GET /api/v3/ticker/bookTicker
   *
   * Best price/qty on the order book for a symbol or symbols.
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker}
   *
   * @param {string} [symbol]
  */
  bookTicker (symbol = '') {
    return this.publicRequest(
      'GET',
      '/api/v3/ticker/bookTicker', { symbol: symbol.toUpperCase() }
    )
  }
}

module.exports = Market
