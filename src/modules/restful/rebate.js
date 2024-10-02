'use strict'

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
   * {@link https://developers.binance.com/docs/rebate/rest-api/Get-Spot-Rebate-History-Records}
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
