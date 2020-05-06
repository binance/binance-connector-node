/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  orderId,
  recvWindow,
  symbol
} = require('../../testUtils/mockData')

describe('#cancelMarginOrder', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.cancelMarginOrder('')
    }).toThrow(MissingParameterError)
  })

  it('should return cancelled margin order', () => {
    const parameters = {
      orderId,
      recvWindow
    }
    nockDeleteMock(`/sapi/v1/margin/order?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.cancelMarginOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
