/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#aggTrades', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.aggTrades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return agg trades', async () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/aggTrades?symbol=${symbol}`)(responseMockData)

    return SpotClient.aggTrades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
