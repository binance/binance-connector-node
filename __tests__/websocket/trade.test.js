/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#trade', () => {
  it('should get trade data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@trade`, mockResponse)
    mockConnection(SpotClient, 'tradeWS', symbol)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
