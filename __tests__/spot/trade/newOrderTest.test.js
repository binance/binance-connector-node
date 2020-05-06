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
  type,
  quantity,
  price
} = require('../../testUtils/mockData')

describe('#newOrderTest', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.newOrderTest('', side, type)
      }).toThrow(MissingParameterError)
    })

    it('missing side', () => {
      expect(() => {
        SpotClient.newOrderTest(symbol, '', type)
      }).toThrow(MissingParameterError)
    })

    it('missing type', () => {
      expect(() => {
        SpotClient.newOrderTest(symbol, side, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return success', () => {
    const parameters = {
      timeInForce: 'GTC',
      quantity,
      price
    }
    nockPostMock(`/api/v3/order/test?${buildQueryString({ symbol, side, type, ...parameters })}`)(mockResponse)

    return SpotClient.newOrderTest(symbol, side, type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
