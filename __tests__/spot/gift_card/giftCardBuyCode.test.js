/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  amount
} = require('../../testUtils/mockData')

const baseToken = 'USDT'
const faceToken = 'BNB'

describe('#giftCardBuyCode', () => {
  it.each([
    [undefined, undefined, undefined], ['', '', ''], [null, null, null],
    [undefined, faceToken, undefined], ['', faceToken, ''], [null, faceToken, null],
    [baseToken, undefined, undefined], [baseToken, '', ''], [baseToken, null, null],
    [undefined, undefined, amount], ['', '', amount], [baseToken, faceToken, null]
  ])('should throw MissingParameterError given missing params', (baseToken, faceToken, amount) => {
    expect(() => {
      SpotClient.giftCardBuyCode(baseToken, faceToken, amount)
    }).toThrow(MissingParameterError)
  })

  it('should return binance code info', () => {
    nockPostMock(`/sapi/v1/giftcard/buyCode?${buildQueryString({ baseToken, faceToken, baseTokenAmount: amount })}`)(mockResponse)

    return SpotClient.giftCardBuyCode(baseToken, faceToken, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
