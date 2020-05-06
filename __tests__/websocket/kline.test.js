/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#kline', () => {
  it('should get kline data', () => {
    const symbol = 'BNBUSDT'
    const interval = '1m'
    mockSubscription(`/ws/${symbol.toLowerCase()}@kline_${interval}`, mockResponse)
    mockConnection(SpotClient, 'klineWS', symbol, interval)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
