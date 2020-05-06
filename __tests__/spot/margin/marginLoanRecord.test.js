/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginLoanRecord', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.marginLoanRecord('')
    }).toThrow(MissingParameterError)
  })

  it('should return margin loan record', () => {
    const parameters = {
      txId: 10,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/loan?${buildQueryString({ asset, ...parameters })}`)(mockResponse)

    return SpotClient.marginLoanRecord(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
