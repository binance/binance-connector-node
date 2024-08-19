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
  aboveType,
  belowType
} = require('../../testUtils/mockData')

describe('#newOCOOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.newOCOOrder('', side, quantity, aboveType, belowType)
      }).toThrow(MissingParameterError)
    })

    it('missing side', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, '', quantity, aboveType, belowType)
      }).toThrow(MissingParameterError)
    })

    it('missing quantity', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, '', aboveType, belowType)
      }).toThrow(MissingParameterError)
    })

    it('missing price', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, quantity, '', belowType)
      }).toThrow(MissingParameterError)
    })

    it('missing stopPrice', () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, quantity, aboveType, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return new oco order', () => {
    const parameters = {
      limitClientOrderId: 'my_order_id',
      abovePrice: 530,
      belowPrice: 520,
      belowStopPrice: 519,
      belowTimeInForce: 'GTC'
    }
    nockPostMock(`/api/v3/orderList/oco?${buildQueryString({ symbol, side, quantity, aboveType, belowType, ...parameters })}`)(mockResponse)

    return SpotClient.newOCOOrder(symbol, side, quantity, aboveType, belowType, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
