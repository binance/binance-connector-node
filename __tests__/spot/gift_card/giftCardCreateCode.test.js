/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  amount
} = require('../../testUtils/mockData')

const token = 'BNB'

describe('#giftCardCreateCode', () => {
  it.each([
    [undefined, undefined], ['', ''], [null, null],
    [undefined, amount], ['', amount], [token, null]
  ])('should throw MissingParameterError given missing params', (token, amount) => {
    expect(() => {
      SpotClient.giftCardCreateCode(token, amount)
    }).toThrow(MissingParameterError)
  })

  it('should return binance code info', () => {
    nockPostMock(`/sapi/v1/giftcard/createCode?${buildQueryString({ token, amount })}`)(mockResponse)

    return SpotClient.giftCardCreateCode(token, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
