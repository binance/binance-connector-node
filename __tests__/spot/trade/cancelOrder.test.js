/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockDeleteMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  orderId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#cancelOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.cancelOrder('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return cancelled order', () => {
    const parameters = {
      orderId,
      recvWindow
    }
    nockDeleteMock(`/api/v3/order?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.cancelOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
