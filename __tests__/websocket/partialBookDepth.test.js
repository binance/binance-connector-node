/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#partialBookDepth', () => {
  it('should get partialBookDepth data', () => {
    const symbol = 'BNBUSDT'
    const levels = 5
    const speed = '1000ms'
    mockSubscription(`/ws/${symbol.toLowerCase()}@depth${levels}@${speed}`, mockResponse)
  })
})
