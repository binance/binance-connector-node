/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#ticker24hr', () => {
  it('should return 24hr price for all pairs', () => {
    nockMock('/api/v3/ticker/24hr')(mockResponse)

    return SpotClient.ticker24hr().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return 24hr price for selective pairs', () => {
    const symbols = ['BTCUSDT', 'BNBUSDT']
    nockMock(`/api/v3/ticker/24hr?${buildQueryString({ symbols })}`)(mockResponse)

    return SpotClient.ticker24hr('', symbols).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return 24hr price', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/24hr?symbol=${symbol}`)(mockResponse)

    return SpotClient.ticker24hr(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
