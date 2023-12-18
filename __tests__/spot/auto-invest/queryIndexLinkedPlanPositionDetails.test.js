/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const indexId = 1

describe('#queryIndexLinkedPlanPositionDetails', () => {
  it('throw MissingParameterError when missing indexId', () => {
    expect(() => {
      SpotClient.queryIndexLinkedPlanPositionDetails(null)
    }).toThrow(MissingParameterError)
  })
  it('should query index linked plan position details', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/index/user-summary?${buildQueryString({ indexId, ...parameters })}`)(mockResponse)
    return SpotClient.queryIndexLinkedPlanPositionDetails(indexId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
