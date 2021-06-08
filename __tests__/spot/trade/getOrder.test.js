/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  orderId
} = require('../../testUtils/mockData')

describe('#getOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.getOrder('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return order details', () => {
    const parameters = {
      orderId
    }
    nockMock(`/api/v3/order?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.getOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
