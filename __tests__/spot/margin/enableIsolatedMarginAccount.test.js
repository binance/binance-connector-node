/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, symbol } = require('../../testUtils/mockData')

describe('#enableIsolatedMarginAccount', () => {
  it('should throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.enableIsolatedMarginAccount('')
    }).toThrow(MissingParameterError)
  })
  it('should enable isolated margin account', () => {
    nockPostMock(`/sapi/v1/margin/isolated/account?symbol=${symbol}`)(mockResponse)

    return SpotClient.enableIsolatedMarginAccount(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
