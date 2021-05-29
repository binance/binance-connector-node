/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#openOrders', () => {
  it('should return order details', () => {
    const parameters = {
      symbol,
      recvWindow
    }
    nockMock(`/api/v3/openOrders?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.openOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
