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
   * {@link https://binance-docs.github.io/apidocs/spot/en/#earnings-list-user_data}
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
   * Extra Bonus List (USER_DATA)
   *
   * GET /sapi/v1/mining/payment/other
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#extra-bonus-list-user_data}
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
  miningBonusList (algo, userName, options = {}) {
    validateParameter(algo, 'algo')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/payment/other',
      Object.assign(options, {
        algo,
        userName
      })
    )
  }

  /**
   * Hashrate Resale List (USER_DATA)
   *
   * GET /sapi/v1/mining/hash-transfer/config/details/list
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#hashrate-resale-list-user_data}
   *
   * @param {number} [pageIndex]
   * @param {number} [pageSize]
   * @param {number} [recvWindow]
   */
  miningHashrateResaleList (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/mining/hash-transfer/config/details/list',
      options
    )
  }

  /**
   * Hashrate Resale Detail (USER_DATA)
   *
   * GET /sapi/v1/mining/hash-transfer/profit/details
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#hashrate-resale-detail-user_data}
   *
   * @param {number} configId
   * @param {string} userName
   * @param {number} [recvWindow]
   */
  miningHashrateResaleDetail (configId, userName, options = {}) {
    validateParameter(configId, 'configId')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'GET',
      '/sapi/v1/mining/hash-transfer/profit/details',
      Object.assign(options, {
        configId,
        userName
      })
    )
  }

  /**
   * Hashrate Resale Request (USER_DATA)
   *
   * POST /sapi/v1/mining/hash-transfer/config
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#hashrate-resale-request-user_data}
   *
   * @param {string} userName
   * @param {string} algo
   * @param {number} startDate
   * @param {number} endDate
   * @param {string} toPoolUser
   * @param {number} hashRate
   * @param {number} [recvWindow]
   */
  miningHashrateResaleRequest (userName, algo, startDate, endDate,
    toPoolUser, hashRate, options = {}) {
    validateParameter(userName, 'userName')
    validateParameter(algo, 'algo')
    validateParameter(startDate, 'startDate')
    validateParameter(endDate, 'endDate')
    validateParameter(toPoolUser, 'toPoolUser')
    validateParameter(hashRate, 'hashRate')

    return this.signRequest(
      'POST',
      '/sapi/v1/mining/hash-transfer/config',
      Object.assign(options, {
        userName,
        algo,
        startDate,
        endDate,
        toPoolUser,
        hashRate
      })
    )
  }

  /**
   * Hashrate Resale Detail (USER_DATA)
   *
   * POST /sapi/v1/mining/hash-transfer/config/cancel
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-hashrate-resale-configuration-user_data}
   *
   * @param {number} configId
   * @param {string} userName
   * @param {number} [recvWindow]
   */
  miningHashrateResaleCancel (configId, userName, options = {}) {
    validateParameter(configId, 'configId')
    validateParameter(userName, 'userName')
    return this.signRequest(
      'POST',
      '/sapi/v1/mining/hash-transfer/config/cancel',
      Object.assign(options, {
        configId,
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
