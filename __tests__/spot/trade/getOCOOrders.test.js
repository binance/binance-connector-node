/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

describe('#getOCOOrders', () => {
  it('should return oco order list', () => {
    const parameters = {
      limit: 10,
      recvWindow
    }
    nockMock(`/api/v3/allOrderList?${queryString(parameters)}`)(responseMockData)

    return SpotClient.getOCOOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
