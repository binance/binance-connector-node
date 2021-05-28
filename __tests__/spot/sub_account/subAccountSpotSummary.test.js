/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#subAccountSpotSummary', () => {
  it('should return sub account spot summary', async () => {
    nockMock('/sapi/v1/sub-account/spotSummary')(responseMockData)

    return SpotClient.subAccountSpotSummary().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
