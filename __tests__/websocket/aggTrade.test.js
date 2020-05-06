/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#aggTrade', () => {
  it('should get aggregate trade data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@aggTrade`, mockResponse)
    mockConnection(SpotClient, 'aggTradeWS', symbol)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
