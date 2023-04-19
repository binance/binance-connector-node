'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API Gift Card Endpoints
 * @module GiftCard
 * @param {*} superclass
 */
const GiftCard = superclass => class extends superclass {
  /**
    * Create a Binance Code (USER_DATA)<br>
    *
    * POST /sapi/v1/giftcard/createCode<br>
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#create-a-binance-code-user_data}
    *
    * @param {string} token - The coin type contained in the Binance Code
    * @param {number} amount - The amount of the coin
    * @param {object} [options]
    * @param {number} [options.recvWindow] - The value cannot be greater than 60000
    */
  giftCardCreateCode (token, amount, options = {}) {
    validateRequiredParameters({ token, amount })

    return this.signRequest(
      'POST',
      '/sapi/v1/giftcard/createCode',
      Object.assign(options, { token, amount })
    )
  }

  /**
    * Redeem a Binance Code (USER_DATA)<br>
    *
    * POST /sapi/v1/giftcard/redeemCode<br>
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-a-binance-code-user_data}
    *
    * @param {string} code - Binance Code
    * @param {object} [options]
    * @param {string} [options.externalUid] - Each external unique ID represents a unique user on the partner platform. The function helps you to identify the redemption behavior of different users, such as redemption frequency and amount. It also helps risk and limit control of a single account, such as daily limit on redemption volume, frequency, and incorrect number of entries. This will also prevent a single user account reach the partner's daily redemption limits. We strongly recommend you to use this feature and transfer us the User ID of your users if you have different users redeeming Binance codes on your platform. To protect user data privacy, you may choose to transfer the user id in any desired format (max. 400 characters).
    * @param {number} [options.recvWindow] - The value cannot be greater than 60000
    */
  giftCardRedeemCode (code, options = {}) {
    validateRequiredParameters({ code })

    return this.signRequest(
      'POST',
      '/sapi/v1/giftcard/redeemCode',
      Object.assign(options, { code })
    )
  }

  /**
    * Verify a Binance Code (USER_DATA)<br>
    *
    * GET /sapi/v1/giftcard/verify<br>
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#verify-a-binance-code-user_data}
    *
    * @param {string} referenceNo - reference number
    * @param {object} [options]
    * @param {number} [options.recvWindow] - The value cannot be greater than 60000
    */
  giftCardVerifyCode (referenceNo, options = {}) {
    validateRequiredParameters({ referenceNo })

    return this.signRequest(
      'GET',
      '/sapi/v1/giftcard/verify',
      Object.assign(options, { referenceNo })
    )
  }

  /**
   * Fetch RSA Public Key (USER_DATA)<br>
   *
   * GET /sapi/v1/giftcard/cryptography/rsa-public-key<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#fetch-rsa-public-key-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  giftCardRsaPublicKey (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/giftcard/cryptography/rsa-public-key',
      options
    )
  }
}

module.exports = GiftCard
