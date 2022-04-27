/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, startTime, endTime, limit, recvWindow } = require('../../testUtils/mockData')
const parameters = {
  startTime,
  endTime,
  limit,
  recvWindow
}

describe('#nftWithdrawHistory', () => {
  it('should fetch NFT withdraw history', () => {
    nockMock(`/sapi/v1/nft/history/withdraw?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.nftWithdrawHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch NFT withdraw history without params', () => {
    nockMock(`/sapi/v1/nft/history/withdraw?${buildQueryString()}`)(mockResponse)

    return SpotClient.nftWithdrawHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
