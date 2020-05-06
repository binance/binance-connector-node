/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountEnableFutures', () => {
  it('throw MissingParameterError when missing email', () => {
    expect(() => {
      SpotClient.subAccountEnableFutures('')
    }).toThrow(MissingParameterError)
  })

  it('should enable sub account futures', () => {
    const parameters = {
      email,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/futures/enable?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountEnableFutures(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
