/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#bswapLiquidityOperationRecord', () => {
  it('should get swap liquidity ops records', () => {
    nockMock('/sapi/v1/bswap/liquidityOps')(mockResponse)
    return SpotClient.bswapLiquidityOperationRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
