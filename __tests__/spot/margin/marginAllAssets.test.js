/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#marginAllAssets', () => {
  it('should asset details', async () => {
    nockMock('/sapi/v1/margin/allAssets')(responseMockData)

    return SpotClient.marginAllAssets().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
