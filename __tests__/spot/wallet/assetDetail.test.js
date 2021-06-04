/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')
const { queryString, recvWindow } = require('../../testUtils/mockData')

describe('#assetDetail', () => {
  it('should return asset details', () => {
    nockMock(`/sapi/v1/asset/assetDetail?${queryString({ recvWindow })}`)(responseMockData)

    return SpotClient.assetDetail({ recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
