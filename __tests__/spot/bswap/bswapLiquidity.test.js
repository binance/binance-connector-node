/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#bswapLiquidity', () => {
  it('should get swap liquidity', async () => {
    nockMock('/sapi/v1/bswap/liquidity')(responseMockData)
    return SpotClient.bswapLiquidity().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
