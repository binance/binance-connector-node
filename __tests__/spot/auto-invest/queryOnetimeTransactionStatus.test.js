/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const transactionId = 12345
const requestId = 'TR12354859'

describe('#queryOnetimeTransactionStatus', () => {
  it('throw MissingParameterError when missing transactionId', () => {
    expect(() => {
      SpotClient.queryOnetimeTransactionStatus(null)
    }).toThrow(MissingParameterError)
  })
  it('should query one-time transaction status', () => {
    const parameters = {
      requestId,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/one-off/status?${buildQueryString({ transactionId, ...parameters })}`)(mockResponse)
    return SpotClient.queryOnetimeTransactionStatus(transactionId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
