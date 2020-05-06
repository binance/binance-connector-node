/* global describe, it, expect */
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#openOrders', () => {
  it('should return order details when no parameter attached', () => {
    nockMock('/api/v3/openOrders')(mockResponse)

    return SpotClient.openOrders().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return order details', () => {
    const parameters = {
      symbol,
      recvWindow
    }
    nockMock(`/api/v3/openOrders?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.openOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
