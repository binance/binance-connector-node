/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

const baseToken = 'USDT'
const faceToken = 'BNB'
const baseTokenAmount = 10

describe('#giftCardBuyCode', () => {
  it('missing baseToken', () => {
    expect(() => {
      SpotClient.giftCardBuyCode('', faceToken, baseTokenAmount)
    }).toThrow(MissingParameterError)
  })

  it('missing faceToken', () => {
    expect(() => {
      SpotClient.giftCardBuyCode(baseToken, '', baseTokenAmount)
    }).toThrow(MissingParameterError)
  })

  it('missing baseTokenAmount', () => {
    expect(() => {
      SpotClient.giftCardBuyCode(baseToken, faceToken, '')
    }).toThrow(MissingParameterError)
  })

  it('should return binance code info', () => {
    nockPostMock(`/sapi/v1/giftcard/buyCode?${buildQueryString({ baseToken, faceToken, baseTokenAmount })}`)(mockResponse)

    return SpotClient.giftCardBuyCode(baseToken, faceToken, baseTokenAmount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
