/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  side,
  type,
  quantity,
  price
} = require('../../testUtils/mockData')

describe('#newOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.newOrder('', side, type)
      }).toThrow(MissingParameterError)
    })

    it('missing side', () => {
      expect(() => {
        SpotClient.newOrder(symbol, '', type)
      }).toThrow(MissingParameterError)
    })

    it('missing type', () => {
      expect(() => {
        SpotClient.newOrder(symbol, side, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return new order', () => {
    const parameters = {
      timeInForce: 'GTC',
      quantity,
      price
    }
    nockPostMock(`/api/v3/order?${queryString({ symbol, side, type, ...parameters })}`)(responseMockData)

    return SpotClient.newOrder(symbol, side, type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
