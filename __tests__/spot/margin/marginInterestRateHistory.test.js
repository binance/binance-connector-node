/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginInterestRateHistory', () => {
  it('should throw MissingParameterError given missing asset', () => {
    expect(() => {
      SpotClient.marginInterestRateHistory('')
    }).toThrow(MissingParameterError)
  })

  it('should return margin interest rate history record', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/margin/interestRateHistory?${buildQueryString({ asset, ...parameters })}`)(mockResponse)

    return SpotClient.marginInterestRateHistory(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
