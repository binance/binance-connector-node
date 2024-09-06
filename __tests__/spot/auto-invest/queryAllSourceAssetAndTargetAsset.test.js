/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#queryAllSourceAssetAndTargetAsset', () => {
  it('should query all source asset and target asset without parameter attached', () => {
    nockMock('/sapi/v1/lending/auto-invest/all/asset')(mockResponse)
    return SpotClient.queryAllSourceAssetAndTargetAsset().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should query all source asset and target asset', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/all/asset?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.queryAllSourceAssetAndTargetAsset(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
