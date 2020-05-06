/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  symbol
} = require('../../testUtils/mockData')

describe('#cancelAllOpenMarginOrder', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.cancelAllOpenMarginOrder('')
    }).toThrow(MissingParameterError)
  })

  it('should return cancelled margin order', () => {
    const parameters = {
      recvWindow
    }
    nockDeleteMock(`/sapi/v1/margin/openOrders?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.cancelAllOpenMarginOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
