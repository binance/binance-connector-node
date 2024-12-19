/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

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
    nockMock(`/api/v3/avgPrice?symbol=${symbol}`)(mockResponse)

    return SpotClient.avgPrice(symbol, { timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return avg price without optional parameters', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/avgPrice?symbol=${symbol}`)(mockResponse)

    return SpotClient.avgPrice(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
