const { validateRequiredParameters } = require('../helpers/validation')

/**
 * API blvt endpoints
 * @module Blvt
 * @param {*} superclass
 */
const Blvt = superclass => class extends superclass {
  /**
   * Get BLVT Info (MARKET_DATA)<br>
   *
   * GET /sapi/v1/blvt/tokenInfo<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-blvt-info-market_data}
   *
   * @param {object} [options]
   * @param {string} [options.tokenName]
   */
  blvtInfo (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/blvt/tokenInfo',
      options
    )
  }

  /**
   * Subscribe BLVT (USER_DATA)<br>
   *
   * POST /sapi/v1/blvt/subscribe<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#subscribe-blvt-user_data}
   *
   * @param {string} tokenName
   * @param {number} cost
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subscribeBlvt (tokenName, cost, options = {}) {
    validateRequiredParameters({ tokenName, cost })
    return this.signRequest(
      'POST',
      '/sapi/v1/blvt/subscribe',
      Object.assign(options, {
        tokenName,
        cost
      })
    )
  }

  /**
   * Query Subscription Record (USER_DATA)<br>
   *
   * GET /sapi/v1/blvt/subscribe/record<br>
   *
   * Only the data of the latest 90 days is available<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-subscription-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.tokenName]
   * @param {number} [options.id]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 1000, max 1000
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   *
   */
  blvtSubscriptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/blvt/subscribe/record',
      options
    )
  }

  /**
   * Subscribe BLVT (USER_DATA)<br>
   *
   * POST /sapi/v1/blvt/redeem<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-blvt-user_data}
   *
   * @param {string} tokenName
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  redeemBlvt (tokenName, amount, options = {}) {
    validateRequiredParameters({ tokenName, amount })
    return this.signRequest(
      'POST',
      '/sapi/v1/blvt/redeem',
      Object.assign(options, {
        tokenName,
        amount
      })
    )
  }

  /**
   * Query Redemption Record (USER_DATA)<br>
   *
   * GET /sapi/v1/blvt/redeem/record<br>
   *
   * Only the data of the latest 90 days is available<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-redemption-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.tokenName]
   * @param {number} [options.id]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 1000, max 1000
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  blvtRedemptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/blvt/redeem/record',
      options
    )
  }
}

module.exports = Blvt
