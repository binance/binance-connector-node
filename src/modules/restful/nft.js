'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')
/**
 * API NFT endpoints
 * @module NFT
 * @param {*} superclass
 */
const NFT = superclass => class extends superclass {
  /**
     * Get NFT Transaction History (USER_DATA)<br>
     *
     * GET /sapi/v1/nft/history/transactions<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-transaction-history-user_data}
     *
     * @param {number} orderType - 0: purchase order, 1: sell order, 2: royalty income, 3: primary market order, 4: mint fee
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
  nftTransactionHistory (orderType, options = {}) {
    validateRequiredParameters({ orderType })

    return this.signRequest(
      'GET',
      '/sapi/v1/nft/history/transactions',
      Object.assign(options, { orderType })
    )
  }

  /**
     * Get NFT Deposit History(USER_DATA)<br>
     *
     * GET /sapi/v1/nft/history/deposit<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-deposit-history-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
  nftDepositHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/nft/history/deposit',
      options
    )
  }

  /**
     * Get NFT Withdraw History (USER_DATA)<br>
     *
     * GET /sapi/v1/nft/history/withdraw<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-withdraw-history-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
  nftWithdrawHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/nft/history/withdraw',
      options
    )
  }

  /**
     * Get NFT Asset (USER_DATA)<br>
     *
     * GET /sapi/v1/nft/user/getAsset<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-asset-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
  nftAsset (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/nft/user/getAsset',
      options
    )
  }
}
module.exports = NFT
