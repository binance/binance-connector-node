/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#bookTicker', () => {
  it('should return all book ticker', () => {
    nockMock('/api/v3/ticker/bookTicker')(mockResponse)

    return SpotClient.bookTicker().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return bookTicker for selective pairs', () => {
    const symbols = ['BTCUSDT', 'BNBUSDT']
    nockMock(`/api/v3/ticker/bookTicker?${buildQueryString({ symbols })}`)(mockResponse)

    return SpotClient.bookTicker('', symbols).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return bookTicker', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/bookTicker?symbol=${symbol}`)(mockResponse)

    return SpotClient.bookTicker(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
