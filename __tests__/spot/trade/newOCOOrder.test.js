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
  quantity,
  price,
  stopPrice
} = require('../../testUtils/mockData')

describe('#newOCOOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.newOCOOrder('', side, quantity, price, stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing side', async () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, '', quantity, price, stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing quantity', async () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, '', price, stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing price', async () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, quantity, '', stopPrice)
      }).toThrow(MissingParameterError)
    })

    it('missing stopPrice', async () => {
      expect(() => {
        SpotClient.newOCOOrder(symbol, side, quantity, price, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return new oco order', async () => {
    const parameters = {
      limitClientOrderId: 'my_order_id',
      limitIcebergQty: 1
    }
    nockPostMock(`/api/v3/order/oco?${queryString({ symbol, side, quantity, price, stopPrice, ...parameters })}`)(responseMockData)

    return SpotClient.newOCOOrder(symbol, side, quantity, price, stopPrice, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
