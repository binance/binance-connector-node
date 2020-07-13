/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#klines', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.klines('', '1m')
      }).toThrow(MissingParameterError)
    })

    it('missing interval', async () => {
      expect(() => {
        SpotClient.klines('BTCUSDT', '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return klines', async () => {
    const symbol = 'BTCUSDT'
    const interval = '1m'
    nockMock(`/api/v3/klines?symbol=${symbol}&interval=${interval}`)(responseMockData)

    return SpotClient.klines(symbol, interval).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
