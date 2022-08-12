/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

describe('#portfolioMarginCollateralRate', () => {
  it('should portfolio margin collateral rate', () => {
    nockMock('/sapi/v1/portfolio/collateralRate')(mockResponse)
    return SpotClient.portfolioMarginCollateralRate().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
