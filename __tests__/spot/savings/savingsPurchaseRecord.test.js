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

describe('#savingsPurchaseRecord', () => {
  it('throw MissingParameterError when missing lendingType', () => {
    expect(() => {
      SpotClient.savingsPurchaseRecord('')
    }).toThrow(MissingParameterError)
  })

  it('should return purchase records', () => {
    const parameters = {
      asset,
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/union/purchaseRecord?${buildQueryString({ lendingType: 'DAILY', ...parameters })}`)(mockResponse)

    return SpotClient.savingsPurchaseRecord('DAILY', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
