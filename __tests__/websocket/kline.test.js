/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#kline', () => {
  it('should get kline data', () => {
    const symbol = 'BNBUSDT'
    const interval = '1m'
    mockSubscription(`/ws/${symbol.toLowerCase()}@kline_${interval}`, mockResponse)
  })
})
