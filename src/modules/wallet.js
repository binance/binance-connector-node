const { validateParameter } = require('../helpers/validation')

/**
 * API wallet endpoints
 * @module Wallet
 * @param {*} superclass
 */
const Wallet = superclass => class extends superclass {
  /**
   * System Status (System)<br>
   *
   * GET /sapi/v1/system/status<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#system-status-sapi-system}
   */
  systemStatus () {
    return this.publicRequest('GET', '/sapi/v1/system/status')
  }

  /**
   * All Coins' Information (USER_DATA)<br>
   *
   * GET /sapi/v1/capital/config/getall<br>
   *
   * Get information of coins (available for deposit and withdraw) for user.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data}
   *
   * @param {number} [recvWindow] - The value cannot be greater than 60000
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
   * Daily Account Snapshot (USER_DATA)<br>
   *
   * GET /sapi/v1/accountSnapshot<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#daily-account-snapshot-user_data}
   *
   * @param {string} type - "SPOT", "MARGIN", "FUTURES"
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit] - min 5, max 30, default 5
   * @param {number} [recvWindow] - The value cannot be greater than 60000
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
   * Disable Fast Withdraw Switch (USER_DATA)<br>
   *
   * GET /sapi/v1/account/disableFastWithdrawSwitch<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#disable-fast-withdraw-switch-user_data}
   *
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  disableFastWithdraw (options = {}) {
    return this.signRequest(
      'POST',
      '/sapi/v1/account/disableFastWithdrawSwitch',
      options
    )
  }

  /**
   * Enable Fast Withdraw Switch (USER_DATA)<br>
   *
   * GET /sapi/v1/account/enableFastWithdrawSwitch<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-fast-withdraw-switch-user_data}
   *
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  enableFastWithdraw (options = {}) {
    return this.signRequest(
      'POST',
      '/sapi/v1/account/enableFastWithdrawSwitch',
      options
    )
  }

  /**
   * Withdraw<br>
   *
   * POST /sapi/v1/capital/withdraw/apply<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#withdraw-sapi}
   *
   * @param {string} coin
   * @param {string} address
   * @param {number} amount
   * @param {string} [withdrawOrderId] - client id for withdraw
   * @param {string} [network]
   * @param {string} [addressTag] - Secondary address identifier for coins like XRP,XMR etc.
   * @param {boolean} [transactionFeeFlag] - When making internal transfer, true for returning the fee to the destination account;
   * <br>false for returning the fee back to the departure account. Default false.
   * @param {string} [name] - Description of the address. Space in name should be encoded into %20.
   * @param {number} [recvWindow] - The value cannot be greater than 60000
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
   * Deposit History(supporting network) (USER_DATA)<br>
   *
   * GET /sapi/v1/capital/deposit/hisrec<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#deposit-history-supporting-network-user_data}
   *
   * @param {string} [coin]
   * @param {number} [status] - 0:pending, 6:credited but cannot withdraw, 1:success
   * @param {number} [startTime] - Default: 90 days from current timestamp
   * @param {number} [endTime] - Default: present timestamp
   * @param {number} [offest]
   * @param {number} [limit]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  depositHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/hisrec',
      options
    )
  }

  /**
   * Withdraw History(supporting network) (USER_DATA)<br>
   *
   * GET /sapi/v1/capital/withdraw/history<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#withdraw-history-supporting-network-user_data}
   *
   * @param {string} [coin]
   * @param {number} [status] - 0:Email Sent 1:Cancelled 2:Awaiting Approval 3:Rejected 4:Processing 5:Failure 6:Completed
   * @param {number} [startTime] - Default: 90 days from current timestamp
   * @param {number} [endTime] - Default: present timestamp
   * @param {number} [offest]
   * @param {number} [limit]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  withdrawHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/capital/withdraw/history',
      options
    )
  }

  /**
   * Deposit Address (supporting network) (USER_DATA)<br>
   *
   * GET /sapi/v1/capital/deposit/address<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#deposit-address-supporting-network-user_data}
   *
   * @param {string} coin
   * @param {string} [network]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
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
   * Account Status (USER_DATA)<br>
   *
   * GET /sapi/v1/account/status<br>
   *
   * Fetch account status detail.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#account-status-sapi-user_data}
   *
   * @param {number} [recvWindow] - The value cannot be greater than 60000
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
   * Account API Trading Status (USER_DATA)<br>
   *
   * GET /sapi/v1/account/apiTradingStatus<br>
   *
   * Fetch account api trading status detail.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#account-api-trading-status-sapi-user_data}
   *
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  tradingStatus (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/account/apiTradingStatus',
      options
    )
  }

  /**
   * DustLog (USER_DATA)<br>
   *
   * GET /sapi/v1/asset/dribblet<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#dustlog-sapi-user_data}
   *
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  dustLog (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/dribblet',
      options
    )
  }

  /**
   * Dust Transfer (USER_DATA)<br>
   *
   * POST /sapi/v1/asset/dust<br>
   *
   * Convert dust assets to BNB.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#dust-transfer-user_data}
   *
   * @param {array} asset - The asset being converted. For example: asset=BTC&asset=USDT
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  dustTransfer (asset, options = {}) {
    validateParameter(asset, 'asset')
    return this.signRequest(
      'POST',
      '/sapi/v1/asset/dust',
      Object.assign(options, {
        asset
      })
    )
  }

  /**
   * Asset Dividend Record (USER_DATA)<br>
   *
   * GET /sapi/v1/asset/assetDividend<br>
   *
   * Query asset dividend record.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#asset-dividend-record-user_data}
   *
   * @param {string} [asset]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit] - Default 20, max 500
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  assetDevidendRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/assetDividend',
      options
    )
  }

  /**
   * Asset Detail (USER_DATA)<br>
   *
   * GET /sapi/v1/asset/assetDetail<br>
   *
   * Fetch details of assets supported on Binance.<br>
   * Please get network and other deposit or withdraw details from GET /sapi/v1/capital/config/getall.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#asset-detail-sapi-user_data}
   *
   * @param {string} [asset]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  assetDetail (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/assetDetail',
      options
    )
  }

  /**
   * Trade Fee (USER_DATA)<br>
   *
   * GET /sapi/v1/asset/tradeFee<br>
   *
   * Fetch trade fee<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-fee-sapi-user_data}
   *
   * @param {string} [symbol]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   *
   */
  tradeFee (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/asset/tradeFee',
      options
    )
  }

  /**
   * User Universal Transfer<br>
   *
   * POST /sapi/v1/asset/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#user-universal-transfer}
   *
   * @param {string} type
   * @param {string} asset
   * @param {number} amount
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  userUniversalTransfer (type, asset, amount, options = {}) {
    validateParameter(type, 'type')
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/asset/transfer',
      Object.assign(options, {
        type,
        asset,
        amount
      })
    )
  }

  /**
   * Query User Universal Transfer History<br>
   *
   * GET /sapi/v1/asset/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-user-universal-transfer-history}
   *
   * @param {string} type
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [current]
   * @param {number} [size]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  userUniversalTransferHistory (type, options = {}) {
    validateParameter(type, 'type')

    return this.signRequest(
      'GET',
      '/sapi/v1/asset/transfer',
      Object.assign(options, { type })
    )
  }
}

module.exports = Wallet
