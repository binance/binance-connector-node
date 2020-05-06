/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const {
  mockResponse,
  email
} = require('../../testUtils/mockData')

describe('#managedSubAccountAssets', () => {
  it('throw MissingParameterError when missing email', () => {
    expect(() => {
      SpotClient.managedSubAccountAssets('')
    }).toThrow(MissingParameterError)
  })

  it('should query managed sub account assets details', () => {
    nockMock(`/sapi/v1/managed-subaccount/asset?${buildQueryString({ email })}`)(mockResponse)

    return SpotClient.managedSubAccountAssets(email).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
