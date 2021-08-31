/* global describe, it, expect */
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#getMarginOCOOrders', () => {
  it('should return oco order list when no parameter attached', () => {
    nockMock('/sapi/v1/margin/allOrderList')(mockResponse)

    return SpotClient.getMarginOCOOrders().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return oco order list', () => {
    const parameters = {
      limit: 10,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/allOrderList?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getMarginOCOOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
