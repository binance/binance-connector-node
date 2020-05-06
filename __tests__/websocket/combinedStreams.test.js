/* global describe, it, expect */
const { SpotClient, mockSubscription, mockConnection } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#combinedStreams', () => {
  it('should get combined stream data with single stream', () => {
    const stream = 'btcusdt@miniTicker'
    mockSubscription(`/stream?streams=${stream}`, mockResponse)
    mockConnection(SpotClient, 'combinedStreams', stream)(data => {
      expect(data).toEqual([mockResponse])
    })
  })

  it('should get combined stream data', () => {
    const streams = ['btcusdt@miniTicker', 'ethusdt@ticker']
    mockSubscription(`/stream?streams=${streams.join('/')}`, mockResponse)
    mockConnection(SpotClient, 'combinedStreams', streams)(data => {
      expect(data).toEqual([mockResponse])
    })
  })
})
