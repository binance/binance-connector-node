/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  orderId,
  limit
} = require('../../testUtils/mockData')

describe('#marginAllOrders', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.marginAllOrders('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return all orders', async () => {
    const parameters = {
      orderId,
      limit
    }
    nockMock(`/sapi/v1/margin/allOrders?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.marginAllOrders(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
