/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#futuresLoanBorrowHistory', () => {
  it('should get cross-collateral borrow history', () => {
    const parameters = {
      coin,
      recvWindow
    }
    nockMock(`/sapi/v1/futures/loan/borrow/history?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.futuresLoanBorrowHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
