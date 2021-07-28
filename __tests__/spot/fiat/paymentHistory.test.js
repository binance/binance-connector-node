/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#paymentHistory', () => {
  it('missing transactionType', () => {
    expect(() => {
      SpotClient.paymentHistory()
    }).toThrow(MissingParameterError)
  })

  it('should fetch payment history', () => {
    const transactionType = 0
    nockMock(`/sapi/v1/fiat/payments?${buildQueryString({ transactionType, recvWindow })}`)(mockResponse)

    return SpotClient.paymentHistory(transactionType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch payment history without option', () => {
    const transactionType = 0
    nockMock(`/sapi/v1/fiat/payments?${buildQueryString({ transactionType })}`)(mockResponse)

    return SpotClient.paymentHistory(transactionType).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
