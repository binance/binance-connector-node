/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  symbol,
  amount
} = require('../../testUtils/mockData')

const transFrom = 'SPOT'
const transTo = 'ISOLATED_MARGIN'

describe('#isolatedMarginTransfer', () => {
  it.each(
    [[undefined, undefined, undefined, undefined, undefined],
      ['', symbol, transFrom, transTo, amount],
      [asset, '', transFrom, transTo, amount],
      [asset, symbol, '', transTo, amount],
      [asset, symbol, transFrom, '', amount],
      [asset, symbol, transFrom, transTo, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pAsset, pSymbol, pTransFrom, pTransTo, pAmount) => {
    expect(() => {
      SpotClient.isolatedMarginTransfer(pAsset, pSymbol, pTransFrom, pTransTo, pAmount)
    }).toThrow(MissingParameterError)
  })

  it('should transfer funds to isolated margin account', () => {
    const parameters = {
      asset,
      symbol,
      transFrom,
      transTo,
      amount
    }
    nockPostMock(`/sapi/v1/margin/isolated/transfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.isolatedMarginTransfer(asset, symbol, transFrom, transTo, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
