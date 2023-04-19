'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')
const { isEmptyValue } = require('../../helpers/utils')

/**
 * API websocket endpoints
 * @module Websocket
 * @param {*} superclass
 */
const Stream = superclass => class extends superclass {
  /**
   * Aggregate Trade Streams<br>
   *
   * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.<br>
   *
   * Stream Name: &lt;symbol&gt;@aggTrade <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams}
   *
   * @param {string} symbol
   */
  aggTrade (symbol) {
    validateRequiredParameters({ symbol })
    this.subscribe(`${symbol.toLowerCase()}@aggTrade`)
  }

  /**
   * Trade Streams<br>
   *
   * The Trade Streams push raw trade information; each trade has a unique buyer and seller.<br>
   *
   * Stream Name: &lt;symbol&gt;@trade <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-streams}
   *
   * @param {string} symbol
   */
  trade (symbol) {
    validateRequiredParameters({ symbol })
    this.subscribe(`${symbol.toLowerCase()}@trade`)
  }

  /**
   * Kline/Candlestick Streams<br>
   *
   * The Kline/Candlestick Stream push updates to the current klines/candlestick every second.<br>
   *
   * Stream Name: &lt;symbol&gt;@kline_&lt;interval&gt; <br>
   * Update Speed: 2000ms <br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams}
   *
   * @param {string} symbol
   * @param {string} interval - m -> minutes; h -> hours; d -> days; w -> weeks; M -> months:<br>
   *     1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
   */
  kline (symbol, interval) {
    validateRequiredParameters({ symbol, interval })
    this.subscribe(`${symbol.toLowerCase()}@kline_${interval}`)
  }

  /**
   * Individual symbol or all symbols mini ticker<br>
   *
   * 24hr rolling window mini-ticker statistics.<br>
   * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs<br>
   *
   * Stream Name: &lt;symbol&gt;@miniTicker or !miniTicker@arr <br>
   * Update Speed: 1000ms <br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-mini-tickers-stream}
   *
   * @param {string} [symbol]
   */
  miniTicker (symbol = null) {
    let stream = '!miniTicker@arr'
    if (!isEmptyValue(symbol)) {
      stream = `${symbol.toLowerCase()}@miniTicker`
    }
    this.subscribe(stream)
  }

  /**
   * Individual symbol or all symbols ticker<br>
   *
   * 24hr rollwing window ticker statistics for a single symbol.<br>
   * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.<br>
   *
   * Stream Name: &lt;symbol&gt;@ticker or !ticker@arr <br>
   * Update Speed: 1000ms<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-ticker-streams}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-tickers-stream}
   *
   * @param {string} [symbol]
   *
   */
  ticker (symbol = null) {
    let stream = '!ticker@arr'
    if (!isEmptyValue(symbol)) {
      stream = `${symbol.toLowerCase()}@ticker`
    }
    this.subscribe(stream)
  }

  /**
   * Individual symbol or all rolling window statistics ticker<br>
   *
   * Rolling window ticker statistics, computed over multiple windows.<br>
   *
   * Stream Name: &lt;symbol&gt;@ticker_&lt;window_size&gt; or !ticker_&lt;window_size&gt;@arr <br>
   * Window Sizes: 1h,4h <br>
   * Update Speed: 1000ms <br>
   *
   * Note: This stream is different from the &lt;symbol&gt;@ticker stream. The open time O always starts on a minute, while the closing time C is the current time of the update.
   *
   * As such, the effective window might be up to 59999ms wider that &lt;window_size&gt;.
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-rolling-window-statistics-streams}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-rolling-window-statistics-streams}
   *
   * @param {string} [windowSize]
   * @param {string} [symbol]
   *
   */
  rollingWindowTicker (windowSize, symbol = null) {
    let stream = `!ticker_${windowSize.toLowerCase()}@arr`
    if (!isEmptyValue(symbol)) {
      stream = `${symbol.toLowerCase()}@ticker_${windowSize.toLowerCase()}`
    }
    this.subscribe(stream)
  }

  /**
   * Individual symbol or all symbols book ticker<br>
   *
   * Pushes any update to the best bid or ask's price or quantity in real-time.<br>
   *
   * Stream Name: &lt;symbol&gt;@bookTicker or !bookTicker <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-book-tickers-stream}
   *
   * @param {string} [symbol]
   */
  bookTicker (symbol) {
    validateRequiredParameters({ symbol })
    this.subscribe(`${symbol.toLowerCase()}@bookTicker`)
  }

  /**
   * Partial Book Depth Streams<br>
   *
   * Top bids and asks, Valid are 5, 10, or 20.<br>
   *
   * Stream Names: &lt;symbol&gt;@depth&lt;levels&gt; or &lt;symbol&gt;@depth&lt;levels&gt;@100ms. <br>
   * Update Speed: 1000ms or 100ms<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#partial-book-depth-streams}
   *
   * @param {string} symbol
   * @param {string} levels - 5, 10, or 20
   * @param {string} speed - 1000ms or 100ms
   *
   */
  partialBookDepth (symbol, levels, speed) {
    validateRequiredParameters({ symbol, levels, speed })
    this.subscribe(`${symbol.toLowerCase()}@depth${levels}@${speed}`)
  }

  /**
   * Diff. Depth Stream<br>
   *
   * Order book price and quantity depth updates used to locally manage an order book.<br>
   *
   * Stream Names: &lt;symbol&gt;@depth or &lt;symbol&gt;@depth@100ms <br>
   * Update Speed: 1000ms or 100ms<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream}
   *
   * @param {string} symbol
   * @param {string} speed - 1000ms or 100ms
   *
   */
  diffBookDepth (symbol, speed) {
    validateRequiredParameters({ symbol, speed })
    this.subscribe(`${symbol.toLowerCase()}@depth@${speed}`)
  }

  /**
   * Listen to User data stream<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#user-data-streams}
   *
   * @param {string} listenKey
   */
  userData (listenKey) {
    validateRequiredParameters({ listenKey })
    this.subscribe(listenKey)
  }

  unsubscribe (stream) {
    this.unsubscribe(stream)
  }
}

module.exports = Stream
