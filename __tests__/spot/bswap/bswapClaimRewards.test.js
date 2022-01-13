/* global describe, it, expect */
const { nockPostMock, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

describe('#bswapClaimRewards', () => {
  it('should post to claim swap rewards or liquidity rewards', () => {
    nockPostMock('/sapi/v1/bswap/claimRewards')(mockResponse)
    return SpotClient.bswapClaimRewards().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
