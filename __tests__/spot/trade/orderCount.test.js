/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#orderCount', () => {
  it('should return order count usage', () => {
    nockMock('/api/v3/rateLimit/order')(mockResponse)

    return SpotClient.orderCount({ timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return order count usage without optional parameters', () => {
    nockMock('/api/v3/rateLimit/order')(mockResponse)

    return SpotClient.orderCount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
