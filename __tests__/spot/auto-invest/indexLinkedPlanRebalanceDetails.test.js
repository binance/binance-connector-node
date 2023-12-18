/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const current = 1
const size = 100

describe('#indexLinkedPlanRebalanceDetails', () => {
  it('should index linked plan rebalance details without parameter attached', () => {
    nockMock('/sapi/v1/lending/auto-invest/rebalance/history')(mockResponse)
    return SpotClient.indexLinkedPlanRebalanceDetails().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should index linked plan rebalance details', () => {
    const parameters = {
      current,
      size,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/rebalance/history?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.indexLinkedPlanRebalanceDetails(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
