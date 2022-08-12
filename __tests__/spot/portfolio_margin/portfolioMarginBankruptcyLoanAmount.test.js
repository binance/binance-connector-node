/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#portfolioMarginBankruptcyLoanAmount', () => {
  it('should query portfolio margin bankruptcy loan amount without parameter attached', () => {
    nockMock('/sapi/v1/portfolio/pmLoan')(mockResponse)
    return SpotClient.portfolioMarginBankruptcyLoanAmount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should query portfolio margin bankruptcy loan amount', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/portfolio/pmLoan?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.portfolioMarginBankruptcyLoanAmount(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
