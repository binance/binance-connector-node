/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#userUniversalTransferHistory', () => {
  it('throw MissingParameterError when missing type', () => {
    expect(() => {
      SpotClient.userUniversalTransferHistory('')
    }).toThrow(MissingParameterError)
  })

  it('should return type deposit address', () => {
    const type = 'MARGIN_MAIN'
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/asset/transfer?${buildQueryString({ type, ...parameters })}`)(mockResponse)

    return SpotClient.userUniversalTransferHistory(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
