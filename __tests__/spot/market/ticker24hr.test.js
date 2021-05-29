/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#ticker24hr', () => {
  it('should return 24hr price for all pairs', () => {
    nockMock('/api/v3/ticker/24hr')(responseMockData)

    return SpotClient.ticker24hr().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })

  it('should return 24hr price', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/24hr?symbol=${symbol}`)(responseMockData)

    return SpotClient.ticker24hr(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
