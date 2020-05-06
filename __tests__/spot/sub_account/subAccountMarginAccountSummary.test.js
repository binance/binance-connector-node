/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#subAccountMarginAccountSummary', () => {
  it('should return sub account summary', () => {
    nockMock('/sapi/v1/sub-account/margin/accountSummary')(mockResponse)

    return SpotClient.subAccountMarginAccountSummary().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
