/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../helpers/testSetup')

describe('#trades', () => {

  describe('throw MissingParameterError', async () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.trades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return trades', async () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/trades?symbol=${symbol}`)(responseMockData)

    return SpotClient.trades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
