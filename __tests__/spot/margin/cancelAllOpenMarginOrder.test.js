/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  symbol
} = require('../../testUtils/mockData')

describe('#cancelAllOpenMarginOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.cancelAllOpenMarginOrder('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return cancelled margin order', () => {
    const parameters = {
      recvWindow
    }
    nockDeleteMock(`/sapi/v1/margin/openOrders?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.cancelAllOpenMarginOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
