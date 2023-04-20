/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#miniTicker', () => {
  it('should get miniTicker data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@miniTicker`, mockResponse)
  })

  it('should get all miniTicker data', () => {
    mockSubscription('/ws/!miniTicker@arr', mockResponse)
  })

  it('should not get all miniTicker data', () => {
    mockSubscription('invalid URL', mockResponse)
  })
})
