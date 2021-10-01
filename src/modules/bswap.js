const { validateRequiredParameters } = require('../helpers/validation')

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
  bswapPools () {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/pools'
    )
  }

  /**
   * Get liquidity information of a pool (USER_DATA)<br>
   *
   * GET /sapi/v1/bswap/liquidity<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-information-of-a-pool-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.poolId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
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
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapLiquidityAdd (poolId, asset, quantity, options = {}) {
    validateRequiredParameters({ poolId, asset, quantity })

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
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapLiquidityRemove (poolId, type, asset, shareAmount, options = {}) {
    validateRequiredParameters({ poolId, type, asset, shareAmount })

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
   * @param {object} [options]
   * @param {number} [options.operationId]
   * @param {number} [options.poolId]
   * @param {string} [options.operation] -`ADD` or `REMOVE`
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 3, max 100
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
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
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapRequestQuote (quoteAsset, baseAsset, quoteQty, options = {}) {
    validateRequiredParameters({ quoteAsset, baseAsset, quoteQty })

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
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapSwap (quoteAsset, baseAsset, quoteQty, options = {}) {
    validateRequiredParameters({ quoteAsset, baseAsset, quoteQty })

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
   * @param {object} [options]
   * @param {string} [options.swapId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.status] - 0: pending for swap, 1: success, 2: failed
   * @param {string} [options.baseAsset]
   * @param {string} [options.quoteAsset]
   * @param {number} [options.limit] - default 3, max 100
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapSwapHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/swap',
      options
    )
  }

  /**
   * Get Pool Configure (USER_DATA)
   *
   * GET /sapi/v1/bswap/poolConfigure<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-pool-configure-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.poolId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapGetPoolConfig (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/poolConfigure',
      options
    )
  }

  /**
   * Add Liquidity Preview (USER_DATA)
   *
   * GET /sapi/v1/bswap/addLiquidityPreview<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#add-liquidity-preview-user_data}
   *
   * @param {number} poolId
   * @param {string} type - "SINGLE" for adding a single token;"COMBINATION" for adding dual tokens
   * @param {string} quoteAsset
   * @param {number} quoteQty
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapAddLiquidityPreview (poolId, type, quoteAsset, quoteQty, options = {}) {
    validateRequiredParameters({ poolId, type, quoteAsset, quoteQty })
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/addLiquidityPreview',
      Object.assign(options, { poolId, type, quoteAsset, quoteQty })
    )
  }

  /**
   * Remove Liquidity Preview (USER_DATA)
   *
   * GET /sapi/v1/bswap/removeLiquidityPreview<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#remove-liquidity-preview-user_data}
   *
   * @param {number} poolId
   * @param {string} type - Type is "SINGLE", remove and obtain a single token;Type is "COMBINATION", remove and obtain dual token.
   * @param {string} quoteAsset
   * @param {number} shareAmount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  bswapRemoveLiquidityPreview (poolId, type, quoteAsset, shareAmount, options = {}) {
    validateRequiredParameters({ poolId, type, quoteAsset, shareAmount })
    return this.signRequest(
      'GET',
      '/sapi/v1/bswap/removeLiquidityPreview',
      Object.assign(options, { poolId, type, quoteAsset, shareAmount })
    )
  }
}

module.exports = Bswap
