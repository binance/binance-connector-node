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

const cancelReplaceMode = 'STOP_ON_FAILURE'

describe('#cancelAndReplace', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.cancelAndReplace('', side, type, cancelReplaceMode)
      }).toThrow(MissingParameterError)
    })

    it('missing side', () => {
      expect(() => {
        SpotClient.cancelAndReplace(symbol, '', type, cancelReplaceMode)
      }).toThrow(MissingParameterError)
    })

    it('missing type', () => {
      expect(() => {
        SpotClient.cancelAndReplace(symbol, side, '', cancelReplaceMode)
      }).toThrow(MissingParameterError)
    })

    it('missing cancelReplaceMode', () => {
      expect(() => {
        SpotClient.cancelAndReplace(symbol, side, type, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return new order', () => {
    const parameters = {
      timeInForce: 'GTC',
      cancelOrderId: 12,
      quantity,
      price
    }
    nockPostMock(`/api/v3/order/cancelReplace?${buildQueryString({ symbol, side, type, cancelReplaceMode, ...parameters })}`)(mockResponse)

    return SpotClient.cancelAndReplace(symbol, side, type, cancelReplaceMode, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
