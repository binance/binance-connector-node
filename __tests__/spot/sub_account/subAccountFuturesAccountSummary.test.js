/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#subAccountFuturesAccountSummary', () => {
  it('should return sub account futures summary', () => {
    nockMock('/sapi/v1/sub-account/futures/accountSummary')(mockResponse)

    return SpotClient.subAccountFuturesAccountSummary().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
