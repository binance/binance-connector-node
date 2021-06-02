/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
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
    nockMock(`/sapi/v1/margin/interestRateHistory?${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginInterestRateHistory(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
