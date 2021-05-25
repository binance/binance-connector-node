const { validateParameter } = require('../helpers/validation')

/**
 * API wallet endpoints
 * @module Wallet
 * @param {*} superclass
 */
const Wallet = superclass => class extends superclass {
  /**
    * System Status (System)
    *
    * GET /sapi/v1/system/status
    * 
    * {@link https://binance-docs.github.io/apidocs/spot/en/#system-status-sapi-system}
    */
  systemStatus () {
    return this.publicRequest('GET', '/sapi/v1/system/status')
  }

  /**
    * All Coins' Information (USER_DATA)
    *
    * GET /sapi/v1/capital/config/getall
    *
    * Get information of coins (available for deposit and withdraw) for user.
    *
    * @param {number} recvWindow
    *
    */
  coinInfo (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/capital/config/getall',
      options
    )
  }

  /**
    * Daily Account Snapshot (USER_DATA)
    *
    * GET /sapi/v1/accountSnapshot
    *
    * @param {string} type
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    */
  accountSnapshot (type, options = {}) {
    validateParameter(type, 'type')

    return this.signRequest(
      'GET',
      '/sapi/v1/accountSnapshot',
      Object.assign(options, {
        type: type.toUpperCase()
      })
    )
  }

  /**
    * Disable Fast Withdraw Switch (USER_DATA)
    *
    * GET /sapi/v1/account/disableFastWithdrawSwitch
    *
    * @param {number} recvWindow
    */
  disableFastWithdraw (options = {}) {
    return this.signRequest(
      'POST',
      '/sapi/v1/account/disableFastWithdrawSwitch',
      options
    )
  }

  /**
    * Enable Fast Withdraw Switch (USER_DATA)
    *
    * GET /sapi/v1/account/enableFastWithdrawSwitch
    *
    * @param {number} recvWindow
    */
  enableFastWithdraw (options = {}) {
    return this.signRequest(
      'POST',
      '/sapi/v1/account/enableFastWithdrawSwitch',
      options
    )
  }

  /**
    * Withdraw
    *
    * POST /sapi/v1/capital/withdraw/apply
    *
    * @param {string} coin
    * @param {string} address
    * @param {number} amount
    * @param {string} withdrawOrderId
    * @param {string} network
    * @param {string} addressTag
    * @param {boolean} transactionFeeFlag
    * @param {string} name
    * @param {number} recvWindow
    */
  withdraw (coin, address, amount, options = {}) {
    validateParameter(coin, 'coin')
    validateParameter(address, 'address')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/capital/withdraw/apply',
      Object.assign(options, {
        coin: coin.toUpperCase(),
        address,
        amount
      })
    )
  }

  /**
    * Deposit History(supporting network) (USER_DATA
    *
    * GET /sapi/v1/capital/deposit/hisrec
    *
    * @param {string} coin
    * @param {number} status
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} offest
    * @param {number} limit
    * @param {number} recvWindow
    */
  depositHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/hisrec',
      options
    )
  }

  /**
    * Withdraw History(supporting network) (USER_DATA)
    *
    * GET /sapi/v1/capital/withdraw/history
    *
    * @param {string} coin
    * @param {number} status 0:Email Sent,1:Cancelled 2:Awaiting Approval 3:Rejected 4:Processing 5:Failure 6:Completed
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} offest
    * @param {number} limit
    * @param {number} recvWindow
    */
  withdrawHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/capital/withdraw/history',
      options
    )
  }

  /**
    * Deposit Address (supporting network) (USER_DATA)
    *
    * GET /sapi/v1/capital/deposit/address
    *
    * @param {string} coin
    * @param {string} network
    * @param {number} recvWindow
    */
  depositAddress (coin, options = {}) {
    validateParameter(coin, 'coin')

    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/address',
      Object.assign(options, {
        coin: coin.toUpperCase()
      })
    )
  }

  /**
    * Account Status (USER_DATA)
    *
    * GET /sapi/v1/account/status
    *
    * Fetch account status detail.
    * 
    * {@link https://binance-docs.github.io/apidocs/spot/en/#account-status-sapi-user_data}
    * 
    * @param {number} [recvWindow]
    * 
    */
  accountStatus (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/account/status',
      options
    )
  }

  /**
    * Account API Trading Status (USER_DATA)
    *
    * GET /sapi/v1/account/apiTradingStatus
    *
    * Fetch account api trading status detail.
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#account-api-trading-status-sapi-user_data}
    * 
    * @param {number} [recvWindow]
    */
  tradingStatus (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/account/apiTradingStatus',
      options
    )
  }

  /**
    * DustLog (USER_DATA)
    *
    * GET /sapi/v1/asset/dribblet
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#dustlog-sapi-user_data}
    * 
    * @param {number} [startTime]
    * @param {number} [endTime]
    * @param {number} [recvWindow]
    */
  dustLog (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/dribblet',
      options
    )
  }

  /**
    * Dust Transfer (USER_DATA)
    *
    * POST /sapi/v1/asset/dust
    *
    * Convert dust assets to BNB.
    *
    * @param {array} asset The asset being converted. For example: asset=BTC&asset=USDT
    * @param {number} recvWindow
    */
  dustTransfer (asset, options = {}) {
    return this.signRequest(
      'POST',
      '/sapi/v1/asset/dust',
      Object.assign(options, {
        asset
      })
    )
  }

  /**
    * Asset Dividend Record (USER_DATA)
    *
    * GET /sapi/v1/asset/assetDividend
    *
    * Query asset dividend record.
    *
    * @param {string} asset
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    */
  assetDevidendRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/assetDividend',
      options
    )
  }

  /**
    * Asset Detail (USER_DATA)
    *
    * GET /sapi/v1/asset/assetDetail
    *
    * Fetch details of assets supported on Binance.
    * Please get network and other deposit or withdraw details from GET /sapi/v1/capital/config/getall.
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#asset-detail-sapi-user_data}
    * 
    * @param {string} [asset]
    * @param {number} [recvWindow]
    */
  assetDetail (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/assetDetail',
      options
    )
  }

  /**
    * Trade Fee (USER_DATA)
    *
    * GET /sapi/v1/asset/tradeFee
    *
    * Fetch trade fee
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-fee-sapi-user_data} 
    * 
    * @param {string} [symbol]
    * @param {number} [recvWindow]
    * 
    */ 
  tradeFee (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/tradeFee',
      options
    )
  }
}

module.exports = Wallet
