const { validateParameter } = require('../helpers/validation')

const Blvt = superclass => class extends superclass {
  /*
    * Get BLVT Info (MARKET_DATA)
    *
    * /sapi/v1/blvt/tokenInfo
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#get-blvt-info-market_data
    */
  blvtInfo (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/blvt/tokenInfo',
      options
    )
  }

  /*
    * Subscribe BLVT (USER_DATA)
    *
    * POST /sapi/v1/blvt/subscribe
    *
    * @param {string} tokenName
    * @param {number} cost
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#subscribe-blvt-user_data
    */
  subscribeBlvt (tokenName, cost, options = {}) {
    validateParameter(tokenName, 'tokenName')
    validateParameter(cost, 'cost')
    return this.signRequest(
      'POST',
      '/sapi/v1/blvt/subscribe',
      Object.assign(options, {
        tokenName,
        cost
      })
    )
  }

  /*
    * Query Subscription Record (USER_DATA)
    *
    * GET /sapi/v1/blvt/subscribe/record
    *
    * Only the data of the latest 90 days is available
    *
    * @param {string} tokenName
    * @param {number} id
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#query-subscription-record-user_data
    */
  blvtSubscriptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/blvt/subscribe/record',
      options
    )
  }

  /*
    * Subscribe BLVT (USER_DATA)
    *
    * POST /sapi/v1/blvt/redeem
    *
    * @param {string} tokenName
    * @param {number} amount
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#redeem-blvt-user_data
    */
  redeemBlvt (tokenName, amount, options = {}) {
    validateParameter(tokenName, 'tokenName')
    validateParameter(amount, 'amount')
    return this.signRequest(
      'POST',
      '/sapi/v1/blvt/redeem',
      Object.assign(options, {
        tokenName,
        amount
      })
    )
  }

  /*
    * Query Redemption Record (USER_DATA)
    *
    * GET /sapi/v1/blvt/redeem/record
    *
    * Only the data of the latest 90 days is available
    *
    * @param {string} tokenName
    * @param {number} id
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#query-redemption-record-user_data
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