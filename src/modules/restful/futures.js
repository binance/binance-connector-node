'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API futures endpoints
 * @module Futures
 * @param {*} superclass
 */
const Futures = superclass => class extends superclass {
  /**
   * New Futures Account Transfer (USER_DATA)
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
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   */
  futuresTransfer (asset, amount, type, options = {}) {
    validateRequiredParameters({ asset, amount, type })

    return this.signRequest(
      'POST',
      '/sapi/v1/futures/transfer',
      Object.assign(options, { asset, amount, type })
    )
  }

  /**
   * Get Futures Account Transaction History List (USER_DATA)
   *
   * GET /sapi/v1/futures/transfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-future-account-transaction-history-list-user_data}
   *
   * @param {string} asset
   * @param {number} startTime
   * @param {object} [options]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {number} [options.recvWindow]
   */
  futuresTransferHistory (asset, startTime, options = {}) {
    validateRequiredParameters({ asset, startTime })

    return this.signRequest(
      'GET',
      '/sapi/v1/futures/transfer',
      Object.assign(options, { asset, startTime })
    )
  }

  /**
   * Cross-Collateral Borrow History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/borrow/history
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-borrow-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.coin]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 500, max 1000
   * @param {number} [options.recvWindow]
   */
  futuresLoanBorrowHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/futures/loan/borrow/history',
      options
    )
  }

  /**
   * Cross-Collateral Repayment History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/repay/history
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-repayment-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.coin]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 500, max 1000
   * @param {number} [options.recvWindow]
   */
  futuresLoanRepayHistory (options = {}) {
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
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   */
  futuresLoanWallet (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v2/futures/loan/wallet',
      options
    )
  }

  /**
   * Adjust Cross-Collateral LTV History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/adjustCollateral/history
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#adjust-cross-collateral-ltv-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.loanCoin]
   * @param {string} [options.collateralCoin]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 500, max 1000
   * @param {number} [options.recvWindow]
   *
   * All data will be returned if loanCoin or collateralCoin is not sent
   */
  futuresLoanAdjustCollateralHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/futures/loan/adjustCollateral/history',
      options
    )
  }

  /**
   * Cross-Collateral Liquidation History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/liquidationHistory
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#adjust-cross-collateral-ltv-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.loanCoin]
   * @param {string} [options.collateralCoin]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 500, max 1000
   * @param {number} [options.recvWindow]
   */
  futuresLoanLiquidationHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/futures/loan/liquidationHistory',
      options
    )
  }

  /**
   * Cross-Collateral Interest History (USER_DATA)
   *
   * GET /sapi/v1/futures/loan/interestHistory
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-interest-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.collateralCoin]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.limit] - Default:500 Max:1000
   * @param {number} [options.recvWindow]
   */
  futuresLoanInterestHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/futures/loan/interestHistory',
      options
    )
  }
}

module.exports = Futures
