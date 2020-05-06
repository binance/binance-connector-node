/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, symbol } = require('../../testUtils/mockData')

describe('#isolatedMarginSymbol', () => {
  it('should throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.isolatedMarginSymbol('')
    }).toThrow(MissingParameterError)
  })

  it('should get isolated margin symbol', () => {
    nockMock(`/sapi/v1/margin/isolated/pair?${buildQueryString({ symbol })}`)(mockResponse)

    return SpotClient.isolatedMarginSymbol(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
