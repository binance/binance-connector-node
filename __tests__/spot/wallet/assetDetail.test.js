/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#assetDetail', () => {
  it('should return asset details', async () => {
    nockMock('/wapi/v3/assetDetail.html')(responseMockData)

    return SpotClient.assetDetail().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
