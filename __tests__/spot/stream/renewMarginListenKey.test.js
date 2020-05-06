/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPutMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#renewMarginListenKey', () => {
  it('missing listenKey', () => {
    expect(() => {
      SpotClient.renewMarginListenKey('')
    }).toThrow(MissingParameterError)
  })

  it('should renew listen key', () => {
    nockPutMock('/sapi/v1/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.renewMarginListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
