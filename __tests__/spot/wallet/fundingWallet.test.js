/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#fundingWallet', () => {
  it('should return assets from funding wallet', () => {
    nockPostMock('/sapi/v1/asset/get-funding-asset')(mockResponse)

    return SpotClient.fundingWallet().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return specified asset info from funding wallet', () => {
    const parameters = {
      asset,
      recvWindow
    }

    nockPostMock(`/sapi/v1/asset/get-funding-asset?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.fundingWallet(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
