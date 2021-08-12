const { validateRequiredParameters } = require('../helpers/validation')

/**
 * API margin endpoints
 * @module Margin
 * @param {*} superclass
 */
const Margin = superclass => class extends superclass {
  /**
   * Cross Margin Account Transfer (MARGIN)<br>
   *
   * POST /sapi/v1/margin/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-margin-account-transfer-margin}
   *
   * @param {string} asset
   * @param {number} amount
   * @param {number} type - 1: transfer from main account to margin account
   *    <br>2: transfer from margin account to main account
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginTransfer (asset, amount, type, options = {}) {
    validateRequiredParameters({ asset, amount, type })

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/transfer',
      Object.assign(options, {
        asset: asset.toUpperCase(),
        amount,
        type
      })
    )
  }

  /**
   * Margin Account Borrow (MARGIN)<br>
   *
   * POST /sapi/v1/margin/load<br>
   *
   * Apply for a loan.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-borrow-margin}
   *
   * @param {string} asset
   * @param {number} amount
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE
   * @param {string} [options.symbol] - isolated symbol
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginBorrow (asset, amount, options = {}) {
    validateRequiredParameters({ asset, amount })

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/loan',
      Object.assign(options, {
        asset: asset.toUpperCase(),
        amount
      })
    )
  }

  /**
   * Margin Account Repay(MARGIN)<br>
   *
   * POST /sapi/v1/margin/repay<br>
   *
   * Repay loan for margin account.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-repay-margin}
   *
   * @param {string} asset
   * @param {string} amount
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE
   * @param {string} [options.symbol]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginRepay (asset, amount, options = {}) {
    validateRequiredParameters({ asset, amount })

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/repay',
      Object.assign(options, {
        asset: asset.toUpperCase(),
        amount
      })
    )
  }

  /**
   * Query Margin Asset (MARKET_DATA)<br>
   *
   * GET /sapi/v1/margin/asset<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-asset-market_data}
   *
   * @param {string} asset
   */
  marginAsset (asset) {
    validateRequiredParameters({ asset })

    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/asset',
      { asset: asset.toUpperCase() }
    )
  }

  /**
   * Query Cross Margin Pair (MARKET_DATA)<br>
   *
   * GET /sapi/v1/margin/pair<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-pair-market_data}
   *
   * @param {string} symbol
   */
  marginPair (symbol) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/pair',
      { symbol: symbol.toUpperCase() }
    )
  }

  /**
   * Get All Margin Assets (MARKET_DATA)<br>
   *
   * GET /sapi/v1/margin/allAssets<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-all-margin-assets-market_data}
   */
  marginAllAssets () {
    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/allAssets'
    )
  }

  /**
   * Get All Cross Margin Pairs (MARKET_DATA)<br>
   *
   * GET /sapi/v1/margin/allPairs<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-all-cross-margin-pairs-market_data}
   */
  marginAllPairs () {
    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/allPairs'
    )
  }

  /**
   * Query Margin PriceIndex (MARKET_DATA)<br>
   *
   * GET /sapi/v1/margin/priceIndex<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-priceindex-market_data}
   *
   * @param {string} symbol
   */
  marginPairIndex (symbol) {
    validateRequiredParameters({ symbol })

    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/priceIndex',
      { symbol: symbol.toUpperCase() }
    )
  }

  /**
   * Margin Account New Order (TRADE)<br>
   *
   * POST /sapi/v1/margin/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side - BUY or SELL
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {number} [options.price]
   * @param {number} [options.stopPrice] - Used with STOP_LOSS, STOP_LOSS_LIMIT,
   *    TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
   * @param {string} [options.newClientOrderId] - A unique id among open orders.
   *    Automatically generated if not sent.
   * @param {number} [options.icebergQty] - Used with LIMIT, STOP_LOSS_LIMIT,
   *    and TAKE_PROFIT_LIMIT to create an iceberg order.
   * @param {string} [options.newOrderRespType] - Set the response JSON. ACK, RESULT, or FULL;
   *    MARKET and LIMIT order types default to FULL, all other orders default to ACK.
   * @param {string} [options.sideEffectType] - NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY;
   *    default NO_SIDE_EFFECT.
   * @param {string} [options.timeInForce] - GTC, IOC, FOK
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  newMarginOrder (symbol, side, type, options = {}) {
    validateRequiredParameters({ symbol, side, type })

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase()
      })
    )
  }

  /**
   * Margin Account Cancel Order (TRADE)<br>
   *
   * DELETE /sapi/v1/margin/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-cancel-order-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {string} [options.newClientOrderId] - Used to uniquely identify this cancel.
   *    Automatically generated by default.
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelMarginOrder (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'DELETE',
      '/sapi/v1/margin/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Margin Account Cancel all Open Orders on a Symbol (TRADE)<br>
   *
   * DELETE /sapi/v1/margin/openOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-cancel-all-open-orders-on-a-symbol-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelAllOpenMarginOrder (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'DELETE',
      '/sapi/v1/margin/openOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Get Cross Margin Transfer History (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-cross-margin-transfer-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {string} [options.type] - ROLL_IN, ROLL_OUT
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginTransferHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/transfer',
      options
    )
  }

  /**
   * Query Loan Record (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/loan<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-loan-record-user_data}
   *
   * @param {string} asset
   * @param {object} [options]
   * @param {string} [options.isolatedSymbol]
   * @param {number} [options.txId] - the tranId in POST /sapi/v1/margin/loan
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginLoanRecord (asset, options = {}) {
    validateRequiredParameters({ asset })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/loan',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /**
   * Query Repay Record (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/repay<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-repay-record-user_data}
   *
   * @param {string} asset
   * @param {object} [options]
   * @param {string} [options.isolatedSymbol]
   * @param {number} [options.txId] - return of /sapi/v1/margin/repay
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginRepayRecord (asset, options = {}) {
    validateRequiredParameters({ asset })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/repay',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /**
   * Get Interest History (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/interestHistory<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-interest-history-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {string} [options.isolatedSymbol]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginInterestHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/interestHistory',
      options
    )
  }

  /**
   * Get Force Liquidation Record (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/forceLiquidationRec<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-force-liquidation-record-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {string} [options.isolatedSymbol]
   * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginForceLiquidationRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/forceLiquidationRec',
      options
    )
  }

  /**
   * Query Cross Margin Account Details (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-account-details-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginAccount (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/account',
      options
    )
  }

  /**
   * Query Margin Account's Order (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-order-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginOrder (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Query Margin Account's Open Order (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/openOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-open-orders-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginOpenOrders (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/openOrders',
      options
    )
  }

  /**
   * Query Margin Account's All Order (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/allOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-all-orders-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
   * @param {number} [options.orderId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - Default 500; max 500.
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginAllOrders (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/allOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Query Margin Account's Trade List (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/myTrades<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-trade-list-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.isIsolated] - Default 500; max 500.
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.fromId] - TradeId to fetch from. Default gets most recent trades.
   * @param {number} [options.limit] - Default 500; max 1000.
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginMyTrades (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/myTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Query Max Borrow (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/maxBorrowable<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-max-borrow-user_data}
   *
   * @param {string} asset
   * @param {object} [options]
   * @param {string} [options.isolatedSymbol]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginMaxBorrowable (asset, options = {}) {
    validateRequiredParameters({ asset })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/maxBorrowable',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /**
   * Query Max Transfer-Out Amount (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/maxTransferable<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-max-transfer-out-amount-user_data}
   *
   * @param {string} asset
   * @param {object} [options]
   * @param {string} [options.isolatedSymbol]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginMaxTransferable (asset, options = {}) {
    validateRequiredParameters({ asset })

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/maxTransferable',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /**
   * Query Margin Interest Rate History (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/interestRateHistory<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-interest-rate-history-user_data}
   *
   * @param {string} asset
   * @param {object} [options]
   * @param {number} [options.vipLevel]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  marginInterestRateHistory (asset, options = {}) {
    validateRequiredParameters({ asset })
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/interestRateHistory',
      Object.assign(options, { asset })
    )
  }

  /**
   * Isolated Margin Account Transfer (MARGIN)<br>
   *
   * POST /sapi/v1/margin/isolated/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#isolated-margin-account-transfer-margin}
   *
   * @param {string} asset - asset, such as BTC
   * @param {string} symbol
   * @param {string} transFrom - "SPOT", "ISOLATED_MARGIN"
   * @param {string} transTo - "SPOT", "ISOLATED_MARGIN"
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - No more than 60000
   */
  isolatedMarginTransfer (asset, symbol, transFrom, transTo, amount, options = {}) {
    validateRequiredParameters({ asset, symbol, transFrom, transTo, amount })
    return this.signRequest(
      'POST',
      '/sapi/v1/margin/isolated/transfer',
      Object.assign(options, { asset, symbol, transFrom, transTo, amount })
    )
  }

  /**
   * Get Isolated Margin Transfer History (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/isolated/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-isolated-margin-transfer-history-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.asset]
   * @param {string} [options.transFrom] - "SPOT", "ISOLATED_MARGIN"
   * @param {string} [options.transTo] - "SPOT", "ISOLATED_MARGIN"
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.current] - Current page, default 1
   * @param {number} [options.size] - Default 10, max 100
   * @param {number} [options.recvWindow] - No more than 60000
   */
  isolatedMarginTransferHistory (symbol, options = {}) {
    validateRequiredParameters({ symbol })
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/isolated/transfer',
      Object.assign(options, { symbol })
    )
  }

  /**
   * Query Isolated Margin Account Info (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/isolated/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-account-info-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.symbols] - Max 5 symbols can be sent; separated by ",". e.g. "BTCUSDT,BNBUSDT,ADAUSDT"
   * @param {number} [options.recvWindow] - No more than 60000
   */
  isolatedMarginAccountInfo (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/isolated/account',
      options
    )
  }

  /**
   * Query Isolated Margin Symbol (USER_DATA)<br>
   *
   * GET /sapi/v1/margin/isolated/pair<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-symbol-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.recvWindow] - No more than 60000
   */
  isolatedMarginSymbol (symbol, options = {}) {
    validateRequiredParameters({ symbol })
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/isolated/pair',
      Object.assign(options, { symbol })
    )
  }

  /**
   * Get All Isolated Margin Symbol(USER_DATA)<br>
   *
   * GET /sapi/v1/margin/isolated/allPairs<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-all-isolated-margin-symbol-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - No more than 60000
   */
  isolatedMarginAllSymbols (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/isolated/allPairs',
      options
    )
  }
}

module.exports = Margin
