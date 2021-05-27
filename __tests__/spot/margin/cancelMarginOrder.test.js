/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  orderId,
  recvWindow,
  symbol
} = require('../../testUtils/mockData')

describe('#cancelMarginOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.cancelMarginOrder('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return cancelled margin order', async () => {
    const parameters = {
      orderId,
      recvWindow
    }
    nockDeleteMock(`/sapi/v1/margin/order?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.cancelMarginOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
