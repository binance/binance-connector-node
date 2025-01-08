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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#place-new-order-trade}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#test-new-order-trade}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#query-order-user_data}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#cancel-order-trade}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#cancel-and-replace-order-trade}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#current-open-orders-user_data}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#cancel-open-orders-trade}
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
   * Place new Order list< br>
   *
   * Send in a new OCO order.<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#place-new-order-list---oco-trade}
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
   *
   */
  newOCOOrder (symbol, side, quantity, aboveType, belowType, options = {}) {
    this.sendSignatureMessage('orderList.place.oco', {
      symbol,
      side,
      quantity,
      aboveType,
      belowType,
      ...options
    })
  }

  /**
   * Query OCO< br>
   *
   * Check execution status of an OCO.<br>
   *
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#query-order-list-user_data}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#cancel-order-list-trade}
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
   * {@link https://developers.binance.com/docs/binance-spot-api-docs/web-socket-api/trading-requests#current-open-order-lists-user_data}
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
