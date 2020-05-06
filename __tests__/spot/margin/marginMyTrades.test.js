/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  startTime,
  endTime,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginMyTrades', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.marginMyTrades('')
    }).toThrow(MissingParameterError)
  })

  it('should return my margin trades', () => {
    const parameters = {
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/myTrades?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.marginMyTrades(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
