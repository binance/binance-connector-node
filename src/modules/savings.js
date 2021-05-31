const { validateParameter } = require('../helpers/validation')

/**
 * API savings endpoints
 * @module Savings
 * @param {*} superclass
 */
const Savings = superclass => class extends superclass {
  /**
   * Get Flexible Product List (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/daily/product/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-product-list-user_data}
   *
   * @param {string} [status] - "ALL", "SUBSCRIBABLE", "UNSUBSCRIBABLE"; default "ALL"
   * @param {string} [featured] - "ALL", "true"; default "ALL"
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsFlexibleProducts (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/daily/product/list',
      options
    )
  }

  /**
   * Get Left Daily Purchase Quota of Flexible Product (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/daily/userLeftQuota<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-left-daily-purchase-quota-of-flexible-product-user_data}
   *
   * @param {string} productId
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsFlexibleUserLeftQuota (productId, options = {}) {
    validateParameter(productId, 'productId')
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/daily/userLeftQuota',
      Object.assign(options, {
        productId
      })
    )
  }

  /**
   * Purchase Flexible Product (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/daily/purchase<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#purchase-flexible-product-user_data}
   *
   * @param {string} productId
   * @param {string} amount
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsPurchaseFlexibleProduct (productId, amount, options = {}) {
    validateParameter(productId, 'productId')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/lending/daily/purchase',
      Object.assign(options, {
        productId,
        amount
      })
    )
  }

  /**
   * Get Left Daily Redemption Quota of Flexible Product (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/daily/userRedemptionQuota<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-left-daily-redemption-quota-of-flexible-product-user_data}
   *
   * @param {string} productId
   * @param {string} type - "FAST", "NORMAL"
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsFlexibleUserRedemptionQuota (productId, type, options = {}) {
    validateParameter(productId, 'productId')
    validateParameter(type, 'type')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/daily/userRedemptionQuota',
      Object.assign(options, {
        productId,
        type
      })
    )
  }

  /**
   * Redeem Flexible Product (USER_DATA)<br>
   *
   * POST /sapi/v1/lending/daily/redeem<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-flexible-product-user_data}
   *
   * @param {string} productId
   * @param {number} amount
   * @param {string} type - "FAST", "NORMAL"
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsFlexibleRedeem (productId, amount, type, options = {}) {
    validateParameter(productId, 'productId')
    validateParameter(amount, 'amount')
    validateParameter(type, 'type')

    return this.signRequest(
      'POST',
      '/sapi/v1/lending/daily/redeem',
      Object.assign(options, {
        productId,
        amount,
        type
      })
    )
  }

  /**
   * Get Flexible Product Position (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/daily/token/position<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-product-position-user_data}
   *
   * @param {string} asset
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsFlexibleProductPosition (asset, options = {}) {
    validateParameter(asset, 'asset')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/daily/token/position',
      Object.assign(options, {
        asset
      })
    )
  }

  /**
   * Get Fixed and Activity Project List(USER_DATA)<br>
   *
   * GET /sapi/v1/lending/project/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fixed-and-activity-project-list-user_data}
   *
   * @param {string} type - "ACTIVITY", "CUSTOMIZED_FIXED"
   * @param {string} [asset]
   * @param {string} [status] - "ALL", "SUBSCRIBABLE", "UNSUBSCRIBABLE"; default "ALL"
   * @param {boolean} [isSortAsc] - default "true"
   * @param {string} [sortBy] - "START_TIME", "LOT_SIZE", "INTEREST_RATE", "DURATION"; default "START_TIME"
   * @param {number} [current] - Currently querying page. Start from 1. Default:1
   * @param {number} [size] - Default:10, Max:100
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsProductList (type, options = {}) {
    validateParameter(type, 'type')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/project/list',
      Object.assign(options, {
        type
      })
    )
  }

  /**
   * Purchase Fixed/Activity Project (USER_DATA)<br>
   *
   * POST /sapi/v1/lending/customizedFixed/purchase<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#purchase-fixed-activity-project-user_data}
   *
   * @param {string} projectId
   * @param {number} lot
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsPurchaseCustomizedProject (projectId, lot, options = {}) {
    validateParameter(projectId, 'projectId')
    validateParameter(lot, 'lot')

    return this.signRequest(
      'POST',
      '/sapi/v1/lending/customizedFixed/purchase',
      Object.assign(options, {
        projectId,
        lot
      })
    )
  }

  /**
   * Get Fixed/Activity Project Position (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/project/position/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fixed-activity-project-position-user_data}
   *
   * @param {string} asset
   * @param {string} [projectId]
   * @param {string} [status] - "HOLDING", "REDEEMED"
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsCustomizedPosition (asset, options = {}) {
    validateParameter(asset, 'asset')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/project/position/list',
      Object.assign(options, {
        asset
      })
    )
  }

  /**
   * Lending Account (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/union/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#lending-account-user_data}
   *
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsAccount (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/union/account',
      options
    )
  }

  /**
   * Get Purchase Record (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/union/purchaseRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-purchase-record-user_data}
   *
   * @param {string} lendingType - "DAILY" for flexible,
   *    "ACTIVITY" for activity, "CUSTOMIZED_FIXED" for fixed
   * @param {string} [asset]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [current] - Currently querying page. Start from 1. Default:1
   * @param {number} [size] - Default:10, Max:100
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsPurchaseRecord (lendingType, options = {}) {
    validateParameter(lendingType, 'lendingType')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/union/purchaseRecord',
      Object.assign(options, {
        lendingType
      })
    )
  }

  /**
   * Get Redemption Record (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/union/redemptionRecord<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-redemption-record-user_data}
   *
   * @param {string} lendingType - "DAILY" for flexible,
   *    "ACTIVITY" for activity, "CUSTOMIZED_FIXED" for fixed
   * @param {string} [asset]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [current] - Currently querying page. Start from 1. Default:1
   * @param {number} [size] - Default:10, Max:100
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsRedemptionRecord (lendingType, options = {}) {
    validateParameter(lendingType, 'lendingType')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/union/redemptionRecord',
      Object.assign(options, {
        lendingType
      })
    )
  }

  /**
   * Get Interest History (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/union/interestHistory<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-interest-history-user_data-2}
   *
   * @param {string} lendingType - "DAILY" for flexible,
   *    "ACTIVITY" for activity, "CUSTOMIZED_FIXED" for fixed
   * @param {string} [asset]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [current] - Currently querying page. Start from 1. Default:1
   * @param {number} [size] - Default:10, Max:100
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  savingsInterestHistory (lendingType, options = {}) {
    validateParameter(lendingType, 'lendingType')

    return this.signRequest(
      'GET',
      '/sapi/v1/lending/union/interestHistory',
      Object.assign(options, {
        lendingType
      })
    )
  }
}

module.exports = Savings
