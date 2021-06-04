/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#futuresLoanLiquidationHistory', () => {
  it('should get cross collateral liquidation history', () => {
    nockMock('/sapi/v1/futures/loan/liquidationHistory')(responseMockData)

    return SpotClient.futuresLoanLiquidationHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
