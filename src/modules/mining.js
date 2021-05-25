const { validateParameter } = require('../helpers/validation')

/**
 * API mining endpoints
 * @module Mining
 * @param {*} superclass
 */
const Mining = superclass => class extends superclass {
  /**
   * Acquiring Algorithm (MARKET_DATA)
   *
   * GET /sapi/v1/mining/pub/algoList
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#acquiring-algorithm-market_data}
   *
   * @param {number} [recvWindow]
   */
  miningAlgoList (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/mining/pub/algoList',
      options
    )
  }

  /**
   * Acquiring CoinName (MARKET_DATA)
   *
   * GET /sapi/v1/mining/pub/coinList
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#acquiring-coinname-market_data}
   *
   * @param {number} [recvWindow]
   */
  miningCoinList (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/mining/pub/coinList',
      options
    )
  }

  /**
   * Request for Detail Miner List (USER_DATA)
   *
   * GET /sapi/v1/mining/worker/detail
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#request-for-detail-miner-list-user_data}
   *
   * @param {string} algo
   * @param {string} userName
   * @param {string} workerName
   * @param {number} [recvWindow]
   */
  miningWorker (algo, userName, workerName, options = {}) {
    validateParameter(algo, 'algo')
    validateParameter(userName, 'userName')
    validateParameter(workerName, 'workerName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/worker/detail',
      Object.assign(options, {
        algo,
        userName,
        workerName
      })
    )
  }

  /**
   * Request for Miner List (USER_DATA)
   *
   * GET /sapi/v1/mining/worker/list
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#request-for-miner-list-user_data}
   *
   * @param {string} algo
   * @param {string} userName
   * @param {number} [pageIndex]
   * @param {number} [sort]
   * @param {number} [sortColumn]
   * @param {number} [workerStatus]
   * @param {number} [recvWindow]
   */
  miningWorkerList (algo, userName, options = {}) {
    validateParameter(algo, 'algo')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/worker/list',
      Object.assign(options, {
        algo,
        userName
      })
    )
  }

  /**
   * Revenue List (USER_DATA)
   *
   * GET /sapi/v1/mining/payment/list
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#revenue-list-user_data}
   *
   * @param {string} algo
   * @param {string} userName
   * @param {string} [coin]
   * @param {number} [startDate]
   * @param {number} [endDate]
   * @param {number} [pageIndex]
   * @param {number} [pageSize]
   * @param {number} [recvWindow]
   */
  miningRevenueList (algo, userName, options = {}) {
    validateParameter(algo, 'algo')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/payment/list',
      Object.assign(options, {
        algo,
        userName
      })
    )
  }

  /**
   * Statistic List (USER_DATA)
   *
   * GET /sapi/v1/mining/statistics/user/status
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#statistic-list-user_data}
   *
   * @param {string} algo
   * @param {string} userName
   * @param {number} [recvWindow]
   */
  miningStatisticList (algo, userName, options = {}) {
    validateParameter(algo, 'algo')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/statistics/user/status',
      Object.assign(options, {
        algo,
        userName
      })
    )
  }

  /**
   * Account List (USER_DATA)
   *
   * GET /sapi/v1/mining/statistics/user/list
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#account-list-user_data}
   *
   * @param {string} algo
   * @param {string} userName
   * @param {number} [recvWindow]
   */
  miningAccountList (algo, userName, options = {}) {
    validateParameter(algo, 'algo')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/statistics/user/list',
      Object.assign(options, {
        algo,
        userName
      })
    )
  }
}

module.exports = Mining
