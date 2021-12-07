/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#orderCount', () => {
  it('should return order count usage', () => {
    nockMock('/api/v3/rateLimit/order')(mockResponse)

    return SpotClient.orderCount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
