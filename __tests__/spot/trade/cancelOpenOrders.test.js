/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockDeleteMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#cancelOpenOrders', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.cancelOpenOrders('')
    }).toThrow(MissingParameterError)
  })

  it('should return all cancelled order', () => {
    const parameters = {
      recvWindow
    }
    nockDeleteMock(`/api/v3/openOrders?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.cancelOpenOrders(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
