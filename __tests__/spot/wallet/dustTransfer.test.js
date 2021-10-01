/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')
const { mockResponse } = require('../../testUtils/mockData')

describe('#dustTransfer', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.dustTransfer('')
    }).toThrow(MissingParameterError)
  })

  it('should Convert dust assets to BNB', () => {
    const asset = 'ETC'
    nockPostMock(`/sapi/v1/asset/dust?${buildQueryString({ asset })}`)(mockResponse)

    return SpotClient.dustTransfer(asset).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should Convert dust assets to BNB', () => {
    const asset = ['ETC', 'USDT']
    const assetString = 'ETC,USDT'
    nockPostMock(`/sapi/v1/asset/dust?${buildQueryString({ asset: assetString })}`)(mockResponse)

    return SpotClient.dustTransfer(asset).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
