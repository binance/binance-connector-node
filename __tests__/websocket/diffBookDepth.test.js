/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#diffBookDepth', () => {
  it('should get diffBookDepth data', () => {
    const symbol = 'BNBUSDT'
    const speed = '1000ms'
    mockSubscription(`/ws/${symbol.toLowerCase()}@depth@${speed}`, mockResponse)
    mockConnection(SpotClient, 'diffBookDepth', symbol, speed)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
