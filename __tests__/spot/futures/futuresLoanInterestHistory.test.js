/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#futuresLoanInterestHistory', () => {
  it('should get cross collateral interest history', () => {
    nockMock('/sapi/v1/futures/loan/interestHistory')(responseMockData)

    return SpotClient.futuresLoanInterestHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
