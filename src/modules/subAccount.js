const { validateParameter } = require('../helpers/validation')

/**
 * API sub account endpoints
 * @module SubAccount
 * @param {*} superclass
 */
const SubAccount = superclass => class extends superclass {
  /**
    * Query Sub-account List(For Master Account)
    *
    * GET /sapi/v1/sub-account/list
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-list-sapi-for-master-account}
    *
    * @param {string} [email]
    * @param {string} [isFreeze]
    * @param {number} [page]
    * @param {number} [limit]
    * @param {number} [recvWindow]

    */
  subAccountList (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/list',
      options
    )
  }

  /**
   * Query Sub-account Transfer History(For Master Account)
   *
   * GET /sapi/v1/sub-account/sub/transfer/history
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-asset-transfer-history-sapi-for-master-account}
   *
   * @param {string} [fromEmail]
   * @param {string} [toEmail]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [page]
   * @param {number} [limit]
   * @param {number} [recvWindow]

   */
  subAccountTransferHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/sub/transfer/history',
      options
    )
  }

  /**
    * Query Sub-account Assets(For Master Account)
    *
    * GET /sapi/v3/sub-account/assets
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-assets-for-master-account}
    *
    * @param {string} email
    * @param {number} [recvWindow]
    */
  subAccountAssets (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'GET',
      '/sapi/v3/sub-account/assets',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Sub-account Deposit Address (For Master Account)
   *
   * GET /sapi/v1/capital/deposit/subAddress
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account}
   *
   * @param {string} email
   * @param {string} coin
   * @param {string} [network]
   * @param {number} [recvWindow]
   */
  subAccountDepositAddress (email, coin, options = {}) {
    validateParameter(email, 'email')
    validateParameter(coin, 'coin')

    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/subAddress',
      Object.assign(options, {
        email,
        coin
      })
    )
  }

  /**
   * Get Sub-account Deposit History (For Master Account)
   *
   * GET /sapi/v1/capital/deposit/subHisrec
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account}
   *
   * @param {string} email
   * @param {string} [coin]
   * @param {number} [status]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {number} [recvWindow]
   */
  subAccountDepositHistory (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/subHisrec',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Sub-account's Status on Margin/Futures(For Master Account)
   *
   * GET /sapi/v1/sub-account/status
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-39-s-status-on-margin-futures-for-master-account}
   *
   * @param {string} [email]
   * @param {number} [recvWindow]
   */
  subAccountStatus (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/status',
      options
    )
  }

  /**
   * Enable Margin for Sub-account (For Master Account)
   *
   * POST /sapi/v1/sub-account/margin/enable
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-margin-for-sub-account-for-master-account}
   *
   * @param {string} [email]
   * @param {number} [recvWindow]
   */
  subAccountEnableMargin (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/margin/enable',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Detail on Sub-account's Margin Account (For Master Account)
   *
   * GET /sapi/v1/sub-account/margin/account
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account}
   *
   * @param {string} email
   * @param {number} [recvWindow]
   */
  subAccountMarginAccount (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/margin/account',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Summary of Sub-account's Margin Account (For Master Account)
   *
   * GET /sapi/v1/sub-account/margin/accountSummary
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account}
   *
   * @param {number} [recvWindow]
   */
  subAccountMarginAccountSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/margin/accountSummary',
      options
    )
  }

  /**
   * Enable Futures for Sub-account (For Master Account)
   *
   * GET /sapi/v1/sub-account/futures/enable
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-futures-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {number} [recvWindow]
   */
  subAccountEnableFutures (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/futures/enable',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Detail on Sub-account's Futures Account (For Master Account)
   *
   * GET /sapi/v1/sub-account/futures/account
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-futures-account-for-master-account}
   *
   * @param {string} email
   * @param {number} [recvWindow]
   */
  subAccountFuturesAccount (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/account',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Summary of Sub-account's Futures Account (For Master Account)
   *
   * GET /sapi/v1/sub-account/futures/accountSummary
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-summary-of-sub-account-39-s-futures-account-for-master-account}
   *
   * @param {number} [recvWindow]
   */
  subAccountFuturesAccountSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/accountSummary',
      options
    )
  }

  /**
   * Get Futures Postion-Risk of Sub-account (For Master Account)
   *
   * GET /sapi/v1/sub-account/futures/positionRisk
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-futures-postion-risk-of-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {number} [recvWindow]
   */
  subAccountFuturesPositionRisk (email, options = {}) {
    validateParameter(email, 'email')

    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/positionRisk',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Futures Transfer for Sub-account(For Master Account)
   *
   * POST /sapi/v1/sub-account/futures/transfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#futures-transfer-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {string} asset
   * @param {number} amount
   * @param {number} type - 1: transfer from subaccount's spot account to its USDT-margined futures account
   * <br>2: transfer from subaccount's USDT-margined futures account to its spot account
   * <br>3: transfer from subaccount's spot account to its COIN-margined futures account
   * <br>4: transfer from subaccount's COIN-margined futures account to its spot account
   * @param {number} [recvWindow]
   */
  subAccountFuturesTransfer (email, asset, amount, type, options = {}) {
    validateParameter(email, 'email')
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')
    validateParameter(type, 'type')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/futures/transfer',
      Object.assign(options, {
        email,
        asset,
        amount,
        type
      })
    )
  }

  /**
   * Margin Transfer for Sub-account(For Master Account)
   *
   * POST /sapi/v1/sub-account/margin/transfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-transfer-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {string} asset
   * @param {number} amount
   * @param {number} type - 1: transfer from subaccount's spot account to margin account
   * <br>2: transfer from subaccount's margin account to its spot account
   * @param {number} [recvWindow]

   */
  subAccountMarginTransfer (email, asset, amount, type, options = {}) {
    validateParameter(email, 'email')
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')
    validateParameter(type, 'type')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/margin/transfer',
      Object.assign(options, {
        email,
        asset,
        amount,
        type
      })
    )
  }

  /**
   * Transfer to Sub-account of Same Master（For Sub-account）
   *
   * POST /sapi/v1/sub-account/transfer/subToSub
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-sub-account-of-same-master-for-sub-account}
   *
   * @param {string} toEmail
   * @param {string} asset
   * @param {number} amount
   * @param {number} [recvWindow]
   */
  subAccountTransferToSub (toEmail, asset, amount, options = {}) {
    validateParameter(toEmail, 'toEmail')
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/transfer/subToSub',
      Object.assign(options, {
        toEmail,
        asset,
        amount
      })
    )
  }

  /**
   * Transfer to Master（For Sub-account）
   *
   * POST /sapi/v1/sub-account/transfer/subToMaster
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-master-for-sub-account}
   *
   * @param {string} asset
   * @param {number} amount
   * @param {number} [recvWindow]
   */
  subAccountTransferToMaster (asset, amount, options = {}) {
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/transfer/subToMaster',
      Object.assign(options, {
        asset,
        amount
      })
    )
  }

  /**
   * Sub-account Transfer History (For Sub-account)
   *
   * GET /sapi/v1/sub-account/transfer/subUserHistory
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#sub-account-transfer-history-for-sub-account}
   *
   * @param {string} [asset] - If not sent, result of all assets will be returned
   * @param {number} [type] - 1: transfer in, 2: transfer out
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit] - Default 500
   * @param {number} [recvWindow]

   */
  subAccountTransferSubAccountHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/transfer/subUserHistory',
      options
    )
  }

  /**
   * Query Sub-account Futures Asset Transfer History(For Master Account)
   *
   * GET /sapi/v1/sub-account/futures/internalTransfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-futures-asset-transfer-history-for-master-account}
   *
   * @param {string} email - Sub-account email
   * @param {number} futuresType - 1: USDT-margined Futures，2: Coin-margined Futures
   * @param {number} [startTime] - Default return the history with in 100 days
   * @param {number} [endTime] - Default return the history with in 100 days
   * @param {number} [page] - Default value: 1
   * @param {number} [limit] - Default value: 50, Max value: 500
   * @param {number} [recvWindow]
   */
  subAccountFuturesAssetTransferHistory (email, futuresType, options = {}) {
    validateParameter(email, 'email')
    validateParameter(futuresType, 'futuresType')
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/internalTransfer',
      Object.assign(options, {
        email,
        futuresType
      })
    )
  }

  /**
   * Sub-account Futures Asset Transfer(For Master Account)
   *
   * POST /sapi/v1/sub-account/futures/internalTransfer
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#sub-account-futures-asset-transfer-for-master-account}
   *
   * @param {string} fromEmail - Sender email
   * @param {string} toEmail - Recipient email
   * @param {number} futuresType - 1: USDT-margined Futures，2: Coin-margined Futures
   * @param {number} asset
   * @param {number} amount
   * @param {number} [recvWindow]

   */
  subAccountFuturesAssetTransfer (fromEmail, toEmail, futuresType, asset, amount, options = {}) {
    validateParameter(fromEmail, 'fromEmail')
    validateParameter(toEmail, 'toEmail')
    validateParameter(futuresType, 'futuresType')
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/futures/internalTransfer',
      Object.assign(options, {
        fromEmail,
        toEmail,
        futuresType,
        asset,
        amount
      })
    )
  }

  /**
   * Query Sub-account Spot Assets Summary (For Master Account)
   *
   * GET /sapi/v1/sub-account/spotSummary
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-assets-summary-for-master-account}
   *
   * @param {string} [email] - Sub account email
   * @param {string} [page] - default 1
   * @param {number} [size] - default 10, max 20
   * @param {number} [recvWindow]
   */
  subAccountSpotSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/spotSummary',
      options
    )
  }
}

module.exports = SubAccount
