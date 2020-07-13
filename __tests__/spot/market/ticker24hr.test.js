/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#ticker24hr', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.ticker24hr('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return 24hr price', async () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/24hr?symbol=${symbol}`)(responseMockData)

    return SpotClient.ticker24hr(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
