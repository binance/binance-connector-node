
const Market = superclass => class extends superclass {
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
    return this.request.get('/api/v3/time')
  }

  exchangeInfo () {
    return this.request.get('/api/v3/exchangeInfo')
  }
}

module.exports = Market
