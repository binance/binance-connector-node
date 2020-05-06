/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#createIsolatedMarginListenKey', () => {
  it('missing symbol', () => {
    expect(() => {
      SpotClient.createIsolatedMarginListenKey('')
    }).toThrow(MissingParameterError)
  })

  it('should return isolated margin listen key', () => {
    const symbol = 'BNBUSDT'
    nockPostMock(`/sapi/v1/userDataStream/isolated?symbol=${symbol}`)(mockResponse)
    return SpotClient.createIsolatedMarginListenKey(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
