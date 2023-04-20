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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot}
   */
  createListenKey () {
    return this.publicRequest(
      'POST',
      '/api/v3/userDataStream'
    )
  }

  /**
   * Ping/Keep-alive a ListenKey (USER_STREAM)<br>
   *
   * PUT /api/v3/userDataStream<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot}
   *
   * @param {string} listenKey
   */
  renewListenKey (listenKey) {
    validateRequiredParameters({ listenKey })
    return this.publicRequest(
      'PUT',
      '/api/v3/userDataStream',
      { listenKey }
    )
  }

  /**
   * Close a ListenKey (USER_STREAM)<br>
   *
   * DELETE /api/v3/userDataStream<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot}
   *
   * @param {string} listenKey
   */
  closeListenKey (listenKey) {
    validateRequiredParameters({ listenKey })
    return this.publicRequest(
      'DELETE',
      '/api/v3/userDataStream',
      { listenKey }
    )
  }

  /**
   * Create a Margin ListenKey (USER_STREAM)<br>
   *
   * POST /sapi/v1/userDataStream<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-margin}
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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-margin}
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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-margin}
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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-isolated-margin}
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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-isolated-margin}
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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-isolated-margin}
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
