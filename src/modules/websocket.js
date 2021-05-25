const { validateParameter } = require('../helpers/validation')
const WebSocketClient = require('ws')

/**
 * API websocket endpoints
 * @module Websocket
 * @param {*} superclass
 */
const Websocket = superclass => class extends superclass {
  constructor (options) {
    super(options)
    this.wsURL = options.wsURL || 'wss://stream.binance.com:9443'
  }

  /**
    * Aggregate Trade Streams
    *
    * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
    * <br>
    * Stream Name: <symbol>@aggTrade
    * <br>
    * Update Speed: Real-time
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams}
    *
    * @param {string} symbol
    */
  aggTradeWS (symbol, callbacks) {
    validateParameter(symbol, 'symbol')
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@aggTrade`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Trade Streams
    *
    * The Trade Streams push raw trade information; each trade has a unique buyer and seller.
    * <br>
    * Stream Name: <symbol>@trade
    * <br>
    * Update Speed: Real-time
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-streams}
    *
    * @param {string} symbol
    */
  tradeWS (symbol, callbacks) {
    validateParameter(symbol, 'symbol')
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@trade`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Kline/Candlestick Streams
    *
    * The Kline/Candlestick Stream push updates to the current klines/candlestick every second.
    * <br>
    * Stream Name: <symbol>@kline_<interval>
    * <br>
    * Update Speed: 2000ms
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams}
    *
    * @param {string} symbol
    * @param {string} interval - m -> minutes; h -> hours; d -> days; w -> weeks; M -> months:<br>
    *     1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
    */
  klineWS (symbol, interval, callbacks) {
    validateParameter(symbol, 'symbol')
    validateParameter(interval, 'interval')

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@kline_${interval}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Individual symbol or all symbols mini ticker
    *
    * 24hr rolling window mini-ticker statistics.
    * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs
    * <br>
    * Stream Name: <symbol>@miniTicker or !miniTicker@arr
    * <br>
    * Update Speed: 1000ms
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream}
    * <br>
    * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-mini-tickers-stream}
    *
    * @param {string} symbol
    */
  miniTickerWS (symbol = null, callbacks) {
    let path = '!miniTicker@arr'
    if (symbol !== null && symbol !== '') {
      path = `${symbol.toLowerCase()}@miniTicker`
    }
    const url = `${this.wsURL}/ws/${path}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Individual symbol or all symbols ticker
    *
    * 24hr rollwing window ticker statistics for a single symbol.
    * <br>
    * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
    * <br>
    * Stream Name: <symbol>@ticker or !ticker@arr
    * <br>
    * Update Speed: 1000ms
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-ticker-streams}
    * <br>
    * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-tickers-stream}
    *
    * @param {string} symbol
    *
    */
  tickerWS (symbol = null, callbacks) {
    let path = '!ticker@arr'
    if (symbol !== null && symbol !== '') {
      path = `${symbol.toLowerCase()}@ticker`
    }
    const url = `${this.wsURL}/ws/${path}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Individual symbol or all symbols book ticker
    *
    * Pushes any update to the best bid or ask's price or quantity in real-time.
    * <br>
    * Stream Name: <symbol>@bookTicker or !bookTicker
    * <br>
    * Update Speed: Real-time
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams}
    * <br>
    * {@link https://binance-docs.github.io/apidocs/spot/en/#all-book-tickers-stream}
    *
    * @param {string} symbol
    */
  bookTickerWS (symbol = null, callbacks) {
    let path = '!bookTicker'
    if (symbol !== null && symbol !== '') {
      path = `${symbol.toLowerCase()}@bookTicker`
    }
    const url = `${this.wsURL}/ws/${path}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Partial Book Depth Streams
    *
    * Top bids and asks, Valid are 5, 10, or 20.
    * <br>
    * Stream Names: <symbol>@depth<levels> or <symbol>@depth<levels>@100ms.
    * <br>
    * Update Speed: 1000ms or 100ms
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#partial-book-depth-streams}
    *
    * @param {string} symbol
    * @param {string} levels - 5, 10, or 20
    * @param {string} speed - 1000ms or 100ms
    *
    */
  partialBookDepth (symbol, levels, speed, callbacks) {
    validateParameter(symbol, 'symbol')
    validateParameter(levels, 'levels')
    validateParameter(speed, 'speed')

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth${levels}@${speed}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Diff. Depth Stream
    *
    * Order book price and quantity depth updates used to locally manage an order book.
    * <br>
    * Stream Names: <symbol>@depth or <symbol>@depth@100ms
    * <br>
    * Update Speed: 1000ms or 100ms
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream}
    *
    * @param {string} symbol
    * @param {string} speed - 1000ms or 100ms
    *
    */
  diffBookDepth (symbol, speed, callbacks) {
    validateParameter(symbol, 'symbol')
    validateParameter(speed, 'speed')

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth@${speed}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Listen to User data stream
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#user-data-streams}
    *
    * @param {string} listenKey
    */
  userData (listenKey, callbacks) {
    validateParameter(listenKey, 'listenKey')

    const url = `${this.wsURL}/ws/${listenKey}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /**
    * Listen to User data stream
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams}
    *
    * @param {array} streams
    *
    * e.g. client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@tikcer'], callbacks)
    */
  combinedStreams (streams, callbacks) {
    if (!Array.isArray(streams)) {
      streams = [streams]
    }

    const url = `${this.wsURL}/stream?streams=${streams.join('/')}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  subscribe (url, callbacks) {
    const ws = new WebSocketClient(url)
    Object.keys(callbacks).forEach((event, _) => {
      this.logger.debug(`listen to event: ${event}`)
      ws.on(event, callbacks[event])
    })

    ws.on('ping', () => {
      this.logger.debug('Received ping from server')
      ws.pong()
    })

    ws.on('pong', () => {
      this.logger.debug('Received pong from server')
    })
  }
}

module.exports = Websocket
