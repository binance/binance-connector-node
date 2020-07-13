const { validateParameter } = require('../helpers/validation')

const Trade = superclass => class extends superclass {
  /*
    * Account Information (USER_DATA)
    *
    * GET /api/v3/account
    *
    * @param {number} recvWindow
    */
  account (options = {}) {
    return this.signRequest(
      'GET',
      '/api/v3/account',
      options
    )
  }

  /*
  * Account Trade List (USER_DATA)
  *
  * GET /api/v3/myTrades
  *
  * @param {string} symbol
  * @param {number} startTime
  * @param {number} endTime
  * @param {number} fromId
  * @param {number} limit
  * @param {number} recvWindow
  */
  myTrades (symbol, options = {}) {
    validateParameter(symbol, 'symbol')

    return this.signRequest(
      'GET',
      '/api/v3/myTrades',
      Object.assign(options, {
        symbol: symbol.toUpperCase()
      })
    )
  }
}

module.exports = Trade
