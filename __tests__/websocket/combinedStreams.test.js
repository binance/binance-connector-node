/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#combinedStreams', () => {
  it('should get combined stream data with single stream', () => {
    const stream = 'btcusdt@miniTicker'
    mockSubscription(`/stream?streams=${stream}`, mockResponse)
  })

  it('should get combined stream data', () => {
    const streams = ['btcusdt@miniTicker', 'ethusdt@ticker']
    mockSubscription(`/stream?streams=${streams.join('/')}`, mockResponse)
  })
})
