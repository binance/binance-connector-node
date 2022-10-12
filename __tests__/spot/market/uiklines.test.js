/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#uiklines', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.uiklines('', '1m')
      }).toThrow(MissingParameterError)
    })

    it('missing interval', () => {
      expect(() => {
        SpotClient.uiklines('BTCUSDT', '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return uiklines', () => {
    const symbol = 'BTCUSDT'
    const interval = '1m'
    nockMock(`/api/v3/uiKlines?symbol=${symbol}&interval=${interval}`)(mockResponse)

    return SpotClient.uiklines(symbol, interval).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
