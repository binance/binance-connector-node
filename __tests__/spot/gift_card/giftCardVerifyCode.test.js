/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

const referenceNo = 'referenceNumber'

describe('#giftCardVerifyCode', () => {
  it('throw MissingParameterError when missing referenceNo', () => {
    expect(() => {
      SpotClient.giftCardVerifyCode('')
    }).toThrow(MissingParameterError)
  })

  it('should verify reference number', () => {
    nockMock(`/sapi/v1/giftcard/verify?${buildQueryString({ referenceNo })}`)(mockResponse)

    return SpotClient.giftCardVerifyCode(referenceNo).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
