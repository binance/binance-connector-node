/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#bookTicker', () => {
  it('should get bookTicker data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@bookTicker`, mockResponse)
    mockConnection(SpotClient, 'bookTickerWS', symbol)(data => {
      expect(data).toEqual([mockResponse])
    })
  })

  it('should get all bookTicker data', () => {
    mockSubscription('/ws/!bookTicker', mockResponse)
    mockConnection(SpotClient, 'bookTickerWS', null)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
