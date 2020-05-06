/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginMaxTransferable', () => {
  it('throw MissingParameterError when missing asset', () => {
    expect(() => {
      SpotClient.marginMaxTransferable('')
    }).toThrow(MissingParameterError)
  })

  it('should return max transfer amount', () => {
    const parameters = {
      asset,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/maxTransferable?${buildQueryString({ asset, ...parameters })}`)(mockResponse)

    return SpotClient.marginMaxTransferable(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
