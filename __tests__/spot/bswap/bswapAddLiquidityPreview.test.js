/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#bswapAddLiquidityPreview', () => {
  it.each`
  poolId | type | quoteAsset | quoteQty
  ${''} | ${''} | ${''} | ${''}
  ${undefined} | ${undefined} | ${undefined} | ${undefined}
  ${''} | ${'SINGLE'} | ${'USDT'} | ${0.1}
  ${2} | ${''} | ${'USDT'} | ${0.1}
  ${2} | ${'SINGLE'} | ${''} | ${0.1}
  ${2} | ${'SINGLE'} | ${'USDT'} | ${''}
  `('throw MissingParameterError', ({ poolId, type, quoteAsset, quoteQty }) => {
    expect(() => {
      SpotClient.bswapAddLiquidityPreview(poolId, type, quoteAsset, quoteQty)
    }).toThrow(MissingParameterError)
  })

  it('should add liquidity preview', () => {
    const poolId = 2
    const type = 'COMBINATION'
    const quoteAsset = 'USDT'
    const quoteQty = 0.1
    const parameters = { recvWindow }
    nockMock(`/sapi/v1/bswap/addLiquidityPreview?${buildQueryString({ poolId, type, quoteAsset, quoteQty, ...parameters })}`)(mockResponse)

    return SpotClient.bswapAddLiquidityPreview(poolId, type, quoteAsset, quoteQty, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
