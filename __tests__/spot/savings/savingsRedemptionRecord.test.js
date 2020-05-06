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

describe('#savingsRedemptionRecord', () => {
  it('throw MissingParameterError when missing lendingType', () => {
    expect(() => {
      SpotClient.savingsRedemptionRecord('')
    }).toThrow(MissingParameterError)
  })

  it('should return redemptionRecord records', () => {
    const parameters = {
      asset,
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/union/redemptionRecord?${buildQueryString({ lendingType: 'DAILY', ...parameters })}`)(mockResponse)

    return SpotClient.savingsRedemptionRecord('DAILY', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
