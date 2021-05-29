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

describe('#getOCOOrder', () => {
  it('should return oco order details', () => {
    const parameters = {
      orderListId: 10,
      recvWindow
    }
    nockMock(`/api/v3/orderList?${queryString(parameters)}`)(responseMockData)

    return SpotClient.getOCOOrder(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
