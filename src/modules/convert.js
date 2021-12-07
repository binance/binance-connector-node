const { validateRequiredParameters } = require('../helpers/validation')
/**
 * API Convert endpoints
 * @module Convert
 * @param {*} superclass
 */
const Convert = superclass => class extends superclass {
  /**
   * Get Convert Trade History (USER_DATA)<br>
   *
   * GET /sapi/v1/convert/tradeFlow<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-convert-trade-history-user_data}
   *
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {object} [options]
   * @param {number} [options.limit] - Default 100, Max 1000
   * @param {number} [options.recvWindow]
   *
   */
  convertTradeHistory (startTime, endTime, options = {}) {
    validateRequiredParameters({ startTime, endTime })

    return this.signRequest(
      'GET',
      '/sapi/v1/convert/tradeFlow',
      Object.assign(options, { startTime, endTime })
    )
  }
}
module.exports = Convert
