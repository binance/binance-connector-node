/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#historicalTrades', async () => {
  describe('throw MissingParameterError', async () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.historicalTrades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return historical trades', async () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/historicalTrades?symbol=${symbol}`)(responseMockData)

    return SpotClient.historicalTrades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
