/* global describe, it, expect */
const { buildQueryString, SpotClient, nockMock } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#portfolioMarginAccount', () => {
  it('should return snapshot of portfolio margin account', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/portfolio/account?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.portfolioMarginAccount({ recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
