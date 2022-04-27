/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginOrderCount', () => {
  const parameters = {
    recvWindow
  }

  it('should get margin order count usage', () => {
    nockMock(`/sapi/v1/margin/rateLimit/order?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.marginOrderCount(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
