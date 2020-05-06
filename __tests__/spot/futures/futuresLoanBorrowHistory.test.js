/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#futuresLoanBorrowHistory', () => {
  it('should get cross-collateral borrow history without parameter attached', () => {
    nockMock('/sapi/v1/futures/loan/borrow/history')(mockResponse)

    return SpotClient.futuresLoanBorrowHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get cross-collateral borrow history', () => {
    const parameters = {
      coin,
      recvWindow
    }
    nockMock(`/sapi/v1/futures/loan/borrow/history?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.futuresLoanBorrowHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
