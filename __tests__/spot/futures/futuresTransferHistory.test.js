/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  startTime
} = require('../../testUtils/mockData')

describe('#futuresTransferHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.futuresTransferHistory('', startTime)
      }).toThrow(MissingParameterError)
    })
    it('missing startTime', () => {
      expect(() => {
        SpotClient.futuresTransferHistory(asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get transfer between spot account and futures account history', () => {
    const parameters = {
      asset,
      startTime
    }
    nockMock(`/sapi/v1/futures/transfer?${queryString(parameters)}`)(responseMockData)

    return SpotClient.futuresTransferHistory(asset, startTime).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
