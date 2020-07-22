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

describe('#savingsRedemptionRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing lendingType', async () => {
      expect(() => {
        SpotClient.savingsRedemptionRecord('')
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
    nockMock(`/sapi/v1/lending/union/redemptionRecord${queryString({ lendingType: 'DAILY', ...parameters })}`)(responseMockData)

    return SpotClient.savingsRedemptionRecord('DAILY', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
