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
   * {@link https://developers.binance.com/docs/simple_earn/account/Get-Simple-Earn-Flexible-Product-List}
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
   * {@link https://developers.binance.com/docs/simple_earn/account/Get-Simple-Earn-Locked-Product-List}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Subscribe-Flexible-Product}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Subscribe-Locked-Product}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Redeem-Flexible-Product}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Redeem-Locked-Product}
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
   * {@link https://developers.binance.com/docs/simple_earn/account/Get-Flexible-Product-Position}
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
   * {@link https://developers.binance.com/docs/simple_earn/account/Get-Locked-Product-Position}
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
   * {@link https://developers.binance.com/docs/simple_earn/account/Simple-Account}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Flexible-Subscription-Record}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Locked-Subscription-Record}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Flexible-Redemption-Record}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Locked-Redemption-Record}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Flexible-Rewards-History}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Locked-Rewards-History}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Set-Flexible-Auto-Subscribe}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Set-Locked-Auto-Subscribe}
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
   * {@link https://developers.binance.com/docs/simple_earn/account/Get-Flexible-Personal-Left-Quota}
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
   * {@link https://developers.binance.com/docs/simple_earn/account/Get-Locked-Personal-Left-Quota}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Get-Flexible-Subscription-Preview}
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
   * {@link https://developers.binance.com/docs/simple_earn/earn/Get-Locked-Subscription-Preview}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Rate-History}
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
   * {@link https://developers.binance.com/docs/simple_earn/history/Get-Collateral-Record}
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
