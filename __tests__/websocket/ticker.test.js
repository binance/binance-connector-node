/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#ticker', () => {
  it('should get ticker data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@ticker`, mockResponse)
    mockConnection(SpotClient, 'tickerWS', symbol)(data => {
      expect(data).toEqual([mockResponse])
    })
  })

  it('should get all ticker data', () => {
    mockSubscription('/ws/!ticker@arr', mockResponse)
    mockConnection(SpotClient, 'tickerWS', null)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
