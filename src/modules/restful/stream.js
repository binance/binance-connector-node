'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API stream endpoints
 * @module Stream
 * @param {*} superclass
 */
const Stream = superclass => class extends superclass {
  /**
   * Create a ListenKey (USER_STREAM)<br>
   *
   * POST /api/v3/userDataStream<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/user-data-stream#create-a-listenkey-user_stream}
   *
   * @param {object} [options]
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
   */
  createListenKey (options = {}) {
    return this.publicRequest(
      'POST',
      '/api/v3/userDataStream',
      options
    )
  }

  /**
   * Ping/Keep-alive a ListenKey (USER_STREAM)<br>
   *
   * PUT /api/v3/userDataStream<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/user-data-stream#pingkeep-alive-a-listenkey-user_stream}
   *
   * @param {string} listenKey
   * @param {object} [options]
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
   */
  renewListenKey (listenKey, options = {}) {
    validateRequiredParameters({ listenKey })
    return this.publicRequest(
      'PUT',
      '/api/v3/userDataStream',
      Object.assign(options, {
        listenKey
      })
    )
  }

  /**
   * Close a ListenKey (USER_STREAM)<br>
   *
   * DELETE /api/v3/userDataStream<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/user-data-stream#close-a-listenkey-user_stream}
   *
   * @param {string} listenKey
   * @param {object} [options]
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
   */
  closeListenKey (listenKey, options = {}) {
    validateRequiredParameters({ listenKey })
    return this.publicRequest(
      'DELETE',
      '/api/v3/userDataStream',
      Object.assign(options, {
        listenKey
      })
    )
  }

  /**
   * Create a Margin ListenKey (USER_STREAM)<br>
   *
   * POST /sapi/v1/userDataStream<br>
   *
   * {@link https://developers.binance.com/docs/margin_trading/trade-data-stream/Start-Margin-User-Data-Stream}
   *
   */
  createMarginListenKey () {
    return this.publicRequest(
      'POST',
      '/sapi/v1/userDataStream'
    )
  }

  /**
   * Ping/Keep-alive a Margin ListenKey (USER_STREAM)<br>
   *
   * PUT /sapi/v1/userDataStream<br>
   *
   * {@link https://developers.binance.com/docs/margin_trading/trade-data-stream/Keepalive-Margin-User-Data-Stream}
   *
   * @param {string} listenKey
   */
  renewMarginListenKey (listenKey) {
    validateRequiredParameters({ listenKey })
    return this.publicRequest(
      'PUT',
      '/sapi/v1/userDataStream',
      { listenKey }
    )
  }

  /**
   * Close a Margin ListenKey (USER_STREAM)<br>
   *
   * DELETE /sapi/v1/userDataStream<br>
   *
   * {@link https://developers.binance.com/docs/margin_trading/trade-data-stream/Close-Margin-User-Data-Stream}
   *
   * @param {string} listenKey
   */
  closeMarginListenKey (listenKey) {
    validateRequiredParameters({ listenKey })
    return this.publicRequest(
      'DELETE',
      '/sapi/v1/userDataStream',
      { listenKey }
    )
  }

  /**
   * Create an Isolated Margin ListenKey (USER_STREAM)<br>
   *
   * POST /sapi/v1/userDataStream/isolated<br>
   *
   * {@link https://developers.binance.com/docs/margin_trading/trade-data-stream/Start-Isolated-Margin-User-Data-Stream}
   *
   * @param {string} symbol
   */
  createIsolatedMarginListenKey (symbol) {
    validateRequiredParameters({ symbol })
    return this.publicRequest(
      'POST',
      '/sapi/v1/userDataStream/isolated',
      { symbol }
    )
  }

  /**
   * Ping/Keep-alive an Isolated Margin ListenKey (USER_STREAM)<br>
   *
   * PUT /sapi/v1/userDataStream/isolated<br>
   *
   * {@link https://developers.binance.com/docs/margin_trading/trade-data-stream/Keepalive-Isolated-Margin-User-Data-Stream}
   *
   * @param {string} symbol
   * @param {string} listenKey
   */
  renewIsolatedMarginListenKey (symbol, listenKey) {
    validateRequiredParameters({ symbol, listenKey })
    return this.publicRequest(
      'PUT',
      '/sapi/v1/userDataStream/isolated',
      { symbol, listenKey }
    )
  }

  /**
   * Close an Isolated Margin ListenKey (USER_STREAM)<br>
   *
   * DELETE /sapi/v1/userDataStream/isolated<br>
   *
   * {@link https://developers.binance.com/docs/margin_trading/trade-data-stream/Close-Isolated-Margin-User-Data-Stream}
   *
   * @param {string} symbol
   * @param {string} listenKey
   */
  closeIsolatedMarginListenKey (symbol, listenKey) {
    validateRequiredParameters({ symbol, listenKey })
    return this.publicRequest(
      'DELETE',
      '/sapi/v1/userDataStream/isolated',
      { symbol, listenKey }
    )
  }
}

module.exports = Stream
