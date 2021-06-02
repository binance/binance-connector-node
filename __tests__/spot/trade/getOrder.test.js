/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
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
    nockMock(`/api/v3/order?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.getOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
