/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#futuresLoanRepayHistory', () => {
  it('should get cross-collateral repay history without parameter attached', () => {
    nockMock('/sapi/v1/futures/loan/repay/history')(mockResponse)

    return SpotClient.futuresLoanRepayHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get cross-collateral repay history', () => {
    const parameters = {
      coin,
      recvWindow
    }
    nockMock(`/sapi/v1/futures/loan/repay/history?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.futuresLoanRepayHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
