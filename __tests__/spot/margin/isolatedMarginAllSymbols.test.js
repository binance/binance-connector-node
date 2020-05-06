/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#isolatedMarginAllSymbols', () => {
  it('should get all isolated margin symbols', () => {
    nockMock('/sapi/v1/margin/isolated/allPairs')(mockResponse)

    return SpotClient.isolatedMarginAllSymbols().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
