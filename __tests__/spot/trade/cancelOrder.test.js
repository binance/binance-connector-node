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
  orderId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#cancelOrder', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.cancelOrder('')
    }).toThrow(MissingParameterError)
  })

  it('should return cancelled order', () => {
    const parameters = {
      orderId,
      recvWindow
    }
    nockDeleteMock(`/api/v3/order?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.cancelOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
