/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol
} = require('../../testUtils/mockData')

describe('#marginPairIndex', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.marginPairIndex('')
    }).toThrow(MissingParameterError)
  })

  it('should return pair index', () => {
    const parameters = {
      symbol
    }
    nockMock(`/sapi/v1/margin/priceIndex?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginPairIndex(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
