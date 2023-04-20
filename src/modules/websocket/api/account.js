'use strict'

/**
 * Websocket API Account endpoints
 * @module Websocket
 * @param {*} superclass
 */
const Account = superclass => class extends superclass {
/**
   * Account information< br>
   *
   * Query information about your account.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#account-information-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   */
  account (options = {}) {
    this.sendSignatureMessage('account.status', options)
  }

  /**
   * Account order rate limits< br>
   *
   * Query your current order rate limit.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#account-order-rate-limits-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   */
  orderLimit (options = {}) {
    this.sendSignatureMessage('account.rateLimits.orders', options)
  }

  /**
   * Account order history< br>
   *
   * Query information about all your orders – active, canceled, filled – filtered by time range.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#account-order-history-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow]
   *
   */
  orderHistory (symbol, options = {}) {
    const limit = options.limit || 500
    this.sendSignatureMessage('allOrders', {
      symbol,
      limit,
      ...options
    })
  }

  /**
   * Account OCO history< br>
   *
   * Query information about all your OCOs, filtered by time range.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#account-oco-history-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.fromId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow]
   *
   */
  ocoOrderHistory (options = {}) {
    const limit = options.limit || 500
    this.sendSignatureMessage('allOrderLists', {
      limit,
      ...options
    })
  }

  /**
   * Account trade history< br>
   *
   * Query information about all your trades, filtered by time range.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#account-trade-history-user_data}
   *
   * @param {string} [symbol]
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.fromId]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow]
   *
   */
  myTrades (symbol, options = {}) {
    const limit = options.limit || 500
    this.sendSignatureMessage('myTrades', {
      symbol,
      limit,
      ...options
    })
  }

  /**
   * Account prevented matches< br>
   *
   * Displays the list of orders that were expired because of STP trigger.<br>
   *
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#account-prevented-matches-user_data}
   *
   * @param {string} [symbol]
   * @param {object} [options]
   * @param {number} [options.preventedMatchId]
   * @param {number} [options.orderId]
   * @param {number} [options.fromPreventedMatchId]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow]
   *
   */
  preventedMatches (symbol, options = {}) {
    const limit = options.limit || 500
    this.sendSignatureMessage('myPreventedMatches', {
      symbol,
      limit,
      ...options
    })
  }
}

module.exports = Account
