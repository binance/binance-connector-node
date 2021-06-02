/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#bookTicker', () => {
  it('should return all book ticker', () => {
    nockMock('/api/v3/ticker/bookTicker')(responseMockData)

    return SpotClient.bookTicker().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })

  it('should return bookTicker', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/bookTicker?symbol=${symbol}`)(responseMockData)

    return SpotClient.bookTicker(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
