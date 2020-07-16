/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#marginAllPairs', () => {
  it('should all pairs details', async () => {
    nockMock('/sapi/v1/margin/allPairs')(responseMockData)

    return SpotClient.marginAllPairs().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
