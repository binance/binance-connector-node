/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#subAccountFuturesAccountSummary', () => {
  it('should return sub account futures summary', async () => {
    nockMock('/sapi/v1/sub-account/futures/accountSummary')(responseMockData)

    return SpotClient.subAccountFuturesAccountSummary().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
