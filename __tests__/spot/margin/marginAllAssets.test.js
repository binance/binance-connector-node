/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#marginAllAssets', () => {
  it('should asset details', () => {
    nockMock('/sapi/v1/margin/allAssets')(mockResponse)

    return SpotClient.marginAllAssets().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
