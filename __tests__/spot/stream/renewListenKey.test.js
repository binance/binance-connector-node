/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPutMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#renewListenKey', () => {
  it('missing listenKey', () => {
    expect(() => {
      SpotClient.renewListenKey('')
    }).toThrow(MissingParameterError)
  })

  it('should renew listen key', () => {
    nockPutMock('/api/v3/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.renewListenKey('aaa', { timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should renew listen key without optional parameters', () => {
    nockPutMock('/api/v3/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.renewListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
