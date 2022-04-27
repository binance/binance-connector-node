/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, limit, recvWindow } = require('../../testUtils/mockData')
const parameters = {
  limit,
  recvWindow
}

describe('#nftAsset', () => {
  it('should fetch NFT assets', () => {
    nockMock(`/sapi/v1/nft/user/getAsset?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.nftAsset(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch NFT assets without params', () => {
    nockMock(`/sapi/v1/nft/user/getAsset?${buildQueryString()}`)(mockResponse)

    return SpotClient.nftAsset().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
