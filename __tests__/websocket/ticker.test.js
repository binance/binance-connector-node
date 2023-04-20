/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#ticker', () => {
  it('should get ticker data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@ticker`, mockResponse)
  })

  it('should get all ticker data', () => {
    mockSubscription('/ws/!ticker@arr', mockResponse)
  })
})
