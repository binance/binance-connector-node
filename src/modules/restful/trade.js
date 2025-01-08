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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#test-new-order-trade}
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
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-trade}
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
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-order-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-all-open-orders-on-a-symbol-trade}
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-order-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-an-existing-order-and-send-a-new-order-trade}
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
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#current-open-orders-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#all-orders-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {string} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * New Order List - OCO (TRADE)<br>
   *
   * POST /api/v3/orderList/oco<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#new-order-list---oco-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {number} quantity
   * @param {string} aboveType
   * @param {string} belowType
   * @param {object} [options]
   * @param {string} [options.listClientOrderId]
   * @param {string} [options.aboveClientOrderId]
   * @param {number} [options.aboveIcebergQty]
   * @param {number} [options.abovePrice]
   * @param {number} [options.aboveStopPrice]
   * @param {number} [options.aboveTrailingDelta]
   * @param {number} [options.aboveTimeInForce]
   * @param {number} [options.aboveStrategyId]
   * @param {number} [options.aboveStrategyType]
   * @param {string} [options.belowClientOrderId]
   * @param {number} [options.belowIcebergQty]
   * @param {number} [options.belowPrice]
   * @param {number} [options.belowStopPrice]
   * @param {number} [options.belowTrailingDelta]
   * @param {string} [options.belowTimeInForce]
   * @param {number} [options.belowStrategyId]
   * @param {number} [options.belowStrategyType]
   * @param {string} [options.newOrderRespType]
   * @param {string} [options.selfTradePreventionMode]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
   */
  newOCOOrder (symbol, side, quantity, aboveType, belowType, options = {}) {
    validateRequiredParameters({ symbol, side, quantity, aboveType, belowType })

    return this.signRequest(
      'POST',
      '/api/v3/orderList/oco',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        quantity,
        aboveType,
        belowType
      })
    )
  }

  /**
   * Cancel OCO (TRADE)<br>
   *
   * DELETE /api/v3/orderList<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#cancel-order-list-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderListId]
   * @param {string} [options.listClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-order-list-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.orderListId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-all-order-lists-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.fromId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints#query-open-order-lists-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints#account-information-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints#account-trade-list-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId] - This can only be used in combination with symbol.
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.fromId]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/rest-api/account-endpoints#query-unfilled-order-count-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   * @param {string} [options.timeUnit] - The preferred time unit for time and timestamp fields. It can be either 'MILLISECOND' or 'MICROSECOND'
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
