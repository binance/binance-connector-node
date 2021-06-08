/* global describe, it, expect, */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginOpenOrders', () => {
  it('should return margin open orders', () => {
    const parameters = {
      symbol,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/openOrders?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginOpenOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
