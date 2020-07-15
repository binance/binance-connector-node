/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  orderId
} = require('../../testUtils/mockData')

describe('#allOrders', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.allOrders('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return order details', async () => {
    const parameters = {
      orderId
    }
    nockMock(`/api/v3/allOrders${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.allOrders(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
