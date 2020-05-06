/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountAssets', () => {
  it('throw MissingParameterError when missing email', () => {
    expect(() => {
      SpotClient.subAccountAssets('')
    }).toThrow(MissingParameterError)
  })

  it('should query sub account assets', () => {
    const parameters = {
      email,
      recvWindow
    }

    nockMock(`/sapi/v3/sub-account/assets?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountAssets(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
