/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#rollingWindowTicker', () => {
  it('should return ticker for selective pairs', () => {
    const symbols = ['BTCUSDT', 'BNBUSDT']
    nockMock(`/api/v3/ticker?${buildQueryString({ symbols })}`)(mockResponse)

    return SpotClient.rollingWindowTicker('', symbols).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return ticker price', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker?symbol=${symbol}`)(mockResponse)

    return SpotClient.rollingWindowTicker(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return ticker price for window', () => {
    const symbol = 'BTCUSDT'
    const windowSize = '1d'
    nockMock(`/api/v3/ticker?symbol=${symbol}&windowSize=${windowSize}`)(mockResponse)

    return SpotClient.rollingWindowTicker(symbol, [], { windowSize }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
