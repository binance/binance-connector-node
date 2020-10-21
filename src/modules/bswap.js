const { validateParameter } = require('../helpers/validation')

const Bswap = superclass => class extends superclass {
  /*
    * List All Swap Pools (MARKET_DATA)
    *
    * Get metadata about all swap pools.
    *
    * GET /sapi/v1/bswap/pools
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#list-all-swap-pools-market_data
    */
  bswapPools (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/pools',
      options
    )
  }

  /*
    * Get liquidity information of a pool (USER_DATA)
    *
    * GET /sapi/v1/bswap/liquidity
    *
    * @param {number} poolId
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-information-of-a-pool-user_data
    */
  bswapLiquidity (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/liquidity',
      options
    )
  }

  /*
    * Add Liquidity (TRADE)
    *
    * POST /sapi/v1/bswap/liquidityAdd
    *
    * @param {number} poolId
    * @param {string} asset
    * @param {number} quantity
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#add-liquidity-trade
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

  /*
    * Remove Liquidity (TRADE)
    *
    * POST /sapi/v1/bswap/liquidityRemove
    *
    * @param {number} poolId
    * @param {string} type [`SINGLE` for single asset removal, `COMBINATION` for combination of all coins removal]
    * @param {string} asset
    * @param {number} shareAmount
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#remove-liquidity-trade
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

  /*
    * Get Liquidity Operation Record (USER_DATA)
    *
    * GET /sapi/v1/bswap/liquidityOps
    *
    * @param {number} operationId
    * @param {number} poolId
    * @param {string} operation [`ADD` or `REMOVE`]
    * @param {number} startTime
    * @param {number} endTime
    * @param {number} limit
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-operation-record-user_data
    */
  bswapLiquidityOperationRecord (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/liquidityOps',
      options
    )
  }

  /*
    * Request Quote (USER_DATA)
    *
    * Request a quote for swap quote asset (selling asset) for base asset (buying asset), essentially price/exchange rates.
    * quoteQty is quantity of quote asset (to sell).
    * Please be noted the quote is for reference only, the actual price will change as the liquidity changes, it's recommended to swap immediate after request a quote for slippage prevention.
    *
    * POST /sapi/v1/bswap/quote
    *
    * @param {string} quoteAsset
    * @param {string} baseAsset
    * @param {number} quoteQty
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#request-quote-user_data
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

  /*
    * Swap (TRADE)
    *
    * POST /sapi/v1/bswap/swap
    *
    * @param {string} quoteAsset
    * @param {string} baseAsset
    * @param {number} quoteQty
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#swap-trade
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

  /*
    * Get Swap History (USER_DATA)
    *
    * GET /sapi/v1/bswap/swap
    *
    * @param {string} swapId
    * @param {string} baseAsset
    * @param {number} quoteQty
    * @param {number} recvWindow
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#swap-trade
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
