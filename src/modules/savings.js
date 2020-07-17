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
}

module.exports = Savings
