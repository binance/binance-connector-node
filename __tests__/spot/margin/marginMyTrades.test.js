/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  startTime,
  endTime,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginMyTrades', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.marginMyTrades('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return my margin trades', async () => {
    const parameters = {
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/myTrades?${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.marginMyTrades(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
