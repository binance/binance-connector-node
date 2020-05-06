/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#partialBookDepth', () => {
  it('should get partialBookDepth data', () => {
    const symbol = 'BNBUSDT'
    const levels = 5
    const speed = '1000ms'
    mockSubscription(`/ws/${symbol.toLowerCase()}@depth${levels}@${speed}`, mockResponse)
    mockConnection(SpotClient, 'partialBookDepth', symbol, levels, speed)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
