/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#avgPrice', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.avgPrice('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return avg price', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/avgPrice?symbol=${symbol}`)(responseMockData)

    return SpotClient.avgPrice(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
