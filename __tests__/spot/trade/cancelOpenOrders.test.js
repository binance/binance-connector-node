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
  recvWindow
} = require('../../testUtils/mockData')

describe('#cancelOpenOrders', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.cancelOpenOrders('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return all cancelled order', async () => {
    const parameters = {
      recvWindow
    }
    nockDeleteMock(`/api/v3/openOrders?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.cancelOpenOrders(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
