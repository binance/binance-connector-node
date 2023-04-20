'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')
/**
 * API C2C endpoints
 * @module C2C
 * @param {*} superclass
 */
const C2C = superclass => class extends superclass {
  /**
   * Get C2C Trade History (USER_DATA)<br>
   *
   * GET /sapi/v1/c2c/orderMatch/listUserOrderHistory<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-c2c-trade-history-user_data}
   *
   * @param {string} tradeType - BUY, SELL
   * @param {object} [options]
   * @param {number} [options.startTimestamp] - The max interval between startTimestamp and endTimestamp is 30 days.<br>
   *     If startTimestamp and endTimestamp are not sent, the recent 30-day data will be returned.
   * @param {number} [options.endTimestamp]
   * @param {number} [options.page] - default 1
   * @param {number} [options.rows] - default 100, max 100
   * @param {number} [options.recvWindow]
   *
   */
  c2cTradeHistory (tradeType, options = {}) {
    validateRequiredParameters({ tradeType })

    return this.signRequest(
      'GET',
      '/sapi/v1/c2c/orderMatch/listUserOrderHistory',
      Object.assign(options, { tradeType })
    )
  }
}
module.exports = C2C
