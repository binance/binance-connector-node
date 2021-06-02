/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

describe('#futuresCrossCollateralWallet', () => {
  it('should get cross-collateral wallet', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v2/futures/loan/wallet?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.futuresCrossCollateralWallet(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
