/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  quantity,
  recvWindow
} = require('../../testUtils/mockData')

describe('#bswapLiquidityAdd', () => {
  describe('throw MissingParameterError', () => {
    it('missing poolId', async () => {
      expect(() => {
        SpotClient.bswapLiquidityAdd('', asset, quantity)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.bswapLiquidityAdd(1, '', quantity)
      }).toThrow(MissingParameterError)
    })

    it('missing quantity', async () => {
      expect(() => {
        SpotClient.bswapLiquidityAdd('', asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should add liquidity to swappool', async () => {
    const parameters = {
      poolId: 1,
      asset,
      quantity,
      recvWindow
    }

    nockPostMock(`/sapi/v1/bswap/liquidityAdd${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.bswapLiquidityAdd(1, asset, quantity, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
