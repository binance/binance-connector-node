const { validateParameter } = require('../helpers/validation')

/**
 * API bswap endpoints
 * @module Bswap
 * @param {*} superclass
 */
const Bswap = superclass => class extends superclass {
  /**
   * List All Swap Pools (MARKET_DATA)<br>
   *
   * GET /sapi/v1/bswap/pools<br>
   *
   * Get metadata about all swap pools.<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#list-all-swap-pools-market_data}
   */
  bswapPools (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/pools',
      options
    )
  }

  /**
   * Get liquidity information of a pool (USER_DATA)<br>
   *
   * GET /sapi/v1/bswap/liquidity<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-information-of-a-pool-user_data}
   *
   * @param {number} [poolId]
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapLiquidity (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/liquidity',
      options
    )
  }

  /**
   * Add Liquidity (TRADE)<br>
   *
   * POST /sapi/v1/bswap/liquidityAdd<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#add-liquidity-trade}
   *
   * @param {number} poolId
   * @param {string} asset
   * @param {number} quantity
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapLiquidityAdd (poolId, asset, quantity, options = {}) {
    validateParameter(poolId, 'poolId')
    validateParameter(asset, 'asset')
    validateParameter(quantity, 'quantity')

    return this.signRequest(
      'POST',
      '/sapi/v1/bswap/liquidityAdd',
      Object.assign(options, {
        poolId,
        asset,
        quantity
      })
    )
  }

  /**
   * Remove Liquidity (TRADE)<br>
   *
   * POST /sapi/v1/bswap/liquidityRemove<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#remove-liquidity-trade}
   *
   * @param {number} poolId
   * @param {string} type -`SINGLE` for single asset removal, `COMBINATION` for combination of all coins removal
   * @param {string} asset
   * @param {number} shareAmount
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapLiquidityRemove (poolId, type, asset, shareAmount, options = {}) {
    validateParameter(poolId, 'poolId')
    validateParameter(type, 'type')
    validateParameter(asset, 'asset')
    validateParameter(shareAmount, 'shareAmount')

    return this.signRequest(
      'POST',
      '/sapi/v1/bswap/liquidityRemove',
      Object.assign(options, {
        poolId,
        type,
        asset,
        shareAmount
      })
    )
  }

  /**
   * Get Liquidity Operation Record (USER_DATA)<br>
   *
   * GET /sapi/v1/bswap/liquidityOps<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-operation-record-user_data}
   *
   * @param {number} [operationId]
   * @param {number} [poolId]
   * @param {string} [operation] -`ADD` or `REMOVE`
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [limit] - default 3, max 100
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapLiquidityOperationRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/liquidityOps',
      options
    )
  }

  /**
   * Request Quote (USER_DATA)<br>
   *
   * Request a quote for swap quote asset (selling asset) for base asset (buying asset),
   * essentially price/exchange rates. quoteQty is quantity of quote asset (to sell).<br>
   * Please be noted the quote is for reference only, the actual price will change
   * as the liquidity changes, it's recommended to swap immediate after request a quote
   * for slippage prevention.<br>
   *
   * GET /sapi/v1/bswap/quote<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#request-quote-user_data}
   *
   * @param {string} quoteAsset
   * @param {string} baseAsset
   * @param {number} quoteQty
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapRequestQuote (quoteAsset, baseAsset, quoteQty, options = {}) {
    validateParameter(quoteAsset, 'quoteAsset')
    validateParameter(baseAsset, 'baseAsset')
    validateParameter(quoteQty, 'quoteQty')

    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/quote',
      Object.assign(options, {
        quoteAsset,
        baseAsset,
        quoteQty
      })
    )
  }

  /**
   * Swap (TRADE)<br>
   *
   * POST /sapi/v1/bswap/swap<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#swap-trade}
   *
   * @param {string} quoteAsset
   * @param {string} baseAsset
   * @param {number} quoteQty
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapSwap (quoteAsset, baseAsset, quoteQty, options = {}) {
    validateParameter(quoteAsset, 'quoteAsset')
    validateParameter(baseAsset, 'baseAsset')
    validateParameter(quoteQty, 'quoteQty')

    return this.signRequest(
      'POST',
      '/sapi/v1/bswap/swap',
      Object.assign(options, {
        quoteAsset,
        baseAsset,
        quoteQty
      })
    )
  }

  /**
   * Get Swap History (USER_DATA)<br>
   *
   * GET /sapi/v1/bswap/swap<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#swap-trade}
   *
   * @param {string} [swapId]
   * @param {number} [startTime]
   * @param {number} [endTime]
   * @param {number} [status] - 0: pending for swap, 1: success, 2: failed
   * @param {string} [baseAsset]
   * @param {string} [quoteAsset]
   * @param {number} [limit] - default 3, max 100
   * @param {number} [recvWindow] - The value cannot be greater than 60000
   */
  bswapSwapHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/swap',
      options
    )
  }
}

module.exports = Bswap
