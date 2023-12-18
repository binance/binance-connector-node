/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const targetAsset = 'BTC'
const indexId = 1
const usageType = 'RECURRING'
const flexibleAllowedToUse = true

describe('#querySourceAssetList', () => {
  it('throw MissingParameterError when missing usageType', () => {
    expect(() => {
      SpotClient.querySourceAssetList(null)
    }).toThrow(MissingParameterError)
  })
  it('should query source asset list', () => {
    const parameters = {
      targetAsset,
      indexId,
      flexibleAllowedToUse,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/source-asset/list?${buildQueryString({ usageType, ...parameters })}`)(mockResponse)
    return SpotClient.querySourceAssetList(usageType, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
