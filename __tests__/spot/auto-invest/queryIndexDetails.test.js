/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const indexId = 1

describe('#queryIndexDetails', () => {
  it('throw MissingParameterError when missing indexId', () => {
    expect(() => {
      SpotClient.queryIndexDetails(null)
    }).toThrow(MissingParameterError)
  })
  it('should query index details', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/index/info?${buildQueryString({ indexId, ...parameters })}`)(mockResponse)
    return SpotClient.queryIndexDetails(indexId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
