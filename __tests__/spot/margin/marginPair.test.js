/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol
} = require('../../testUtils/mockData')

describe('#marginPair', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.marginPair('')
    }).toThrow(MissingParameterError)
  })

  it('should pair details', () => {
    const parameters = {
      symbol
    }
    nockMock(`/sapi/v1/margin/pair?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginPair(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
