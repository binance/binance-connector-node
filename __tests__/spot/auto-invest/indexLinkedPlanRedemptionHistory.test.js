/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

const requestId = 12345
const current = 1
const size = 100

describe('#indexLinkedPlanRedemptionHistory', () => {
  it('throw MissingParameterError when missing requestId', () => {
    expect(() => {
      SpotClient.indexLinkedPlanRedemptionHistory(null)
    }).toThrow(MissingParameterError)
  })
  it('should index linked plan redemption history', () => {
    const parameters = {
      current,
      asset,
      size,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/redeem/history?${buildQueryString({ requestId, ...parameters })}`)(mockResponse)
    return SpotClient.indexLinkedPlanRedemptionHistory(requestId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
