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

describe('#cancelOCOOrder', () => {
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.cancelOCOOrder('')
    }).toThrow(MissingParameterError)
  })

  it('should return cancelled oco order', () => {
    const parameters = {
      orderListId: 'list_id',
      recvWindow
    }
    nockDeleteMock(`/api/v3/orderList?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.cancelOCOOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
