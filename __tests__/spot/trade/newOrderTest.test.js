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
  type,
  quantity,
  price
} = require('../../testUtils/mockData')

describe('#newOrderTest', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.newOrderTest('', side, type)
      }).toThrow(MissingParameterError)
    })

    it('missing side', async () => {
      expect(() => {
        SpotClient.newOrderTest(symbol, '', type)
      }).toThrow(MissingParameterError)
    })

    it('missing type', async () => {
      expect(() => {
        SpotClient.newOrderTest(symbol, side, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return success', async () => {
    const parameters = {
      timeInForce: 'GTC',
      quantity,
      price
    }
    nockPostMock(`/api/v3/order/test?${queryString({ symbol, side, type, ...parameters })}`)(responseMockData)

    return SpotClient.newOrderTest(symbol, side, type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
