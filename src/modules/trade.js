const { validateParameter } = require('../helpers/validation')

const Trade = superclass => class extends superclass {
  /*
    * Test New Order (TRADE)
    *
    * POST /api/v3/order/test
    *
    * @param {string} symbol
    * @param {string} side
    * @param {string} type
    * @param {string} timeInForce
    * @param {number} quantity
    * @param {number} quoteOrderQty
    * @param {number} price
    * @param {string} newClientOrderId
    * @param {number} stopPrice
    * @param {number} icebergQty
    * @param {string} newOrderRespType
    * @param {number} recvWindow
    */
  newOrderTest (symbol, side, type, options = {}) {
    validateParameter(symbol, 'symbol')
    validateParameter(side, 'side')
    validateParameter(type, 'type')

    return this.signRequest(
      'POST',
      '/api/v3/order/test',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase()
      })
    )
  }

  /*
    * New Order (TRADE)
    *
    * POST /api/v3/order
    *
    * @param {string} symbol
    * @param {string} side
    * @param {string} type
    * @param {string} timeInForce
    * @param {number} quantity
    * @param {number} quoteOrderQty
    * @param {number} price
    * @param {string} newClientOrderId
    * @param {number} stopPrice
    * @param {number} icebergQty
    * @param {string} newOrderRespType
    * @param {number} recvWindow
    */
  newOrder (symbol, side, type, options = {}) {
    validateParameter(symbol, 'symbol')
    validateParameter(side, 'side')
    validateParameter(type, 'type')

    return this.signRequest(
      'POST',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase()
      })
    )
  }

  /*
    * Cancel Order (TRADE)
    *
    * DELETE /api/v3/order
    *
    * @param {string} symbol
    * @param {number} orderId
    * @param {string} origClientOrderId
    * @param {string} newClientOrderId
    * @param {number} recvWindow
     */
  cancelOrder (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'DELETE',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Account Information (USER_DATA)
    *
    * GET /api/v3/account
    *
    * @param {number} recvWindow
    */
  account (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/account',
      options
    )
  }

  /*
    * Account Trade List (USER_DATA)
    *
    * GET /api/v3/myTrades
    *
    * @param {string} symbol
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} fromId
    * @param {number} limit
    * @param {number} recvWindow
    */
  myTrades (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'GET',
      '/api/v3/myTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }
}

module.exports = Trade
