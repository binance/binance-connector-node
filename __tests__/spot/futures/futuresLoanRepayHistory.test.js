/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#futuresLoanRepayHistory', () => {
  it('should get cross-collateral repay history', () => {
    const parameters = {
      coin,
      recvWindow
    }
    nockMock(`/sapi/v1/futures/loan/repay/history?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.futuresLoanRepayHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
