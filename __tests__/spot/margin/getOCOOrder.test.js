/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#getMarginOCOOrder', () => {
  it('should thorw MissingParameterError when no parameter is attached', () => {
    expect(() => {
      SpotClient.getMarginOCOOrder()
    }).toThrow(MissingParameterError)
  })

  it('should thorw MissingParameterError when neither orderListId nor origClientOrderId is attached', () => {
    expect(() => {
      SpotClient.getMarginOCOOrder({ recvWindow })
    }).toThrow(MissingParameterError)
  })

  it('should return oco order details', () => {
    const parameters = {
      orderListId: 10,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/orderList?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getMarginOCOOrder(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
