/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const {
  asset,
  quantity,
  recvWindow,
  mockResponse
} = require('../../testUtils/mockData')

describe('#bswapLiquidityAdd', () => {
  describe('throw MissingParameterError', () => {
    it('missing poolId', () => {
      expect(() => {
        SpotClient.bswapLiquidityAdd('', asset, quantity)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', () => {
      expect(() => {
        SpotClient.bswapLiquidityAdd(1, '', quantity)
      }).toThrow(MissingParameterError)
    })

    it('missing quantity', () => {
      expect(() => {
        SpotClient.bswapLiquidityAdd('', asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should add liquidity to swappool', () => {
    const parameters = {
      poolId: 1,
      asset,
      quantity
    }

    nockPostMock(`/sapi/v1/bswap/liquidityAdd?${buildQueryString({ recvWindow, ...parameters })}`)(mockResponse)
    return SpotClient.bswapLiquidityAdd(1, asset, quantity, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
