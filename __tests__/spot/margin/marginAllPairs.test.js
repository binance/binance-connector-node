/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#marginAllPairs', () => {
  it('should all pairs details', () => {
    nockMock('/sapi/v1/margin/allPairs')(mockResponse)

    return SpotClient.marginAllPairs().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
