/**
 * API Rebate endpoints
 * @module Rebate
 * @param {*} superclass
 */
const Rebate = superclass => class extends superclass {
  /**
   * Get Spot Rebate History Records (USER_DATA)<br>
   *
   * GET /sapi/v1/rebate/taxQuery<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-spot-rebate-history-records-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.page] - Default 1
   * @param {number} [options.recvWindow]
   *
   */
  rebateSpotHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/rebate/taxQuery',
      options
    )
  }
}
module.exports = Rebate
