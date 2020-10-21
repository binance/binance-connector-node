/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  quantity,
  recvWindow
} = require('../../testUtils/mockData')

const type = 'SINGLE'
const shareAmount = quantity

describe('#bswapLiquidityRemove', () => {
  describe('throw MissingParameterError', () => {
    it('missing poolId', async () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove('', type, asset, shareAmount)
      }).toThrow(MissingParameterError)
    })

    it('missing type', async () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove(1, '', asset, shareAmount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove(1, type, '', shareAmount)
      }).toThrow(MissingParameterError)
    })

    it('missing shareAmount', async () => {
      expect(() => {
        SpotClient.bswapLiquidityRemove(1, type, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should remove liquidity from swappool', async () => {
    const parameters = {
      poolId: 1,
      type,
      asset,
      shareAmount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/bswap/liquidityRemove${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.bswapLiquidityRemove(1, type, asset, shareAmount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
