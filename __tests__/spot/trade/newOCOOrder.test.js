/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  side,
  quantity,
  price,
  stopPrice
} = require('../../testUtils/mockData')

describe('#newOCOOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.newOCOOrder('', side, quantity, price, stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing side', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, '', quantity, price, stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing quantity', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, '', price, stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing price', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, quantity, '', stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing stopPrice', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, quantity, price, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return new oco order', () => {
    const parameters = {
      limitClientOrderId: 'my_order_id',
      limitIcebergQty: 1
    }
    nockPostMock(`/api/v3/order/oco?${buildQueryString({ symbol, side, quantity, price, stopPrice, ...parameters })}`)(mockResponse)

    return SpotClient.newOCOOrder(symbol, side, quantity, price, stopPrice, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
