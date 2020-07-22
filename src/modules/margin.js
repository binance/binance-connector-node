const { validateParameter } = require('../helpers/validation')

const Margin = superclass => class extends superclass {
  /*
    * Margin Account Transfer (MARGIN)
    *
    * POST /sapi/v1/margin/transfer
    *
    * @param {string} asset
    * @param {number} amount
    * @param {number} type 1: transfer from main account to margin account 2: transfer from margin account to main account
    * @param {number} recvWindow
    */
  marginTransfer (asset, amount, type, options = {}) {
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')
    validateParameter(type, 'type')

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

  /*
    * Margin Account Borrow (MARGIN)
    * Apply for a loan.
    *
    * POST /sapi/v1/margin/load
    *
    * @param {string} asset
    * @param {number} amount
    */
  marginBorrow (asset, amount, options = {}) {
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/loan',
      Object.assign(options, {
        asset: asset.toUpperCase(),
        amount
      })
    )
  }

  /*
    * Margin Account Repay(MARGIN)
    * Repay loan for margin account.
    *
    * POST /sapi/v1/margin/repay
    *
    * @param {string} asset
    * @param {string} amount
    */
  marginRepay (asset, amount, options = {}) {
    validateParameter(asset, 'asset')
    validateParameter(amount, 'amount')

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/repay',
      Object.assign(options, {
        asset: asset.toUpperCase(),
        amount
      })
    )
  }

  /*
    * Query Margin Asset (MARKET_DATA)
    *
    * GET /sapi/v1/margin/asset
    *
    * @param {string} asset
    */
  marginAsset (asset) {
    validateParameter(asset, 'asset')

    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/asset',
      { asset: asset.toUpperCase() }
    )
  }

  /*
    * Query Margin Asset (MARKET_DATA)
    *
    * GET /sapi/v1/margin/pair
    *
    * @param {string} symbol
    */
  marginPair (symbol) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/pair',
      { symbol: symbol.toUpperCase() }
    )
  }

  /*
    * Get All Margin Assets (MARKET_DATA)
    *
    * GET /sapi/v1/margin/allAssets
    *
    */
  marginAllAssets () {
    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/allAssets'
    )
  }

  /*
    * Get All Margin Pairs (MARKET_DATA)
    *
    * GET /sapi/v1/margin/allPairs
    *
    */
  marginAllPairs () {
    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/allPairs'
    )
  }

  /*
    * Get All Margin Pairs (MARKET_DATA)
    *
    * GET /sapi/v1/margin/allPairs
    *
    * @param {string} symbol
    */
  marginPairIndex (symbol) {
    validateParameter(symbol, 'symbol')

    return this.publicRequest(
      'GET',
      '/sapi/v1/margin/priceIndex',
      { symbol: symbol.toUpperCase() }
    )
  }

  /*
    * Margin Account New Order (TRADE)
    *
    * POST /sapi/v1/margin/order
    *
    * @param {string} symbol
    * @param {string} side
    * @param {string} type
    * @param {string} quantity
    * @param {string} price
    * @param {number} stopPrice
    * @param {string} newClientOrderId
    * @param {number} icebergQty
    * @param {number} newOrderRespType
    * @param {number} sideEffectType
    * @param {number} timeInForce
    * @param {number} recvWindow
    */
  newMarginOrder (symbol, side, type, quantity, options = {}) {
    validateParameter(symbol, 'symbol')
    validateParameter(side, 'side')
    validateParameter(type, 'type')
    validateParameter(quantity, 'quantity')

    return this.signRequest(
      'POST',
      '/sapi/v1/margin/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase(),
        quantity: quantity
      })
    )
  }

  /*
    * Margin Account Cancel Order (TRADE)
    *
    * DELETE /sapi/v1/margin/order
    *
    * @param {string} symbol
    * @param {number} orderId
    * @param {string} origClientOrderId
    * @param {string} newClientOrderId
    * @param {number} recvWindow
    */
  cancelMarginOrder (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'DELETE',
      '/sapi/v1/margin/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Get Transfer History (USER_DATA)
    *
    * POST /sapi/v1/margin/transfer
    *
    * @param {string} asset
    * @param {string} type ROLL_IN, ROLL_OUT
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
    */
  marginTransferHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/transfer',
      options
    )
  }

  /*
    * Query Loan Record (USER_DATA)
    *
    * GET /sapi/v1/margin/loan
    *
    * @param {string} asset
    * @param {string} txId
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
    */
  marginLoanRecord (asset, options = {}) {
    validateParameter(asset, 'asset')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/loan',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /*
    * Query Repay Record (USER_DATA)
    *
    * GET /sapi/v1/margin/repay
    *
    * @param {string} asset
    * @param {string} txId
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
    */
  marginRepayRecord (asset, options = {}) {
    validateParameter(asset, 'asset')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/repay',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /*
    * Get Interest History (USER_DATA)
    *
    * GET /sapi/v1/margin/interestHistory
    *
    * @param {string} asset
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
    */
  marginInterestHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/interestHistory',
      options
    )
  }

  /*
    * Get Force Liquidation Record (USER_DATA)
    *
    * GET /sapi/v1/margin/forceLiquidationRec
    *
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} current
    * @param {number} size
    * @param {number} recvWindow
    */
  marginForceLiquidationRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/forceLiquidationRec',
      options
    )
  }

  /*
    * Query Margin Account Details (USER_DATA)
    *
    * GET /sapi/v1/margin/account
    *
    * @param {number} recvWindow
    */
  marginAccount (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/account',
      options
    )
  }

  /*
    * Query Margin Account's Order (USER_DATA)
    *
    * GET /sapi/v1/margin/order
    *
    * @param {string} symbol
    * @param {number} orderId
    * @param {string} origClientOrderId
    * @param {number} recvWindow
    */
  marginOrder (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Query Margin Account's Open Order (USER_DATA)
    *
    * GET /sapi/v1/margin/openOrders
    *
    * @param {string} symbol
    * @param {number} recvWindow
    */
  marginOpenOrders (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/margin/openOrders',
      options
    )
  }

  /*
    * Query Margin Account's All Order (USER_DATA)
    *
    * GET /sapi/v1/margin/allOrders
    *
    * @param {string} symbol
    * @param {number} orderId
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    */
  marginAllOrders (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/allOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Query Margin Account's Trade List (USER_DATA)
    *
    * GET /sapi/v1/margin/myTrades
    *
    * @param {string} symbol
    * @param {number} fromId
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    */
  marginMyTrades (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/myTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Query Max Borrow (USER_DATA)
    *
    * GET /sapi/v1/margin/maxBorrowable
    *
    * @param {string} asset
    * @param {number} recvWindow
    */
  marginMaxBorrowable (asset, options = {}) {
    validateParameter(asset, 'asset')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/maxBorrowable',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }

  /*
    * Query Max Transfer-Out Amount (USER_DATA)
    *
    * GET /sapi/v1/margin/maxTransferable
    *
    * @param {string} asset
    * @param {number} recvWindow
    */
  marginMaxTransferable (asset, options = {}) {
    validateParameter(asset, 'asset')

    return this.signRequest(
      'GET',
      '/sapi/v1/margin/maxTransferable',
      Object.assign(options, {
        asset: asset.toUpperCase()
      })
    )
  }
}

module.exports = Margin
