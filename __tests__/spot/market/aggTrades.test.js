/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#aggTrades', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.aggTrades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return agg trades', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/aggTrades?symbol=${symbol}`)(mockResponse)

    return SpotClient.aggTrades(symbol, { timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return agg trades without optional parameters', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/aggTrades?symbol=${symbol}`)(mockResponse)

    return SpotClient.aggTrades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
