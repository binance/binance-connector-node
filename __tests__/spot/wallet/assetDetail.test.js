/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#assetDetail', () => {
  it('should return asset details', async () => {
    nockMock('/sapi/v1/asset/assetDetail')(responseMockData)

    return SpotClient.assetDetail().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
