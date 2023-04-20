'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API trade endpoints
 * @module Trade
 * @param {*} superclass
 */
const Trade = superclass => class extends superclass {
  /**
   * Test New Order (TRADE)<br>
   *
   * POST /api/v3/order/test<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#test-new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.timeInForce]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {number} [options.price]
   * @param {string} [options.newClientOrderId] - A unique id among open orders. Automatically generated if not sent.
   * @param {number} [options.strategyId]
   * @param {number} [options.strategytype] - The value cannot be less than 1000000.
   * @param {number} [options.stopPrice] - Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
   * @param {number} [options.trailingDelta] - Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
   * @param {number} [options.icebergQty] - Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
   * @param {string} [options.newOrderRespType] - Set the response JSON. ACK, RESULT, or FULL;
   *    MARKET and LIMIT order types default to FULL, all other orders default to ACK.
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  newOrderTest (symbol, side, type, options = {}) {
    validateRequiredParameters({ symbol, side, type })

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

  /**
   * New Order (TRADE)<br>
   *
   * POST /api/v3/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.timeInForce]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {number} [options.price]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.strategyId]
   * @param {number} [options.strategytype] - The value cannot be less than 1000000.
   * @param {number} [options.stopPrice]
   * @param {number} [options.trailingDelta]
   * @param {number} [options.icebergQty]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  newOrder (symbol, side, type, options = {}) {
    validateRequiredParameters({ symbol, side, type })

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

  /**
   * Cancel Order (TRADE)<br>
   *
   * DELETE /api/v3/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelOrder (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'DELETE',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Cancel all Open Orders on a Symbol (TRADE)<br>
   *
   * DELETE /api/v3/openOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade}
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelOpenOrders (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'DELETE',
      '/api/v3/openOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Query Order (USER_DATA)<br>
   *
   * GET /api/v3/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getOrder (symbol, options = {}) {
    validateRequiredParameters({ symbol })
    return this.signRequest(
      'GET',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Cancel an Existing Order and Send a New Order (TRADE)<br>
   *
   * Cancels an existing order and places a new order on the same symbol.
   *
   * Filters are evaluated before the cancel order is placed.
   *
   * If the new order placement is successfully sent to the engine, the order count will increase by 1.
   *
   * POST /api/v3/order/cancelReplace<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-an-existing-order-and-send-a-new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {string} type
   * @param {string} cancelReplaceMode
   * @param {object} [options]
   * @param {string} [options.timeInForce]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {number} [options.price]
   * @param {string} [options.cancelNewClientOrderId]
   * @param {string} [options.cancelOrigClientOrderId]
   * @param {number} [options.cancelOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.strategyId]
   * @param {number} [options.strategytype] - The value cannot be less than 1000000.
   * @param {number} [options.stopPrice]
   * @param {number} [options.trailingDelta]
   * @param {number} [options.icebergQty]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelAndReplace (symbol, side, type, cancelReplaceMode, options = {}) {
    validateRequiredParameters({ symbol, side, type, cancelReplaceMode })

    return this.signRequest(
      'POST',
      '/api/v3/order/cancelReplace',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase(),
        cancelReplaceMode
      })
    )
  }

  /**
   * Current Open Orders (USER_DATA)<br>
   *
   * GET /api/v3/openOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  openOrders (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/openOrders',
      options
    )
  }

  /**
   * All Orders (USER_DATA)<br>
   *
   * GET /api/v3/allOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {string} [options.recvWindow] - The value cannot be greater than 60000
   */
  allOrders (symbol, options = {}) {
    validateRequiredParameters({ symbol })
    return this.signRequest(
      'GET',
      '/api/v3/allOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * New OCO (TRADE)<br>
   *
   * POST /api/v3/order/oco<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#new-oco-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {number} quantity
   * @param {number} price
   * @param {number} stopPrice
   * @param {object} [options]
   * @param {string} [options.listClientOrderId]
   * @param {string} [options.limitClientOrderId]
   * @param {number} [options.limitStrategyId]
   * @param {number} [options.limitStrategytype] - The value cannot be less than 1000000.
   * @param {number} [options.limitIcebergQty]
   * @param {number} [options.trailingDelta]
   * @param {string} [options.stopClientOrderId]
   * @param {number} [options.stopStrategyId]
   * @param {number} [options.stopStrategytype] - The value cannot be less than 1000000.
   * @param {number} [options.stopLimitPrice]
   * @param {number} [options.stopIcebergQty]
   * @param {string} [options.stopLimitTimeInForce]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  newOCOOrder (symbol, side, quantity, price, stopPrice, options = {}) {
    validateRequiredParameters({ symbol, side, quantity, price, stopPrice })

    return this.signRequest(
      'POST',
      '/api/v3/order/oco',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        quantity,
        price,
        stopPrice
      })
    )
  }

  /**
   * Cancel OCO (TRADE)<br>
   *
   * DELETE /api/v3/orderList<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-oco-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderListId]
   * @param {string} [options.listClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelOCOOrder (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'DELETE',
      '/api/v3/orderList',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Query OCO (USER_DATA)<br>
   *
   * GET /api/v3/orderList<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-oco-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.orderListId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getOCOOrder (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/orderList',
      options
    )
  }

  /**
   * Query all OCO (USER_DATA)<br>
   *
   * GET /api/v3/allOrderList<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-all-oco-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.fromId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getOCOOrders (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/allOrderList',
      options
    )
  }

  /**
   * Query Open OCO (USER_DATA)<br>
   *
   * GET /api/v3/openOrderList<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-open-oco-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getOpenOCOOrders (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/openOrderList',
      options
    )
  }

  /**
   * Account Information (USER_DATA)<br>
   *
   * GET /api/v3/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  account (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/account',
      options
    )
  }

  /**
   * Account Trade List (USER_DATA)<br>
   *
   * GET /api/v3/myTrades<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId] - This can only be used in combination with symbol.
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.fromId]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  myTrades (symbol, options = {}) {
    validateRequiredParameters({ symbol })

    return this.signRequest(
      'GET',
      '/api/v3/myTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /**
   * Query Current Order Count Usage (TRADE)<br>
   *
   * GET /api/v3/rateLimit/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-current-order-count-usage-trade}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  orderCount (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/rateLimit/order',
      options
    )
  }
}

module.exports = Trade
