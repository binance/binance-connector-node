/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#getOpenOCOOrders', () => {
  it('should return open oco order list', () => {
    nockMock('/api/v3/openOrderList')(mockResponse)

    return SpotClient.getOpenOCOOrders({ timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return open oco order list without optional parameters', () => {
    nockMock('/api/v3/openOrderList')(mockResponse)

    return SpotClient.getOpenOCOOrders().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
