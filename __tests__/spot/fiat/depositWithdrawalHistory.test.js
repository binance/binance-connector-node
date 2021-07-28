/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#depositWithdrawalHistory', () => {
  it('missing transactionType', () => {
    expect(() => {
      SpotClient.depositWithdrawalHistory()
    }).toThrow(MissingParameterError)
  })

  it('should fetch deposit or withdrawal history', () => {
    const transactionType = 0
    nockMock(`/sapi/v1/fiat/orders?${buildQueryString({ transactionType, recvWindow })}`)(mockResponse)

    return SpotClient.depositWithdrawalHistory(transactionType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch deposit or withdrawal history without option', () => {
    const transactionType = 0
    nockMock(`/sapi/v1/fiat/orders?${buildQueryString({ transactionType })}`)(mockResponse)

    return SpotClient.depositWithdrawalHistory(transactionType).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
