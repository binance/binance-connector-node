/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  orderId,
  limit
} = require('../../testUtils/mockData')

describe('#marginAllOrders', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.marginAllOrders('')
    }).toThrow(MissingParameterError)
  })

  it('should return all orders', () => {
    const parameters = {
      orderId,
      limit
    }
    nockMock(`/sapi/v1/margin/allOrders?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.marginAllOrders(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
