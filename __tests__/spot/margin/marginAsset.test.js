/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset
} = require('../../testUtils/mockData')

describe('#marginAsset', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.marginAsset('')
    }).toThrow(MissingParameterError)
  })

  it('should asset details', () => {
    const parameters = {
      asset
    }
    nockMock(`/sapi/v1/margin/asset?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginAsset(asset).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
