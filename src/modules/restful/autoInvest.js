'use strict'

const { validateRequiredParameters } = require('../../helpers/validation')

/**
 * API auto-invest endpoints
 * @module AutoInvest
 * @param {*} superclass
 */
const AutoInvest = superclass => class extends superclass {
  /**
   * Get target asset list (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/target-asset/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-target-asset-list-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.targetAsset]
   * @param {number} [options.size] - Default:10 Max:100
   * @param {number} [options.current] - Current querying page. Start from 1. Default:1
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getTargetAssetList (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/target-asset/list',
      options
    )
  }

  /**
   * Get target asset ROI data (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/target-asset/roi/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-target-asset-roi-data-user_data}
   *
   * @param {string} targetAsset
   * @param {string} hisRoiType
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getTargetAssetRoiData (targetAsset, hisRoiType, options = {}) {
    validateRequiredParameters({ targetAsset, hisRoiType })
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/target-asset/roi/list',
      Object.assign(options, {
        targetAsset,
        hisRoiType
      })
    )
  }

  /**
   * Query all source asset and target asset (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/all/asset<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-all-source-asset-and-target-asset-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  queryAllSourceAssetAndTargetAsset (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/all/asset',
      options
    )
  }

  /**
   * Query source asset list (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/source-asset/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-source-asset-list-user_data}
   *
   * @param {string} usageType
   * @param {object} [options]
   * @param {string} [options.targetAsset]
   * @param {number} [options.indexId]
   * @param {boolean} [options.flexibleAllowedToUse]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  querySourceAssetList (usageType, options = {}) {
    validateRequiredParameters({ usageType })
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/source-asset/list',
      Object.assign(options, {
        usageType
      })
    )
  }

  /**
   * Change Plan Status<br>
   *
   * POST /sapi/v1/lending/auto-invest/plan/edit-status<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#change-plan-status}
   *
   * @param {number} planId
   * @param {Status} status
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  changePlanStatus (planId, status, options = {}) {
    validateRequiredParameters({ planId, status })
    return this.publicRequest(
      'POST',
      '/sapi/v1/lending/auto-invest/plan/edit-status',
      Object.assign(options, {
        planId,
        status
      })
    )
  }

  /**
   * Get list of plans<br>
   *
   * GET /sapi/v1/lending/auto-invest/plan/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-list-of-plans}
   *
   * @param {string} planType
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getListOfPlans (planType, options = {}) {
    validateRequiredParameters({ planType })
    return this.publicRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/plan/list',
      Object.assign(options, {
        planType
      })
    )
  }

  /**
   * Query holding details of the plan<br>
   *
   * GET /sapi/v1/lending/auto-invest/plan/id<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-holding-details-of-the-plan}
   *
   * @param {object} [options]
   * @param {number} [options.planId]
   * @param {string} [options.requestId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  queryHoldingDetailsOfThePlan (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/plan/id',
      options
    )
  }

  /**
   * Query subscription transaction history<br>
   *
   * GET /sapi/v1/lending/auto-invest/history/list<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-subscription-transaction-history}
   *
   * @param {object} [options]
   * @param {number} [options.planId]
   * @param {number} [options.startTime] - UTC timestamp in ms
   * @param {number} [options.endTime] - UTC timestamp in ms
   * @param {number} [options.targetAsset]
   * @param {PlanType} [options.planType]
   * @param {number} [options.size] - Default:10 Max:100
   * @param {number} [options.current] - Current querying page. Start from 1. Default:1
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  querySubscriptionTransactionHistory (options = {}) {
    return this.publicRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/history/list',
      options
    )
  }

  /**
   * Query Index Details (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/index/info<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-index-details-user_data}
   *
   * @param {number} indexId
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  queryIndexDetails (indexId, options = {}) {
    validateRequiredParameters({ indexId })
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/index/info',
      Object.assign(options, {
        indexId
      })
    )
  }

  /**
   * Query Index Linked Plan Position Details (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/index/user-summary<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-index-linked-plan-position-details-user_data}
   *
   * @param {number} indexId
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  queryIndexLinkedPlanPositionDetails (indexId, options = {}) {
    validateRequiredParameters({ indexId })
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/index/user-summary',
      Object.assign(options, {
        indexId
      })
    )
  }

  /**
   * Query One-Time Transaction Status (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/one-off/status<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-one-time-transaction-status-user_data}
   *
   * @param {number} transactionId
   * @param {object} [options]
   * @param {string} [options.requestId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  queryOnetimeTransactionStatus (transactionId, options = {}) {
    validateRequiredParameters({ transactionId })
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/one-off/status',
      Object.assign(options, {
        transactionId
      })
    )
  }

  /**
   * Index Linked Plan Redemption (TRADE)<br>
   *
   * POST /sapi/v1/lending/auto-invest/redeem<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#index-linked-plan-redemption-trade}
   *
   * @param {number} indexId - PORTFOLIO plan's Id
   * @param {number} redemptionPercentage - user redeem percentage,10/20/100.
   * @param {object} [options]
   * @param {string} [options.requestId] - sourceType + unique, transactionId and requestId cannot be empty at the same time
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  indexLinkedPlanRedemption (indexId, redemptionPercentage, options = {}) {
    validateRequiredParameters({ indexId, redemptionPercentage })
    return this.signRequest(
      'POST',
      '/sapi/v1/lending/auto-invest/redeem',
      Object.assign(options, {
        indexId,
        redemptionPercentage
      })
    )
  }

  /**
   * Index Linked Plan Redemption History (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/redeem/history<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#index-linked-plan-redemption-user_data}
   *
   * @param {number} requestId
   * @param {object} [options]
   * @param {number} [options.startTime] - UTC timestamp in ms
   * @param {number} [options.endTime] - UTC timestamp in ms
   * @param {number} [options.current] - Current querying page. Start from 1. Default:1
   * @param {string} [options.asset]
   * @param {number} [options.size] - Default:10 Max:100
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  indexLinkedPlanRedemptionHistory (requestId, options = {}) {
    validateRequiredParameters({ requestId })
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/redeem/history',
      Object.assign(options, {
        requestId
      })
    )
  }

  /**
   * Index Linked Plan Rebalance Details (USER_DATA)<br>
   *
   * GET /sapi/v1/lending/auto-invest/rebalance/history<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#index-linked-plan-rebalance-details-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.startTime] - UTC timestamp in ms
   * @param {number} [options.endTime] - UTC timestamp in ms
   * @param {number} [options.current] - Current querying page. Start from 1. Default:1
   * @param {number} [options.size] - Default:10 Max:100
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  indexLinkedPlanRebalanceDetails (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/lending/auto-invest/rebalance/history',
      options
    )
  }
}

module.exports = AutoInvest
