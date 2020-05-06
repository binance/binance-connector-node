/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginMaxBorrowable', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.marginMaxBorrowable('')
    }).toThrow(MissingParameterError)
  })

  it('should return max borrowable funds', () => {
    const parameters = {
      asset,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/maxBorrowable?${buildQueryString({ asset, ...parameters })}`)(mockResponse)

    return SpotClient.marginMaxBorrowable(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
