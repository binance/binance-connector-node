/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

describe('#bswapClaimedHistory', () => {
  it('should get history of claimed rewards.', () => {
    nockMock('/sapi/v1/bswap/claimedHistory')(mockResponse)
    return SpotClient.bswapClaimedHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
