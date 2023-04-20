'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API market endpoints
 * @module Market
 * @param {*} superclass
 */
const Market = superclass => class extends superclass {
  /**
   * Test Connectivity<br>
   *
   * GET /api/v3/ping<br>
   *
   * Test connectivity to the Rest API.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#test-connectivity}
   */
  ping () {
    return this.publicRequest('GET', '/api/v3/ping')
  }

  /**
   * Check Server Time<br>
   *
   * GET /api/v3/time<br>
   *
   * Test connectivity to the Rest API and get the current server time.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#check-server-time}
   *
   */
  time () {
    return this.publicRequest('GET', '/api/v3/time')
  }

  /**
   * Exchange Information<br>
   *
   * GET /api/v3/exchangeInfo<br>
   *
   * Current exchange trading rules and symbol information<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
   *
   * @param {object} [options]
   * @param {string} [options.symbol] - symbol
   * @param {Array} [options.symbols] - an array of symbols
   *
   */
  exchangeInfo (options = {}) {
    if (Object.prototype.hasOwnProperty.call(options, 'symbol')) {
      options.symbol = options.symbol.toUpperCase()
    }
    if (Object.prototype.hasOwnProperty.call(options, 'symbols')) {
      options.symbols = options.symbols.map(symbol => symbol.toUpperCase())
    }
    return this.publicRequest(
      'GET',
      '/api/v3/exchangeInfo',
      options
    )
  }

  /**
   * Order Book<br>
   *
   * GET /api/v3/depth<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#order-book}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit] - Default 100; max 5000.
   *    If limit > 5000, then the response will truncate to 5000.
   */
  depth (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/api/v3/depth',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Recent Trades List<br>
   *
   * GET /api/v3/trades<br>
   *
   * Get recent trades.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit] - Default 500; max 1000.
   */
  trades (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/api/v3/trades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Old Trade Lookup<br>
   *
   * GET /api/v3/historicalTrades<br>
   *
   * Get older market trades.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#old-trade-lookup}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit] - Default 500; max 1000.
   * @param {number} [options.fromId] - Trade id to fetch from. Default gets most recent trades.
   */
  historicalTrades (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/api/v3/historicalTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Compressed/Aggregate Trades List<br>
   *
   * GET /api/v3/aggTrades<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.fromId] - id to get aggregate trades from INCLUSIVE.
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - Default 500; max 1000.
   */
  aggTrades (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/api/v3/aggTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Kline/Candlestick Data<br>
   *
   * GET /api/v3/klines<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data}
   *
   * @param {string} symbol
   * @param {string} interval
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - Default 500; max 1000.
   */
  klines (symbol, interval, options = {}) {
    validateRequiredParameters({ symbol, interval })
    return this.publicRequest(
      'GET',
      '/api/v3/klines',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        interval
      })
    )
  }

  /**
   * UIKlines<br>
   *
   * GET /api/v3/uiKlines<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#uiklines}
   *
   * @param {string} symbol
   * @param {string} interval
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - Default 500; max 1000.
   */
  uiklines (symbol, interval, options = {}) {
    validateRequiredParameters({ symbol, interval })
    return this.publicRequest(
      'GET',
      '/api/v3/uiKlines',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        interval
      })
    )
  }

  /**
   * Current Average Price<br>
   *
   * GET /api/v3/avgPrice<br>
   *
   * Current average price for a symbol.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#current-average-price}
   *
   * @param {string} symbol
   */
  avgPrice (symbol) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/api/v3/avgPrice', { symbol: symbol.toUpperCase() }
    )
  }

  /**
   * 24hr Ticker Price Change Statistics<br>
   *
   * GET /api/v3/ticker/24hr<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics}
   *
   * @param {string} [symbol]
   * @param {Array} [symbols] - an array of symbols
   * @param {string} [type] - "MINI" or "FULL"
   */
  ticker24hr (symbol = '', symbols = [], type = 'FULL') {
    symbols = symbols.map(symbol => symbol.toUpperCase())

    return this.publicRequest(
      'GET',
      '/api/v3/ticker/24hr', { symbol: symbol.toUpperCase(), symbols, type }
    )
  }

  /**
   * Symbol Price Ticker<br>
   *
   * GET /api/v3/ticker/price<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker}
   *
   * @param {string} [symbol]
   * @param {Array} [symbols] - an array of symbols
  */
  tickerPrice (symbol = '', symbols = []) {
    symbols = symbols.map(symbol => symbol.toUpperCase())

    return this.publicRequest(
      'GET',
      '/api/v3/ticker/price', { symbol: symbol.toUpperCase(), symbols }
    )
  }

  /**
   * Symbol Order Book Ticker<br>
   *
   * GET /api/v3/ticker/bookTicker<br>
   *
   * Best price/qty on the order book for a symbol or symbols.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker}
   *
   * @param {string} [symbol]
   * @param {Array} [symbols] - an array of symbols
  */
  bookTicker (symbol = '', symbols = []) {
    symbols = symbols.map(symbol => symbol.toUpperCase())

    return this.publicRequest(
      'GET',
      '/api/v3/ticker/bookTicker', { symbol: symbol.toUpperCase(), symbols }
    )
  }

  /**
   * Rolling window price change statistics<br>
   *
   * GET /api/v3/ticker<br>
   *
   * The window used to compute statistics is typically slightly wider than requested windowSize.<br>
   *
   * openTime for /api/v3/ticker always starts on a minute, while the closeTime is the current time of the request. As such, the effective window might be up to 1 minute wider than requested.<br>
   *
   * E.g. If the closeTime is 1641287867099 (January 04, 2022 09:17:47:099 UTC) , and the windowSize is 1d. the openTime will be: 1641201420000 (January 3, 2022, 09:17:00 UTC)<br>
   *
   * Weight(IP): 2 for each requested symbol regardless of windowSize.<br>
   *
   * The weight for this request will cap at 100 once the number of symbols in the request is more than 50.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#rolling-window-price-change-statistics}
   *
   * @param {string} [symbol]
   * @param {Array} [symbols] - an array of symbols
   * @param {object} [options]
   * @param {string} [options.type] Supported values: FULL or MINI.
   * @param {number} [options.windowSize] - Defaults to 1d if no parameter provided.
  */
  rollingWindowTicker (symbol = '', symbols = [], options = {}) {
    symbols = symbols.map(symbol => symbol.toUpperCase())

    return this.publicRequest(
      'GET',
      '/api/v3/ticker',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        symbols
      })
    )
  }
}

module.exports = Market
