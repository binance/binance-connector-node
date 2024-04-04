'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API Simple Earn endpoints
 * @module SimpleEarn
 * @param {*} superclass
 */
const SimpleEarn = superclass => class extends superclass {
  /**
   * Get Simple Earn Flexible Product List (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-simple-earn-flexible-product-list-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexibleProductList (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/list',
      options
    )
  }

  /**
   * Get Simple Earn Locked Product List (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-simple-earn-locked-product-list-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedProductList (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/list',
      options
    )
  }

  /**
   * Subscribe Flexible Product (TRADE)<br>
   *
   * POST /sapi/v1/simple-earn/flexible/subscribe<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#subscribe-flexible-product-trade}
   *
   * @param {string} productId
   * @param {number} amount
   * @param {object} [options]
   * @param {boolean} [options.autoSubscribe]
   * @param {string} [options.sourceAccount]
   * @param {number} [options.recvWindow]
   *
   */
  subscribeFlexibleProduct (productId, amount, options = {}) {
    validateRequiredParameters({ productId, amount })
    return this.signRequest(
      'POST',
      '/sapi/v1/simple-earn/flexible/subscribe',
      Object.assign(options, { productId, amount })
    )
  }

  /**
   * Subscribe Locked Product (TRADE)<br>
   *
   * POST /sapi/v1/simple-earn/locked/subscribe<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#subscribe-locked-product-trade}
   *
   * @param {string} projectId
   * @param {number} amount
   * @param {object} [options]
   * @param {boolean} [options.autoSubscribe]
   * @param {string} [options.sourceAccount]
   * @param {number} [options.recvWindow]
   *
   */
  subscribeLockedProduct (projectId, amount, options = {}) {
    validateRequiredParameters({ projectId, amount })
    return this.signRequest(
      'POST',
      '/sapi/v1/simple-earn/locked/subscribe',
      Object.assign(options, { projectId, amount })
    )
  }

  /**
   * Redeem Flexible Product (TRADE)<br>
   *
   * POST /sapi/v1/simple-earn/flexible/redeem<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-flexible-product-trade}
   *
   * @param {string} productId
   * @param {object} [options]
   * @param {boolean} [options.redeemAll] // true or false, default to false
   * @param {number} [options.amount] // if redeemAll is false, amount is mandatory
   * @param {string} [options.destAccount]
   * @param {number} [options.recvWindow]
   *
   */
  redeemFlexibleProduct (productId, options = {}) {
    validateRequiredParameters({ productId })
    return this.signRequest(
      'POST',
      '/sapi/v1/simple-earn/flexible/redeem',
      Object.assign(options, { productId })
    )
  }

  /**
   * Redeem Locked Product (TRADE)<br>
   *
   * POST /sapi/v1/simple-earn/locked/redeem<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-locked-product-trade}
   *
   * @param {string} positionId
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  redeemLockedProduct (positionId, options = {}) {
    validateRequiredParameters({ positionId })
    return this.signRequest(
      'POST',
      '/sapi/v1/simple-earn/locked/redeem',
      Object.assign(options, { positionId })
    )
  }

  /**
   * Get Flexible Product Position (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/position<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-product-position-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {string} [options.productId]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexibleProductPosition (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/position',
      options
    )
  }

  /**
   * Get Locked Product Position (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/position<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-locked-product-position-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {string} [options.positionId]
   * @param {string} [options.projectId]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedProductPosition (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/position',
      options
    )
  }

  /**
   * Get Simple Account (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#simple-account-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  getSimpleAccount (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/account',
      options
    )
  }

  /**
   * Get Flexible Subscription Record (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/history/subscriptionRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-subscription-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.productId]
   * @param {string} [options.purchaseId]
   * @param {string} [options.asset]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexibleSubscriptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/history/subscriptionRecord',
      options
    )
  }

  /**
   * Get Locked Subscription Record (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/history/subscriptionRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-locked-subscription-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.purchaseId]
   * @param {string} [options.asset]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedSubscriptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/history/subscriptionRecord',
      options
    )
  }

  /**
   * Get Flexible Redemption Record (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/history/redemptionRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-redemption-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.productId]
   * @param {string} [options.redeemId]
   * @param {string} [options.asset]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexibleRedemptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/history/redemptionRecord',
      options
    )
  }

  /**
   * Get Locked Redemption Record (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/history/redemptionRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-locked-redemption-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.positionId]
   * @param {string} [options.redeemId]
   * @param {string} [options.asset]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedRedemptionRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/history/redemptionRecord',
      options
    )
  }

  /**
   * Get Flexible Rewards History (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/history/rewardsRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-rewards-history-user_data}
   *
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.productId]
   * @param {string} [options.asset]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexibleRewardsRecord (type, options = {}) {
    validateRequiredParameters({ type })
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/history/rewardsRecord',
      Object.assign(options, { type })
    )
  }

  /**
   * Get Locked Rewards History (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/history/rewardsRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-locked-rewards-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.positionId]
   * @param {string} [options.asset]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedRewardsRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/history/rewardsRecord',
      options
    )
  }

  /**
   * Set Flexible Auto Subscribe (USER_DATA)<br>
   *
   * POST /sapi/v1/simple-earn/flexible/setAutoSubscribe<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#set-flexible-auto-subscribe-user_data}
   *
   * @param {string} productId
   * @param {boolean} autoSubscribe
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  setFlexibleAutoSubscribe (productId, autoSubscribe, options = {}) {
    validateRequiredParameters({ productId, autoSubscribe })
    return this.signRequest(
      'POST',
      '/sapi/v1/simple-earn/flexible/setAutoSubscribe',
      Object.assign(options, { productId, autoSubscribe })
    )
  }

  /**
   * Set Locked Auto Subscribe (USER_DATA)<br>
   *
   * POST /sapi/v1/simple-earn/locked/setAutoSubscribe<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#set-locked-auto-subscribe-user_data}
   *
   * @param {string} positionId
   * @param {boolean} autoSubscribe
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  setLockedAutoSubscribe (positionId, autoSubscribe, options = {}) {
    validateRequiredParameters({ positionId, autoSubscribe })
    return this.signRequest(
      'POST',
      '/sapi/v1/simple-earn/locked/setAutoSubscribe',
      Object.assign(options, { positionId, autoSubscribe })
    )
  }

  /**
   * Get Flexible Personal Left Quota (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/personalLeftQuota<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-personal-left-quota-user_data}
   *
   * @param {string} productId
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexiblePersonalLeftQuota (productId, options = {}) {
    validateRequiredParameters({ productId })
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/personalLeftQuota',
      Object.assign(options, { productId })
    )
  }

  /**
   * Get Locked Personal Left Quota (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/personalLeftQuota<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-locked-personal-left-quota-user_data}
   *
   * @param {string} projectId
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedPersonalLeftQuota (projectId, options = {}) {
    validateRequiredParameters({ projectId })
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/personalLeftQuota',
      Object.assign(options, { projectId })
    )
  }

  /**
   * Get Flexible Subscription Preview (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/subscriptionPreview<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-subscription-preview-user_data}
   *
   * @param {string} productId
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  getFlexibleSubscriptionPreview (productId, amount, options = {}) {
    validateRequiredParameters({ productId, amount })
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/subscriptionPreview',
      Object.assign(options, { productId, amount })
    )
  }

  /**
   * Get Locked Subscription Preview (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/locked/subscriptionPreview<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-locked-subscription-preview-user_data}
   *
   * @param {string} projectId
   * @param {number} amount
   * @param {object} [options]
   * @param {boolean} [options.autoSubscribe]
   * @param {number} [options.recvWindow]
   *
   */
  getLockedSubscriptionPreview (projectId, amount, options = {}) {
    validateRequiredParameters({ projectId, amount })
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/locked/subscriptionPreview',
      Object.assign(options, { projectId, amount })
    )
  }

  /**
   * Get Rate History (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/history/rateHistory<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-rate-history-user_data}
   *
   * @param {string} productId
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getRateHistory (productId, options = {}) {
    validateRequiredParameters({ productId })
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/history/rateHistory',
      Object.assign(options, { productId })
    )
  }

  /**
   * Get Collateral Record (USER_DATA)<br>
   *
   * GET /sapi/v1/simple-earn/flexible/history/collateralRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-collateral-record-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.productId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current]
   * @param {number} [options.size]
   * @param {number} [options.recvWindow]
   *
   */
  getCollateralRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/simple-earn/flexible/history/collateralRecord',
      options
    )
  }
}

module.exports = SimpleEarn
