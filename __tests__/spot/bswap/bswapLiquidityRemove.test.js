/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  quantity,
  recvWindow
} = require('../../testUtils/mockData')

const type = 'SINGLE'
const shareAmount = quantity

describe('#bswapLiquidityRemove', () => {
  describe('throw MissingParameterError', () => {
    it('missing poolId', () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove('', type, asset, shareAmount)
      }).toThrow(MissingParameterError)
    })

    it('missing type', () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove(1, '', asset, shareAmount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove(1, type, '', shareAmount)
      }).toThrow(MissingParameterError)
    })

    it('missing shareAmount', () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove(1, type, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should remove liquidity from swappool', () => {
    const parameters = {
      poolId: 1,
      type,
      asset,
      shareAmount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/bswap/liquidityRemove?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.bswapLiquidityRemove(1, type, asset, shareAmount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
