
const MissingParameterError = require('../error/missingParameterError')

const Market = superclass => class extends superclass {
  /*
    * Test Connectivity
    *
    * GET /api/v3/ping
    *
    * Test connectivity to the Rest API.
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#test-connectivity
    */
  ping () {
    return this.publicRequest('/api/v3/ping')
  }

  /*
    * Check Server Time
    *
    * GET /api/v3/time
    *
    * Test connectivity to the Rest API and get the current server time.
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#check-server-time
    */
  time () {
    return this.publicRequest('/api/v3/time')
  }

  /*
    * Exchange Information
    *
    * GET /api/v3/exchangeInfo
    *
    * Current exchange trading rules and symbol information
    *
    * @link https://binance-docs.github.io/apidocs/spot/en/#exchange-information
    *
    */
  exchangeInfo () {
    return this.publicRequest('/api/v3/exchangeInfo')
  }

  /*
    * Order Book
    *
    * GET /api/v3/depth
    *
    * @param string $symbol
    * @param array  $options
    */
  depth (symbol, options = {}) {
    if (symbol === undefined || symbol === '') {
      throw new MissingParameterError('symbol')
    }

    return this.publicRequest(
      '/api/v3/depth',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }

  /*
    * Recent Trades List
    *
    * GET /api/v3/trades
    *
    * @param string $symbol
    * @param array  $options
    */
  trades (symbol, options = {}) {
    if (symbol === undefined || symbol === '') {
      throw new MissingParameterError('symbol')
    }

    return this.publicRequest(
      '/api/v3/trades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }
}

module.exports = Market
