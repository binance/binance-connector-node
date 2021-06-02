const { validateParameter, hasOneOfParameters } = require('../helpers/validation')

/**
 * API futures endpoints
 * @module Futures
 * @param {*} superclass
 */
const Futures = superclass => class extends superclass {
  /**
   * New Future Account Transfer (USER_DATA)
   *
   * Execute transfer between spot account and futures account.
   *
   * POST /sapi/v1/futures/transfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#new-future-account-transfer-user_data}
   *
   * @param {string} asset - The asset being transferred, e.g., USDT
   * @param {number} amount - The amount to be transferred
   * @param {number} type - 1: transfer from spot account to USDT-Ⓜ futures account.
   * <br>2: transfer from USDT-Ⓜ futures account to spot account.
   * <br>3: transfer from spot account to COIN-Ⓜ futures account.
   * <br>4: transfer from COIN-Ⓜ futures account to spot account.
   * @param {number} [recvWindow]
   */
  futuresAccountTransfer (asset, amount, type, options = {}) {
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')
    validateParameter(type, 'type')

    return this.signRequest(
      'POST',
      '/sapi/v1/futures/transfer',
      Object.assign(options, { asset, amount, type })
    )
  }

  /**
   * Get Future Account Transaction History List (USER_DATA)
   *
   * GET /sapi/v1/futures/transfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-future-account-transaction-history-list-user_data}
   *
   * @param {string} asset
   * @param {number} startTime
   * @param {number} [endTime]
   * @param {number} [current] - Currently querying page. Start from 1. Default:1
   * @param {number} [size] - Default:10 Max:100
   * @param {number} [recvWindow]
   */
  futuresAccountTransferHistory (asset, startTime, options = {}) {
    validateParameter(asset, 'asset')
    validateParameter(startTime, 'startTime')

    return this.signRequest(
      'GET',
      '/sapi/v1/futures/transfer',
      Object.assign(options, { asset, startTime })
    )
  }

  /**
   * Borrow For Cross-Collateral (TRADE)
   *
   * POST /sapi/v1/futures/loan/borrow
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#borrow-for-cross-collateral-trade}
   *
   * @param {string} coin
   * @param {number} amount - mandatory when collateralAmount is empty
   * @param {string} collateralCoin
   * @param {number} collateralAmount - mandatory when amount is empty
   * @param {number} [recvWindow]
   */
  futuresBorrowCrossCollateral (coin, amount, collateralCoin, collateralAmount, options = {}) {
    validateParameter(coin, 'coin')
    validateParameter(collateralCoin, 'collateralCoin')
    hasOneOfParameters(amount, 'amount', collateralAmount, 'collateralAmount')

    return this.signRequest(
      'POST',
      '/sapi/v1/futures/loan/borrow',
      Object.assign(options, { coin, amount, collateralCoin, collateralAmount })
    )
  }

  /**
   * Cross-Collateral Borrow History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/borrow/history
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-borrow-history-user_data}
   *
   * @param {string} [coin]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit] - default 500, max 1000
   * @param {number} [recvWindow]
   */
  futuresBorrowCrossCollateralHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/futures/loan/borrow/history',
      options
    )
  }

  /**
   * Repay For Cross-Collateral (TRADE)
   *
   * POST /sapi/v1/futures/loan/repay
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#repay-for-cross-collateral-trade}
   *
   * @param {string} coin
   * @param {string} collateralCoin
   * @param {number} amount
   * @param {number} [recvWindow]
   */
  futuresRepayCrossCollateral (coin, collateralCoin, amount, options = {}) {
    validateParameter(coin, 'coin')
    validateParameter(collateralCoin, 'collateralCoin')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/futures/loan/repay',
      Object.assign(options, { coin, collateralCoin, amount })
    )
  }

  /**
   * Cross-Collateral Repayment History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/repay/history
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-repayment-history-user_data}
   *
   * @param {string} [coin]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit] - default 500, max 1000
   * @param {number} [recvWindow]
   */
  futuresRepayCrossCollateralHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/futures/loan/repay/history',
      options
    )
  }

  /**
   * Cross-Collateral Wallet (USER_DATA)
   *
   * GET /sapi/v2/futures/loan/wallet
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-wallet-v2-user_data}
   *
   * @param {number} [recvWindow]
   */
  futuresCrossCollateralWallet (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v2/futures/loan/wallet',
      options
    )
  }

  /**
   * Cross-Collateral Information (USER_DATA)
   *
   * GET /sapi/v2/futures/loan/configs
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-information-v2-user_data}
   *
   * @param {number} [loanCoin]
   * @param {number} [collateralCoin]
   * @param {number} [recvWindow]
   */
  futuresCrossCollateralInfo (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v2/futures/loan/configs',
      options
    )
  }
}

module.exports = Futures
