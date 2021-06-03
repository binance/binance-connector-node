/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#futuresLoanAdjustCollateralHistory', () => {
  it('should get adjust cross collateral LTV history', () => {
    nockMock('/sapi/v1/futures/loan/adjustCollateral/history')(responseMockData)

    return SpotClient.futuresLoanAdjustCollateralHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
