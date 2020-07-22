const { validateParameter } = require('../helpers/validation')

const Savings = superclass => class extends superclass {
  /*
    * Get Flexible Product List (USER_DATA)
    *
    * GET /sapi/v1/lending/daily/product/list
    *
    * @param {string} status
    * @param {string} featured
    * @param {number} recvWindow
    */
  savingsFlexibleProducts (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/daily/product/list',
      options
    )
  }

  /*
    * Get Left Daily Purchase Quota of Flexible Product (USER_DATA)
    *
    * GET /sapi/v1/lending/daily/userLeftQuota
    *
    * @param {string} productId
    * @param {number} recvWindow
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

  /*
    * Purchase Flexible Product (USER_DATA)
    *
    * GET /sapi/v1/lending/daily/purchase
    *
    * @param {string} productId
    * @param {string} amount
    * @param {number} recvWindow
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

  /*
    * Get Left Daily Redemption Quota of Flexible Product (USER_DATA)
    *
    * GET /sapi/v1/lending/daily/purchase
    *
    * @param {string} productId
    * @param {string} type "FAST", "NORMAL"
    * @param {number} recvWindow
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

  /*
    * Redeem Flexible Product (USER_DATA)
    *
    * POST /sapi/v1/lending/daily/redeem
    *
    * @param {string} productId
    * @param {string} type "FAST", "NORMAL"
    * @param {number} recvWindow
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

  /*
    * Redeem Flexible Product (USER_DATA)
    *
    * GET /sapi/v1/lending/daily/redeem
    *
    * @param {string} asset
    * @param {number} recvWindow
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

  /*
    * Get Fixed and Customized Fixed Project List(USER_DATA)
    *
    * GET /sapi/v1/lending/project/list
    *
    * @param {string} type
    * @param {string} asset
    * @param {string} status
    * @param {boolean} isSortAsc
    * @param {string} sortBy
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
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

  /*
    * Purchase Customized Fixed Project (USER_DATA)
    *
    * POST /sapi/v1/lending/customizedFixed/purchase
    *
    * @param {string} projectId
    * @param {number} lot
    * @param {number} recvWindow
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

  /*
    * Get Customized Fixed Project Position (USER_DATA)
    *
    * GET /sapi/v1/lending/project/position/list
    *
    * @param {string} asset
    * @param {string} projectId
    * @param {string} status
    * @param {number} recvWindow
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

  /*
    * Lending Account (USER_DATA)
    *
    * GET /sapi/v1/lending/union/account
    *
    * @param {number} recvWindow
    */
  savingsAccount (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/union/account',
      options
    )
  }

  /*
    * Get Customized Fixed Project Position (USER_DATA)
    *
    * GET /sapi/v1/lending/union/purchaseRecord
    *
    * @param {string} lendingType
    * @param {string} asset
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
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

  /*
    * Get Redemption Record (USER_DATA)
    *
    * GET /sapi/v1/lending/union/redemptionRecord
    *
    * @param {string} lendingType
    * @param {string} asset
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
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

  /*
    * Get Interest History (USER_DATA)
    *
    * GET /sapi/v1/lending/union/interestHistory
    *
    * @param {string} lendingType
    * @param {string} asset
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
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
