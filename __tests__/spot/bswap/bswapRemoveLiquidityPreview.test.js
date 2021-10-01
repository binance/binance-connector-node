/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#bswapRemoveLiquidityPreview', () => {
  it.each`
  poolId | type | quoteAsset | shareAmount
  ${''} | ${''} | ${''} | ${''}
  ${undefined} | ${undefined} | ${undefined} | ${undefined}
  ${''} | ${'SINGLE'} | ${'USDT'} | ${0.1}
  ${2} | ${''} | ${'USDT'} | ${0.1}
  ${2} | ${'SINGLE'} | ${''} | ${0.1}
  ${2} | ${'SINGLE'} | ${'USDT'} | ${''}
  `('throw MissingParameterError', ({ poolId, type, quoteAsset, shareAmount }) => {
    expect(() => {
      SpotClient.bswapRemoveLiquidityPreview(poolId, type, quoteAsset, shareAmount)
    }).toThrow(MissingParameterError)
  })

  it('should remove liquidity preview', () => {
    const poolId = 2
    const type = 'COMBINATION'
    const quoteAsset = 'USDT'
    const shareAmount = 0.1
    const parameters = { recvWindow }
    nockMock(`/sapi/v1/bswap/removeLiquidityPreview?${buildQueryString({ poolId, type, quoteAsset, shareAmount, ...parameters })}`)(mockResponse)

    return SpotClient.bswapRemoveLiquidityPreview(poolId, type, quoteAsset, shareAmount, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
