/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#rollingWindowTicker', () => {
  it('should get rollingWindowTicker data', () => {
    const symbol = 'BNBUSDT'
    const windowSize = '4h'
    mockSubscription(`/ws/${symbol.toLowerCase()}@ticker_${windowSize}`, mockResponse)
    mockConnection(SpotClient, 'rollingWindowTickerWS', symbol, windowSize)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
