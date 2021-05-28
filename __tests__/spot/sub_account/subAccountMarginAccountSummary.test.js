/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#subAccountMarginAccountSummary', () => {
  it('should return sub account summary', async () => {
    nockMock('/sapi/v1/sub-account/margin/accountSummary')(responseMockData)

    return SpotClient.subAccountMarginAccountSummary().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
