/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  orderId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.marginOrder('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return margin order details', () => {
    const parameters = {
      orderId,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/order?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.marginOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
