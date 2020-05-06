/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  orderId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginOrder', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.marginOrder('')
    }).toThrow(MissingParameterError)
  })

  it('should return margin order details', () => {
    const parameters = {
      orderId,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/order?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.marginOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
