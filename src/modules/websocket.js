const { validateParameter } = require('../helpers/validation')
const WebSocketClient = require('ws')

const Websocket = superclass => class extends superclass {
  constructor (options) {
    super(options)
    this.wsURL = options.wsURL || 'wss://stream.binance.com:9443'
  }

  /*
    * Aggregate Trade Streams
    *
    * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
    * Stream Name: <symbol>@aggTrade
    * Update Speed: Real-time
    *
    * @param {string} symbol
    *
    */
  aggTradeWS (symbol, callbacks) {
    validateParameter(symbol, 'symbol')
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@aggTrade`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /*
    * Trade Streams
    *
    * The Trade Streams push raw trade information; each trade has a unique buyer and seller.
    * Stream Name: <symbol>@trade
    * Update Speed: Real-time
    *
    * @param {string} symbol
    *
    */
  tradeWS (symbol, callbacks) {
    validateParameter(symbol, 'symbol')
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@trade`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /*
    * Kline/Candlestick Streams
    *
    * The Kline/Candlestick Stream push updates to the current klines/candlestick every second.
    *
    * Stream Name: <symbol>@kline_<interval>
    *
    * interval:
    * m -> minutes; h -> hours; d -> days; w -> weeks; M -> months
    *
    * - 1m
    * - 3m
    * - 5m
    * - 15m
    * - 30m
    * - 1h
    * - 2h
    * - 4h
    * - 6h
    * - 8h
    * - 12h
    * - 1d
    * - 3d
    * - 1w
    * - 1M
    *
    * Update Speed: 2000ms
    *
    * @param {string} symbol
    * @param {string} interval
    *
    */
  klineWS (symbol, interval, callbacks) {
    validateParameter(symbol, 'symbol')
    validateParameter(interval, 'interval')

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@kline_${interval}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /*
    * Individual symbol or all symbols mini ticker
    *
    * 24hr rolling window mini-ticker statistics.
    * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs
    *
    * Stream Name: <symbol>@miniTicker or
    * Stream Name: !miniTicker@arr
    *
    * Update Speed: 1000ms
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

  /*
    * Individual symbol or all symbols ticker
    *
    * 24hr rollwing window ticker statistics for a single symbol.
    *
    * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
    *
    * Stream Name: <symbol>@ticker or
    * Stream Name: !ticker@arr
    *
    * Update Speed: 1000ms
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

  /*
    * Individual symbol or all symbols ticker
    *
    * 24hr rollwing window ticker statistics for a single symbol.
    *
    * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
    *
    * Stream Name: <symbol>@ticker or
    * Stream Name: !ticker@arr
    *
    * Update Speed: 1000ms
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

  /*
    * Partial Book Depth Streams
    *
    * Top bids and asks, Valid are 5, 10, or 20.
    *
    * Stream Names: <symbol>@depth<levels> OR
    * <symbol>@depth<levels>@100ms.
    *
    * Update Speed: 1000ms or 100ms
    *
    * @param {string} symbol
    * @param {string} levels 5, 10, or 20
    * @param {string} speed 1000ms or 100ms
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

  /*
    * Diff. Depth Stream
    *
    * Order book price and quantity depth updates used to locally manage an order book.
    *
    * Stream Names: <symbol>@depth OR <symbol>@depth@100ms
    *
    * Update Speed: 1000ms or 100ms
    *
    * @param {string} symbol
    * @param {string} speed 1000ms or 100ms
    *
    */
  diffBookDepth (symbol, speed, callbacks) {
    validateParameter(symbol, 'symbol')
    validateParameter(speed, 'speed')

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth@${speed}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /*
    * Listen to User data stream
    *
    * @param {string} listenKey
    *
    */
  userData (listenKey, callbacks) {
    validateParameter(listenKey, 'listenKey')

    const url = `${this.wsURL}/ws/${listenKey}`
    this.logger.debug(url)
    this.subscribe(url, callbacks)
  }

  /*
    * Listen to User data stream
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
