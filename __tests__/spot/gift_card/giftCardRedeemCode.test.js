/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

const code = 'binanceCode'

describe('#giftCardRedeemCode', () => {
  it('throw MissingParameterError when missing code', () => {
    expect(() => {
      SpotClient.giftCardRedeemCode('')
    }).toThrow(MissingParameterError)
  })

  it('should redeem binance code', () => {
    nockPostMock(`/sapi/v1/giftcard/redeemCode?${buildQueryString({ code })}`)(mockResponse)

    return SpotClient.giftCardRedeemCode(code).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
