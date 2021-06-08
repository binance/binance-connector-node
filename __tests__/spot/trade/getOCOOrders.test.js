/* global describe, it, expect, */
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#getOCOOrders', () => {
  it('should return oco order list', () => {
    const parameters = {
      limit: 10,
      recvWindow
    }
    nockMock(`/api/v3/allOrderList?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getOCOOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
