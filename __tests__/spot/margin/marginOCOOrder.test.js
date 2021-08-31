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
  it.each`
  pSymbol| pSide| pQuantity| pPrice| pStopPrice
  ${''} | ${''} | ${''} | ${''} | ${''}
  ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${undefined}
  ${''} | ${side} | ${quantity} | ${price} | ${stopPrice}
  ${symbol} | ${''} | ${quantity} | ${price} | ${stopPrice}
  ${symbol} | ${side} | ${''} | ${price} | ${stopPrice}
  ${symbol} | ${side} | ${quantity} | ${''} | ${stopPrice}
  ${symbol} | ${side} | ${quantity} | ${price} | ${''}
  `('throw MissingParameterError', ({ pSymbol, pSide, pQuantity, pPrice, pStopPrice }) => {
    expect(() => {
      SpotClient.marginOCOOrder(pSymbol, pSide, pQuantity, pPrice, pStopPrice)
    }).toThrow(MissingParameterError)
  })

  it('should return new oco order', () => {
    const parameters = {
      limitClientOrderId: 'my_order_id',
      limitIcebergQty: 1
    }
    nockPostMock(`/sapi/v1/margin/order/oco?${buildQueryString({ symbol, side, quantity, price, stopPrice, ...parameters })}`)(mockResponse)

    return SpotClient.marginOCOOrder(symbol, side, quantity, price, stopPrice, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
