/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  startTime,
  endTime,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsInterestHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing lendingType', () => {
      expect(() => {
        SpotClient.savingsInterestHistory('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return redemptionRecord records', () => {
    const parameters = {
      asset,
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/union/interestHistory?${buildQueryString({ lendingType: 'DAILY', ...parameters })}`)(mockResponse)

    return SpotClient.savingsInterestHistory('DAILY', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
