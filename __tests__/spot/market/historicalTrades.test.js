/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

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
    nockMock(`/api/v3/historicalTrades?symbol=${symbol}`)(responseMockData)

    return SpotClient.historicalTrades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
