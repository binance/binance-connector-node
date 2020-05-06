/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginRepayRecord', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.marginRepayRecord('')
    }).toThrow(MissingParameterError)
  })

  it('should return margin repay record', () => {
    const parameters = {
      txId: 10,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/repay?${buildQueryString({ asset, ...parameters })}`)(mockResponse)

    return SpotClient.marginRepayRecord(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
