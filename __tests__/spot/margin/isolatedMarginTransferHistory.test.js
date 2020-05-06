/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, symbol } = require('../../testUtils/mockData')

describe('#isolatedMarginTransferHistory', () => {
  it('should throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.isolatedMarginTransferHistory('')
    }).toThrow(MissingParameterError)
  })

  it('should get isolated margin account transfer history', () => {
    nockMock(`/sapi/v1/margin/isolated/transfer?${buildQueryString({ symbol })}`)(mockResponse)

    return SpotClient.isolatedMarginTransferHistory(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
