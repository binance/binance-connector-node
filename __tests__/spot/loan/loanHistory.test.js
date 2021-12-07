/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#loanHistory', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.loanHistory('')
    }).toThrow(MissingParameterError)
  })

  it('should return loan transactions history', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/loan/income?${buildQueryString({ asset, ...parameters })}`)(mockResponse)

    return SpotClient.loanHistory(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
