/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#tickerPrice', () => {
  it('should return all ticker price', async () => {
    nockMock('/api/v3/ticker/price')(responseMockData)

    return SpotClient.tickerPrice().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })

  it('should return ticker price', async () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/price?symbol=${symbol}`)(responseMockData)

    return SpotClient.tickerPrice(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
