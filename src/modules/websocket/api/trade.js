'use strict'

/**
 * Websocket API Trading endpoints
 * @module Websocket
 * @param {*} superclass
 */
const Trade = superclass => class extends superclass {
  /**
   * Place new order< br>
   *
   * Send in a new order.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#place-new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.timeInForce]
   * @param {number} [options.price]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {string} [options.newClientOrderId]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.stopPrice]
   * @param {number} [options.trailingDelta]
   * @param {number} [options.icebergQty]
   * @param {number} [options.strategyId]
   * @param {number} [options.strategyType]
   * @param {string} [options.selfTradePreventionMode]
   * @param {number} [options.recvWindow]
   *
   */
  newOrder (symbol, side, type, options = {}) {
    this.sendSignatureMessage('order.place', {
      symbol,
      side,
      type,
      ...options
    })
  }

  /**
   * Test new order< br>
   *
   * Test a new order.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#test-new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.timeInForce]
   * @param {number} [options.price]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {string} [options.newClientOrderId]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.stopPrice]
   * @param {number} [options.trailingDelta]
   * @param {number} [options.icebergQty]
   * @param {number} [options.strategyId]
   * @param {number} [options.strategyType]
   * @param {string} [options.selfTradePreventionMode]
   * @param {number} [options.recvWindow]
   *
   */
  testNewOrder (symbol, side, type, options = {}) {
    this.sendSignatureMessage('order.test', {
      symbol,
      side,
      type,
      ...options
    })
  }

  /**
   * Query order< br>
   *
   * Check execution status of an order.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#query-order-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow]
   *
   */
  getOrder (symbol, options = {}) {
    this.sendSignatureMessage('order.status', {
      symbol,
      ...options
    })
  }

  /**
   * Cancel order< br>
   *
   * Cancel an active order.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#cancel-order-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.recvWindow]
   *
   */
  cancelOrder (symbol, options = {}) {
    this.sendSignatureMessage('order.cancel', {
      symbol,
      ...options
    })
  }

  /**
   * Cancel and replace order< br>
   *
   * Cancel an existing order and immediately place a new order instead of the canceled one.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#cancel-and-replace-order-trade}
   *
   * @param {string} symbol
   * @param {string} cancelReplaceMode
   * @param {string} side
   * @param {string} type
   * @param {object} [options]
   * @param {number} [options.cancelOrderId]
   * @param {string} [options.cancelOrigClientOrderId]
   * @param {string} [options.cancelNewClientOrderId]
   * @param {string} [options.timeInForce]
   * @param {number} [options.price]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {string} [options.newClientOrderId]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.stopPrice]
   * @param {number} [options.trailingDelta]
   * @param {number} [options.icebergQty]
   * @param {number} [options.strategyId]
   * @param {string} [options.strategyType]
   * @param {string} [options.selfTradePreventionMode]
   * @param {string} [options.cancelRestrictions]
   * @param {number} [options.recvWindow]
   *
   */
  cancelReplaceOrder (symbol, cancelReplaceMode, side, type, options = {}) {
    this.sendSignatureMessage('order.cancelReplace', {
      symbol,
      cancelReplaceMode,
      side,
      type,
      ...options
    })
  }

  /**
   * Current open orders< br>
   *
   * Query execution status of all open orders.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#current-open-orders-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  openOrders (symbol, options = {}) {
    this.sendSignatureMessage('openOrders.status', {
      symbol,
      ...options
    })
  }

  /**
   * Cancel open orders< br>
   *
   * Cancel all open orders on a symbol, including OCO orders.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#cancel-open-orders-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  cancelOpenOrders (symbol, options = {}) {
    this.sendSignatureMessage('openOrders.cancelAll', {
      symbol,
      ...options
    })
  }

  /**
   * Place new OCO< br>
   *
   * Send in a new OCO order.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#place-new-oco-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {number} price
   * @param {number} quantity
   * @param {object} [options]
   * @param {string} [options.listClientOrderId]
   * @param {string} [options.limitClientOrderId]
   * @param {number} [options.limitIcebergQty]
   * @param {number} [options.limitStrategyId]
   * @param {number} [options.limitStrategyType]
   * @param {number} [options.stopPrice]
   * @param {number} [options.trailingDelta]
   * @param {number} [options.stopClientOrderId]
   * @param {number} [options.stopLimitPrice]
   * @param {string} [options.stopLimitTimeInForce]
   * @param {number} [options.stopIcebergQty]
   * @param {number} [options.stopStrategyId]
   * @param {string} [options.stopStrategyType]
   * @param {number} [options.newOrderRespType]
   * @param {number} [options.selfTradePreventionMode]
   * @param {number} [options.recvWindow]
   *
   */
  newOCOOrder (symbol, side, price, quantity, options = {}) {
    this.sendSignatureMessage('orderList.place', {
      symbol,
      side,
      price,
      quantity,
      ...options
    })
  }

  /**
   * Query OCO< br>
   *
   * Check execution status of an OCO.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#query-oco-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.orderListId]
   * @param {number} [options.recvWindow]
   *
   */
  getOCOOrder (options = {}) {
    this.sendSignatureMessage('orderList.status', options)
  }

  /**
   * Query OCO< br>
   *
   * Check execution status of an OCO.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#cancel-oco-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {string} [options.listClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.orderListId]
   * @param {number} [options.recvWindow]
   *
   */
  cancelOCOOrder (symbol, options = {}) {
    this.sendSignatureMessage('orderList.cancel', {
      symbol,
      ...options
    })
  }

  /**
   * Current open OCOs < br>
   *
   * Query execution status of all open OCOs.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/websocket_api/en/#current-open-ocos-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  getOCOOpenOrders (options = {}) {
    this.sendSignatureMessage('openOrderLists.status', options)
  }
}

module.exports = Trade
