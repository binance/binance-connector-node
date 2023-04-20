'use strict'

/**
 * Websocket API market endpoints
 * @module Websocket
 * @param {*} superclass
 */
const Market = superclass => class extends superclass {
  /**
   * Test connectivity< br>
   *
   * Test connectivity to the WebSocket API.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#test-connectivity}
   *
   */
  ping (options = {}) {
    this.sendMessage('ping', options)
  }

  /**
   * Check server time< br>
   *
   * Test connectivity to the WebSocket API and get the current server time.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#check-server-time}
   *
   */
  time (options = {}) {
    this.sendMessage('time', options)
  }

  /**
   * Exchange information< br>
   *
   * Query current exchange trading rules, rate limits, and symbol information.<br>
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {string|array} [options.symbols]
   * @param {string|array} [options.permissions]
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#exchange-information}
   *
   */
  exchangeInfo (options = {}) {
    if (Object.prototype.hasOwnProperty.call(options, 'symbol')) {
      options.symbol = options.symbol.toUpperCase()
    }
    if (Object.prototype.hasOwnProperty.call(options, 'symbols')) {
      options.symbols = options.symbols.map(symbol => symbol.toUpperCase())
    }

    this.sendMessage('exchangeInfo', options)
  }

  /**
   * Order book< br>
   *
   * Get current order book.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#order-book}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit]
   *
   */
  orderbook (symbol, options = {}) {
    const limit = options.limit || 100
    this.sendMessage('depth', {
      limit,
      symbol,
      ...options
    })
  }

  /**
   * Recent trades< br>
   *
   * Get recent trades.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#recent-trades}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit]
   *
   */
  trades (symbol, options = {}) {
    const limit = options.limit || 500
    this.sendMessage('trades.recent', {
      limit,
      symbol,
      ...options
    })
  }

  /**
   * Historical trades < br>
   *
   * Get historical trades.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#historical-trades-market_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.fromId]
   *
   */
  historicalTrades (symbol, options = {}) {
    const limit = options.limit || 500
    this.sendMessageWithAPIKey('trades.historical', {
      limit,
      symbol,
      ...options
    })
  }

  /**
   * Aggregate trades < br>
   *
   * Get aggregate trades.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#aggregate-trades}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.fromId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   *
   */
  aggTrades (symbol, options = {}) {
    const limit = options.limit || 500
    this.sendMessage('trades.aggregate', {
      limit,
      symbol,
      ...options
    })
  }

  /**
   * Klines < br>
   *
   * Get klines (candlestick bars).<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#klines}
   *
   * @param {string} symbol
   * @param {string} interval
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   *
   */
  klines (symbol, interval, options = {}) {
    const limit = options.limit || 500
    this.sendMessage('klines', {
      limit,
      interval,
      symbol,
      ...options
    })
  }

  /**
   * UI Klines < br>
   *
   * Get klines (candlestick bars) optimized for presentation.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#ui-klines}
   *
   * @param {string} symbol
   * @param {string} interval
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   *
   */
  uiKlines (symbol, interval, options = {}) {
    const limit = options.limit || 500
    this.sendMessage('uiKlines', {
      limit,
      interval,
      symbol,
      ...options
    })
  }

  /**
   * Current average price < br>
   *
   * Get current average price for a symbol.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#current-average-price}
   *
   * @param {string} symbol
   *
   */
  avgPrice (symbol) {
    this.sendMessage('avgPrice', { symbol })
  }

  /**
   * 24hr ticker price change statistics < br>
   *
   * Get 24-hour rolling window price change statistics.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#24hr-ticker-price-change-statistics}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {list} [options.symbols]
   * @param {string} [options.type]
   *
   */
  ticker24hr (options = {}) {
    this.sendMessage('ticker.24hr', options)
  }

  /**
   * Rolling window price change statistics < br>
   *
   * Get rolling window price change statistics with a custom window.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#rolling-window-price-change-statistics}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {list} [options.symbols]
   * @param {string} [options.type]
   *
   */
  ticker (options = {}) {
    this.sendMessage('ticker', options)
  }

  /**
   * Symbol price ticker < br>
   *
   * Get the latest market price for a symbol.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#symbol-price-ticker}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {list} [options.symbols]
   *
   */
  tickerPrice (options = {}) {
    this.sendMessage('ticker.price', options)
  }

  /**
   * Symbol order book ticker < br>
   *
   * Get the current best price and quantity on the order book.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#symbol-order-book-ticker}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {list} [options.symbols]
   *
   */
  tickerBook (options = {}) {
    this.sendMessage('ticker.book', options)
  }
}

module.exports = Market
