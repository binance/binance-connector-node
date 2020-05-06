/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPutMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#renewListenKey', () => {
  it('missing listenKey', () => {
    expect(() => {
      SpotClient.renewListenKey('')
    }).toThrow(MissingParameterError)
  })

  it('should renew listen key', () => {
    nockPutMock('/api/v3/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.renewListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
