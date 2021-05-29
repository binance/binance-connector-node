/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

describe('#getOpenOCOOrders', () => {
  it('should return open oco order list', () => {
    nockMock('/api/v3/openOrderList')(responseMockData)

    return SpotClient.getOpenOCOOrders().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
