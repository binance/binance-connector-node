/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#portfolioMarginBankruptcyLoanRepay', () => {
  it('should portfolio margin bankruptcy loan repay without parameter attached', () => {
    nockPostMock('/sapi/v1/portfolio/repay')(mockResponse)
    return SpotClient.portfolioMarginBankruptcyLoanRepay().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should portfolio margin bankruptcy loan repay', () => {
    const parameters = {
      recvWindow
    }
    nockPostMock(`/sapi/v1/portfolio/repay?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.portfolioMarginBankruptcyLoanRepay(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
