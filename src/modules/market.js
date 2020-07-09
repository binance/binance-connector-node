
const Market = superclass => class extends superclass {

  /*
    * Check Server Time
    *
    * GET /api/v3/time
    *
    * Test connectivity to the Rest API and get the current server time.
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
}

module.exports = Market
