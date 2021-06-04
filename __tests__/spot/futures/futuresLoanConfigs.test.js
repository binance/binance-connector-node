/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  loanCoin,
  collateralCoin
} = require('../../testUtils/mockData')

describe('#futuresLoanConfigs', () => {
  it('should get cross collateral information', () => {
    const parameters = {
      loanCoin,
      collateralCoin
    }
    nockMock(`/sapi/v2/futures/loan/configs?${queryString(parameters)}`)(responseMockData)

    return SpotClient.futuresLoanConfigs(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
