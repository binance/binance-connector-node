/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#klines', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.klines('', '1m')
      }).toThrow(MissingParameterError)
    })

    it('missing interval', () => {
      expect(() => {
        SpotClient.klines('BTCUSDT', '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return klines', () => {
    const symbol = 'BTCUSDT'
    const interval = '1m'
    nockMock(`/api/v3/klines?symbol=${symbol}&interval=${interval}`)(mockResponse)

    return SpotClient.klines(symbol, interval, { timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return klines without optional parameters', () => {
    const symbol = 'BTCUSDT'
    const interval = '1m'
    nockMock(`/api/v3/klines?symbol=${symbol}&interval=${interval}`)(mockResponse)

    return SpotClient.klines(symbol, interval).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
