/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, symbol } = require('../../testUtils/mockData')

describe('#disableIsolatedMarginAccount', () => {
  it('should throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.disableIsolatedMarginAccount('')
    }).toThrow(MissingParameterError)
  })
  it('should disable isolated margin account', () => {
    nockDeleteMock(`/sapi/v1/margin/isolated/account?symbol=${symbol}`)(mockResponse)

    return SpotClient.disableIsolatedMarginAccount(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
