/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#miniTicker', () => {
  it('should get miniTicker data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@miniTicker`, mockResponse)
    mockConnection(SpotClient, 'miniTickerWS', symbol)(data => {
      expect(data).toEqual([mockResponse])
    })
  })

  it('should get all miniTicker data', () => {
    mockSubscription('/ws/!miniTicker@arr', mockResponse)
    mockConnection(SpotClient, 'miniTickerWS', null)(data => {
      expect(data).toEqual([mockResponse])
    })
  })

  it('should not get all miniTicker data', () => {
    mockSubscription('invalid URL', mockResponse)
    mockConnection(SpotClient, 'miniTickerWS', null)(data => {
      expect(data).toEqual([Error('URL mismatch')])
    })
  })
})
