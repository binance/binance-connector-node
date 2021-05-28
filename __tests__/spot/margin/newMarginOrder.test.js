/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  price,
  newClientOrderId,
  symbol,
  side,
  type,
  quantity
} = require('../../testUtils/mockData')

describe('#newMarginOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.newMarginOrder('', side, type, quantity)
      }).toThrow(MissingParameterError)
    })
    it('missing side', () => {
      expect(() => {
        SpotClient.newMarginOrder(symbol, '', type, quantity)
      }).toThrow(MissingParameterError)
    })
    it('missing type', () => {
      expect(() => {
        SpotClient.newMarginOrder(symbol, side, '', quantity)
      }).toThrow(MissingParameterError)
    })
    it('missing quantity', () => {
      expect(() => {
        SpotClient.newMarginOrder(symbol, side, type, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return new margin order', () => {
    const parameters = {
      price,
      newClientOrderId
    }
    nockPostMock(`/sapi/v1/margin/order?${queryString({ symbol, side, type, quantity, ...parameters })}`)(responseMockData)

    return SpotClient.newMarginOrder(symbol, side, type, quantity, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
