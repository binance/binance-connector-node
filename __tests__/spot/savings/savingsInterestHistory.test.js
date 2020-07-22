/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  startTime,
  endTime,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsInterestHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing lendingType', async () => {
      expect(() => {
        SpotClient.savingsInterestHistory('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return redemptionRecord records', async () => {
    const parameters = {
      asset,
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/union/interestHistory${queryString({ lendingType: 'DAILY', ...parameters })}`)(responseMockData)

    return SpotClient.savingsInterestHistory('DAILY', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
