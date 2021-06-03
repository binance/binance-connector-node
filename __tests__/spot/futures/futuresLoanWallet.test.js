/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#futuresLoanWallet', () => {
  it('should get cross-collateral wallet', () => {
    nockMock('/sapi/v2/futures/loan/wallet')(responseMockData)

    return SpotClient.futuresLoanWallet().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
