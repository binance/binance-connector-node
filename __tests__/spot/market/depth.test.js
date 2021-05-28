/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#depth', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.depth()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return orderbook', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/depth?symbol=${symbol}`)(responseMockData)

    return SpotClient.depth(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
