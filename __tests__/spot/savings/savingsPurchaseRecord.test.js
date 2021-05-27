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

describe('#savingsPurchaseRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing lendingType', async () => {
      expect(() => {
        SpotClient.savingsPurchaseRecord('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return purchase records', async () => {
    const parameters = {
      asset,
      startTime,
      endTime,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/union/purchaseRecord?${queryString({ lendingType: 'DAILY', ...parameters })}`)(responseMockData)

    return SpotClient.savingsPurchaseRecord('DAILY', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
