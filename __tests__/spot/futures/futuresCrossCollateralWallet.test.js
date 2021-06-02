/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#futuresCrossCollateralWallet', () => {
  it('should get cross-collateral wallet', () => {
    nockMock('/sapi/v2/futures/loan/wallet')(responseMockData)

    return SpotClient.futuresCrossCollateralWallet().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
