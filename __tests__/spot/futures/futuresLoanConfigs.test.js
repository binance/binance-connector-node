/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  loanCoin,
  collateralCoin
} = require('../../testUtils/mockData')

describe('#futuresLoanConfigs', () => {
  it('should get cross collateral information without parameter attached', () => {
    nockMock('/sapi/v2/futures/loan/configs')(mockResponse)

    return SpotClient.futuresLoanConfigs().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get cross collateral information', () => {
    const parameters = {
      loanCoin,
      collateralCoin
    }
    nockMock(`/sapi/v2/futures/loan/configs?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresLoanConfigs(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
