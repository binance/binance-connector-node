/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  asset,
  amount
} = require('../../testUtils/mockData')

const fromAccountType = 'SPOT'
const toAccountType = 'USDT_FUTURE'

describe('#subAccountUniversalTransfer', () => {
  it.each([
    [undefined, undefined, undefined, undefined], ['', '', '', ''], [null, null, null, null],
    ['', toAccountType, asset, amount],
    [fromAccountType, '', asset, amount],
    [fromAccountType, toAccountType, '', amount],
    [fromAccountType, toAccountType, asset, '']
  ])('should throw MissingParameterError', (fromAccountType, toAccountType, asset, amount) => {
    expect(() => {
      SpotClient.subAccountUniversalTransfer(fromAccountType, toAccountType, asset, amount)
    }).toThrow(MissingParameterError)
  })

  it('should do universal transfer', () => {
    const parameters = {
      fromAccountType,
      toAccountType,
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/universalTransfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountUniversalTransfer(fromAccountType, toAccountType, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
