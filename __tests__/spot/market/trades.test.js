/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#trades', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.trades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return trades', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/trades?symbol=${symbol}`)(mockResponse)

    return SpotClient.trades(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
