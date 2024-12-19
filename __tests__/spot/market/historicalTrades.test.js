/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#historicalTrades', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.historicalTrades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return historical trades', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/historicalTrades?symbol=${symbol}`)(mockResponse)

    return SpotClient.historicalTrades(symbol, { timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return historical trades without optional parameters', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/historicalTrades?symbol=${symbol}`)(mockResponse)

    return SpotClient.historicalTrades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
