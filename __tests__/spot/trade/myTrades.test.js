/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  startTime,
  endTime,
  fromId,
  limit
} = require('../../testUtils/mockData')

describe('#myTrades', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', () => {
      expect(() => {
        SpotClient.myTrades('')
      }).toThrow(MissingParameterError)

      expect(() => {
        SpotClient.myTrades()
      }).toThrow(MissingParameterError)
    })
  })

  it('should return my trade list', () => {
    const parameters = {
      startTime,
      endTime,
      fromId,
      limit
    }
    nockMock(`/api/v3/myTrades?${queryString({ ...parameters, symbol: 'BTCUSDT' })}`)(responseMockData)

    return SpotClient.myTrades('BTCUSDT', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
