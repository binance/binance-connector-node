/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#ticker', () => {
  it('should get ticker data', () => {
    const symbol = 'BNBUSDT'
    const windowSize = '1h'
    mockSubscription(`/ws/${symbol.toLowerCase()}@ticker_${windowSize.toLowerCase()}`, mockResponse)
    mockConnection(SpotClient, 'rollingWindowTickerWS', windowSize, symbol)(data => {
      expect(data).toEqual([mockResponse])
    })
  })

  it('should get all ticker data', () => {
    const windowSize = '1h'
    mockSubscription(`/ws/!ticker_${windowSize.toLowerCase()}@arr`, mockResponse)
    mockConnection(SpotClient, 'rollingWindowTickerWS', windowSize, null)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
