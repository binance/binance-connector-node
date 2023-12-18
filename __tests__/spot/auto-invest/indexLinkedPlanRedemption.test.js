/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const requestId = 12345
const indexId = 1
const redemptionPercentage = 10

describe('#indexLinkedPlanRedemption', () => {
  it('throw MissingParameterError when missing requestId', () => {
    expect(() => {
      SpotClient.indexLinkedPlanRedemption(null)
    }).toThrow(MissingParameterError)
  })
  it('should index linked plan redemption', () => {
    const parameters = {
      requestId,
      recvWindow
    }
    nockPostMock(`/sapi/v1/lending/auto-invest/redeem?${buildQueryString({ indexId, redemptionPercentage, ...parameters })}`)(mockResponse)
    return SpotClient.indexLinkedPlanRedemption(indexId, redemptionPercentage, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
