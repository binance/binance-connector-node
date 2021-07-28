const { validateRequiredParameters } = require('../helpers/validation')
/**
 * API fiat endpoints
 * @module Fiat
 * @param {*} superclass
 */
const Fiat = superclass => class extends superclass {
  /**
   * Get Fiat Deposit/Withdraw History (USER_DATA)<br>
   *
   * GET /sapi/v1/fiat/orders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fiat-deposit-withdraw-history-user_data}
   *
   * @param {number} transactionType - 0: deposit, 1: withdraw
   * @param {object} [options]
   * @param {number} [options.beginTime] - If beginTime and endTime are not sent, the recent 30-day data will be returned.
   * @param {number} [options.endTime]
   * @param {number} [options.page] - default 1
   * @param {number} [options.rows] - default 100, max 500
   * @param {number} [options.recvWindow]
   */
  depositWithdrawalHistory (transactionType, options = {}) {
    validateRequiredParameters({ transactionType })

    return this.signRequest(
      'GET',
      '/sapi/v1/fiat/orders',
      Object.assign(options, { transactionType })
    )
  }

  /**
   * Get Fiat Payments History (USER_DATA)<br>
   *
   * GET /sapi/v1/fiat/payments<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fiat-payments-history-user_data}
   *
   * @param {number} transactionType - 0: buy, 1: sell
   * @param {object} [options]
   * @param {number} [options.beginTime] - If beginTime and endTime are not sent, the recent 30-day data will be returned.
   * @param {number} [options.endTime]
   * @param {number} [options.page] - default 1
   * @param {number} [options.rows] - default 100, max 500
   * @param {number} [options.recvWindow]
   */
  paymentHistory (transactionType, options = {}) {
    validateRequiredParameters({ transactionType })

    return this.signRequest(
      'GET',
      '/sapi/v1/fiat/payments',
      Object.assign(options, { transactionType })
    )
  }
}
module.exports = Fiat
