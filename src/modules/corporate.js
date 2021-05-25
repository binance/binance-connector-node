const { validateParameter } = require('../helpers/validation')

/**
 * API corporate endpoints
 * @module Corporate
 * @param {*} superclass
 */
 const Corporate = superclass => class extends superclass {

  /**
    * Query Sub-account List(For Master Account)
    *
    * GET /sapi/v1/sub-account/list
    *
    * @param {string} email
    * @param {string} isFreeze
    * @param {number} page
    * @param {number} limit
    * @param {number} recvWindow
    * @link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-list-sapi-for-master-account
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
   * @param {string} fromEmail
   * @param {string} toEmail
   * @param {number} startTime
   * @param {number} endTime
   * @param {number} page
   * @param {number} limit
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-asset-transfer-history-sapi-for-master-account
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
    * @param {string} email
    * @param {number} recvWindow
    * @link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-assets-for-master-account
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
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account
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
   * @param {string} email
   * @param {string} coin
   * @param {number} status
   * @param {number} startTime
   * @param {number} endTime
   * @param {number} limit
   * @param {number} offset
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account
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
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-39-s-status-on-margin-futures-for-master-account
   */
  subAccountStatus (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/status',
      options
    )
  }

  /**
   * Get Sub-account's Status on Margin/Futures(For Master Account)
   *
   * GET /sapi/v1/sub-account/status
   *
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#enable-margin-for-sub-account-for-master-account
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
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account
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
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account
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
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#enable-futures-for-sub-account-for-master-account
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
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-futures-account-for-master-account
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
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-summary-of-sub-account-39-s-futures-account-for-master-account
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
   * @param {string} email
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#get-futures-postion-risk-of-sub-account-for-master-account
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
   * @param {string} email
   * @param {string} asset
   * @param {number} amount
   * @param {number} type [1: transfer from subaccount's spot account to its USDT-margined futures account 2: transfer from subaccount's USDT-margined futures account to its spot account 3: transfer from subaccount's spot account to its COIN-margined futures account 4:transfer from subaccount's COIN-margined futures account to its spot account]
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#futures-transfer-for-sub-account-for-master-account
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
   * @param {string} email
   * @param {string} asset
   * @param {number} amount
   * @param {number} type [1: transfer from subaccount's spot account to margin account 2: transfer from subaccount's margin account to its spot account]
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#futures-transfer-for-sub-account-for-master-account
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
   * POST /sapi/v1/sub-account/margin/transfer
   *
   * @param {string} toEmail
   * @param {string} asset
   * @param {number} amount
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-sub-account-of-same-master-for-sub-account
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
   * @param {string} asset
   * @param {number} amount
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-master-for-sub-account
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
   * @param {string} asset
   * @param {number} type [1: transfer in, 2: transfer out]
   * @param {number} startTime
   * @param {number} endTime
   * @param {number} limit
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#sub-account-transfer-history-for-sub-account
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
   * @param {string} email
   * @param {number} futuresType [1:USDT-maringed Futues，2: Coin-margined Futures]
   * @param {number} startTime
   * @param {number} endTime
   * @param {number} page
   * @param {number} limit
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-futures-asset-transfer-history-for-master-account
   */
  subAccountFuturesAssetTransferHistory (email, futuresType, options = {}) {
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
   * @param {string} fromEmail
   * @param {string} toEmail
   * @param {number} futuresType [1:USDT-maringed Futues，2: Coin-margined Futures]
   * @param {number} asset
   * @param {number} amount
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#sub-account-futures-asset-transfer-for-master-account
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
   * @param {string} email
   * @param {string} page
   * @param {number} size
   * @param {number} recvWindow
   * @link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-assets-for-master-account
   */
  subAccountSpotSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/spotSummary',
      options
    )
  }
}

module.exports = Corporate
