/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockDeleteMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#cancelMarginOCOOrder', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.cancelMarginOCOOrder('')
    }).toThrow(MissingParameterError)
  })

  it('throw MissingParameterError when neither orderListId nor listClientOrderId is attached', () => {
    expect(() => {
      SpotClient.cancelMarginOCOOrder(symbol, { recvWindow })
    }).toThrow(MissingParameterError)
  })

  it('should return cancelled oco order', () => {
    const parameters = {
      orderListId: 'list_id',
      recvWindow
    }
    nockDeleteMock(`/sapi/v1/margin/orderList?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.cancelMarginOCOOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
