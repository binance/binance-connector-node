/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#bswapLiquidityOperationRecord', () => {
  it('should get swap liquidity ops records', async () => {
    nockMock('/sapi/v1/bswap/liquidityOps')(responseMockData)
    return SpotClient.bswapLiquidityOperationRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
